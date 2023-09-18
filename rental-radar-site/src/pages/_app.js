import Head from 'next/head';
import Script from 'next/script'

import 'src/styles/bootstrap.css';
import 'src/styles/theme.css';
import 'src/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>KW Rental Radar</title>
        <meta name="description" content="Finding a rental in KW for my families specific needs has been a challenge. This site aggregates rentals within our desired parameters. " />

      </Head>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous" />
      <Component {...pageProps} />
    </>
  );
}
