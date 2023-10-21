import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { onAuthStateChanged,  } from "firebase/auth";
import NavigationLayout from 'src/components/NavigationLayout/';
import Loader from 'src/components/Loader/';
import { auth } from 'src/components/Firebase';

const houseTypes = {
	detached: 'Detached', 
	multi: 'Multi-Unit', 
	townhouse: 'Townhouse',
};

export default function Login() {
	const router = useRouter();
  const [uid, setUid] = useState(null)
	const [loading, setLoading] = useState(true);
	const [houseTypeBools, setHouseTypeBools] = useState(Object.fromEntries(Object.keys(houseTypes).map(key => [key, false])))

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

	const houseButtonClick = (house) => {
		setHouseTypeBools({...houseTypeBools, [house]: !houseTypeBools?.[house]})
	}

	const loadingSwitch = () => {
		if (loading) {
			return <Loader color='var(--primary)' size={100} center />;
		}
		return (
		<section className={`w-100 row justify-content-center align-content-center p-0 m-0`}>
			<div className='row col-lg-10 col-12 p-0 py-2'>
				<div className={`row w-100 border`}>
					<span className='headerFont h5 text-center mb-4'>
						What type of houses are you interested in?
					</span>
					{Object.keys(houseTypes).map((house, i) => (
						<div key={i} className={`col-lg-4 col-12 px-5 row`}>
							<input 
								type="checkbox" 
								className="btn-check" 
								id={`${house}_btn`}
								checked={houseTypeBools?.[house]}
								onChange={() => houseButtonClick(house)} />
							<label className="btn btn-outline-primary" htmlFor={`${house}_btn`}>
								{houseTypes[house]}
							</label>
						</div>
					))}
				</div>
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

    