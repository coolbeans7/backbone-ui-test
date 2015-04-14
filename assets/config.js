;(function(global){
  var config = {

    templateSettings: {
      escape : /\[\[([\s\S]+?)\]\]/g          // hello [[thing]]
    , evaluate : /\[\%([\s\S]+?)\%\]/g        // [% if(thing) { %] hello [% } %]
    , interpolate : /\[\-([\s\S]+?)\-\]/g     // <code>[-thing-]</code>
    }



  };


  if(global.APP) global.APP.config = config;
  if(typeof module !== 'undefined') module.exports = config;

})(this);

