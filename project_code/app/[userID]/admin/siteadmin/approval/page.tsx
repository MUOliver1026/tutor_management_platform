import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Course Approval",
    description: "Example form for admin to display for course.",
}

export default function DashboardPage() {
    return (
        <section>
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-20 mt-10">
                    <h2 className="text-3xl font-bold tracking-tight">Course Approval</h2>
                </div>
            </div>
        </section>
    )
}