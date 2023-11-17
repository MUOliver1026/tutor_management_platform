import Image from "next/image";
import Link from "next/link";
import {FC} from "react";
import {Course_type} from "@/app/[userID]/student/dashboard/page";
import { useParams } from "next/navigation";

interface CLprops{
  data: any,
  role: string,
  courseType: string,
}
const CourseListComponent:FC<CLprops> = ({data, role, courseType}) => {
    const params = useParams();
    return (
        <section className="flex justify-center">
            <div className="flex">
                {data?.length === 0 &&
                    <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
                        There are no courses under this entry.
                    </h2>
                }
            </div>
            <div className="grid grid-cols-3 gap-4">
                {data?.filter((course: { status: string; }) => course.status === 'Approved')
                    .map((course: Course_type) => (
                        <div
                            id={course.id}
                            className="card card-compact bg-base-100 shadow-xl"
                            key={course.id}
                        >
                            <figure>
                                <Image src="/course-pic.jpg" alt="CoursePic" width={300} height={300} />
                            </figure>
                            <article className="card-body">
                                <h2 className="card-title">{course.name}</h2>
                                <p>{course.description}</p>
                                <div className="card-actions justify-end">
                                    <Link href={`/${params?.userID}/${role}/course/${courseType}/${course.id}`}>
                                        <button className="btn btn-primary">More</button>
                                    </Link>
                                </div>
                            </article>
                        </div>
                    ))}
            </div>
        </section>
    )
}

export default CourseListComponent