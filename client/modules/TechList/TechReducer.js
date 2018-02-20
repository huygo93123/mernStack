import { ADD_TECH, ADD_TECHS, DELETE_TECH, UPDATE_TECH } from './TechAction';

// Initial State
const initialState = { data: [] };

const TechReducer = (state = initialState, action) => {
    switch (action.type) {

    case ADD_TECHS :
        return {
            data: action.techs,
        };

    case ADD_TECH :
        return {
            data: [action.tech, ...state.data],
        };

    case DELETE_TECH :
        return {
            data: state.data.filter(post => post.cuid !== action.cuid),
        };

    case UPDATE_TECH :
        return {
            data: [action.tech, ...state.data],
        };

    default:
        return state;
    }
};

/* Selectors */

// Get all posts
export const getTechs = state => state.techs.data;

// Get post by cuid
export const getTech = (state, cuid) => state.techs.data.filter(post => post.cuid === cuid)[0];

// Export Reducer
export default TechReducer;
