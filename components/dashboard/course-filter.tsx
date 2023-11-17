"use client"

import Combobox from "@/components/ui/combo-box";
import React, { useState, useEffect } from 'react';
import { useQuery } from "@apollo/client";
import { GET_COURSES } from "@/graphql/queries";

// These arrays will hold objects with value and label properties
const timeZones: { value: string; label: string; }[] = [];
const courseLevels: { value: string; label: string; }[] = [];
const experienceLevels: { value: string; label: string; }[] = [];

export interface FiltersType {
    timeZone?: string | null;
    courseLevel?: string | null;
    experienceLevel?: string | null;
}

interface CourseFilterProps {
    onFilterChange: (filters: FiltersType) => void;
}

const CourseFilter: React.FC<CourseFilterProps> = ({ onFilterChange }) => {
    const [timeZone, setTimeZone] = useState<string | null>(null);
    const [courseLevel, setCourseLevel] = useState<string | null>(null);
    const [experienceLevel, setExperienceLevel] = useState<string | null>(null);
    const { data, loading } = useQuery(GET_COURSES, {
        fetchPolicy: 'network-only',
    });
    
    useEffect(() => {
        if (data?.courses) {
            data.courses.forEach((course: any) => {
                if (course.tags && course.tags.length >= 3) {
                    const timeZoneObject = { value: course.tags[0], label: course.tags[0].split(" ").slice(1).join(" ") };
                    const courseTypeObject = { value: course.tags[1], label: course.tags[1] };
                    const experienceLevelObject = { value: course.tags[2], label: course.tags[2] };

                    if (!timeZones.some(tz => tz.value === timeZoneObject.value)) {
                        timeZones.push(timeZoneObject);
                    }
                    if (!courseLevels.some(ct => ct.value === courseTypeObject.value)) {
                        courseLevels.push(courseTypeObject);
                    }
                    if (!experienceLevels.some(el => el.value === experienceLevelObject.value)) {
                        experienceLevels.push(experienceLevelObject);
                    }
                }
            });
            onFilterChange({
                timeZone,
                courseLevel,
                experienceLevel
            });
        }
    }, [data?.courses, timeZone, courseLevel, experienceLevel, onFilterChange]); // Run this effect when data.courses changes
    return (
        <section className="mb-4 flex justify-center gap-3">
            <Combobox
                items={timeZones}
                placeholder="Select Time Zone"
                onChange={(selectedValue) => { setTimeZone(selectedValue); }}
            />
            <Combobox
                items={courseLevels}
                placeholder="Select Course Type"
                onChange={(selectedValue) => { setCourseLevel(selectedValue); }}
            />
            <Combobox
                items={experienceLevels}
                placeholder="Select Tutor Experience Level"
                onChange={(selectedValue) => { setExperienceLevel(selectedValue); }}
            />
        </section>
    );
}

export default CourseFilter;

