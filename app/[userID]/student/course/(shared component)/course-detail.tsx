"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {FC, useState} from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import {useMutation, useQuery} from "@apollo/client";
import {GET_COURSE, GET_SCORE, GET_STUDENT_PROFILE} from "@/graphql/queries";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import TutorBioDisplay from "@/components/TutorBioDisplay";
import {ADD_RATE} from "@/graphql/mutations";
import ProfileTable from "@/app/[userID]/tutor/course/(shared component)/profileTable";
import {useToast} from "@/components/ui/use-toast";

const CourseDetail:FC<{ role:string }> = ({ role }) => {
    const params = useParams();
    const pathname = usePathname();
    const toast = useToast();
    const getCourseDetail = useQuery(GET_COURSE, {variables:{ id:params?.id }});
    const { loading, data, error, refetch } = useQuery(GET_SCORE, {
        variables: { id: params?.id },
        fetchPolicy: "network-only",
    });

    const [addRate, { data: rateData, loading: rateLoading, error: rateError }] = useMutation(ADD_RATE);

    const rating = data?.getScore?.score === null ? 0 : parseFloat(parseFloat(data?.getScore?.score).toFixed(2));

    const roundedRating = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    const [currentRate, setCurrentRate] = useState<number | null>(null);

    const submitRate = async () => {
        if (currentRate !== null) {
            try {
                await addRate({
                    variables: {
                        id: params?.id,
                        rate: currentRate.toString(), // Ensure this is a string as your schema expects
                    },
                });
                toast.toast({
                    title: "Rate successfully!",
                })
                await refetch();
            } catch (e: any) {
                toast.toast({
                    variant: "destructive",
                    title: 'Rate failed!: ',
                    description: e.message || 'unknown error',
                })
            }
        } else {
            toast.toast({
                variant: "destructive",
                title: 'Please select a rating before submitting.',
            })
        }
    };

    const handleRateChange = (rate: number) => {
        setCurrentRate(rate);
    };

    return (
        getCourseDetail.data ?
            (
                <section className="col-span-2">
                    <nav className="flex" aria-label="Breadcrumb">
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
                                    <span className="ml-1 text-md font-medium text-gray-500 md:ml-2 dark:text-gray-400">{getCourseDetail?.data?.course?.name}</span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                    <h1 className="my-6 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">{getCourseDetail?.data?.course?.name}</h1>
                    <div className="w-full md:w-3/4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <div>
                            {/*<img className="rounded-t-lg" src={getCourseDetail.data.course?.thumbnail} alt="null" />*/}
                            <Image src="/course-pic.jpg" alt="course-pic" height={300} width={300} />
                        </div>
                        <div className="p-5">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{getCourseDetail.data.course?.description || "sample description"}</h5>
                            <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Ratings: &nbsp;{(rating === 0) ? ("Rating data not available") : (
                                <div className="flex items-center">
                                    <div className="flex items-center space-x-2 mb-5">
                                        {Array.from({ length: 5 }, (_, index) => (
                                            <svg
                                                key={index}
                                                className={`w-6 h-6 ${
                                                    index < roundedRating || (index === roundedRating && hasHalfStar)
                                                        ? "text-yellow-300"
                                                        : "text-gray-300 dark:text-gray-500"
                                                }`}
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 22 20"
                                            >
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                            </svg>
                                        ))}
                                        <p className="ml-1 font-medium">{rating}</p>
                                    </div>
                                </div>
                            )}
                        <div className="flex gap-2">
                            Add your rate:
                            <div className="rating">
                                {[1, 2, 3, 4, 5].map((rate) => (
                                    <input
                                        key={rate}
                                        type="radio"
                                        name="rating-2"
                                        className="mask mask-star-2 bg-orange-400"
                                        checked={currentRate === rate}
                                        onChange={() => handleRateChange(rate)}
                                    />
                                ))}
                            </div>
                            <Button onClick={submitRate}>Submit</Button>
                        </div>

                                <br/>
                                {getCourseDetail?.data?.course?.students?.length} students are in this course.
                            </div>
                        </div>
                    </div>

                    {role === "tutor" && pathname?.includes("my") &&
                        <ProfileTable data={getCourseDetail?.data?.course?.students} role={"tutor"}
                          className="w-full md:w-3/4 p-4 mt-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
                        />
                    }

                    <div className="w-full md:w-3/4 p-4 my-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Available Tutors</h5>
                        </div>
                        <div className="flow-root">
                            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                {getCourseDetail?.data?.course?.tutors.map((tutor:any) => (
                                    <li key={tutor.id} className="py-3 sm:py-4">
                                        <Accordion type="single" collapsible className="w-full">
                                            <AccordionItem value="item-1">
                                                <AccordionTrigger className="flex flex-row justify-between">
                                                    <div>
                                                        <img className="w-8 h-8 rounded-full" src={tutor?.profile?.thumbnail ? tutor?.profile?.thumbnail : "/default-user.png"} alt="Neil image" />
                                                    </div>
                                                    {
                                                        role === 'tutor' ? (
                                                            <div className="hover:!no-underline">
                                                                {tutor.name}&nbsp;&nbsp;&nbsp;{tutor.email}
                                                            </div>
                                                        ) : (
                                                            <Link href={`/${params?.userID}/student/other-profile/${tutor.id}`}>
                                                                <div className="hover:!no-underline">
                                                                    {tutor.name}&nbsp;&nbsp;&nbsp;{tutor.email}
                                                                </div>
                                                            </Link>
                                                        )
                                                    }
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    <TutorBioDisplay tutorId={tutor.id} />
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            ) : (
                <section className="col-span-2 flex justify-center items-center">
                    <span className="loading loading-spinner loading-lg"></span>
                </section>
            )
    )
}

export default CourseDetail