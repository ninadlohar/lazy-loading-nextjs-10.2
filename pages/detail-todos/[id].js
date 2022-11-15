import React, { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Car from '../../public/assets/car.png';
import { getManufacturers } from '../../services/api';
import dynamic from 'next/dynamic';
import CustomDropdown from "../../components/custom-dropdown/custom-dropdown";

const Dropdown = dynamic(() => import('../../components/detail-todos/Dropdown'), {
  suspense: true,
})

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
      <div>
        <ul>
          <li>id - {data.id}</li>
          <li>title - {data.title}</li>
          <li>status - {data.completed ? "yes" : "no"}</li>
        </ul>
      </div>
      <section>
        {/* <Suspense fallback={`Loading...`}>
          <Dropdown data1={options} data2={[...manufacturerList.popular, ...manufacturerList.nonPopular]} />
        </Suspense> */}
        <div className="row">
          <CustomDropdown open={open1} setOpen={setOpen1} data={[...manufacturerList.popular, ...manufacturerList.nonPopular]} />
        </div>
        <div className="row">
          <CustomDropdown open={open2} setOpen={setOpen2} data={options} />
        </div>
        {/* <div className="row">
          <CustomDropdown open={open} setOpen={setOpen} data={[...manufacturerList.popular, ...manufacturerList.nonPopular]} />
        </div> */}
      </section>
      {/* <section>
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
      </section> */}
      <style jsx>{`
        .row {
          margin-bottom: 20px;
        }
      `}</style>
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
