import React from 'react';
import Image from "next/image";
import Car from '../../public/assets/car.png';
import CustomDropdown from "../../components/custom-dropdown/custom-dropdown";
// const Dropdown = dynamic(() => import('../../components/detail-todos/Dropdown'), {
//     suspense: true,
// })

const OtherDetails = ({ manufacturerList, options, open1, open2, setOpen1, setOpen2 }) => {
    return  <React.Fragment>   <section>
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
    <style jsx>{`
    .row {
      margin-bottom: 20px;
    }
  `}</style>
  </section>
  </React.Fragment>  
}

export default OtherDetails;