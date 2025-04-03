"use client";
import { Box, Button, Fab } from "@mui/material";
import CoffeeMenu from "./components/CoffeeMenu";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BillModal, { Product } from "./components/BillModal";
import { useEffect, useState } from "react";
import useProducts from "@/app/hooks/useProducts";
import { useGet } from "@/app/hooks/useGet";

const List = () => {
  const {
    data: productsList,
    isLoading,
    error,
    refetch,
  } = useGet<any>("/products");

  const coffeeItems = productsList?.data;
  useEffect(() => {}, [productsList]);

  const [isOpenBill, setIsOpenBill] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    console.log("111111", products);
  }, [products]);
  const handleAddToOrder = (orderItem: any) => {
    console.log("orderItem", orderItem);

    setProducts((prevProducts) => {
      const existingProductIndex = prevProducts.findIndex(
        (product) => product.productId === orderItem.productId
      );

      if (existingProductIndex >= 0) {
        const updatedProducts = [...prevProducts];
        updatedProducts[existingProductIndex] = {
          ...updatedProducts[existingProductIndex],
          quantity:
            updatedProducts[existingProductIndex].quantity + orderItem.quantity,
        };
        return updatedProducts;
      } else {
        const newProduct: any = {
          productId: orderItem.productId,
          name: orderItem.name,
          price: orderItem.totalPrice,
          quantity: orderItem.quantity,
        };

        return [...prevProducts, newProduct];
      }
    });
  };

  const handleConfirm = (remainingProducts: Product[]) => {
    setProducts(remainingProducts);
  };

  const handleRemoveProduct = (productId: number | string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.productId !== productId)
    );
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
          onClick={() => setIsOpenBill(true)}
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
        {isOpenBill && (
          <BillModal
            open={isOpenBill}
            onClose={() => setIsOpenBill(false)}
            products={products}
            onConfirm={handleConfirm}
            onRemove={handleRemoveProduct}
          />
        )}
      </Box>
    </Box>
  );
};
export default List;
