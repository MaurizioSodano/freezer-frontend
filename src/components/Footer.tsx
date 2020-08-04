import React from "react";

const currentYear=new Date().getFullYear();


const Footer:React.FC =()=> {
    return <footer>
            <p >
         Copyright © {currentYear}
    </p>
    </footer>

}
    

export default Footer;