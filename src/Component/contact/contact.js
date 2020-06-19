import React from 'react';
import NavBarNavigation from '../template-parts/navBar/navBarNavigation'
import BodyContent from './bodyContent';
import FooterBar from '../template-parts/footerBar';

// eslint-disable-next-line
const Contact = () =>{

    /* This component is created to manage navigation bar */
    const navigationBar = () =>{
        return (<NavBarNavigation/>)
    }
    /* Body Content */
    const body = () =>{  
        return <BodyContent content = "Home"/>
    }
    /* Footer */
    const footer = () =>{        
        return <FooterBar/>
    }

    return (<div className="main-body">
            { navigationBar() }
            { body() }
            { footer() }
        </div>)

}
export default Contact;