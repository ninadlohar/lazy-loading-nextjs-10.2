import React, { useEffect, useState } from "react";

import { getManufacturers } from '../../services/api';
import dynamic from 'next/dynamic';

const Details = dynamic(() => import("./details"), {
  ssr: true,
});
const OtherDetails = dynamic(() => import("./details"), {
  ssr: true,
});

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const DetailedTodos = ({ data }) => {
  const [manufacturerList, setManufacturer] = useState({ popular: [], nonPopular: [] });
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const getManufacturersList = async () => {
    let result = await getManufacturers(3000, 1);
    let popularBoats = result.data.filter(k => k.popular);
    let nonPopularBoats = result.data.filter(k => !(("popular") in k));
    let oldManufacturerList = { ...manufacturerList };
    oldManufacturerList.popular = popularBoats.map(k => {
      return {
        label: k.manufactureName, value: k.manufactureId 
      }
    });
    oldManufacturerList.nonPopular = nonPopularBoats.map(k => {
      return {
        label: k.manufactureName, value: k.manufactureId 
      }
    });
    setManufacturer(oldManufacturerList)
  }

  useEffect(() => {
    getManufacturersList();
  }, [])

  return (
    <section>
      <h3>Detailed Todos</h3>
      <Details data={data} />
      <OtherDetails data={data} open1={open1} open2={open2} options={options} setOpen1={setOpen1} setOpen2={setOpen2} manufacturerList={manufacturerList} />
    </section>
  );
};

DetailedTodos.getInitialProps = async (ctx) => {
  let data = await fetch(`https://jsonplaceholder.typicode.com/todos/${ctx.query.id}`, { method: "get" });
  data = await data.json();
  // const fs = await import('fs');
  const siteUrl = "localhost:3000";
  // generateSitemapDynamically(fs);
  // let sm = `<url>
  //   <loc>${`${siteUrl}${route}`}</loc>
  //   <lastmod>${new Date().toISOString()}</lastmod>
  //   <changefreq>monthly</changefreq>
  //   <priority>1.0</priority>
  // </url>`
  return { data };
};

export default DetailedTodos;
