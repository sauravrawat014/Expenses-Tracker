import Footer from "./Footer";
import Header from "./Header";

export default function Layout({children}){
    return(
        <>
        <Header/>
        <div className="content">
            {children}

        </div>
       <Footer/>
        </>
    )
}
