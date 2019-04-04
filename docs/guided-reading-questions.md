---
id: course-materials
title: Course Materials & GRQs
sidebar_label: Course Materials & GRQs
---

## Getting Started

Guided Reading Questions (GRQs) and Lecture materials are distributed via `git` in a way that permits you to have your own private fork of the official course repository you can push (and thus backup) your work to.

### Fork the Official Repo

To begin, you'll need to establish your own private fork of the `590-material` repository by following this starter link: <https://classroom.github.com/a/xnJ-6sSM>

This will establish a private repository named `590-material-<your-github-name>` on GitHub. Find the SSH end-point to "Clone or Download" your URL, it will be `git@github.com:comp590-19s/590-material-<your-github-name>` and copy it to your clipboard.

### Clone the Fork in your VM

You'll need to boot and log in to your VM from here. See the instructions on the [Virtual Machine FAQ](http://localhost:3000/docs/vm-faq#operating-the-vm) if you need a reminder.

Once logged in, from your home directory clone the repository whose URL you copied above:

    cd ~
    git clone <paste the git@github.com... url>

*Windows reminder, to paste in Git Bash you'll need to right click paste or press the Shift+Insert keys.*

When you run the `git clone` command it is downloading the repository into a subdirectory. You will need to change your working directory to be the repository you just cloned:

    cd 590-material-<your-github-username>

### Add the Official Branch as the `upstream` Remote

Now that you have your own private fork you can and should make commits to it after each lecture, after you've completed GRQs, and after you've spent time on any sandbox projects. You should also push your commits regularly to your private repository. This is primarily for backup purposes to ensure your work is safely backed up to GitHub.

In order to pull changes from our official repository as the semester goes on into your fork of it, you'll need to add ours as a remote repository. When you cloned the repository, your fork was setup as the `origin` remote repository by default. It just means *your* private GitHub repository is `origin`. You can add the course's official repository as the `upstream` remote with the following command:

    git remote add upstream git@github.com:comp590-19s/590-material.git

Now your repository has two registered remote repositories. You can see them listed with the following command:

    git remote

To see the details of any given remote, you can use `git remote show <remote name>`, for example:

    git remote show origin
    git remote show upstream

The names `origin` and `upstream` are only conventions. Like variable names, you could remove them and add them back with completely different names. 

## Pulling Changes from `upstream`

Before each lecture or after a set of GRQs is released, you will want to `pull` these changes from our official repository you've established as the `upstream` remote in the steps above. To do so, first be sure you are in your folder with the `pwd`, print working directory, command. If your working directory is not: `/home/vagrant/590-material-<you>`, then first navigate there:

    cd ~/590-material-<you>

Then, use the following command:

    git pull upstream master

This command pulls the `master` branch, which is where we will be making official commits, from the official `upstream` repository into your local VM repository. You will often be notified you need to create a merge commit. Simply press `Control+X` if so and the changes from the `upstream` repository will be merged into yours.

## Guided Reading Questions 

### Working on GRQs

After guided reading questions are posted, you'll need to pull the GRQ template from `upstream` using the process above.

This will add the GRQ markdown file to the `grqs` directory. To work on the GRQ, navigate into the directory in your terminal and open the file in `vim`:

    cd grqs
    ls
    vim <name-of-grq-file>.md

The file format of GRQs is a little language called markdown. [You can read more about it here](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet). 

Using `vim` you'll want to be sure to change the author name and replace any "Your answer here..." lines with your responses to the questions.

### Generating PDFs for Hand in

Once you've completed your GRQs you will use the `pandoc` utility to convert the markdown file to a PDF. You will set the `-o` output flag of `pandoc` to be in the `/vagrant` directory so that your generated PDF file is accessible from your host machine. For example:

    pandoc -o /vagrant/<name-of-pdf>.pdf <name-of-grq-markdown-file>.md

Choose any name for the pdf you'd like, ideally something identifiable as the specific GRQ you just completed.

Once you've done this, a PDF file of your GRQs was generated and is accessible from your host machine.

On Windows, open a File Explorer and navigate it to the directory where your `comp-unc-vm` was setup. You should see a PDF file there. 

On Mac, open Finder and nagivate to the directory where your `comp-unc-vm` was setup. You should see a PDF file there.

Read over your PDF and make any changes by repeating the process above. Upload it to Gradescope once complete.

## Backing up Your Work

After you've completed exercises in lecture or worked on GRQs, you should add the changes you made to a commit and push that commit to your private repository. The workflow will generally look like this:

    git status

This shows you all of the files that have changed since your last commit. Next you'll add the files you want to commit.

    git add <file you want to commit>
    git add <file you want to commit>
    # ... add all the changed files you want
    git status

When the `git status` command completes you should see files ready to be committed. To make a commit, which is like a saved checkpoint of your project, run the `commit` command:

    git commit -m "<some description of the work you just completed>"

Finally, to push your work to your private GitHub fork:

    git push origin master

Notice here `origin` is the name of your personal, forked repository.
