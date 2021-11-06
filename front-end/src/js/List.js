import {React, useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom';
import Select from 'react-select'
import '../css/List.css';
import axios from 'axios';
import { useCookies } from "react-cookie";
import AddEntry from './overlays/AddEntry'

const List = (props) => {
    const [user, setUser] =[props.user, props.setUser];
    const [cookies, setCookie] = useCookies(["mode"]);
    useEffect(() => {
        if(user) {
            document.title = `${user.username}'s List`;
        }
        else {
            document.title = `Your List`;
        }
    }, [user]);

    /* ------------------------------ basic search ------------------------------ */
    const [searchCriteria, setSearchCriteria] = useState("");
    

    /* ------------------------------ status select ----------------------------- */
    const options = [
        { value: "Everything", label: "Everything" },
        { value: "Watching", label: "Watching" },
        { value: "Completed", label: "Completed" },
        { value: "On Hold", label: "On Hold" },
        { value: "Dropped", label: "Dropped" },
        { value: "Plan To Watch", label: "Plan To Watch" },
    ]
    const [status, setStatus] = useState("Everything");
    const handleSelect = value => {
        setStatus(value.value);
    }
    const customStyles = {
        control: styles => ({
            ...styles,
            color: "white",
            fontSize: "14px",
            background: "rgba(255, 255, 255, 0.7)",
        }),
        menu: (provided, state) => ({
          ...provided,
          zIndex: 2,
          background: "rgba(177, 177, 177, 0.2)"
        }),
        option: (styles, { isDisabled, isFocused, isSelected }) => ({
            ...styles,
            cursor: isFocused ? "pointer" : "auto",
            color: isSelected ? "white" : "black",
            fontWeight: isSelected ? "bold" : "normal",
            fontSize: "14px",
            backgroundColor: isSelected ? "#2dc000e5" : isFocused ? "#e4ffdcb9" : "rgba(255, 255, 255, 0.9)",
            ':active': {
                ...styles[':active'],
                backgroundColor: !isDisabled
                  ? isSelected
                    ? "rgba(255, 255, 255, 0.69)"
                    : "#bbebab"
                  : undefined,
            },
        }),
    }
    const customTheme = (theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
            ...theme.colors,
            primary25: '#32cc04',
            primary: '#29af00',
        },
    })
    
    const [list, modifyList] = useState([
        {
            title: "Wotakoi",               //name of entry
            rating: 7,             //user rating from 0.0 to 10.0
            status: "Watching",             //Plan to Watch, Watching, Completed, On Hold, or Dropped
            episodesCompleted: null,  //number of episodes user has watched
            episodesTotal: 24,      //total episodes for this media
            type: "TV",               //type of media, e.g. film
            genres: ["Action","Comedy","Drama","Supernatural"],           //list of genres
            tags: ["P.A. Works","Kana Hanazawa"],             //tags, such as release year, director, actors/actresses, etc
            notes: "Good-ass show",
            dateAdded: new Date()             //date this entry was added
        },
        {
            title: "Sword Art Online",               //name of entry
            rating: 7,             //user rating from 0.0 to 10.0
            status: "Dropped",             //Plan to Watch, Watching, Completed, On Hold, or Dropped
            episodesCompleted: 12,  //number of episodes user has watched
            episodesTotal: 24,      //total episodes for this media
            type: "TV",               //type of media, e.g. film
            genres: ["Action","Comedy","Drama","Supernatural"],           //list of genres
            tags: ["P.A. Works","Kana Hanazawa"],             //tags, such as release year, director, actors/actresses, etc
            notes: "Good-ass show",
            dateAdded: new Date()             //date this entry was added
        },
        {
            title: "Sakurasou No Pet Na Kanojo",               //name of entry
            rating: 7,             //user rating from 0.0 to 10.0
            status: "On Hold",             //Plan to Watch, Watching, Completed, On Hold, or Dropped
            episodesCompleted: 24,  //number of episodes user has watched
            episodesTotal: 24,      //total episodes for this media
            type: "TV",               //type of media, e.g. film
            genres: ["Action","Comedy","Drama","Supernatural"],           //list of genres
            tags: ["P.A. Works","Kana Hanazawa"],             //tags, such as release year, director, actors/actresses, etc
            notes: "Good-ass show",
            dateAdded: new Date()             //date this entry was added
        },
        {
            title: "Angel Beats",               //name of entry
            rating: 9,             //user rating from 0.0 to 10.0
            status: "Completed",             //Plan to Watch, Watching, Completed, On Hold, or Dropped
            episodesCompleted: 13,  //number of episodes user has watched
            episodesTotal: 13,      //total episodes for this media
            type: "TV",               //type of media, e.g. film
            genres: ["Action","Comedy","Drama","Supernatural"],           //list of genres
            tags: ["P.A. Works","Kana Hanazawa"],             //tags, such as release year, director, actors/actresses, etc
            notes: "Good-ass show",
            dateAdded: new Date()             //date this entry was added
        },
        {
            title: "Amagi Brilliant Park",               //name of entry
            rating: 8,             //user rating from 0.0 to 10.0
            status: "Completed",             //Plan to Watch, Watching, Completed, On Hold, or Dropped
            episodesCompleted: 13,  //number of episodes user has watched
            episodesTotal: 13,      //total episodes for this media
            type: "TV",               //type of media, e.g. film
            genres: ["Comedy", "Drama", "Fantasy"],           //list of genres
            tags: ["Isuzu Sento", "Seiya Kanie", "Latifa Fleuranza", "Sylphy", "Kyoto Animation"],             //tags, such as release year, director, actors/actresses, etc
            notes: "I remember this being a solid ecchi comedy that satisfied my horny teenage needs",
            dateAdded: new Date()             //date this entry was added
        },
        {
            title: "Baccano",               //name of entry
            rating: null,             //user rating from 0.0 to 10.0
            status: "Plan To Watch",             //Plan to Watch, Watching, Completed, On Hold, or Dropped
            episodesCompleted: null,  //number of episodes user has watched
            episodesTotal: null,      //total episodes for this media
            type: null,               //type of media, e.g. film
            genres: [],           //list of genres
            tags: [],             //tags, such as release year, director, actors/actresses, etc
            notes: null,
            dateAdded: new Date()             //date this entry was added
        },
    ]);

    /* ------------------------------ sorting list ------------------------------ */
    //title
    const sortByTitle = () => {
        const reverse = ascending[0] ? 1 : -1;
        list.sort((a, b) => reverse * ((a.title > b.title) ? -1 : 1));
    }
    //rating
    const sortByRating = () => {
        const reverse = ascending[1] ? 1 : -1;
        sortByTitle(); //sort by alpha first
        list.sort((a, b) => {
            if(!a.rating && !b.rating) {
                return 0;
            }
            return reverse * ((a.rating > b.rating) ? 1 : -1);
        });
    }
    //status (default)
    const sortByStatus = () => {
        const reverse = ascending[2] ? 1 : -1;
        sortByTitle(); //sort by alpha first
        const statusOrder = ["Watching","Completed","On Hold","Dropped","Plan to Watch"];
        const orderForIndexVals = statusOrder.slice(0).reverse();
        list.sort((first, second) => {
            const aIndex = -orderForIndexVals.indexOf(first.status);
            const bIndex = -orderForIndexVals.indexOf(second.status);
            return reverse * (aIndex - bIndex);
        });
    }
    //progress
    const sortByProgress = () => {
        const reverse = ascending[3] ? 1 : -1;
        sortByTitle(); //sort by alpha first
        list.sort((a, b) => {
            if(!a.episodesCompleted && !b.episodesCompleted) {
                return 0;
            }
            return reverse * ((a.episodesCompleted > b.episodesCompleted) ? 1 : -1);
        });
    }

    const sortFunctions = {
        "title" : sortByTitle,
        "status" : sortByStatus,
        "rating" : sortByRating,
        "progress" : sortByProgress
    }
    const [sortBy, setSortBy] = useState("status");
    const [ascending, setAscending] = useState([true,true,true,true]);

    const clearArrowsExcept = n => {
        const arrows = document.getElementsByClassName("arrow");
        for (let i = 0; i < arrows.length; i++) {
            if (i !== n)
                arrows[i].style.display = "none";
        }
    }

    const handleTitleSort = () => {
        clearArrowsExcept(0);
        setAscending([!ascending[0], true, true, true]);
        setSortBy("title");
        const arrowSpan = document.getElementsByClassName("arrow")[0];
        arrowSpan.style.display = "inline";
        arrowSpan.innerHTML = ascending[0] ? "&#8593;" : "&#8595";
    }
    const handleRatingSort = () => {
        clearArrowsExcept(1);
        setAscending([true, !ascending[1], true, true]);
        setSortBy("rating");
        const arrowSpan = document.getElementsByClassName("arrow")[1];
        arrowSpan.style.display = "inline";
        arrowSpan.innerHTML = ascending[1] ? "&#8593;" : "&#8595";
    }
    const handleStatusSort = () => {
        clearArrowsExcept(2);
        setAscending([true, true, !ascending[2], true]);
        setSortBy("status");
        const arrowSpan = document.getElementsByClassName("arrow")[2];
        arrowSpan.style.display = "inline";
        arrowSpan.innerHTML = !ascending[2] ? "&#8593;" : "&#8595";
    }
    const handleProgressSort = () => {
        clearArrowsExcept(3);
        setAscending([true, true, true, !ascending[3]]);
        setSortBy("progress");
        const arrowSpan = document.getElementsByClassName("arrow")[3];
        arrowSpan.style.display = "inline";
        arrowSpan.innerHTML = ascending[3] ? "&#8593;" : "&#8595";
    }

    /* ------------------------------- list items ------------------------------- */
    const generateEntries = () => {
        sortFunctions[sortBy]();
        return ( 
            <tbody>
                {list.filter(entry => {
                    if (!entry.title.toLowerCase().includes(searchCriteria.toLowerCase()))
                        return false;
                    if (status !== "Everything" && entry.status !== status)
                        return false;
                    return true;
                })
                .map((entry, i) => 
                    <tr key={i}>
                        <td className="number">{i+1}</td>
                        <td className="title">{entry.title}</td>
                        <td className="rating">
                            {entry.rating ? <span>{entry.rating}</span> : <span>&ndash;</span>}
                            </td>
                        <td className="status">{entry.status}</td>
                        <td className="progression">
                            {entry.episodesTotal 
                                ? <span>{entry.episodesCompleted
                                    ? <span>{entry.episodesCompleted}</span> : <span>&ndash;&nbsp;</span>}
                                        /{entry.episodesTotal} 
                                        {entry.episodesCompleted < entry.episodesTotal 
                                            ? <div className="absolute"><span className="plus-button glyphicon glyphicon-plus-sign" onClick={handleIncrement}/></div> 
                                            : null}</span>
                                : <span>&ndash;&nbsp;&nbsp;&nbsp;</span>}
                            </td>
                        <td className="type">
                            {entry.type ? <span>{entry.type}</span> : <span>&ndash;</span>}</td>
                        <td className="genres">
                            {entry.genres.length > 0 
                                ? <span>{entry.genres.join(", ")}</span>
                                : <span className="dummy-text">No genres yet...</span>
                            }</td>
                        <td className="tags">
                            {entry.tags.length > 0 
                                ? <span>{entry.tags.join(", ")}</span>
                                : <span className="dummy-text">No tags yet...</span>
                            }</td>
                        <td className="notes">{entry.notes && entry.notes.length > 0 
                                ? <span>{entry.notes}</span>
                                : <span className="dummy-text">No notes yet...</span>
                            }</td>
                    </tr>
                )}
            </tbody>
        );
    }
    const handleIncrement = () => {
        console.log("handle increment"); //TODO
    }
    const entries = generateEntries(status, searchCriteria);
    
    /* --------------------------------- logout --------------------------------- */
    const logout = async () => {
        await axios({
            method: "GET",
            withCredentials: true,
            url: "/logout"
        }).then(() => {
            setUser(null);
        });
    }

    /* ----------------------------- light/dark mode ---------------------------- */
    const [modeButtonValue, setModeButtonValue] = useState(cookies.mode ? (cookies.mode === "dark" ? "Light Mode" : "Dark Mode") : "Dark Mode");
    const toggleDarkMode = () => {
        if(cookies.mode && cookies.mode === "dark") {
            setCookie("mode", "light");
            props.updateDarkMode("light");
            setModeButtonValue("Dark Mode");
        }
        else {
            setCookie("mode", "dark");
            props.updateDarkMode("dark");
            setModeButtonValue("Light Mode");
        }
    }
    useEffect(() => {
        props.updateDarkMode(cookies.mode);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    /* -------------------------------- overlays -------------------------------- */
    const [showAddEntry, setAddEntry] = useState(false)
    const openAddEntry = () => setAddEntry(true)
    const closeAddEntry = () => setAddEntry(false)

    /* ----------------------------------- jsx ---------------------------------- */
    if(user) {
        return (
            <div>
                <div id="main-header">
                    <div className="left">
                        <h1 className="rainbow-text" id="showstop">
                            Showstop
                        </h1>
                    </div>
                    <div className="middle">
                        <h2 id="list-name">{user.username}'s List</h2>
                    </div>
                    <div className="right">
                        <div id="logo">
                            <input className="button" id="toggle-mode" type="button" value={modeButtonValue}
                                onClick={toggleDarkMode}
                            />
                            <input className="button" id="sign-out" type="button" value="Sign Out" 
                                onMouseEnter={e=>{e.target.value = "(´^ω^)ノ"}} onMouseLeave={e=>{e.target.value = "Sign Out"}}
                                onClick={()=>logout()}
                            />
                        </div>
                    </div>
                </div>
                <div id="toolbar">
                    <Select id="status-select" options={options} onChange={ value => handleSelect(value) }
                        styles={customStyles} theme={customTheme} placeholder={'Status...'}
                    />
                    <span id="search">
                        <input id="basic-search" type="text" placeholder="Search..." onChange={e => setSearchCriteria(e.target.value)}></input>
                        <input className="button" id="advanced-search" type="button" value="Advanced Search"/>
                        <input className="button" id="add-entry-button" type="button" value="&#43; Add Entry"
                            onClick={() => openAddEntry()}
                        />
                    </span>
                </div>
                <table className="table">
                    <thead>
                        <tr className="sticky" id="info-header">
                            <th id="number-header" className="number">#</th>
                            <th className="title button header-border" onClick={handleTitleSort}><span id="title-header">Title</span> <span className="arrow"></span></th>
                            <th className="rating button header-border" onClick={handleRatingSort}><span id="rating-header">Rating</span> <span className="arrow"></span></th>
                            <th className="status button header-border" onClick={handleStatusSort}><span id="status-header">Status</span> <span className="arrow"></span></th>
                            <th className="progression-header button header-border" onClick={handleProgressSort}><span id="progress-header">Progress</span> <span className="arrow"></span></th>
                            <th id="type-header" className="type">Type</th>
                            <th id="genres-header" className="genres">Genres</th>
                            <th id="tags-header" className="tags">Tags</th>
                            <th id="notes-header" className="notes">Notes</th>
                        </tr>
                    </thead>
                    {entries}
                </table>
                <AddEntry show={showAddEntry} close={closeAddEntry}/>
            </div>
        );
    }
    else {
        return (<Redirect push to="/" />)
    }
}

export default List;
