"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {useMutation, useQuery} from "@apollo/client";
import {UPDATE_STUDENT_PROFILE} from "@/graphql/mutations";
import {useParams, usePathname, useRouter} from "next/navigation";
import TimezonePicker from "@/components/TimezonePicker";
import {GET_STUDENT_PROFILE} from "@/graphql/queries";
import FileUpload from "@/components/fileUpload";
import {useToast} from "@/components/ui/use-toast";

const profileFormSchema = z.object({
    avatar: z.string().optional(),
    username: z
        .string()
        .min(2, {
            message: "Username must be at least 2 characters.",
        })
        .max(30, {
            message: "Username must not be longer than 30 characters.",
        }),
    email: z
        .string({
            required_error: "Please select an email to display.",
        })
        .email().optional(),
    phone: z.string()
        .min(8)
        .max(15)
        .refine(value => /^\+?\d+(\s\d+)?$/.test(value), {
            message: "Invalid phone number format. (e.g. +1 1234567890)",
        }),
    address: z.string()
        .min(5)
        .max(255)
        .refine(value => /^[a-zA-Z0-9\s\-,]+$/u.test(value), {
            message: "Invalid address format.",
        }),
    timezone: z.string().min(1).max(255).default("UTC+10:00 Australian Eastern Standard Time"),
    bio: z.string().max(160).min(1),
    // balance: z.number().min(0),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function StudentProfileUpdateForm() {
    const router = useRouter();
    const params = useParams();
    const toast = useToast();
    let currentPath = usePathname();

    const { loading: ProfileLoading, error: ProfileError, data: ProfileData } = useQuery(GET_STUDENT_PROFILE, {
        variables: { id: params?.userID },
    });

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        mode: "onChange",
        defaultValues: {
            email: ProfileData?.getStudentProfile?.email
        }
    })

    const profileId = ProfileData?.getStudentProfile?.id;
    const [updateStudentProfile,{data:studentData,loading:studentLoading,error:studentError}] = useMutation(UPDATE_STUDENT_PROFILE);

    currentPath =
        currentPath?.includes('/student') ? `/${params?.userID}/student` :
            currentPath?.includes('/tutor') ? `/${params?.userID}/tutor` :
                currentPath;

    const onSubmit = async (value: ProfileFormValues) => {
        const res = await updateStudentProfile({
            variables: {
                id: profileId,
                email: ProfileData?.getStudentProfile?.email,
                thumbnail: value.avatar,
                username: value.username,
                phone: value.phone,
                address: value.address,
                timeZone: value.timezone,
                biography: value.bio,
            }
        })
        if (res.data?.updateStudentProfile?.email) {
            toast.toast({
                title: "Profile updated successfully!",
                description: "",
            })
            router.replace(`/${params?.userID}/student/profile/demo`)
        } else {
            console.log(res);
        }
    }

    const handleDashboardClick = () => {
        router.push(currentPath + '/profile/demo');
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="avatar"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Avatar</FormLabel>
                            <FormControl>
                                <div>
                                    <Avatar>
                                        <AvatarImage src={ProfileData?.getStudentProfile?.thumbnail || "/default-user.png"} alt="avatar" />
                                        <AvatarFallback>Avatar</AvatarFallback>
                                    </Avatar>
                                    <FileUpload endpoint={"profileImage"} value={field.value || ""} onChange={field.onChange}/>
                                </div>
                            </FormControl>
                            <FormDescription>
                                This is your avatar. It can be uploaded as a type of image.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name. It can be your real name or a
                                pseudonym.
                            </FormDescription>
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
                                    disabled
                                    placeholder={ProfileData?.getStudentProfile?.email}
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                You cannot have the access change your email.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your phone number. It should all be numbers.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your address.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="timezone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Time Zone</FormLabel>
                            <FormControl>
                                <div className="select-wrapper" {...field}>
                                    <TimezonePicker />
                                </div>
                            </FormControl>
                            <FormDescription>
                                You can pick your timezone in your area.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                You can <span>@mention</span> other users and organizations to
                                link to them.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex space-x-4">
                    <Button type="submit">Update profile</Button>
                    <Button onClick={handleDashboardClick}>Back</Button>
                </div>

            </form>
        </Form>
    )
}