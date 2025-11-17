"use client"
import { useState, useMemo } from "react";
import { Search, ChevronDown, Ship, Plane, TrendingUp } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  country: string;
  transportationTime: number;
  transportMode: "ship" | "plane";
  condition: "new" | "used" | "refurbished";
  exporter: {
    name: string;
    rating: number;
    reviews: number;
    country: string;
  };
  quantity: number;
  unit: string;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Electronic Components - Microchips",
    price: 2500,
    country: "China",
    transportationTime: 14,
    transportMode: "ship",
    condition: "new",
    exporter: {
      name: "TechExports Ltd",
      rating: 4.8,
      reviews: 324,
      country: "China",
    },
    quantity: 5000,
    unit: "units",
  },
  {
    id: "2",
    name: "Textile Fabrics - Cotton",
    price: 8500,
    country: "India",
    transportationTime: 5,
    transportMode: "plane",
    condition: "new",
    exporter: {
      name: "Indian Textiles Co",
      rating: 4.6,
      reviews: 156,
      country: "India",
    },
    quantity: 1000,
    unit: "meters",
  },
  {
    id: "3",
    name: "Machinery Parts - Industrial",
    price: 15000,
    country: "Germany",
    transportationTime: 10,
    transportMode: "ship",
    condition: "new",
    exporter: {
      name: "Precision Engineering GmbH",
      rating: 4.9,
      reviews: 512,
      country: "Germany",
    },
    quantity: 200,
    unit: "units",
  },
  {
    id: "4",
    name: "Automotive Parts - Engines",
    price: 12000,
    country: "Japan",
    transportationTime: 8,
    transportMode: "plane",
    condition: "refurbished",
    exporter: {
      name: "AutoTech Japan",
      rating: 4.5,
      reviews: 278,
      country: "Japan",
    },
    quantity: 50,
    unit: "units",
  },
  {
    id: "5",
    name: "Raw Materials - Steel Sheets",
    price: 3200,
    country: "Russia",
    transportationTime: 21,
    transportMode: "ship",
    condition: "new",
    exporter: {
      name: "Russian Steel Industries",
      rating: 4.3,
      reviews: 189,
      country: "Russia",
    },
    quantity: 500,
    unit: "tons",
  },
  {
    id: "6",
    name: "Chemicals - Polymers",
    price: 5400,
    country: "South Korea",
    transportationTime: 12,
    transportMode: "ship",
    condition: "new",
    exporter: {
      name: "ChemExport Korea",
      rating: 4.7,
      reviews: 203,
      country: "South Korea",
    },
    quantity: 2000,
    unit: "kg",
  },
  {
    id: "7",
    name: "Electronics - Mobile Parts",
    price: 4200,
    country: "Vietnam",
    transportationTime: 9,
    transportMode: "ship",
    condition: "new",
    exporter: {
      name: "Vietnam Electronics",
      rating: 4.4,
      reviews: 145,
      country: "Vietnam",
    },
    quantity: 10000,
    unit: "units",
  },
  {
    id: "8",
    name: "Furniture - Office Chairs",
    price: 6800,
    country: "Indonesia",
    transportationTime: 16,
    transportMode: "ship",
    condition: "used",
    exporter: {
      name: "Furniture Indonesia",
      rating: 4.2,
      reviews: 98,
      country: "Indonesia",
    },
    quantity: 500,
    unit: "units",
  },
];

const countries = [
  "All Countries",
  "China",
  "India",
  "Germany",
  "Japan",
  "Russia",
  "South Korea",
  "Vietnam",
  "Indonesia",
];

