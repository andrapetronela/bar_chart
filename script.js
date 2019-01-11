

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
      yMargin = 40,
      padding = w / dataset.length;
    
const firstYear = dataset[0][0];
const lastYear = dataset[dataset.length-1][0];
console.log(firstYear);
console.log(lastYear);

const svg = d3.select('body')
            .append('svg')
            .attr('class', 'chart')
            .attr('width', w)
            .attr('height', h);

const xScale = d3.scaleLinear()
                .domain([1945, 2015])
                .range([0, w]);

const yScale = d3.scaleLinear()
                .domain([d3.max(dataset, (d) => d[1]), 0])
                .range([h - yMargin, 0]);
    
svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d, i) => i * padding) 
    .attr('y', (d) => h - yMargin - yScale(d[1]))
    .attr('width', 5)
    .attr('height', (d) => yScale(d[1]))
    .attr('fill', '#333')
    .append('title')
    .text((d) => d);

const xAxis = d3.axisBottom()
                .scale(xScale)
//                .ticks(10, 'f')

svg.append('g')
    .attr('transform', 'translate(0, ' + (h - 40) + ')')
    .call(xAxis);
}