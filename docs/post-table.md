---
id: post-table
title: Blog Post Table Assignment
sidebar_label: Blog Post Table Assignment
---
In this problem set, you will establish a table for your blog's posts, populate your blog content via MySQL Workbench, and then generate your blog's content from your database.

## Backing up your Blog Content

Your blog content is safely in your repository history in the event of an issue. However, part of this problem set will involve replacing your blog's hard-coded content with a template that renders data from the database. As such, you may just want to make a copy of your template file that contains your blog post content.

## Setting up the Blog Post Table

In MySQL Worbench, connect to your database. 

In your database schemas tab, right click on Tables and select Create Table.

Create a table with at least the following columns. You can add other columns, if needed:

Table Name: `posts`

Columns:

| Column Title | Type       | Options                              |
|--------------|------------|--------------------------------------|
| `id`         | `INT(11)`  | Primary Key, Non-Null, Auto-Increment|
| `title`      | `TEXT`     | Non-Null                             |
| `body`       | `TEXT`     | Non-Null                             |
| `publishAt`  | `DATETIME` | Non-Null                             |

Apply the changes to create the `posts` table to store your blog's content.

## Adding Blog Post Content

Next, you'll want to migrate your blog post's HTML content (as best you can) from your template to MySQL. To do so, you should select all rows of you `posts` table and then begin editing a new row.

There are a couple of caveats when adding content through MySQL Workbench. 

First, entering HTML can be difficult and there are two strategies.

1. Check to see if your version of MySQL workbench has a "Form Editor" tab. If so, select it.

2. If you do not have a "Form Editor" tab, after entering your post's title, right click on the `body` area and look for an option to "Open Value in Editor". Be sure you're in Text mode and not Binary mode. Then you can paste HTML into this area and continue editing.

Second, date time formatting in MySQL (and in most programming environments!) requires precise formatting. When dating a blog post, use the format, 2019-MM-DD, should you want time, as well, the format is YYYY-MM-DD HH:MM:SS, and for good measure you should assume the timezone is +0000 Greenwhich Mean Time.

Apply your changes after your first post to be sure your input will work. Then continue on to add your other posts (you can also come back to this step).

## Querying Blog Posts from the Database

In the route of your website that displays blog posts, before rendering the view template, add a query to your database to select all columns and rows from your `posts` table. Your query will look like the one for `todos`, but you may want to add an additional sorting criterion to guarantee your posts are sorted by `publishAt` date in descending order no matter what order you added them to the database:

`SELECT * FROM posts ORDER BY publishAt DESC`

Update your blog post template to display posts from this database content as opposed to hard-coded into your HTML.

If the date formating of `publishAt` is not to your liking, you may want to `map` your `rows` before rendering your `view` and making use of the `moment.js` library to handle your formatting. To get started with moment, you'll want to install it:

`$ npm install --save moment`

Read more about moment's API for parsing and formatting here: https://momentjs.com/docs/#/parsing/

Once you've got your blog posts showing up and pulled from your database, commit, push to `server-side`, and try `$ npm run deploy` from your local machine. If your site isn't fully operational, don't fret, it's likely an issue with the `.env` file on your server. You can try diagnosing by logging into your server (`ssh blog`), navigating into your travel-notes directory, and opening the `.env` file in your text editor of choice (`nano` or `vim`). The values should be:

~~~
NODE_ENV=production
PORT=80
MYSQL_HOST=127.0.0.1
MYSQL_USER=blog_app
MYSQL_DB=blog
MYSQL_PASSWORD=<the password you setup>
~~~

Once your `.env` file is properly set, try doing a `sudo service blog_app restart` to try restarting your app and giving it a minute to build and start up. If you're still out of order, don't fret, we can fix production in the morning.

## Gradescope

Please submit on Gradescope once complete!