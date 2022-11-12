import React, { useEffect, useState } from "react";
import Image from "next/image";
import Car from '../../public/assets/car.png';
import { getManufacturers } from '../../services/api';
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Select = dynamic(() => import('react-select'), {
  suspense: true,
})

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const formatGroupLabel = (data) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);


const DetailedTodos = ({ data }) => {
  const [manufacturerList, setManufacturer] = useState({ popular: [], nonPopular: [] });

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
      <div>
        <ul>
          <li>id - {data.id}</li>
          <li>title - {data.title}</li>
          <li>status - {data.completed ? "yes" : "no"}</li>
        </ul>
      </div>
      <section>
        <Suspense fallback={`Loading...`}>
          <Select
            defaultValue={options[1]}
            options={options}
            formatGroupLabel={formatGroupLabel}
          />
          <Select
            defaultValue={options[0]}
            options={[...manufacturerList.popular, ...manufacturerList.nonPopular]}
            formatGroupLabel={formatGroupLabel}
          />
        </Suspense>
      </section>
      <section>
        <div>Regular Import</div>
        <div>
          <img src={'/assets/car.png'} alt="car" />
        </div>
      </section>
      <section>
        <div>Next Import</div>
        <div>
          <Image priority={true} src={Car} alt="car" />
        </div>
      </section>
      <style jsx>{``}</style>
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