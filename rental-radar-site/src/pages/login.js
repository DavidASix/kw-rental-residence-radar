import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'
import NavigationLayout from 'src/components/NavigationLayout/';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from 'src/components/Firebase';

export default function Login(props) {
	const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

	const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

	const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      // Authentication successful, redirect home
			router.push('/');
    } catch (error) {
      // Handle authentication errors here.
      console.error('Error signing in:', error.message);
    }
  };

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
        <section className={`w-100 row justify-content-center align-content-center p-0 m-0`}>
          <div className='row col-lg-3 col-12 p-0 py-2'>
						<form onSubmit={handleFormSubmit}>
							<div className="form-group">
								<label htmlFor="emailInput">Email address</label>
								<input
									type="email"
									className="form-control"
									id="emailInput"
									aria-describedby="emailHelp"
									placeholder="Enter email"
									value={email}
									onChange={handleEmailChange}
								/>
								<small id="emailHelp" className="form-text text-muted">
									KWRR Username Email
								</small>
							</div>
							<div className="form-group">
								<label htmlFor="passwordInput">Password</label>
								<input
									type="password"
									className="form-control"
									id="passwordInput"
									placeholder="Password"
									value={password}
									onChange={handlePasswordChange}
								/>
							</div>
							<button type="submit" className="mt-3 btn btn-primary">
								Login
							</button>
						</form>
          </div>
        </section>
      </NavigationLayout>
    </>
  );
}

    