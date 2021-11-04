import {React, useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom';
import Select from 'react-select'
import '../css/List.css';

const List = (props) => {
    const [user, setUser] = [props.user, props.setUser];
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
        { value: "everything", label: "Everything" },
        { value: "watching", label: "Watching" },
        { value: "completed", label: "Completed" },
        { value: "onHold", label: "On Hold" },
        { value: "dropped", label: "Dropped" },
        { value: "planToWatch", label: "Plan To Watch" },
    ]
    const handleSubmit = value => {
        console.log(value.value);
    }
    const customStyles = {
        menu: (provided, state) => ({
          ...provided,
          zIndex: 2,
        }),
        option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? "white" : "#29af00",
            fontWeight: state.isSelected ? "bold" : "normal",
            backgroundColor: state.isSelected ? "#29af00" : state.isFocused ? "#f0ffeb" : "white",
            ':active': {
                ...provided[':active'],
                backgroundColor: !state.isDisabled
                  ? state.isSelected
                    ? "white"
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
                            logo here
                        </div>
                    </div>
                </div>
                <div id="toolbar">
                    <Select id="status-select" options={options} onChange={ value => handleSubmit(value) }
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
                            <th className="progression button">Progress &#8595;</th>
                            <th className="type button">Type &#8593;</th>
                            <th className="genres button">Genres &#8595;</th>
                            <th className="tags button">Tags &#8593;</th>
                            <th className="notes button">Notes &#8595;</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        <tr>
                            <td className="number">1</td>
                            <td className="title">Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka</td>
                            <td className="rating">10</td>
                            <td className="status">Plan to Watch</td>
                            <td className="progression">5156/2180 <span className="plus-button glyphicon glyphicon-plus-sign"/></td>
                            <td className="type">Film</td>
                            <td className="genres">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="tags">Joe, Mama, Joe, Deez Nuts, Borger, Camel</td>
                            <td className="notes">Dessert toffee wafer icing chocolate. Pastry gingerbread jelly-o dragée halvah macaroon danish cake. Sweet caramels halvah oat cake fruitcake. Dragée sweet pastry fruitcake tiramisu chocolate cake.</td>
                        </tr>
                        
                    </tbody>
                    </table>
            </div>
        );
    }
    else {
        return (<Redirect to="/" />)
    }
}

export default List;
