'use client'

import { Separator } from "@/components/ui/separator"
import Link from "next/link";
import {useParams} from "next/navigation";

interface SettingsLayoutProps {
    children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    const params = useParams();
    return (
        <main className="mt-10">
            <nav className="flex px-[2rem] md:px-[8rem] xl:px-[26rem]" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                        <Link href={`/${params?.userID}/tutor/dashboard`} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                            <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                            </svg>
                            Dashboard
                        </Link>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                            </svg>
                            <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Messages</span>
                        </div>
                    </li>
                </ol>
            </nav>

            <div className="space-y-6 p-10 pb-16">
                <div className="space-y-0.5 flex flex-col items-center">
                    <h2 className="text-2xl font-bold tracking-tight">Message Box</h2>
                    <p className="text-muted-foreground">
                        All messages are listed here.
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