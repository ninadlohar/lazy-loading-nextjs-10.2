import { getServerSideSitemap, ISitemapField } from 'next-sitemap';

export const getServerSideProps = async (ctx) => {
    console.log('getServerSideProps ctx', ctx)
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();

    const fields = data.map(k => ({
        loc: `https://jsonplaceholder.typicode.com/todos/${k.id}`,
        lastMod: new Date().toUTCString()
    }));
    
    return getServerSideSitemap(ctx, fields);
}

export default function Site() {}