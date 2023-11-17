"use client"
import TutorApplyModal from "@/app/[userID]/tutor/course/(shared component)/tutorApplyModal";
import { usePathname } from "next/navigation";
import TutorDropModal from "@/app/[userID]/tutor/course/(shared component)/tutorDropModal";

const InteractBoxTutor = () => {
    const pathname = usePathname();
    return (
        <section>
            <div className="w-full mt-[4rem] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <h4 className="text-2xl font-bold tracking-tight">PRICE</h4>
                <ul className="my-4 max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                    <li>
                        Teach according to your own schedule
                    </li>
                    <li>
                        Arrange your personalised ONE-to-ONE Session
                    </li>
                    <li>
                        Earn as soon as you completed a session
                    </li>
                </ul>
                { pathname?.includes("my") ? (
                    <TutorDropModal />
                    )
                    : (
                    <TutorApplyModal />
                )}
            </div>
        </section>
    )
}

export default InteractBoxTutor