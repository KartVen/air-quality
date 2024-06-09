export interface RegisterBody {
    username: string
    email: string
    password: string
}

export interface RegisterRes {
    id: number
    username: string
    email: string
    isVerified: boolean
    roles: string[]
}
