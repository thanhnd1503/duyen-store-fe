// hooks/useProducts.ts
import { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "../../type/product";

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(
          `${process.env.NEXT_PUBLIC_BASE_URL}/products`
        );
        console.log("response", response);

        setProducts(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

export default useProducts;
