import { Box, Button } from "@mui/material"


function Entry(){


    return(
        <>
        <div >
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: 2, // spacing between columns
                    border: "1px solid black",
                    width: "100%"
                }}
                >
                <Box sx={{border: "1px solid black"}}>Item 1</Box>
                <Box sx={{border: "1px solid black"}}>Item 2</Box>
                <Box sx={{border: "1px solid black"}}>Item 3</Box>
                <Box sx={{border: "1px solid black"}}>Item 4</Box>

                <Box sx={{border: "1px solid black", display: "flex"}}>
                    <Button>Edit</Button>
                    <Button>Remove</Button>
                </Box>
            </Box>
        </div>
        </>
    )
}

export default Entry