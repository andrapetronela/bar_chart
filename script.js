const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';

req = new XMLHttpRequest();
req.open('GET', url, true);
req.send();
req.onload = () => {
    req = JSON.parse(req.responseText);
    req = req.data;

const dataset = req;
    
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
    
const tooltip = d3.select('#container')
                    .append('div')
                    .attr('id', 'tooltip');                      
svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d, i) => yMargin + i * padding) 
    .attr('y', (d) => h - yMargin - yScale(d[1]))
    .attr('width', (w - yMargin) / dataset.length-1)
    .attr('height', (d) => yScale(d[1]))
    .attr('fill', (d) => {
        if (d[1] < 300) { return '#fdd835';}
        else if (d[1] >= 300 && d[1] <= 500) { return '#ffc107'}
        else if (d[1] > 500 && d[1] <= 700) { return '#ffb300' } 
        else if (d[1] > 700 && d[1] <= 1000) { return '#ff9800'}
        else if (d[1] > 1000 && d[1] <= 1300) { return '#ffa000'}
        else if (d[1] > 1300 && d[1] <= 1600) { return '#ff8f00'}
        else if (d[1] > 1600 && d[1] <= 2000) { return '#fb8c00'}
        else if (d[1] > 2000 && d[1] <= 2400) { return '#f57c00'}
        else if (d[1] > 2400 && d[1] <= 3000) { return '#f57f17'}
        else if (d[1] > 3000 && d[1] <= 3600) { return '#ef6c00'}
        else if (d[1] > 3600 && d[1] <= 4400) { return '#ff6f00'}
        else if (d[1] > 4400 && d[1] <= 5400) { return '#ff6d00'}
        else if (d[1] > 5400 && d[1] <= 7400) { return '#ff5722'}
        else if (d[1] > 7400 && d[1] <= 10400) { return '#f4511e'}
        else if (d[1] > 10400 && d[1] <= 14233) { return '#e64a19'}
        else if (d[1] > 14233 && d[1] <= 14570) { return '#d84315'}
        else if (d[1] > 14570 && d[1] <= 15260) { return '#bf360c'}
        else if (d[1] > 15260 && d[1] <= 16500) { return '#bf360c'}
        else if (d[1] > 16500 && d[1] <= 17000) { return '#bf360c'}
        else if (d[1] > 17000) { return '#af2900'}
    })
    .attr('data-date', (d) => d[0])
    .attr('data-gdp', (d) => d[1])
    .on('mouseover', (d) => {
      tooltip
          .style("left", d3.event.pageX + "px") 
          .style("top", d3.event.pageY + "px")
          .style('padding', '1rem')
          .style("visibility", "visible")
          .attr("data-date", d[0])
          .html(d[0] + '<br /><strong>'+d[1]+' Billions $ </strong>')
    })
    .on('mouseout', (d) => { tooltip.style("visibility","hidden")
        });

const xAxis = d3.axisBottom()
                .scale(xScale);

const yAxisScale = d3.scaleLinear()
                        .domain([d3.max(dataset, (d) => d[1]), 0])
                        .range([2, h - yMargin]);
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
    