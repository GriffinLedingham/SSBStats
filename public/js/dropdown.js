var characters = [
	"Mario",
	"Luigi",
	"Bowser",
	"Peach",
	"Rosalina",
	"Donkey Kong",
	"Diddy",
	"Yoshi",
	"Wario",
	"Little Mac",
	"Link",
	"Zelda",
	"Sheik",
	"Ganondorf",
	"Young Link",
	"Samus",
	"Zero Suit Samus",
	"Pit",
	"Ice Climbers",
	"Villager",
	"Kirby",
	"Meta Knight",
	"King DeeDee",
	"Olimar",
	"WiiFit Trainer",
	"Fox",
	"Falco",
	"Captain Falcon",
	"Marth",
	"Lucina",
	"Pikachu",
	"Lucario",
	"Charizard",
	"Greninja",
	"Jigglypuff",
	"Ness",
	"Mr. Game and Watch",
	"Sonic",
	"Mega Man",
];

var character_class = [
	"Mario",
	"Luigi",
	"Bowser",
	"Peach",
	"Rosalina",
	"DK",
	"Diddy",
	"Yoshi",
	"Wario",
	"Mac",
	"Link",
	"Zelda",
	"Sheik",
	"Ganondorf",
	"YL",
	"Samus",
	"ZS",
	"Pit",
	"IC",
	"Villager",
	"Kirby",
	"MK",
	"KDD",
	"Olimar",
	"WF",
	"Fox",
	"Falco",
	"CF",
	"Marth",
	"Lucina",
	"Pikachu",
	"Lucario",
	"Charizard",
	"Greninja",
	"Jigglypuff",
	"Ness",
	"MG",
	"Sonic",
	"MM",
];

var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substrRegex;
 
    // an array that will be populated with substring matches
    matches = [];
 
    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');
 
    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        // the typeahead jQuery plugin expects suggestions to a
        // JavaScript object, refer to typeahead docs for more info
        var class_str = '';
        switch(str){
        	case 'Donkey Kong': class_str = 'dk';break;
        	case 'Little Mac': class_str = 'Mac';break;
        	case 'Young Link': class_str = 'YL';break;
        	case 'Zero Suit Samus': class_str = 'ZS';break;
        	case 'Ice Climbers': class_str = 'IC';break;
        	case 'Meta Knight': class_str = 'MK';break;
        	case 'King DeeDee': class_str = 'KDD';break;
        	case 'WiiFit Trainer': class_str = 'WF';break;
        	case 'Captain Falcon': class_str = 'CF';break;
        	case 'Mr. Game and Watch': class_str = 'MG';break;
        	case 'Mega Man': class_str = 'MM';break;
        	default: class_str = str;break;
        }
        var name = str;
      
        matches.push({ 
        	value: str,
        	name: name,
        	class_str: class_str,
        	c_num: characters.indexOf(name)
        });
      }
    });
 
    cb(matches);
  };
};

function format_classes(name, class_str, char_num){	
    str_html = '<div class="character-item" role="presentation"><a role="menuitem" tabindex="-1" href="#" data-num="'+char_num+'"><span class="icon '+class_str+'"></span>'+name+'</a></div>';
    return str_html;
}

function character_typeahead() {
	$('.character_typeahead').typeahead({
	  hint: true,
	  highlight: true,
	  minLength: 1
	},
	{
	  name: 'characters',
	  displayKey: 'value',
	  source: substringMatcher(characters),
	  templates: {
	  	suggestion: Handlebars.compile(format_classes('{{name}}', '{{class_str}}', '{{c_num}}'))
	  }
	});
}