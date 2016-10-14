  // function touchDemo1() {
    // d3.select("#buttons").html("")
    // .style("pointer-events", "none")
    // .append("div").attr("id", "touchStatus")
    //   .append("p")
    //   .append("ol")
    //   .append("li");
      // .html("Touch the screen with a touch interface to get the current touch positions using d3.touches");
    
  //   d3.select("svg").on("touchstart", touchStatus);
  //   d3.select("svg").on("touchmove", touchStatus);
    
  //   function touchStatus() {
  //     d3.event.preventDefault();
  //     d3.event.stopPropagation();
  //     d = d3.touches(this);
  //     d3.select("#touchStatus")
		//     .select("ol")
		//     .selectAll("li")
		//     .data(d)
		//     .enter()
		//     .append("li");
      
  //     d3.select("#touchStatus")
	 //      .select("ol")
	 //      .selectAll("li")
	 //      .data(d)
	 //      .exit()
	 //      .remove();

  //     d3.select("#touchStatus")
	 //      .select("ol")
	 //      .selectAll("li")
	 //      .html(function(d) {return d});
      
  //   }

  // }

var dragndrop = function() {
	var myX = '';
	var myY = '';
	var whichArt = '';

	function resetZ() {
		var elements = document.querySelectorAll('img');
		for (var i = elements.length - 1; i >= 0; i--) {
			elements[i].style.zIndex = 5;
		};
	}

	function touchStart(e) {
		e.preventDefault();
		var whichArt = e.target;
		var touch = e.touches[0];
		var moveOffsetX = whichArt.offsetLeft - touch.pageX;
		var moveOffsetY = whichArt.offsetTop - touch.pageY;
		resetZ();
		whichArt.style.zIndex = 10;

		whichArt.addEventListener('touchmove', function() {
			var positionX = touch.pageX + moveOffsetX;
			var positionY = touch.pageY + moveOffsetY;
			whichArt.style.left = positionX + 'px';
			whichArt.style.top = positionY + 'px';
		}, false);
	}
	document.querySelector('svg').addEventListener('touchstart','text', touchStart, false);
}