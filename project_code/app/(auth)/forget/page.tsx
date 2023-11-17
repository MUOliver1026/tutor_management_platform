"use client"
import { useState, useEffect, MouseEvent } from "react";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useContextValue } from "@/components/providers/context";
import { Find_User_By_Email } from "@/graphql/queries";
import {useToast} from "@/components/ui/use-toast";
import Link from "next/link";

const ForgetPasswordPage = () => {
    const {getters, setters} = useContextValue();
    const router = useRouter();
    const toast = useToast();
    const [email, setEmail] = useState("");
    const [verifyCode, setVerifyCode ] = useState("");
    const [generatedCode, setGeneratedCode] = useState("");
    const [findUser] = useLazyQuery(Find_User_By_Email);

    const generateVerificationCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 5; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };

    useEffect(() => {
        setters.setEmail(email);
    }, [email, setters]);

    useEffect(() => {
        setGeneratedCode(generateVerificationCode());
    }, []);

    const openModal = async () => {
        if (email === "") {
            toast.toast({
                variant: "destructive",
                title: "Info needed!",
                description: "Please enter your email address",
            });
            return;
        }
        const res_user = await findUser({variables: {email: email}});
        if (res_user?.data?.finduserbyEmail?.status === true) {
            const res = await fetch("api/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    verifyCode: generatedCode, // Send the generated code instead of a hardcoded one
                })
            });
            if (res.status === 200) {
                const myModal = document.getElementById('my_modal_1') as HTMLDialogElement | null;
                if (myModal && email !== "") {
                    myModal.showModal();
                } else {
                    toast.toast({
                        variant: "destructive",
                        title: "Info needed!",
                        description: "Please enter your email address",
                    });
                }
            } else {
                toast.toast({
                    variant: "destructive",
                    title: "Email not sent!",
                    description: "Please try again",
                });
            }
        } else {
            toast.toast({
                variant: "destructive",
                title: "Account not found!",
                description: "Please try again",
            });
        }
    };

    const verifyUser = (e: MouseEvent) => {
        e.preventDefault();
        if (generatedCode.toLowerCase() === verifyCode.toLowerCase()) {
            router.push("/reset/");
        } else {
            toast.toast({
                variant: "destructive",
                title: "Verification code doesn't match!",
                description: "Please try again",
            });
        }
    };


  return (
    <main className="max-w-[18rem] mt-4">
        <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
        <p className="mb-4">Please enter your email address to receive a link to reset your password:</p>
        <form>
            <label htmlFor="account-email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Account Email</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                   placeholder="Enter your email" id="account-email"
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
            />
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button onClick={()=>{openModal()}} data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Send Reset Link
            </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-3">
            Remember your password? please&nbsp;
            <Link className="text-blue-500 hover:underline" href="/login">
                sign in
            </Link>
        </p>
        <dialog id="my_modal_1" className="modal">
            <div className="modal-box bg-neutral-200">
                <form method="dialog" className="flex flex-row justify-between mt-2">
                    <div className="flex flex-col justify-between">
                        <h3 className="font-bold text-lg">Enter your verification code</h3>
                        <h3 className="text-sm">Password reset link has been sent to {email}</h3>
                    </div>
                    <button>❌</button>
                </form>

                <label htmlFor="verification-code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                <input onChange={(e) => {setVerifyCode(e.target.value)}} type="text" id="verification-code" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                <button onClick={verifyUser} className="btn hover:bg-gray-500 w-full mt-2">Verify</button>
            </div>
        </dialog>
    </main>
  )
}
export default ForgetPasswordPage
