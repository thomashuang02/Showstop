import {React, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import './AddEntry.css';
import {postEntry} from '../ListServices';

const AddEntry = (props) => {
    const show = props.show, close = props.close;
    const modifyList = props.modifyList, refreshList = props.refreshList;

    const [title, setTitle] = useState("");
    const onTitleChange = e => {
        setTitle(e.target.value);
    }
    const [genres, setGenres] = useState("");
    const onGenresChange = e => {
        setGenres(e.target.value);
    }

    const handleAddEntry = (e) => {
        console.log("handling add entry with data:", new FormData(e.target));
        e.preventDefault();
        /* do stuff */
        if(true) {
            close();
            refreshList();
        }
    }
    const preventSubmitOnEnter = (e) => {
        e.key === 'Enter' && e.preventDefault();
    }

    return (
        <Modal size="lg" show={show} onHide={()=>close()} >
            <form onSubmit={e=>handleAddEntry(e)}>
                <Modal.Header className="modal-header">
                    <Modal.Title>
                        <strong>Add Entry</strong>
                    </Modal.Title>
                    <input type="button" className="button" id="close-add-entry-button" onClick={()=>close()} value="&times;"/>
                </Modal.Header>
                <Modal.Body className="modal-body">
                    <div className="grid">
                        <div id="box1">
                            <label htmlFor="title">Title<span className="red">*</span></label><br/>
                            <input required className="full-width" type="text" id="title" name="title" 
                                onChange={e=>onTitleChange(e)} onKeyDown={e=>preventSubmitOnEnter(e)}/>
                        </div>
                        <div id="box2">
                            <label htmlFor="genres">Genres</label><br/>
                            <input className="full-width" type="text" id="genres" name="genres" 
                                onChange={e=>onGenresChange(e)} onKeyDown={e=>preventSubmitOnEnter(e)}/>
                        </div>
                        <div id="box3">
                            <label htmlFor="status">Status<span className="red">*</span></label><br/>
                            <input required className="full-width" type="text" id="status" name="status" onKeyDown={e=>preventSubmitOnEnter(e)}/>
                        </div>
                        <div id="box4">
                            <label htmlFor="type">Type</label><br/>
                            <input className="full-width" type="text" id="type" name="type" onKeyDown={e=>preventSubmitOnEnter(e)}/>
                        </div>
                        <div id="box5">
                            <label htmlFor="tags">Tags</label><br/>
                            <input className="full-width" type="text" id="tags" name="tags" onKeyDown={e=>preventSubmitOnEnter(e)}/>
                        </div>
                        <div id="box6">
                            <label htmlFor="rating">Rating</label><br/>
                            <input className="full-width" type="text" id="rating" name="rating" onKeyDown={e=>preventSubmitOnEnter(e)}/>
                        </div>
                        <div id="box7">
                            <label htmlFor="progress">Progress</label><br/>
                            <input className="full-width" type="text" id="progress" name="progress" onKeyDown={e=>preventSubmitOnEnter(e)}/>
                        </div>
                        <div id="box8">
                            <label htmlFor="favorite">Favorite</label><br/>
                            <input className="full-width" type="text" id="favorite" name="favorite" onKeyDown={e=>preventSubmitOnEnter(e)}/>
                        </div>
                        <div id="box9">
                            <label htmlFor="notes">Notes</label><br/>
                            <input className="full-width" type="text" id="notes" name="notes" onKeyDown={e=>preventSubmitOnEnter(e)}/>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-footer">
                <input className="button" id="confirm-add-entry-button" type="submit" value="Add Me"/>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default AddEntry;