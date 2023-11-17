import {FC} from "react";
import MyCourseStudent from "@/components/dashboard/myCourseStudent";
import MyCourseTutor from "@/components/dashboard/myCourseTutor";

interface MyCourseProps{
    role: string,
    courseType: string
}
const MyCourseList:FC<MyCourseProps> = ({role, courseType}) => {
    if (role === "student") {
        return (
            <MyCourseStudent role={role} courseType={courseType}/>
        )
    } else {
        return (
            <MyCourseTutor role={role} courseType={courseType}/>
        )
    }
}

export default MyCourseList