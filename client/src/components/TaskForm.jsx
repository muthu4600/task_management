import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createTask, updateTask } from "@/APIs/taskServices";

const TaskForm = ({ fetchData, setShowForm, defaultValues }) => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ values: defaultValues });

    const formSubmit = async (formValue) => {
        defaultValues ?
            await updateTask(formValue) :
            await createTask(formValue);
        fetchData();
    };

    return (
        <div className='mt-6'>
            <form onSubmit={handleSubmit(formSubmit)}>
                <div className="mb-4">
                    <label className="block mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        {...register("title", { required: true, maxLength: 255 })}
                        className="w-1/3 px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-100 text-black"
                    />
                    {errors.title && <p className="text-red-500">Title is required.</p>}
                </div>
                <div className="mb-4">
                    <label className="block mb-2">
                        Description
                    </label>
                    <textarea
                        type="text"
                        {...register("description", { required: true, maxLength: 1000 })}
                        className="w-1/3 px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-100 text-black"
                    />
                    {errors.description && <p className="text-red-500">Description is required.</p>}
                </div>

                <div className="mb-6">
                    <button onClick={() => setShowForm(false)} className='mr-2 px-4 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Close</button>
                    <button type="submit" className='px-4 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default TaskForm;