import React from 'react';
import {Link} from 'react-router-dom';

const NavBarMenu = (props) =>{
    let template = null;
    const checkActive = (window.location.pathname===props.hrefLink) ? 'active' : '';
    switch(props.menuType)
    {
        case('Single') :
            template = (
                <li className={`nav-item ${checkActive}`}>
                    <Link 
                        className="nav-link" 
                        to={props.hrefLink}
                        hrefLang= "Bbb"
                    >
                        {props.menuTitle}
                    </Link>
                </li>
            );
            break;
        case('Dropdown') :
            template = (
                <li className={`nav-item dropdown ${checkActive}`}>
                    <Link 
                        className="nav-link dropdown-toggle" 
                        to={props.hrefLink}
                        id="navbarDropdown" 
                        role="button" 
                       >
                            {props.menuTitle}
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    { props.dropDownMenuLink.map( (item, i) =>
                            {
                                return (
                                    <Link 
                                        to={item.Link}
                                        className="dropdown-item"> 
                                            {item.DropMenuTitle}
                                    </Link>)
                            }) }
                    </div>
                </li>
            );
            break;
        default :
            template = null;
    }
    return template
}
export default NavBarMenu;