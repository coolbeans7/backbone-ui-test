APP.view.Home = APP.view.Home.extend({


  initialize: function() {
    this.collection.on('sync', this.createJobList, this);


    this.on('rendered', function() {
      this.$('.upload').empty().append(
        (new APP.view.Upload()).render().el
      );
    });

  }

, createJobList: function() {

    var $list = $('<table>');

    this.collection.each(function(job) {
      $list.append(
        (new APP.view.Job({model:job})).render().el
      );
    });

    this.$('.joblist').empty().append($list);
  }


});






