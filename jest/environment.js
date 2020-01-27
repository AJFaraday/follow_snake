var glob = require('glob'), path = require('path');
mix = require('../js/mix.js');
require('../js/utils.js');
glob.sync( 'js/*.js' ).forEach( function( file ) {
  console.log(file)
  require( path.resolve( file ) );
});

glob.sync( 'js/**/*.js' ).forEach( function( file ) {
  require( path.resolve( file ) );
});

