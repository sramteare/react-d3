import * as d3 from "d3";
export function useCustomD3LineChart () {
    function drawCustomLineChart(svg, {
        height,
        width,
        data
    }) {
        //graph configurations
        const margin = {top: 50, right: 50, bottom: 50, left: 50};
        const getPercent = (num, total) =>100*num/total;
        const xAxis = (xScale)=>{
            return (g) => {
                g.attr("transform", `translate(0,${height - margin.bottom})`)
                .call(d3.axisBottom(xScale))
            }
        };
        const yAxis = (yScale)=> {
            return (g) => {
                g.attr("transform", `translate(${margin.left},0)`)
                .call(d3.axisLeft(yScale)
                .tickFormat(format))
                .call(g => g.select(".domain").remove())
                .call(g => g.selectAll(".tick line").clone()
                .attr("stroke-opacity", 0.1)
                .attr("x2", width - margin.left - margin.right))
            }
        };
        const format = (x)=>x+"%";
        //todo extract this to a percent type axis
        let total = data.reduce( (acc, d)=>acc+d[1].value, 0);
        
        let [min, max] = d3.extent(data.map( d=>d[0]));
        min = min || 0;
        max = max || 0;
        let [yMin, yMax] = [0,100] //this is specific to this case can be parameterized as x axis.
        // todo scale logic should be abstracted into different types of formatting and data rendering
        const xScale = d3.scaleLinear()
            .domain([min,max]).range([margin.left, width - margin.right]);
        const yScale = d3.scaleLinear()
            .domain([yMin, yMax]).range([height - margin.bottom, margin.top]);
        const line = d3.line()
            .x(d => xScale(d[0]))
            .y(d => yScale(getPercent(d[1].value,total))); //todo logic should be abdstracted and should be generic here.
        let tooltipHeight, 
            tooltipWidth,
            tooltipMargin = 5;
        let tooltipPadding = tooltipMargin + 10;
        const move = (evt)=>{
            if(data.length>0){
                let pointer = d3.pointer(evt, this);
                const bisectX = d3.bisector((d)=>d[0]).left;
                let currX = xScale.invert(pointer[0]);
                let i = bisectX(data, currX, 1);//3rd param is min index
                let d0 = data[i-1],
                    d1 = data[i];
                if(d0 && d1){
                    let d = currX - d0[0] > d1[0] - currX ? d1 : d0;
                    let x = xScale(d[0]),
                        y = yScale( getPercent(d[1].value, total));
                    //console.log(`i:${i}, curX:${currX}, d:${d}, d0:${d0}, d1:${d1}`)
                    focusCircle.attr("cx", x)
                        .attr("cy",y )
                    ruleX.attr('x1', x).attr('y1', yScale(yMin))
                        .attr('x2', x).attr('y2', yScale(yMax));
                    ruleY.attr('x1', xScale(min)).attr('y1', y)
                        .attr('x2', xScale(max)).attr('y2', y);
                    //tooltip.html("Name: "+ d[1].names);
                    
                    let dim = tooltipRect.node().getBoundingClientRect();
                    tooltipHeight = dim.height;
                    tooltipWidth = dim.width;
                    tooltipRect.attr("x", x + tooltipMargin)		
                        .attr("y", y - (tooltipHeight + tooltipMargin)); 
                    tooltipText.attr("x", x+tooltipPadding)
                        .attr("y",y - (tooltipHeight) + tooltipPadding)
                        .text( ("Name: "+d[1].names).replace(/(.{20})..+/, "$1…"));
                        
                }
            }
            evt.preventDefault();
        }
        svg.attr("width", width)
            .attr("height", height)
        svg.selectAll("g").remove();
        var g = svg.append('g').attr("fill", "none")
        g.attr("tranform", `translate(${margin.left}, ${margin.top})`)
        g.append("g")
            .call(xAxis(xScale));
    
        g.append("g")
            .call(yAxis(yScale));
        
        g.append("path")
            .datum(data)
            .attr("class", "data-line")
            .attr("d", line);
        /** hover group */
        const focusLayer = g.append("g").style("display", "none");
        const focusCircle = focusLayer.append("circle").style("fill", "#000")
            .attr("r", 6);
        const ruleX = focusLayer.append("line")
            .attr("x1", margin.left)
            .attr("x2", margin.left)
            .attr("y1", height)
            .attr("y2", 0)
            .attr("class", "guiding-line")
        const ruleY = focusLayer.append("line")
            .attr("x1", margin.left)
            .attr("x2", width - margin.left - margin.right)
            .attr("y1", height - margin.bottom)
            .attr("y2", height - margin.bottom)
            .attr("class", "guiding-line");
        const tooltipRect = focusLayer.append("rect")
            .attr("class", "g-tooltip");
        const tooltipText = focusLayer.append("text")
            .attr("class", "g-tooltip-text");
        g.on("mouseover", _=>{
            if(data.length) {
                focusLayer.style("display", null)
            } 

        })
            //.on("mouseout",  _=> focusLayer.style("display", "none"))
            .on("mousemove touchmove", move);
        
    }
    
    function cleanUp(svg){
        svg.selectAll("g").remove();
        d3.select(svg.node().parentElement).select("div.tooltip").remove();
    }
    return [drawCustomLineChart, cleanUp]
}