import {NextApiRequest} from "next";
import { prisma } from "@/prisma/db";
const handler = async (req:NextApiRequest, res: any) => {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed"})
    }
    try {
        const { content } = req.body;
        const { conversationId } = req.query;
        if (!conversationId) {
            return res.status(400).json({message: "missing channel ID"})
        }
        if (!content) {
            return res.status(400).json({message: "missing content"})
        }
        //TODO use prisma to find channel
        const conversation = await prisma.course.findFirst({

        })

        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found"})
        }
    } catch (error) {
        console.log("[MESSAGES_POST]");
        return res.status(500).json({ message: "internal error"})
    }
}

export default handler