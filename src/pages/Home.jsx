import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CATEGORIES = [
  { label: "Semua", value: "all" },
  { label: "Elektronik", value: "electronics" },
  { label: "Pria", value: "men's clothing" },
  { label: "Wanita", value: "women's clothing" },
  { label: "Perhiasan", value: "jewelery" },
];

function ProductCard({ product }) {
  const discountPct = [10, 15, 20, 25, 30][product.id % 5];
  const originalPrice = (product.price / (1 - discountPct / 100)).toFixed(2);

  return (
    <div className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-gray-300 transition-colors duration-200 flex flex-col">
      {/* Area gambar */}
      <div className="bg-gray-50 flex items-center justify-center h-44 px-4">
        <img
          src={product.image}
          alt={product.title}
          className="h-36 w-36 object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Body card */}
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        {/* Badge diskon + kategori */}
        <div className="flex gap-1.5">
          <span className="bg-red-50 text-red-700 text-xs font-medium px-1.5 py-0.5 rounded">
            -{discountPct}%
          </span>
          <span className="bg-gray-100 text-gray-500 text-xs px-1.5 py-0.5 rounded capitalize">
            {product.category.split(" ")[0]}
          </span>
        </div>

        {/* Judul */}
        <p className="text-sm text-gray-800 line-clamp-2 leading-snug">
          {product.title}
        </p>

        {/* Harga */}
        <div>
          <p className="text-base font-semibold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-xs text-gray-400 line-through">${originalPrice}</p>
        </div>

        {/* Rating + terjual */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <svg
              key={s}
              className={`w-3 h-3 ${s <= Math.round(product.rating?.rate) ? "text-orange-400" : "text-gray-200"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-xs text-gray-400 ml-0.5">
            {product.rating?.count} terjual
          </span>
        </div>

        {/* Tombol */}
        <Link
          to={`product/${product.id}`}
          className="mt-auto block text-center bg-[#ee4d2d] hover:bg-[#d43f20] active:scale-95 text-white text-sm font-medium py-2 rounded-lg transition-all duration-200 mt-2"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const respon = await fetch("https://fakestoreapi.com/products");
        const data = await respon.json();
        setProducts(data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-xl overflow-hidden animate-pulse"
            >
              <div className="bg-gray-200 h-44 w-full" />
              <div className="p-3 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-5 bg-gray-200 rounded w-1/3" />
                <div className="h-8 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Search bar */}
      <div className="relative mb-4">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
          🔍
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari produk di SkyStore..."
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 transition-colors"
        />
      </div>

      {/* Filter kategori */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${
              activeCategory === cat.value
                ? "bg-[#ee4d2d] text-white border-[#ee4d2d]"
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid produk */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-400 py-20 text-sm">
          Produk tidak ditemukan
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
