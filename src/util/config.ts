import axios from "axios";

import {history} from "../index"
import { UserLoginModel, UserLoginResult } from "../redux/configStore/userReducer";

export const ACCESS_TOKEN = 'accessToken'
export const USER_LOGIN = 'userLogin'


export const {saveStore,saveStoreJson,getStore,getStoreJson,removeStore} = {
   saveStore:(name:string,stringValue:any)=>{
       localStorage.setItem(name,stringValue)
       return stringValue
   },
   saveStoreJson:(name:string,value:UserLoginResult)=>{
       localStorage.setItem(name,JSON.stringify(value))
       return value
   },
   getStore:(name:string)=>{
       if(localStorage.getItem(name)){
           return localStorage.getItem(name)
       }
       return null
   },
   getStoreJson:(name:any)=>{
      if(localStorage.getItem(name)){
         const dataStore = localStorage.getItem(name)
          if(typeof dataStore === 'string'){
            return JSON.parse(dataStore)
          }
      }
      return null
  },
   removeStore:(name:string)=>{
       if(localStorage.getItem(name)){
           localStorage.removeItem(name)
       }
   }

}

export const http = axios.create({
        baseURL: "https://shop.cyberlearn.vn",
        timeout: 50000
 })


 http.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        Authorization:'Bearer ' + getStore(ACCESS_TOKEN) 
    }
    return config
 },(err) => {
    return Promise.reject(err)
 })


 http.interceptors.response.use(response => {
   
    return response
 },err => {
   if(err.response.status === 404){
      history.push('/')
   }
   if(err.response.status === 401 || err.response.status === 403){
    history.push('/login')
   }
   
    return Promise.reject(err);
 })

