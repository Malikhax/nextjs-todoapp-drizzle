import { NextRequest, NextResponse } from "next/server";
import {db,todoTable} from "@/lib/drizzle"
import { sql } from "@vercel/postgres";

export async function GET(request:NextRequest){

    try{
        await sql`CREATE TABLE IF NOT EXISTS Todos (id serial, task varchar(255));`
        const res= await db.select().from(todoTable);
        console.log(res)
        return NextResponse.json({data:res})
    }catch(err){
        console.log((err as {message:string}).message)
        return NextResponse.json({message:"something went wrong"})
    }
}
export async function POST(request:NextRequest){
    const req=await request.json();
    try{
        if(req.task){
            const res=await db.insert(todoTable).values({
                task:req.task,
            }).returning();
            console.log(res)
            return NextResponse.json({message:"Data added successfully",Data:req.task})
        }else{
            throw new Error ("Task field is required")
        }
    }catch(error){
        return NextResponse.json({message:(error as {message:String}).message})
    }
    // return NextResponse.json({message:"you call this api POST"})
}
export async function DELETE(request:NextRequest) {
    const req=await request.json();
    try{
        if(req.id){
            await sql`DELETE FROM todos WHERE id = '${req.id}'`;
                return NextResponse.json({
                    message:"Data Deleted successfully"
                });
        }else{
            throw new Error("ID fieldis required")
        }
    }catch(error){
        return NextResponse.json({message:(error as {message:string}).message})
    }
}