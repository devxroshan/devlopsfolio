import AuthRequired from "../wrapper/AuthRequired";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <AuthRequired>
        <Navbar/>
      </AuthRequired>
    </>
  );
};

export default Home;
