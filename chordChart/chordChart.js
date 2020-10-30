let dataset;
let w = 625;
let h = 500;
let chart1;
let xScale, yScale, cScale;
let xAxis, yAxis;
let xAxisGroup, yAxisGroup;

data = [
    [11975,  5871, 8916, 2868],
    [ 1951, 10048, 2060, 6171],
    [ 8010, 16145, 8090, 8045],
    [ 1013,   990,  940, 6907]
];
function initGraph() {
     //create chart
    chart1 = d3.select("#chart")
        .attr('width', w)
        .attr('height', h)
        .append('g')
            .attr('transform', `translate(${w/2}, ${h/2})`)
    console.log(data)
    
    const matrix = d3.chord()
        .padAngle(.05)
        .sortSubgroups(d3.descending)
        (data)

    chart1
        .datum(matrix)
        .append('g')
        .selectAll('g')
        .data((d) => d.groups)
        .enter()
        .append('g')
        .append('path')
            .style('fill', 'grey')
            .style('stroke', 'black')
            .attr('d', d3.arc()
                .innerRadius(200)
                .outerRadius(210)
            );
        
    chart1
        .datum(matrix)
        .append('g')
        .selectAll('path')
        .data((d) => d)
        .enter()
        .append('path')
            .attr('d', d3.ribbon()
                .radius(200)
            )
            .style('fill', 'green')
            .style('stroke', 'black')
}
initGraph();