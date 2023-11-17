"use client"
import {useParams, usePathname} from "next/navigation";
import { useQuery } from "@apollo/client";
import {Get_Conversations} from "@/graphql/queries";
import {useState} from "react";
import Link from "next/link";
import {Separator} from "@/components/ui/separator";

const pageSize = 5;

const ChatList = () => {
    const params = useParams();
    const pathname = usePathname();
    const userID = params?.userID;
    const courseID = params?.id;
    const {data: conversationData, loading: conversationLoading, error: conversationError} = useQuery(Get_Conversations, {
        variables: {
            userId: params?.userID
        }
    });
    console.log(conversationData?.getConversations);

    const role = pathname?.includes('tutor') ? 'tutor' : 'student';

    const conversations = pathname?.includes('tutor') ?
        conversationData?.getConversations?.map((conversation: any) => ({
                id: conversation?.id,
                name: conversation?.student?.name,
                email: conversation?.student?.email,
            })).reverse() :
        conversationData?.getConversations?.map((conversation: any) => ({
                id: conversation?.id,
                name: conversation?.tutor?.name,
                email: conversation?.tutor?.email,
            })).reverse();


    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const visibleConversations = conversations?.slice(startIndex, endIndex);

    const totalPages = Math.ceil(conversations?.length / pageSize);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <section className="flex justify-center">
            <div className="w-[95%] rounded-md border">
                <div className="p-4">
                    {visibleConversations?.map((message: any, index: any) => (
                        <Link href={`/${userID}/${role}/chat/${message.id}`} key={index}>
                            <div className="cursor-pointer">
                                <div className="text-sm">
                                    <div className="font-semibold">{message.name}</div>
                                    <div>{message.email}</div>
                                </div>
                                {index !== visibleConversations.length - 1 && (
                                    <Separator className="my-2" />
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
                {totalPages > 1 && (
                    <div className="join flex justify-center items-center mb-2">
                        <button
                            onClick={prevPage}
                            className="join-item btn"
                            disabled={currentPage === 1}
                        >
                            «
                        </button>
                        <button className="join-item btn">
                            {currentPage}
                        </button>
                        <button
                            onClick={nextPage}
                            className="join-item btn"
                            disabled={currentPage === totalPages}
                        >
                            »
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}

export default ChatList;