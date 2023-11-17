import { FC } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import StudentBioDisplay from "@/components/StudentBioDisplay";

interface ProfileTableProps {
    className: string,
    data: any[];
    role: 'tutor' | 'student';
}

const ProfileTable: FC<ProfileTableProps> = ({ className, data, role }) => {
    const params = useParams();

    if (data.length === 0) {
        return (
            <div className="w-full md:w-3/4 p-4 my-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <h2 className="text-xl font-medium text-gray-900 dark:text-white">No students in this course</h2>
            </div>
        );
    }

    return (
        <div className={className}>
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Students in this Course</h5>
            </div>
            <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    {data.map((member) => (
                        <li key={member.id} className="py-3 sm:py-4">
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value={`item-${member.id}`}>
                                    <AccordionTrigger className="flex flex-row justify-between">
                                        <div>
                                            <img className="w-8 h-8 rounded-full" src={member?.profile?.thumbnail ? member?.profile?.thumbnail : "/default-user.png"} alt="Neil image" />
                                        </div>
                                        {
                                            role === 'tutor' ? (
                                                <Link href={`/${params?.userID}/tutor/other-profile/${member.id}`}>
                                                    <div className="hover:!no-underline">
                                                        {member.name}&nbsp;&nbsp;&nbsp;{member.email}
                                                    </div>
                                                </Link>
                                            ) : (
                                                <div className="hover:!no-underline">
                                                    {member.name}&nbsp;&nbsp;&nbsp;{member.email}
                                                </div>
                                            )
                                        }
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <StudentBioDisplay studentId={member.id} />
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ProfileTable;
