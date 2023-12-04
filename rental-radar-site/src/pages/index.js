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
    <div className={`${cs.frosted} d-flex flex-column rounded-4 p-3 position-relative align-content-start h-100 w-100`}>
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
          <div className='col-9 row' style={{marginTop: '-5vh'}}>
            {stats.map((stat, i) => <StatCard {...stat} key={i} />)}
          </div>
        </section>

      </NavigationLayout>
    </>
  );
}

    