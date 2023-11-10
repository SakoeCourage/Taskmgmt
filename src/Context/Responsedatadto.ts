export interface authUserData  {
    id: string | number,
    email: string,
    name: string
}

export interface LoginResponseDto{
    accessToken: string,
    authUser: authUserData
}