import axios from "axios"

 export async function refreshToken() {
    axios.post('http://127.0.0.1:8080/auth/token/refresh', {
                refresh: localStorage.getItem("refreshToken"),
              }).then(response => {
                if (response.status === 200){
                  localStorage.setItem('accessToken', response.data.access);
                  localStorage.setItem('refreshToken', response.data.refresh);
                  return 200;
                }
                else return 0;
              }).catch(refresherror =>{
                if(refresherror.response.status === 400){
                    return 400;
                }
              })
}
