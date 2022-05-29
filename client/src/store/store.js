import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import {API_URL} from "../http";

export default class Store {
    user = "";
    isAuth = false;
    isLoading=true;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(auth) {
        this.isAuth = auth;
    }

    setUser(user) {
        this.user = user;
    }

    setLoading(loading){
        this.isLoading=loading;
    }

    async login(username, password) {
        this.setLoading(true);
        try {
            const response = await AuthService.login(username, password);
            localStorage.setItem("token", response.data.token);
            this.setAuth(true);
            this.setUser(response.data.username);
            return response
        } catch (e) {
            return e.response
        }
        finally {
            this.setLoading(false);
        }
    }

    async registration(username, password) {
        this.setLoading(true);
        try {
            const response = await AuthService.registration(username, password);
            localStorage.setItem("token", response.data.token);
            this.setAuth(true);
            this.setUser(response.data.username)
            return response
        } catch (e) {
            return e.response
        }
        finally {
            this.setLoading(false);
        }
    }

    async logout() {
        this.setLoading(true);
        try {
            const response = await AuthService.logout();
            localStorage.removeItem("token");
            this.setAuth(false);
            this.setUser("");
        } catch (e) {
            console.log(e);
        }
        finally {
            this.setLoading(false);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/refresh`, {
                    withCredentials: true,
                    headers: {
                        Authorization:localStorage.getItem("token")
                    }
                }
            );
            localStorage.setItem("token", response.data.token);
            this.setAuth(true);
            this.setUser(response.data.username)
        } catch (e) {
            this.setAuth(false);
            this.setUser("");
        }
        finally {
            this.setLoading(false);
        }
    }
}