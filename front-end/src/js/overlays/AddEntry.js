import {React, useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import '../../css/EntryOverlay.css';
import {postEntry} from '../ListServices';

const AddEntry = (props) => {
    const show = props.show, close = props.close;
    const list = props.list, modifyList = props.modifyList;
    const darkMode = props.darkMode;

    const [title, setTitle] = useState("");
    const onTitleChange = e => {
        setTitle(e.target.value);
    }
    const [ratingSliderValue, setRatingSliderValue] = useState("");
    const onRatingSliderChange = e => {
        setRatingSliderValue(parseFloat(e.target.value).toFixed(1));
    }
    const [status, setStatus] = useState("");
    const onStatusChange = e => {
        setStatus(e.target.value);
    }
    const [episodesCompleted, setEpisodesCompleted] = useState("");
    const onEpisodesCompletedChange = e => {
        setEpisodesCompleted(e.target.value);
    }
    const [episodesTotal, setEpisodesTotal] = useState("");
    const onEpisodesTotalChange = e => {
        setEpisodesTotal(e.target.value);
    }
    const [favorite, setFavorite] = useState(false);
    const onFavoriteChange = () => {
        setFavorite(!favorite); //toggle
    }
    const [type, setType] = useState("TV");
    const onTypeChange = e => {
        setType(e.target.value);
    }
    const [genres, setGenres] = useState("");
    const onGenresChange = e => {
        setGenres(e.target.value);
    }
    const [tags, setTags] = useState("");
    const onTagsChange = e => {
        setTags(e.target.value);
    }
    const [notes, setNotes] = useState("");
    const onNotesChange = e => {
        setNotes(e.target.value);
    }

    const handleClose = () => {
        close();
    }

    const resetAdd = () => {
        setTitle("");
        setRatingSliderValue("");
        setStatus("");
        setEpisodesCompleted("");
        setEpisodesTotal("");
        setFavorite(false);
        setType("TV");
        setGenres("");
        setTags("");
        setNotes("");
    };

    useEffect(() => {
        if(show) {
            resetAdd();
        }
    }, [show]);

    const handleAddEntry = async (e) => {
        e.preventDefault();
        const newEntry = {
            title: title, //required
            rating: ratingSliderValue !== "" ? ratingSliderValue : null,
            status: status, //required
            episodesCompleted: episodesCompleted !== "" ? episodesCompleted : null,
            episodesTotal: episodesTotal !== "" ? episodesTotal : null,
            favorite: favorite,
            type: type,
            genres: genres,
            tags: tags,
            notes: notes !== "" ? notes : null,
        }
        try {
            const response = await postEntry(newEntry);
            handleClose();
            modifyList(Array.isArray(response.data) ? response.data : list);
        } catch (err) {
            console.log(err);
        }
    }
    const preventSubmitOnEnter = (e) => {
        e.key === 'Enter' && e.preventDefault();
    }

    return (
        <Modal size="lg" show={show} onHide={()=>handleClose()} >
            <form id="add-entry-form" onSubmit={e=>handleAddEntry(e)} autoComplete="off">
                <Modal.Header className={darkMode ? "dark-mode" : null}>
                    <Modal.Title>
                        <strong>Add Entry</strong>
                    </Modal.Title>
                    <input type="button" className="button" id="close-overlay-button" onClick={()=>close()} value="&times;"/>
                </Modal.Header>
                <Modal.Body className={darkMode ? "dark-mode" : null}>
                    <div className="grid">
                        <div id="box1">
                            <label htmlFor="title">Title<span className="red">*</span></label><br/>
                            <input required className="full-width" type="text" id="title" name="title" 
                                onChange={e=>onTitleChange(e)} onKeyDown={e=>preventSubmitOnEnter(e)}/>
                        </div>
                        <div id="box2">
                            <label htmlFor="genres">Genres</label><br/>
                            <input className="full-width" type="text" id="genres" name="genres" 
                                placeholder="Separated, by, commas"
                                onChange={e=>onGenresChange(e)} onKeyDown={e=>preventSubmitOnEnter(e)}/>
                        </div>
                        <div id="box3">
                            <label htmlFor="status">Status<span className="red">*</span></label><br/>
                            <select required className="full-width" 
                                onChange={e=>onStatusChange(e)} id="status" name="status" defaultValue="">
                                <option value="" disabled>Select...</option>
                                <option value="Watching">Watching</option>
                                <option value="Completed">Completed</option>
                                <option value="On Hold">On Hold</option>
                                <option value="Dropped">Dropped</option>
                                <option value="Plan to Watch">Plan to Watch</option>
                            </select>
                        </div>
                        <div id="box4">
                            <label htmlFor="type">Type</label><br/>
                            <select className="full-width" id="type" name="type"
                                onChange={e=>onTypeChange(e)}>
                                <option default value="TV">TV</option>
                                <option value="Film">Film</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div id="box5">
                            <label htmlFor="tags">Tags</label><br/>
                            <input className="full-width" placeholder="Separated, by, commas"
                                type="text" id="tags" name="tags" onKeyDown={e=>preventSubmitOnEnter(e)}
                                onChange={e=>onTagsChange(e)}
                                />
                        </div>
                        <div id="box6">
                            <label htmlFor="rating">Rating:<span id="rating-value"
                                className={ratingSliderValue<3.5 ? "low-rating" : (ratingSliderValue<8.0 ? "mid-rating" : "high-rating")}>
                                {ratingSliderValue}</span></label>
                                {ratingSliderValue !== "" ? <span onClick={()=>{setRatingSliderValue("")}} id="clear-rating">clear</span> : null}
                            <br/>
                            <input className="full-width" type="range" id="rating" name="rating" min="0.0" max="10.0" step="0.5"
                                value={ratingSliderValue} onChange={e=>onRatingSliderChange(e)}
                            />
                        </div>
                        <div id="box7">
                            <label htmlFor="progress">Progress</label><br/>
                            <input className="progress-input" type="number" min="0" max={episodesTotal} id="progress" name="episodesCompleted"
                                onChange={e=>onEpisodesCompletedChange(e)}
                            />&nbsp;/&nbsp;
                            <input className="progress-input" type="number" min="0" id="progress" name="episodesTotal"
                                onChange={e=>onEpisodesTotalChange(e)}
                            />
                        </div>
                        <div id="box8">
                            <label htmlFor="favorite">Favorite?</label>&nbsp;&nbsp;
                            <input type="checkbox" id="favorite" name="favorite"
                                onChange={()=>onFavoriteChange()}
                            />
                        </div>
                        <div id="box9">
                            <label htmlFor="notes">Notes</label><br/>
                            <textarea className="full-width" rows="4" id="notes" name="notes" 
                                onChange={e=>onNotesChange(e)} onKeyDown={e=>preventSubmitOnEnter(e)}/>
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