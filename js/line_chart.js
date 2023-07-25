/*
    this method is to be called with:
        dataset = {
            y: [],
            x: []
        }

        axisLabels = {
            xAxis: "",
            yAxis: ""
        }
*/
const lineChartData = [
    {
        "x": "2020-01-22",
        "y": 1
    },
    {
        "x": "2020-01-23",
        "y": 2
    },
    {
        "x": "2020-01-24",
        "y": 3
    }
]

function drawLineChart(axisLabels, dataset = lineChartData, id = undefined) {
    var chartObj = {};
    chartObj.xAxisLabel = axisLabels.xAxis;
    chartObj.yAxisLabel = axisLabels.yAxis;

    chartObj.data = dataset;
    chartObj.margin = { top: 16, right: 32, bottom: 48, left: 64 };
    chartObj.width = 1000 - chartObj.margin.left - chartObj.margin.right;
    chartObj.height = 700 - chartObj.margin.top - chartObj.margin.bottom;

    chartObj.xScale = d3.scaleTime().domain(d3.extent(chartObj.data, (d) => d.x)).range([0, chartObj.width]);
    chartObj.yScale = d3.scaleLinear().domain(d3.extent(chartObj.data, (d) => d.y)).range([chartObj.height, 0]);

    const selector_string = id ?? "svg";

    chartObj.render = () => {
        // Declare the line generator.
        const line = d3.line()
            .x(d => chartObj.xScale(d.x) + chartObj.margin.left)
            .y(d => chartObj.yScale(d.y));

        // Create the SVG container.
        d3.select(selector_string)
            .attr("width", 1000)
            .attr("height", 700)
            .attr("viewBox", [0, 0, 1000, 700])
            .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
            .append("path")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 3.5)
            .attr("d", line(chartObj.data));

        // Add the x-axis.
        const xAxisGroup = d3.select(selector_string).append("g")
            .attr("transform", `translate(${chartObj.margin.left},${chartObj.height + chartObj.margin.top})`)
            .attr("stroke", "#ffff")
            .call(d3.axisBottom(chartObj.xScale));

        xAxisGroup.selectAll(".tick text") // Select the tick text elements
            .style("stroke", "none")
            .style("fill", "#fff")
            .style("font-size", "1rem");

        // Add the x-axis label
        xAxisGroup.append("text")
            .attr("x", chartObj.width / 2)
            .attr("y", 46)
            .attr("fill", "#fff")
            .attr("text-anchor", "middle")
            .attr("class", "x_axis_label")
            .text(chartObj.xAxisLabel);
        
        // Add the x-axis grid lines
        xAxisGroup.selectAll("g.tick")
            .append("line")
            .attr("class", "grid_line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", 0)
            .attr("y2", -chartObj.height);

        // Add the y-axis
        const yAxisGroup = d3.select(selector_string).append("g")
            .attr("transform", `translate(${chartObj.margin.left},${chartObj.margin.top})`)
            .attr("stroke", "#ffff")
            .call(d3.axisLeft(chartObj.yScale));

        // Adding y axis label
        yAxisGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -chartObj.height / 2)
            .attr("y", -chartObj.margin.left + 30)
            .attr("stroke", "none")
            .attr("fill", "steelblue")
            .attr("text-anchor", "middle")
            .attr("class", "y_axis_label")
            .text(chartObj.yAxisLabel);
        
        yAxisGroup.selectAll(".tick text") // Select the tick text elements
            .style("stroke", "none")
            .style("fill", "#fff")
            .style("font-size", "1rem");
        // Adding y axis grid lines
        yAxisGroup.selectAll("g.tick")
            .append("line")
            .attr("class", "grid_line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", chartObj.width)
            .attr("y2", 0);
    }
    return chartObj;
}

