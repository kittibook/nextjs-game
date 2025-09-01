import { ReactNode } from "react";


export interface ItemLink {
    title: string,
    to: string,
    icon: ReactNode

}

export interface Game {
    Game_id: number
    UserId: number
    detail: GameDetail[]
    name: string
    problems: any
    score: number
    time: string
}

export interface GameDetail {
    url : string | null
    answer: string | null
    ismatch: boolean | null
    problems: string | null
    reply: string | null
    score : number | null 
    time : string | null
}

export interface User {
    DatasetId: number
    Positionid: number
    User_id: number
    age: number
    createdAt: string
    disease: string
    name: string
    score: string
    time: string
}
