"use client"

import {useQuery} from "@apollo/client";
import {GET_COURSES} from "@/graphql/queries"
import {useState} from "react";
import {DELETE_COURSE} from "@/graphql/mutations";
import {useMutation} from "@apollo/client";
import {ID} from "graphql-ws";

export default function CourseList() {
    const courseList = useQuery(GET_COURSES)

    const [deleteCourseMutation,{data,loading,error}] = useMutation(DELETE_COURSE,{
        refetchQueries: [{query: GET_COURSES}]
    })
    const [courseName, setCourseName] = useState("");
    const [courseID, setCourseID] = useState("");

    const deleteCourse = (id: ID) => {
        deleteCourseMutation({variables: {id: id}})
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Course name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Tutor
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Attendence
                    </th>
                </tr>
                </thead>
                <tbody>
                {courseList.data?.courses.map((course: any) => (
                    <tr id={course.id} key={course.id}
                        className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <th scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {course.name}
                        </th>
                        <td className="px-6 py-4">
                            {course.tutors.map((tutor: any) => (
                                <p key={tutor.id}>{tutor.name}</p>
                            ))}
                        </td>
                        <td className="px-6 py-4">
                            {course.students.length}
                        </td>
                    </tr>))}
                </tbody>
            </table>
            <dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Alert!</h3>
                    <p className="py-4">Do you want to delete {courseName}</p>
                    <div className="modal-action flex justify-between">
                        <form method="dialog" className="flex justify-between w-full">
                            <button className="btn" onClick={() => deleteCourse(courseID)}>Confirm</button>
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}
