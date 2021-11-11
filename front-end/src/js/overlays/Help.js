import {React} from 'react';
import Modal from 'react-bootstrap/Modal';
import '../../css/EntryOverlay.css';

const Help = (props) => {
    const show = props.show, close = props.close;
    const darkMode = props.darkMode;

    return (
        <Modal size="lg" show={show} onHide={()=>close()} >
                <Modal.Header className={darkMode ? "dark-mode" : null}>
                    <Modal.Title>
                        <strong>What am I doing here?</strong>
                    </Modal.Title>
                    <input type="button" className="button" id="close-overlay-button" onClick={()=>close()} value="&times;"/>
                </Modal.Header>
                <Modal.Body className={darkMode ? "dark-mode" : null}>
                    <h5><strong>Adding entries</strong></h5>
                    <p>
                        If only there was a button labeled "Add Entry" located conveniently on the toolbar...
                    </p>
                    <hr/>
                    <h5><strong>Editing and deleting entries</strong></h5>
                    <p>
                        Click on an entry's title to view and edit its details. Entries can be deleted from the same menu.
                    </p>
                    <p>
                        For shows in progress, you can also quick-increment your episodes watched by clicking the plus button under the Progress column of your list.
                    </p>
                    <hr/>
                    <h5><strong>Sorting and searching</strong></h5>
                    <p>
                        From the toolbar, you can filter your list by watching status from a dropdown menu, or search based on title from the search bar.
                    </p>
                    <p>
                    You can also sort your list based on Title, Rating, Status, or Progress by clicking on their corresponding headers; clicking again will reverse the order.
                    </p>
                    <hr/>
                    <h5><strong>Dark/Light Mode</strong></h5>
                    <p>
                        Toggleable at the top right, next to the sign-out button.
                    </p>
                </Modal.Body>
        </Modal>
    );
}

export default Help;