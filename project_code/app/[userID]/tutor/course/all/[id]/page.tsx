import CourseDetail from "@/app/[userID]/student/course/(shared component)/course-detail";
import InteractBoxTutor from "@/app/[userID]/tutor/course/(shared component)/interactBoxTutor";

const CoursePageTut = () => {
    return (
        <main className="mt-[5rem] grid grid-cols-1 md:grid-cols-3 px-24">
            <CourseDetail role={"tutor"}/>
            <InteractBoxTutor />
        </main>
    )
}

export default CoursePageTut