import { CategoryList } from "./_home/firstPage/CategoryList";
import Header from "./Header";

const MainPage = () => {
  return (
    <div className="h-screen bg-slate-50">
      <div className="bg-white">
        <Header />
      </div>
      <div className="px-5 pt-6">
        <div className="container px-6">
          <CategoryList />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
