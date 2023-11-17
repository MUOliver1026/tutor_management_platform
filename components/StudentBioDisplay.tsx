import React, { FC } from 'react';
import { useQuery } from "@apollo/client";
import { GET_STUDENT_PROFILE } from "@/graphql/queries";

interface Props {
    studentId: string; // Use lowercase 'string' type
}

const TutorBioDisplay: FC<Props> = ({ studentId }) => {
    const { loading, error, data } = useQuery(GET_STUDENT_PROFILE, {
        variables: { id: studentId },
        fetchPolicy: 'network-only'
    });

    // Handle loading and error states as needed
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h3 className="font-bold">Personal Bio:</h3>
            <p>{data?.getStudentProfile?.biography}</p>
        </div>
    );
};

export default TutorBioDisplay;
