# Selling points — what actually moves a local business owner

Researched September 2026. Sources at the bottom. This is the argument, not the
script; the call sheet (`exp-nails-pitch/`) has the words.

---

## 1. The one-sentence positioning

> **You already pay for four things badly. This is one thing that does all four,
> and somebody else runs it.**

Not "a cheaper website". Cheaper-than-Wix is a fight you lose — Wix Core with
bookings is about $29/mo and Square Appointments is free for a solo operator.
Say so plainly when it comes up; pretending otherwise costs you the room.

The fight you win is against **the stack and the freelancer**: a custom site
with a real CMS, hosting and a booking app runs $117–177/mo before anybody makes
a single change for you, and every change after that is an hourly invoice.

---

## 2. The five strongest points, in order

### 1. One bill, one login, one person to ring
"All-in-one" tests well for a reason: the research on why owners buy is
consistent that the decisive factors are *minimal ongoing maintenance* and
*clear scope and pricing, plus knowing who to contact when something breaks*.
Time-poor owners are not buying features, they are buying the end of a
four-vendor problem.

**How to land it:** ask what they pay for their domain, their host, their
booking app and their "guy". Most can't answer all four. That silence is the
pitch.

### 2. It's done for you — there's nothing to learn
70% of small business sites have no clear call to action, and the reason is
almost never ignorance; it's that nobody had a spare evening. A page builder is
another job. This isn't one.

### 3. Money on the site, not money later
A booking system that takes a **deposit kills most no-shows** — the detailing
trade puts it around an 80% reduction on a 25% deposit. For a two-van operation
a single saved no-show is a half-day back. This is the most concrete number you
have; use it.

### 4. Found by people who are already looking
Reviews and a complete, consistent listing are the strongest local ranking
signals there are, and in 2026 a growing share of customers find local
businesses by asking an AI assistant rather than searching. Every site publishes
its services, prices, hours and address as structured data, renders a real
`<head>` server-side, and emits its FAQ as `FAQPage` markup — which is precisely
the text an assistant quotes back.

**Be careful here.** Never promise a ranking. The honest claim is: *we make sure
nothing is in the way, and the site stays up so it stays indexed.*

### 5. It works on the phone in their hand
Above three seconds, ~40% bounce; every second past three costs roughly 7% of
conversions. Most of their customers are on a phone. Every site ships a
thumb-height action bar, 44px tap targets, and a hero that loads first.

---

## 3. What to lead with, by trade

| Trade | Their actual problem | Open with |
|---|---|---|
| **Salon / barber** | Phone rings mid-appointment; no-shows | "How many times did the phone go while you had someone in the chair today?" |
| **Food cart / truck** | The lunch queue, and "where are you today?" | "How many people walk off the end of your queue at 12:30?" |
| **Mobile detailer / groomer** | No-shows, and driving to jobs out of range | "What does it cost you when somebody isn't in when you turn up?" |
| **Shop / boutique** | Stock is one-off; people check online and don't come in | "How often does somebody ring to ask if you still have a thing?" |

Each of these maps to something already built, which is the point of the three
demos: show them a site that looks like *their* trade, not a nail salon.

---

## 4. Objections, and honest answers

**"Isn't Wix cheaper?"**
Yes — about $29/mo with bookings, and I'm not going to pretend otherwise. What
it costs instead is your time: you design it, you write it, you take the photos,
and you're the one changing the holiday hours at 11pm. Where I'm clearly cheaper
is against the other route.

**"I already have a website."**
Good — then this is a comparison, not a leap. Pull it up on your phone. (It
will usually be slow, not mobile-friendly, and have no way to book.)

**"What if I want to leave?"**
Say this before they ask. Switching platforms is the cost that catches owners
out — content, images and SEO all have to be rebuilt, and some builders make
leaving effectively impossible. Your answer: **the domain is registered to
them**, and they get their content. Make that a promise on the site, not a
concession in a call.

**"I don't have photos."**
The single biggest visual gap on any of these sites, and worth being blunt
about: an hour with a phone camera in good light beats anything else you can do
for the money. Offer to do it on the build day.

