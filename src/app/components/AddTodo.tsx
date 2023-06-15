"use client"
import { newTodo } from "@/lib/drizzle"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"  
const AddTodo =()=>{
    const [task,setTask]=useState<newTodo | null>(null)
    const {refresh}=useRouter()
    const handleSubmit =async()=>{
        try{
            if(task){
                const res=await fetch("/api/todo",{
                    method:"POST",
                    body: JSON.stringify({
                        task:task.task
                    })
                })
                console.log(res.ok)
                refresh();
                // setTask({task:""});
            }
        }catch(err){
            console.log("error")
        }
    }
    return(
        <div >
            <form className="w-full flex gap-x-3">
                <input 
                onChange={(e)=>setTask({task:e.target.value})}
                type="text" className="rounded-full w-full py-3.5 px-5 border focus:outline-secondary" />
                <button 
                onClick={handleSubmit}
                className="bg-secondary p-4 shrink-0 rounded-full bg-gradient-to-tr from-primary ring-offset-secondary">
                    <Image src={"/Vector.png"} alt="vector" width={20} height={20}/>
                </button>
            </form>
        </div>
    )
}
export default AddTodo