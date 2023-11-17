"use client"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import { useMutation } from "@apollo/client";
import {CreateConversation} from "@/graphql/mutations";
import { useParams, usePathname, useRouter } from "next/navigation";

const ChatModal = () => {
    const params = useParams();
    const pathname = usePathname();
    const router = useRouter();
    const role = pathname?.includes("student") ? ("student") : ("tutor");
    const tutorId = role === "student" ? (params?.otherID) : (params?.userID);
    const studentId = role === "student" ? (params?.userID) : (params?.otherID);
    const [addConversation, {data, loading, error}] = useMutation(CreateConversation, {
        variables: {
            tutorId,
            studentId
        }
    });
    const checkConversation = () => {
        addConversation().then((res) => {
            if (role === "student") {
                router.replace(`/${studentId}/student/chat/${res?.data?.createConversation?.id}/`)
            } else {
                router.replace(`/${tutorId}/tutor/chat/${res?.data?.createConversation?.id}/`);
            }
        });
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button type="button" onClick={checkConversation} className="w-1/4 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    Message
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] flex flex-col justify-center items-center">
                <DialogHeader>
                    <DialogTitle>Hi there</DialogTitle>
                </DialogHeader>
                <span className="flex justify-center loading loading-spinner loading-lg"></span>
            </DialogContent>
        </Dialog>
    )
}

export default ChatModal;