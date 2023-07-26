// {
//  "x1": [],
//  "y1": [],
//  "y2": []
// }

// Wraps the text with a callout path of the correct size, as measured in the page.
function size(text, path) {
    const {x, y, width: w, height: h} = text.node().getBBox();
    text.attr("transform", `translate(${-w / 2},${15 - y})`);
    path.attr("d", `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`);
}

function formatDate(date) {
    return date.toLocaleString("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC"
    });
}


function formatY(value1, value2) {
    console.log(value1, value2);
    return `${value1}${value2}`;
    // value.toLocaleString("en", {
    //   style: "currency",
    //   currency: "USD"
    // });
}

function addDualAxisToolTip(id = "svg", dataset = undefined, chartObj = undefined) {
    console.log(dataset);
    if (dataset == undefined || chartObj == undefined){
        return;
    }
    const svg = d3.select(id);
    const tooltip1 = svg.append("g");
    const tooltip2 = svg.append("g");



    // Add the event listeners that show or hide the tooltip.
    const bisect = d3.bisector(d => d.x).center;
    function pointermoved(event) {
        const i = bisect(dataset, chartObj.xScale.invert(d3.pointer(event)[0]));
        tooltip1.style("display", null);
        tooltip2.style("display", null);

        tooltip1.attr("transform", `translate(${chartObj.xScale(dataset[i].x) + chartObj.margin.left},${chartObj.y1Scale(dataset[i].y1)})`);
        tooltip2.attr("transform", `translate(${chartObj.xScale(dataset[i].x) + chartObj.margin.left},${chartObj.y2Scale(dataset[i].y2)})`);

        const path1 = tooltip1.selectAll("path")
            .data([,])
            .join("path")
            .attr("fill", "white")
            .attr("stroke", "black");
        
        const path2 = tooltip2.selectAll("path")
            .data([,])
            .join("path")
            .attr("fill", "white")
            .attr("stroke", "black");

        const text1 = tooltip1.selectAll("text")
            .data([,])
            .join("text")
            .call(text => text
            .selectAll("tspan")
            .data([formatDate(dataset[i].x), formatY(dataset[i].y1, dataset[i].y1Suffix)])
            .join("tspan")
                .attr("x", 0)
                .attr("y", (_, i) => `${i * 1.1}em`)
                .attr("font-weight", (_, i) => i ? null : "bold")
                .text(d => d));

        const text2 = tooltip2.selectAll("text")
            .data([,])
            .join("text")
            .call(text => text
            .selectAll("tspan")
            .data([formatY(dataset[i].y2, dataset[i].y2Suffix)])
            .join("tspan")
                .attr("x", 0)
                .attr("y", (_, i) => `${i * 1.1}em`)
                .attr("font-weight", (_, i) => i ? null : "bold")
                .text(d => d));

        size(text1, path1);
        size(text2, path2);
    }

    function pointerleft() {
        tooltip1.style("display", "none");
        tooltip2.style("display", "none");
    }

      
      
    svg.on("pointerenter pointermove", pointermoved)
      .on("pointerleave", pointerleft)
      .on("touchstart", event => event.preventDefault());
}