import axios from "axios";

export const apidomain = "http://localhost:9000";
//  export const apidomain = "https://api.srisprglobalschool.com";
//exort const apiUrl = "http://api.srisprglobalschool.com/api/v1";
export const apiUrl = apidomain + "/api/v1";

export const getApi = async (url) => {
    try {
        const GetUserId = localStorage.getItem("userId");
        let headers = {};
        if (GetUserId) {
             headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
        }
        const fullUrl = apiUrl + url;
        const response = await axios.get(fullUrl, { headers: headers });
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const postApi = async (url, data) => {
    try {
        const GetUserId = localStorage.getItem("userId");
        let headers = {};
        if (GetUserId) {
             headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
        }
        const fullUrl = apiUrl + url;
        const response = await axios.post(fullUrl, data, { headers: headers });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
} 

export const putApi = async (url, data) => {
    try {
        const GetUserId = localStorage.getItem("userId");
        let headers = {};
        if (GetUserId) {
             headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
        }
        const fullUrl = apiUrl + url;
        const response = await axios.put(fullUrl, data, { headers: headers });
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const deleteApi = async (url) => {
    try {
        const GetUserId = localStorage.getItem("userId");
        let headers = {};
        if (GetUserId) {
             headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
        }
        const fullUrl = apiUrl + url;
        const response = await axios.delete(fullUrl, { headers: headers });
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}
