import { Typography, Box } from "@mui/material"

function Header(){


    
    return(
        <Box sx={{backgroundColor:"grey", p:1, top:"0",width:"100vw", display:"flex", position: "relative"}}>    
            <Typography variant="h4">
              Wone Time!
            </Typography>
            <Typography variant="h4" sx={{right:"20px", position:"absolute"}}>
              Welcome xxx
            </Typography>
        </Box>
    )
}

export default Header