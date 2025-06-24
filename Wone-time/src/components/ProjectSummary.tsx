import { Card, Typography, CardMedia, CardContent} from '@mui/material';


function ProjectSummary(){
    return(
        <Card sx={{width: "98%", display: "flex", m: "2px", borderRadius: "8px"}}>
                            
            <CardMedia
                component="img"
                image=""
                alt="Project Image"
                sx={{border: "1px solid black", width: "20%"}}
            />

            <CardContent  sx={{border: "1px solid black", display: "flex", flexDirection: "column", width: "70%"}}>
                <Typography>Project name</Typography>
                <Typography variant='caption'>Short Project description</Typography>
            </CardContent>

            <Typography sx={{border: "1px solid black"}}>Hours</Typography>
        </Card>
    )
}

export default ProjectSummary