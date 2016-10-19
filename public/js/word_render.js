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
    // .attr("d", 'M 40,120 Q 160,15 240,70 Q 500,140 520,70')
    .attr("d", 'M 0,120 c 100,0 0,60 100,55 c 100,0 0,-80 100,-100 c 115,0 0,130 100,140 c 100,0 0,-100 100,-100  c 50,0 0,100 100,53 c 60,0 0,100 80,70')
    // .attr('d', 'M 40,120 c 75,0 0,100 75,67 c 100,0 0,-100 100,-70 c 100,0 0,100 100,55 c 100,0 0,-100 100,-100 c 100,0 0,-100 100,-100')
    .style("fill", "none")
    .style("stroke", "#1A818C");

  svg.append("text").attr("class", "text-start")
  svg.append("text").attr("class", "text-end")

  renderStart(svg, sentenceDataBegin)
  renderEnd(svg, sentenceDataEnd)
  // *** WORDS generator ***

  // data for words

 wordData = ["odd", "zoo", "alive", "curl", "felt",  "gain",  "dawn",  "dear",
"gold", "path", "safe", "roof", "aunt",  "self",  "tuna",  "few", "zero", "world", "wait", "uncle", "visit", "cheer", "jaw", "paper", "sharp", "sink", "twice", "middle", "paste", "animal", "chicken", "banana","earth", "fever", "follow", "crow", "giant", "degree",  "useful",  "zebra", "cottage", "couch", "evening", "crumb",
"decide", "camera",  "garden",  "false", "gasoline", "fruit", "beautiful", "copying", "cancel",  "newscast",  "fleece",  "select", "slumber", "usual", "remind", "pour","graceful", "pioneer", "alert", "chimney", "continue",  "urge",  "striving",  "stretch","noise", "terrible", "voyage", "surprise","twenty", "amount", "avenue", "beggar", "forecast", "vacation", "libraries", "sneezing", "machine", "neighbor", "weekend", "laughter","shoulder", "quarter", "equal", "wheelchair",
"actively", "discover", "vulture", "mountain", "scariest", "impossible", "government", "consistent", "recommend", "whistling", "doubtful",  "guitar"];

 function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
  }

  var randoWords = getRandomSubarray(wordData, 10)

  var wordText = d3.select("body").selectAll("div")
    .data(randoWords)
    .enter().append("div")
      .text(function(d) { return d; } )
      .style('font-size', fontSize)
      .attr('class', function() { return 'float-left draggable drag-drop'; } )
      .attr('data-y', function() { return '-50' } );
      // .attr('data-x', function() { return Math.random() * 500; })
      // .attr('data-y', function() { return Math.random() * 200; });

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
        .attr("startOffset", "18%")
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
        .attr("startOffset", "75%")
      .merge(textStartPathUpdate)
        .text(function(sentenceText) {
          return sentenceText
        })
  }
