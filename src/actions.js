export const SET_RESTAURANTS = 'SET_RESTAURANTS';
export const SEARCH_RESTAURANTS = 'SEARCH_RESTAURANTS';
export const RESTAURANT_FETCHED = 'RESTAURANT_FETCHED';
export const RESTAURANT_UPDATED = 'RESTAURANT_UPDATED';
export const RESTAURANT_DELETED = 'RESTAURANT_DELETED';

function handleResponse(response){
    if(response.ok){
        return response.json();
    }else{
        let error = new Error(response.statusText);
        error.response = response;
        throw error; 
    }

}
export function searchRestaurants(restaurants){
    return {
        type: SEARCH_RESTAURANTS,
        restaurants
    }
}
export function setRestaurants(restaurants){
    return {
        type: SET_RESTAURANTS,
        restaurants
    }
}
export function restaurantFetched(restaurant){
    return{
        type: RESTAURANT_FETCHED,
        restaurant
    }
}
export function restaurantUpdated(restaurant){
    return {
        type: RESTAURANT_UPDATED,
        restaurant
    }
}
export function restauranDeleted(restaurantId){
    return {
        type: RESTAURANT_DELETED,
        restaurantId
    }
}
export function saveRestaurant(data){
    return dispatch => {
        return fetch('/api/restaurants',{
            method: 'post',
            body: JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            } 
        }).then(handleResponse);
    }
}
export function updateRestaurant(data){
    return dispatch => {
        return fetch(`/api/restaurants/${data.id}`,{
            method: 'put',
            body: JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            } 
        }).then(handleResponse)
        .then(data => {
            dispatch(restaurantUpdated(data.restaurant))
        });
    }
}
export function deleteRestaurant(id){
    return dispatch => {
        return fetch(`/api/restaurants/${id}`,{
            method: 'delete',
            headers:{
                "Content-Type":"application/json"
            } 
        }).then(handleResponse)
        .then(data => {
            dispatch(restauranDeleted(id))
        });
    }
}
export function fetchRestaurants(){
    return dispatch => {
        fetch('/api/restaurants')
            .then(res => res.json())
            .then(data => {
                dispatch(setRestaurants(data.restaurants))
            });
    }
}

export function fetchRestaurant(id){
    return dispatch => {
        fetch(`/api/restaurants/${id}`)
            .then(res => res.json())
            .then(data => {
                dispatch(restaurantFetched(data.restaurant))
            });
    }
}
export function fetchRestaurantsByUserInput(data){
    console.log(data);
    const datas = { passString:data }
    console.log(datas);
    return dispatch => {
        return fetch(`/api/searchrestaurants`,{
            method: 'put',
            body: JSON.stringify(datas),
            headers:{
                "Content-Type":"application/json"
            } 
        }).then(handleResponse)
        .then(data => {
            dispatch(searchRestaurants(data.restaurants))
        });
    }
}
