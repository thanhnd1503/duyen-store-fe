"use client";
import {
  Card,
  CardMedia,
  CardContent,
  Chip,
  Typography,
  Grid,
  Button,
  Modal,
  Box,
  IconButton,
  TextField,
  Divider,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { formatVND } from "@/lib/helper";

interface CoffeeItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  isVegan?: boolean;
}

interface CoffeeMenuProps {
  items: CoffeeItem[];
  onOrderConfirm?: (orderData: {
    productId: string;
    name: string;
    quantity: number;
    totalPrice: any;
  }) => void;
  sx?: React.CSSProperties;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const CoffeeMenu = ({ items, onOrderConfirm }: CoffeeMenuProps) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CoffeeItem | null>(null);
  const [quantity, setQuantity] = useState(1);

  const handleOpen = (item: CoffeeItem) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setQuantity(1);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const totalPrice = selectedItem ? selectedItem.price * quantity : 0;

  return (
    <>
      <Grid container spacing={4} sx={{ padding: 3 }}>
        {items?.map((item, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                boxShadow: 3,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                },
                backgroundColor: "background.paper",
              }}
            >
              <CardMedia
                component="img"
                height="300"
                image={item.image}
                alt={item.name}
                sx={{
                  objectFit: "cover",
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                }}
              />
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    color: "text.primary",
                  }}
                >
                  {item.name}
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    color: "primary.main",
                    fontSize: "1.2rem",
                  }}
                >
                  {formatVND(item.price)}
                </Typography>
                {item.isVegan && (
                  <Chip
                    label="Vegan"
                    color="success"
                    size="small"
                    sx={{
                      alignSelf: "flex-start",
                      mb: 2,
                    }}
                  />
                )}
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: "auto",
                    fontWeight: 600,
                    py: 1,
                  }}
                  onClick={() => handleOpen(item)}
                >
                  Order
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
            {selectedItem?.name}
          </Typography>
          <Box display="flex" alignItems="center" mb={3}>
            <Typography mr={2}>Quantity:</Typography>
            <TextField
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              inputProps={{ min: 1 }}
              size="small"
              sx={{ width: 80 }}
            />
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h6" fontWeight="bold">
              ${formatVND(totalPrice)}
            </Typography>
          </Box>
          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
            onClick={() => {
              if (selectedItem && onOrderConfirm) {
                console.log("selectedItem", selectedItem);

                onOrderConfirm({
                  productId: selectedItem.productId,
                  name: selectedItem.name,
                  quantity: quantity,
                  totalPrice: totalPrice,
                });
              }
              handleClose();
            }}
          >
            Confirm Order
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default CoffeeMenu;
