import React from 'react';

class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    const request = await fetch(EXTERNAL_DATA_URL);
    const posts = await request.json();

    res.setHeader('Content-Type', 'text/xml');
    res.write(createSitemap(posts));
    res.end();
  }
}

export default Sitemap;