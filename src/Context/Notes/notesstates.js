import Notecontext from "./notescontext";
import { useState} from "react";
const Notestate=(props)=>{
  const a='http://localhost:5000/api';
    const notesinitial=[];
      const [notes, setnotes] = useState(notesinitial);
      const [objnote,setobjnote]=useState(null);
      //Fetch note
      const fetchnote=async()=>{
        const response = await fetch(`${a}/notes/fetchuserdata`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          }
        });
        const json=await response.json();
        setnotes(json);
      }
      
      //Add note 
      const addnote=async(title,description,tag)=>{
        //API call
        console.log(localStorage.getItem('token'));
        const response = await fetch(`${a}/notes/addnotes`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
         body: JSON.stringify({title:title,description:description,tag:tag}) 
        });
        const obj=await response.json();
        let d=notes;
        setnotes(d.concat(obj));
      }


      //delete note
      const deletenote=async(id)=>{
      //API call
      const response = await fetch(`${a}/notes/deletenote/${id}`, {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      const newnotes=notes.filter((e)=>e._id!==id);
      setnotes(newnotes);
      }


      //edit note
      const editnote=async(id,title,description,tag)=>{
      //API call 
      const response = await fetch(`${a}/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
       body: JSON.stringify({title,description,tag}) 
      });
      let d=notes;
      d.forEach(e => {
        if(e._id===id){
         e.title=title;
         e.tag=tag;
         e.description=description;
        }
      });
      setnotes(d);
      }

    
    return(
        <Notecontext.Provider value={{objnote,setobjnote,notes,fetchnote,addnote,deletenote,editnote}}>
            {props.children}
        </Notecontext.Provider>
    )
}
export default Notestate;