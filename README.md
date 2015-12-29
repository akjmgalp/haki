Hybrid Inconsistency Management Tool for AngularJS : HAKI
=========================================================

This is the source code for the Haki, the tool for Inconsistency Management of AngularJS projects. It is developed by Ibrahim Bilge for his MSc thesis.
For more information please visit [Thesis Page](http://www.kodrehberi.com/haki).

Haki is about finding inconsistencies between software parts particularly view and controller. Some features are:

* Finds and matches controllers with views
* Gathers Angular spesific attribute values
* Gathers custom directive values
* Evaluates these values in its scope.
* Creates a final report with errors and warnings in it.

Haki uses both static and dynamic analysis of the source code so it is called an hybrid tool.

To try the code on your computer:
---------------------------------

1. Install [Node.js v5.3.0](http://nodejs.org).
2. Install [Git](http://git-scm.com).
3. Open a command prompt.
4. Change to the directory that will contain the project.
5. Copy the source repository to your computer: 'git clone https://github.com/akjmgalp/haki.git'

To run the build:
-----------------

1. Type 'jake' in your command prompt.

To run the tests:
-----------------

1. Type 'jake test' in your command prompt.

Please note that this is a progressing study while you evaluating haki.