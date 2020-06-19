import React from 'react';
import {Link} from 'react-router-dom';
import NavBarMenu from './navBarMenu';

const NavBarNavigation = (props) =>{
    return (<nav className="navbar navbar-expand-lg navbar-light fixed-top navbar-custom-style">
                <div className="container">
                    <Link className="navbar-brand" to="/">The Select Group (BMO)</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <NavBarMenu
                                menuType = "Single"
                                hrefLink = "/restaurants"
                                menuTitle = "Restaurants"
                            />
                            <NavBarMenu
                                menuType = "Single"
                                hrefLink = "/contact-us"
                                menuTitle = "Author"
                            />
                        </ul>
                    </div>
                </div>            
            </nav>)
}

export default NavBarNavigation