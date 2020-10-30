let dataset;
let w = 625;
let h = 500;
let chart1;
let xScale, yScale, cScale;
let xAxis, yAxis;
let xAxisGroup, yAxisGroup;

data = {
    nodes: [
        {name: 'Harry', color: 'blue'},
        {name: 'Tyler', color: 'black'},
        {name: 'Sue', color: 'green'},
        {name: 'Mary', color: 'orange'},
        {name: 'Craig', color: 'red'},
        {name: 'Sean', color: 'red'},
        {name: 'Tony', color: 'blue'},
        {name: 'Alex', color: 'pink'},
        {name: 'Kate', color: 'green'},
        {name: 'Dylan', color: 'green'},
        {name: 'Fred', color: 'orange'},
        {name: 'Cooper', color: 'orange'},
        {name: 'Nick', color: 'red'},
        {name: 'Beth', color: 'red'},
        {name: 'Robert', color: 'blue'},
        {name: 'Kelsey', color: 'blue'},
        {name: 'Perry', color: 'blue'},
        {name: 'Mitch', color: 'blue'},
        {name: 'Ellen', color: 'pink'},
        {name: 'Amy', color: 'pink'},
        {name: 'Rebecca', color: 'pink'},
        
    ],
    edges: [
        {source: 1, target: 7 },
        {source: 1, target: 2},
        {source: 1, target: 3},
        {source: 1, target: 4},
        {source: 1, target: 5},
        {source: 1, target: 6},
        {source: 2, target: 8},
        {source: 2, target: 9},
        {source: 3, target: 11},
        {source: 3, target: 10},
        {source: 4, target: 12},
        {source: 5, target: 13},
        {source: 6, target: 17},
        {source: 6, target: 0},
        {source: 0, target: 14},
        {source: 0, target: 15},
        {source: 0, target: 16},
        {source: 7, target: 18},
        {source: 7, target: 19},
        {source: 7, target: 20},
        {source: 20, target: 8},
        {source: 12, target: 13},
    ]
}

function initGraph() {
    console.log(data)
    const simulation = d3.forceSimulation(data.nodes)
        .force("link", d3.forceLink(data.edges))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(w/2, h/2))

    const drag = (simulation) => {
        function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }
        
        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }
        
        function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }
        
        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }
    //create chart
    chart1 = d3.select("#chart")
        .attr('width', w)
        .attr('height', h)

    let edges = chart1.selectAll('line')
        .data(data.edges)
        .enter()
        .append('line')
        .style('stroke', '#000')
        .style('stroke-width', 2);

    let nodes = chart1.selectAll('circle')
        .data(data.nodes)
        .enter()
        .append('circle')
            .attr('r', 10)
            .style('fill', (d) => d.color)
            .style('stroke', 'black')
            .style('stroke-width', 1.5)
        .call(drag(simulation))
        
    let labels = chart1.append('g')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 12)
        .attr('text-anchor', 'end')
        .style('user-select', 'none')
    .selectAll('g')
    .data(data.nodes)
    .enter()
        .append('g')
        .attr('transform', (d) => {return `translate(0,0)`})

    labels.append('text')
        .attr("x", (d) => 0)
        .attr("y", (d) => -17)
        .attr("dy", "0.45em")
        .attr('fill', d => d.color)
        .style('text-anchor', 'middle')
        .text(d => d.name);

    simulation.on('tick', () => {
        edges
            .attr('x1', (d) => {return d.source.x})
            .attr('y1', (d) => {return d.source.y})
            .attr('x2', (d) => {return d.target.x})
            .attr('y2', (d) => {return d.target.y})
        nodes
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
        labels
        .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            })
    })
}
initGraph();