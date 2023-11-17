import { Metadata } from "next"

import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
    title: "Forms",
    description: "Advanced form example using react-hook-form and Zod.",
}

interface SettingsLayoutProps {
    children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    return (
        <main className="mt-10">
            <div className="hidden space-y-6 p-10 pb-16 md:block">
                <div className="space-y-0.5 flex flex-col items-center">
                    <h2 className="text-2xl font-bold tracking-tight">New Course Detail</h2>
                    <p className="text-muted-foreground">
                        The details for the new course created by tutor
                    </p>
                </div>
                <Separator className="my-6" />
                <div className="flex flex-col justify-center space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <div className="flex-1 lg:max-w-2xl">{children}</div>
                </div>
            </div>
        </main>
    )
}