import { ADD_TECH, GET_TECHS, DELETE_TECH } from './TechAction';

// Initial State
const initialState = { data: [] };

const TechReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_TECHS :
      return {
        data: action.posts,
      };

    case ADD_TECH :
      return {
        data: [action.post, ...state.data],
      };

    case DELETE_TECH :
      return {
        data: state.data.filter(post => post.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getPosts = state => state.posts.data;

// Get post by cuid
export const getPost = (state, cuid) => state.posts.data.filter(post => post.cuid === cuid)[0];

// Export Reducer
export default TechReducer;
