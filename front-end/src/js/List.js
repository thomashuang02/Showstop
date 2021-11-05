import {React, useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom';
import Select from 'react-select'
import '../css/List.css';
import axios from 'axios';
import { useCookies } from "react-cookie";

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
        console.log(value.value);
        setStatus(value.value);
    }
    const customStyles = {
        control: styles => ({
            ...styles,
            background: "rgba(255, 255, 255, 0.2)",
        }),
        menu: (provided, state) => ({
          ...provided,
          zIndex: 2,
          background: "rgba(177, 177, 177, 0.2)"
        }),
        option: (styles, { isDisabled, isFocused, isSelected }) => ({
            ...styles,
            color: isSelected ? "white" : "black",
            fontWeight: isSelected ? "bold" : "normal",
            backgroundColor: isSelected ? "#29af00" : isFocused ? "#f0ffeb" : "rgba(255, 255, 255, 0.69)",
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
    
    const dummyList = [
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
    ]

    /* ------------------------------ sorting list ------------------------------ */
    //status
    const sortByStatus = () => () => {
        const statusOrder = ["Watching","Completed","On Hold","Dropped","Plan to Watch"];
        const orderForIndexVals = statusOrder.slice(0).reverse();
        dummyList.sort((first, second) => {
            const aIndex = -orderForIndexVals.indexOf(first.status);
            const bIndex = -orderForIndexVals.indexOf(second.status);
            return aIndex - bIndex;
        });
    }

    const [sortListFunction, setSortListFunction] = useState(sortByStatus);

    /* ------------------------------- list items ------------------------------- */
    const generateEntries = () => {
        sortListFunction();
        return ( 
            <tbody>
                {dummyList.filter(entry => {
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
                                : <span className="placeholder">No genres yet...</span>
                            }</td>
                        <td className="tags">
                            {entry.tags.length > 0 
                                ? <span>{entry.tags.join(", ")}</span>
                                : <span className="placeholder">No tags yet...</span>
                            }</td>
                        <td className="notes">{entry.notes && entry.notes.length > 0 
                                ? <span>{entry.notes}</span>
                                : <span className="placeholder">No notes yet...</span>
                            }</td>
                    </tr>
                )}
            </tbody>
        );
    }
    const handleIncrement = () => {
        console.log("handle increment"); //TODO
    }
    const [entries, setEntries] = useState(generateEntries());
    useEffect(() => {
        setEntries(generateEntries());
    }, [status, searchCriteria, sortListFunction]); // eslint-disable-line react-hooks/exhaustive-deps

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
        if(!cookies.mode || cookies.mode === "dark") {
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
    }, []);

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
                            <input className="button" id="logout" type="button" value="Sign Out" 
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
                        <input className="button" id="add-entry-button" type="button" value="&#43; Add Entry"/>
                    </span>
                </div>
                <table className="table">
                    <thead>
                        <tr className="sticky" id="info-header">
                            <th className="number button"># &#8595;</th>
                            <th className="title button">Title &#8593;</th>
                            <th className="rating button">Rating &#8595;</th>
                            <th className="status button">Status &#8593;</th>
                            <th className="progression-header button">Progress &#8595;</th>
                            <th className="type button">Type &#8593;</th>
                            <th className="genres button">Genres &#8595;</th>
                            <th className="tags button">Tags &#8593;</th>
                            <th className="notes button">Notes &#8595;</th>
                        </tr>
                    </thead>
                    {entries}
                    </table>
            </div>
        );
    }
    else {
        return (<Redirect push to="/" />)
    }
}

export default List;
