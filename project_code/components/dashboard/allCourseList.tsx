"use client"

import { Course_type } from "@/app/[userID]/student/dashboard/page";
import { useQuery } from "@apollo/client";
import { GET_COURSES } from "@/graphql/queries";
import { FC } from "react"
import {FiltersType} from "@/components/dashboard/course-filter";
import CourseListComponent from "@/components/dashboard/courseListComponent";

interface CourseListProps {
    role: string,
    courseType: string,
    filters?: FiltersType,
}

const AllCourseList: FC<CourseListProps> = ({ role, courseType, filters }) => {
    const { data, loading, error } = useQuery(GET_COURSES, {
        pollInterval: 200,
    });

    if (loading) {
        return <span className="loading loading-infinity loading-lg"></span>
    }

    const filteredCourses = data.courses.filter((course: Course_type) => {
        const lowerCaseTags = course.tags.map(tag => tag.toLowerCase());
    
        if (filters?.timeZone && !lowerCaseTags.includes(filters.timeZone.toLowerCase())) {
            return false;
        }
        if (filters?.courseLevel && !lowerCaseTags.includes(filters.courseLevel.toLowerCase())) {
            return false;
        }
        return !(filters?.experienceLevel && !lowerCaseTags.includes(filters.experienceLevel.toLowerCase()));
    });
    
    return (
        <CourseListComponent data={filteredCourses} courseType={courseType} role={role}/>
    )
}

export default AllCourseList;
