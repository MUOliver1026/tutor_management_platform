"use client"
import { GET_STUDENT_COURSES } from "@/graphql/queries";
import { useQuery} from "@apollo/client";
import CourseListComponent from "@/components/dashboard/courseListComponent";
import {useParams} from "next/navigation";
import {FC} from "react";

interface MCSprops {
    role: string,
    courseType: string,
}
const MyCourseStudent:FC<MCSprops> = ({role, courseType}) => {
    const params = useParams();
    const {data: studentCourses, loading: studentLoading, error: studentError} = useQuery(GET_STUDENT_COURSES, {
        variables:{
            studentId: params?.userID
        },
        pollInterval: 200,
    });
    if (studentLoading) {
        return <div>loading</div>
    }
    return (
        <CourseListComponent data={studentCourses?.getStudentCourses} role={role} courseType={courseType}/>
    )
}

export default MyCourseStudent;