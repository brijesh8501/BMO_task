import { SET_RESTAURANTS, RESTAURANT_FETCHED, RESTAURANT_UPDATED, RESTAURANT_DELETED, SEARCH_RESTAURANTS } from '../actions';

export default function restaurants(state = [], action = {}){

    switch(action.type){
       
        case RESTAURANT_DELETED:
            return state.filter(item => item.id !== action.restaurantId);

        case RESTAURANT_UPDATED:
            return state.map(item => {
                if(item.id === action.restaurant.id) return action.restaurant;
                return item;
            });

        case RESTAURANT_FETCHED:
            const index = state.findIndex(item => item.id === action.restaurant.id);
            if(index > -1){
                return state.map(item =>{
                    if(item.id === action.restaurant.id) return action.restaurant;
                    return item;
                })
            } else{
                return [
                    ...state,
                    action.restaurant
                ];
            }
        case SEARCH_RESTAURANTS:
            return action.restaurants;
        case SET_RESTAURANTS:
            return action.restaurants;
        default: return state;
        
    }
}