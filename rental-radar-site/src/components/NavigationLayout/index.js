import cs from "src/styles/common.module.css";
import NavBar from 'src/components/Navigation/';
import Footer from 'src/components/Footer/';

export default function NavigationLayout({ children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", overflowX: 'hidden' }}>
      <header style={{zIndex: 10}}>
        <NavBar />
      </header>
      <main 
        className={`d-flex flex-column p-0 justify-content-start align-items-center`}
        style={{flex: 1, zIndex: 1 }}>
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}
