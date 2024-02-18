import { ConnectDB } from "@/lib/db.config";
import { ImageGalleryModel } from "@/lib/image-model.model";
import { DeleteImage, uploadImage } from "@/lib/upload-image";
import { NextResponse,NextRequest } from "next/server";

ConnectDB();
export const DELETE =async(req:NextRequest,ctx:{params:{id:string}})=>{
    const imagepublicId =`nextjs-image-gallery/`+ ctx.params.id
    const result_delete=await DeleteImage(imagepublicId);

    await ImageGalleryModel.findOneAndDelete({
        public_id:imagepublicId,
    });
    return NextResponse.json({msg:result_delete},{
        status:200
    })
}
