function home_init() {
  character_typedown('char_dropdown','7ce374');
  character_typedown('char_dropdown','ffd674');
  character_typedown('char_dropdown','74a9ff');
  character_typedown('char_dropdown','ff7474');
  character_typedown('char_dropdown','trans');

  $('#submit_stats').on('click', function(){
  	var access_token = getCookie('access_token');
  	if(access_token != '')
  	{
	  	$.ajax({
	          url:'/score',
	          type:'POST',
	          datatype:'json',
	          data:{token:access_token,
	          		p1_char: characters.indexOf($('#p1 .tt-input').val()) ,p1_score: $('#p1_score').val(),
	          		p2_char: characters.indexOf($('#p2 .tt-input').val()) ,p2_score: $('#p2_score').val(),
	          		p3_char: characters.indexOf($('#p3 .tt-input').val()) ,p3_score: $('#p3_score').val(),
	          		p4_char: characters.indexOf($('#p4 .tt-input').val()) ,p4_score: $('#p4_score').val(),
	          		winner: characters.indexOf($('#winner .tt-input').val())},
	          success: function(data) { 
	          	get_recent_games(0,100);
	          	get_my_games(0,100);
	          }
	      });
	  }
  });

  get_recent_games(0,100);
  get_my_games(0,100);
}