var currentSentenceIndex = 0;

function callAndInit() {
	$.ajax({
	  url: "https://unravl.herokuapp.com/demo",
	  method: 'GET',
	}).done(function(response) {
	  console.log(response);
	  sentences = [];
	  for (var i in response) {
	  	sentences.push(response[i].text);
	  }
		run(sentences[currentSentenceIndex]);
	});
}

function run(sentence) {
	dropzoneRender();
	renderInteract();
	wordRender(sentence);
}

$(function() {
	callAndInit();
});
