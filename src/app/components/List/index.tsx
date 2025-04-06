"use client";
import { Badge, Box, Button, Fab } from "@mui/material";
import CoffeeMenu from "./components/CoffeeMenu";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BillModal, { Product } from "./components/BillModal";
import { useEffect, useState } from "react";
import { useGet } from "@/app/hooks/useGet";
import { usePost } from "@/app/hooks/usePost";

const List = () => {
  // const {
  //   data: productsList,
  //   isLoading,
  //   error,
  //   refetch,
  // } = useGet<any>("/products");
  // const { data, isLoading, error, post } = usePost<ResponseType, RequestType>();

  const {
    data: productsList,
    isLoading: isProductsLoading,
    error: productsError,
    refetch: refetchProducts,
  } = useGet<any>("/products");

  // Sử dụng usePost để thêm sản phẩm mới
  const {
    data: addedProduct,
    isLoading: isAddingProduct,
    error: addProductError,
    post: addProduct,
  } = usePost<ResponseType, any>();
  const coffeeItems = productsList?.data;
  useEffect(() => {}, [productsList]);

  const [isOpenBill, setIsOpenBill] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  useEffect(() => {
    setTotalProducts(products.length);
  }, [products]);
  const handleAddToOrder = (orderItem: any) => {
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
          price: orderItem.price,
          quantity: orderItem.quantity,
        };

        return [...prevProducts, newProduct];
      }
    });
  };

  const handleConfirm = async (remainingProducts: Product[]) => {
    try {
      const createOrderData = {
        customerId: 1,
        orderItems: remainingProducts,
      };
      setProducts(remainingProducts);
      try {
        await addProduct("/orders", createOrderData, {
          onSuccess: (data) => {
            setProducts([]);
            // Sau khi thêm thành công, làm mới danh sách sản phẩm
            refetchProducts();
          },
          onError: (error) => {
            console.error("Failed to add product:", error);
          },
        });
      } catch (err) {
        console.log(err);
      }
      // Xử lý response nếu cần
    } catch (err) {
      // Đã xử lý trong hook, nhưng có thể xử lý thêm ở đây nếu cần
    }
  };

  const handleRemoveProduct = (productId: number | string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.productId !== productId)
    );
  };
  const handleCancle = () => {
    setProducts([]);
  };
  // const totalProducts = 5;
  return (
    <Box sx={{ maxWidth: "1000px", margin: "auto", pt: 5 }}>
      <CoffeeMenu onOrderConfirm={handleAddToOrder} items={coffeeItems} />
      <Box
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1,
          p: 1,
        }}
      >
        <Badge
          badgeContent={totalProducts}
          color="error" // Màu của badge (có thể dùng "primary", "secondary",...)
          overlap="circular" // Để badge không bị che bởi hình tròn của Fab
          anchorOrigin={{
            vertical: "top", // 'top' | 'bottom'
            horizontal: "right", // 'left' | 'right'
          }}
          sx={{
            "& .MuiBadge-badge": {
              zIndex: 2000,
            },
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
        </Badge>

        {isOpenBill && (
          <BillModal
            open={isOpenBill}
            onClose={() => setIsOpenBill(false)}
            products={products}
            onConfirm={handleConfirm}
            onRemove={handleRemoveProduct}
            onCancle={handleCancle}
          />
        )}
      </Box>
    </Box>
  );
};
export default List;
