/**
 * Online Arboretum Application
 * Hattiesburg Software Developers Meetup
 *
 * 2/19/2015
 * Author: Wes King
 */

(function($, Backbone, _, window) {

    var Arboretum = Backbone.Model.extend({

        initialize: function() {

        }

    });

    var TreeCollection = Backbone.Collection.extend({

    });

    var TreeMarkerView = Backbone.View.extend({

        template: function(serialized_data) {
            var source;

            return Handlebars.compile(source)(serialized_data);
        },

        render: function() {
            this.$el.append(this.template(this.model.attributes));
        }

    });

    window.Arboretum = new Arboretum;

})( jQuery, Backbone, _, window );
