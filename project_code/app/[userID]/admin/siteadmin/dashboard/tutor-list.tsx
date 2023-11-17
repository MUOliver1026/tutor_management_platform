"use client"

import {useQuery} from "@apollo/client";
import {GET_TutorList} from "@/graphql/queries"
import {useState} from "react";
import {DELETE_Tutor} from "@/graphql/mutations";
import {useMutation} from "@apollo/client";

export default function TutorList() {
    const tutorList = useQuery(GET_TutorList)
    const [deleteTutorMutation,{data, loading, error}] = useMutation(DELETE_Tutor,{
        refetchQueries: [{query: GET_TutorList}]
    })
    const [tutorId, setTutorId] = useState("");
    const [tutorName, setTutorName] = useState("");
    const [tutorEmail, setTutorEmail] = useState("");


    const deleteTutor = (id: string) => {
        deleteTutorMutation({variables: {id: id,email:tutorEmail}}).then()
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Tutor name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Course
                    </th>
                </tr>
                </thead>
                <tbody>
                {tutorList.data?.getTutorList?.map((tutor: any) => (
                    <tr id={tutor.id} key={tutor.id}
                        className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <th scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {tutor.name}
                        </th>
                        <td className="px-6 py-4">
                            {tutor.email}
                        </td>
                        <td className="px-6 py-4">
                            {tutor.courses?.map((course: any, index: number) => (
                                <p key={course.id}> {course.name}</p>
                            ))}
                        </td>
                    </tr>))}
                </tbody>
            </table>
            <dialog id="my_modal_2" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Alert!</h3>
                    <p className="py-4">Do you want to delete {tutorName}: {tutorEmail}</p>
                    <div className="modal-action flex justify-between">
                        <form method="dialog" className="flex justify-between w-full">
                            <button className="btn" onClick={() => deleteTutor(tutorId)}>Confirm</button>
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}
