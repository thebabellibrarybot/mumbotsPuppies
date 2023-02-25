import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {

  // set ref 
  const svgRef = useRef();
  // onClickHandler
  const handleClick = (event, d) => {
    console.log('Selected Data:', d);
  };

  // updates with new props from barChart.js
  useEffect(() => {
    // declare svg obj
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // clear old charts when useEffect reRenders

    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // x axis scales
    const xScale = d3.scaleBand()
      .domain(data.map((d, i) => i))
      .range([margin.left, innerWidth])
      .padding(0.1);

    // y axis scales
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.num)])
      .range([innerHeight, 0]);

    // append dataBars to svg
    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => xScale(i)) // use index to position bars along x-axis
      .attr('y', d => yScale(d.num) + margin.top) // shift bars down by top margin
      .attr('width', xScale.bandwidth())
      .attr('height', d => innerHeight - yScale(d.num))
      .attr('fill', '#3498db')
      .on('mouseenter', function() {
        console.log('hovering')
        d3.select(this).attr('fill', 'red');
      })
      .on('mouseleave', function() {
        d3.select(this).attr('fill', '#3498db');
      })
      .on('mouseover', (event, d) => {
        // add text element to show the value on hover
        svg.append('text')
          .attr('class', 'value-text')
          .attr('x', xScale(data.indexOf(d)) + xScale.bandwidth() / 2)
          .attr('y', yScale(d.num) + margin.top - 5)
          .text(`${d.value}: ${d.num}`)
          .attr('text-anchor', 'middle');
      })
      .on('mouseout', (event, d) => {
        // select and remove the text element with class 'value-text'
        svg.select('.value-text').remove();
      })
      .on('click', handleClick);
        

    // declare axis's
    const xAxis = d3.axisBottom(xScale)
        .tickFormat(d => data[d].value);

    const yAxis = d3.axisLeft(yScale);

    // add x-axis
    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${innerHeight + margin.top})`) 
      .call(xAxis)
      .selectAll('text')
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'end')
      .attr('dx', '-0.8em')
      .attr('dy', '-0.15em');

    // add y-axis
    svg.append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(yAxis);
  }, [data]);

  return (
    <div>
      <h1>reresentation of asset via cultural institution: Morgan Library</h1>
      <svg ref={svgRef} width="600" height="400"></svg>
    </div>
  );
};

export default BarChart;