export default function Custom404() {
    return (
        <div 
            style={{ width: '100vw', height: '100vh'}} 
            className="row justify-content-center align-items-center align-content-center">
            <div style={{ height: 200, width: 200 }} className='d-flex justify-content-center align-items-center'>
              <img
                src="/favicon.ico"
                className='img-fluid w-100'
                alt="Home Icon"
              />
            </div>
            <h1 className="text-center display-1">
                404
            </h1>
            <h2 className="text-center display-4 heavyFont">
                page is not on our radar
            </h2>
            <a href='/' className="text-center h4">Go Home</a>
        </div>
    );
  }