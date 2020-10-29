let dataset;
let w = 625;
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
        liquor: d.liquor,
        drug: d.drug, 
        sexual_assault: d.sexual_assault,
        burglary: d.burglary,
        weapons: d.weapons
    }
}

function initGraph() {
  // use require(dataURL) if building with Parcel
    d3.csv(dataURL, rowConverter).then((data) => {
        // sort by year ascending 
        data.sort((a,b) => a.year - b.year);

        //add columns so stack() can parse them
        data.columns = ["year", "liquor", "drug", "sexual_assault", "burglary", "weapons" ];
        console.log(data)
        let stackData = d3.stack().keys(data.columns.slice(1))(data)
        //create chart
        chart1 = d3.select("#chart")
            .attr('width', w)
            .attr('height', h)

        //create axis
        xScale = d3.scaleTime()
            .domain(
            [
                d3.min(data, (d) => d.year), 
                d3.timeYear.offset(d3.max(data, (d) => d.year), 1)
            ])
        .range([0, w-125])

        yScale = d3.scaleLinear()
        .domain([0, 280])
        .range([ h - 30, 20]);

        let colorScale = (name) => {
            let colors = {liquor: "#FEA82F", drug:"#F15156", weapons:"#440D0F", burglary:"#246A73", sexual_assault:"#564787"};
            return colors[name];
        }

        //create recs
        let rects = chart1.selectAll('g').data(stackData).enter()
            .append('g')
            .attr('fill', d => colorScale(d.key))
        
        //append data
        rects.selectAll('rect')
            .data(d => d)
            .join('rect')
            .attr('x', (d, i) => xScale(d.data.year)+ (w-125)/(data.length))
            .attr('y', (d) => (yScale(d[1])))
            .attr('width', (w-125)/(data.length)-5)
            .attr('height', d => yScale(d[0]) - yScale(d[1]))
            
        
        xAxis = d3.axisBottom(xScale)
            .ticks(data.length+1)
            .tickFormat(d3.timeFormat("%Y"));

        yAxis = d3.axisLeft(yScale)
            .ticks(15)

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
        //Add the Legend
        let legend = chart1.append('g')
            .attr('font-family', 'sans-serif')
            .attr('font-size', 12)
            .attr('text-anchor', 'end')
        .selectAll('g')
        .data(tempData)
        .enter().append('g')
            .attr('transform', (d, i) => {return `translate(0,${i*20})`})
        
        legend.append('rect')
            .attr('x', w-20)
            .attr('width', 20)
            .attr('height', 20)
            .attr('fill', d => {return colorScale(d)})

        legend.append('text')
            .attr("x", w - 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(d => d);
    })

}
initGraph();