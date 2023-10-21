import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {BsInfoCircleFill, BsGearFill} from 'react-icons/bs';
import {BiSolidLogIn, BiSolidLogOut, BiSolidHome} from 'react-icons/bi'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from 'src/components/Firebase';

import s from "./Navigation.module.css";
import cs from "src/styles/common.module.css";

export default function Navigation() {
  const [uid, setUid] = useState(null)
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          // ...
          console.log("uid", uid)
          setUid(uid)
        } else {
          // User is signed out
          // ...
          console.log("user is logged out")
          setUid(null)
        }
      });   
  }, []);

	const logout  = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth)
    } catch (err) {
      console.log('Error logging out', err)
    }
	} 

  const router = useRouter()
  return (
    <>
      <div
        className={`container-fluid align-items-center `}
      >
        <nav
          className={`navbar navbar-expand-lg navbar-light pb-0`}>
          <button
            className="navbar-toggler border m-1 w-100"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navBarContent"
            aria-controls="navBarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse px-2" id="navBarContent">
            <div className="navbar-nav me-auto" />

            <ul className="navbar-nav">
              <li className="nav-item">
              {router.asPath !== '/' ? (
                <a 
                  className={`nav-link grow ${s.navItem} ${cs.grow}`} 
                  href="/" 
                  aria-label='home'
                  title="Home">
                  <BiSolidHome size={25} className={`mx-2 d-lg-block d-none`} />
                  <span className='btn btn-outline-primary w-100 h4 headerFont m-0 d-lg-none d-block'>
                    Home
                  </span>
                </a>
                ) : 
                <button 
                  type="button"
                  aria-label='Info'
                  title="Info"
                  data-bs-toggle="modal"
                  data-bs-target="#infoModal"
                  style={{background: 'none', border: 'none'}}
                  className={`nav-link grow ${s.navItem} ${cs.grow} w-100`} 
                  >
                  <BsInfoCircleFill size={25} className={`mx-2 d-lg-block d-none`} style={{fill: 'var(--dark)'}} />
                  <span className='btn btn-outline-primary w-100 h4 headerFont m-0 d-lg-none d-block'>
                    Info
                  </span>
                </button>
                }
              </li>
              { uid ? (
              <li className="nav-item">
                <a 
                  className={`nav-link grow ${s.navItem} ${cs.grow}`} 
                  href="/settings" 
                  aria-label='settings'
                  title="Settings">
                  <BsGearFill size={25} className={`mx-2 d-lg-block d-none`} style={{fill: 'var(--dark)'}} />
                  <span className='btn btn-outline-primary w-100 h4 headerFont m-0 d-lg-none d-block'>
                    Settings
                  </span>
                </a>
              </li>
              ) : null}
              <li className="nav-item">
                {uid ? (
                  <button 
                  type="button"
                  aria-label="Logout"
                  title="Logout"
                  onClick={logout}
                  style={{background: 'none', border: 'none'}}
                  className={`nav-link grow ${s.navItem} ${cs.grow} w-100`} 
                  >
                  <BiSolidLogOut size={25} className={`mx-2 d-lg-block d-none`} style={{fill: 'var(--dark)'}} />
                  <span className='btn btn-outline-primary w-100 h4 headerFont m-0 d-lg-none d-block'>
                    Logout
                  </span>
                </button>  
                ) : (
                <a className={`nav-link grow ${s.navItem} ${cs.grow}`} href="/login" aria-label='Login'>
                  <BiSolidLogIn size={25} className={`mx-2 d-lg-block d-none`} style={{fill: 'var(--dark)'}} />
                  <span className='btn btn-outline-primary w-100 h4 headerFont m-0 d-lg-none d-block'>
                    Login
                  </span>
                </a>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="modal fade" id="infoModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" id="infoModal">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">How does it work?</h2>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <h3 className='h4'>Concept</h3>
              <p>KW Rental Radar (KWRR) is a project by David Anderson created initially to help him search for a new rental house. </p>
              <p>This project solves the real world problem of Kitchener Waterloo’s housing market being extremely competitive. This tool allowed David to be the first to respond to a new home listing Waterloo, which he then rented!</p>
              <p>The project consists of two main parts, Data Collection, and the Data Presentation.</p>
              <h3 className='h4'>Data Collection</h3>
              <p>Data collection is performed by a Python script which is scheduled to run every 5 minutes as a Google Cloud function. It checks 3 rental listing sites for houses matching David’s family needs, normalizes their data,  then stores any new listings in a Firestore database. If there were new listings, the script then sends a text message to him via the Twilio API with the number of new listings and their sources.</p>
              <h3 className='h4'>Data Presentation</h3>
              <p>The presentation is this NextJS site, hosted on Firebase. It taps into the Firestore collection of listings and displays the 30 most recently found listings.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
