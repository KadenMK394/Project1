import { useEffect, useState } from "react"
import { ReimbursementInterface } from "../../Interfaces/ReimbursementInterface"
import axios from "axios"
import { store } from "../../GlobalData/store"
import { Reimbursements } from "./Reimbursements"

export const UserReimbs:React.FC = () => {
    const [reimbs, setReimbs] = useState<ReimbursementInterface[]>([])

    useEffect(() => {
        getUserReimbs(store.loggedInUser.userId)
    }, [])

    const getUserReimbs = async (userId:number) => {
        const response = await axios.get("http://localhost:5555/reimbursements/" + userId, {withCredentials:true})
        setReimbs(response.data)
    }

    return(
        <>
            <Reimbursements reimbs={reimbs}/>
        </>
    )
}