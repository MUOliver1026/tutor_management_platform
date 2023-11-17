import { FC, ReactNode } from "react"
interface studentLayoutProps {
    children: ReactNode
}
const StudentLayout: FC<studentLayoutProps> = ({ children }) => {
    return (<main className="min-h-screen overflow-hidden rounded-[0.5rem] border bg-background shadow">
        { children }
    </main>)
}

export default StudentLayout