import React, { useEffect, useState } from 'react'
import Formsearchinput from '../../Components/Form/Formsearchinput'
import Taskcard from '../../Components/partials/Taskcard'
import Newtaskmodal from './partials/Newtaskmodal'
import Api from '../../Api'
import Emptydata from '../../Components/Form/Emptydata'
import { Icon } from '@iconify/react'
import { TaskcardProps } from '../../Components/partials/Taskcard'
import { TaskDto, taskResponseDto } from './Taskresponse'
import { AxiosResponse } from 'axios'
function Index() {
    const [showModal, setShowModal] = useState(false)
    const [tasks, setTask] = useState<TaskDto[] | null>(null)
    const [nextPage, setNextPage] = useState<string | null>(null)
    const [process, setProcessing] = useState<Boolean>(false)

    const getAllTask = (url?: string) => {
        setProcessing(true)
        Api.get(url ?? '/task/all')
            .then((res: any) => {
                const taskResponse: taskResponseDto = res.data
                const { tasks, nextPageUrl } = taskResponse
                setTask(tasks)
                setNextPage(nextPageUrl)
                setProcessing(false)
            })
            .catch((err: any) => {
                console.log(err)
                setProcessing(false)

            })
    }


    const getMoreData = () => {
        nextPage && Api.get(nextPage)
            .then((res: AxiosResponse) => {
                const taskResponse: taskResponseDto = res.data
                const {tasks, nextPageUrl} = taskResponse
                setTask((cv: any) => cv = [...cv, ...tasks])
                setNextPage(nextPageUrl)
            })
            .catch((err: any) => {
                console.log(err)
            })
    }

    const handleOnSucess = () => {
        getAllTask()
        setShowModal(false)
    }

    useEffect(() => {
        getAllTask()
    }, [])


    return (
        <div className=' constrain  py-5'>
            {showModal && <Newtaskmodal handleOnSucess={() => handleOnSucess()} onClose={() => setShowModal(false)} />}
            <nav className="flex items-center gap-4 w-full">
                <Formsearchinput processing={process} getSearchKey={(sk: string) => getAllTask(`/task/all?search=${sk}`)} placeholder="Search task by title..." />
                <button onClick={() => setShowModal(true)} className=' flex items-center gap-2 rounded-md p-4 h-full bg-primary-deep-pink text-white whitespace-nowrap px-10  text-sm'>
                    Add New Task
                    <Icon fontSize={20} icon="bi:plus-circle" />
                </button>
            </nav>
            <section className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-5'>
                {tasks != null &&
                    tasks.map((task: TaskDto, i: number) => <Taskcard task={tasks}  fetchData={() => getAllTask()} setData={setTask}
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
            {tasks?.length === 0 && <div className=' w-full min-h-screen flex items-center justify-center '>
                <Emptydata />
            </div>}
            {nextPage && <div className=' flex justify-center mt-10'>
                <button onClick={() => getMoreData()} className=' rounded-2xl bg-primary-deep-pink/10 p-2 px-5 text-primary-deep-pink text-sm'>
                    Load More
                </button>
            </div>}
        </div>
    )
}

export default Index