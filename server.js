const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// The stylesheet alone is ~39 KB uncompressed. Compressing takes it to
// roughly a fifth of that, which is the single biggest improvement available
// to someone loading this page on a phone.
app.use(require('compression')());

// Static marketing site - no build step. The HTML is the source of truth so
// crawlers and AI scrapers get the full text without running any JS.
// There is no build step here, so styles.css / app.js keep the same filename
// forever - no content hash to bust a cache with. A long max-age would mean
// every deploy serves stale CSS to returning visitors until it expires, so
// everything revalidates instead. Express still sends an ETag, so an unchanged
// asset costs a 304 with an empty body rather than a re-download.
app.use(express.static(path.join(__dirname, 'public'), {
  extensions: ['html'],
  etag: true,
  setHeaders: (res) => res.setHeader('Cache-Control', 'no-cache'),
}));

app.get('/healthz', (req, res) => res.status(200).send('ok'));

app.listen(PORT, () => console.log(`Tablecloth site listening on port ${PORT}`));
