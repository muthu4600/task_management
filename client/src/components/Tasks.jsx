import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import { deleteTask, getTasks, updateTask } from '@/APIs/taskServices';

const Tasks = () => {

    const [isShowForm, setIsShowForm] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [formData, setFormData] = useState('');

    const fetchData = async () => {
        const data = await getTasks();
        if (data) setTasks(data);
        if (isShowForm) setIsShowForm(false);
    }

    useEffect(() => { fetchData() }, []);

    const completeTask = async (task) => {
        task.isCompleted = true;
        await updateTask(task);
        fetchData();
    }

    return (
        <div className={'m-20'}>
            <h1 className='text-4xl font-bold'>Tasks</h1>
            <div className="relative overflow-x-auto">
                {
                    isShowForm ?
                        <TaskForm
                            setShowForm={setIsShowForm}
                            fetchData={fetchData}
                            defaultValues={formData}
                        />
                        :
                        <button
                            type="button"
                            className="my-6 px-5 py-3 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={() => {
                                setFormData('');
                                setIsShowForm(true);
                            }}
                        >
                            Add Task
                        </button>
                }
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">S.No</th>
                            <th scope="col" className="px-6 py-3">Title</th>
                            <th scope="col" className="px-6 py-3">Description</th>
                            <th scope="col" className="px-6 py-3">complete</th>
                            <th scope="col" className="px-6 py-3">Edit</th>
                            <th scope="col" className="px-6 py-3">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tasks?.length > 0 && tasks?.map((task, index) =>

                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {index + 1}
                                    </th>
                                    <td className="px-6 py-4">
                                        {task?.title}
                                    </td>
                                    <td className="px-6 py-4">
                                        {task?.description}
                                    </td>
                                    <td className="px-6 py-4">
                                        {
                                            task?.isCompleted ? "Completed" :
                                                <a role='button'
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                    onClick={() => completeTask(task)}
                                                >Complete</a>
                                        }
                                    </td>
                                    <td className="px-6 py-4">
                                        <a role='button'
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            onClick={() => {
                                                setIsShowForm(true);
                                                setFormData(task);
                                            }}
                                        >Edit</a>
                                    </td>
                                    <td className="px-6 py-4">
                                        <a role='button'
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            onClick={async () => {
                                                await deleteTask(task?.id);
                                                await fetchData();
                                            }}
                                        >Delete</a>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Tasks