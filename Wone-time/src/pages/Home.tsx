import Box from '@mui/material/Box';
import Sidebar from '../components/Sidebar';
import DashBoard from '../components/DashBoard';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { useLoginInfo } from '../stores/loginState';
import { auth } from '../services/firebase';
import { type UserData } from '../types';

function Home(){



    async function getUserInfo(id : string){
        const key = await auth.currentUser?.getIdToken();
        const response = await api({
            method: "get",
            headers: {
                "Authorization" : `Bearer ${key}`
            },
            url: `/users/${id}`
        })
        console.log(response.data);
        
        return response.data;
    }

    const {data} = useQuery<UserData>({
        queryKey : ["currentUser", ],
        queryFn : () => getUserInfo(useLoginInfo.getState().userId), 
        
    })
    if (data) 
        useLoginInfo.setState({userName : data.name, userId: data.id})

    return(
        <>
        <Box sx={{minWidth: "100vw", minHeight: "95vh", display: "flex"}}>
            <Sidebar/>
            <DashBoard/>
        </Box>
        </>
    )
}

export default Home