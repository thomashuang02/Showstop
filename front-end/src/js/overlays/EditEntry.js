import {React, useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import '../../css/EntryOverlay.css';
import {putEntry, deleteEntry} from '../ListServices';

const EditEntry = (props) => {
    const show = props.show, close = props.close;
    const list = props.list, modifyList = props.modifyList;
    const darkMode = props.darkMode;

    const [deleted, setDeleted] = useState(false);
    const [changed, setChanged] = useState(false);
    const [entry_id, setEntry_id] = useState();
    const [dateAdded, setDateAdded] = useState();
    const [title, setTitle] = useState("");
    const onTitleChange = e => {
        setChanged(true);
        setTitle(e.target.value);
    }
    const [ratingSliderValue, setRatingSliderValue] = useState("");
    const onRatingSliderChange = e => {
        setChanged(true);
        setRatingSliderValue(parseFloat(e.target.value).toFixed(1));
    }
    const [status, setStatus] = useState("");
    const onStatusChange = e => {
        setChanged(true);
        setStatus(e.target.value);
    }
    const [episodesCompleted, setEpisodesCompleted] = useState("");
    const onEpisodesCompletedChange = e => {
        setChanged(true);
        setEpisodesCompleted(e.target.value);
    }
    const [episodesTotal, setEpisodesTotal] = useState("");
    const onEpisodesTotalChange = e => {
        setChanged(true);
        setEpisodesTotal(e.target.value);
    }
    const [favorite, setFavorite] = useState(false);
    const onFavoriteChange = () => {
        setChanged(true);
        setFavorite(!favorite); //toggle
    }
    const [type, setType] = useState("TV");
    const onTypeChange = e => {
        setChanged(true);
        setType(e.target.value);
    }
    const [genres, setGenres] = useState("");
    const onGenresChange = e => {
        setChanged(true);
        setGenres(e.target.value);
    }
    const [tags, setTags] = useState("");
    const onTagsChange = e => {
        setChanged(true);
        setTags(e.target.value);
    }
    const [notes, setNotes] = useState("");
    const onNotesChange = e => {
        setChanged(true);
        setNotes(e.target.value);
    }

    const entry = props.entry;
    
    const refreshEntry = () => {
        setDeleted(false);
        setChanged(false);
        setEntry_id(entry._id || "");
        setDateAdded(entry.dateAdded || Date.now());
        setTitle(entry.title || "");
        setRatingSliderValue(entry.rating || "");
        setStatus(entry.status || "");
        setEpisodesCompleted(entry.episodesCompleted || "");
        setEpisodesTotal(entry.episodesTotal || "");
        setFavorite(entry.favorite || false);
        setType(entry.type || "TV");
        setGenres(entry.genres ? entry.genres.join(", ") : "");
        setTags(entry.tags ? entry.tags.join(", ") : "");
        setNotes(entry.notes || "");
    };

    useEffect(() => {
        if(show) {
            refreshEntry();
        }
    }, [show]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleClose = () => {
        close();
    }

    const handleEditEntry = async (e) => {
        e.preventDefault();
        if(deleted) {
            console.log('beans');
            try {
                const response = await deleteEntry(entry_id);
                handleClose();
                modifyList(Array.isArray(response.data) ? response.data : list);
            } catch (err) {
                console.log(err);
            }
        }
        else if(changed) {
            const modifiedEntry = {
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
                const response = await putEntry(entry_id, modifiedEntry);
                handleClose();
                modifyList(Array.isArray(response.data) ? response.data : list);
            } catch (err) {
                console.log(err);
            }
        }
        else {
            handleClose();
        }
    }
    const preventSubmitOnEnter = (e) => {
        e.key === 'Enter' && e.preventDefault();
    }

    const formatDate = (date) => {
        const dateObj = Date(date);
        return dateObj.slice(4, 10) + "," + dateObj.slice(10, 15);
    }

    return (
        <Modal size="lg" show={show} onHide={()=>handleClose()} >
            <form id="add-entry-form" onSubmit={e=>handleEditEntry(e)} autoComplete="off">
                <Modal.Header className={darkMode ? "dark-mode" : null}>
                    <Modal.Title>
                        <strong>Edit Entry</strong>&nbsp;&nbsp;<span id="date-added">added {formatDate(dateAdded)}</span>
                    </Modal.Title>
                    <input type="button" className="button" id="close-add-entry-button" onClick={()=>close()} value="&times;"/>
                </Modal.Header>
                <Modal.Body className={darkMode ? "dark-mode" : null}>
                    <div className="grid">
                        <div id="box1">
                            <label htmlFor="title">Title<span className="red">*</span></label><br/>
                            <input value={title} required className="full-width" type="text" id="title" name="title" 
                                onChange={e=>onTitleChange(e)} onKeyDown={e=>preventSubmitOnEnter(e)}/>
                        </div>
                        <div id="box2">
                            <label htmlFor="genres">Genres</label><br/>
                            <input value={genres} className="full-width" type="text" id="genres" name="genres" 
                                placeholder="Separated, by, commas"
                                onChange={e=>onGenresChange(e)} onKeyDown={e=>preventSubmitOnEnter(e)}/>
                        </div>
                        <div id="box3">
                            <label htmlFor="status">Status<span className="red">*</span></label><br/>
                            <select value={status} required className="full-width" 
                                onChange={e=>onStatusChange(e)} id="status" name="status">
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
                            <select value={type} className="full-width" id="type" name="type"
                                onChange={e=>onTypeChange(e)}>
                                <option default value="TV">TV</option>
                                <option value="Film">Film</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div id="box5">
                            <label htmlFor="tags">Tags</label><br/>
                            <input value={tags} className="full-width" placeholder="Separated, by, commas"
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
                            <input value={episodesCompleted} className="progress-input" max={episodesTotal} type="number" min="0" id="progress" name="episodesCompleted"
                                onChange={e=>onEpisodesCompletedChange(e)}
                            />&nbsp;/&nbsp;
                            <input value={episodesTotal} className="progress-input" type="number" min="0" id="progress" name="episodesTotal"
                                onChange={e=>onEpisodesTotalChange(e)}
                            />
                        </div>
                        <div id="box8">
                            <label htmlFor="favorite">Favorite?</label>&nbsp;&nbsp;
                            <input type="checkbox" id="favorite" name="favorite"
                                onChange={()=>onFavoriteChange()} checked={favorite ? true : false}
                            />
                        </div>
                        <div id="box9">
                            <label htmlFor="notes">Notes</label><br/>
                            <textarea value={notes} className="full-width" rows="4" id="notes" name="notes" 
                                onChange={e=>onNotesChange(e)} onKeyDown={e=>preventSubmitOnEnter(e)}/>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className={darkMode ? "dark-mode" : null}>
                <input onClick={()=>setDeleted(true)} id="delete-entry-button" type="submit" value="Delete Entry"/>
                <input className="button" id="confirm-add-entry-button" type="submit" value="Save Changes"/>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default EditEntry;