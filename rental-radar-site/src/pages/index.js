import Head from 'next/head';

import s from "src/pages/home.module.css";
import cs from "src/styles/common.module.css";

import NavigationLayout from 'src/components/NavigationLayout/';

/*
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';


import firebaseConfig from 'src/assets/firebase-config.json';
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
async function getSocialAccounts() {
  const socialMediaCollection = collection(db, 'social-media');
  let socialAccounts = await getDocs(socialMediaCollection)
  socialAccounts = socialAccounts.docs.map(doc => doc.data())
  return socialAccounts;
}

export const getServerSideProps = async () => {
  let socials = await getSocialAccounts();
  return { props: { socials } }
}
*/
 
export default function Home(props) {
  return (
    <>
      <Head>
      </Head>
      <NavigationLayout>
        <section className={`${cs.header}`} />
        <section className={`${cs.maxSection} row justify-content-center align-content-start`}>
          <h1>KW Rental Radar</h1>
        </section>
      </NavigationLayout>
    </>
  );
}

    