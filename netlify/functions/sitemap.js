exports.handler = async function(event, context) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://abutalha09.netlify.app/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/xml'
    },
    body: xml
  };
};
