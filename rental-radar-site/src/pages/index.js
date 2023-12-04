import Head from 'next/head';

import s from "src/pages/home.module.css";
import cs from "src/styles/common.module.css";

import NavigationLayout from 'src/components/NavigationLayout/';

export default function Home(props) {
  return (
    <>
      <Head>
      </Head>
      <NavigationLayout>
        <section 
          className={`py-md-5 py-3 w-100 row position-relative justify-content-center align-content-center text-center`}
          style={{zIndex: 0}}>
          <h1 className='display-2' style={{zIndex: 10}}>
            KW Rental Radar
          </h1>
          <p className='h4 mt-4' style={{zIndex: 10}}>
            Finding a house in the KW is difficult. Make it easier with rental radar.
          </p>
        </section>
      </NavigationLayout>
    </>
  );
}

    