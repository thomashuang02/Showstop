import {React, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import './AddEntry.css';
import {postEntry} from '../ListServices';

const AddEntry = (props) => {
    const show = props.show, close = props.close;
    const list = props.list, modifyList = props.modifyList, refreshList = props.refreshList;
    const darkMode = props.darkMode;

    const [ratingSliderValue, setRatingSliderValue] = useState((5).toFixed(1));
    const onRatingSliderChange = e => {
        setRatingSliderValue(parseFloat(e.target.value).toFixed(1));
    }

    const [title, setTitle] = useState("");
    const onTitleChange = e => {
        setTitle(e.target.value);
    }
    const [genres, setGenres] = useState("");
    const onGenresChange = e => {
        setGenres(e.target.value);
    }

    const handleAddEntry = async (e) => {
        e.preventDefault();
        const newEntry = {
            title: e.target.title.value,
            rating: e.target.rating.value,
            status: e.target.status.value,
            episodesCompleted: e.target.episodesCompleted.value,
            episodesTotal: e.target.episodesTotal.value,
            favorite: e.target.favorite.value ? true : false,
            type: e.target.type.value,
            genres: e.target.genres.value,
            tags: e.target.tags.value,
            notes: e.target.notes.value,
        }
        try {
            const response = await postEntry(newEntry);
            modifyList([response.data, ...list]);
            close();
            refreshList();
        } catch (err) {
            console.log(err);
        }
    }
    const preventSubmitOnEnter = (e) => {
        e.key === 'Enter' && e.preventDefault();
    }

    return (
        <Modal size="lg" show={show} onHide={()=>close()} >
            <form id="add-entry-form" onSubmit={e=>handleAddEntry(e)} autocomplete="off">
                <Modal.Header className={darkMode ? "dark-mode" : null}>
                    <Modal.Title>
                        <strong>Add Entry</strong>
                    </Modal.Title>
                    <input type="button" className="button" id="close-add-entry-button" onClick={()=>close()} value="&times;"/>
                </Modal.Header>
                <Modal.Body className={darkMode ? "dark-mode" : null}>
                    <div className="grid">
                        <div id="box1">
                            <label htmlFor="title">Title<span className="red">*</span></label><br/>
                            <input required className="full-width" type="text" id="title" name="title" 
                                value={title} onChange={e=>onTitleChange(e)} onKeyDown={e=>preventSubmitOnEnter(e)}/>
                        </div>
                        <div id="box2">
                            <label htmlFor="genres">Genres</label><br/>
                            <input className="full-width" type="text" id="genres" name="genres" 
                                placeholder="Separated, by, commas"
                                value={genres} onChange={e=>onGenresChange(e)} onKeyDown={e=>preventSubmitOnEnter(e)}/>
                        </div>
                        <div id="box3">
                            <label htmlFor="status">Status<span className="red">*</span></label><br/>
                            <select required className="full-width" id="status" name="status">
                                <option value="" disabled selected>Select...</option>
                                <option value="Watching">Watching</option>
                                <option value="Completed">Completed</option>
                                <option value="On Hold">On Hold</option>
                                <option value="Dropped">Dropped</option>
                                <option value="Plan to Watch">Plan to Watch</option>
                            </select>
                        </div>
                        <div id="box4">
                            <label htmlFor="type">Type</label><br/>
                            <select className="full-width" id="type" name="type">
                                <option default value="Watching">TV</option>
                                <option value="Completed">Film</option>
                                <option value="Completed">Other</option>
                            </select>
                        </div>
                        <div id="box5">
                            <label htmlFor="tags">Tags</label><br/>
                            <input className="full-width" placeholder="Separated, by, commas"
                                type="text" id="tags" name="tags" onKeyDown={e=>preventSubmitOnEnter(e)}/>
                        </div>
                        <div id="box6">
                            <label htmlFor="rating">Rating:<span id="rating-value"
                                className={ratingSliderValue<3.5 ? "low-rating" : (ratingSliderValue<8.0 ? "mid-rating" : "high-rating")}>
                                {ratingSliderValue}</span></label><br/>
                            <input className="full-width" type="range" id="rating" name="rating" min="0.0" max="10.0" step="0.5"
                                value={ratingSliderValue} onChange={e=>onRatingSliderChange(e)}
                            />
                        </div>
                        <div id="box7">
                            <label htmlFor="progress">Progress</label><br/>
                            <input className="progress-input" type="number" min="0" id="progress" name="episodesCompleted"/>&nbsp;/&nbsp;
                            <input className="progress-input" type="number" min="0" id="progress" name="episodesTotal"/>
                        </div>
                        <div id="box8">
                            <label htmlFor="favorite">Favorite?</label>&nbsp;&nbsp;
                            <input type="checkbox" id="favorite" name="favorite" value="checked" onKeyDown={e=>preventSubmitOnEnter(e)}/>
                        </div>
                        <div id="box9">
                            <label htmlFor="notes">Notes</label><br/>
                            <textarea className="full-width" rows="4" id="notes" name="notes" onKeyDown={e=>preventSubmitOnEnter(e)}/>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className={darkMode ? "dark-mode" : null}>
                <input className="button" id="confirm-add-entry-button" type="submit" value="Add Me"/>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default AddEntry;