import { ConnectDB } from "@/lib/db.config";
import { ImageGalleryModel } from "@/lib/image-model.model";
import { uploadImage } from "@/lib/upload-image";
import { NextResponse,NextRequest } from "next/server";

ConnectDB();
export const GET =async(req:NextRequest)=>{
    const Images= await ImageGalleryModel.find({});
    return NextResponse.json({images:Images,total:Images.length},{
        status:200
    })
}
export const POST= async(req:NextRequest)=>{
    const formData=await req.formData();
    const image=formData.get("image") as unknown as File;
    const data:any= await uploadImage(image,"nextjs-image-gallery")
    await ImageGalleryModel.create({
        image_url:data?.secure_url,
        public_id:data?.public_id,
    })
    console.log({image})
    return NextResponse.json({msg:data},{
        status:200
    })

}