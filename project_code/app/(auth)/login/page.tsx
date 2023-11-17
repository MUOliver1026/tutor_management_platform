import SignInForm from "@/components/form/SignInForm"
import Link from "next/link";
const page = () => {
  return (
    <section className="max-w-[18rem] mt-4">
        <SignInForm />
        <p className="mt-4 text-center">
            <Link href="/forget" className="text-blue-500 hover:underline">Forget your password?</Link>
        </p>
    </section>
  )
}

export default page
