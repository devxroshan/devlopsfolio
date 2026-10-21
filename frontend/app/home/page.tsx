import AuthRequired from "../wrapper/AuthRequired";

const Home = () => {
  return (
    <>
      <AuthRequired>
        <div>Home</div>
      </AuthRequired>
    </>
  );
};

export default Home;
