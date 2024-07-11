import Header from '../Header/Header';
import Pagination from '../Pagination/Pagination';

const MainPage: React.FC = () => {
  return (
    <div className="mainPageWrapper">
      <Header/>
      <Pagination />
    </div>
  );
};
export default MainPage;
