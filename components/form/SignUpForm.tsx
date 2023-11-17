"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {ADD_IDENTITY, ADD_Student, ADD_Tutor} from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation"
import { useContextValue } from "@/components/providers/context"
import {useState} from "react";

const FormSchema = z
  .object({
    username: z
      .string()
      .min(1, "Username is required")
      .max(20, "Username must be less than 20 characters"),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
    identity: z.enum(["student", "tutor",""]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const SignUpForm = () => {
    const { getters,setters } = useContextValue();
    const [addStudent, {data:studentData,loading:studentLoading,error:studentError}] = useMutation(ADD_Student);
    const [addTutor, {data:tutorData,loading:tutorLoading,error:tutorError}] = useMutation(ADD_Tutor);
    const [addIdentity, { data: identityData, loading: identityLoading, error: identityError }] = useMutation(ADD_IDENTITY);
    const router = useRouter();
    const [btnClicked, setBtnClicked] = useState(false);
    const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      identity: "",
    },
  });


  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
      setBtnClicked(true);
      let userIdentity = "";
      if (values.identity === "student") {
          userIdentity = "Student";
      } else if (values.identity === "tutor") {
          userIdentity = "Tutor";
      }

      if (studentLoading || tutorLoading) {
          return <span className="loading loading-bars loading-lg"></span>
      }
      if (values.identity === "student") {
          const res = await addStudent({
              variables: {
                  name: values.username,
                  email: values.email,
                  password: values.password,
              },
          });
          if (res?.data?.addStudent?.id) {
              const userId = res.data?.addStudent?.id;
              setters.setEmail(values.email);
              setters.setName(values.username);
              setters.setIdentity(values.identity);
              setters.setUserID(userId);
              setters.setUserStatus(true);
              router.replace(`${userId}/student/dashboard/`)
          } else {
              console.log(res);
              setBtnClicked(false);
          }
      } else {
          const res = await addTutor({
              variables: {
                  name: values.username,
                  email: values.email,
                  password: values.password,
              },
          });
          if (res?.data?.addTutor?.id) {
              const userId = res.data?.addTutor?.id;
              setters.setEmail(values.email);
              setters.setName(values.username);
              setters.setIdentity(values.identity);
              setters.setUserID(userId);
              setters.setUserStatus(true);
              router.replace(`${userId}/tutor/dashboard/`)
          } else {
              console.log(res);
              setBtnClicked(false);
          }
      }

      const res2 = await addIdentity({
          variables: {
              email: values.email,
              userType: userIdentity,
          },
      });
  };
  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="haydensmith" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="mail@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Re-Enter your Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Re-Enter your Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="identity"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Your Identity</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex justify-between"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="student" />
                        </FormControl>
                        <FormLabel className="font-normal">Student</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="tutor" />
                        </FormControl>
                        <FormLabel className="font-normal">Tutor</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full mt-6" type="submit" disabled={btnClicked}>
            Sign up
          </Button>
        </form>
      <div
        className="mx-auto my-4 flex w-full items-center justify-evenly 
            before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 
            after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400"
      >
        or
      </div>
      <p className="text-center text-sm text-gray-600 mt-2">
        If you have an account, please&nbsp;
        <Link className="text-blue-500 hover:underline" href="/login">
          Sign in
        </Link>
      </p>
    </Form>
  );
};

export default SignUpForm;