**"My customers just call."**
Some will, always. The booking form is for the ones who won't call — who look at
9pm, don't want to talk to anybody, and will book whoever's page lets them.

---

## 5. Pricing — the part that's your call

What's on the site today: **$69.99 Presence / $149 Bookings / Commerce quoted**.

For context, published list prices in September 2026:

| | Monthly |
|---|---|
| Wix Core (site + bookings) | $29 |
| Wix + Bookings app, realistically | $29–49 |
| Square Appointments | Free solo; ~$29/location for a team |
| Fresha | $19.95 solo; $14.95 per bookable team member — the free plan ended in July 2026 |
| Custom build stack (Vercel + ButterCMS + booking app) | $117–177 |

Two things worth thinking about, both decisions for you and not for me:

1. **Commerce has no price.** It now does real work — order ahead, reserve and
   collect, deposits, card payments straight to the client's bank. "Custom"
   reads as "expensive" to a cart owner doing $400 a day. A published number
   would convert better even if it's a wide range.
2. **$149 is above the tools and below the freelancer**, which is the correct
   place to be — as long as every conversation frames it against the freelancer.
   Framed against Wix it looks like 5x. The order you present things in is
   doing most of the work here.

I haven't changed any price. Tell me what you want them to be and I'll update
the site, the comparison table and the structured data together.

---

## 6. What's genuinely true today (don't oversell)

Claim these:

- Online booking with real per-staff availability, add-ons that extend the
  appointment, and required options (vehicle size, dog size) that resize the slot
- Deposits and card payments, settling to the **client's** bank via Stripe Connect
- Order ahead and reserve-for-collection, with pay-now or pay-on-collection
- Live open/closed from real hours; pickup times that stop at closing
- Confirmation emails with a calendar invite, plus reminders
- Owner/manager/staff logins with genuinely separated permissions
- Content editing with a live preview, publishing straight to the live site
- Structured data: LocalBusiness/Restaurant/Store, service and menu listings,
  and FAQPage
- Domain registration in the client's name

Don't claim yet:

- **Email is not sending in production.** The Google OAuth token has expired and
  needs re-authorising. Until then, confirmations fail silently — fix before any
  paid client goes live.
- **No live client sites.** The "Recent work" section is deliberately hidden.
  Demos are demos; say so.
- Booking funnel analytics (`book_start` / `book_complete`) are not wired up,
  so "X% booked online" isn't a number you have.
- Multi-location is in the plan copy but hasn't been built or tested.

---

## Sources

- [Small Business Website Must-Haves: 2026 Conversion Checklist](https://www.goodfellastech.com/blog/small-business-website-must-haves-2026-conversion-checklist)
- [Top 10 Website Features Every Small Business Needs in 2026](https://outofboxdesigns.co.uk/top-10-website-features-every-small-business-needs-in-2026/)
- [The Complete Local SEO Checklist for 2026 — LocaliQ](https://localiq.com/blog/local-seo-checklist/)
- [The Small Business SEO Checklist for 2026 (And How to Show Up in AI Search)](https://www.doittogethermarketing.com/post/the-small-business-seo-checklist-for-2026-and-how-to-show-up-in-ai-search)
- [Best Online Booking Software For Mobile Detailing (2026)](https://myquoteiq.com/best-online-booking-software-mobile-detailing-2026/)
- [Best Mobile Auto Detailing Software in 2026 — Deelo](https://www.deelo.ai/blog/best-mobile-auto-detailing-software-2026)
- [Fresha Pricing 2026 — CostBench](https://costbench.com/software/salon-spa/fresha/)
- [Wix Pricing 2026 — CostBench](https://costbench.com/software/cms/wix/)
- [Food Truck Website: 10 Essential Features for Success](https://qrolic.com/blog/essential-features-food-truck-website/)
- [Spring 2026 Retail Trends: A Practical Playbook for Independent Retail Shops — SumUp](https://www.sumup.com/en-us/business-guide/spring-2026-retail-trends/)
- [Small Business Website Cost: How to Budget](https://www.jim.com/blog/small-business-website-cost)
- [Website Design Trends for 2026: Performance, Accessibility, and UX](https://singtonellc.com/insights/latest-website-design-trends-2026/)
