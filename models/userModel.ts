import { Schema, model, Document } from "mongoose";

const userSchema: Schema = new Schema({
    name: String,
});

interface iUser extends Document{
    name: String;
};

export default model<iUser>('User', userSchema);