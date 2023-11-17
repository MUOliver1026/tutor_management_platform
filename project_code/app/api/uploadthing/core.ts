import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();
const auth = (req: Request) => {
    return { id: "fakeid" }
}; // Fake auth function

const fileHandler = f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
        // This code runs on your server before upload
        const user = auth(req);
        // If you throw, the user will not be able to upload
        if (!user) throw new Error("Unauthorized");
        // Whatever is returned here is accessible in onUploadComplete as `metadata`
        return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
        // This code RUNS ON YOUR SERVER after upload
        console.log("Upload complete for userId:", metadata.userId);

        console.log("file url", file.url);

        // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
        return { uploadedBy: metadata.userId, fileUrl: file.url };
})

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    profileImage: fileHandler,
    courseThumbnail: fileHandler
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;