import { Component, OnInit, Directive, ElementRef, Attribute, SimpleChange, Input } from '@angular/core';
import * as d3 from 'd3';
import { IArticle } from '../Models/Article'

@Directive({
  selector: 'app-like-graph',

})
export class LikeGraphComponent implements OnInit {
  @Input() data: IArticle[];  // raw chart data
  private divs: any;            // DIV collection

  constructor(private elementRef: ElementRef, @Attribute('width') private width: string, @Attribute('height') private height: string) {
  }

  ngOnInit() {
    let el: any = this.elementRef.nativeElement;  // reference to <bar-graph> element from the main template
    var svg = d3.select(el).append("svg"),
      margin = { top: 20, right: 20, bottom: 20, left: 40 },
      width = +this.width - margin.left - margin.right,
      height = +this.height - margin.top - margin.bottom;

    var x = (<any>d3).scaleBand().rangeRound([0, width]).padding(0.1),
      y = (<any>d3).scaleLinear().rangeRound([height, 0]);

    svg.attr("height", this.height)
      .attr("width", this.width);
      
    var g = svg.append("g")

      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    this.data.forEach((article) => {
      x.domain(this.data.map(function (d) { return d.title; }));
      y.domain([0, d3.max(this.data, function (d) { return d.articleLikes.length; })]);

      g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call((<any>d3).axisBottom(x));

      g.append("g")
        .attr("class", "axis axis--y")
        .call((<any>d3).axisLeft(y).ticks(1))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Frequency");

      g.selectAll(".bar")
        .data(this.data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return x(d.title); })
        .attr("y", function (d) { return y(d.articleLikes.length); })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d.articleLikes.length); });
    })
  }
}
