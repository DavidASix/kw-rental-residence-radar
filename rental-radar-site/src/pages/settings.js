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
	const [houseTypeBools, setHouseTypeBools] = useState(Object.fromEntries(Object.keys(houseTypes).map(key => [key, false])));
	const [smsEnabled, setSmsEnabled] = useState(false);

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log("uid", uid)
          setUid(uid)
					// TODO: Write a "Set user state" function to get the state from the server and set initial state
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
	const enableSmsClick = () => {
		setSmsEnabled(!smsEnabled);
	}

	const loadingSwitch = () => {
		if (loading) {
			return <Loader color='var(--primary)' size={100} center />;
		}
		return (
		<section className={`w-100 row justify-content-center align-content-center p-0 m-0`}>
			<div className='row col-lg-10 col-12 p-0 py-2'>
				<div className={`row w-100 border-top py-5`}>
					<span className='headerFont h3 text-start mb-5'>
						Setup SMS Notification Settings
					</span>
					<div className={`col-lg-4 col-8 row m-0 p-0`}>
						<span className='text-start h5 m-0'>Enable SMS Notifications:</span>
					</div>
					<div className="form-check form-switch d-flex justify-content-start m-0 col-lg-8 col-4">
						<input 
							title='SMS Toggle' 
							className="form-check-input my-0" 
							type="checkbox" 
							role="switch" 
							onChange={enableSmsClick}
							checked={smsEnabled}
							style={{height: 30, width: 75}} />
					</div>
					<span className='h5 text-start mt-5'>
						What type of houses are you interested in?
					</span>
					{Object.keys(houseTypes).map((house, i) => (
						<div key={i} className={`col-lg-4 col-12 px-5 mt-3 row`}>
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

    