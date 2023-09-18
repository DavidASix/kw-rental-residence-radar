import cs from "src/styles/common.module.css";
import NavBar from 'src/components/Navigation/';
import Footer from 'src/components/Footer/';

export default function NavigationLayout({ children }) {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className={`d-flex flex-column p-0 justify-content-center align-items-center`}>
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}
