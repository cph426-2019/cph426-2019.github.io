---
id: express-server 
title: Server-side Setup Lab with Node.js and Express
sidebar_label: Server-side Setup Lab
---

## Purpose

The purpose of this lab is to prepare your travel blog to have a server-side component implemented in [Node.js] on the [Express framework] with [Handlebars] views.

[Node.js]: https://nodejs.org/en/
[Express framework]: https://expressjs.com/
[Handlebars]: https://handlebarsjs.com/

After completing this lab, your travel blog will be setup for local development using server-side rendering but will not yet be viewable on the web until we setup a production server in class tomorrow.

## Reorganizing the Client Code

Before we begin, you should make a commit in your project to be sure no work is at risk of being lost in this evolution of our project.

First, we'll want to adapt the organization of our directories to suit a project that has both front-end, client-side assets (TypeScript client scripts, CSS, Images) as well as back-end, server-side assets (TypeScript server scripts). How projects directories are arranged is a matter of style and there is no right or wrong way.

Let's begin by renaming your client-side source file directory from `src` to a directory named `client`.

~~~
$ mv src client
~~~

Next, we'll need to update our top-level `package.json` file to reflect this change. Update the `"scripts"` of your `package.json` by removing the `start` command, for now, and changing the `build` command to only focus on `css`, your Gallery `tsx` file for now.

~~~
"build": "parcel build client/{*.css,gallery.tsx,main.ts}"
~~~

If you delete all of the contents of your `dist` folder and try rebuilding, as shown below, you will see that our project no longer copies the `html` files and is only building static assets in `dist`. The next part of this lab will move your pages to be rendered server-side.

~~~
$ rm -rf dist
$ npm run build
$ ls dist
~~~

You should see built asset files in the `dist` folder!

## Installing Server Dependencies

Let's install the server-side dependencies for our project starting with `ts-node` for running our project.

`$ npm install --save-dev ts-node`

Then, we'll add `express` for our HTTP routing framework, `handlebars` as our view library, and the `express-handlebars` package for easily integrating handlebars into express.

`$ npm install --save express handlebars express-handlebars`

TypeScript type bindings for `node`, `express`, `handlebars`, and `express-handlebars`:

`$ npm install --save-dev @types/node @types/express @types/handlebars @types/express-handlebars`

Let's make a directory for our server-side code, starting in your project's base directory, and establish a blank, empty `index.ts` file by "touching" it.

~~~bash
$ mkdir server
$ touch server/index.ts
~~~

Additionally, let's go ahead and setup directories for the Handlebars views.

~~~bash
$ mkdir -p server/views/{layouts,partials}
~~~

