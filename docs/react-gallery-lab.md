---
id: react-gallery-lab 
title: React Photo Gallery Lab
sidebar_label: React Photo Gallery Lab
---

## Purpose

The purpose of this lab is to gain experience integrating React components with a website and extending those components to have additional functionality. You will incorporate the React Gallery demo from lecture into your personal site and extend it to have photo captions and a visual affordance of the currently selected thumbnail. Demo: http://localhost:57565/gallery.html

## Getting Started

### Installing React Libraries and Types

In your personal website project, let's begin by adding our new library dependencies to the project. Install React, ReactDOM, and their TypeScript bindings with the following command:

~~~
$ npm install --save-dev react react-dom @types/react @types/react-dom
~~~

### Static Files Directory

Next, the photo gallery is going to depend on static image and thumbnail files which Parcel is not able to find automatically the way it is your `ts`, `tsx`, and `css` files. Conveniently, though, there's a plugin that will copy everything in a directory named `static` to the `dist` directory when our project is built called `parcel-plugin-static-files-copy`. Let's add this development dependency to our project, as well:

~~~
$ npm install --save-dev parcel-plugin-static-files-copy
~~~

You'll want to create a new top level directory in your project, a sibling directory to `src`, named `static`. Inside of this directory, create another named `img`. To get started, go ahead and copy over the image files from `426demos/09-react-gallery/static/img` to your project's `static/img` directory.

### Gallery HTML Page

Add a `gallery.html` page to your `src` directory alongside your other HTML pages. You are encouraged to copy your site's general HTML structure and then add an empty `div` tag with an `id` of `galleryContainer` where you'd like your `Gallery` to be placed.

### Starter Styles

To get started with style, copy and paste over the rules starting with `.gallery__...` from `src/styles.css` from the lecture demo. You not need to tweak styles beyond those supplied, but you are encouraged to!

### Data.ts

In your `src` directory, create a subdirectory named `script`. Copy over the `Data.ts` file from the lecture demo in the same directory.

### Adding `gallery.tsx`

Add a new file in `src` named `gallery.tsx` and copy the contents of `main.tsx` from the lecture demo to it. Finally, you'll need to add a `script` tag to your `gallery.html` page whose `src` is `./gallery.tsx`.

At this point, you should now be able to start Parcel with the `npm` script you setup last night: `npm run start`. When your browser opens, navigate to `localhost:PORT/gallery.html` and you should have the React Photo Gallery we worked on running in your site!

Before continuing further, you'll want the gallery to work without errors in your console. At this point you should also make a commit to your project, push it to GitHub, and get a successful Netlify deploy.

## Part 2. Extending the Gallery

### Add Links

Add a link to the Gallery from the other pages of your site's navigation.

### Add Your own photos

Replace the files in the `static/img` with at least 3 of your own. You'll want to create two versions for each image in your gallery: a larger sized version and a thumbnail version. At least the thumbnail version should be resized using an image resizer to have a maximum width or height dimension of 128px. Search for a free online jpg image resizer if you have not resized an image to specific dimensions before.

As you create your photos and their thumbnails and add them to your `static/img` directory, you should update your `src/script/Data.ts` file to reference the filenames of the images you create for your Gallery. Be careful that your filenames and the names in `Data.ts` match exactly or else you'll get broken images in your site.

Warning: After you add your new images and thumbnails, you will need to stop your parcel server and restart it. The plugin that copies your `static` directory to your production `dist` directory only runs once on startup.

### Add Captions to Your Images

In `src/script/Data.ts` - add a caption string property to each of your images.

Update your `gallery.tsx` so that the `Image` type has a caption property, as well. Finally, update your `Gallery` component to display the caption of the currently selected photo. You can use the following HTML in your TSX file between your master list and detail:

~~~html
<div className="gallery__caption">
    Caption goes here.
</div>
~~~

To center your caption, add the following rule to your CSS:

~~~css
.gallery__caption {
    text-align: center;
}
~~~

For a demo of simple captions, check out: https://kris-travel-notes.netlify.com/gallery.html

### Add a `selected` prop to the `Thumbnail` component

In the MVVC demo, the currently selected thumbnail was given a `selected` class. Next you'll do the same for your React gallery.

Add a `selected` property to your `Thumbnail` props. Its type is `boolean`. This will introduce an error in your Gallery component. You can resolve it in Gallery by adding the prop/attribute `selected={true}` when you create each thumbnail. You can fix this later.

Next, you'll want to update your `Thumbnail` component's `render` method such that when its `selected` prop is `true` its outtermost element's `className` prop is the string `"gallery__thumb selected"`. When `selected` is false, the `className` should just be `"gallery__thumb"`. To make a selected Thumbnail very clearly visible in your browser, you can update the selected CSS rule to use a more obvious color while developing, such as:

~~~css
.gallery__thumb.selected .gallery__thumb-img-wrap {
    background: #C60C30;
}
~~~

Once your `Thumbnail` component shows it is selected, your job is to fix the `Gallery` component to correctly assign a value of `true` to _only_ the currently selected `Thumbnail`.

### Commit, Push, Submit and then Make it yours

Once you've reached this point you've completed all of the work necessary for this assignment. Congrats, you've integrated React components into your website and extended them! Go ahead and make a commit, push it, check your deploy on Netlify, and respond to the couple of questions on Gradescope.

You are encouraged to add more photos, tinker with the design and interactivity of this photo gallery, though!