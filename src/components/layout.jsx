import { Outlet } from "react-router-dom";
import Banner from "./banner";
import { useState,useEffect } from "react";
import { SearchOverlay } from "./searchOverlay";
import { useLocation } from "react-router-dom";
import Footer from "./footer"
export  function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [pathname]);

  return null;
}
export default function Layout() {
const [showOverlay,setShowOverlay]=useState(false);
  const [isClosing, setIsClosing] = useState(false);
    const location = useLocation();

 useEffect(() => {
    setShowOverlay(false);
  }, [location.pathname]);
useEffect(() => {
  if (showOverlay) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}, [showOverlay]);
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowOverlay(false);
      setIsClosing(false);
    }, 400); 
  };
   return (
        <>
        <ScrollToTop />
            <div className="app" >
                <Banner searchPage={() => setShowOverlay(true)}/>
                     
                <Outlet />
            
        </div>
        {showOverlay && (
         <div className="search-overlay">
            <SearchOverlay         handleClose={() => handleClose()}
isClosing={isClosing}
/>
      </div>  )}
        
        <Footer/>
   </> )
}