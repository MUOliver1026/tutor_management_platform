"use client"
import { FormEvent, useState } from "react";
import { useContextValue } from "@/components/providers/context";
import { UPDATE_PASSWORD } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ResetPage = () => {
    const router = useRouter();
    const { getters } = useContextValue();
    const [password, setPassword] = useState<string | undefined>();
    const [rePassword, setRePassword] = useState<string | undefined>();
    const [mismatch, setMismatch] = useState(false);
    const [updatePwd, {data, loading, error}] = useMutation(UPDATE_PASSWORD);
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password === rePassword) {
            setMismatch(false);
            const res = await updatePwd({
                variables: {
                    email: getters.userEmail,
                    password: password
                }
            })
            if (res?.data?.resetPassword?.status) {
                router.push("login");
            } else {
                console.log(res);
            }
        } else {
            setMismatch(true);
        }
    }

    return (
        <main>
            <h1 className="text-2xl font-bold mb-4">Reset Account Password</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input required type="password" onChange={(e) => { setPassword(e.target.value)}}
                       placeholder="Enter your password" id="password"
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                />
                <label htmlFor="re-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Re-enter Password</label>
                <input required type="password" onChange={(e) => { setRePassword(e.target.value)}}
                       placeholder="Enter your password again" id="re-password"
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                />
                { mismatch && (
                    <div className="alert alert-warning mb-2 p-1 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <span>Your password doesn&apos;t match!</span>
                    </div>
                )}
                <button type="submit" className="p-2 w-full bg-blue-500 text-white rounded">
                    Reset Password
                </button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-3">
                Remember your password? please&nbsp;
                <Link className="text-blue-500 hover:underline" href="/login">
                    sign in
                </Link>
            </p>
        </main>
    )
}

export default ResetPage