import { cookies } from "next/headers";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "adedaniel",
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(request: Request, response: Response) {
  try {
    const token = cookies().get("token")?.value;

    const formData = await request.formData();
    const userId = formData.get("userId");
    const inputFile = formData.get("inputFile") as File;

    const arrayBuffer = await inputFile.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const base64 = Buffer.from(buffer).toString("base64");

    const result = await cloudinary.uploader.upload(
      `data:${inputFile.type};base64,${base64}`,
      {
        public_id: userId!.toString(),
        folder: "strapi-blog-users",
      }
    );

    // new Promise((resolve, reject) => {
    //   cloudinary.uploader
    //     .upload_stream(
    //       {
    //         public_id: userId!.toString(),
    //         folder: "strapi-blog-users",
    //       },
    //       (error, result) => {
    //         if (error) {
    //           reject(error);
    //         }
    //         resolve(result);
    //       }
    //     )
    //     .end(buffer);
    // });

    return Response.json(result as UploadApiResponse, {
      headers: {
        "Set-Cookie": `token=${token};`,
      },
    });
  } catch (error) {
    console.error("Error processing file:", error);
    return Response.json({ error: "Error processing file" }, { status: 500 });
  }
}
