let margin = 30;
let w = 600;
let h = 600;
let chart;



//function for creating graph
function createGraph() {
    chart = d3.select('#chart')
        .attr('width', w)
        .attr('height', h)

    const dataset = generateRandomTree(4, () => randInt(100, 1000))

    const root = d3.hierarchy(dataset)
        .sum(d => d.value || 0);

    const color = d3.scaleOrdinal(d3.schemeSet2)
    const partition = d3.pack()
        .size([w,h])
        .padding(2)
    
    partition(root)
    console.log(root);
    chart.selectAll('rect')
        .data(root.descendants())
        .enter()
        .append('circle')
        .attr('r', d => d.r)
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .style('fill', d => color(d.depth))
        .style('stroke', 'black')
    
    chart.selectAll('text')
        .data(root.descendants())
        .enter()
        .append('text')
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .text(d => d.value)
        .style('text-anchor', 'middle')


}

//code based from Travis demo files
const randInt = (min, max) => (
    Math.floor(min + Math.random() * (max - min))
);

const generateRandomTree = (height, generateValue) => {
    if (height - 1 <= 0) {
        return {
        name: 'child',
        value: generateValue()
    };
    }

    const numChildren = randInt(3, 8);

    return {
    name: 'parent',
    children: Array.from({
        length: numChildren
    }, () => (
        generateRandomTree(height - randInt(1, 3), generateValue)
    ))
    };
};

createGraph();