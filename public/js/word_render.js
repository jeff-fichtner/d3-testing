function wordRender(sentenceData) {

  var fontSize = '20px';
  var width = 600, height = 300;

  var splitSentenceData = sentenceData.split(" ");
  var length = splitSentenceData.length;
  // return random number between 1 and last index(length-1)?
  var half = length / 2;

  // array.splice(start, [deleteCount = 1]) => return word fragment DESTRUCTIVE
  var wordSplice = splitSentenceData.splice(half, 1);

  var sentenceDataBegin = splitSentenceData.slice(0, half).join(" ");
  var sentenceDataEnd = splitSentenceData.slice(half, length).join(" ");

  // create SVG
  var svg = d3.select("body").select("#sentence")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // create SVG path
  svg.append("path")
    .attr("id", "wave")
    .attr("d", 'M 40,90 Q 160,15 240,70 Q 380,140 520,70')
    .style("fill", "none")
    .style("stroke", "#1A818C");

  svg.append("text").attr("class", "text-start")
  svg.append("text").attr("class", "text-end")

  renderStart(svg, sentenceDataBegin)
  renderEnd(svg, sentenceDataEnd)
  // *** WORDS generator ***

  // data for words
  var wordData = [];
  for (var i = 0; i < 8; i++) {
    wordData.push(faker.lorem.word());
  }

  var wordText = d3.select("body").selectAll("div")
    .data(wordData)
    .enter().append("div")
      .text(function(d) { return d; } )
      .style('font-size', fontSize)
      .attr('class', function(d) { return 'float-left draggable drag-drop'; } );

  // data for selected word, "wordSplice"
  var wordText = d3.select("#word-text")
    .append("wordText")
    .style('font-size', fontSize);

  wordText.append('text')
    .append("wordText")
    .text(wordSplice);
};

  function renderStart(svg, sentenceBegin) {

    var textStart = svg.select(".text-start")
    var textStartPath = textStart.selectAll("textPath")
    var textStartPathUpdate = textStartPath.data([sentenceBegin])

    var test = textStartPathUpdate
      .enter()
        .append("textPath")
        .attr("xlink:href", "#wave")
        .style("text-anchor", "middle")
        .attr("startOffset", "75%")
      .merge(textStartPathUpdate)
        .text(function(sentenceText) {
          return sentenceText
        })
  }

  function renderEnd(svg, sentenceEnd) {
    var textStart = svg.select(".text-end")
    var textStartPath = textStart.selectAll("textPath")
    var textStartPathUpdate = textStartPath.data([sentenceEnd])

    textStartPathUpdate
      .enter()
        .append("textPath")
        .attr("xlink:href", "#wave")
        .style("text-anchor", "middle")
        .attr("startOffset", "25%")
      .merge(textStartPathUpdate)
        .text(function(sentenceText) {
          return sentenceText
        })
  }
