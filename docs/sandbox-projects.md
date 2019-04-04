---
id: sandbox-projects
title: Sandbox Projects
sidebar_label: Sandbox Projects
---

If there's an idea you'd like to play around with, or a project you're following along with in the text, we encourage you to store your experimental Cargo/Rust projects in the `sandbox` folder of your personal `590-material` repository. Doing so, you can use `git` to `add`, `commit`, and `push` your experimental projects to GitHub for backup. Of course, GitHub now offers free private repositories, so you're welcome to organize and backup your experimental apps outside the `590-material` directory any way you'd like.

## Creating a Rust project

While logged into your VM, after following the getting started steps above, change your working directory to be:

    cd ~/590-material-<you>/sandbox

Then, use Rust's project tool belt utility `cargo` to initialize a new project:

    cargo new --bin sandbox-demo
    cd sandbox-demo
    find -type f

The `cargo new --bin sandbox-demo` command initialized a child directory named `sandbox-demo`, and generated two files in it. With the `cd` command, you navigated into the generated directory and using `find -type f` you printed the two files `cargo` generated. Try leaving off `-type f` and seeing the difference.

Notice the two files generated are:

    Cargo.toml
    src/main.rs

The first file, `Cargo.toml` is a configuration file for the project. The .toml extension implies it is a file of type "[Tom's Obvious, Minimal Langage](https://github.com/toml-lang/toml)." This format is a Little Language! It specifies some metadata about your project and its dependencies. The `Cargo.toml` file is given proper treatment in the text.

The second file, in the `src` directory, `src/main.rs` is the entrypoint to your program. You can open it in `vim` just like in the first Hello World problem set.

## Running and Testing Your Project

Cargo's commands for running and testing your project are straightforward:

    cargo run
    cargo test

Once your project is built, which `run` will do, or you can build your project without running it via `cargo build`, you can also directly reference and run the compiled program by name in your shell. For example, if the project was named `sandbox-demo` as above, you can simply run the command:

    sandbox-demo

Your program runs! How? We'll explain more about this in class. The short story is, if you perform the following commands:

    echo $PATH
    ls ./target/debug

The first command will show you all of the directories the shell is searching for to find a command named `sandbox-demo` when you ran it earlier (or *any* command, for that matter). Notice the last entry in that list is `./target/debug`, which is to say from within any Rust project, you can run its debug binary by typing your project's name.

The second command listed the files in the `./target/debug` directory. There are many intermediate artifacts of the build. You will see the executable program named `sandbox-demo` in this directory. When you build or run your compiled binary program is placed here by Cargo. Thus, when you run `sandbox-demo`, the shell is scanning through each of the directories on your `$PATH` and finally finds it in the `target/debug` directory.