export default function Import() {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceSort, setPriceSort] = useState<"asc" | "desc" | null>(null);
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [selectedTransportTime, setSelectedTransportTime] = useState<
    "all" | "ship" | "plane"
  >("all");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [showPriceComparison, setShowPriceComparison] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = mockProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCountry =
        selectedCountry === "All Countries" ||
        product.country === selectedCountry;
      const matchesTransport =
        selectedTransportTime === "all" ||
        product.transportMode === selectedTransportTime;
      const matchesCondition =
        selectedCondition === "all" || product.condition === selectedCondition;

      return (
        matchesSearch &&
        matchesCountry &&
        matchesTransport &&
        matchesCondition
      );
    });

    if (priceSort) {
      filtered.sort((a, b) =>
        priceSort === "asc" ? a.price - b.price : b.price - a.price
      );
    }

    return filtered;
  }, [searchQuery, priceSort, selectedCountry, selectedTransportTime, selectedCondition]);

  const minPrice = Math.min(...mockProducts.map((p) => p.price));
  const maxPrice = Math.max(...mockProducts.map((p) => p.price));
  const avgPrice = (
    filteredProducts.reduce((sum, p) => sum + p.price, 0) / filteredProducts.length
  ).toFixed(2);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Import Marketplace
          </h1>
          <p className="text-slate-600">
            Find quality products from verified exporters worldwide
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar Section */}
        <div className="flex justify-center mb-12">
          <div className="w-full md:w-2/3 lg:w-1/3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search products or enter private code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8 overflow-x-auto m-auto">
          <div className="flex gap-4 min-w-max md:min-w-0 md:flex-wrap  justify-center">
            {/* Price Filter */}
            <div className="flex-shrink-0">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Price 
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setPriceSort(priceSort === "asc" ? null : "asc")}
                  className={`px-3 py-2 rounded border text-sm font-medium transition-colors ${
                    priceSort === "asc"
                      ? "bg-blue-100 border-blue-300 text-blue-700"
                      : "bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  Low to High
                </button>
                <button
                  onClick={() =>
                    setPriceSort(priceSort === "desc" ? null : "desc")
                  }
                  className={`px-3 py-2 rounded border text-sm font-medium transition-colors ${
                    priceSort === "desc"
                      ? "bg-blue-100 border-blue-300 text-blue-700"
                      : "bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  High to Low
                </button>
              </div>
            </div>

            {/* Country Filter */}
            <div className="flex-shrink-0">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Country
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="px-3 py-2 rounded border border-slate-300 bg-white text-sm font-medium text-slate-700 cursor-pointer hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* Transportation Time Filter */}
            <div className="flex-shrink-0">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Transport Mode
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setSelectedTransportTime(
                      selectedTransportTime === "ship" ? "all" : "ship"
                    )
                  }
                  className={`px-3 py-2 rounded border text-sm font-medium flex items-center gap-1 transition-colors ${
                    selectedTransportTime === "ship"
                      ? "bg-blue-100 border-blue-300 text-blue-700"
                      : "bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Ship className="w-4 h-4" />
                  Ship
                </button>
                <button
                  onClick={() =>
                    setSelectedTransportTime(
                      selectedTransportTime === "plane" ? "all" : "plane"
                    )
                  }
                  className={`px-3 py-2 rounded border text-sm font-medium flex items-center gap-1 transition-colors ${
                    selectedTransportTime === "plane"
                      ? "bg-blue-100 border-blue-300 text-blue-700"
                      : "bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Plane className="w-4 h-4" />
                  Plane
                </button>
              </div>
            </div>

            {/* Condition Filter */}
            <div className="flex-shrink-0">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Condition
              </label>
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="px-3 py-2 rounded border border-slate-300 bg-white text-sm font-medium text-slate-700 cursor-pointer hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Conditions</option>
                <option value="new">New</option>
                <option value="used">Used</option>
                <option value="refurbished">Refurbished</option>
              </select>
            </div>
          </div>
        </div>

        {/* Price Comparison Toggle */}
        <div className="mb-8 flex justify-end">
          <button
            onClick={() => setShowPriceComparison(!showPriceComparison)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-medium transition-colors ${
              showPriceComparison
                ? "bg-blue-100 border-blue-300 text-blue-700"
                : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Price Comparison
          </button>
        </div>

        {/* Price Comparison Panel */}
        {showPriceComparison && (
          <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Price Analysis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-slate-600 mb-1">Minimum Price</p>
                <p className="text-2xl font-bold text-blue-600">${minPrice}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-sm text-slate-600 mb-1">Average Price</p>
                <p className="text-2xl font-bold text-green-600">${avgPrice}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <p className="text-sm text-slate-600 mb-1">Maximum Price</p>
                <p className="text-2xl font-bold text-purple-600">${maxPrice}</p>
              </div>
            </div>
          </div>
        )}

        {/* Products List */}
        <div className="space-y-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Product Info */}
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {product.name}
                    </h3>
                    <div className="space-y-1 text-sm text-slate-600">
                      <p>
                        <span className="font-semibold">Quantity:</span>{" "}
                        {product.quantity} {product.unit}
                      </p>
                      <p>
                        <span className="font-semibold">Minimum order:</span>{" "}
                         {product.quantity*30/100}
                      </p>
                      <p>
                        <span className="font-semibold">Country:</span>{" "}
                        {product.country}
                      </p>
                      <p>
                        <span className="font-semibold">Condition:</span>{" "}
                        <span className="inline-block px-2 py-1 bg-slate-100 rounded text-xs font-medium mt-1">
                          {product.condition.charAt(0).toUpperCase() +
                            product.condition.slice(1)}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Exporter Info */}
                  <div className="md:col-span-1">
                    <p className="text-sm font-semibold text-slate-900 mb-2">
                      Exporter
                    </p>
                    <div className="bg-slate-50 rounded-lg p-3 text-sm">
                      <p className="font-semibold text-slate-900 mb-1">
                        {product.exporter.name}
                      </p>
                      <div className="flex items-center gap-1 mb-1">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>
                              {i < Math.floor(product.exporter.rating)
                                ? "★"
                                : "☆"}
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-slate-600">
                          {product.exporter.rating}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">
                        {product.exporter.reviews} reviews
                      </p>
                    </div>
                  </div>

                  {/* Price & Transport */}
                  <div className="md:col-span-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Price</p>
                        <p className="text-2xl font-bold text-blue-600">
                          ${product.price}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        {product.transportMode === "ship" ? (
                          <Ship className="w-4 h-4 text-blue-500" />
                        ) : (
                          <Plane className="w-4 h-4 text-blue-500" />
                        )}
                        <span>{product.transportationTime} days</span>
                      </div>
                      <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
              <p className="text-slate-600 text-lg">
                No products found matching your filters.
              </p>
              <p className="text-slate-500 text-sm mt-2">
                Try adjusting your search criteria.
              </p>
            </div>
          )}
        </div>

        {/* Results Summary */}
        {filteredProducts.length > 0 && (
          <div className="mt-8 text-center text-slate-600">
            <p>
              Showing <span className="font-semibold">{filteredProducts.length}</span> of{" "}
              <span className="font-semibold">{mockProducts.length}</span> products
            </p>
          </div>
        )}
      </div>
    </div>
  );
}