"use client"
import { Config } from "../Config/api.config"

const token = localStorage.getItem('token')


export const getAuth = async (url: string): Promise<any> => {
    const response = await fetch(Config.url + url, {
        method: "GET",
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
    if (response.status === 401 || response.status === 403) {
        window.location.href = '/login';
        return;
    }
    const res = await response.json()
    return res
}