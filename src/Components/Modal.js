import React, { useContext, useRef } from 'react'
import notecontex from '../Context/Notes/notescontext';

function Modal(props) {
    const { a } = props;
    const context=useContext(notecontex);
    const {editnote,objnote}=context;
    const refclose=useRef(null);
    const handleedit=()=>{
        const a=document.getElementById('titlem').value;
        const b=document.getElementById('descm').value;
        const c=document.getElementById('tagm').value;
        editnote(objnote._id,a,b,c);
        refclose.current.click();
        props.showalert("Updated Successfully",'success');
    }
    
    return (
        <>
            <button style={{ visibility: 'hidden' }} ref={a} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="mb-3">
                                <label htmlFor="titlem" className="form-label">Title</label>
                                <input type="text" placeholder='New Title' className="form-control" id="titlem" aria-describedby="emailHelp" />
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                    <label htmlFor="descm" className="form-label">Description</label>
                                    <input type="text" placeholder='New Description' className="form-control" id="descm" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tagm" className="form-label">Tag</label>
                                <input type="text" placeholder='New Tag' className="form-control" id="tagm"/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refclose} className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" onClick={handleedit} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal