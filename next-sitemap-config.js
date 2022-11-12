const siteUrl = 'localhost:3000';

module.exports = {
    siteUrl ,
    generateRobotsTxt: true,
    sitemapSize: 7000,
    outDir: './test/',
    robotsTxtOptions: {
        policies: [
          {
            userAgent: "*",
            allow: "/",
          },
        ],
      additionalSitemaps: [`${siteUrl}/server-sitemap.xml`, `${siteUrl}/sitemap.xml`]
    }
}