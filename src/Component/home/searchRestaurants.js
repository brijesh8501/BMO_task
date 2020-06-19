import React, {Component} from 'react';

class SearchRestaurant extends Component{

    getCourse = (getCourse) => {

        var singleRestaurantCourse = Object.keys(getCourse).filter(function(item) {

            return getCourse[item] === true && item;
        });
        return singleRestaurantCourse;
    }
    searchRestaurantList = () =>{

        const searchList = this.props.restaurants.map((restaurant,i) => {

                return (<div className="col-xs-12 col-md-6 col-lg-6 mb-4" key={i} id={`id-${i}`}
                             tabindex="0" aria-attribute="card restaurant 1 of 10" >
                    <div className="card" style={{ height: "100%" }}>
                    <div className="card-body">
                    <h5 className="card-title" tabindex="0" role={restaurant.name}>{restaurant.name}</h5>
                        <p className="card-text">{restaurant.description}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>Address:</strong>&nbsp;{restaurant.full_address.toUpperCase()}</li>
                        <li className="list-group-item"><strong>Phone:</strong>&nbsp;{restaurant.contact_number}</li>
                        <li className="list-group-item"><strong>Course:</strong>&nbsp;{ this.getCourse(JSON.parse(restaurant.course)).join(', ') }</li>                 
                    </ul>
                    <div className="card-body">
                        {(Number(restaurant.status)===1)&&<span className="badge badge-success p-2 mr-2">Open</span>}
                        {(Number(restaurant.status)===0)&&<span className="badge badge-danger p-2">Closed</span>} 
                    </div>
                    </div>
                </div>)
            })
        return searchList;
    }
    render(){
        return (
            <div className="container" style={{marginTop:"2%"}}>
                 <span class="sr-only">You are viewing the search results: </span>
                <div className="row" tabindex="0" aria-attribute="search restaurant list">
                    {this.searchRestaurantList() }
                </div>
            </div>
            
        )
    }
}
export default SearchRestaurant;