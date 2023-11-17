"use client";
import {GET_COURSE} from "@/graphql/queries";
import {useMutation, useQuery} from "@apollo/client";
import { useParams } from "next/navigation";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {
    Approval_Course_Application,
    Reject_Course_Application
} from "@/graphql/mutations";
import {useEffect, useState} from "react";
import {useToast} from "@/components/ui/use-toast";

const NewCoursePage = () => {
    const param = useParams();
    const toast = useToast();
    const course = useQuery(GET_COURSE, { variables: { id: param?.id } });
    const [acceptApplication, {data:acceptData,loading:acceptLoading,error:acceptError}] = useMutation(Approval_Course_Application);
    const [rejectApplication, {data:rejectData,loading:rejectLoading,error:rejectError}] = useMutation(Reject_Course_Application);

    const appDetails = course?.data?.course;
    const [status, setStatus] = useState(appDetails?.status);

    // console.log(appDetails?.tutors[0].id)

    useEffect(() => {
        setStatus(appDetails?.status);
    }, [appDetails?.status]);

    if (!appDetails) {
        return <div>Loading...</div>;
    }

    const handleAcceptClick = async () => {
        await acceptApplication({
            variables: {
                tutorId: appDetails?.tutors[0]?.id,
                id: param?.id,
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
                tutorId: appDetails?.tutors[0]?.id,
                id: param?.id,
            },
        }).then(() => {
            toast.toast({
                variant: "destructive",
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
                    <span className="font-semibold">Name:</span> {appDetails?.tutors?.map(
                    (tutor: any, index: number) => (
                        <p key={tutor.id}> {tutor.name}</p>
                    )
                )}
                </div>
                <div className="mb-4">
                    <span className="font-semibold">Email:</span> {appDetails?.tutors?.map(
                    (tutor: any, index: number) => (
                        <p key={tutor.id}> {tutor.email}</p>
                    )
                )}
                </div>
                <div className="mb-4">
                    <span className="font-semibold">Course Name:</span> {appDetails?.name}
                </div>
                <div className="mb-4">
                    <span className="font-semibold">Description:</span> {appDetails?.description}
                </div>
                <div className="mb-4">
                    <span className="font-semibold">Status:</span> {appDetails?.status}
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

export default NewCoursePage;
