$(function() {

  var jobs = new (Backbone.Collection.extend({
      url: 'tasks.json'
  
    , comparator: function(job) {
        return Date.parse(job.get('modified'));
      }

    , model: Backbone.Model.extend({
        idAttribute: 'id'
      , url: function() {
          return '/'+this.id
        }
      , defaults : {
          url: null
        }
      })

    , initialize: function() {
        setInterval(_.bind(this.fetch, this, {remove: false}), 10 * 1000);

        this.on('all', function() {
          console.log(arguments);
        });

        this.on('append', function() {
          this.sort();
        });
      }
  
    , parse: function(res) {
        return res.jobs;
      }
    }));



  jobs.fetch();


  window.jobs = jobs;


  var main = new APP.view.Main()
    , router = new (Backbone.Router.extend({

        routes: {
          "home":         "home"
        }

      , home: function() {
          (new APP.view.Home({
            collection: jobs
          })).render().$el.appendTo(main.el);
        }



      }))();


  // start the router
  if(!Backbone.history.start({root: document.location.pathname})) {
    router.navigate('home', {trigger: true});
  }

});
