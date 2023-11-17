import { Metadata } from "next"
import NewCourseList from "@/app/[userID]/admin/tutoradmin/dashboard/newCourseList";
import TutorApplicationList from "@/app/[userID]/admin/tutoradmin/dashboard/tutorApplicationList";
import AppointmentList from "@/app/[userID]/admin/tutoradmin/dashboard/appointmentList";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Example dashboard app built using the components.",
}

export default function DashboardPage() {
    return (
        <main className="mt-[5rem] p-4">
            <section className="grid grid-cols-2 gap-4">
                <div className="col-span-1 mx-3">
                    <NewCourseList />
                </div>
                <div className="col-span-1 mx-3">
                    <TutorApplicationList />
                </div>
            </section>
            <section className="mx-3 mt-3">
                <AppointmentList />
            </section>
        </main>
    )
}