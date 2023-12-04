import Head from 'next/head';

import s from "src/pages/home.module.css";
import cs from "src/styles/common.module.css";

import NavigationLayout from 'src/components/NavigationLayout/';
import RadarScanner from 'src/components/RadarScanner';

import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from "src/components/Firebase";

async function getInitialListings() {
  const listingsCollection = collection(db, 'listings');
  const q = query(listingsCollection, orderBy('scrape_date', 'desc'), limit(30));
  const snapshot = await getDocs(q)
  const listings = snapshot.docs.map(doc => doc.data())
  return listings;
}

export const getServerSideProps = async () => {
  let listings = await getInitialListings();
  return { props: { listings } }
}

const Listing = ({listing}) => (
  <div className={`col-xxl-4 col-xl-6 col-lg-6 col-12 p-lg-2 px-3 py-2  ${cs.center}`}>
    <a
      className={`row p-2 py-3 justify-content-center bg-white border rounded-3 shadow grow h-100 w-100`}
      style={{userSelect: 'text'}}
      href={listing.url}
      target='_blank'>
      <div className={'col-12'} style={{height: 50}}>
        <h2 className='heavyFont h5 mb-0'>
          {listing.title.slice(0, 45)}
          {listing.title.length > 45 && "..."}
        </h2>
      </div>
      <div className='my-2 col-12 d-flex justify-content-between border-bottom w-100'>
        <span>
          {listing.source}
        </span>
        <span>
          {listing.loc}
        </span>
      </div>
      <div className='mb-2 col-12 d-flex justify-content-between w-100'>
        <span>
          {listing.price.toLocaleString('en-US', { style: 'currency', currency: 'CAD' })}
        </span>
        <span>
          {listing.scrape_date.slice(0, 16)}
        </span>
      </div>
      <div className={`rounded-3  p-0 ${cs.center} overflow-hidden`} style={{ height: 200, width: '95%'}}>
        <img src={listing.img} className='w-100' />
      </div>
    </a>
  </div>
) 

export default function Listings(props) {
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
          <RadarScanner 
            size={300} 
            color={`#5D774A`} 
            style={{ position: 'absolute', top: -25, right: 'calc(25% - 150px)', zIndex: 0}} />
        </section>
        <section 
          className={`w-100 row justify-content-center align-content-center p-0 m-0`}
          style={{zIndex: 10}}>
          <div className='row col-lg-10 col-12 p-0 py-2'>
            {props.listings.map((l, i) => <Listing key={i} listing={l} />)}
          </div>
        </section>
      </NavigationLayout>
    </>
  );
}

    