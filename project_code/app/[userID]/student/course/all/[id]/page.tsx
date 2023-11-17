import CourseDetail from "@/app/[userID]/student/course/(shared component)/course-detail";
import InteractBoxStudent from "@/app/[userID]/student/course/(shared component)/interactBoxStudent";
const CoursePageStu = () =>{
    return (
        <main className="mt-[5rem] grid grid-cols-1 md:grid-cols-3 px-6 sm:px-12 md:px-16 lg:px-[6rem] xl:px-[12rem]">
            <CourseDetail role={"student"}/>
            <InteractBoxStudent />
        </main>
    )
}

export default CoursePageStu