import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { onAuthStateChanged,  } from "firebase/auth";
import NavigationLayout from 'src/components/NavigationLayout/';
import Loader from 'src/components/Loader/';
import { auth } from 'src/components/Firebase';

export default function Login(props) {
	const router = useRouter();
  const [uid, setUid] = useState(null)
	const [loading, setLoading] = useState(true);

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log("uid", uid)
          setUid(uid)
					setLoading(false)
        } else {
          // User is signed out
          console.log("user is logged out")
          setUid(null)
					setLoading(true)
					router.push('/')
        }
      });   
  }, []);

	const loadingSwitch = () => {
		if (loading) {
			return <Loader color='var(--primary)' size={100} center />;
		}
		return (
		<section className={`w-100 row justify-content-center align-content-center p-0 m-0`}>
			<div className='row col-lg-3 col-12 p-0 py-2'>
				<span>options</span>
			</div>
		</section>
		);
	}
  return (
    <>
      <Head>
      </Head>
      <NavigationLayout>
        <section className={`py-md-5 py-3 w-100 row justify-content-center align-content-center text-center`}>
          <h1 className='display-2'>KW Rental Radar</h1>
          <p className='h4 mt-4'>
            Finding a house in KW is difficult. Hopefully this makes it a bit easier.
          </p>
        </section>
        {loadingSwitch()}
      </NavigationLayout>
    </>
  );
}

    