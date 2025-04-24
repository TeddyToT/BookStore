
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { publicRoutes } from './Routes';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import { AppProvider } from './AppContexts/Contexts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RollToTopButton from './components/ScrollToTop/ScrollToTop';
import ScrollToTop from './components/ScrollToTop/AutoTop';
function App() {


  return (
    <>
      <BrowserRouter>
      <ScrollToTop/>
      <RollToTopButton/>
      <ToastContainer/>
      <AppProvider>
        <Header />
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.conponent;
            return <Route key={index} path={route.path} element={<Page />} />
          })}
        </Routes>
        <Footer />
        </AppProvider>
      </BrowserRouter>


    </>
  )
}

export default App
