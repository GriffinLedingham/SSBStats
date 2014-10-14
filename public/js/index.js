function init()
{
	$('#list-button').on('click', function(){
		if(!$('#content-pane').hasClass('content-pane-shift'))
		{
  			$('#content-pane').addClass('content-pane-shift');
  		}
  		else
  		{
  			$('#content-pane').removeClass('content-pane-shift');
  		}
  	});
}