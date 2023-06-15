// import { Todo } from "@/lib/drizzle";
// const getData = async () => {
//     try{
//         const res=await fetch("http://localhost:3000/api/todo",{
//             method:"GET",
//             headers:{
//                 "content-type":"application/json",
//                 "Cache-Control": "no-cache, no-store, must-revalidate",
//                 "Pragma": "no-cache",
//                 "Expires": "0"
//             }
//         });
//         if(!res){
//             throw new Error("Failed to fetch the data")
//         };
//         const result=await res.json();
//         return result;
//     }catch(err){
//         console.log(err)
//         return null
//     }
// }

// const TodoList = async ()=>{
//     const res:{data:Todo[]}=await getData();
//     console.log(res)
//     return(
//         <>
//         <div className="max-h-[300px] overflow-auto mb-4">
//         {
//             res.data.map((item)=>{
//                 return(
//                     <div className="bg-gray-100 py-4 px-4 flex items-center gap-x-3 shadow rounded-lg my-3">
//                         {/* Circle */}
//                         <div className="h-3 w-3 bg-secondary rounded-full"></div>
//                         {/* Task Title*/}
//                         <p className="text-lg font-medium">{item.task}</p>
//                     </div>
//                 )
//             })

//         }
//         </div>
//         </>
//     )
// }
// export default TodoList
"use client";
import { useEffect, useState } from "react";
import { Todo } from "@/lib/drizzle";
import Image from "next/image"
const TodoList = () => {
  const [data, setData] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/todo", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch the data");
        }

        const result = await res.json();
        setData(result.data);
      } catch (err) {
        console.log(err);
        setData([]);
      }
    };

    fetchData();
  }, []);
  const deleteData =async ()=>{
    const res= await fetch("/api/todo",{
        method:"DELETE"
    })
  }
  return (
    <div className="max-h-[300px] overflow-auto mb-4">
      {data.map((item) => (
        <div>
          <div
            key={item.id}
            className="bg-gray-100 py-4 px-4 flex items-center gap-x-3 shadow rounded-lg my-3"
          >
            {/* Circle */}
            <div className="h-3 w-3 bg-secondary rounded-full"></div>
            {/* Task Title*/}
            <p className="text-lg font-medium">{item.task}</p>
            <button
            className="ml-auto"
            onClick={deleteData}
            >
                <Image src={"/delete.png"} alt="img" width={20} height={20}/>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
