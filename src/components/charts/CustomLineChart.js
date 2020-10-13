import React from "react";
import {useLineChart} from "../../hooks/useLineChart"

export default function CustomLineChart ({
    width="600",
    height="500",
    data
}) {
    let ref = useLineChart(width,height, data);

    return (<div className="chart">
        <svg ref={ref}></svg>
    </div>);
}