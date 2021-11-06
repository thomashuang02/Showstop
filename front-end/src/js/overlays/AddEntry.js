import Modal from 'react-bootstrap/Modal';
import './AddEntry.css';

const AddEntry = (props) => {
    const show = props.show, close = props.close;

    const handleAddEntry = (e) => {
        e.preventDefault();
        console.log("handling add entry");
        /* do stuff */
        close();
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
                            <input className="full-width" type="text" id="title" name="title"/>
                        </div>
                        <div id="box2">
                            <label htmlFor="genres">Genres</label><br/>
                            <input className="full-width" type="text" id="genres" name="genres"/>
                        </div>
                        <div id="box3">
                            <label htmlFor="status">Status<span className="red">*</span></label><br/>
                            <input className="full-width" type="text" id="status" name="status"/>
                        </div>
                        <div id="box4">
                            <label htmlFor="type">Type</label><br/>
                            <input className="full-width" type="text" id="type" name="type"/>
                        </div>
                        <div id="box5">
                            <label htmlFor="tags">Tags</label><br/>
                            <input className="full-width" type="text" id="tags" name="tags"/>
                        </div>
                        <div id="box6">
                            <label htmlFor="rating">Rating</label><br/>
                            <input className="full-width" type="text" id="rating" name="rating"/>
                        </div>
                        <div id="box7">
                            <label htmlFor="progress">Progress</label><br/>
                            <input className="full-width" type="text" id="progress" name="progress"/>
                        </div>
                        <div id="box8">
                            <label htmlFor="favorite">Favorite</label><br/>
                            <input className="full-width" type="text" id="favorite" name="favorite"/>
                        </div>
                        <div id="box9">
                            <label htmlFor="notes">Notes</label><br/>
                            <input className="full-width" type="text" id="notes" name="notes"/>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal-footer">
                <input className="button" id="confirm-add-entry-button" type="submit" value="Add Me"
                        />
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default AddEntry;