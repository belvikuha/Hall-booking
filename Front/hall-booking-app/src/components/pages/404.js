import { Link } from "react-router-dom"

const Page404 =()=>{
    return(
        <div>
            <p style={{'textAlign':'center'}}>Page doesn't exist <br/> <Link to="/"> <b>Back to main page</b></Link> </p>
           
        </div>
    )
}

export default Page404