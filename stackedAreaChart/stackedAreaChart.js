let dataset;
let w = 600;
let h = 500;
let chart1;
let xScale, yScale, cScale;
let xAxis, yAxis;
let xAxisGroup, yAxisGroup;

let dataURL = "data.csv";

let parseDate = d3.timeParse("%Y"); // put code here for d3 date parsing

function rowConverter(d) {
    // put code here for row conversion
    return {
        year: parseDate(d.year),
        coal: d.coal,
        natural_gas: d.natural_gas, 
        petroleum: d.petroleum,
        nuclear: d.nuclear,
        renewables: d.renewables
    }
}


function initGraph() {
  // use require(dataURL) if building with Parcel
    d3.csv(dataURL, rowConverter).then((data) => {
        // sort by year ascending 
        data.sort((a,b) => a.year - b.year);
        data.columns = ["year", "coal", "natural_gas", "petroleum", "nuclear", "renewables" ];
        dataset = d3.stack().keys(data.columns.slice(1))(data);
        console.log(data)

        let color= (name) => {
            
            let colors = {coal: "#7f7f7f", natural_gas:"#d62728", petroleum:"#ff7f0e", nuclear:"#2ca02c", renewables:"#1f77b4"};
            return colors[name];
        }

        let area = d3.area()
            .x(d => (xScale(d.data.year)+80))
            .y0(d => (yScale(d[0])))
            .y1(d => (yScale(d[1])))

        //create chart
        chart1 = d3.select("#chart")
            .attr('width', w)
            .attr('height', h)

        //create axis
        xScale = d3.scaleTime()
            .domain(
            [
                d3.min(data, (d) => d.year), 
                (d3.max(data, (d) => d.year))
            ])
        .range([0, w-100])

        yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, d => d3.max(d, d => d[1]))]).nice()
        .range([ h - 30, 20]);

        //append data
        chart1.append('g')
        .selectAll('path')
        .data(dataset)
        .join('path')
            .attr('fill',(d) => color(d.key))
            .attr('d', area)
        
        xAxis = d3.axisBottom(xScale)
            .ticks(10)
            .tickFormat(d3.timeFormat("%Y"));

        yAxis = d3.axisLeft(yScale)
            .ticks(10)
            .tickFormat((d) => {return d + ' BTU'})

        // AXES
        xAxisGroup = chart1.append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(80, ${h - 30})`)
            .call(xAxis);

        yAxisGroup = chart1.append('g')
            .attr('class', 'axis-left1')
            .attr('transform', `translate(80, 0)`)
            .call(yAxis);

        let tempData = data.columns.slice().reverse();
        tempData.pop();
        let legend = chart1.append('g')
            .attr('font-family', 'sans-serif')
            .attr('font-size', 12)
            .attr('text-anchor', 'end')
        .selectAll('g')
        .data(tempData)
        .enter().append('g')
            .attr('transform', (d, i) => {return `translate(0,${i*20})`})
        
        legend.append('rect')
            .attr('x', 200)
            .attr('width', 20)
            .attr('height', 20)
            .attr('fill', color)

        legend.append('text')
            .attr("x", 195)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(d => d);
    })

}
initGraph();