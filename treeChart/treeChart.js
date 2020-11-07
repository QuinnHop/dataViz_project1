let dataset;
let w = 600;
let h = 500;
let chart1;
let xScale, yScale, cScale;
let xAxis, yAxis;
let xAxisGroup, yAxisGroup;

let data = 
    {
        name: "Grandparent",
        children: [
            {name:"Parent",
            children: [
                {name: "Me", children: [
                    {name: 'Son', children: [
                        {name: 'Granddaughter', children:[]},
                    ]}
                ]},
                {name: 'Brother', children: [
                    {name: "Niece", children: []}
                ]}
            ]
        },
            {name: "Uncle",
            children: [
                {name: "Cousin", children: []}
            ]}
        ]
    }

function initGraph() {
    const root = d3.hierarchy(data, d => d.children)
    const tree = d3.tree()
        .size([w-40, h-40])

    tree(root)
    console.log(root)
        
    const chart = d3.select('#chart')
        .attr('width', w)
        .attr('height', h)

    //create chart
    chart.selectAll('lines')
    .data(root.links())
    .enter()
    .append('line')
    .style('stroke', 'black')
    .style('stroke-width', 1.5)
    .attr('x1', d => d.source.x + 10)
    .attr('x2', d => d.target.x + 10)
    .attr('y1', d => d.source.y + 10)
    .attr('y2', d => d.target.y + 10);

    chart.selectAll('circle')
        .data(root.descendants())
        .enter()
        .append('circle')
        .attr('cx', d => {
        //  debugger;
            return d.x + 10;
        })
        .attr('cy', d => d.y + 10)
        .attr('r', 10);

    chart.selectAll('text')
        .data(root.descendants())
        .enter()
        .append('text')
        .attr('x', d => d.x + 25)
        .attr('y', d => d.y + 12)
        .text(d => d.data.name);
        
}
initGraph();