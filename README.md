# React
> This package is a fork of [https://github.com/mystor/meteor-routecore]. Please see the README there for implementation instructions - they're pretty much identical.

This package makes the following changes against `meteor-routecore`:

* Harmony and sourcemap flags for the .jsx compiler (mostly to prevent the need for a re-write of any ES6 components.)

* Deps.* features changed to Tracker.*

* Replaced deprecated React.renderComponentToString and React.renderComponent functions.

Dependencies updated:

* React@0.12.2
* meteorhacks:fast-render@2.3.1
* iron:dynamic-template@1.0.7

Note: Connect wasn't upgraded to v3 due to `meteorhacks:fast-render` relying on the v2 connect.cookieParser() middleware, which is now deprecated.
