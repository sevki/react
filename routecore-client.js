// Create a singleton context instance.
// This makes sense, as the entire environment is one page
var context = new RouteCore._PageContext();

function _wrap(cb, waitOn) {
    var self = this;

    // We wrap the callback with a Tracker.autorun and
    // React's render method.
    return function(ctx) {
        // Make the url field be avaliable on both the client and the server
        ctx.url = ctx.path;

        NProgress.start();

        if (self._computation)
                self._computation.stop();

        var wait = false;
        var sub = null;
        if (typeof waitOn !=='undefined') {
            sub = waitOn.call(context, ctx);
            wait = true;
        }



        // We want to rerun the render function every time
        // that any dependencies update. Thanks to React's lightweight
        // virtual DOM, we can get away with this.
        self._computation = Tracker.autorun(function() {
            if (wait) {
                if (!sub.ready()) {
                    return;
                }
            }

            var component = cb.call(context, ctx);
            // We are done (redirect occured). We can just return now
            if (context.finished)
                return;

            // No component was returned, let the server do its thing
            if (!component)
                window.location = ctx.url;

            // Render the component that was returned to the DOM
            // We don't want this to be reactive, as React will sometimes
            // re-render the DOM, calling these functions when not in
            // a computation.
            // This can be confusing, as any reactive data sources which
            // are accessed will not cause a re-render.
            //
            // Instead, you should use the RouteCore.ReactiveMixin mixin,
            // or create your React components with RouteCore.createClass()
            Tracker.nonreactive(function() {
                React.render(
                    component,
                    document.getElementById('-routecore-react-root')
                );
                NProgress.done()
            });
        });
    }
}

function rawRoute(path, cb, waitOn) {
        page(path, _wrap.call(this, cb, waitOn));
}

// Attach event listeners to the dom
Meteor.startup(function() {
    page();
});

// ~~~ INTERNAL EXPORTS ~~~
RouteCore._rawRoute = rawRoute;
RouteCore._context = context;
