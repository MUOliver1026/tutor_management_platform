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
import { GET_TUTOR_PROFILE} from "@/graphql/queries";
import {UPDATE_TUTOR_PROFILE} from "@/graphql/mutations";
import {useParams, usePathname, useRouter} from "next/navigation";
import TimezonePicker from "@/components/TimezonePicker";
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
    experiencesummary: z.string().max(160).min(1),
    coursecanteach: z.string().max(160).min(1),
    // balance: z.number().min(0),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function TutorProfileUpdateForm() {
    const router = useRouter();
    const params = useParams();
    const toast = useToast();
    let currentPath = usePathname();

    const { loading, error, data } = useQuery(GET_TUTOR_PROFILE, {
        variables: { id: params?.userID },
    });

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        mode: "onChange",
        defaultValues: {
            email: data?.getTutorProfile?.email
        }
    })
    const profileId = data?.getTutorProfile?.id;

    const [updateTutorProfile,{data:studentData,loading:studentLoading,error:studentError}] = useMutation(UPDATE_TUTOR_PROFILE);

    currentPath =
        currentPath?.includes('/student') ? `/${params?.userID}/student` :
            currentPath?.includes('/tutor') ? `/${params?.userID}/tutor` :
                currentPath;

    const onSubmit = async (data: ProfileFormValues) => {
        const res = await updateTutorProfile({
            variables: {
                id: profileId,
                email: data.email,
                thumbnail: data.avatar,
                username: data.username,
                phone: data.phone,
                address: data.address,
                timeZone: data.timezone,
                professionalBio: data.bio,
                experienceSummary: data.experiencesummary,
                courseCanTeach: data.coursecanteach,
                accountBalance: "0",
            }
        })
        if (res.data?.updateTutorProfile?.email) {
            toast.toast({
                title: "Profile updated successfully!",
                description: "",
            })
            router.replace(`/${params?.userID}/tutor/profile/demo`)
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
                                        <AvatarImage src={data?.getTutorProfile?.thumbnail ? data?.getTutorProfile?.thumbnail : "/default-user.png"} alt="avatar" />
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
                                <Input placeholder={data && data.user?.username} {...field} />
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
                                    placeholder={data?.getTutorProfile?.email}
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
                                <Input placeholder={data && data.user?.phone} {...field} />
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
                            <FormLabel>Professional Bio</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder={data && data.user?.bio}
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
                <FormField
                    control={form.control}
                    name="experiencesummary"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Experience Summary</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder={data && data.user?.experienceSummary}
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                You can add your experience summary here.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="coursecanteach"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Course Can Teach</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder={data && data.user?.courseCanTeach}
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                You can add your course can teach here.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/*<div>*/}
                {/*    Balance: {data && data.user?.accountBalance ? data.user?.accountBalance : 0}*/}
                {/*</div>*/}

                <div className="flex space-x-4">
                    <Button type="submit">Update profile</Button>
                    <Button onClick={handleDashboardClick}>Back</Button>
                </div>

            </form>
        </Form>
    )
}