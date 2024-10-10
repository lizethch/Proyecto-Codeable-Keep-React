import React from 'react'
import apiFetch from './api-fetch';
import { tokenKey } from '../config';

export function createUser(userData) {
    return apiFetch("/signup", { body: userData })
    .then(userData => {
      const {token,...user} = userData;
      sessionStorage.setItem(tokenKey, token);
      return user;
    })
  }
  export function getUser() {
    return apiFetch("/profile")
    .then(u => {
      const {_token,...user} = u;
      // sessionStorage.setItem(tokenKey, token);
      return user;
    })
}