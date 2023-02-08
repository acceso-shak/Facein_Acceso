import {useState, useEffect} from 'react';

const session = {};

session.set = (key,value) => {
    sessionStorage.setItem(key,value);
}

session.get = (key) => {
    return sessionStorage.getItem(key);
}

session.remove = (key) => {
    sessionStorage.removeItem(key);
}

export default session;

export function useLoggedIn(){
    const [loggedIn,setLoggedIn] = useState(false);

    useEffect(() => {
        setLoggedIn(Boolean(session.get('token')) || false);
    },[]);

    return loggedIn
}

export function logoutUser(){
    session.remove('token');
}