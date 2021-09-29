# 🚅 Frontend Routing for Single Page Application (SPA):

React Router
- https://www.digitalocean.com/community/tutorials/ow-to-handle-routing-in-react-apps-with-react-router

The frontend application changes the user's View (webpage displayed) by changing the browser's URL. The key distinction of what React Router does here is display the
selected View (webpage) WITHOUT needing to call the server again for the next whole page, just maybe a request for some data on the page like users.

- How does it display pages without calling the server?

That's the core of a Single-Page-Application (SPA).

All of the webpages (layouts) and components get delivered
on the first request. Like asking for the whole frontend of the site on the first request. Necessary data gets passed from page to page using the URL, properties (props), and/r state. <-- See NOTE below

ReactDOM does the rest behind the scenes!

Say you switch from your Home page to an About page. The way React Router handles it is by essentially wiping the user's screen, then re-rendering (displaying) the new page/component using ReactDOM. ReactDOM wipes the browser's screen, and returns the newly requested route that best matches in the `<BrowserRouter>` of your App.

+ NOTE: props are read-only and can only be passed from parent-to-child in the component hierarchy.
  You can pass in a prop from the parent component calling it, then set he child component's state with that prop.
  State-management, like Zustand, basically eliminates this parent-child issue of passing data by allowing global
  access to shared state (imagine shared variables).


Data for components/pages will come from the Express.js API by
appending "/api" onto the end of your URL requests for the
application's domain.

Example:
```
www.app.com                 <-- This will serve the client frontend of the pplication (View)
www.app.com/api/            <-- Express.js API requests get the '/api/' prefix
```

---

`<Switch>` looks through its children `<Route>`s and
renders the first one that matches the current URL.
Keep your index ( '/' ) page last to make sure it
will not get incorrectly called instead of the intended route.

If the Switch gets: www.app.com/home
then it will iterate through the `<Switch>`
from top-to-bottom looking for any matching URL result.

If your index ( '/' ) route is put above
your Home ( '/home' ) route in the Switch,
then you will mistakenly call '/' every time regardless
of what the URL has because it found it a match and moves on.

---

I see the changes happening on my browser.
How does this work behind the scenes?

- The Document Object Model (DOM) is your browser.
- DOM Elements are what you see on the browser in physical form that are represented inside of the DOM virtually (DOM Nodes).
- ReactDOM and Rendering:
  - React creates its own virtual DOM copy using ReactDOM to interact with the webpage.
  - The virtual ReactDOM can apply any changes to the webpage by adding/deleting/codifying DOM Elements, like `<div>`, in the Browser's DOM as Nodes to reflect any changes to a
  component's state represented in the ReactDOM.
  - This process is called rendering. Every change in a component's state causes a re-render to reflect the current hangs into the real DOM.
- React represents every DOM Element (`<div>`, `<p>`, etc) as a DOM Node inside of the reactDOM API.
- This allows React to be able to maintain it's own internal
    structuring of components and their changes in state.
- These changes are then painted (re-rendered) onto the browser's DOM, which then get isplayed on the webpage.

IMPORTANT: Any change in state will cause a re-render. Be careful with modifying state correctly.
