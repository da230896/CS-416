/*
    Annotation should be of this format:
    [
        // x1,y1 is tentacle start point
        // x2,y2 is tentacle end point
        {
            x1: x_point,
            y1: y_point,
            x2: x_point,
            y2: y_point,
            label: ""
        }
    ]

*/
function drawAnnotation(chartObj, annotation, selector = undefined) {
    selectorString = selector ?? "svg";    

    for(i in annotation){
         // Draw an annotation line with circle at one end
        d3.select(selectorString).append("line")
            .attr("class", "annotation-line")
            .attr("x1", chartObj.xScale(annotation[i].x1) + chartObj.margin.left)
            .attr("y1", chartObj.yScale(annotation[i].y1))
            .attr("x2", chartObj.xScale(annotation[i].x2) + chartObj.margin.left)
            .attr("y2", chartObj.yScale(annotation[i].y2))
        
        d3.select(selectorString).append("circle")
            .attr("class", "annotation-circle")
            .attr("cx", chartObj.xScale(annotation[i].x1) + chartObj.margin.left)
            .attr("cy", chartObj.yScale(annotation[i].y1))
            .attr("r", "10px");

        // Draw an annotation rectangle
        // width = annotation[i].width;
        // height = annotation[i].height;

        // Add text to the chart
        d3.select(selectorString).append("text")
            .attr("class", "annotation-text")
            .attr("x", chartObj.xScale(annotation[i].x2) + chartObj.margin.left)
            .attr("y", chartObj.yScale(annotation[i].y2))
            .text(annotation[i].label);

        // reflowing text in d3 is next to impossible
        // d3.select(selectorString).append("rect")
        //     .attr("class", "annotation-rect")
        //     .attr("x", chartObj.xScale(annotation[i].x2) + chartObj.margin.left)
        //     .attr("y", chartObj.yScale(annotation[i].y2) - height/2)
        //     .attr("width", width)
        //     .attr("height", height)
        //     .attr("rx", "0.7rem");       
    }
   
}
/*
    Annotation should be of this format:
    [
        // x1,y1 is tentacle start point
        // x2,y2 is tentacle end point
        {
            x1: x_point,
            y1: y_point,
            x2: x_point,
            y2: y_point,
            label: "",
            y1axis: bool
        }
    ]

*/
function drawDualAxisAnnotation(chartObj, annotation, selector = undefined) {
    selectorString = selector ?? "svg";    
    for(i in annotation){
        yScale = annotation[i].y1axis ? chartObj.y1Scale : chartObj.y2Scale; 
         // Draw an annotation line with circle at one end
        d3.select(selectorString).append("line")
            .attr("class", "annotation-line")
            .attr("x1", chartObj.xScale(annotation[i].x1) + chartObj.margin.left)
            .attr("y1", yScale(annotation[i].y1))
            .attr("x2", chartObj.xScale(annotation[i].x2) + chartObj.margin.left)
            .attr("y2", yScale(annotation[i].y2))
        
        d3.select(selectorString).append("circle")
            .attr("class", "annotation-circle")
            .attr("cx", chartObj.xScale(annotation[i].x1) + chartObj.margin.left)
            .attr("cy", yScale(annotation[i].y1))
            .attr("r", "10px");

        // Add text to the chart
        d3.select(selectorString).append("text")
            .attr("class", "annotation-text")
            .attr("x", chartObj.xScale(annotation[i].x2) + chartObj.margin.left)
            .attr("y", yScale(annotation[i].y2))
            .text(annotation[i].label);       
    }
   
}

    