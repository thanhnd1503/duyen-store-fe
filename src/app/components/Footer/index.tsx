import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        maxHeight: 50,
        borderTop: "1px solid #F4F4F4",
        display: "flex",
        justifyContent: "space-between",
        padding: 1,
        alignItems: "center",
      }}
    >
      <Typography fontSize={12}>© 2025 Aurora Cafe</Typography>
      <Stack direction="row" spacing={1} alignItems={"center"}>
        <IconButton
          sx={{
            bgcolor: "#1877F2",
            color: "white",
            borderRadius: "50%",
            width: 32,
            height: 32,
            "&:hover": { bgcolor: "#1256A0" },
          }}
        >
          <Facebook sx={{ fontSize: 18 }} />
        </IconButton>
        <IconButton
          sx={{
            bgcolor: "#1DA1F2",
            color: "white",
            borderRadius: "50%",
            width: 32,
            height: 32,
            "&:hover": { bgcolor: "#0C85D0" },
          }}
        >
          <Twitter sx={{ fontSize: 18 }} />
        </IconButton>
        <IconButton
          sx={{
            bgcolor: "#E1306C",
            color: "white",
            borderRadius: "50%",
            width: 32,
            height: 32,
            "&:hover": { bgcolor: "#C32F5D" },
          }}
        >
          <Instagram sx={{ fontSize: 18 }} />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default Footer;
