"use client"
import { GET_TUTOR_COURSES } from "@/graphql/queries";
import {useQuery} from "@apollo/client";
import CourseListComponent from "@/components/dashboard/courseListComponent";
import {useParams} from "next/navigation";
import {FC} from "react";

interface MCTprops {
    role: string,
    courseType: string,
}

const MyCourseTutor:FC<MCTprops> = ({role, courseType}) => {
    const params = useParams();
    const {data: tutorCourses, loading: tutorLoading, error: tutorError} = useQuery(GET_TUTOR_COURSES, {
        variables: {
            tutorId:params?.userID
        },
        pollInterval: 200,
    });
    if (tutorLoading) {
        return <div>loading</div>
    }
    return (
        <CourseListComponent data={tutorCourses?.getTutorCourses} role={role} courseType={courseType}/>
    )
}

export default MyCourseTutor;