import axios from "axios";
const API = 'http://wren.in:3200/api/sign-up/'



const ResponseSuccess = (res) => {
    return res
}
const ResponseError = (res) => {
    return res
}


export const Service = {
    SignupForm : data =>  
    {
        const {alldata,formtype} = data;
        return axios.post(`http://wren.in:3200/api/sign-up/${formtype}`,  alldata ) .then( ResponseSuccess, ResponseError)
    }
};

   

   


