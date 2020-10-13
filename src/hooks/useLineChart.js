import { useEffect, useRef } from "react";
import *  as d3 from "d3";
import {useCustomD3LineChart} from "../d3/useCustomD3LineChart"

export function useLineChart(width, height, data=[]){
    let ref = useRef();
    let [draw, cleanUp] = useCustomD3LineChart();
    
    useEffect( ()=>{
        const svg = d3.select(ref.current);
        draw(d3.select(ref.current), {width, height, data});
        if(cleanUp instanceof Function){
            return () => {
                cleanUp(svg)
            }
        }
    // eslint-disable-next-line    
    }, [width, height, data.length]);
    return ref;
}