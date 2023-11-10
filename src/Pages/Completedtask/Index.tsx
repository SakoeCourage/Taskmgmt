import React, { useEffect, useState } from 'react'
import Api from '../../Api/index'
import Taskcard from '../../Components/partials/Taskcard'
import Emptydata from '../../Components/Form/Emptydata'
import { TaskDto, taskResponseDto } from '../Home/Taskresponse'

function Index() {
    const [tasks, setTask] = useState<any>([])
    const [nextPage, setNextPage] = useState<String | null>(null)

    const getMyTask = (url?: string) => {
        Api.get(url ?? '/task/completedTask')
            .then((res: any) => {
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
                {Boolean(tasks.length) &&
                    tasks.map((task: TaskDto, i: number) => <Taskcard task={tasks} fetchData={() => getMyTask()} setData={setTask}
                        key={i}
                        authorID={task.authorID}
                        id={task.id}
                        createdAt={task.createdAt}
                        title={task.title}
                        description={task.description}
                        isAuthor={task.isAuthor}
                        isCompleted={task.isCompleted}
                        author={task.author}
                    />)
                }
            </section>
            {tasks.length === 0 && <div className=' w-full min-h-screen flex items-center justify-center '>
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