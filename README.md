

# Showstop

## Overview

Most of us consume media recreationally, but it seems like the more we consume it, the more that already boundless pool expands. What have I already seen, and what have I dropped? When did I watch it, and what did I think of it? What new (or old) movies or shows look interesting, and how can I keep track of them? 

Showstop aims to be a simple web application that helps its user keep track of the answers to all those questions, helping them develop a collection of their past, present, and future media consumption. Now we can at least document the time we've ~~wasted~~ invested!

Users will be able to create accounts in the system, where their personal records are stored in an entry per piece of media (containing information on that media as well as the user's ratings). Users can login and create, view, manipulate, and delete entries, and (hopefully) search, filter, and sort their list based on various criteria.

(This is loosely a MyAnimeList clone.)


## Data Model

The application will store Users, each containing a List containing Media entries. All the data for one user will be encapsulated in a single object.

* each user will have one list (embedded), which can be filtered by various categories (movies, shows, etc), genres (sci-fi, action, drama), and optional tags.
* each list contains an arbitrary number of media entries (by embedding).

```javascript
{
  username: "movieaddict420",
  avatar: // string describing path to image
  bio: // user's bio
  hash: // a password hash,
  salt: // salt used when hashing password
  list: [
    {
	  title: "My Name",
	  type: "TV Series",
	  genres: ["Action","Crime","Drama","Mystery","Thriller"],
	  status: "Watching",
	  rating: 8.5,
	  episodesCompleted: 6,
	  episodesTotal: 8,
	  notes: "Charismatic actresses and actors in awesome fight choreography sequences strung together by a compelling story.",
	  tags: ["Netflix","2021","Korean","Hee-soon Park","Ahn Bo-Hyun","Han So-hee"],
	  dateAdded: 2021-10-26
    },
    {
	  title: "Wotakoi: Love is Hard for Otaku",
	  type: "TV Series",
	  genres: ["Comedy","Romance","Slice of Life"],
	  status: "Plan to Watch",
	  rating: null,
	  episodesCompleted: 0,
	  episodesTotal: 11,
	  notes: "Aka ヲタクに恋は難しい, or Wotaku ni Koi wa Muzukashii. Girlfriend's been pestering me about watching this one.",
	  tags: ["anime","Spring 2018","A-1 Pictures"],
	  dateAdded: 2021-10-26
    },
    {
	  title: "Shoplifters",
	  type: "Film",
	  genres: ["Crime","Drama"],
	  status: "Completed",
	  rating: 9.5,
	  episodesCompleted: 1,
	  episodesTotal: 1,
	  notes: "This one gets me every time.",
	  tags: ["favorite","2018","Japanese","Hirokazu Koreeda"],
	  dateAdded: 2021-10-25
    }
  ]
}
```

### [First Draft Schema](./src/models/User.js?raw=true):
```javascript
const mongoose = require('mongoose');

// Media Entry Schema
const EntrySchema = new mongoose.Schema({
    title: {
        type: String,               //name of entry
        required: true
    },
    rating: Number,             //user rating from 0.0 to 10.0
    status: {
        type: String,             //Plan to Watch, Watching, Completed, On Hold, or Dropped
        required: true
    },
    episodesCompleted: Number,  //number of episodes user has watched
    episodesTotal: Number,      //total episodes for this media
    favorite: Boolean,
    type: String,               //type of media, e.g. film
    genres: [String],           //list of genres
    tags: [String],             //tags, such as release year, director, actors/actresses, etc
    notes: String,
    dateAdded: Date             //date this entry was added
});

// User Schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,   //e.g. movieaddict420
        required: true
    },
    password: {
        type: String,   //salt+hashed password using bcryptjs
        required: true
    },
    list: [EntrySchema] //list of media entries
});

module.exports = mongoose.model('User', UserSchema);
```

## Wireframes

/login - page for login or sign-up

![login](./ux-design/wireframes/wireframe-login.png?raw=true)
![sign up overlay](./ux-design/wireframes/wireframe-sign-up.png?raw=true)

/list - page for displaying and manipulating list (done through overlays, not through new pages)

![list](./ux-design/wireframes/wireframe-list.png?raw=true)

- Users can click on any entry to view its details. Rating, status, and progress can be edited here. Users can also further edit or delete an entry from this overlay.
![view entry overlay](./ux-design/wireframes/wireframe-view-entry.png?raw=true)

- Users can add/edit an entry either by clicking "Add Entry" on the top left of the list, or by clicking "Edit" when viewing an entry.
![add entry overlay](./ux-design/wireframes/wireframe-add-entry.png?raw=true)

- Users can search and filter the list by various criteria.
![search overlay](./ux-design/wireframes/wireframe-search.png?raw=true)

## Site map

![site map](./ux-design/site-map.png?raw=true)

## User Stories or Use Cases

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can view all my media in a single list
4. as a user, I can view the details of any particular entry in my list
5. as a user, I can add new entries as well as edit/delete existing ones
6. as a user, I can search through my list based on criteria I decide

## Research Topics

* (3 points) Perform client side form validation using custom JavaScript.
  * currently apparent in the [login/registration forms](./front-end/src/js/Login.js?raw=true) and some of the [add-entry form](./front-end/src/js/overlays/AddEntry.js?raw=true).
* (3 points) [React.js](https://reactjs.org/) as a client-side JavaScript framework for generating dynamic HTML and CSS. 
  * All screens and interfaces in the front-end directory are written in JSX.
* (3 points) Unit testing of backend routes with JavaScript using Mocha and Chai, as well as Istanbul for tracking code coverage. 
  * yet to do.
* (1 point) [react-select](https://react-select.com/home) for better-customizable select inputs on the front-end.
  * configuration at line 39 of [List.js](./front-end/src/js/List.js?raw=true), usage at line 317.
* (1 point) [Morgan](https://github.com/expressjs/morgan) as a server-side Javascript module, using its middleware for logging information about incoming server requests.
  * This is going to make debugging my server a fair bit easier. Used in [app.js](./src/app.js?raw=true)
* (1 point) [cors](https://www.npmjs.com/package/cors) as server-side Javascript middleware to allow my front-end and back-end to communicate with one another.
  * This is going to make debugging my server a fair bit easier. Used in [app.js](./src/app.js?raw=true)
* (1 point) [cookie-parser](https://www.npmjs.com/package/cookie-parser) as a server-side Javascript module for ease of managing cookies, particularly for stuff like dark-mode.
  * cookies read in [App.js](./front-end/src/js/App.js?raw=true) and [Login.js](./front-end/src/js/Login.js?raw=true), read and written in [List.js](./front-end/src/js/List.js?raw=true)
* (1 point) [passport](https://www.npmjs.com/package/passport) and [passport-local](http://www.passportjs.org/packages/passport-local/) as a server-side Javascript module for authentication a nd specifying a local strategy for it.
  * config in [passportConfig.js](./src/passportConfig.js?raw=true), authentication utilized in [authenticationRoutes.js](./src/routes/authenticationRoutes.js?raw=true)
* (1 point) [axios](https://www.npmjs.com/package/axios) for promise-based HTTP requests on both the front- and back-end.
  * used at various points in the front-end to make requests to back-end, which uses it also to proxy those requests to MongoDB Atlas. 
* (1 point) Responsive design.
  * Both login and list pages adapt to changes in screen width, try messing around.
* (1 point) *Possibly* [Movie Database (IMDb Alternative)](https://rapidapi.com/rapidapi/api/movie-database-imdb-alternative) as an external API to grab IMDb ratings for an entry.
  * This will not be a priority until everything else is functional, but I'd like the user to have the option to see what other people thought about a piece of a media.

17 points total out of 8 required points.


## [Initial Main Project File](./src/app.js?raw=true) 

```javascript
const express = require('express');
const app = express();

const path = require('path');
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

const morgan = require("morgan")
app.use(morgan("dev"))

//bringing in db
require( './db' );
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Entry = mongoose.model('Entry');

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('hullo');
});

app.listen(3000);
```

## Annotations / References Used

1. [tutorial for passport config and authentication](https://www.youtube.com/watch?v=IUw_TgRhTBE) - [passportConfig.js](./src/passportConfig.js?raw=true), [authenticationRoutes.js](./src/routes/authenticationRoutes.js?raw=true)
2. [css grid vs flexbox tutorial](https://www.youtube.com/watch?v=9zA8cB-54SA&t=198s) - [AddEntry.js](./front-end/src/js/overlays/AddEntry.js?raw=true)
3. [Bootstrap <Modal> documentation](https://react-bootstrap.github.io/components/modal/) - [AddEntry.js](./front-end/src/js/overlays/AddEntry.js?raw=true)
4. [react-cookie documentation](https://www.npmjs.com/package/react-cookie) - [App.js](./front-end/src/js/App.js?raw=true)
5. [MERN-stack todo list app tutorial](https://dev.to/jahangeer/how-to-build-a-todo-list-app-with-react-node-js-mern-stack-3ban) - inspiration for file structure of backend routing and list-modifying functions
6. [Typewriter text effect](https://usefulangle.com/post/85/css-typewriter-animation) - [Typewriter.js](./front-end/src/js/Typewriter.js?raw=true)
