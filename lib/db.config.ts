import mongoose from "mongoose";

export const ConnectDB =async()=>{
    try {
        await mongoose.connect("mongodb+srv://thejuspm72:vWEd6wQOhmwpXZGf@cluster0.khxvrfy.mongodb.net/Project0?retryWrites=true&w=majority")
        console.log(`the db is connected with ${mongoose.connection.host}`);
    } catch (error) {
        mongoose.disconnect();
        process.exit(1)
        
    }
}