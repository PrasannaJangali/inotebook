import React from 'react'
import notecontex from '../Context/Notes/notescontext'
import { useContext, useRef ,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import Modal from './Modal';
function Notes(props) {
  const context = useContext(notecontex);
  const Navigate = useNavigate();
  // eslint-disable-next-line
  const { notes,setobjnote,fetchnote } = context;
  const ref = useRef(null)
  const refclose = useRef(null)
  const updatenote =(note) => {
    setobjnote(note);
    ref.current.click();
  }
   useEffect(() => {
     if(localStorage.getItem('token'))
     {
       fetchnote(localStorage.getItem('token'));
     }
     else{
       Navigate('/login');
     }
   }, [])
  return (
    <>
      <Addnote showalert={props.showalert} />
      <Modal a={ref} showalert={props.showalert} b={refclose}/>
      <div className="row">
        <h2>Your notes</h2>
        {
          notes.map((e) => {
            return <Noteitem key={e._id} showalert={props.showalert} updatenote={updatenote} note={e} />
          })
        }
      </div>
    </>
  )
}

export default Notes