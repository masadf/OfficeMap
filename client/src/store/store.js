import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import { API_URL } from "../http";

export default class Store {
    user = "";
    isAuth = false;
    isLoading = true;
    employeeData;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(auth) {
        this.isAuth = auth;
    }

    setUser(user) {
        this.user = user;
    }

    setLoading(loading) {
        this.isLoading = loading;
    }

    setEmployeeData(employeeData) {
        this.employeeData = employeeData;
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
        } finally {
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
        } finally {
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
        } finally {
            this.setLoading(false);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/refresh`, {
                withCredentials: true,
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            localStorage.setItem("token", response.data.token);
            this.setAuth(true);
            this.setUser(response.data.username);
        } catch (e) {
            this.setAuth(false);
            this.setUser("");
        } finally {
            this.setLoading(false);
        }
    }


    async loadEmployeesData() {
        this.setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/employee`);
            this.setEmployeeData(response.data.data);
        } catch (e) {} finally {
            this.setLoading(false);
        }
    }

    async setEmployeeCab(id, cabNum) {
        this.setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/employee/set-cab`, { id, cabNum });
        } catch (e) {

        } finally {
            this.setLoading(false);
        }
    }
    getEmployeeById(id) {
        for (let element of this.employeeData) {
            if (element["_id"] === id) {
                return element;
            }
        }
    }

    getElementByIndex(index) {
        this.setLoading(true);
        for (let element of this.employeeData) {
            if (element["cab_number"] === index) {
                this.setLoading(false);
                return element;
            }
        }
        this.setLoading(false);
        return undefined;

    }

}