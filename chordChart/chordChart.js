let dataset;
let w = 625;
let h = 500;
let chart1;
let xScale, yScale, cScale;
let xAxis, yAxis;
let xAxisGroup, yAxisGroup;
let innerRadius = 200;
let outerRadius = 210;
data = [
    [42,  53, 60, 24, 19], //blue node
    [ 40, 60, 10, 19, 23], //orange node
    [ 62, 48, 36, 14, 27], //green node
    [ 77,   18,  38, 26, 19], //red node
    [ 40,   32,  21, 17, 12] //purple node
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

    let arcGenerator = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

    const color = d3.scaleOrdinal(d3.schemeCategory10);
    //chart bases
    chart1
        .datum(matrix)
        .append('g')
        .selectAll('g')
        .data((d) => d.groups)
        .enter()
        .append('path')
            .style('fill', (d, i) => color(i))
            .style('stroke', 'black')
            .attr('d', arcGenerator);
    
    //links between bases
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
            .style('fill',(d) => color(d.source.index))
            .style('opacity', .7)
            .style('stroke', 'black')

    chart1
        .append('g')
        .selectAll('text')
        .data((d) => d.groups)
        .enter()
        .append('text')
            .attr('transform', (d) => {return `translate(${arcGenerator.centroid(d)})`})
            .attr('font-family', 'sans-serif')
            .attr('font-size', '20px')
            .attr('fill', 'black')
            .attr('text-anchor', 'middle')
            .text((d, i) => "Total: " + d.value)
            
}

initGraph();