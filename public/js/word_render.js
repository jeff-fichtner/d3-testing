
function wordRender(sentenceData) {

  var fontSize = '20px';
  var width = 600, height = 300;
  var fontColor = 'white';

  var splitSentenceData = sentenceData.split(" ");
  var length = splitSentenceData.length;
  var half = length / 2;

  var wordSplice = splitSentenceData.splice(half, 1)[0];

  if (wordSplice[wordSplice.length - 1] === ",") {
    wordSplice = wordSplice.substring(0, wordSplice.length - 1);
  }

  var sentenceDataBegin = splitSentenceData.slice(0, half).join(" ");
  var sentenceDataEnd = splitSentenceData.slice(half, length).join(" ");

  var dOrg = "M 5,130 c 100,0 0,60 100,55 c 100,0 0,-80 100,-100 c 115,0 0,130 100,140 c 100,0 0,-100 100,-100 c 60,0 0,100 100,53 c 60,0 0,100 80,70",
      dTr = "M 5,15 c100,0 0,100 100,100 c 100,0 0,-100 100,-100 c 50,0 0,100 100,53 c 60,0 0,100 80,70 c 95,0 0,130 100,140 c 100,0 0,-100 100,-100 ";

// create SVG
  var svg = d3.select("body").select("#sentence")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// create SVG path, setup transform translate
  svg.append("path")
    .attr("id", "wave")
    .attr("transform", "translate(0,0)scale(1,1)")
    .attr("d", dOrg)
    .call(transition, dOrg, dTr)
    .style("fill", "none");
    // .style("stroke", "#1A818C");


  svg.append("text").attr("class", "text-start")
  svg.append("text").attr("class", "text-end")

  renderStart(svg, sentenceDataBegin)
  renderEnd(svg, sentenceDataEnd)

  function renderStart(svg, sentenceBegin) {
    var text = svg.select(".text-start")
    var textPath = text.selectAll("textPath")
    var textPathUpdate = textPath.data([sentenceBegin])

    textPathUpdate
      .enter()
        .append("textPath")
        .attr("xlink:href", "#wave")
        .style("text-anchor", "end")
        .attr("startOffset", "41%")
        .text(function(sentenceText) {
          return sentenceText
        })

  }

  function renderEnd(svg, sentenceEnd) {
    var text = svg.select(".text-end")
    var textPath = text.selectAll("textPath")
    var textPathUpdate = textPath.data([sentenceEnd])

    textPathUpdate
      .enter()
        .append("textPath")
        .attr("xlink:href", "#wave")
        .style("text-anchor", "start")
        .attr("startOffset", "44%")
        .text(function(sentenceText) {
          return sentenceText
        })
  }

// ANIMATION functions

  function transition(path, d0, d1) {
    path.transition()
        .duration(2000)
        .attrTween("d", pathTween(d1, 4))
        .each("end", function() {
          d3.select(this).call(transition, d1, d0);
        });
  }

  function pathTween(d1, precision) {
    return function() {
      var path0 = this,
          path1 = path0.cloneNode(),
          n0 = path0.getTotalLength(),
          n1 = (path1.setAttribute("d", d1), path1).getTotalLength();
      // Uniform sampling of distance based on specified precision.
      var distances = [0], i = 0, dt = precision / Math.max(n0, n1);
      while ((i += dt) < 1) distances.push(i);
      distances.push(1);
      // Compute point-interpolators at each distance.
      var points = distances.map(function(t) {
        var p0 = path0.getPointAtLength(t * n0),
            p1 = path1.getPointAtLength(t * n1);
        return d3.interpolate([p0.x, p0.y], [p1.x, p1.y]);
      });

      return function(t) {
        return t < 1 ? "M" + points.map(function(p) {
          return p(t); }).join("L") : d1;
      };
    };
  }

// *** WORDS generator ***

var wordText = d3.select("body").selectAll("div")
  .data(randoWords)
  .enter().append("div")
    .text(function(d) { return d; } )
    .style('font-size', fontSize)
    .attr('class', function() {
      return 'float-left draggable drag-drop';
    });

// data for selected word, "wordSplice"
  var wordText = d3.select("#word-text")
    .append("wordText")
    .style('font-size', fontSize);

  wordText.append('text')
    .append("wordText")
    .text([wordSplice]);
};

// data for words

 wordData = ["odd", "zoo", "alive", "curl", "felt",  "gain", "dawn", "dear", "gold", "path", "safe", "roof", "aunt",  "self",  "tuna",  "few", "zero", "world", "wait", "uncle", "visit", "cheer", "jaw", "paper", "sharp", "sink", "twice", "middle", "paste", "animal", "chicken", "banana","earth", "fever", "follow", "crow", "giant", "degree",  "useful",  "zebra", "cottage", "couch", "evening", "crumb", "decide", "camera",  "garden",  "false", "gasoline", "fruit", "beautiful", "copying", "cancel",  "newscast", "fleece", "select", "slumber", "usual", "remind", "pour","graceful", "pioneer", "alert", "chimney", "continue",  "urge",  "striving",  "stretch","noise", "terrible", "voyage", "surprise","twenty", "amount", "avenue", "beggar", "forecast", "vacation", "libraries", "sneezing", "machine", "neighbor", "weekend", "laughter","shoulder", "quarter", "equal", "wheelchair", "actively", "discover", "vulture", "mountain", "scariest", "impossible", "government", "consistent", "recommend", "whistling", "doubtful", "guitar"];

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
