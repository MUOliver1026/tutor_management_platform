import React, { FC } from 'react';
import { useQuery } from "@apollo/client";
import { GET_TUTOR_PROFILE } from "@/graphql/queries";

interface Props {
    tutorId: string;
}

const TutorBioDisplay: FC<Props> = ({ tutorId }) => {
    const { loading, error, data } = useQuery(GET_TUTOR_PROFILE, {
        variables: { id: tutorId },
        fetchPolicy: 'network-only'
    });

    // Handle loading and error states as needed
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h3 className="font-bold">Professional Bio:</h3>
            <p>{data?.getTutorProfile?.professionalBio}</p>
        </div>
    );
};

export default TutorBioDisplay;
