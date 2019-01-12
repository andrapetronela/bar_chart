const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';

req = new XMLHttpRequest();
req.open('GET', url, true);
req.send();
req.onload = () => {
    req = JSON.parse(req.responseText);
    req = req.data;

const dataset = req;
    
const tooltip = d3.select('body')
                    .data(dataset)
                    .enter()
                    .append('rect')
                    .attr('id', 'tooltip')
                    .attr('data-date', (d) => d[0]);
    
const minDate = new Date(dataset[0][0]);
const maxDate = new Date(dataset[dataset.length-1][0]);
    
const w = 800,
      h = 400,
      yMargin = 40,
      padding = (w - yMargin) / dataset.length;

const svg = d3.select('body')
            .append('svg')
            .attr('class', 'chart')
            .attr('width', w)
            .attr('height', h);


const xScale = d3.scaleTime()
                .domain([minDate, maxDate])
                .range([yMargin, w-5]);
const yScale = d3.scaleLinear()
                .domain([d3.max(dataset, (d) => d[1]), 0])
                .range([h - yMargin, 0]);
                

    
svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d, i) => yMargin + i * padding) 
    .attr('y', (d) => h - yMargin - yScale(d[1]))
    .attr('width', (w - yMargin) / dataset.length-1)
    .attr('height', (d) => yScale(d[1]))
    .attr('fill', '#333')
    .attr('data-date', (d) => d[0])
    .attr('data-gdp', (d) => d[1])
//    .on('mouseover', () => tooltip.style('visibility', 'visible'))
//    .on('mouseout', () => tooltip.style('visibility', 'visible'))

    .append('title')
    .text((d) => d);

const xAxis = d3.axisBottom()
                .scale(xScale);

const yAxisScale = d3.scaleLinear()
                        .domain([d3.max(dataset, (d) => d[1]), 0])
                        .range([0, h - yMargin]);
const yAxis = d3.axisLeft()
                .scale(yAxisScale);

svg.append('g')
    .attr('transform', 'translate(0, ' + (h - yMargin) + ')')
    .attr('id', 'x-axis')
    .call(xAxis);
svg.append('g')
    .attr('transform', 'translate(40, 0)')
    .attr('id', 'y-axis')
    .attr('x', 0)
    .call(yAxis);
}