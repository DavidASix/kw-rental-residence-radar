import Head from 'next/head';


import TopSeperator from 'public/images/seperator-top.svg';
import s from "src/pages/home.module.css";
import cs from "src/styles/common.module.css";

import NavigationLayout from 'src/components/NavigationLayout/';

export default function Home(props) {
  return (
    <>
      <Head>
      </Head>
      <NavigationLayout>
        <section className={`${s.hero} gradient-light col-12 row justify-content-end border border-info`}
            style={{ overflowX: 'clip', overflowY: 'visible', zIndex: 10}}>
          <div className={`col-5 row justify-content-center align-content-center border`}>
            <h1 className='display-6 header' style={{zIndex: 10}}>
              Waterloos rental competition is <span className='heavy'>fierce</span>
            </h1>
            <p className='h4 ps-3'>
              With a rental house vacancy rate of 1.1%* in 2022, you’ll need a edge to find a house
            </p>
          </div>
          <div className='col-6 d-flex justify-content-center align-items-center position-relative'>
              <img 
                src="/images/house.png" 
                className="position-absolute start-0" 
                style={{height: 'auto', width: '100%', minWidth: 600, maxHeight: '90vh', transform: 'scalex(-1)scale(1.175)' }}
                alt="3D render of a house" />
          </div>
        </section>

        <section className={`${s.issueOutline} col-12 position-relative row justify-content-center gradient-accent-muted`}
          style={{zIndex: 5}}>
          <div className='w-100 position-absolute top-0' style={{height: '5vh', backgroundColor: 'var(--modal)'}} />
          <TopSeperator 
            style={{position: 'absolute', top:'5vh', fill: 'var(--modal)', padding: 0 }} />
          <div className='col-8 row'>
          <div className={`col-4 p-2 border`}>
              <div className={`w-100 h-100 ${cs.frosted} row rounded-4`}>
                <h2>Text</h2>
              </div>
            </div>
            <div className={`col-4 p-2 border`}>
              <div className={`w-100 h-100 ${cs.frosted} row rounded-4`}>
                <h2>Text</h2>
              </div>
            </div>
            <div className={`col-4 p-2 border`}>
              <div className={`w-100 h-100 ${cs.frosted} row rounded-4`}>
                <h2>Text</h2>
              </div>
            </div>
          </div>
        </section>

      </NavigationLayout>
    </>
  );
}

    