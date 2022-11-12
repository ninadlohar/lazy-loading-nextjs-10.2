const express = require("express");
const next = require("next");
// var cookieParser = require('cookie-parser');
const { parse } = require("url");
const port = 7123;
const dev = false;
const app = next({ dev });
var path = require("path");
const handle = app.getRequestHandler();
const fs = require('fs')
const globby = require('globby')

const compression = require("compression");
// const { generateSitemapDynamically } = require("./scripts/generate-sitemap-dynamically");
// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

app.prepare().then(() => {
  const server = express();
  server.use(compression());
  // server.use(cookieParser());

  server.get("/", (req, res) => {
    // console.log("REGISER", register)
    // register();
    const actualPage = "/";
    const queryParams = {};
    app.render(req, res, actualPage, queryParams);
  });

//   server.get("/sitemap.xml", (req, res) => {
//     res.set(
//       "Cache-Control",
//       "no-store, no-cache, must-revalidate, proxy-revalidate"
//     );
//     res.set("Content-Type", "application/javascript");
//     res.sendFile(path.join(__dirname, "static", "sitemap.xml"));
//   });

//   server.get("/googlee8d5546afa58f4c5.html", (req, res) => {
//     res.set(
//       "Cache-Control",
//       "no-store, no-cache, must-revalidate, proxy-revalidate"
//     );
//     res.set("Content-Type", "application/javascript");
//     res.sendFile(path.join(__dirname, "static", "googlee8d5546afa58f4c5.html"));
//   });

//   server.get("/robots.txt", (req, res) => {
//     res.set(
//       "Cache-Control",
//       "no-store, no-cache, must-revalidate, proxy-revalidate"
//     );
//     res.set("Content-Type", "application/javascript");
//     res.sendFile(path.join(__dirname, "static", "robots.txt"));
//   });

  server.get("/comments", (req, res) => {
    const actualPage = "/comments";
    const queryParams = {};
    console.log('comments page loaded')
    app.render(req, res, actualPage, queryParams);
  });

  server.get("/detailed-comment/:id", (req, res) => {
    const actualPage = "/detailed-comment/[id]";
    const queryParams = {};
    console.log('server side comments page loaded', req.originalUrl)
    const siteUrl = 'localhost:3000';

        function addPage(page) {
          const path = page.replace('pages', '').replace('.js', '').replace('.mdx', '')
          const route = path === '/index' ? '' : req.originalUrl;
          return `<url>
            <loc>${`${siteUrl}${route}`}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
          </url>`
        };
      
        async function generateSitemap() {
            fs.appendFileSync('test/sitemap.xml', `<url>
            <loc>${`${siteUrl}${req.originalUrl}`}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
          </url>`);
            // fs.writeFileSync('test/sitemap.xml', sitemap)
          }
        
        generateSitemap()
    app.render(req, res, actualPage, queryParams);
  });


  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
})