HAKI
====
The Tool for Runtime Verification of JavaScript MVC Applications
----------------------------------------------------------------

This is the source code for the Haki, the tool for Inconsistency Management of AngularJS projects. It is developed by Ibrahim Bilge for his MSc thesis.
For more information please visit [Thesis Page](http://www.kodrehberi.com/haki).

Haki finds inconsistencies between software parts particularly view and model. Some features are:

* Checks errors and warnings in data binding between html and the js code
* Finds and matches the models and the views
* Gathers Angular spesific builtin attribute values
* Gathers attribute values of custom web components
* Evaluates these values in related scope
* Creates a final report with errors and warnings in it.

Haki uses runtime analysis and currently requires:

* [JQuery](https://jquery.com/) for the DOM traversing
* [AngularJS](https://angularjs.org/) for the data bindings
* [UI Router](https://github.com/angular-ui/ui-router) for the page transactions

To try the code on your computer:
---------------------------------

1. Download angular-haki.min.js from src/production/ folder
2. Import it to your AngularJS project just after the AngularJS source code
3. Depend HAKI in your Angular module using its module name: 'ngHaki'

To contribute to the development:
---------------------------------
1. Install [Node.js v5.3.0](http://nodejs.org).
2. Install [Git](http://git-scm.com).
3. Open a command prompt.
4. Change to the directory that will contain the project.
5. Copy the source repository to your computer: 'git clone https://github.com/thebilge/haki.git'

To run the build:
-----------------

1. Type 'jake' in your command prompt.

To run the tests:
-----------------

1. Type 'jake test' in your command prompt.

Please note that this is a progressing study while you evaluating haki.