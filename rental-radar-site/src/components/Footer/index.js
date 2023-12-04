import Link from 'next/link'
import c from "/src/assets/constants";
import cs from "/src/styles/common.module.css"
import s from "./Footer.module.css";

export default function Footer() {
  return (
      <div className={`container-fluid p-0 m-0 ${s.footer} row ${cs.center} bg-white`}>
        <div className="col-11 col-md-10 d-flex flex-wrap justify-content-between align-items-center py-3 border-top">
          <div className="col-md-8 d-flex align-items-center">
            <a
              href="/"
              className={`d-md-flex d-none me-2`}
              style={{ height: 25, width: 25}}
            >
              <img
                src="/favicon.ico"
                className='img-fluid'
                alt="Home Icon"
              />
            </a>
            <div className="d-flex flex-column justify-content-center align-items-start">
              <span className="text-muted">
                © {new Date().getFullYear()} {c.siteName}, all rights reserved
              </span>
            </div>
          </div>
          
          <div className={`d-flex col-12 col-md-4 justify-content-end`}>
            <a href="http://redoxfordonline.com">
              Created by Red Oxford Online
            </a>
          </div>
        </div>
      </div>
  );
}
