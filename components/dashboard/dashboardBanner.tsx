'use client'
import Link from "next/link";
import Image from "next/image";
import AddCourseIcon from "@/public/addCourseIcon.svg";
import {ChevronRight} from "lucide-react";
import MsgIcon from "@/public/message.svg";
import {useParams} from "next/navigation";
import {FC} from "react";

interface props {
    role: string,
}

const DashboardBanner:FC<props> = ({ role }) => {
    const params = useParams();
    return (
        <section>
            <section className="hidden mb-6 sm:flex flex-col lg:flex-row gap-6 lg:gap-0 justify-center items-center">
                {role === "tutor" ? (
                    <section className="flex">
                        <Link href={`/${params?.userID}/tutor/application`} className="w-30 sm:w-[35rem] mx-4 px-[2rem] py-2 flex flex-row justify-between items-center border-2 border-sky-500 rounded-md ">
                            <Image src={AddCourseIcon}  alt={"add course icon"} width={50} height={50}/>
                            <div className="flex flex-col px-6 font-medium">
                                <p className="text-lg">Tallor TutorTrackr for your needs</p>
                                <p>Add courses in your expertise</p>
                            </div>
                            <ChevronRight width={30} height={30} />
                        </Link>
                        <Link href={`/${params?.userID}/tutor/chat`} className="w-30 sm:w-[35rem] mx-4 px-[2rem] py-2 flex flex-row justify-between items-center border-2 border-sky-500 rounded-md ">
                            <Image src={MsgIcon}  alt={"add course icon"} width={50} height={50}/>
                            <div className="flex flex-col px-6 font-medium">
                                <p className="text-lg">Track your sessions effortlessly</p>
                                <p>View messages in TutorTrackr</p>
                            </div>
                            <ChevronRight width={30} height={30} />
                        </Link>
                    </section>
                ) : (
                    <section>
                        <Link href={`/${params?.userID}/student/chat`} className="w-30 sm:w-[35rem] mx-4 px-[2rem] py-2 flex flex-row justify-between items-center border-2 border-sky-500 rounded-md ">
                            <Image src={MsgIcon}  alt={"add course icon"} width={50} height={50}/>
                            <div className="flex flex-col px-6 font-medium">
                                <p className="text-lg">Track your sessions effortlessly</p>
                                <p>View messages in TutorTrackr</p>
                            </div>
                            <ChevronRight width={30} height={30} />
                        </Link>
                    </section>
                )}

            </section>
        </section>
    );
};

export default DashboardBanner;
