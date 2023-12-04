import Head from 'next/head';


import TopSeperator from 'public/images/seperator-top.svg';
import MetricArrowGreen from 'public/images/metric-arrow-green.svg';
import MetricArrowRed from 'public/images/metric-arrow-red.svg';
import s from "src/pages/home.module.css";
import cs from "src/styles/common.module.css";

import NavigationLayout from 'src/components/NavigationLayout/';
const stats = [
  {
    title: () => <>Vacancy rates are <b>decreasing</b></>,
    arrowColor: 'red',
    arrowUp: false,
    statArray: [{year: 2021, value: '3.1%'}, {year: 2022, value: '1.1%'}],
  },
  {
    title: () => <>Rent has been <b>increasing</b></>,
    arrowColor: 'red',
    arrowUp: true,
    statArray: [{year: 2020, value: '$1604'}, {year: 2021, value: '$1703'}, {year: 2022, value: '$2308'}],
  },
  {
    title: () => <>Our population is growing <b>fast</b></>,
    arrowColor: 'green',
    arrowUp: true,
    statArray: [{year: 2020, value: '623K'}, {year: 2021, value: '632K'}, {year: 2022, value: '647K'}],
  }
];

const StatCard = ({title, statArray, arrowColor, arrowUp }) => {
  const Arrow = arrowColor === 'green' ? MetricArrowGreen : MetricArrowRed;
  return (
  <div className={`col-lg-4 p-1 p-lg-2 px-xxl-5`} style={{height: 275}}>
    <div className={`${cs.frosted} shadow-sm d-flex flex-column rounded-4 p-3 position-relative align-content-start h-100 w-100`}>
      <h2 className=''>
        {title()}
      </h2>
      <div className='row ' style={{flex: 1}}>

        <div 
          className='col-8 row justify-content-center align-content-center'
          style={{zIndex: 20}}>
          {statArray.map((stat, i) => (
            <span className='h3 text-nowrap'>{stat.year}, <b>{stat.value}</b></span>
          ))}
        </div>
      
        <div 
          className='position-relative col-4 d-flex flex-column justify-content-center align-items-center'
          style={{zIndex: 10}}>
          <Arrow 
            className='h-100 position-absolute' 
            style={arrowUp ? {transform: 'scaleY(-1)'} : null} />
        </div>
      </div>
    </div>
  </div>
)};

export default function Home(props) {
  return (
    <>
      <Head>
      </Head>
      <NavigationLayout>
        <section className={`${s.hero} gradient-light col-12 row justify-content-end`}
            style={{ overflowX: 'clip', overflowY: 'visible', zIndex: 10}}>
          <div className={`col-5 row justify-content-center align-content-center`}>
            <h1 className='display-2 header' style={{zIndex: 10}}>
              Waterloos rental competition is <span className='heavy'>fierce</span>
            </h1>
            <p className='display-6 ps-3'>
              With a rental house vacancy rate of 1.1%* in 2022, you’ll need a edge to find a house
            </p>
          </div>
          <div className='col-6 d-flex justify-content-center align-items-center position-relative'>
              <img 
                src="/images/house.png" 
                className="position-absolute start-0" 
                style={{height: 'auto', height: '100%', minWidth: 600, maxHeight: '100%', transform: 'scalex(-1)scale(1)' }}
                alt="3D render of a house" />
          </div>
        </section>

        <section className={`${s.issueOutline} col-12 position-relative row justify-content-center gradient-accent-muted`}
          style={{zIndex: 15}}>
          <TopSeperator style={{position: 'absolute', fill: 'var(--gradient-light-stop)', padding: 0 }} />
          <div className='col-9 row pb-3' style={{marginTop: '-5vh'}}>
            {stats.map((stat, i) => <StatCard {...stat} key={i} />)}
          </div>

          <div className='col-9 row py-4'>
            <h3 className='display-4 '>
              Nowadays it's not enough to be a <span className='header'>good</span> applicant;<br/>
              You have to be a <span className='header'>fast</span> applicant.
            </h3>
          </div>

          <div className='col-9 row py-4 mb-4'>
            <div className={`${cs.frosted} shadow-sm rounded-4 w-100 row`}>
              <div className='col-7 row ps-4 py-5'>
                <p className='h4 mb-4'>
                  KW rental agency operate on a first come, first serve basis when showing new houses. If the first applicant is a good one, they’ll stop the search.
                </p>
                <p className='h4'>
                  Getting notifications as soon as a house goes on the rental market is your competitive edge to getting a new house.
                </p>
              </div>
              <div className='col-5 position-relative d-flex justify-content-center overflow-hidden'>
                <div 
                  className='rounded-top-5 shadow px-4 pt-4'
                  style={{width: '95%', maxWidth: 450, height: '90%', position: 'absolute', bottom: 0, backgroundColor: '#d9d9d9'}}>
                  {[1, 6, 11, 16].map((min, i) => (
                    <div className='row pb-1' key={i}>
                      <div className='rounded-top-4 rounded-start-4 py-1' style={{ backgroundColor: '#6594DA'}}>
                        <span className='text-white h2 p-0'>
                          {Math.floor(Math.random() * 10) + 4} new houses available!
                        </span>
                      </div>
                      <span className='text-end p-0'>{min} min ago</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <TopSeperator style={{fill: 'var(--gradient-light-stop)', padding: 0, transform: 'rotate(180deg)scaleX(-1)'}} />
        </section>

      </NavigationLayout>
    </>
  );
}

    