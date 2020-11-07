let dataset;
let w = 800;
let h = 750;
let chart1;
let xScale, yScale, cScale;
let xAxis, yAxis;
let xAxisGroup, yAxisGroup;


d3.json('data.json').then(json => {
    const states = json.features.map(d => {
        return {
            state: d.properties.name,
            value: d.properties.value
        }
    })
    initVisualization(json, states)
})

const initVisualization = (dataset, values) => {
    chart1 = d3.select('#chart')
        .attr('height', h)
        .attr('width', w)

    const projection = d3.geoAlbersUsa()
        .translate([w/2, h/2]);

    const path = d3.geoPath()
        .projection(projection);

    const colorScale = d3.scaleLinear()
        .domain([20, 41])
        .range(['#fff', 'darkred']);

    chart1.selectAll('path')
        .data(dataset.features)
        .join('path')
        .attr('d', path)
        .style('fill', d => {
            const value = d.properties.value;
            return colorScale(value)
        })

        // legend and gradient information
        let tempData = [20, 41]
        let legend = chart1.append('g')
            .attr('font-family', 'sans-serif')
            .attr('font-size', 12)
            .attr('text-anchor', 'end')
        
        legend.append('rect')
            .attr('width', 200)
            .attr('height', 30)
            .attr('x', w/2 - 100)
            .attr('y', 60)


        let gradient = legend.append('linearGradient')
            .attr("id", "legendGradient")
            .attr("x1", "0%")
            .attr("x2", "100%")
            
        
        gradient.append("stop")
            .attr('class', 'start')
            .attr("offset", "0%")
            .attr("stop-color", colorScale(tempData[0]))
            .attr("stop-opacity", 1);

        gradient.append("stop")
            .attr('class', 'end')
            .attr("offset", "100%")
            .attr("stop-color", colorScale(tempData[1]))
            .attr("stop-opacity", 1);

        legend.select('rect')
            .attr('fill', 'url(#legendGradient)')

            for(let i = 0; i < tempData.length; i++) {
                legend.append('text')
                    .attr("x", w/2 - 105 + i*235)
                    .attr("y", 75)
                    .attr("dy", "0.32em")
                    .text( tempData[i]+ '%');
            }
        
            legend.append('text')
                .attr('x', w/2 + 30)
                .attr('y', 50)
                .style('text-anchor', 'center')
                .text('Obesity Rate')
}