"use client"
import {FC} from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
interface fileUploadProps {
    onChange: (url?: string) => void,
    value: string;
    endpoint: "profileImage" | "courseThumbnail"
}
const FileUpload:FC<fileUploadProps> = ({
    onChange,
    value,
    endpoint
}) => {

    const fileType = value?.split(".").pop();
    if (value) {
        return (
            <Image src={value.toString()} alt={"upload"} className="rounded-full" width={100} height={100}/>
        )
    }
    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].fileUrl);
            }}
            onUploadError={(error: Error) => {
                console.log(error);
            }}
        />
    )
}

export default FileUpload
