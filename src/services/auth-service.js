import { tokenKey } from "../config";
import apiFetch from "./api-fetch";


  export function login(credentials) {
    return apiFetch("/login", { body: credentials })
    .then((userData) => {
      const {token,...user} = userData;
      sessionStorage.setItem(tokenKey, token);
      return user;
    })
  }

  export function logout(){
    return apiFetch("/logout", { method: "DELETE"})
  }