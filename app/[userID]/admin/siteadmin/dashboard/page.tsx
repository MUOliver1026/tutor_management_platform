import { Metadata } from "next"

import StudentList from "@/app/[userID]/admin/siteadmin/dashboard/student-list"
import CourseList from "@/app/[userID]/admin/siteadmin/dashboard/course-list";
import TutorList from "@/app/[userID]/admin/siteadmin/dashboard/tutor-list";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Example dashboard app built using the components.",
}

export default function DashboardPage() {
    return (
        <section>
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-20 mt-10">
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                </div>
                <StudentList />
                <TutorList />
                <CourseList />
            </div>
        </section>
    )
}