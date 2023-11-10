import { authUserData } from "@/Context/Responsedatadto"

export interface TaskDto {
    id: number,
    author: authUserData,
    authorID: number,
    createdAt: string,
    title: string,
    description: string,
    isAuthor: boolean,
    isCompleted: boolean
}

export interface taskResponseDto{
    currentPage: number,
    nextPageUrl: string | null,
    prevPageUrl: string | null,
    pageSize: number,
    tasks: TaskDto[],
    totalCount:number,
    totalPages: number
}