import React, { useEffect, useRef } from "react"
import * as d3 from "d3"

function Axis ({
    domain,
    range,
    translate="",
    calledOn
}){
    let axisRef = useRef();

    useEffect( ()=>{
        let axis = d3.scaleLinear()
            .domain(domain)
            .range(range)
        let selected = d3.select(axisRef.current);
        console.log(translate)
        translate && selected.attr("transform", `translate(${translate})`)
        selected.call(calledOn(axis))
    });

    return (<g ref={axisRef}></g>)
}
export function LeftYAxis({
    range,
    domain
}){
    let conf = {
        domain,
        range,
        calledOn: (axis) => d3.axisLeft(axis)
    }
    return <Axis {...conf} />
}
export function BottomXAxis({
    start,
    end,
    range,
    domain
}){
    console.log([start, end].toString())
    let conf = {
        domain,
        range,
        translate:[start, end].toString(),
        calledOn: (axis) => d3.axisBottom(axis)
    }
    return <Axis {...conf} />
}