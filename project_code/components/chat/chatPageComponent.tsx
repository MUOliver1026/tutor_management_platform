"use client"
import ChatList from "@/components/chat/chatList";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
const ChatPageComponent = () => {
    const params = useParams();
    const pathname = usePathname();
    const role = pathname?.includes("student") ? ("student") : ("tutor");
    return (
        <main className="mt-[5rem]">
            <nav className="flex ml-8" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                        <Link href={`/${params?.userID}/${role}/dashboard/`} className="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
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
                            <span className="ml-1 text-md font-medium text-gray-500 md:ml-2 dark:text-gray-400">Your conversations</span>
                        </div>
                    </li>
                </ol>
            </nav>
            <h1 className="text-center mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
                Talk to your tutors
            </h1>
            <ChatList />
        </main>
    )
}

export default ChatPageComponent;