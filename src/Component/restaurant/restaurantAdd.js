import React, {Component} from 'react';
import HtmlTags from '../htmlTags';
import  { connect } from 'react-redux';
import { saveRestaurant, fetchRestaurant, updateRestaurant } from '../../actions';

class RestaurantAdd extends Component{

    checkCourseExits = (stateCourse) => {

        var isExits = Object.keys(stateCourse).some(function(item) {
            return stateCourse[item] === true;
        });
        return isExits;
    }

    state = {
        id: this.props.restaurant ? this.props.restaurant.id : null,
        restaurantName: this.props.restaurant ? this.props.restaurant.name : "",
        streetAddress: this.props.restaurant ? this.props.restaurant.address : "",
        addressUnit: this.props.restaurant ? this.props.restaurant.suite : "",
        postalCode: this.props.restaurant ? this.props.restaurant.postal_code : "",
        city: this.props.restaurant ? this.props.restaurant.city : "",
        province: this.props.restaurant ? this.props.restaurant.province : "",
        country: this.props.restaurant ? this.props.restaurant.country : "",
        course: this.props.restaurant ? JSON.parse(this.props.restaurant.course) : { 
                    breakfast:false,
                    lunch:false,
                    dinner:false 
                },
        courseExits: this.props.restaurant ? this.checkCourseExits(this.props.restaurant.course) : "",
        description: this.props.restaurant ? this.props.restaurant.description : "",
        contactNumber: this.props.restaurant ? this.props.restaurant.contact_number : "",
        status: this.props.restaurant ? this.props.restaurant.status : "",
        errors: {},
        loading: false,
        done: false
    }    
    handleChange = (e) => {
        
        if(!!this.state.errors[e.target.name]){
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ 
                [e.target.name]: e.target.value,
                errors
            });
        }
        else if(!!this.state.errors[e.target.getAttribute('data-course')]){
            this.setCourseToState(e, 'validate');
        }else {
            (e.target.type==="checkbox") ? this.setCourseToState(e, 'init') : this.setState({ [e.target.name]: e.target.value });
        }
    }

    handleSubmit = (e) => {

        e.preventDefault();

        let regexPostalCode = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
        let regexContactNumber = /(\(\d{3}\)[.-]|(\d{3}[.-])){2}\d{4}/;
        
        //validation
        let errors = {};
        if(this.state.restaurantName === '') errors.restaurantName = "Required";
        if(this.state.streetAddress === '') errors.streetAddress = "Required";
        if(this.state.postalCode === '') {
            errors.postalCode = "Required";
        }else if(this.state.postalCode && !regexPostalCode.test(this.state.postalCode)){
            errors.postalCode = "Invalid format e.g M9A 4Y1 or M9A4Y1"
        }
        //if(this.state.addressUnit === '') errors.addressUnit = "Required";
        if(this.state.city === '') errors.city = "Required";
        if(this.state.province === '') errors.province = "Required";
        if(this.state.country === '') errors.country = "Required";
        if(this.state.status === '') errors.status = "Required";
        if(this.state.description === '') errors.description = "Required";
        if(this.state.contactNumber === '') {
            errors.contactNumber = "Required";
        }else if(this.state.contactNumber && !regexContactNumber.test(this.state.contactNumber)){
            errors.contactNumber = "Invalid format e.g (999)-999-9999"
        }
        let stateCourse = this.state.course;
       
        let isExits = this.checkCourseValidation(stateCourse);
        if (isExits){
            errors.course  = "Required";
        }
        
        this.setState({ errors });
        
        const isValid = Object.keys(errors).length === 0;

        if(isValid){
            const { id, restaurantName, streetAddress, addressUnit, postalCode, city, province, country, description, contactNumber, course, status  } = this.state;
            this.setState( {loading: true});
            if(id){
                this.props.updateRestaurant({ id, restaurantName, streetAddress, addressUnit, postalCode, city, province, country, description, contactNumber, course, status }).then(
                    () => { this.setState({ done:true }) },
                    (err) => err.response.json().then(({errors}) => this.setState({ errors, loading: false}))
                );
            }else{
                this.props.saveRestaurant({ restaurantName, streetAddress, addressUnit, postalCode, city, province, country, description, contactNumber, course, status }).then(  
                    () => { this.setState({ done:true }) },
                    (err) => err.response.json().then(({errors}) => this.setState({ errors, loading: false}))
                );
            }
            
        }

    }
    checkCourseValidation = (stateCourse) => {

        var isExits = Object.keys(stateCourse).every(function(item) {
            return stateCourse[item] === false;
        });
        return isExits;
    }
    setCourseToState = (event,req) => {

        let passName = event.target.name;
        let passValue = event.target.checked;
        let courseCopy = JSON.parse(JSON.stringify(this.state.course));
        courseCopy[passName] = passValue;
        let isExits = this.checkCourseValidation(courseCopy);

        if(req === 'init'){

            this.setState({
            course:courseCopy,
            courseExits:isExits ? false : true 
            });

        }else if(req === 'validate'){

            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.getAttribute('data-course')];

            this.setState({ 
                course:courseCopy,
                courseExits: isExits ? false : true ,
                errors
            });

        }
    }
    componentWillReceiveProps = (nextProps) => {

        this.setState({
            id: nextProps.restaurant.id,
            restaurantName: nextProps.restaurant.name,
            streetAddress: nextProps.restaurant.address,
            addressUnit: nextProps.restaurant.suite,
            postalCode: nextProps.restaurant.postal_code,
            city: nextProps.restaurant.city,
            province: nextProps.restaurant.province,
            country: nextProps.restaurant.country,
            description: nextProps.restaurant.description,
            contactNumber: nextProps.restaurant.contact_number,
            course: JSON.parse(nextProps.restaurant.course),
            courseExits: this.checkCourseExits(nextProps.restaurant.course),
            status: nextProps.restaurant.status
        })
    }
    componentDidMount = () =>{

        const id = window.location.pathname.split('/')[2];
        if(id){
            this.props.fetchRestaurant(id);
        }
    }
    render() {
       const form = (<div className="card">
       <div className="card-body">
       <form onSubmit={this.handleSubmit} method="POST">
       {!!this.state.errors.global && <div className="alert alert-danger" role="alert">{this.state.errors.global}</div>}
       {(this.state.done) && <div className="alert alert-success" role="alert">Successfully saved!</div>}
           <HtmlTags
               tag = "input"
               tagType = "text"
               tagName = "restaurantName"
               tagId = "restaurantId"
               tagLabel = "Restaurant Name"
               value={this.state.restaurantName}
               onChange={this.handleChange}
               isError={ (this.state.restaurantName === '') ? this.state.errors.restaurantName : false}
           />
           <HtmlTags
               tag = "input"
               tagType = "text"
               tagName = "streetAddress"
               tagId = "streetAddress"
               tagLabel = "Street Address"
               value={this.state.streetAddress}
               onChange={this.handleChange}
               isError={ (this.state.streetAddress === '') ? this.state.errors.streetAddress : false}
           />
           <HtmlTags
               tag = "input"
               tagType = "text"
               tagName = "addressUnit"
               tagId = "addressUnit"
               tagLabel = "Unit / Suite"
               value={this.state.addressUnit}
               onChange={this.handleChange}
               isError={ (this.state.addressUnit === '') ? this.state.errors.addressUnit : false}
           />
            <HtmlTags
               tag = "input"
               tagType = "text"
               tagName = "postalCode"
               tagId = "postalCode"
               tagLabel = "Postal Code"
               value={this.state.postalCode}
               onChange={this.handleChange}
               isError={ (this.state.postalCode === '') ? this.state.errors.postalCode : (this.state.errors.postalCode) ? this.state.errors.postalCode : false}
           />
           <HtmlTags
               tag = "dropdown"
               tagName = "city"
               tagId = "city"
               tagLabel = "City"
               onChange={this.handleChange}
               isError={ (this.state.city === '') ? this.state.errors.city : false}
               selected={this.state.city}
               dropDownOption = {[{
                   optionLabel:'Toronto',
                   optionValue:'Toronto'
               },
               {
                   optionLabel:'Ottawa',
                   optionValue:'Ottawa'
               },
               {
                   optionLabel:'Oshawa',
                   optionValue:'Oshawa'
               },
               {
                   optionLabel:'Hamilton',
                   optionValue:'Hamilton'
               },
               {
                   optionLabel:'St. Catharines',
                   optionValue:'St.-Catharines'
               },
               {
                   optionLabel:'Kitchener',
                   optionValue:'Kitchener'
               },
               {
                   optionLabel:'London',
                   optionValue:'London'
               },
               {
                   optionLabel:'Windsor',
                   optionValue:'Windsor'
               },
               {
                   optionLabel:'Sudbury',
                   optionValue:'Sudbury'
               },
               {
                   optionLabel:'Mississauga',
                   optionValue:'Mississauga'
               },
               {
                   optionLabel:'Thunder Bay',
                   optionValue:'Thunder Bay'
               },
               {
                   optionLabel:'Brampton',
                   optionValue:'Brampton'
               }
               ]}
           />
           <HtmlTags
               tag = "dropdown"
               tagName = "province"
               tagId = "province"
               tagLabel = "Province"
               onChange={this.handleChange}
               isError={ (this.state.province === '') ? this.state.errors.province : false}
               selected={this.state.province}
               dropDownOption = {[{
                   optionLabel:'Ontario',
                   optionValue:'Ontario'
               }
               ]}
           />
           <HtmlTags
               tag = "dropdown"
               tagName = "country"
               tagId = "country"
               tagLabel = "Country"
               onChange={this.handleChange}
               isError={ (this.state.country === '') ? this.state.errors.country : false}
               selected={this.state.country}
               dropDownOption = {[{
                   optionLabel:'Canada',
                   optionValue:'Canada'
               }
               ]}
           />
            <HtmlTags
               tag = "textarea"
               tagType = "textarea"
               tagName = "description"
               tagId = "description"
               tagLabel = "Description"
               value={this.state.description}
               onChange={this.handleChange}
               isError={ (this.state.description === '') ? this.state.errors.description : false}
           />
            <HtmlTags
               tag = "input"
               tagType = "text"
               tagName = "contactNumber"
               tagId = "contactNumber"
               tagLabel = "Contact Number"
               value={this.state.contactNumber}
               onChange={this.handleChange}
               isError={ (this.state.contactNumber === '') ? this.state.errors.contactNumber : (this.state.errors.contactNumber) ? this.state.errors.contactNumber : false}
           />
            <HtmlTags
               tag = "checkbox"
               tagLabel = "Course"
               tagName = "course"
               onChange = {this.handleChange}
               isError={ (!this.state.courseExits) ? this.state.errors.course : false}
               checkboxOption = {[{
                   optionLabel:'Breakfast',
                   optionId:'breakfast',
                   optionName:'breakfast',
                   checked:this.state.course['breakfast'],
                   optionDataAttr:'course'
               },
               {
                   optionLabel:'Lunch',
                   optionId:'lunch',
                   optionName:'lunch',
                   checked:this.state.course['lunch'],
                   optionDataAttr:'course'
               },
               {
                   optionLabel:'Dinner',
                   optionId:'dinner',
                   optionName:'dinner',
                   checked:this.state.course['dinner'],
                   optionDataAttr:'course'
               }
               ]}
            />
           <HtmlTags
               tag = "dropdown"
               tagName = "status"
               tagId = "status"
               tagLabel = "Status"
               onChange={this.handleChange}
               isError={ (this.state.status === '') ? this.state.errors.status : false}
               selected={this.state.status}
               dropDownOption = {[{
                   optionLabel:'Open',
                   optionValue:1,
               },
               {
                   optionLabel:'Close',
                   optionValue:0
               }
               ]}
           />
           { (this.state.loading) ? (
               <div className="d-flex justify-content-center">
               <div className="spinner-border" role="status">
                   <span className="sr-only">Loading...</span>
               </div>
               </div> ) : 
               <button type="submit" className="btn btn-primary">{ (this.state.id)? "Update": "Submit" }</button>
           }
       </form>
       </div>
   </div>)
        return (
            <div style={{width:'35rem'}}>
                { this.state.done ?  (this.state.id)? window.location.href = "/restaurants?msg=updateSuccess" : window.location.href = "/restaurants?msg=insertSuccess" : form }
            </div>
        )                
    }
}
export default connect(null, { saveRestaurant, fetchRestaurant, updateRestaurant })(RestaurantAdd);