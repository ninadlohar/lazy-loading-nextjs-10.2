// import { writeFileSync } from 'fs';
// import { globby } from 'globby';
// import prettier from 'prettier';

// async function generate() {
//   const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
//   const pages = await globby([
//     'pages/*.js',
//     'data/**/*.mdx',
//     '!data/*.mdx',
//     '!pages/_*.js',
//     '!pages/api',
//     '!pages/404.js'
//   ]);

//   const sitemap = `
//     <?xml version="1.0" encoding="UTF-8"?>
//     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//         ${pages
//           .map((page) => {
//             const path = page
//               .replace('pages', '')
//               .replace('data', '')
//               .replace('.js', '')
//               .replace('.mdx', '');
//             const route = path === '/index' ? '' : path;

//             return `
//               <url>
//                   <loc>${`https://leerob.io${route}`}</loc>
//               </url>
//             `;
//           })
//           .join('')}
//     </urlset>
//     `;

//   const formatted = prettier.format(sitemap, {
//     ...prettierConfig,
//     parser: 'html'
//   });

//   // eslint-disable-next-line no-sync
//   writeFileSync('test/sitemap.xml', formatted);
// }

// generate();

// ------------------------------------------------------------------------------------------------ //
const fs = require('fs')
const globby = require('globby');

const siteUrl = 'localhost:3000';

export const generateSitemapDynamically = async (incomingRoute) => {
  function addPage(page) {
    const path = page.replace('pages', '').replace('.js', '').replace('.mdx', '')
    const route = path === '/index' ? '' : path
    return `<url>
      <loc>${`${siteUrl}${incomingRoute}`}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>1.0</priority>
    </url>`
  };

    // excludes Nextjs files and API routes.
    const pages = await globby([
      'pages/**/*{.js,.mdx}',
      '!pages/_*.js',
      '!pages/api',
    ])
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(addPage).join('\n')}
  </urlset>`
    fs.writeFileSync('test/sitemap.xml', sitemap)
}