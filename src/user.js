import * as api from './api.js';

const endpoints = {
    'login' : 'users/login',
    'register': 'users/register',
    'logout': 'users/logout',
}

export async function login(email, password){
    let user = await api.post(endpoints.login, {email, password});
    sessionStorage.setItem("userData", JSON.stringify(user));
}

export async function register(username, email, password){
    let user = await api.post(endpoints.register, {username, email, password});
    sessionStorage.setItem("userData", JSON.stringify(user));
}

export async function logout(){
    await api.get(endpoints.logout);
    sessionStorage.removeItem("userData");
}