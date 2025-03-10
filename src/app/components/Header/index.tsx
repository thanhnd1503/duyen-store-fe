import { Flex, Image, Typography } from "antd";

const Header = () => {
  return (
    <header>
      <Flex
        className="container"
        align="center"
        style={{
          padding: 10,
          borderBottom: "1px solid #007bff ",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
        justify="center"
      >
        <img src="./logo.png" alt="logo" width={80} height={30} />
        <Typography
          style={{
            fontSize: 15,
            fontFamily: "cursive",
            color: "rgb(72, 172, 218)",
          }}
        >
          Aurora Cafe
        </Typography>
      </Flex>
    </header>
  );
};

export default Header;
