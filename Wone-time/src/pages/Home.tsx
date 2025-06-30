import DashBoard from "../components/DashBoard";
import { useQuery } from "@tanstack/react-query";
import { useLoginInfo } from "../stores/loginState";
import { type UserData } from "../types";
import { getUserInfo } from "../services/api";

function Home() {
  const { data } = useQuery<UserData>({
    queryKey: ["currentUser"],
    queryFn: () => getUserInfo(useLoginInfo.getState().userId),
  });
  if (data) useLoginInfo.setState({ userName: data.name, userId: data.id });

  return <DashBoard />;
}

export default Home;
