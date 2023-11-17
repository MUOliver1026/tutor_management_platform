import {FC} from "react";
import {useQuery} from "@apollo/client";
import {Get_Profile} from "@/graphql/queries";
import Image from "next/image";
import DefaultUserIcon from "@/public/default-user.png";
interface singleMsgProps {
    self: boolean,
    content: string,
    userId: string,
    createdAt: string,
}

const SingleMsg:FC<singleMsgProps> = ({self, content, userId, createdAt}) => {
    const createdTime = new Date(parseInt(createdAt));
    const dateString = createdTime.toLocaleString();
    const {data, loading, error} = useQuery(Get_Profile, {
        variables: {
            id: userId
        }
    });
    if (!self) {
        return (
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        {data?.getUserProfile?.thumbnail === null ? (
                            <Image src={DefaultUserIcon} alt={"default thumbnail"} width={30} height={30}/>
                        ) : (
                            <Image src={data?.getUserProfile?.thumbnail} alt={"thumbnail"} width={30} height={30}/>
                        )}
                    </div>
                </div>
                <div className="chat-header">
                    <span className="mr-2">{data?.getUserProfile?.username}</span>
                    <time className="text-xs opacity-50">{dateString}</time>
                </div>
                <div className="chat-bubble">{content}</div>
            </div>
        )
    } else {
        return (
            <div className="chat chat-end">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        {data?.getUserProfile?.thumbnail === null ? (
                            <Image src={DefaultUserIcon} alt={"default thumbnail"} width={30} height={30}/>
                        ) : (
                            <Image src={data?.getUserProfile?.thumbnail} alt={"thumbnail"} width={30} height={30}/>
                        )}
                    </div>
                </div>
                <div className="chat-header">
                    <time className="text-xs opacity-50">{dateString}</time>
                    <span className="ml-2">{data?.getUserProfile?.username}</span>
                </div>
                <div className="chat-bubble bg-green-800 text-gray-100">{content}</div>
            </div>
        )
    }
}

export default SingleMsg