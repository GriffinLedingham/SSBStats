function init() {
  getView('home', home_init);
}

function home_init() {
  character_typedown('char_dropdown');

  $('#submit_stats').on('click', function(){
  	console.log($('#p1 .tt-input').val());
  	console.log($('#p1_score').val());
  	$.ajax({
          url:'http://localhost:8080/score',
          type:'POST',
          datatype:'json',
          data:{p1_char: characters.indexOf($('#p1 .tt-input').val()) ,p1_score: $('#p1_score').val(),
          		p2_char: characters.indexOf($('#p2 .tt-input').val()) ,p2_score: $('#p2_score').val(),
          		p3_char: characters.indexOf($('#p3 .tt-input').val()) ,p3_score: $('#p3_score').val(),
          		p4_char: characters.indexOf($('#p4 .tt-input').val()) ,p4_score: $('#p4_score').val(),
          		winner: characters.indexOf($('#winner .tt-input').val())},
          success: function(data) { 
          	get_recent_games();
          }
      });
  });

  get_recent_games();
}

function get_recent_games() {
	$('#recent_games').html('');
	$.ajax({
      url:'http://localhost:8080/recent',
      type:'GET',
      success: function(data) {
      	print_recent_games(data, 'recent_games');
      }
	});
}

function print_recent_games(data, table_id) {
	var tr_string = '<tr style="font-weight:bold;"><td>#</td><td>Player 1</td><td>Player 2</td><td>Player 3</td>'
						+ '<td>Player 4</td><td>Winner</td></tr>';
	for(var i =0;i<data.length;i++)
	{
		tr_string += '<tr>';
		tr_string += '<td>'+data[i].id+'</td>';
		if(data[i].p1 != null && data[i].k1 != null)
		{
			tr_string += '<td><span class="icon '+character_class[data[i].p1]+'"></span><span class="truncate">'+characters[data[i].p1]+' - <span style="font-weight:bold;color:yellow;">'+data[i].k1+'</span></span></td>';
		}
		else{tr_string += '<td>N/A</td>'}
		if(data[i].p2 != null && data[i].k2 != null)
		{
			tr_string += '<td><span class="icon '+character_class[data[i].p2]+'"></span><span class="truncate">'+characters[data[i].p2]+' - <span style="font-weight:bold;color:yellow;">'+data[i].k2+'</span></span></td>';
		}
		else{tr_string += '<td>N/A</td>'}
		if(data[i].p3 != null && data[i].k3 != null)
		{
			tr_string += '<td><span class="icon '+character_class[data[i].p3]+'"></span><span class="truncate">'+characters[data[i].p3]+' - <span style="font-weight:bold;color:yellow;">'+data[i].k3+'</span></span></td>';
		}
		else{tr_string += '<td>N/A</td>'}
		if(data[i].p4 != null && data[i].k4 != null)
		{
			tr_string += '<td><span class="icon '+character_class[data[i].p4]+'"></span><span class="truncate">'+characters[data[i].p4]+' - <span style="font-weight:bold;color:yellow;">'+data[i].k4+'</span></span></td>';
		}
		else{tr_string += '<td>N/A</td>'}
		if(data[i].win != null)
		{
			tr_string += '<td><span class="icon '+character_class[data[i].win]+'"></span><span class="truncate">'+characters[data[i].win]+'</span></td>';
		}
		else{tr_string += '<td>N/A</td>'}
		tr_string += '</tr>';
	}
	$('#' + table_id).append(tr_string);	
}

function character_dd(dom_id) {
  return $.ajax({url:'./views/dd.html', type:'GET',complete:function(response){$('#'+dom_id).html(response.responseText);}});
}

function character_typedown(dom_id) {
  return $.ajax({url:'./views/dd_typeahead.html', type:'GET',complete:function(response){$('.'+dom_id).html(response.responseText);character_typeahead();}});
}

function getView(slug, success_func) {
  return $.ajax({url:'./views/'+slug+'.html', type:'GET',complete:function(response){$('#content').html(response.responseText);success_func();}});
}