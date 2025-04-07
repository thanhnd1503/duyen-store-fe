import React, { useState } from "react";
import {
  Box,
  Modal,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  SelectChangeEvent,
} from "@mui/material";

interface PaymentModalProps {
  open: any;
  onClose: () => void;
}
const PaymentModal = (props: PaymentModalProps) => {
  const { open, onClose } = props;
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleClose = () => onClose;

  const handlePaymentMethodChange = (event: SelectChangeEvent) => {
    setPaymentMethod(event.target.value as string);
  };

  const handleSubmit = () => {
    console.log("Phương thức thanh toán đã chọn:", paymentMethod);
    // Xử lý logic thanh toán ở đây
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="payment-modal-title"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography
            id="payment-modal-title"
            variant="h6"
            component="h2"
            mb={2}
          >
            Thanh Toán
          </Typography>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="payment-method-label">
              Chọn phương thức thanh toán
            </InputLabel>
            <Select
              labelId="payment-method-label"
              id="payment-method-select"
              value={paymentMethod}
              label="Chọn phương thức thanh toán"
              onChange={handlePaymentMethodChange}
            >
              <MenuItem value="credit-card">Thẻ tín dụng</MenuItem>
              <MenuItem value="bank-transfer">Chuyển khoản ngân hàng</MenuItem>
              <MenuItem value="e-wallet">Ví điện tử</MenuItem>
              <MenuItem value="cash">Tiền mặt</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            disabled={!paymentMethod}
          >
            Thanh Toán
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default PaymentModal;
