---
id: vm-faq
title: Virtual Machine (VM) - Frequently Asked Questions
sidebar_label: Virtual Machine - FAQ
---

Categories:

- [Operating the VM](#operating-the-vm)
- [VM Capabilities](#vm-capabilities)
- [Common Issues Getting Started](#common-issues-getting-started)

## Operating the VM

### How do I start the VM?

You will need to open a terminal on your host machine and change your working directory, using the `cd` command, to be inside your  `unc-comp-vm` directory. From there two commands are required for getting started:

1. `vagrant up` boots up the VM
2. `vagrant ssh` logs you into the VM once booted

### I accidentally closed my terminal, how do I get back into the VM?

Once your VM is running, to get back in simply open another terminal, change its working directory to the `comp-unc-vm` directory, and issue the `vagrant ssh` command to log back in. 

You do not need to run `vagrant up` again because your machine is still booted and running in the background.

### Can I have multiple terminal sessions/windows/tabs into the VM simultaneously?

Yes, this is no problem at all. Simply follow the instructions above about getting back into the VM.

### How can I tell if I am logged into the VM in a terminal?

When logged into the VM, the "prompt string" of your terminal will display as a simple $ (dollar symbol). Typically, the default prompt string on your host machine will have additional information preceding the dollar symbol, like your username or the computer's name.

The prompt string on the VM (and your host machine!) is customizable and established by an *environment variable* called `PS1` short for "prompt string". While logged into either your host or the VM, try reassigning this environment variable:

    PS1="prompt> "

If you'd like to make your changes permanent, try editing your shell profile script in `vim` with the following command `vim ~/.bash_profile`.

### How do I stop the VM?

The steps for stopping the VM depends on whether your current terminal session is logged into the VM or not. Please see the notes above if you are unsure.

If you are logged into the VM, first you will need to end your VM terminal session to return to your host. To do this, run the command `exit`. This command causes the shell process to quit and returns you back to your host.

If your terminal session is on your host machine, you will need to be sure your current working directory is the `comp-unc-vm` directory, which it will be if you just `exit`ed the VM. The command to shut down the VM is `vagrant halt`.

### What happens if I forget to stop the VM?

Some of your computer's memory and CPU time will be allocated toward running the VM just like any other program. The idle state of your VM does not use many resources, though, so the cost of accidentally leaving your VM running is relatively small.

If you attempt to reboot your host machine while the VM is running you will likely receive an error message confirming you want to terminate the VM. We recommend *not* **terminating** the VM, and properly shutting it down using the steps above.

## VM Capabilities

### What programming languages and tools are installed on the VM?

The VM is loaded with programming languages and tools and you are encouraged to experiment with any! For the purposes of this course, we will not be able to cover them all.

Operating System: **Ubuntu Server 18.04**

Programming Languages

- Rust
- C and C++ (with both gcc and clang compilers)
- Python 3 (and 2)
- Jupyter Notebook (once started with `jupyter notebook`, accessible at 33.33.33.33:8888)
- JavaScript (`node` and `npm`)
- TypeScript (and `ts-node`)
- Ruby
- Scheme
- PHP
- Bash

Utilities

- `git` - Version control
- `gdb` - GNU Debugger
- `valgrind` - Memory leak detection and profiling
- `rsync` - Fast file transfers
- `htop` - Improved system monitor
- `curl` - HTTP request tool
- `zip` - Zip file compression

Documentation Tools

- LaTeX and TexLive
- `pandoc`
- `graphviz`

File Editor

- `vim` recent 8.0 release
- vim Plugins:
    - Vundle - modern plugin manager
    - YouCompleteMe - semantic autocompletion
    - Syntastic - syntax checking
    - Rust - Rust language plugin
    - NERDTree - better filesystem browsing
    - git Gutter - Visual indicators of changes since last commit show up in gutter beside line numbers
    - Surround - Easily change surrounding delimiters like parens and brackets
    - Lightline - Additional context information in the status bar
    - Gruvbox - A nicer theme for vim's colors than the default

## Common Issues Getting Started

### What should I do if VirtualBox fails to install?

Mac: If you're seeing a message regarding "The installation failed." when installing Virtual Box it is likely due to MacOS's default security settings blocking the installation of an application downloaded outside of the App Store. [Try following these instructions to complete the installation](https://medium.com/@DMeechan/fixing-the-installation-failed-virtualbox-error-on-mac-high-sierra-7c421362b5b5).

### What should I do if `vagrant up` has errors?

Look for the error message printed and see if yours has any of the following characteristics:

* **Error: Not in a hypervisor partition. VT-x is disabled in the BIOS**

    Many Windows laptops, including some CCI Lenovo Laptops, ship with an important virtualization feature of their CPU disabled. This feature is called [VT-x](https://en.wikipedia.org/wiki/X86_virtualization). You will need to search for and find instructions for "Enabling VT-x" specific to your laptop manufacturer.

    Students with CCI Lenovo laptops can [follow these instructions for enabling VT-x](https://support.lenovo.com/us/en/solutions/ht500006). 

* **Error: Terminated unexpectedly during startup [..] VBoxHardening.log** 

    This error message likely indicates an anti-virus or anti-malware program is tampering with the programs on your computer in an invasive way. You will need to create an exception for VirtualBox, disable, or uninstall the software at issue. [This thread was useful in attempting to resolve the issue](https://forums.virtualbox.org/viewtopic.php?p=388051#p388051). At least one student's issue went away by uninstalling "Trusteer Endpoint Protection".

    It may also suggest a corrupted install. If the above solution does not work, try reinstalling Virtual Box.