import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    image_url:{
        type :String,
        required:true
    },
    public_id:{
        type:String,
        required:true
    }
},{timestamps:true})

export const ImageGalleryModel=mongoose.models.image || mongoose.model("image",Schema);

 