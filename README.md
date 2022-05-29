# tcl-outline README

Show tcl procs and namespaces at the explorer's outline view

based on [perl-outline extension](https://github.com/hitode909/vscode-perl-outline) 

## Dependencies
Must have Tcl language support to use

## Features

For example if there is an image subfolder under your extension project workspace:

![Example](images/screenshot.jpg)


## Known Issues

* ~~Not showing under which symbols (proc/namespace) the curser is at.~~
~~(shows only if the curser is on the symbol decleration)~~
* Must have Tcl language support to use.
* the proc block might ended if there is string of close curly brackets ("}}}}") in the proc.

## Release Notes


### [0.0.3]
- improve regex to catch more procs types
- start curly bracket block 1 char before (in previous version the block started one char after the start bracket, which cause issue in case of empty procs *proc foo {args} {}* )


## If you encounter issues and bugs, please open issue in github, or write to me at
### SnirYehud@Gmail.com 




Dedicated to the great Tclers, Yoram and Ofer.


