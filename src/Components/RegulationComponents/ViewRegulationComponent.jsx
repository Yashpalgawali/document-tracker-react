import { useEffect, useState } from "react";
import { getAllRegulations } from "../../api/RegulationApi";

export default function ViewRegulationComponent() {

    const [regulationList,setRegulationList] = useState([])

    useEffect(()=>{
        getAllRegulations().then((response) => {
            setRegulationList(response.data)
            console.log(response.data)
        })
    }, [])
}