import { useEffect, useState } from "react"
import { ReimbursementInterface } from "../../Interfaces/ReimbursementInterface"
import axios from "axios"
import { Reimbursements } from "./Reimbursements"

export const ManagerReimbs:React.FC = () => {
    const [reimbs, setReimbs] = useState<ReimbursementInterface[]>([])

    useEffect(() => {
        getAllReimbs()
    }, [])

    const getAllReimbs = async () => {
        const response = await axios.get("http://localhost:5555/reimbursements", {withCredentials:true})
        setReimbs(response.data)
    }

    return(
        <>
            <Reimbursements reimbs={reimbs}/>
        </>
    )
}