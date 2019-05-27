---
id: netlify-parcel 
title: Netlify Parcel Build
sidebar_label: Netlify Parcel Build
---

# Setup Build

Now that we're moving beyond plain-old HTML and CSS, we need to "build" our projects. In this tutorial we'll setup our project to a Node.js project that is built with [Parcel]. We'll no longer serve our assets directly on Netlify, we'll serve compiled assets.

[Parcel]: https://parceljs.org/

First, let's move our `public` directory to be our `src` directory. From the command line, try running the following _move_ command in `bash`:

~~~bash
mv public src
~~~

In VSCode you should see your `public` folder renamed to `src`.

## .gitignore - Ignore generated files

In our `git` project repository it's generally a best practice to _only_ store source files and not generated files. The easiest way to ignore files in `git` project commits is to setup a base file named `.gitignore` and list one ignored files/pattern per line. In VSCode, right click outside of the public folder in the File Explorer pane and select "New File". Name it `.gitignore` (you should be able to collapse the public directory and still see the `.gitignore` file).

Add the following lines to `.gitignore`:

~~~
node_modules/**
dist/**
.cache/**
~~~

Save your file. It will be included in the next git commit.

## Initialize your project's `package.json` file with `npm init`

In the terminal, be sure you are in your travel notes directory (try `pwd` to print your working directory). Then run `npm init`. You can press enter for each of the prompts to accept default settings. Doing this will generate a `package.json` file in the root directory of your project. This file is important to `node.js` as you'll soon see. Think of it as a description of your project, its dependent libraries, and any special commands your project needs.

## Install `parcel` development libraries

We're using `parcel-bundler` to serve as our project build tool. Add it to your project's development dependencies (meaning, it's only needed when you are developing your project it is not needed in production) with the following command:

~~~
$ npm install --save-dev parcel-bundler
~~~

Now, if you look in `package.json`, you'll notice `parcel-bundler` was added to the `devDependencies` part of the file along with its current version. You'll also notice this looks like JavaScript object and array literals! This is JSON, or JavaScript Object Notation, a common format for expressing and exchanging information between programs made popular by JavaScript's rise.

## Test a project build

You should now be able to build your project using `parcel` and the following command:

~~~
$ parcel build src/*.html
~~~

If there are errors in this command you will need to resolve them before continuing. When it parses and builds HTML it will check for correct closing tags, and so on, to be sure you have valid HTML.

Once you can run the above command without errors, you should now see a `dist/` directory that has your project's compiled assets.

## Adding `npm` commands

In the `package.json` file, you will see a top-level property named `"scripts"`, whose value is another object where keys are the name of a script and values are the actual command-line operation being executed when that script is run. By default there is a test script with an error. Let's remove the `"test"` script add a few useful scripts when working with a `parcel` project:

~~~
"scripts": {
    "start": "parcel src/*.html --open",
    "build": "parcel build src/*.html"
},
~~~

Now, after adding these scripts to your `package.json` file, you can run the following commands:

~~~
$ npm run build
~~~

The `build` script builds the project in the `dist` directory. Soon we'll configure Netlify to run this command every time you push your project.

~~~
$ npm run start
~~~

The start script is configured to run `parcel src/*.html --open` which starts `parcel` and targets each of your `html` pages. To view your `index.html` file, you'll need to specifically open `localhost:[port]/index.html`.

To quit your server, back in the terminal, press Ctrl+C.

## Netlify Configuration

Currently your Netlify site serves assets directly out of your projects (former) public directory. Now, when Netlify deploys your site we first want it to run `npm run build`, then we want it to serve your site out of the `dist` directory. We can make these configuration changes in our project by adding a configuration file named `netlify.toml`. Add a new file to the base directory of your project named `netlify.toml` and add the following configuration rules:

~~~
[build]
    # Root of package.json, etc
    base = "./"
    # The command to run production build
    command = "npm run build"
    # Publish directory
    publish = "dist/"
~~~

Once you've added this, go ahead and make a commit and push to test your deploy settings on Netlify.

~~~
$ git add .
$ git commit -m 'Add parcel build pipeline and update netlify to use build.'
$ git push origin master
~~~

If you open Netlify, go to your project, you should see your latest commit show up in the production deploys list either in the process of building, built with success or an an error. If you click on the deploy and scroll down you'll see the log of steps the build took. Somewhere in there you should see `parcel-bundler` being installed followed by `npm run build` later on. This is a log of the steps Netlify is taking to prepare your commit for a production deploy by building it with `parcel`. If it does not succeed, check over the steps above and see if you can diagnose the reason why based on error messages.

If you visit your blog site it should still work. If you inspect your HTML using Chrome's web inspector tool, though, you'll see that the link tags link to compiled and minified CSS files for production. Parcel built these files, copied, and updated your HTML into the `dist` directory which Netlify is now using. If you open the CSS file you'll see it's "minified" with extraneous whitespace removed to reduce its filesize.

If you're this far, great! That means we've got Netlify configured to build our process and Parcel is successfully building it. The last thing we'll do is ensure we can start using TypeScript with our blog project.

## Adding TypeScript

As we add interactive features to our website we need to use JavaScript or another language that compiles to JavaScript. We'll choose TypeScript, which is the latter. To add it to our project, let's add it:

~~~
$ npm install --save-dev typescript
~~~

This installs TypeScript as a development dependency.

Then, create a file named `main.ts` in your `src` folder. Establish a `main` function such as:

~~~typescript
export let main = () => {
    let message: string = "Hello world, from TypeScript :)";
    console.log(message);
};

window.addEventListener("load", main);
~~~

Next, from at least your `index.html` file, add a `script` tag to include your `main.ts` file before the close of its `body` tag:

~~~html
<script src="./main.ts"></script>
~~~

Finally, from the command line start your development server again: `npm run start`

You should be able to browse to the `.html` page(s) you added the `script` tag(s) to and see that your TypeScript is running (compiled as JavaScript) based on the message logged. If you do not see a logged message you will need to carefully check the steps above again.

Once you see your message logged, stop your development server in console with Ctrl+C.

Now, let's test our build process on netlify by making another commit, pushing, and checking the deploy log:

~~~
$ git add .
$ git commit -m 'Add TypeScript support to project.'
$ git push origin master
~~~

Shortly after you should see a deploy on Netlify show up. If you follow through your deploy log for this commit you'll see in the list of built assets after `npm run build` that the `main.<hash>.js` file was compiled from your TypeScript code.

If you now view your site's source code through the web inspector tool and find the `script` tag just before `body`'s closing tag, you should see a reference to the compiled `js` file. If you open it, you'll see it's minified JavaScript and buried in the mess (if you Control+F) is your 'console.log' statement compiled to JS. (You may notice that the optimizer even removed your local variable!)

# Summary

Once you've made it this far, congratulations! You've established a build pipeline for a modern TypeScript project using Parcel! In any project build pipeline there are a lot of moving parts. Parcel actually simplifies our lives quite a bit compared to more configurable tools like WebPack which achieve similar results _through even more configuration and steps_.

The upside to this is our code assets, including HTML if you view your page's source code, are all minified with whitespace removed. Additionally, we are able to program in TypeScript and have it compile on deploy to minified JavaScript.