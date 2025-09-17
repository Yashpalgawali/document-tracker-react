import { useState } from "react"

export default function ViewRegulationTypeComponent(){
    
    const [regulationTypeList , setRegulationTypeList] = useState([])

    return(
        <div className="container">

        <table className="table table-striped table-hover">
            <thead>
                <th>Sr No</th>
                <th>Regulation Type</th>
                <th>Action</th>
            </thead>
            <tbody>
                {
                    regulationTypeList.map((regtype,index)=>(
                        <tr key={regtype.regulation_type_id}>
                            <td>{index+1}</td>
                            <td>{regtype.regulation_type}</td>
                            <td>Action</td>
                        </tr>
                    )) 
                }
            </tbody>
        </table>

        </div>
    )
}