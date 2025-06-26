import { Typography, Box } from "@mui/material"
import { useLoginInfo } from "../stores/loginState"

function Header(){

    const username = useLoginInfo((state) => state.userName);
    const loginState = useLoginInfo((state)=> state.loginStatus)
    
    return(
        <Box sx={{backgroundColor:"grey", p:1, top:"0",width:"100vw", display:"flex", position: "relative"}}>    
            <Typography variant="h4">
              Wone Time!
            </Typography>
            {loginState &&
            <Typography variant="h4" sx={{right:"20px", position:"absolute"}}>
              Welcome {username}
            </Typography>}
        </Box>
    )
}

export default Header