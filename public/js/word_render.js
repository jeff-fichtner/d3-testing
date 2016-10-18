function wordRender(sentenceData) {

  var splitSentenceData = sentenceData.split(" ");
  var length = splitSentenceData.length;
  // return random number between 1 and last index(length-1)?
  var half = length / 2;

  // array.splice(start, [deleteCount = 1]) => return word fragment DESTRUCTIVE
  var wordSplice = splitSentenceData.splice(half, 1);

  var sentenceDataBegin = splitSentenceData.slice(0, half).join(" ");
  var sentenceDataEnd = splitSentenceData.slice(half, length).join(" ");
  var fontSize = '20px';
  var width = 100, height = 300;

  // BEGIN Sentence
  var sentenceTextBegin = d3.select("#sentenceBegin")
    .style('font-size', fontSize)
    .attr("width", width)
    .attr("height", height);

  sentenceTextBegin.append('text')
    .text(sentenceDataBegin);

  // END Sentence
  var sentenceTextEnd = d3.select("#sentenceEnd")
    .style('font-size', fontSize)
    .attr("width", width)
    .attr("height", height);

  sentenceTextEnd.append('text')
    .text(sentenceDataEnd);

  // data for words
  var wordData = [];
  for (var i = 0; i < 8; i++) {
    wordData.push(faker.lorem.word());
  }

  var wordText = d3.select("div")
    .data(wordData)
    .enter().append("div")
      .text(function(d) { return d; } )
      .style('font-size', fontSize)
      .attr('class', function(d) { return 'draggable drag-drop'; } );

  // data for selected word, "wordSplice"
  var wordText = d3.select("#word-text")
    .append("wordText")
    .style('font-size', fontSize);

  wordText.append('text')
    .append("wordText")
    .text(wordSplice);

}