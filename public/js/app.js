function init() {
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

  getView('home', home_init);
}

function getView(slug, success_func) {
  return $.ajax({url:'./views/'+slug+'.html', type:'GET',complete:function(response){$('#content').html(response.responseText);success_func();}});
}

function getCookie(cname)
{
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) 
    {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
  return "";
}