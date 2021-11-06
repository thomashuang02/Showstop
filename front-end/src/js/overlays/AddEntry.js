import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton'
import './AddEntry.css';

const AddEntry = (props) => {
    const show = props.show, close = props.close;
    return (
        <Modal show={show} onHide={()=>close()} >
            <Modal.Header className="modal-header">
                <Modal.Title>
                    <strong>Add Entry</strong>
                </Modal.Title>
                <input type="button" className="button" id="close-add-entry-button" onClick={()=>close()} value="&times;"/>
            </Modal.Header>
            <Modal.Body className="modal-body">
                Kapow
            </Modal.Body>
            <Modal.Footer className="modal-footer">
            <input className="button" id="confirm-add-entry-button" type="button" value="Add Me"
                    />
            </Modal.Footer>
        </Modal>
    );
}

export default AddEntry;