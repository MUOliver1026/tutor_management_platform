import { FC, ReactNode } from 'react'

interface ResetLayoutProps {
    children: ReactNode
}

const ResetLayout: FC<ResetLayoutProps> = ({ children }) => {
    return (
        <main className='min-h-screen bg-slate-200 p-10 pt-24 rounded-md flex flex-col justify-center items-center'>
            <article>
                <h1 className="text-3xl text-center">Welcome!</h1>
                <p>Learn anything on your schedule</p>
            </article>
            {children}
        </main>
    )
}

export default ResetLayout