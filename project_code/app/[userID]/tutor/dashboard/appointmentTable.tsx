'use client'

import { useQuery } from "@apollo/client";
import {GET_APPOINTMENT, GET_TUTOR} from "@/graphql/queries";
import Link from "next/link";
import {useParams} from "next/navigation";

const AppointmentTable = () => {
    const params = useParams();
    const { data: appointmentData, loading: appointLoading, error: appointError } = useQuery(GET_APPOINTMENT, {
        pollInterval: 200,
    });
    const { data: tutorData, loading: tutorLoading, error: tutorError } = useQuery(GET_TUTOR, {
        variables: {
            id: params?.userID
        }
    });

    const userEmail = tutorData?.getTutor?.email

    if (appointLoading || tutorLoading) return <p>Loading appointments...</p>;
    if (appointError || tutorError) return <p>Error loading appointments: {tutorError?.message}</p>;

    return (
        <section className="shadow-md sm:rounded-lg">
            <h1 className="text-2xl font-extrabold dark:text-white">Appointment List</h1>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="py-3">Course</th>
                    <th scope="col" className="py-3">Student Email</th>
                    <th scope="col" className="py-3">Action</th>
                </tr>
                </thead>
                <tbody>
                {appointmentData?.getAppointments
                    .filter((appointment: any) => appointment.tutorEmail === userEmail)
                    .map((appointment: any) => (
                    <tr key={appointment.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {appointment.courseName}
                        </th>
                        <td className="py-4">{appointment.studentEmail}</td>
                        <td className="py-4">
                            <Link href={`/${params?.userID}/tutor/appointment/${appointment.id}/`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">More</Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    );
};

export default AppointmentTable;
