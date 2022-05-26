import React from 'react'
import notecontex from '../Context/Notes/notescontext'
import { useContext ,useState } from 'react';

export default function Addnote(props) {
    const context = useContext(notecontex);
    const [check,setcheck]=useState(false);
  // eslint-disable-next-line
  const { addnote}=context;
  const handleclick=()=>{
      const a=document.getElementById('title');
      const b=document.getElementById('desc');
      const c=document.getElementById('tag');
      if( b.value.length>4 && c.value.length>4)
      {
        addnote(a.value,b.value,c.value);
        props.showalert("Successfully Added the note",'success');
        a.value=b.value=c.value='';
      }
      else
      {
        setcheck(true);
        setTimeout(() => {
         setcheck(false);
        }, 2000);
      }
  }
  return (
    <div>
        <div className="container my-3">
        <h2>Add a note</h2>
        <form>
            <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
            <label htmlFor="desc" className="form-label">Description</label>
            <input type="text" className="form-control" id="desc"/>
            </div>
            <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag"/>
            </div>
            <button type="button" onClick={handleclick } className="btn btn-primary">Add</button>
            <div className="container" style={{color:'red',textSize:'small',height:'20px'}}>
            {check && <div className="container">
              Please add sufficient length for credentials (min: 5)
            </div>}
            </div>
        </form>
        </div>
    </div>
  )
}
