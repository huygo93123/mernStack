import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_TECH = 'ADD_TECH';
export const GET_TECHS = 'GET_TECHS';
export const DELETE_TECH = 'DELETE_TECH';

// Export Actions
export function addPost(post) {
    return {
        type: ADD_TECH,
        post,
    };
}

export function addPostRequest(post) {
    return (dispatch) => {
        return callApi('posts', 'post', {
            post: {
                name: post.name,
                title: post.title,
                content: post.content,
            },
        }).then(res => dispatch(addPost(res.post)));
    };
}

export function getPosts(posts) {
    return {
        type: GET_TECHS,
        posts,
    };
}

export function fetchPosts() {
    return (dispatch) => {
        return callApi('posts').then(res => {
            dispatch(getPosts(res.posts));
        });
    };
}

export function fetchPost(cuid) {
    return (dispatch) => {
        return callApi(`posts/${cuid}`).then(res => dispatch(addPost(res.post)));
    };
}

export function deletePost(cuid) {
    return {
        type: DELETE_TECH,
        cuid,
    };
}

export function deletePostRequest(cuid) {
    return (dispatch) => {
        return callApi(`posts/${cuid}`, 'delete').then(() => dispatch(deletePost(cuid)));
    };
}
