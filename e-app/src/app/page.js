// src/app/page.js

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Shield,
  ShoppingCart,
  Truck,
  Zap,
  Clock,
  Search,
  ArrowLeft,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { loadCSVData } from "@/utils/csvHandler";

const App = () => {
  const [products, setProducts] = useState([]);
  const [pincodeData, setPincodeData] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load products
        const productsData = await loadCSVData("/data/products.csv");
        const formattedProducts = productsData.map((product) => ({
          ...product,
          price: Number(product.price),
          inStock: product.inStock === "true",
          benefits: product.benefits.split("|"),
          rating: Number(product.rating),
          reviews: Number(product.reviews),
          recentCarts: Number(product.recentCarts),
          images: ["/api/placeholder/400/400"], // Default image
        }));
        setProducts(formattedProducts);

        // Load pincodes
        const pincodesData = await loadCSVData("/data/pincodes.csv");
        const formattedPincodes = pincodesData.reduce((acc, item) => {
          acc[item.pincode] = {
            provider: item.provider,
            city: item.city,
            deliveryType: item.delivery_type,
          };
          return acc;
        }, {});
        setPincodeData(formattedPincodes);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Modified Product Listing Page to use loaded products
  const ProductListingPage = ({ onProductSelect }) => {
    if (loading) {
      return <div className="text-center p-8">Loading products...</div>;
    }

    return (
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Featured Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onProductSelect(product)}
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="font-semibold mb-2">{product.name}</h2>
              <p className="text-lg font-bold mb-2">₹{product.price}</p>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">★</span>
                <span>{product.rating}</span>
                <span className="text-gray-600">
                  ({product.reviews} reviews)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Modified delivery calculation in ProductDetailPage
  const calculateDeliveryDate = (pincode, product) => {
    if (!pincode || !pincodeData[pincode]) {
      return {
        error: "Invalid pincode",
        info: null,
      };
    }

    if (!product.inStock) {
      return {
        error: "Product is currently out of stock",
        info: null,
      };
    }

    const pincodeInfo = pincodeData[pincode];
    const now = new Date();
    let estimatedDate = new Date();
    let deliveryMessage = "";

    switch (pincodeInfo.deliveryType) {
      case "Express":
        if (now.getHours() < 17) {
          // Express cutoff
          deliveryMessage = "Same-day delivery available";
          estimatedDate = now;
        } else {
          deliveryMessage = "Next-day delivery";
          estimatedDate.setDate(now.getDate() + 1);
        }
        break;
      case "Premium":
        if (now.getHours() < 12) {
          // Premium cutoff
          deliveryMessage = "Same-day delivery available";
          estimatedDate = now;
        } else {
          deliveryMessage = "Next-day delivery";
          estimatedDate.setDate(now.getDate() + 1);
        }
        break;
      case "Standard":
        const daysToAdd = Math.floor(Math.random() * (5 - 2 + 1)) + 2;
        estimatedDate.setDate(now.getDate() + daysToAdd);
        deliveryMessage = `${daysToAdd}-day delivery`;
        break;
    }

    return {
      error: null,
      info: {
        provider: pincodeInfo.provider,
        date: estimatedDate,
        message: deliveryMessage,
        city: pincodeInfo.city,
        type: pincodeInfo.deliveryType,
      },
    };
  };

  return (
    <div>
      {selectedProduct ? (
        <ProductDetailPage
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
          calculateDelivery={calculateDeliveryDate}
          pincodeData={pincodeData}
        />
      ) : (
        <ProductListingPage onProductSelect={setSelectedProduct} />
      )}
    </div>
  );
};

export default App;
