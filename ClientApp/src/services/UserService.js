import authHeader from './AuthHeader'

const API_URL = "http://localhost:8080/api/";

const getBrgGameContent = () => {
    return fetch(API_URL+'brgGame',{
        method: 'GET', 
        headers: authHeader()})
}

export default {
    getBrgGameContent
};