"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {DialogClose} from "@radix-ui/react-dialog";
import { Label } from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import { ADD_Application } from "@/graphql/mutations";
import {GET_COURSE, GET_TUTOR} from "@/graphql/queries";
import {useParams} from "next/navigation";

const TutorApplyModal = () => {
    const params = useParams()
    const courseData = useQuery(GET_COURSE, { variables: { id: params?.id }});
    const {data: tutorData, loading: tutorLoading, error: tutorError} = useQuery(GET_TUTOR, { variables: { id: params?.userID }});
    const { toast } = useToast();
    const [msg, setMsg] = useState("")
    const startTime = 8;
    const endTime = 21;
    const timeArray: number[] = Array.from({ length: endTime - startTime + 1 }, (_, index) => startTime + index);
    const [startAvail, setStartAvail] = useState("start time");
    const [endAvail, setEndAvail] = useState("end time");
    const [addApplication, {loading, error, data}] = useMutation(ADD_Application)
    const submitApplication = async () => {
        const applicationRes = await addApplication({
            variables:{
                tutorId: params?.userID,
                name:tutorData?.getTutor?.name,
                email:tutorData?.getTutor?.email,
                courseId: params?.id,
                courseName:courseData?.data?.course?.name,
                description:msg,
                startTime: startAvail,
                endTime: endAvail,
            }
        })
        toast({
            title: "Application submitted",
            description: "Friday, February 10, 2023 at 5:57 PM",
        })
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <button type="button" className="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                    Apply as a Tutor
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Application</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex flex-row justify-evenly items-center gap-2">
                        <span>From</span>
                        <Select onValueChange={setStartAvail}>
                            <SelectTrigger>
                                <SelectValue placeholder="start time" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Start time</SelectLabel>
                                    {timeArray.map((time) => (
                                        <SelectItem key={time} value={`${time.toString()}:00`}>{time}:00</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <span>To</span>
                        <Select onValueChange={setEndAvail}>
                            <SelectTrigger>
                                <SelectValue placeholder="end time" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>End time</SelectLabel>
                                    {timeArray.map((time) => (
                                        <SelectItem key={time} value={`${time.toString()}:00`}>{time}:00</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <Label htmlFor="reason" className="pl-1">
                        Explain the reasons to apply this role
                    </Label>
                    <Textarea id="reason" className="" onChange={(e) => {setMsg(e.target.value)}} placeholder="Type your message here." />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="submit" onClick={submitApplication}>Send Application</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default TutorApplyModal;
