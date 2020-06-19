import React, {Component} from 'react';
import RestaurantHome from './Component/restaurant/restaurantHome';
import Contact from './Component/contact/contact';
import Home from './Component/home/home';

import {Route, Switch } from 'react-router-dom';

class Routes extends Component{
    render(){
        return (
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/restaurants" exact component={RestaurantHome}/>
                    <Route path="/restaurant/:id" exact component={RestaurantHome}/>
                    <Route path="/contact-us" exact component={Contact}/>
                </Switch>
        )
    }
}
export default Routes;