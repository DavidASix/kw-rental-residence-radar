import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { onAuthStateChanged,  } from "firebase/auth";
import NavigationLayout from 'src/components/NavigationLayout/';
import Loader from 'src/components/Loader/';
import { auth, db } from 'src/components/Firebase';
import { collection, doc, getDoc, setDoc, orderBy, limit } from 'firebase/firestore';

const houseTypes = {
	detached: 'Detached', 
	multi: 'Multi-Unit', 
	townhouse: 'Townhouse',
};
const defaultHouseTypeBools = Object.fromEntries(Object.keys(houseTypes).map(key => [key, true]));
const defaultSettingsState = {
	smsEnabled: false, 
	rentMaxPrice: 1000, 
	houseTypeBools: defaultHouseTypeBools
};

export default function Login() {
	const router = useRouter();
  const [uid, setUid] = useState(null)
	const [loading, setLoading] = useState(true);
	const [houseTypeBools, setHouseTypeBools] = useState(defaultHouseTypeBools);
	const [smsEnabled, setSmsEnabled] = useState(true);
	const [rentMaxPrice, setRentMaxPrice] = useState(1000);

  useEffect(()=>{
    onAuthStateChanged(auth, async (user) => {
        if (user) {
          const uid = user.uid;
          setUid(uid)
					// Initialize base stat based on users current serverside state
					try {
						await getUserSettings(uid);
					} catch (err) {
						console.log('Could not get initial Settings')
					}
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

	const getUserSettings = (uid) => new Promise(async (resolve, reject) => {
		try {
			const usersCollection = collection(db, 'users');
			const userDocRef = doc(usersCollection, uid)
			const userDocSnap = await getDoc(userDocRef);
			if (userDocSnap.exists()) {
				// Document exists, you can access its data
				const userData = userDocSnap.data();
				setHouseTypeBools({ ...userData?.houseTypeBools });
				setSmsEnabled(userData?.smsEnabled);
				setRentMaxPrice(userData?.rentMaxPrice)
				console.log(userData);
			} else {
				await setDoc(userDocRef, defaultSettingsState)
			}
			return resolve(true);
		} catch (err) {
			console.error('Could not get user settings', err.message)
			return reject(err.message);
		}
	});

	
	const houseButtonClick = (house) => {
		// TODO: Add in Firebase user profile update
		setHouseTypeBools({...houseTypeBools, [house]: !houseTypeBools?.[house]})
	}
	const enableSmsClick = () => {
		// TODO: Add in Firebase user profile update
		setSmsEnabled(!smsEnabled);
	}
	const rentRangeOnChange = ({target}) => {
		// TODO: Add in Firebase user profile update
		setRentMaxPrice(target.value)
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
					<span className='h5 text-start mt-5'>
						What's your maximum rent price?
					</span>
					<span className='headerFont text-end'>${rentMaxPrice}.00/month</span>
					<input 
						type="range" 
						className="form-range" 
						min="100" 
						max="10000" 
						step="100" 
						value={rentMaxPrice} 
						onChange={rentRangeOnChange} />
					<div className='d-flex flex-row justify-content-between'>
						<small>$100</small>
						<small>$10,000</small>
					</div>
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

    