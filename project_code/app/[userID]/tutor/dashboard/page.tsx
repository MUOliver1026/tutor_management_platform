import { Metadata } from "next"
import AppointmentTable from "@/app/[userID]/tutor/dashboard/appointmentTable";
import CourseTab from "@/components/dashboard/courseTab";
import DashboardBanner from "@/components/dashboard/dashboardBanner";
export const metadata: Metadata = {
    title: "Tutor Dashboard",
    description: "Tutor interface",
}

const DashboardPage = () => {
    return (
        <main className="mt-[8rem] px-6">
            <DashboardBanner role="tutor" />
            <section className="grid grid-cols-8 gap-4">
                <div className="col-span-5">
                    <CourseTab role={"tutor"}/>
                </div>
                <div className="col-span-3">
                    <AppointmentTable />
                </div>
            </section>
        </main>

    )
}

export default DashboardPage