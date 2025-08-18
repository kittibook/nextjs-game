"use client"

import { Config } from "../Config/api.config"


export const getAuth = async (url: string): Promise<any> => {
    const response = await fetch(Config.url + url, {
        method: "GET",
        headers: Config.headers()
    })
    if (response.status === 401 || response.status === 403) {
        window.location.href = '/login';
        return;
    }
    const res = await response.json()
    return res
}

export const postAuth = async (url: string, body: any): Promise<any> => {
    const response = await fetch(Config.url + url, {
        method: "POST",
        headers: {
            ...Config.headers(),
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    if (response.status === 401 || response.status === 403) {
        window.location.href = '/login';
        return;
    }
    const res = await response.json()
    return res
}

export const putAuth = async (url: string, body: any): Promise<any> => {
    const response = await fetch(Config.url + url, {
        method: "PUT",
        headers: {
            ...Config.headers(),
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    if (response.status === 401 || response.status === 403) {
        window.location.href = '/login';
        return;
    }
    const res = await response.json()
    return res
}