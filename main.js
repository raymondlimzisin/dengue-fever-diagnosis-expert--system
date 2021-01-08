!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');

/*window.___gcfg = {lang: 'en'};
(function() {
var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
po.src = 'https://apis.google.com/js/plusone.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
})();*/





var step = 0;
var questions = [];
var result = 0;
var numberqs = 0
var answers = [];
var talk = [];
let normal = []
let dhf = []

questions['ita'] = [
	'',
];

questions['eng'] = [
	'',
	'Do you have high fever',
	'Is your period of infection more than two days',
  'Do you have severe joint and muscle pain',
  'Do you have vomiting',
  'Do you have skin rash',
  'Do you have pain behind the eyes',
  'Do you have fatigue',
  'Do you have severe headaches',
  'Do you have nausea',
  'Do you experience loss of appetite',
  'Do you have abdominal pain',
  'Do you have persistent vomiting',
  'Do you have clinical fluid accumulation',
  'Do you have inner mouth bleeding',
  'Do you experience exhaustion'
	
];


function getLang() {
	var userLang = navigator.language || navigator.userLanguage;
	var lang = userLang.split('-');

	if (lang[0] == 'it')
		return 'ita';
	else
		return 'eng';
}

function answer(res) {
	if (res == 'yes') {
		step < 11 ? normal.push({ans1:1,ans2:'YES'}) : dhf.push({ans1:1,ans2:'YES'})
		console.log(normal)
		console.log(dhf)
        next();
	}
	else{
		step < 11 ? normal.push({ans1:0,ans2:'NO'}) : dhf.push({ans1:0,ans2:'NO'})
		next();
	}
}

function next() {
    numberqs = questions.eng.length - 1
	if (step == numberqs) {
		result = 1;
        
        teams = talk.join('</br>');

		$('#question-box').hide()
		console.log($('#diagnosis-Result'))
		document.getElementById("diagnosis-Result").style.visibility="visible"

		normal[0].ans1 == 0 || normal[1].ans1 == 0
		?document.getElementById("diag-1").innerHTML="NO DENGUE FEVER DETECTED" 
		:normal.filter((ans,index)=>index>1&&ans.ans1===1).length<2
		?document.getElementById("diag-1").innerHTML="NO DENGUE FEVER DETECTED"
		:dhf.filter(ans=>ans.ans1===1).length<1
		?document.getElementById("diag-1").innerHTML="MILD DENGUE FEVER DETECTED"
		:document.getElementById("diag-1").innerHTML="DENGUE HEMORRHAGIC FEVER DETECTED"

		const tableAns = document.querySelectorAll(".tableAns");
			tableAns.forEach((element,index) => {
				if(index <=9)
					element.innerHTML = normal[index].ans2
				else
					element.innerHTML = dhf[index-10].ans2
		});
		$('#talk-msg').show()


	}
	else {
		step++;
        
		$('#step').html(step  * numberqs / numberqs);
		$('#question').html(questions[getLang()][step] + '?');
	}
}

/*function nextq() {
    numberqs = questions.eng.length - 1
	if (step == numberqs) {
		result = 1;

		$('#buttons-box').hide();
		$('#ask-msg').show();
		$('#share-button').show();

		//ga('send', 'event', 'test', 'completed', 'yes');
	}
    else  {
    step++;

		$('#step').html(step  * numberqs / numberqs);
		$('#question').html(questions[getLang()][step] + '?' + answers[step]);
        talk.push(answers[step -1]);
    }
}*/

function start() {
	$('#question-box').show();
	$('#start-box').hide();
	next();
}
