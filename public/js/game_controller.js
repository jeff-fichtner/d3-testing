var sentences = ["Hello, I'm Jeff", "Where are all the mentors when you need them", "Greg could be louder and unicorns exist", "The game is finished, congratulations"];

var currentSentenceIndex = 0;

function getSentences() {
	// $.ajax({
	//   url: "http://unravl.herokuapp.com/demo",
	//   type: 'get',
	// }).done(function(response) {
	//   console.log(response);
		// return sentence array
	// });
}

function run(sentence) {
	dropzoneRender();
	renderInteract();
	wordRender(sentence);
}


$(function() {
	// sentences = getSentences();
	run(sentences[currentSentenceIndex]);
});
