"use client";
import {
  Box,
  Modal,
  Typography,
  Button,
  IconButton,
  Divider,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { formatVND } from "@/lib/helper";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
};

const productItemStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  py: 1.5,
  px: 1,
  "&:hover": {
    bgcolor: "#f5f5f5",
    borderRadius: 1,
  },
};

export interface Product {
  productId: number | string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
  stock?: number;
}

interface BillModalProps {
  open: boolean;
  onClose: () => void;
  products: Product[];
  onConfirm: (remainingProducts: Product[]) => void;
  onRemove?: (productId: number | string) => void; // Optional callback khi xóa sản phẩm
}

const BillModal = ({
  open,
  onClose,
  products: initialProducts,
  onConfirm,
  onRemove,
}: BillModalProps) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  // Cập nhật internal state khi props thay đổi
  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const handleRemove = (id: number | string) => {
    const newProducts = products.filter((product) => product.productId !== id);
    setProducts(newProducts);

    // Gọi callback từ component cha nếu có
    if (onRemove) {
      onRemove(id);
    }
  };

  const calculateTotal = () => {
    return products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const handleConfirm = () => {
    onConfirm(products);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography
          variant="h6"
          component="h2"
          sx={{ mb: 2, fontWeight: "bold" }}
        >
          Hóa đơn thanh toán
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ maxHeight: 400, overflow: "auto" }}>
          {products.map((product, index) => (
            <Box key={index} sx={productItemStyle}>
              <Box sx={{ width: "50%" }}>
                <Typography fontWeight="medium">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.quantity} × {formatVND(product.price)}
                </Typography>
              </Box>

              <Typography fontWeight="medium">
                {formatVND(product.price * product.quantity)}
              </Typography>

              <IconButton
                color="error"
                onClick={() => handleRemove(product.productId)}
                aria-label="remove"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}

          {products.length === 0 && (
            <Typography color="text.secondary" textAlign="center" py={3}>
              Không có sản phẩm nào
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <Typography variant="h6">Tổng cộng:</Typography>
          <Typography variant="h6" fontWeight="bold">
            {formatVND(calculateTotal())}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="outlined" onClick={onClose}>
            Hủy bỏ
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirm}
            disabled={products.length === 0}
          >
            Thanh toán
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default BillModal;
