# Showstarter 

## Overview

So showstopper, but showstarter instead.

Most of us consume media recreationally, but it seems like the more we consume it, the more that already boundless pool expands. What have I already seen, and what have I dropped? When did I watch it, and what did I think of it? What new (or old) movies or shows look interesting, and how can I keep track of them? 

Showstarter aims to be a simple web application that helps its user keep track of the answers to all those questions, helping them develop a collection of their past, present, and future media consumption. Now we can at least document the time we've ~~wasted~~ invested!

Users will be able to create accounts in the system, where their personal records are stored in an entry per piece of media (containing information on that media as well as the user's ratings). Users can login and create, view, manipulate, and delete entries, and (hopefully) search, filter, and sort their list based on various criteria.


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
	  name: "My Name",
	  type: "TV Series",
	  genres: ["Action","Crime","Drama","Mystery","Thriller"],
	  status: "Watching",
	  rating: 9.5,
	  episodesCompleted: 6,
	  episodesTotal: 8,
	  notes: "Charismatic actresses and actors in awesome fight choreography sequences strung together by a compelling story.",
	  tags: ["Netflix","2021","Korean","Hee-soon Park","Ahn Bo-Hyun","Han So-hee"],
	  dateAdded: 2021-10-26
    },
    {
	  name: "Wotakoi: Love is Hard for Otaku",
	  type: "TV Series",
	  genres: ["Comedy","Romance","Slice of Life"],
	  status: "Plan to Watch",
	  rating: null,
	  episodesCompleted: 0,
	  episodesTotal: 11,
	  notes: "Aka ヲタクに恋は難しい, or Wotaku ni Koi wa Muzukashii. Girlfriend's been pestering me about watching this one.",
	  tags: ["anime","Spring 2018","A-1 Pictures"],
	  dateAdded: 2021-10-26
    }
    {
	  name: "Shoplifters",
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

### [First Draft Schema](./src/db.js?raw=true) 

## Wireframes

(___TODO__: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc._)

/list/create - page for creating a new shopping list

![list create](documentation/list-create.png)

/list - page for showing all shopping lists

![list](documentation/list.png)

/list/slug - page for showing specific shopping list

![list](documentation/list-slug.png)

## Site map

(___TODO__: draw out a site map that shows how pages are related to each other_)

Here's a [complex example from wikipedia](https://upload.wikimedia.org/wikipedia/commons/2/20/Sitemap_google.jpg), but you can create one without the screenshots, drop shadows, etc. ... just names of pages and where they flow to.

## User Stories or Use Cases

(___TODO__: write out how your application will be used through [user stories](http://en.wikipedia.org/wiki/User_story#Format) and / or [use cases](https://www.mongodb.com/download-center?jmp=docs&_ga=1.47552679.1838903181.1489282706#previous)_)

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a new grocery list
4. as a user, I can view all of the grocery lists I've created in a single list
5. as a user, I can add items to an existing grocery list
6. as a user, I can cross off items in an existing grocery list

## Research Topics

(___TODO__: the research topics that you're planning on working on along with their point values... and the total points of research topics listed_)

* (5 points) Integrate user authentication
    * I'm going to be using passport for user authentication
    * And account has been made for testing; I'll email you the password
    * see <code>cs.nyu.edu/~jversoza/ait-final/register</code> for register page
    * see <code>cs.nyu.edu/~jversoza/ait-final/login</code> for login page
* (4 points) Perform client side form validation using a JavaScript library
    * see <code>cs.nyu.edu/~jversoza/ait-final/my-form</code>
    * if you put in a number that's greater than 5, an error message will appear in the dom
* (5 points) vue.js
    * used vue.js as the frontend framework; it's a challenging library to learn, so I've assigned it 5 points

10 points total out of 8 required points (___TODO__: addtional points will __not__ count for extra credit_)


## [Link to Initial Main Project File](app.js) 

(___TODO__: create a skeleton Express application with a package.json, app.js, views folder, etc. ... and link to your initial app.js_)

## Annotations / References Used

(___TODO__: list any tutorials/references/etc. that you've based your code off of_)

1. [passport.js authentication docs](http://passportjs.org/docs) - (add link to source code that was based on this)
2. [tutorial on vue.js](https://vuejs.org/v2/guide/) - (add link to source code that was based on this)

