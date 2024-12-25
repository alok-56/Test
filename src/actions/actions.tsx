interface User {
    id:number;
    username:string;
}


export const loginSuccess =(user:User)=>({
    type:"LOGIN_SUCCESS",
    payload:user
})

export const logout = () => ({
    type: "LOGOUT",
  });
  