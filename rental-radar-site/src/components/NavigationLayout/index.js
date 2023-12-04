import cs from "src/styles/common.module.css";
import NavBar from 'src/components/Navigation/';
import Footer from 'src/components/Footer/';

export default function NavigationLayout({ children }) {
  return (
    <>
      <header style={{zIndex: 10}}>
        <NavBar />
      </header>
      <main className={`row p-0 m-0 justify-content-center align-items-start`}>
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}
