"use client"
import { useQuery } from "@apollo/client";
import {GET_COURSES} from "@/graphql/queries";
import Link from "next/link";
import {useParams} from "next/navigation";


const NewCourseList: React.FC = () => {
    const params = useParams();
    const { data, loading } = useQuery(GET_COURSES, {
        pollInterval: 200,
    });

    if (!loading && !data?.courses) {
        return (
            <section className="p-6 bg-gray-100 dark:bg-gray-900">
                <h2 className="text-xl font-extrabold leading-none tracking-tight mb-5 text-gray-900 md:text-2xl lg:text-3xl dark:text-white">New Course Table</h2>
                <p>No data available.</p>
            </section>
        );
    }

    return (
        <section className="w-full p-2">
            <h2 className="text-xl font-extrabold leading-none tracking-tight mb-5 text-gray-900 md:text-2xl lg:text-3xl dark:text-white">New Course Table</h2>
            {data?.courses ? (
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white dark:bg-gray-800">
                    <table className="min-w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Course Name</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.courses
                                .filter((course: { status: string; }) => course.status === 'Pending')
                                .map((course: any) => (
                                <tr key={course.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{course.name}</th>
                                    <td className="px-6 py-4">  {course?.tutors?.map((tutor: any, index: number) => (
                                        <p key={tutor.id}> {tutor.email}</p>
                                    ))}</td>
                                    <td className="px-6 py-4">{course?.tutors?.map((tutor: any, index: number) => (
                                        <p key={tutor.id}> {tutor.name}</p>
                                    ))}</td>
                                    <td className="px-6 py-4 text-center">
                                    <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href={`/${params?.userID}/admin/tutoradmin/new-course/${course.id}/`}>
                                        More
                                    </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="flex justify-center items-center mt-5">
                    <span className="loading loading-dots loading-md"></span>
                </div>
            )}
        </section>
    );
}

export default NewCourseList;

