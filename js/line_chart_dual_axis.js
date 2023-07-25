/*
    this method is to be called with:
        dataset = {
            y1: [],
            y2: [],
            x: []
        }

        axisLabels = {
            xAxis: "",
            y1Axis: "",
            y2Axis: ""
        }
*/
const dualLineChartData = [
    {
        "x": "2020-01-22",
        "y1": 1,
        "y2": 1
    },
    {
        "x": "2020-01-23",
        "y1": 2,
        "y2": 2
    },
    {
        "x": "2020-01-24",
        "y1": 3,
        "y2": 3
    }
]

const dual_axis_margin_chart = { top: 16, right: 32, bottom: 32, left: 64 }

function drawDualAxisLineChart(axisLabels, dataset = dualLineChartData, id = undefined, width = 1000, height = 700, 
    margin_obj = dual_axis_margin_chart) {
    let chartObj = {};

    chartObj.xAxisLabel = axisLabels.xAxis;
    chartObj.y1AxisLabel = axisLabels.y1Axis;
    chartObj.y2AxisLabel = axisLabels.y2Axis;

    chartObj.data = dataset;
    chartObj.margin = margin_obj;
    chartObj.width = width - chartObj.margin.left - chartObj.margin.right;
    chartObj.height = height - chartObj.margin.top - chartObj.margin.bottom;

    chartObj.xScale = d3.scaleTime().domain(d3.extent(chartObj.data, (d) => d.x)).range([0, chartObj.width]);
    chartObj.y1Scale = d3.scaleLinear().domain(d3.extent(chartObj.data, (d) => d.y1)).range([chartObj.height, 0]);
    chartObj.y2Scale = d3.scaleLinear().domain(d3.extent(chartObj.data, (d) => d.y2)).range([chartObj.height, 0]);

    const selector_string = id ?? "svg";

    chartObj.render = () => {
        // Declare the line generator.
        const line1 = d3.line()
            .x(d => chartObj.margin.left + chartObj.xScale(d.x))
            .y(d => chartObj.y1Scale(d.y1));
        
        // Declare the line generator.
        const line2 = d3.line()
            .x(d => chartObj.margin.left + chartObj.xScale(d.x))
            .y(d => chartObj.y2Scale(d.y2));

        // clean the svg container
        d3.select(selector_string).selectAll("*").remove();

        // Create the SVG container.
        d3.select(selector_string)
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height+50]) // to prevent axis clipping
            .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
            .append("path")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 3.5)
            .attr("d", line1(chartObj.data));
        
        d3.select(selector_string)
            .append("path")
            .attr("fill", "none")
            .attr("stroke", "orange")
            .attr("stroke-width", 3.5)
            .attr("d", line2(chartObj.data));

        // Add the x-axis.
        const xAxisGroup = d3.select(selector_string).append("g")
            .attr("transform", `translate(${chartObj.margin.left},${chartObj.height + chartObj.margin.top})`)
            // .style({stroke: "#ffff"})
            .attr("stroke", "#ffff")
            .call(d3.axisBottom(chartObj.xScale));
        
        xAxisGroup.selectAll(".tick text") // Select the tick text elements
            .attr("transform", "rotate(-45)")
            .attr("dy", "1.2rem")
            .style("stroke", "none")
            .style("fill", "#fff")
            .style("font-size", "1rem");
            
        
        xAxisGroup.append("text")
            .attr("x", chartObj.width / 2)
            .attr("y", 0)
            .attr("fill", "#fff")
            .attr("text-anchor", "middle")
            .attr("class", "x_axis_label")
            .text(chartObj.xAxisLabel);
        
        xAxisGroup.selectAll("g.tick")
            .append("line")
            .attr("class", "grid_line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", 0)
            .attr("y2", -chartObj.height);

        // Add the y1-axis
        const y1AxisGroup = d3.select(selector_string).append("g")
            .attr("transform", `translate(${chartObj.margin.left},${chartObj.margin.top})`)
            .attr("stroke", "#ffff")
            .call(d3.axisLeft(chartObj.y1Scale));
        
        y1AxisGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -chartObj.height / 2)
            .attr("y", -chartObj.margin.left + 30)
            .attr("stroke", "none")
            .attr("fill", "steelblue")
            .attr("text-anchor", "middle")
            .attr("class", "y_axis_label")
            .text(chartObj.y1AxisLabel);
        
        y1AxisGroup.selectAll(".tick text") // Select the tick text elements
            .style("stroke", "none")
            .style("fill", "#fff")
            .style("font-size", "1rem");

        // Add the y2-axis
        const y2AxisGroup = d3.select(selector_string).append("g")
            .attr("transform", `translate(${chartObj.margin.left + chartObj.width},${chartObj.margin.top})`)
            .attr("stroke", "#ffff")
            .call(d3.axisRight(chartObj.y2Scale));
        
        y2AxisGroup.append("text")
            .attr("transform", "rotate(+90)")
            .attr("x", chartObj.height / 2)
            .attr("y", chartObj.margin.right)
            .attr("stroke", "none")
            .attr("fill", "orange")
            .attr("text-anchor", "middle")
            .attr("class", "y_axis_label")
            .text(chartObj.y2AxisLabel);
        
        y2AxisGroup.selectAll(".tick text") // Select the tick text elements
            .style("stroke", "none")
            .style("fill", "#fff")
            .style("font-size", "1rem");

    }
    return chartObj;
}

