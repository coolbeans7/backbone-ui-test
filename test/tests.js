module('Libraries');

    test('jQuery', function() { 
        ok(window.jQuery, 'jQuery is defined'); 
        ok(window.$, '$ is defined'); 
    });

    test('Underscore', function() { 
        ok(window._, '_ is defined'); 
    });

    test('Backbone', function() { 
        ok(window.Backbone, 'Backbone is defined'); 
    });







// ----------------------------------------------------------------------------

module('Views');

    test('APP.view._Base', function() { 
        console.log()
        ok((new APP.view._Base()) instanceof Backbone.View, 'instanceof Backbone.View');
    });










// ----------------------------------------------------------------------------

// module('main.js');

//     test('keydown', function() { 
//         var event = $.Event( "keydown" );
//         $(document).trigger(event);
//         ok(event._testMe, '_testMe is set');
//     });
