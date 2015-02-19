/**
 * Online Arboretum Application
 * Hattiesburg Software Developers Meetup
 *
 * 2/19/2015
 * Author: Wes King
 */

// To start things off, we run our entire application within an instantly running, self-executing function.
// We do this because JavaScript utilizes function scoping.  Any variables declared within this function are considered
// private in relation to the global scope.  To make our application accessible, we will attach it to the window object
// to make it publicly available in the global scope of our application.
(function($, Backbone, _, window) {

    /**
     * Arboretum Object
     * Extends Backbone.Model
     *
     * I chose to extend a model for the purpose of fulfilling the "controller" paradigm of our app due to some of the
     * highly useful event bindings that Backbone models come with.  If we were to desire to add an info pane for
     * individual trees in the future, I can set a "current_tree" attribute on this model that will render a new info
     * info view for each tree based on binding to a "change" event for this model.
     */
    var Arboretum = Backbone.Model.extend({

        // initialize is called on object construction
        initialize: function() {
            this.Trees = new TreeCollection;
            // Backbone collections have events that can be bound to them
            // You'll find that this is similar to the Object.observe() pattern proposed in ECMA7
            // This event binding allows my app model to render the tree map every time a change is made
            this.Trees.on('add remove reset', this.renderTreeMap, this);
        },

        // All functions declared below this comment are custom instantiated functions that we wish to extend
        // to our object once it is constructed
        addTrees: function(tree) {
            return this.Trees.add(tree);
        },

        getTree: function(tree_id) {
            return this.Trees.get(tree_id);
        },

        removeTree: function(tree_id) {
            return this.Trees.remove(tree_id);
        },

        renderTreeMap: function() {
            // Clear the map container and add the map image back in
            $('.map-container')
                .empty()
                .append('<img class="img-responsive campus-map" src="img/campus-map.png" alt=""/>');

            // Iterate our collection of tree models and build new views based on their attributes
            this.Trees.each(function(tree_model) {
                var TreeView = new TreeMarkerView({
                    model: tree_model
                });
                // Set the container for our TreeView object and call render()
                TreeView.setElement('.map-container').render();
            })
        }
    });

    /**
     * TreeCollection object
     * extends Backbone.Collection
     *
     * This object extends the Underscore.js collection object, so you can use all of the same methods from
     * _.js collections on Backbone collections for data processing and aggregation.
     */
    var TreeCollection = Backbone.Collection.extend({

    });

    /**
     * TreeMarkerView object
     * extends Backbone.View
     *
     * This contains two primary functions, a template function to build our markup from our model attributes and a
     * render function to define the rendering behaviors of said template
     */
    var TreeMarkerView = Backbone.View.extend({

        template: function(serialized_data) {
            // A quick hack for defining JavaScript HTML templates on the fly that make sense
            var source = [
                '<a>',
                    '<div class="map-node" style="left: {{x}}%; top: {{y}}%;">',
                        '<div class="pin"></div>',
                        '<div class="pulse"></div>',
                    '</div>',
                '</a>'
            ].join('\n'); // Join the array with newline separators

            // Quick shortcut in Handlebars.js to return a template with a double resolution
            return Handlebars.compile(source)(serialized_data);
        },

        render: function() {
            // This $el parameter is a jQuery wrapped event selector set in the renderTreeMap function of our app model
            this.$el.append(this.template(this.model.attributes));
        }

    });

    // We attach our app model to the window object that we passed in via our self executing function
    // Once it's attached to the window, we now have the option to access it globally within the page.
    window.Arboretum = new Arboretum;

})( jQuery, Backbone, _, window );
