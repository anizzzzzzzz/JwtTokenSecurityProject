import {API_ROOT} from "../config/appConfig";

export function login(user) {
    return fetch(API_ROOT+"/user/login",{
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });
}

export function signUp(user) {
    return fetch(API_ROOT+"/user/sign-up",{
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
}

export function showTasks(token) {
    return fetch(API_ROOT+"/task",{
        method:'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        }
    });
}

export function addArticle(article, token) {
    return fetch(API_ROOT+"/task",{
        method:'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        },
        body: JSON.stringify(article)
    });
}

export function updateArticle(article, token) {
    return fetch(API_ROOT+"/task/"+article.id,{
       method:'PUT',
       headers:{
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           'Authorization': 'Bearer '+token
       },
       body: JSON.stringify(article)
    });
}

export function deleteArticle(id, token) {
    return fetch(API_ROOT+"/task/"+id,{
        method:'DELETE',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        }
    });
}