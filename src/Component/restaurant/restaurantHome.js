import React, {Component} from 'react';
import RestaurantList from './restaurantList';
import RestaurantAdd from './restaurantAdd';
import NavBarNavigation from '../template-parts/navBar/navBarNavigation';
import FooterBar from '../template-parts/footerBar';
import { connect } from 'react-redux';
import { fetchRestaurants, deleteRestaurant } from '../../actions';

class RestaurantHome extends Component{

    constructor(props) {
        super(props);
        this.state = {tab: ""};
    
        // This binding is necessary to make `this` work in the callback
        this.handleTabSwitch = this.handleTabSwitch.bind(this);
      }
    /* This component is created to manage navigation bar */
    navigationBar = () =>{
        
        return (<NavBarNavigation/>)

    }
    handleTabSwitch(e) {
        const currentActiveTab = e.target.id;
        this.setState(() => ({
            tab: currentActiveTab
          }));
    }
    /* Body Content */
    body = () =>{ 
        return <div className="container" style={{paddingTop:'10px'}}>
                    <div className="card">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className={`nav-link ${(!this.props.match.params.id) && "active"} ${(this.props.match.params.id) && "disabled"}`} id="restaurant-list-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true" onClick={this.handleTabSwitch}>Restaurant List</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${(this.props.match.params.id) && "active"}`} id="add-restaurant-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false" onClick={this.handleTabSwitch}>Add New Restaurant</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className={`tab-pane fade ${(!this.props.match.params.id) && "show active"}`} id="home" role="tabpanel" aria-labelledby="home-tab">
                                { ((this.state.tab === 'restaurant-list-tab') || (!this.props.match.params.id)) && <RestaurantList restaurants={this.props.restaurants} deleteRestaurant={this.props.deleteRestaurant}/> }
                            </div>
                            <div className={`tab-pane fade ${(this.props.match.params.id) && "show active"}`} id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div className="d-flex justify-content-center">
                                    { ((this.state.tab === 'add-restaurant-tab') || (this.props.match.params.id)) && <RestaurantAdd restaurant={this.props.restaurant}/> }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    }
    /* Footer */
    footer = () =>{ 
        return <FooterBar/>
    }
    componentDidMount(){
        this.props.fetchRestaurants();
    }
    render(){
        
        return (<div className="main-body">
                    { this.navigationBar() } 
                    { this.body() }
                    { this.footer() }
                </div>)
    }

}
function mapStateToProps(state, props){
    
    if(props.match.params.id){
        return{
            restaurant: state.restaurants.find(item => item.id.toString() === props.match.params.id),
        }
    }
    return{
        restaurants: state.restaurants,
        restaurant: null
    }
}
export default connect(mapStateToProps, { fetchRestaurants, deleteRestaurant })(RestaurantHome);