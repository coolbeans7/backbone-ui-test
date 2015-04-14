APP.view.Job = APP.view.Job.extend({
    tagName: 'tr'


  , events: {
        'click .btn-abort': function() {
            this.model.destroy();
        }
    }
});






