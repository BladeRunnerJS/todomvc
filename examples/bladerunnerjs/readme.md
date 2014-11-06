# BladeRunnerJS TodoMVC Example

> BladeRunnerJS (BRJS) is an open source development toolkit and framework for modular construction of large single-page HTML5 apps. It consists of a set of conventions, supporting tools and micro-libraries that make it easier for teams to develop, test, deploy and maintain complex JavaScript apps.

> _[BladeRunnerJS - bladerunnerjs.org](http://bladerunnerjs.org)_


## Learning BladeRunnerJS

The [BladeRunnerJS website](http://bladerunnerjs.org) is a great resource for getting started.

Here are some links you may find helpful:

* [Documentation](http://bladerunnerjs.org/docs/)
* [API Reference](http://apidocs.bladerunnerjs.org/)
* [Applications built with BladeRunnerJS](http://bladerunnerjs.org/docs/reference/example_apps/)
* [Blog](http://bladerunnerjs.org/blog/)
* [FAQ](http://bladerunnerjs.org/faq/)
* [BladeRunnerJS on GitHub](github.com/BladeRunnerJS/brjs/)

Articles and guides from the community:

* [Getting Started with BladeRunnerJS](http://bladerunnerjs.org/docs/use/getting_started/)
* [Building a Todo MVC app with BladeRunnerJS and Angular](http://bladerunnerjs.org/blog/using-angularjs-with-bladerunnerjs/)

Get help from other BladeRunnerJS users:

* [BladeRunnerJS on StackOverflow](http://stackoverflow.com/questions/tagged/bladerunnerjs)
* [BladeRunnerJS on Twitter](http://twitter.com/bladerunnerjs)
* [BladeRunnerJS on Google +](https://plus.google.com/108556511900055348789/)

_If you have other helpful links to share, or find any of the links above no longer work, please [let us know](https://github.com/tastejs/todomvc/issues)._


## Implementation

BladeRunnerJS (BRJS) is a toolkit for building large front-end applications out of isolated pieces of functionality called [blades](http://bladerunnerjs.org/docs/concepts/blades). You can think of Blades as a structure to support component development that encourages loose coupling. As such the Todo MVC application has been broken down into three blades:

* Input - for inputting the todo item
* Items - for displaying the existing todo items and editing them
* Filter (the footer) - for applying filters to the list of items

Blades are built in isolation in [workbenches](http://bladerunnerjs.org/docs/concepts/workbenches/) and cannot reference code that is defined in other blades. If a blade tries to do this the toolkit will identify the problem and refuse to build the app. This ensures that blades are loosely coupled. Finally, blades are not tied to any particular library or framework. This example provides all blades implemented using Knockout and Angular. And any of the blades can be used in combination e.g. the Knockout input blade and the Angular items and filter blades can co-exist within the same application. In this example [bladesets](http://bladerunnerjs.org/docs/concepts/bladesets/) have been used to group blades by-technology.

The loosely coupled communication is supported by a small JavaScript framework that comes with the BladeRunnerJS toolkit. It provides a services layer in the form of a [ServiceRegistry](http://bladerunnerjs.org/docs/concepts/service_registry/). In this implementation a Todo Service is registered with the ServiceRegistry and offers todo-specific functionality that is used by all of the Blades.

## Running

You can run the built versions of the application by spinning up an HTTP server in the `examples/bladerunnerjs/public` directory and navigating to http://localhost/knockout/ for the Knockout example and http://localhost:8000/angular/ for the Angular example and http://localhost/mixed/ for the mixed example that uses both Knockout and Angular components.

You can run the application from source by downloading BladeRunnerJS, moving the `examples/bladerunnerjs` folder into the `apps` folder in the BladeRunnerJS unzipped archive, running the `brjs` executable found in the `sdk` folder and navigating to http://localhost:7070/todomvc/knockout/ for the Knockout example, http://localhost:7070/todomvc/angular/ for the Angular example and http://localhost:7070/todomvc/mixed/ for the mixed example that uses both Knockout and Angular components.


## Credit

This TodoMVC application was created by [the BladeRunnerJS team](http://bladerunnerjs.org/about/team/).
