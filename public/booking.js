/* Consultation booking widget.
 *
 * Talks to Tablecloth's own public booking API - the same endpoints every
 * client site uses - so a call booked here lands in the Tablecloth dashboard
 * next to every client's appointments, obeys the same availability rules, and
 * is protected by the same database-level no-double-booking constraint.
 *
 * Progressive enhancement: the buttons that open this keep a working mailto:
 * href, so if this script never loads, clicking one still emails us. */

(function () {
  "use strict";

  var API  = "https://tablecloth-1003541566219.us-west1.run.app";
  var SITE = "4ab731f7-e123-4cdf-9603-985a19747372"; // Tablecloth's own site record
  var DAYS_AHEAD = 21;

  var modal = document.getElementById("bkModal");
  if (!modal) return;

  var els = {
    dates:   document.getElementById("bkDates"),
    slots:   document.getElementById("bkSlots"),
    tzLine:  document.getElementById("bkTzLine"),
    chosen:  document.getElementById("bkChosen"),
    form:    document.getElementById("bkForm"),
    error:   document.getElementById("bkError"),
    submit:  document.getElementById("bkSubmit"),
    doneWhen:document.getElementById("bkDoneWhen"),
    meetWrap:document.getElementById("bkMeetWrap"),
    meetLink:document.getElementById("bkMeetLink"),
    noMeet:  document.getElementById("bkNoMeet")
  };

  var state = { serviceId: null, date: null, slot: null, staffId: null, loaded: false };
  var lastFocused = null;

  /* ------------------------------ helpers ------------------------------ */
  function step(name) {
    modal.querySelectorAll(".bk-step").forEach(function (s) {
      s.hidden = s.getAttribute("data-step") !== name;
    });
  }
  function localDateStr(d) {
    // Local Y-M-D, not toISOString - that converts to UTC and can land on the
    // previous day for anyone behind UTC.
    return d.getFullYear() + "-" +
      String(d.getMonth() + 1).padStart(2, "0") + "-" +
      String(d.getDate()).padStart(2, "0");
  }
  var fmtTime = function (iso) {
    return new Date(iso).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  };
  function tzName() {
    try {
      return new Intl.DateTimeFormat([], { timeZoneName: "short" })
        .formatToParts(new Date())
        .find(function (p) { return p.type === "timeZoneName"; }).value;
    } catch (e) { return "local time"; }
  }

  /* ------------------------------- open -------------------------------- */
  function open() {
    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    step("when");
    els.tzLine.textContent = "Times shown in your timezone (" + tzName() + ").";
    if (!state.loaded) init();
    document.getElementById("bkClose").focus();
  }
  function close() {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  document.addEventListener("click", function (e) {
    var trigger = e.target.closest("[data-book]");
    if (trigger) { e.preventDefault(); open(); return; }
    if (e.target === modal) close();
  });
  document.getElementById("bkClose").addEventListener("click", close);
  document.getElementById("bkDoneClose").addEventListener("click", close);
  document.getElementById("bkBack").addEventListener("click", function () { step("when"); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.hidden) close();
  });

  /* ------------------------------ load data ---------------------------- */
  function init() {
    els.slots.innerHTML = '<p class="bk-msg">Loading times…</p>';
    fetch(API + "/api/public/booking/" + SITE + "/services")
      .then(function (r) { return r.json(); })
      .then(function (list) {
        if (!list.length) throw new Error("no service configured");
        state.serviceId = list[0].id;
        state.loaded = true;
        renderDates();
      })
      .catch(function () {
        els.slots.innerHTML =
          '<p class="bk-msg">Booking is unavailable right now — please email ' +
          '<a href="mailto:hello@gettablecloth.com">hello@gettablecloth.com</a>.</p>';
      });
  }

  function renderDates() {
    var today = new Date();
    var html = "";
    for (var i = 0; i < DAYS_AHEAD; i++) {
      var d = new Date(today);
      d.setDate(today.getDate() + i);
      var day = d.getDay();
      if (day === 0 || day === 6) continue; // we take calls on weekdays
      html +=
        '<button type="button" class="bk-date" data-date="' + localDateStr(d) + '">' +
          '<span>' + d.toLocaleDateString([], { weekday: "short" }) + '</span>' +
          '<b>' + d.getDate() + '</b>' +
          '<i>' + d.toLocaleDateString([], { month: "short" }) + '</i>' +
        '</button>';
    }
    els.dates.innerHTML = html;
    var first = els.dates.querySelector(".bk-date");
    if (first) selectDate(first);
  }

  els.dates.addEventListener("click", function (e) {
    var btn = e.target.closest(".bk-date");
    if (btn) selectDate(btn);
  });

  function selectDate(btn) {
    els.dates.querySelectorAll(".bk-date").forEach(function (b) { b.classList.remove("on"); });
    btn.classList.add("on");
    state.date = btn.getAttribute("data-date");
    loadSlots();
  }

  function loadSlots() {
    els.slots.innerHTML = '<p class="bk-msg">Loading times…</p>';
    fetch(API + "/api/public/booking/" + SITE + "/availability" +
          "?serviceId=" + encodeURIComponent(state.serviceId) +
          "&date=" + encodeURIComponent(state.date))
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var slots = (data.slots || []).filter(function (s) {
          return new Date(s.time) > new Date(); // never offer a time already past
        });
        if (!slots.length) {
          els.slots.innerHTML = '<p class="bk-msg">No times left that day — try another.</p>';
          return;
        }
        els.slots.innerHTML = slots.map(function (s) {
          return '<button type="button" class="bk-slot" data-time="' + s.time +
                 '" data-staff="' + (s.staff && s.staff[0] ? s.staff[0].id : "") + '">' +
                 fmtTime(s.time) + "</button>";
        }).join("");
      })
      .catch(function () {
        els.slots.innerHTML = '<p class="bk-msg">Couldn\'t load times. Please try again.</p>';
      });
  }

  els.slots.addEventListener("click", function (e) {
    var btn = e.target.closest(".bk-slot");
    if (!btn) return;
    state.slot = btn.getAttribute("data-time");
    state.staffId = btn.getAttribute("data-staff");
    var d = new Date(state.slot);
    els.chosen.innerHTML = "<strong>" +
      d.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" }) +
      "</strong> at <strong>" + fmtTime(state.slot) + "</strong> (" + tzName() + ")";
    els.error.hidden = true;
    step("who");
    els.form.querySelector('[name="customerName"]').focus();
  });

  /* ------------------------------- submit ------------------------------ */
  els.form.addEventListener("submit", function (e) {
    e.preventDefault();
    var fd = new FormData(els.form);
    var name  = (fd.get("customerName") || "").trim();
    var email = (fd.get("customerEmail") || "").trim();

    if (!name)  return showError("Please add your name.");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return showError("Please add a valid email.");

    els.error.hidden = true;
    els.submit.disabled = true;
    els.submit.textContent = "Booking…";

    var notes = (fd.get("notes") || "").trim();
    var biz   = (fd.get("business") || "").trim();

    fetch(API + "/api/public/booking/" + SITE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceId: state.serviceId,
        staffId: state.staffId,
        startsAt: state.slot,
        customerName: name,
        customerEmail: email,
        notes: (biz ? "Business: " + biz + "\n" : "") + notes,
        company: fd.get("company") || "" // honeypot, passed through as-is
      })
    })
      .then(function (r) {
        return r.json().then(function (body) {
          if (!r.ok) throw new Error(body.error || "Could not book that time.");
          return body;
        });
      })
      .then(function (b) {
        var d = new Date(b.startsAt);
        els.doneWhen.innerHTML =
          d.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" }) +
          " at " + fmtTime(b.startsAt) + " (" + tzName() + ")";
        if (b.meetingUrl) {
          els.meetLink.href = b.meetingUrl;
          els.meetWrap.hidden = false;
          els.noMeet.hidden = true;
        } else {
          // Calendar not connected yet, or the API hiccuped. The booking is
          // still real - say so plainly rather than showing a dead link.
          els.meetWrap.hidden = true;
          els.noMeet.hidden = false;
        }
        step("done");
      })
      .catch(function (err) {
        showError(err.message || "Something went wrong. Please try again.");
        // A 409 means someone took the slot mid-form; refresh what's left.
        if (/just booked|already/i.test(err.message || "")) { step("when"); loadSlots(); }
      })
      .finally(function () {
        els.submit.disabled = false;
        els.submit.textContent = "Confirm booking";
      });
  });

  function showError(msg) {
    els.error.textContent = msg;
    els.error.hidden = false;
  }
})();
