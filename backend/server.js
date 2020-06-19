const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql');
const app = express();

const port = 5000;


app.use(bodyParser.json());

function validate(data){

    let errors = {};
    let regexPostalCode = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

    if(data.restaurantName === '') errors.restaurantName = "Required";
    if(data.streetAddress === '') errors.streetAddress = "Required";
    //if(data.addressUnit === '') errors.addressUnit = "Required";
    if(data.postalCode === '') {
        errors.postalCode = "Required";
    }else if(data.postalCode && !regexPostalCode.test(data.postalCode)){
        errors.postalCode = "Invalid format e.g M9A 4Y1 or M9A4Y1"
    }
    if(data.city === '') errors.city = "Required";
    if(data.province === '') errors.province = "Required";
    if(data.country === '') errors.country = "Required";
    if(data.status === '') errors.status = "Required";
    let isExits = this.checkCourseValidation(data.course);
    if (isExits){
        errors.course  = "Required";
    }

    const isValid = Object.keys(errors).length === 0
    return { errors, isValid };
}

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tsg_bmo'
});
db.connect((err) => {
    if(err){
        throw err;
    }

    app.get('/api/restaurants', (req, res) => {
        let sql = "SELECT id, name, address, city, province, country, suite, postal_code, course, status, description, full_address, contact_number FROM restaurant ORDER BY restaurant.id DESC";
        let query = db.query(sql, (err, restaurants) =>{
            if(err){
                res.status(500).json({errors: {global: "Something went wrong"}});
            }else{
                res.json({ restaurants });
            }
        });
    });
    app.put('/api/searchrestaurants', (req, res) => {

        let sql = `SELECT id, name, address, city, province, country, suite, postal_code, course, status, full_address, description, contact_number FROM restaurant WHERE MATCH (full_address) AGAINST ('${req.body.passString}' IN NATURAL LANGUAGE MODE)`;
        let query = db.query(sql, (err, restaurants) =>{
            if(err) {
                res.status(500).json({errors: {global: "Something went wrong"}});
            }else{
                res.json({ restaurants });
            }
        });

    });
   
    app.get('/api/restaurants/:id', (req, res) => {
        let sql = `SELECT id, name, address, city, province, country, suite, postal_code, course, status, description, full_address, contact_number FROM restaurant WHERE restaurant.id = ${req.params.id}`;
        let query = db.query(sql, (err, restaurant) =>{
            if(err) {
                res.status(500).json({errors: {global: "Something went wrong"}});
            }else{
                const singleRestaurant = { restaurant:restaurant[0] };
                res.json(singleRestaurant);
            }
        });
    });
    app.delete('/api/restaurants/:id', (req, res) => {
        let sql = `DELETE FROM restaurant where id = ${req.params.id}`;
        let query = db.query(sql, (err, restaurant) =>{
            if(err){
                res.status(500).json({errors: {global: "Something went wrong"}});
            }else{
                res.json({});
            }
        });
    })
    app.put('/api/restaurants/:id' , (req, res) => {
        const {errors, isValid } = validate(req.body);
        if(isValid){
            let post = {
                name: req.body.restaurantName,
                address: req.body.streetAddress,
                suite: req.body.addressUnit,
                city: req.body.city,
                province: req.body.province,
                country: req.body.country,
                description: req.body.description,
                contact_number: req.body.contactNumber,
                postal_code: req.body.postalCode,
                course: JSON.stringify(req.body.course),
                full_address: `${(req.body.addressUnit) && "#"+req.body.addressUnit+"-"}${req.body.streetAddress}, ${req.body.city}, ${req.body.province}, ${req.body.country}, ${req.body.postalCode}`,
                status: req.body.status
            }
            let sql = `UPDATE restaurant SET ? where restaurant.id = ${req.params.id}`;
            let query = db.query(sql, post, (err, result) => {
                if(err) {
                    res.status(500).json({errors: {global: "Something went wrong"}});
                }else{
                    post.id = req.body.id;
                    (result['serverStatus']===2) && res.json({ restaurant: post });
                }
                
            });
        }else{
            res.status(400).json({ errors });
        }
    });
    app.post('/api/restaurants', (req, res) =>{
        const {errors, isValid} = validate(req.body);
        if(isValid){
            let post = {
                name: req.body.restaurantName,
                address: req.body.streetAddress,
                suite: req.body.addressUnit,
                city: req.body.city,
                province: req.body.province,
                country: req.body.country,
                description: req.body.description,
                contact_number: req.body.contactNumber,
                postal_code: req.body.postalCode,
                course: JSON.stringify(req.body.course),
                full_address: `${(req.body.addressUnit) && "#"+req.body.addressUnit+"-"}${req.body.streetAddress}, ${req.body.city}, ${req.body.province}, ${req.body.country}, ${req.body.postalCode}`,
                status: req.body.status
            }
            let sqlInsertRestaurant = 'INSERT INTO restaurant SET ?';
            let query = db.query(sqlInsertRestaurant, post, (err, result) => {
                if(err) {
                    throw err;
                    res.status(500).json({errors: {global: "Something went wrong"}});
                }else{
                    res.json({ restaurant: result['serverStatus'] })
                }
            });
        }else{
            res.status(404).json({errors});
        }
    })

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
});

checkCourseValidation = (dataCourse) => {

    var isExits = Object.keys(dataCourse).every(function(item) {
        return dataCourse[item] === false;
    });
    return isExits;
}
