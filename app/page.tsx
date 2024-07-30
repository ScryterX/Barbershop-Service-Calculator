import { getServerSession } from "next-auth";
import { authOptions } from "./_lib/auth";
import MainPage from "./_components/MainPage";
import LoginPage from "./_components/LoginPage";

const Page = async () => {
  //const { data: session } = useSession();
  const session = await getServerSession(authOptions);
  if (session?.user) {
    return <MainPage />;
  } else {
    return <LoginPage />;
  }
};

export default Page;
