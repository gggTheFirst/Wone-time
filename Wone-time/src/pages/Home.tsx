import DashBoard from "../components/DashBoard";
import { useQuery } from "@tanstack/react-query";
import { useLoginInfo } from "../stores/loginState";
import { type UserData } from "../types";
import { getUserInfo } from "../services/api";

function Home() {
  const { data } = useQuery<UserData>({
    queryKey: ["currentUser", useLoginInfo.getState().userId],
    queryFn: () => getUserInfo(useLoginInfo.getState().userId),
  });
  if (data) {
    console.log(" state setting");
    useLoginInfo.setState({ userName: data.name, userId: data.id });
  }
  console.log(data);
  return <DashBoard />;
}

export default Home;
