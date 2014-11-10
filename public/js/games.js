function get_recent_games(start,limit) {
	$('#recent_games').html('');
	var access_token = getCookie('access_token');
	if(access_token != '')
	{
		$.ajax({
	      url:'/recent',
	      type:'POST',
	      datatype:'json',
	      data:{token:access_token, start:start, limit:limit},
	      success: function(data) {
	      	print_games(data, start, limit, 'recent_games', 'all');
	      }
		});
	}
}

function get_my_games(start, limit) {
	$('#my_games').html('');
	var access_token = getCookie('access_token');
	if(access_token != '')
	{
		$.ajax({
	      url:'/mygames',
	      type:'POST',
	      datatype:'json',
	      data:{token:access_token,start:start,limit:limit},
	      success: function(data) {
	      	print_games(data, start, limit, 'my_games', 'my');
	      }
		});
	}
}

function print_games(data, start, limit, table_id, id) {
	var tr_string = '<thead><tr style="font-weight:bold;"><th>#</th><th>Player 1</th><th>Player 2</th><th>Player 3</th>'
						+ '<th>Player 4</th><th>Winner</th></tr></thead>';

	var list_length = data.length;
	var has_next_page = false;

	if(list_length > limit)
	{
		has_next_page = true;
		list_length = list_length-1;
	}

	for(var i =0;i<list_length;i++)
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

	// if(id === 'my')
	// {
	// 	$('#my_prev').off('click');
	// 	$('#my_next').off('click');

	// 	if(has_next_page)
	// 	{
	// 		if($('#my_next').css('display') != 'initial')
	// 		{
	// 			$('#my_next').css('display', 'initial');
	// 		}
	// 		$('#my_next').on('click','', function(){
	// 			get_my_games(start+limit,limit);				
	// 		});
	// 	}
	// 	else
	// 	{
	// 		if($('#my_next').css('display') != 'none')
	// 		{
	// 			$('#my_next').css('display', 'none');
	// 		}
	// 	}

	// 	if(start > 0)
	// 	{
	// 		if($('#my_prev').css('display') != 'initial')
	// 		{
	// 			$('#my_prev').css('display', 'initial');
	// 		}
	// 		$('#my_prev').on('click','', function(){
	// 			var new_start = start - limit;
	// 			if(new_start < 0)
	// 			{
	// 				new_start = 0;
	// 			}
	// 			get_my_games(new_start,limit);				
	// 		});
	// 	}
	// 	else
	// 	{
	// 		if($('#my_prev').css('display') != 'none')
	// 		{
	// 			$('#my_prev').css('display', 'none');
	// 		}
	// 	}
	// }
	// else if(id === 'all')
	// {
	// 	$('#all_prev').off('click');
	// 	$('#all_next').off('click');

	// 	if(has_next_page)
	// 	{
	// 		if($('#all_next').css('display') != 'initial')
	// 		{
	// 			$('#all_next').css('display', 'initial');
	// 		}
	// 		$('#all_next').on('click','', function(){
	// 			get_recent_games(start+limit,limit);				
	// 		});
	// 	}
	// 	else
	// 	{
	// 		if($('#all_next').css('display') != 'none')
	// 		{
	// 			$('#all_next').css('display', 'none');
	// 		}
	// 	}

	// 	if(start > 0)
	// 	{
	// 		if($('#all_prev').css('display') != 'initial')
	// 		{
	// 			$('#all_prev').css('display', 'initial');
	// 		}
	// 		$('#all_prev').on('click','', function(){
	// 			var new_start = start - limit;
	// 			if(new_start < 0)
	// 			{
	// 				new_start = 0;
	// 			}
	// 			get_recent_games(new_start,limit);				
	// 		});
	// 	}
	// 	else
	// 	{
	// 		if($('#all_prev').css('display') != 'none')
	// 		{
	// 			$('#all_prev').css('display', 'none');
	// 		}
	// 	}	
	// }

	$('#' + table_id).append(tr_string);	

	var w_1 = $($('.jumbotron')[0]).width();
	var w_2 = $($('.jumbotron')[1]).width();
	
	if(w_1 > w_2)
	{
		$('body').css('min-width', (parseInt(w_1)+100) + 'px');
	}
	else
	{
		$('body').css('min-width', (parseInt(w_2)+100) + 'px');
	}

	$('#' + table_id).dynatable();
}