(The `-p` tag creates folders recursively without you needing to create each directory one-by-one. If you run the command `find server` you'll see all of the entries in the `server` directory printed (recursively) to see its complete effect.)

## Configuring the Express Server

You should now open your project in VSCode `code .` and open to `server/index.ts`. In this file we'll begin to configure your web server as we did in lecture today.

First, you'll need to import `express` and `express-handlebars`:

~~~typescript
import * as express from "express";
~~~

Then, you'll need to initialize a new Express app with the `express` function.

~~~typescript
let app = express();
~~~

Next, you'll want to serve static files from the `dist` directory which parcel builds from our `npm run build` command. Just as described in lecture, you'll use Express' [static](https://expressjs.com/en/starter/static-files.html) middleware to do so.

~~~typescript
app.use(express.static("dist/"));
~~~

Before you add the view engine and routes for your individual pages, let's test to be sure your static files are being served properly. We'll need to tell the Express app to begin listening on port `1234` and then we'll add a `start` command back to package.json. Still in `server/index.ts`, listen on port 1234:

~~~typescript
app.listen(1234, () => console.log("Listening on 1234"))
   .on("error", (e) => console.error(e));
~~~

Then, in `package.json`'s scripts, add a `start` script command to run your server:

~~~
"scripts": {
    "start": "ts-node server/index.ts",
    "build": "parcel build client/{*.css,gallery.tsx,main.ts}"
}
~~~

You should see "Listening on 1234" printed (if you get an error, be sure you do not have a Parcel server or another conflicting server running). Once you do, try opening your browser to `http://localhost:1234/main.js` (or choose some other filename in your `dist` folder). Once you've confirmed your static assets are serving out of `dist`, you can stop your server and continue on.

## Setting up Handlebars Views

As discussed in lecture, you're encouraged to use [Handlebars](https://handlebarsjs.com/) as our server-side views library (though if you'd like to go your own way with views, that's totally fine, too). To begin with, you'll need to import the `express-handlebars` plugin in the `imports` area of your file.

~~~typescript
import * as exphbs from "express-handlebars";
~~~

Next, after you initialize your `app` variable, register Handlebars as the view engine Express should use. We'll establish a few configuration settings, as in lecture, too.

~~~typescript
app.set("view engine", "hbs");
app.set("views", "server/views");
app.engine("hbs", exphbs({
    defaultLayout: "default",
    extname: "hbs",
}));
~~~

Notice there's an additional setting we did _not_ need in lecture today, which was setting the `views` directory of Express to be `server/views`. That's because our server-side code is now in a subdirectory for the blog project.

Let's go ahead and add a home page route to Express, after registering the `static` middleware, and respond by rendering the `index` template you'll setup next.

~~~typescript
app.get("/", (req, res) => {
    res.render("index");
});
~~~

Great, now in the `views/layouts` directory, let"s add a basic template just to get started. Once you"ve confirmed Handlebars is properly working, you'll want to make this file contain the HTML layout pages of your site share.

Create a new file in `server/views/layouts` named `default.hbs`. Save its contents as:

~~~html
<html>
    <body>
        {{{ body }}}
    </body>
</html>
~~~

Then, create another file in `server/views` named `index.hbs`. Save its contents as:

~~~html
<h1>Handlebars is working!</h1>
~~~

Now, stop your server, if it was still running, and restart it with `npm start`. (Note: the `start` script is special in `npm` and can be run with either just `npm start` or `npm run start`. All other script names require `run` to be the first argument to `npm`.)

When you havigate to `http://localhost:1234/` you should now see "Handlebars is working!".

Let's go ahead and make a commit, but we'll do it in a special way using a separate branch from `master` so that pushing to GitHub does not break your Netlify site (ultimately we're moving away from Netlify to AWS, but we'll do so in a way using redirects so that your parents/stans don't get 404ed).

~~~
$ git checkout -b server-side
$ git add .
$ git commit -m 'Progress on server-side!'
$ git push origin server-side
~~~

The commands above setup and checked out a new git branch named `server-side`. Then you made a commit and finally pushed this new branch to GitHub. If you were to view your project's GitHub page now, you would see in your Branch dropdown button the `server-side` branch you just pushed. This should not cause a deploy on Netlify.

## Establishing Your Site's Layout

From this point in the lab you'll do the heavy lifting. Your first task is to get your site's layout.hbs file setup. Open your `client/index.html` (or whatever filename you gave your home page) and copy its content into `server/views/layouts/default.hbs`.

Then, move the _content_ of the page that is not shared between multiple pages on your site, into the file `server/views/index.hbs`. Where your content was in the default layout, you'll want to replace with the `{{{ body }}}` placeholder.

If you refresh your site in the browser, you should see your site showing up! If you open the developer tab you _may_ notice a 404 error if your home page included a ".ts" file as a script. Try renaming that ".ts" to ".js" because now your `dist` folder has compiled JavaScript files.

## Adding Routes for Gallery and Bucket List

Next, you'll want to add additional routes to your `index.ts` Express server for your gallery and bucket list pages. Each should render a respective template. You'll need to move the HTML content from those files in `client` to the Handlebars templates. Remember, your default layout still has all of the common components to them. In the Gallery page, you'll need to be sure to rename the ".tsx" extension of your script _also_ to ".js" because it was compiled to plain JavaScript, as well.

## Updating your Navigation Links

Your navigation links likely end in ".html". To a seasoned, Danish-minimalist trained web developer like you this demonstrates a simple static site. Your routes shouldn't have `.html` and will feel more professional for it. You'll need to update the `href` attributes of your navigation to reflect your new routes in the Express app.

## Customize your `<title>` Tag per Page

Because your `<head>`'s `<title>` tag is located in your default layout, you'll likely want to populate it with the value coming from your route so that the tabs in your web browser reflect your currently open page. Add a template variable in your layout, such as `{{ title }}`, and pass along a value for this variable from each of your routes. Look toward the examples from lecture for an idea on how to do this.

## Help each other!

There are a lot of moving parts in transitioning a project from a simple, static HTML project to one that involves server-side rendering. Help each other out!

Once your site is working on your personal machine, go ahead and make another commit and push it to your `server-side` branch on GitHub:

~~~ 
$ git add .
$ git commit -m 'Server-side rendering working!'
$ git push origin server-side
~~~