function get_recent_games() {
	$('#recent_games').html('');
	var access_token = getCookie('access_token');
	if(access_token != '')
	{
		$.ajax({
	      url:'/recent',
	      type:'POST',
	      datatype:'json',
	      data:{token:access_token},
	      success: function(data) {
	      	print_games(data, 'recent_games');
	      }
		});
	}
}

function get_my_games() {
	$('#my_games').html('');
	var access_token = getCookie('access_token');
	if(access_token != '')
	{
		$.ajax({
	      url:'/mygames',
	      type:'POST',
	      datatype:'json',
	      data:{token:access_token},
	      success: function(data) {
	      	print_games(data, 'my_games');
	      }
		});
	}
}

function print_games(data, table_id) {
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
