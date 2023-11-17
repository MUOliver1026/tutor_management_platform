import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Tutor appointment",
    description: "",
}

interface SettingsLayoutProps {
    children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    return (
        <main className="mt-10">
            {children}
        </main>
    )
}