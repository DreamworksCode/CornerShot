// api.js

import axios from 'axios';

// const BASE_URL = 'https://your-api-base-url.com'; // Change this to your API base URL
const BASE_URL="https://cornershot-backend.onrender.com/"
// const BASE_URL="http://192.168.1.133:3000/"

// const API_KEY="42bef730-7a95-475e-990f-ec4e3d450b24"

const api = axios.create({
  baseURL: BASE_URL,
  // mode:"no-cors",
  headers: {
    'Content-Type': 'application/json',
    // "x-api-key":API_KEY
  },
});

const formApi=axios.create({
  baseURL:BASE_URL,
  headers:{
    'Content-Type': 'multipart/form-data',
    // "x-api-key":API_KEY
  }
})

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

const setFormAuthToken=(token)=>{
  if (token) {
    formApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete formApi.defaults.headers.common['Authorization'];
  }
}


// Define your API endpoints as methods of this object
const API = {

  //POST API for all 
  postAPICalling:async(endPoint,data,token)=>{
    console.log(data);
    setAuthToken(token);
    try {
        const response=await api.post(endPoint,data);
        return response.data;
        
    } catch (error) {
        throw new Error(error.response.data.message || error.message);
    }
  },

  PostFormAPICalling:async(endPoint,data,token)=>{
    setFormAuthToken(token);
    try {
        const response=await formApi.post(endPoint,data);
        return response.data;
        
    } catch (error) {
        throw new Error(error.response.data.message || error.message);
    }
  },

  //Get API for all 
  getAPICalling:async(endPoint,token)=>{
    setAuthToken(token);
    // setAuthToken(" eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoiYWJjQGdtYWlsLmNvbSIsImlhdCI6MTcxNTA3NjAyNywiZXhwIjoxNzE1MDc5NjI3fQ.46D5yWtQYwEX2oYv-qgYUk0E-Fp2XOJHB4Yz4L9jIg0")
    try {
      const response=await api.get(endPoint);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },

  //Put API for all
  putAPICalling:async(endPoint,data,token)=>{
    setAuthToken(token);
    try {
      const response=await api.put(endPoint,data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },

  //Delete API for all
  deleteAPICalling:async(endPoint,token)=>{
    setAuthToken(token);
    try {
      const response=await api.delete(endPoint);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },

  deleteAPIWithoutToken:async(endPoint,data)=>{
    try {
      const response=await api.delete(endPoint,{data});
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || error.message);
    }
  },


};

export default API;