var pokeDex = {
  init: function() {
    return true;
  },

  formatName: function(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  },

  fetch: function(id) {
  	$.ajax({
	  // This is the url you should use to communicate with the parse API server.
	  url: 'https://pokeapi.co/api/v2/pokemon/' + id,
	  type: 'GET',
	  data: {},
	  contentType: 'application/json',
	  success: function (data) {
	  	console.log(data)

	  	//append name, and type, and size? to page
	  	pokeDex.clearPage('h2')
	  	pokeDex.place(data)
	    console.log('POKEdex: data recieved');
	  },
	  error: function (data) {
	    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
	    console.error('failed to load data. something went wrong.');
	  }
	});
  },

  place: function(data) {
  	$('.pokemonInfo').append('<img src="' + data.sprites.front_default + '"></img>');
    $('.pokemonInfo').append('<p>Name: ' + pokeDex.formatName(data.name) + '</p>');

    var types = [];
    if (data.types.length < 2) {
      	$('.pokemonInfo').append('<p>Type: ' + pokeDex.formatName(data.types[0].type.name) + '</p>');
    } else {
      for (var i = 0; i < data.types.length; i ++) {
        types.unshift(pokeDex.formatName(data.types[i].type.name));
      }
      $('.pokemonInfo').append('<p>Type: ' + types.join(", ") + '</p>');
    }

    $('.pokemonInfo').append('<p>Height: ' + Math.round(data.height / 3) + ' feet</p>');
    $('.pokemonInfo').append('<p>Weight: ' + Math.round(data.weight / 3) + ' pounds</p>');
  },

  clearPage: function(node) {
    $('' + node + '').children().remove();
  }
};



$(document).ready(function(){
  pokeDex.init();
});