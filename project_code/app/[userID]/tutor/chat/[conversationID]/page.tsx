"use client"
import { useParams } from "next/navigation";
import {SocketIndicator} from "@/components/chat/socketIndicator";
import ChatMessages from "@/components/chat/chatMessages";
import ChatInput from "@/components/chat/chatInput";
import Link from "next/link";

const TutorChat = () => {
    const params = useParams();
    return (
        <main className="mt-[5rem] mb-3">
            <nav className="flex ml-8 mb-2" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                        <Link href={`/${params?.userID}/tutor/dashboard/`} className="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
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
                            <span className="ml-1 text-md font-medium text-gray-500 md:ml-2 dark:text-gray-400">Your chat</span>
                        </div>
                    </li>
                </ol>
            </nav>
            <article className="flex flex-col justify-between min-h-[80vh] mx-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <section>
                    <SocketIndicator />
                    <ChatMessages className="mx-1 bg-white"
                                  apiUrl={"/api/messages"}
                                  socketUrl={"/api/socket/messages"}
                                  conversationId={params?.conversationID}
                    />
                </section>
                <ChatInput className="mx-1 mt-6"
                           apiUrl={"/api/socket/messages"}
                           query={{
                               conversationId: params?.conversationID
                           }}
                />
            </article>
        </main>
    )
}
export default TutorChat;