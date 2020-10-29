let dataset;
let w = 600;
let h = 500;
let chart1;
let xScale, yScale, cScale;
let xAxis, yAxis;
let xAxisGroup, yAxisGroup;

let dataURL = "AAPL.csv";

let parseDate = d3.timeParse("%Y-%m-%d"); // put code here for d3 date parsing

function rowConverter(d) {
  // put code here for row conversion
    return {
        year: parseDate(d.Date),
        value: parseFloat(d.Close)
    }
}

function initGraph() {
  // use require(dataURL) if building with Parcel
    d3.csv(dataURL, rowConverter).then((data) => {
        // sort by year ascending 
        data.sort((a,b) => a.year - b.year);

        dataset = data;

        //create chart
        chart1 = d3.select("#chart")
            .attr('width', w)
            .attr('height', h)

        //create axis
        xScale = d3.scaleTime()
            .domain(
            [
                d3.min(dataset, (d) => d.year), 
                d3.timeDay.offset(d3.max(dataset, (d) => d.year), 1)
            ])
        .range([0, w-100])

        yScale = d3.scaleLinear()
        .domain([0, 140])
        .range([ h - 30, 20]);

        //append data
        chart1.append('path')
        .datum(dataset)
        .attr('fill', 'none')
        .attr('stroke', "steelblue")
        .attr('stroke-width', 2.5)
        .attr('d', d3.line()
            .x(function(d) { return xScale(d.year) + 80})
            .y(function(d) { return yScale(d.value) })
        )
        

        
        xAxis = d3.axisBottom(xScale)
            .ticks(5)
            .tickFormat(d3.timeFormat("%Y"));

        yAxis = d3.axisLeft(yScale)
            .ticks(15)
            .tickFormat((d) => {return d+" USD"})

        // AXES
        xAxisGroup = chart1.append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(80, ${h - 30})`)
            .call(xAxis);

        yAxisGroup = chart1.append('g')
            .attr('class', 'axis-left1')
            .attr('transform', `translate(80, 0)`)
            .call(yAxis);
    })

}
initGraph();