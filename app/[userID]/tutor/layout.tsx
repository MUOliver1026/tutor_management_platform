import { FC, ReactNode } from "react"
interface tutorLayoutProps {
    children: ReactNode
}
const TutorLayout: FC<tutorLayoutProps> = ({ children }) => {
    return (<main className="min-h-screen overflow-hidden rounded-[0.5rem] border bg-background shadow">
        { children }
    </main>)
}

export default TutorLayout