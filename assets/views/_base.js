// we will use square-bracket mustaches for client-side templates
_.templateSettings = APP.config.templateSettings;

// make a base view
_.extend(APP, {
  view: {
    _Base: Backbone.View.extend({
      render: function(ctxt) {
        var tpl = this.template;
        if(tpl) {
          ctxt = ctxt || {};
          if(this.collection) {
            _.defaults(ctxt, { items: this.collection.toJSON() });
          }
          if(this.model) {
            _.extend(ctxt, this.model.toJSON());
          }
          this.$el.html(
            _.isFunction(tpl) ? tpl(ctxt) : tpl.toString()
          );
        }
        this.trigger('rendered');
        return this;
      }
    })
  }

});


// make a view out of each template
_.each(window.JST, function(func, name) {
  var d = name.split('.')
    , o = APP.view;

  for (var i=0, m=d.length; i<m; i++) {
    if(i<m-1) {
      var n = d[i].toLowerCase();
      o[n] = o[n] || {};
      o = o[n]; // drill down into namespace
    }
    else { // make a view out of it
      o[d[i]] = APP.view._Base.extend({
        template: func
      });
    }
  }
});

