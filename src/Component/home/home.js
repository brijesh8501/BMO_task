import React from 'react';
import NavBarNavigation from '../template-parts/navBar/navBarNavigation'
import BodyContent from './bodyContent';
import FooterBar from '../template-parts/footerBar';

// eslint-disable-next-line
const Home = () =>{

    /* This component is created to manage navigation bar */
    const navigationBar = () =>{
        
        return (<NavBarNavigation/>)

    }
     /* Body Content */
    const body = () =>{
       
        return <BodyContent content = "Home"/>
    }
    const footer = () =>{
        /* Footer */
        return <FooterBar/>
    }
    return (
        <div className="main-body">
            { navigationBar() }
            { body() }
            { footer() }
        </div>
    )
}
export default Home;