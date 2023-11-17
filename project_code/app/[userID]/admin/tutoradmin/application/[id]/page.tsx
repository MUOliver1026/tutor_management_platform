'use client'

import {useParams} from "next/navigation";
import {useMutation, useQuery} from "@apollo/client";
import {GET_APPLICATION_BY_ID} from "@/graphql/queries";
import {
    Approval_Application, REGISTER_COURSE_FOR_TUTOR,
    Reject_Application,
} from "@/graphql/mutations";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useToast} from "@/components/ui/use-toast";

const TutorApplicationPage = () => {
    const param = useParams();
    const toast = useToast();
    const application = useQuery(GET_APPLICATION_BY_ID, { variables: { id: param?.id } });
    const [acceptApplication, {data:acceptData,loading:acceptLoading,error:acceptError}] = useMutation(Approval_Application);
    const [rejectApplication, {data:rejectData,loading:rejectLoading,error:rejectError}] = useMutation(Reject_Application);
    const [addTutor, {data:addTutorData,loading:addTutorLoading,error:addTutorError}] = useMutation(REGISTER_COURSE_FOR_TUTOR);

    const appDetails = application?.data?.getSingleApplication;
    const [status, setStatus] = useState(appDetails?.status);

    useEffect(() => {
        setStatus(appDetails?.status);
    }, [appDetails?.status]);

    if (!appDetails) {
        return <div>Loading...</div>;
    }

    const handleAcceptClick = async () => {
        await acceptApplication({
            variables: {
                tutorId: appDetails?.tutorId,
                id: param?.id,
            },
        })
        await addTutor({
            variables: {
                tutorId: appDetails?.tutorId,
                courseId: appDetails?.courseId,
            },
        }).then(() => {
            toast.toast({
                title: "Application accepted",
                description: "Friday, February 10, 2023 at 5:57 PM",
            })
            setStatus("Approved")
        });
    }

    const handleRejectClick = async () => {
        await rejectApplication({
            variables: {
                tutorId: appDetails?.tutorId,
                id: param?.id,
            },
        }).then(() => {
            toast.toast({
                title: "Application rejected",
                description: "Friday, February 10, 2023 at 5:57 PM",
            })
            setStatus("Rejected")
        });
    }

    return (
        <div className="flex flex-col items-center">
            <main className="p-5 bg-white shadow-lg rounded-lg w-full max-w-2xl">
                <div className="mb-4">
                    <span className="font-semibold">Name:</span> {appDetails?.name}
                </div>
                <div className="mb-4">
                    <span className="font-semibold">Email:</span> {appDetails?.email}
                </div>
                <div className="mb-4">
                    <span className="font-semibold">Course Name:</span> {appDetails?.courseName}
                </div>
                <div className="mb-4">
                    <span className="font-semibold">Description:</span> {appDetails?.description}
                </div>
                <div className="mb-4">
                    <span className="font-semibold">Start time:</span> {appDetails?.startTime}
                </div>
                <div className="mb-4">
                    <span className="font-semibold">End time:</span> {appDetails?.endTime}
                </div>
                {appDetails.interview && (
                    <div className="mb-4">
                        <span className="font-semibold">Interview:</span> {appDetails?.interview}
                    </div>
                )}
                <div className="flex gap-2">
                    {status !== 'Approved' && status !== 'Rejected' && (
                        <>
                            <Button
                                className="bg-blue-500 hover:bg-blue-600 text-white rounded"
                                onClick={handleAcceptClick}
                            >
                                Accept
                            </Button>
                            <Button
                                className="bg-red-500 hover:bg-red-600 text-white rounded"
                                onClick={handleRejectClick}
                            >
                                Reject
                            </Button>
                        </>
                    )}
                    <Link href={`/${param?.userID}/admin/tutoradmin/dashboard`}>
                        <Button className="bg-gray-500 hover:bg-blue-600 text-white rounded">Back</Button>
                    </Link>
                </div>

            </main>
        </div>
    );
}

export default TutorApplicationPage;