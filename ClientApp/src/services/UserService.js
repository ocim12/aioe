import authHeader from './AuthHeader'

const API_URL = "api/user/";

const getBrgGameContent = (userID) => {
    return fetch(API_URL+'brgGame',{
        method: 'POST', 
        headers: authHeader(),
        body:userID})
}

export default {
    getBrgGameContent
};