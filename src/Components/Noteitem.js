import React, { useContext, } from 'react'
import notecontex from '../Context/Notes/notescontext';
function Noteitem(props) {
    const { note,updatenote ,showalert} = props;
    const context = useContext(notecontex);
    const { deletenote } = context;
    const handledelete = () => {
        deletenote(note._id);
        showalert("Deleted Successfully",'success')
    }
    
    return (
        <>
            <div className='col-md-3 my-2'>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}.</p>
                        <button type="button" onClick={handledelete} className="btn btn-sm btn-dark mx-1"><i className="fa-solid fa-trash"></i></button>
                        <button type="button" onClick={()=>{updatenote(note)}} className="btn btn-sm btn-dark mx-1"><i className="fa-solid fa-pen"></i></button>                      
                    </div>
                </div>
            </div>

        </>
    )
}

export default Noteitem