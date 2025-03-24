import { Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <header style={{ maxHeight: 50 }}>
      <Box
        sx={{
          display: "flex",
          p: 1.25,
          borderBottom: "1px solid #007bff ",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src="./img/logo.png" alt="logo" width={80} height={30} />
        <Typography
          sx={{
            fontSize: 15,
            fontFamily: "cursive",
            color: "rgb(72, 172, 218)",
          }}
        >
          Aurora Cafe
        </Typography>
      </Box>
    </header>
  );
};

export default Header;
