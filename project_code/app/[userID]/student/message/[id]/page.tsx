'use client'

import React from 'react';
import { useParams } from "next/navigation";
import Link from "next/link";

const MessagePage = () => {
    const params = useParams();

    return (
        <main className="flex flex-col justify-center items-center">
            <h1 className="text-2xl">
                Message Page
            </h1>
            <p>Message: {params?.id}</p>
            <Link href={`/${params?.userID}/student/message`}>
                <button className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700">Back</button>
            </Link>
        </main>

    );
};

export default MessagePage;
