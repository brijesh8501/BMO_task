import React, {Component} from 'react';
import  { connect } from 'react-redux';
import { fetchRestaurantsByUserInput } from '../../actions';

import PlacesAutocomplete from 'react-places-autocomplete';
import SearchRestaurant from './searchRestaurants';


class BodyContent extends Component{

    constructor(props) {
        super(props);
        this.state = { 
            address: '',
            setAddress: ''
        };
      }
    handleChange = address => {
        this.setState({ address });
      };
     
    handleSelect = address => {
        this.setState({ setAddress: address});
        this.props.fetchRestaurantsByUserInput(address);
        
        document.getElementById('searchResult').scrollIntoView();
    };
    
    render(){
        return (
            <div>
            <div className="masthead">
                <div className="container h-100">
                    <div className="row h-100 d-flex justify-content-center align-items-center">
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className="form-group has-search input-group-lg">
                                <span className="fa fa-search form-control-feedback"></span>
                                <PlacesAutocomplete 
                                    value={this.state.address}
                                    onChange={this.handleChange}
                                    onSelect={this.handleSelect}
                                >
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) =>(
                                        <div style={{position: "relative"}}>
                                            <input {...getInputProps({ 
                                                placeholder: "Search reastaurant by address",
                                                role: "searchbox"
                                            })} className="form-control" />
                                            <div style={{position: "absolute", width: "100%" }}>
                                                {loading ? <div style = { {backgroundColor: "#fff", padding: "10px"}}>loading...</div> : null}

                                                {suggestions.map((suggestion,i) =>{
                                                    const style = {
                                                        backgroundColor: suggestion.active ? "#007bff" : "#fff",
                                                        color: suggestion.active ? "#fff" : "black",
                                                        padding: "10px"
                                                    }
                                                    return <div key={i} {...getSuggestionItemProps(suggestion, { style })} role="searchbox" tabIndex="-1" aria-labelledby={suggestion.description}>{suggestion.description}</div>;
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </PlacesAutocomplete>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div id="searchResult">
            { (this.props.restaurants.length !== 0) ?
                <SearchRestaurant restaurants={this.props.restaurants} /> :""
            }
                </div>
            </div>
            </div>
        );
    }
}
function mapStateToProps(state, props){
    
    return {
        restaurants:state.restaurants
    }

}
export default connect(mapStateToProps, { fetchRestaurantsByUserInput })(BodyContent);