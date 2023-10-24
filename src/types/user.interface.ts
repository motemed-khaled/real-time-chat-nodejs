import { Document } from "mongoose";

export interface User{
    userName: string;
    email: string;
    password: string;
}
export interface UserDocument extends User, Document{
    validatePassword(value:string):Promise<boolean>;
 }