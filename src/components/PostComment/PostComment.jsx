import React from 'react'
import Updatecomment from './../Updatecomment/Updatecomment';
import DeleteComment from '../DeleteComment/DeleteComment';

export default function ({comment}) {
    if (!comment) {
    return <p className="text-slate-800">Loading comment...</p>;
  }



  let{commentCreator , createdAt , content, _id } = comment;

  console.log(comment);
  
  return (
  <div>
    <div className="w-full my-2 flex flex-col rounded-md border-2 border-slate-300 bg-slate-500 text-white">
     <div className="flex  justify-between items-center" >
      <div className="flex gap-2 items-center">
        <img src={commentCreator.photo} className="size-[40px]" alt="" />
        <p>{commentCreator.name}</p>
      </div>
      <span className="text-slate-300 text-sm">{createdAt}</span>
     </div>
     <div className="content px-12">
     comment : {content}</div>
       <div className="my-3 w-full bg-slate-800 border-lg p-4 flex flex-col gap-3">
      <button className="bg-red-600 p-3 rounded-md cursor-pointer  ">
        <Updatecomment id={_id} />
        </button>
      <button className="bg-blue-600 p-3 rounded-md cursor-pointer ">
        <DeleteComment id={_id}  />
        </button>
     </div>
    </div>
   
  </div>
    
  )
}
