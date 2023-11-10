import React, { useEffect, useState } from 'react'
import Api from '../../Api/index'
import Taskcard from '../../Components/partials/Taskcard'
import Emptydata from '../../Components/Form/Emptydata'
import { taskResponseDto, TaskDto } from '../Home/Taskresponse'
import { AxiosResponse } from 'axios'

function Index() {
    const [tasks, setTask] = useState<TaskDto[] | null>(null)
    const [nextPage, setNextPage] = useState<string | null>(null)

    const getMyTask = (url?: string) => {
        Api.get(url ?? '/task/mytask')
            .then((res: AxiosResponse) => {
                const taskResponse: taskResponseDto = res.data
                const { tasks, nextPageUrl } = taskResponse
                setTask(tasks)
                setNextPage(nextPageUrl)
            })
            .catch((err: any) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getMyTask()
    }, [])

    return (
        <div className=' constrain mx-auto'>
            <section className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-5'>
                {tasks &&
                    tasks.map((task: TaskDto, i) => <Taskcard task={tasks} fetchData={() => getMyTask()} setData={setTask}
                        key={i}
                        id={task.id}
                        createdAt={task.createdAt}
                        title={task.title}
                        description={task.description}
                        isAuthor={task.isAuthor}
                        isCompleted={task.isCompleted}
                        author={task.author}
                        authorID={task.authorID}
                    />
                    )
                }
            </section>
            {tasks?.length === 0 && <div className=' w-full min-h-screen flex items-center justify-center '>
                <Emptydata />
            </div>}
            {nextPage && <div className=' flex justify-center mt-10'>
                <button className=' rounded-2xl bg-primary-deep-pink/10 p-2 px-5 text-primary-deep-pink text-sm'>
                    Load More
                </button>
            </div>}

        </div>
    )
}

export default Index