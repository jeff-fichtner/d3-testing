d3.select("#vizcontainer")
	.append("div")
	.attr("id", "touchStatus")
	.append("p")
	.html("Touch Status:")
	.append("ol");

d3.select("svg").on("touchstart", touchStatus);
d3.select("svg").on("touchmove", touchStatus);

function touchStatus() {
	d3.event.preventDefault();
	d3.event.stopPropagation();
	d = d3.touches(this);
	d3.select("#touchStatus")
		.select("ol")
		.selectAll("li")
		.data(d)
		.enter()
		.append("li");

	d3.select("#touchStatus")
		.select("ol")
		.selectAll("li")
		.data(d)
		.exit()
		.remove();

	d3.select("#touchStatus")
		.select("ol")
		.selectAll("li")
		.html(function(d) {return d3.event.type + d;});
};