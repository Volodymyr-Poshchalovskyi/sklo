// Tells Bing (and through it ChatGPT search, Copilot, Yandex, Naver, Seznam)
// which URLs changed, so they are re-crawled within minutes instead of
// weeks. Google ignores IndexNow; Search Console covers it.
//
//   node scripts/seo/indexnow.mjs                 # every URL in the sitemap
//   node scripts/seo/indexnow.mjs /en/projects /de/projects   # specific paths
//
// The key file public/<key>.txt proves ownership of the host; the same key
// is sent in the body. Safe to run after every deploy.
const HOST = "sklo.studio";
const KEY = "7f3c9a1e4b8d4e6f9a2c5b7d8e1f3a4c";

const args = process.argv.slice(2);
let urls;
if (args.length) {
  urls = args.map((p) => (p.startsWith("http") ? p : `https://${HOST}${p}`));
} else {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} — ${urls.length} URLs`);
