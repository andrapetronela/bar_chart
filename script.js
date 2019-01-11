const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';

req = new XMLHttpRequest();
req.open('GET', url, true);
req.send();
req.onload = () => {
    req = JSON.parse(req.responseText);
    req = req.data;
    console.log(req);


const dataset = req;

const w = 800,
      h = 400,
      padding = w / req.length;

const svg = d3.select('body')
            .append('svg')
            .attr('width', w)
            .attr('height', h);

const yScale = d3.scaleLinear()
                .domain([d3.max(dataset, (d) => d[1]), 0])
                .range([h, 0]);

svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d, i) => i * padding) 
    .attr('y', (d) => h - yScale(d[1]))
    .attr('width', 5)
    .attr('height', (d) => yScale(d[1]))
    .attr('fill', '#333')
    .append('title')
    .text((d) => d)
}