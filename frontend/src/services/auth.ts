
import axios from "axios";
import Login from "../components/models/user/Login";
import SignUp from "../components/models/user/SingUp";
class Auth {
    async login(login: Login):Promise <{ jwt: string; role: string }>{
         const response = await axios.post<{ jwt: string; role: string }>(`${import.meta.env.VITE_REST_SERVER_URL}/auth/login`, login)
         return response.data
    }
    async signUp(signup: SignUp):Promise <{ jwt: string; role: string }>{
        const response = await axios.post<{ jwt: string; role: string }>(`${import.meta.env.VITE_REST_SERVER_URL}/auth/signup`, signup)
        return response.data
   }
}

const auth = new Auth()
export default auth;