import React, {Component} from 'react';
import $ from "jquery";
import 'datatables.net';
import { Link } from 'react-router-dom';

class RestaurantList extends Component{
   
    getCourse = (getCourse) => {

        var singleRestaurantCourse = Object.keys(getCourse).filter(function(item) {

            return getCourse[item] === true && item;
        });
        return singleRestaurantCourse;
    }
    passRestuarant = () => {
        const singleRestaurant = this.props.restaurants.map((restaurant,i) => {          
            return (
            <tr key={i}>
                    <td>{restaurant.name.toUpperCase()}</td>
                    <td>{restaurant.full_address.toUpperCase()}</td>
                    <td>{restaurant.description}</td>
                    <td>{restaurant.contact_number}</td>
                    <td> { this.getCourse(JSON.parse(restaurant.course)).join(', ')  }</td>
                    <td>{ Number(restaurant.status) === 1 ? <span className="badge badge-success p-2">Open</span> 
                        : 
                        <span className="badge badge-danger p-2">Closed</span> }</td>
                    <td className="d-flex justify-content-center">
                        <Link to={`/restaurant/${restaurant.id}`}><button type="button" className="btn"><i className="fas fa-edit cus-edit"></i></button></Link>
                        <button type="button" className="btn" onClick={() => { if(window.confirm("Are you sure you want to delete?")) { return this.props.deleteRestaurant(restaurant.id) } }}><i className="fas fa-trash-alt cus-trash"></i></button>
                    </td>
            </tr>)
            })
            return singleRestaurant;
    }
    cleanQueryString = () => {
        let uri = window.location.toString();
            if (uri.indexOf("?") > 0) {
                let clean_uri = uri.substring(0, uri.indexOf("?"));
                window.history.replaceState({}, document.title, clean_uri);
            }
    }
    componentDidMount(){
        $(document).ready(function(){
            $('#dataTable').DataTable();
        });  
    }
    componentDidUpdate() {
        $(document).ready(function(){
            $('#dataTable').DataTable();
        });  
        
    }
    render(){   
        const emptyMessage = (
            <div className="alert alert-warning d-block" role="alert">
                There is no restaurant yet in the list!
          </div>
        )
        return <div>
            
                { (getParameterByName('msg') === 'insertSuccess') ?
                    (<div className="alert alert-success" role="alert">
                        Record inserted successfully!
                    </div>) 
                    :
                    (getParameterByName('msg') === 'updateSuccess') ?       
                        (<div className="alert alert-success" role="alert">
                            Record updated successfully!
                        </div>):"" 
                }
                {this.props.restaurants.length === 0 ? emptyMessage :
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Description</th>
                            <th>Contact Number</th>
                            <th>Course</th>
                            <th>Status</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {   this.passRestuarant() }            
                        </tbody>
                        </table>
                    </div>
                }
                 </div>
    }
}
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
export default RestaurantList;