import { Box, Button, Fab } from "@mui/material";
import CoffeeMenu from "./components/CoffeeMenu";
import AssignmentIcon from "@mui/icons-material/Assignment";

const List = () => {
  const coffeeItems = [
    {
      id: "1",
      name: "Trà Xanh Espresso Marble",
      price: 3.5,
      image: "/img/espresso.png",
    },
    {
      id: "2",
      name: "Đường Đen Sữa Đá",
      price: 4.5,
      image: "/img/cf_sua_da.png",
    },
    {
      id: "3",
      name: "Bạc Xỉu",
      price: 4.5,
      image: "/img/bac_xiu.png",
    },
  ];
  const handleAddToOrder = (oderItem: any) => {
    console.log("oderItem", oderItem);
  };
  return (
    <Box sx={{ maxWidth: "1000px", margin: "auto", pt: 5 }}>
      <CoffeeMenu onOrderConfirm={handleAddToOrder} items={coffeeItems} />
      <Box
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1000,
        }}
      >
        <Fab
          color="primary"
          aria-label="Your Order"
          onClick={() => alert("View your order")}
          sx={{
            // Optional custom styling
            width: 56,
            height: 56,
            "&:hover": {
              transform: "scale(1.1)",
              transition: "transform 0.2s",
            },
          }}
        >
          <AssignmentIcon />
        </Fab>
      </Box>
    </Box>
  );
};
export default List;
