"use client"

import { GET_APPOINTMENT } from "@/graphql/queries";
import { useQuery } from "@apollo/client";

const AppointmentList = () => {
    const appointments = useQuery(GET_APPOINTMENT, {
        pollInterval: 200,
    })

    const formatDate = (dateString: any) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // getMonth() is zero-indexed
        const day = date.getDate();
        return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    }

    if (appointments.data) console.log(appointments.data)
    return (
        <section className="p-2">
            <h2 className="text-xl mb-2 font-extrabold leading-none tracking-tight
            text-gray-900 md:text-2xl lg:text-3xl dark:text-white">Appointments</h2>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Course
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Tutor
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Student
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Duration
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {appointments.data?.getAppointments.map((appointment: any) => (
                        <tr key={appointment.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {appointment.courseName}
                            </th>
                            <td className="px-6 py-4">
                                {appointment.tutorName}
                            </td>
                            <td className="px-6 py-4">
                                {appointment.studentName}
                            </td>
                            <td className="px-6 py-4">
                                1 hour
                            </td>
                            <td className="px-6 py-4">
                                {formatDate(appointment.date)}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </section>
    )
}

export default AppointmentList