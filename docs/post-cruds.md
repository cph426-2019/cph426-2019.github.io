---
id: post-cruds
title: Blog Post CRUD Operations
sidebar_label: Blog Post CRUD Operations
---

In this problem set, you will add the ability to:

* _C_reate
* _R_etrieve / List
* _U_pdate
* _D_elete

Blog Post entries from an admin interface.

## Getting Started

You should go ahead and commit progress in your project before moving forward.

## The Overarching Goal

Following a similar structure to how we worked through adding an admin area for managing Todos, you are to build out an admin area for managing Blog Posts.

Your routes structure should mimic that of the routes for Todos:

1. `GET /admin/posts` - List all blog post entries ordered reverse chronologically.
1. `GET /admin/posts/:id` - View the editor of a blog post.
1. `POST /admin/posts/:id` - Update an existing blog post.
1. `GET /admin/posts/new` - View the editor of a new blog post.
1. `POST /admin/posts` - Create a new blog post.
1. `POST /admin/posts/:id/delete` - Delete an existing blog post.

You should add a link from your admin home page `/admin` to bring you to blog posts. You should also be sure details like the breadcrumb navigation are updated to reflect posts.

The date formatting of MySQL's date fields is strict. Failing to enter an appropriate format will cause the MySQL query to fail. You can assume the use correct date formats are used when you're testing the implementations of your routes above. For a real world app you would want to improve this user experience (and is a suggested idea for extension below).

## Commit

Make a commit, push to your `server-side` branch, and respond on Gradescope to the questions about this PS.

## Ideas for Improvements 

### Improve the User Experience of Managing `publishAt`

In the future, you should be able to use a `datetime-local` input type ([documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local)), but browser support is still on shaky grounds.

For now, one option would be to try adding some client-side JavaScript validation code to parse the `publishAt` field and ensure it is valid before posting. You can use the `moment` library (installation discussed in the previous assignment) to parse various time formats. To prevent a form from posting, you'll need to add an event listener to its `submit` event and [preventing its default behavior](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event#JavaScript). Ideally, you should surface the problem to the user, as well.

Alternatively, you could try searching for and setting up a custom date picker widget on your own. There are likely some decent react controls for date picking out there.

## Improving the User Experience of Managing `body`

Editing HTML in a text area is a really bad experience. Instead, try installing an setting up a WYSIWYG editor that produces the HTML for you. A popular, modern example of such a plug-in is [Quill](https://quilljs.com/).