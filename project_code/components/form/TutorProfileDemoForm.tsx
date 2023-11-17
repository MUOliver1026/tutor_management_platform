"use client"

import { useQuery } from "@apollo/client";
import { GET_TUTOR_PROFILE } from "@/graphql/queries";
import {useParams, useRouter} from "next/navigation";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ChatModal from "@/components/chat/chatModal";
export function TutorProfileDisplay() {
    const router = useRouter();
    const params = useParams();

    const profileUserID = (params?.otherID) ? params?.otherID : params?.userID;

    const { loading, error, data } = useQuery(GET_TUTOR_PROFILE, {
        variables: { id: profileUserID },
        fetchPolicy: 'network-only'
    });

    const handleUpdateClick = () => {
        router.push(`/${params?.userID}/tutor/profile/update`);
    };

    const handleDashboardClick = () => {
        params?.otherID ? router.push(`/${params?.userID}/student/dashboard`) :
        router.push(`/${params?.userID}/tutor/dashboard`);
    };

    return (
        <article className="p-6 bg-white shadow-md rounded-lg space-y-4">
            <section className="flex justify-center">
                <Avatar className="w-24 h-24">
                    <AvatarImage src={data?.getTutorProfile?.thumbnail || "/default-user.png"} alt="avatar" />
                    <AvatarFallback>Avatar</AvatarFallback>
                </Avatar>
            </section>
            <section className="font-semibold text-center mb-4 flex flex-col items-center gap-1">
                <div className="text-xl text-gray-700">{data?.getTutorProfile?.username}</div>
                <div className="text-xl text-gray-700">{data?.getTutorProfile?.email}</div>
                {(params?.otherID) ? <ChatModal /> : <></>}
            </section>
            <div className="text-gray-700">Phone: {data?.getTutorProfile?.phone}</div>
            <div className="text-gray-700">Location: {data?.getTutorProfile?.address}</div>
            <div className="text-gray-700">Time Zone: {data?.getTutorProfile?.timeZone}</div>
            <div className="text-md text-gray-700">Professional Bio: {data?.getTutorProfile?.professionalBio}</div>
            <div className="text-gray-700">Experience Summary: {data?.getTutorProfile?.experienceSummary}</div>
            <div className="text-gray-700">Course Can Teach: {data?.getTutorProfile?.courseCanTeach}</div>
            <div className="text-gray-700">Balance: {data?.getTutorProfile?.accountBalance}</div>
            <div className="flex justify-center space-x-4 mt-6">
                {(!params?.otherID) ?
                <Button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleUpdateClick}>Update</Button> : null}
                <Button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={handleDashboardClick}>Back</Button>
            </div>
        </article>
    );
}
