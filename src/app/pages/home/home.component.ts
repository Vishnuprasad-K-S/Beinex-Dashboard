import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public stackedOptions: any;
  public beinexData: any = {};
  public auraaData: any = {};

  constructor() { }

  ngOnInit(): void {
    var donutData = [
      { name: "35%", value: "35", color: "#207886" },
      { name: "65%", value: "65", color: "#6b949a" },
    ]
    this._createDonutChart(donutData)
    // this._createBarStackedOne()
    // this._createBarStackedThree()

    this.stackedOptions = {
      indexAxis: 'y',
      plugins: {
        tooltips: {
          mode: 'index',
          intersect: false
        },
        legend: {
            display: true,
            position: 'top' 
        }
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: '#eef6f8'
          },
          grid: {
            color: '#eef6f8'
          }
        },
        y: {
          stacked: true,
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#eef6f8'
          }
        }
      }
    };

    this.beinexData = {
      labels: ['Strategic Affairs', 'Healthcare Sector', 'Healthcare Facilities', 'Support Services'],
      datasets: [{
        type: 'bar',
        label: 'On Track',
        backgroundColor: '#32a66d',
        data: [4, 3, 3, 5]
      }, {
        type: 'bar',
        label: 'Delayed',
        backgroundColor: '#e99b39',
        data: [3, 2, 5, 3]
      }, {
        type: 'bar',
        label: 'Significantly Delayed',
        backgroundColor: '#cb334c',
        data: [5, 3, 2, 2]
      }, {
        type: 'bar',
        label: 'Completed',
        backgroundColor: '#295b66',
        data: [2,3, 1, 2]
      }
      ]
    };

    this.auraaData = {
      labels: ['Dr Omar Najim', 'Sharon Reily', 'Salem Abdulkareem', 'Amna Alhameli'],
      datasets: [{
        type: 'bar',
        label: 'On Track',
        backgroundColor: '#32a66d',
        data: [4, 3, 3, 5]
      }, {
        type: 'bar',
        label: 'Delayed',
        backgroundColor: '#e99b39',
        data: [3, 2, 5, 3]
      }, {
        type: 'bar',
        label: 'Significantly Delayed',
        backgroundColor: '#cb334c',
        data: [3, 3, 2, 2]
      }, {
        type: 'bar',
        label: 'Completed',
        backgroundColor: '#295b66',
        data: [5, 3, 1, 2]
      }
      ]
    };
   }

  private _createBarStackedOne(): void {

    var svg = d3.select("svg#stackedBar"),
      margin = { top: 20, right: 20, bottom: 30, left: 40 },
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom,
      g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var y = d3.scaleBand()			// x = d3.scaleBand()	
      .rangeRound([0, height])	// .rangeRound([0, width])
      .paddingInner(0.05)
      .align(0.1);

    var x = d3.scaleLinear()		// y = d3.scaleLinear()
      .rangeRound([0, width]);	// .rangeRound([height, 0]);

    var z = d3.scaleOrdinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);


      //@ts-ignore
      d3.csv("assets/csvy.csv", (d,i, columns) => {
        console.log(d)
        // for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
        // d.total = t;
        // return d;
      }, (error, data) => {
        console.log("error",data)
        if (error) throw error;
      });


      //  var keys = data.columns.slice(1);
      
        //@ts-ignore
        //data.sort(function(a, b) { return b.total - a.total; });
        //@ts-ignore
        y.domain(atY);					// x.domain...
        //@ts-ignore
        //x.domain([0, d3.max(data, function(d) { return d.total; })]).nice();	// y.domain...
        z.domain(keys);
      
        g.append("g")
          .selectAll("g")
          //@ts-ignore
          .data(d3.stack().keys(keys)(data))
          .enter().append("g")
          //@ts-ignore
            .attr("fill", function(d) { return z(d.key); })
          .selectAll("rect")
          .data(function(d) { return d; })
          .enter().append("rect")
          //@ts-ignore
            .attr("y", function(d) { return y(d.data.State); })	    //.attr("x", function(d) { return x(d.data.State); })
            .attr("x", function(d) { return x(d[0]); })			    //.attr("y", function(d) { return y(d[1]); })	
            .attr("width", function(d) { return x(d[1]) - x(d[0]); })	//.attr("height", function(d) { return y(d[0]) - y(d[1]); })
            .attr("height", y.bandwidth());						    //.attr("width", x.bandwidth());	
      
        g.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0,0)") 						//  .attr("transform", "translate(0," + height + ")")
            .call(d3.axisLeft(y));									//   .call(d3.axisBottom(x));
      
        g.append("g")
            .attr("class", "axis")
          .attr("transform", "translate(0,"+height+")")				// New line
            .call(d3.axisBottom(x).ticks(null, "s"))					//  .call(d3.axisLeft(y).ticks(null, "s"))
          .append("text")
            .attr("y", 2)												//     .attr("y", 2)
            //@ts-ignore
            .attr("x", x(x.ticks().pop()) + 0.5) 						//     .attr("y", y(y.ticks().pop()) + 0.5)
            .attr("dy", "0.32em")										//     .attr("dy", "0.32em")
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .attr("text-anchor", "start")
            .text("Population")
          .attr("transform", "translate("+ (-width) +",-10)");   	// Newline
      
        var legend = g.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
          .selectAll("g")
          // .data(keys.slice().reverse())
          .enter().append("g")
          //.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
         .attr("transform", function(d, i) { return "translate(-50," + (300 + i * 20) + ")"; });
      
        legend.append("rect")
            .attr("x", width - 19)
            .attr("width", 19)
            .attr("height", 19)
            //@ts-ignore
            .attr("fill", z);
      
        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            //@ts-ignore
            .text(function(d) { return d; });

  }

  // private _barStackedTwo() {
  //   var data = [{ data: [{ target: { id: 'MED_SURG', name: 'Med/Surg' }, count: 6 }, { target: { id: 'ICU', name: 'ICU' }, count: 5 }, { target: { id: 'SPI_INICU', name: 'Spine/INICU' }, count: 1 }, { target: { id: 'INT', name: 'Intermediate' }, count: 3 }, { target: { id: 'TELE', name: 'Tele' }, count: 1 }, { target: { id: 'SPEC', name: 'Specialty' }, count: 0 }], source: 'ED' }, { data: [{ target: { id: 'MED_SURG', name: 'Med/Surg' }, count: 5 }, { target: { id: 'ICU', name: 'ICU' }, count: 2 }, { target: { id: 'SPI_INICU', name: 'Spine/INICU' }, count: 4 }, { target: { id: 'INT', name: 'Intermediate' }, count: 0 }, { target: { id: 'TELE', name: 'Tele' }, count: 1 }, { target: { id: 'SPEC', name: 'Specialty' }, count: 0 }], source: 'PACU' }];

  //   var UNIT_LABEL_WIDTH = 100;
  //   var UNIT_LABEL_HEIGHT = 25;
  //   var GUTTER_WIDTH = 25;

  //   var chartContainer = '.chart-container';
  //   var chartLegendContainer = '.chart-legend-container';

  //   var margins = {
  //     left: UNIT_LABEL_WIDTH,
  //     bottom: UNIT_LABEL_HEIGHT,
  //     right: GUTTER_WIDTH
  //   };

  //   var sizes = {
  //     width: 500,
  //     height: 200
  //   };

  //   var width = sizes.width - margins.left - margins.right;
  //   var height = sizes.height - margins.bottom;

  //   var series = data.map(function (d) {
  //     return d.source;
  //   });

  //   var dataset = data.map(function (d) {
  //     return d.data.map(function (o, i) {
  //       // Structure it so that your numeric axis (the stacked amount) is y
  //       return {
  //         y: o.count,
  //         x: o.target.name
  //       };
  //     });
  //   });

  //   d3.stack()(dataset);

  //   //@ts-ignore
  //   var dataset = dataset.map((group) => {
  //     return group.map((d) => {
  //       // Invert the x and y values, and y0 becomes x0
  //       return {
  //         x: d.y,
  //         y: d.x,
  //         //@ts-ignore
  //         x0: d.y0
  //       };
  //     });
  //   });

  //   var svg = d3.select(chartContainer)
  //     .append('svg')
  //     .attr('width', width + margins.left + margins.right)
  //     .attr('height', height + margins.bottom)
  //     .append('g')
  //     .attr('transform', 'translate(' + margins.left + ', 0)');

  //   var units = dataset[0].map(function (d) {
  //     return d.y;
  //   });


  //   var yScale = d3.scale.ordinal()
  //     .domain(units)
  //     .rangeRoundBands([0, height], .1);

  //   var yAxis = d3.svg.axis()
  //     .scale(yScale)
  //     .orient('left');

  //   var xMax = d3.max(dataset, function (group) {
  //     var groupMax = d3.max(group, function (d) {
  //       //@ts-ignore
  //       return d.x + d.x0;
  //     });
  //     return groupMax;
  //   });

  //   var xScale = d3.scale.linear()
  //     .domain([0, xMax])
  //     .range([0, width]);

  //     //@ts-ignore
  //   var xAxis = d3.svg.axis()
  //     .scale(xScale)
  //     .orient('bottom');

  //     //@ts-ignore
  //   var colors = function (i) {
  //     return i ? '#30A7D6' : '#16557F';
  //   };

  //   var groups = svg.selectAll('g')
  //     .data(dataset)
  //     .enter()
  //     .append('g')
  //     .style('fill', function (d, i) {
  //       return colors(i);
  //     });

  //   groups.selectAll('rect')
  //     .data(function (d) { return d; })
  //     .enter()
  //     .append('rect')
  //     .attr('x', function (d) {
  //       //@ts-ignore
  //       return xScale(d.x0);
  //     })
  //     .attr('y', function (d, i) { return yScale(d.y); })
  //     .attr('height', function (d) { return yScale.rangeBand(); })
  //     .attr('width', function (d) { return xScale(d.x); })
  //     .on('mouseover', function (d) {
  //       var xPos = parseFloat(d3.select(this).attr('x')) / 2 + width / 2;
  //       var yPos = parseFloat(d3.select(this).attr('y')) + yScale.rangeBand() / 2;
  //       d3.select('#tooltip')
  //         .style('left', xPos + 'px')
  //         .style('top', yPos + 'px')
  //         .select('#value')
  //         .text(d.x);
  //       d3.select('#tooltip').classed('hidden', false);
  //     })
  //     .on('mouseout', function () {
  //       d3.select('#tooltip').classed('hidden', true);
  //     });

  //   svg.append('g')
  //     .attr('class', 'bc-x-axis bc-axis')
  //     .attr('transform', 'translate(0,' + height + ')')
  //     .call(xAxis);

  //   svg.append('g')
  //     .attr('class', 'bc-y-axis bc-axis')
  //     .call(yAxis);

  //   // Legend
  //   var legendContainer = d3.select(chartLegendContainer)
  //     .append('div')
  //     .attr('class', 'bc-legend');

  //   legendContainer
  //     .append('span')
  //     .attr('class', 'bc-legend-label')
  //     .html(series[0]);

  //   series.forEach(function (s, i) {
  //     legendContainer.append('span')
  //       .attr('class', 'bc-legend-color')
  //       .style('background-color', colors(i));
  //   });

  //   legendContainer
  //     .append('span')
  //     .attr('class', 'bc-legend-label')
  //     .html(series[1]);
  // }

  private _createDonutChart(data: any): void {
    var height = 450, width = 450, margin = { top: 10, right: 30, bottom: 30, left: 40 }
    var colors: any = []
    var radius = Math.min(width, height) / 2 - margin.left;
    var svg = d3
      .select("figure#donut")
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append("g")
      .attr(
        "transform",
        "translate(" + width / 2 + "," + height / 2 + ")"
      );

      let index = 0;
      const defaultColors = [
        "#6773f1",
        "#32325d",
        "#6162b5",
        "#6586f6",
        "#8b6ced",
        "#1b1b1b",
        "#212121"
      ];
      const colorsRange: any = [];
      data.forEach((element: any) => {
        if (element.color) colorsRange.push(element.color);
        else {
          colorsRange.push(defaultColors[index]);
          index++;
        }
      });
      
      colors = d3
        .scaleOrdinal()
        .domain(data.map((d: any) => d.value.toString()))
        .range(colorsRange);

        var pie = d3
        .pie()
        .sort(null) // Do not sort group by size
        .value((d: any) => {
          return d.value;
        });
    var data_ready = pie(data);

    // The arc generator
    var arc = d3
      .arc()
      .innerRadius(radius * 0.5) // This is the size of the donut hole
      .outerRadius(radius * 0.8);

    // Another arc that won't be drawn. Just for labels positioning
    var outerArc = d3
      .arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll("allSlices")
      .data(data_ready)
      .enter()
      .append("path")
      //@ts-ignore
      .attr("d", arc)
      .attr("fill", (d: any) => colors(d.data.value))
      .style("opacity", 0.7);

    // Add the polylines between chart and labels:
    svg
      .selectAll("allPolylines")
      .data(data_ready)
      .enter()
      .append("polyline")
      .attr("stroke", "black")
      .style("fill", "none")
      .attr("stroke-width", 1)
      //@ts-ignore
      .attr("points", (d: any) => {
        var posA = arc.centroid(d); // line insertion in the slice
        var posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
        var posC = outerArc.centroid(d); // Label position = almost the same as posB
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC];
      });

    // Add the polylines between chart and labels:
    svg
      .selectAll("allLabels")
      .data(data_ready)
      .enter()
      .append("text")
      .text((d: any) => {
        return d.data.name;
      })
      .attr("transform", d => {
        //@ts-ignore
        var pos = outerArc.centroid(d);
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return "translate(" + pos + ")";
      })
      .style("text-anchor", d => {
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midangle < Math.PI ? "start" : "end";
      })

    svg.select('text').style("background-color", (d) => { return "white"; })
  }

  private _createBarStackedThree() {
    var data = [{ "date": "4/1854", "total": 8571, "disease": 1, "wounds": 0, "other": 5 }, { "date": "5/1854", "total": 23333, "disease": 12, "wounds": 0, "other": 9 }, { "date": "6/1854", "total": 28333, "disease": 11, "wounds": 0, "other": 6 }, { "date": "7/1854", "total": 28772, "disease": 359, "wounds": 0, "other": 23 }, { "date": "8/1854", "total": 30246, "disease": 828, "wounds": 1, "other": 30 }, { "date": "9/1854", "total": 30290, "disease": 788, "wounds": 81, "other": 70 }, { "date": "10/1854", "total": 30643, "disease": 503, "wounds": 132, "other": 128 }, { "date": "11/1854", "total": 29736, "disease": 844, "wounds": 287, "other": 106 }, { "date": "12/1854", "total": 32779, "disease": 1725, "wounds": 114, "other": 131 }, { "date": "1/1855", "total": 32393, "disease": 2761, "wounds": 83, "other": 324 }, { "date": "2/1855", "total": 30919, "disease": 2120, "wounds": 42, "other": 361 }, { "date": "3/1855", "total": 30107, "disease": 1205, "wounds": 32, "other": 172 }, { "date": "4/1855", "total": 32252, "disease": 477, "wounds": 48, "other": 57 }, { "date": "5/1855", "total": 35473, "disease": 508, "wounds": 49, "other": 37 }, { "date": "6/1855", "total": 38863, "disease": 802, "wounds": 209, "other": 31 }, { "date": "7/1855", "total": 42647, "disease": 382, "wounds": 134, "other": 33 }, { "date": "8/1855", "total": 44614, "disease": 483, "wounds": 164, "other": 25 }, { "date": "9/1855", "total": 47751, "disease": 189, "wounds": 276, "other": 20 }, { "date": "10/1855", "total": 46852, "disease": 128, "wounds": 53, "other": 18 }, { "date": "11/1855", "total": 37853, "disease": 178, "wounds": 33, "other": 32 }, { "date": "12/1855", "total": 43217, "disease": 91, "wounds": 18, "other": 28 }, { "date": "1/1856", "total": 44212, "disease": 42, "wounds": 2, "other": 48 }, { "date": "2/1856", "total": 43485, "disease": 24, "wounds": 0, "other": 19 }, { "date": "3/1856", "total": 46140, "disease": 15, "wounds": 0, "other": 35 }];
    var key = ["wounds", "other", "disease"];
    var initStackedBarChart = {
      draw: (config: any) => {
        var me = this,
        domEle = config.element,
        stackKey = config.key,
        data = config.data,
        margin = {top: 20, right: 20, bottom: 30, left: 50},
        parseDate = d3.timeParse("%m/%Y"),
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom,
        xScale = d3.scaleLinear().rangeRound([0, width]),
        yScale = d3.scaleBand().rangeRound([height, 0]).padding(0.1),
        color = d3.scaleOrdinal().range(["#6773f1",
        "#32325d",
        "#6162b5",]),
        xAxis = d3.axisBottom(xScale),
        //@ts-ignore
        yAxis =  d3.axisLeft(yScale).tickFormat(d3.timeFormat("%b")),
        svg = d3.select("#"+domEle).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
        var stack = d3.stack()
          .keys(stackKey)
          /*.order(d3.stackOrder)*/
          .offset(d3.stackOffsetNone);
      
        var layers= stack(data);
        //@ts-ignore
          data.sort(function(a, b) { return b.total - a.total; });
          //@ts-ignore
          yScale.domain(data.map(function(d) { return parseDate(d.date); }));
          //@ts-ignore
          xScale.domain([0, d3.max(layers[layers.length - 1], function(d) { return d[0] + d[1]; }) ]).nice();
    
        var layer = svg.selectAll(".layer")
          .data(layers)
          .enter().append("g")
          .attr("class", "layer")
          //@ts-ignore
          .style("fill", function(d, i) { return color(i); });
    
          layer.selectAll("rect")
            .data(function(d) { return d; })
          .enter().append("rect")
          //@ts-ignore
            .attr("y", function(d) { return yScale(parseDate(d.data.date)); })
            .attr("x", function(d) { return xScale(d[0]); })
            .attr("height", yScale.bandwidth())
            .attr("width", function(d) { return xScale(d[1]) - xScale(d[0]) });
    
          svg.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + (height+5) + ")")
          .call(xAxis);
    
          svg.append("g")
          .attr("class", "axis axis--y")
          .attr("transform", "translate(0,0)")
          .call(yAxis);							
      }
    }

    initStackedBarChart.draw({
      data: data,
      key: key,
      element: 'stacked-bar'
    });
  }

}
