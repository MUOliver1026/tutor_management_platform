import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Forms",
    description: "Advanced form example using react-hook-form and Zod.",
}

interface SettingsLayoutProps {
    children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    return (
        <main className="mt-10 flex flex-col justify-center space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <div className="mt-[2rem] shadow rounded-md flex-1 lg:max-w-2xl">{children}</div>
        </main>
    )
}