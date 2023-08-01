import React, { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartReducer";
import SearchBar from "./SearchBar";
import ProductSorting from "./ProductSorting";
import ShoppingCart from "./ShoppingCart";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  rating: number;
}

const LoadingScreen = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64"></div>
    </div>
  );
};

const ErrorScreen = ({ error }: { error: string }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-red-600 font-bold">{error}</p>
    </div>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const dispatch = useDispatch();

  const productsPerPage = 10;
  const totalPages = Math.ceil(products.length / productsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://my-json-server.typicode.com/jsebasizquierdo/db-store/db"
        );
        const data = response.data.products;
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (selectedOption: string) => {
    setSortBy(selectedOption);
  };

  const sortedProducts = [...products];

  switch (sortBy) {
    case "priceAsc":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case "priceDesc":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case "ratingAsc":
      sortedProducts.sort((a, b) => a.rating - b.rating);
      break;
    case "ratingDesc":
      sortedProducts.sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  const filteredProducts = sortedProducts.filter((product) => {
    return product.title
      .toLocaleLowerCase()
      .includes(searchQuery.toLocaleLowerCase());
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} />;
  }

  return (
    <div>
      <div className="flex bg-white shadow-md justify-between pr-4 pl-4">
        <h1 className="text-3xl font-bold mt-4 mb-6">Product List</h1>
        <ShoppingCart />
      </div>
      <div className="pr-3 pl-3">
        <Head>
          <title>Product List | My Online Store</title>
          <meta
            name="description"
            content="Explore our latest products available in our online store."
          />
        </Head>
        <div className="w-full flex justify-center items-center mt-4 mb-2">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="w-full flex items-right">
          <ProductSorting sortBy={sortBy} onSortChange={handleSortChange} />
        </div>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {currentProducts.map((product) => (
            <li key={product.id} className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-2 text-black">
                {product.title}
              </h2>
              <div className="flex items-center justify-center">
                <div className="flex-shrink-0 w-1/2 mr-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-auto mt-2 mb-2 rounded-lg"
                  />
                </div>

                <div>
                  <p className="text-gray-400 text-left">
                    {product.description.length > 100
                      ? product.description.substring(0, 100) + "..."
                      : product.description}
                  </p>

                  <p className="text-green-600 font-semibold mt-2">
                    ${product.price} {product.currency}
                  </p>

                  <p className="text-yellow-600 font-semibold">
                    Rating: {product.rating}
                  </p>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded mt-2"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <nav className="flex justify-center">
            <ul className="flex items-center space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index}>
                  <button
                    className={`px-2 py-1 rounded ${
                      currentPage === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-gray-800"
                    }`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
