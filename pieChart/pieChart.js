let margin = 30;
let w = 600;
let h = 600;
let chart;
const outerRadius = Math.min(w, h)/2 - margin;
const innerRadius = 0;
const dataURL = 'data.csv';

//colors for each of the slices
let colors = (index) => {
    let color = ['#0bb5b5','#0bb52a', '#e3e632', '#e38c00', '#e32200']

    return (color[index]);
}

//parse csv format
function rowConverter(d){
    return {
        emotion: d.emotion,
        num_ratings: parseInt(d.num_ratings)
    }
}

//function for creating graph
function createGraph() {

    //load data in from csv
    d3.csv(dataURL, rowConverter).then((data) => {

        //modify svg size
        chart = d3.select('#chart')
            .attr('width', w)
            .attr('height', h)
            .append("g")
                .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");
        
        //input the data into the pie sections
        let pie = d3.pie()
            .value((d) => {return (d.num_ratings)})

        //create arc size converter
        let arcGenerator = d3.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius)

        //create each of the slices
        let arcs = chart.selectAll('g.slice')
            .data(pie(data))
            .enter()
            .append('g')
                .attr('class', 'slice')
            arcs.append('path')
                .attr('fill', (d, i) => {return colors(i)})
                .attr('d', arcGenerator)
                .attr('stroke', 'black')
                    .style('stroke-width', '2px')
                    .style('opacity', 0.7)

            //add text for slices
            arcs.append('text')
                .attr('transform', (d) => {return `translate(${arcGenerator.centroid(d)})`})
                .text((d) => {return (d.data.emotion)})
                .style('text-anchor', 'middle')
                .style('font-size', 17)
                
    });
}

createGraph();