import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_TECH = 'ADD_TECH';
export const ADD_TECHS = 'ADD_TECHS';
export const DELETE_TECH = 'DELETE_TECH';
export const UPDATE_TECH = 'UPDATE_TECH';

// Export Actions
export function addTech(tech) {
    return {
        type: ADD_TECH,
        tech,
    };
}

export function addTechRequest(tech) {
    return (dispatch) => {
        return callApi('techlist', 'post', {
            post: {
                name: tech.name,
                title: tech.title,
                content: tech.content,
            },
        }).then(res => dispatch(addTech(res.post)));
    };
}

export function addTechs(techs) {
    return {
        type: ADD_TECHS,
        techs,
    };
}

export function fetchTechs() {
    return (dispatch) => {
        return callApi('techlist').then(res => {
            dispatch(addTechs(res.techs));
        });
    };
}

export function fetchTech(cuid) {
    return (dispatch) => {
        return callApi(`techlist/${cuid}`).then(res => dispatch(addTech(res.tech)));
    };
}

export function deletePost(cuid) {
    return {
        type: DELETE_TECH,
        cuid,
    };
}

export function deleteTechRequest(cuid) {
    return (dispatch) => {
        return callApi(`techlist/${cuid}`, 'delete').then(() => dispatch(deletePost(cuid)));
    };
}

export function updateTech(tech) {
    return {
        type: UPDATE_TECH,
        tech,
    };
}

export function updateTechRequest(tech) {
    return (dispatch) => {
        return callApi('techlist', 'put', {
            post: {
                cuid: tech.cuid,
                content: tech.content,
            },
        }).then(dispatch(updateTech(tech)));
    };
}
