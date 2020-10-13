import { useEffect, useState } from "react";
/** utility */
export const normalizeData = (data) => {
    let catMap = new Map();
    data.forEach( (userData) => {
    let cat = userData.category;
    let cData = catMap.get(cat) || {names:"",value:0};

    cData.names += `${cData.names && ", "}${userData.user}`;
    cData.value += Number(userData.value);
    catMap.set(cat, cData);
    });
    return [...catMap.entries()].sort( (a,b)=>a[0]-b[0]);
}
export function useChartData (data) {
    let [chartData, setChartData ]= useState([]);
  
    useEffect( ()=>{
      let d = normalizeData(data)
      console.log(d);
      setChartData(d);
      // eslint-disable-next-line
    }, [data.length])
    return chartData;
}