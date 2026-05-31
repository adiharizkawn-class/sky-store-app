import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const categoryStyle = {
  "men's clothing": "bg-blue-50 text-blue-700",
  "women's clothing": "bg-pink-50 text-pink-700",
  jewelery: "bg-amber-50 text-amber-700",
  electronics: "bg-violet-50 text-violet-700",
};

function StarRating({ rate = 0, count = 0 }) {
  return (
    <div className="flex items-center gap-2 mt-2">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= Math.round(rate) ? "text-amber-400" : "text-gray-200"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-sm font-medium text-gray-700">{rate}</span>
      <span className="text-sm text-gray-400">· {count} review</span>
    </div>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="h-4 w-32 bg-gray-200 rounded mb-6 animate-pulse" />
      <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row gap-10 animate-pulse">
        <div className="flex-1 flex justify-center items-center">
          <div className="w-64 h-64 bg-gray-200 rounded-xl" />
        </div>
        <div className="flex-1 space-y-4">
          <div className="h-4 w-20 bg-gray-200 rounded-full" />
          <div className="h-7 w-3/4 bg-gray-200 rounded" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-8 w-28 bg-gray-200 rounded" />
          <div className="space-y-2 pt-2">
            <div className="h-3 w-full bg-gray-200 rounded" />
            <div className="h-3 w-5/6 bg-gray-200 rounded" />
            <div className="h-3 w-4/6 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("desc");

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error("Produk tidak ditemukan");
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleProduct();
  }, [id]);

  if (loading) return <ProductDetailSkeleton />;

  if (!product) {
    return (
      <div className="text-center mt-20">
        <p className="text-5xl mb-4">😕</p>
        <h2 className="text-xl font-semibold text-gray-700">
          Produk tidak ditemukan
        </h2>
        <Link
          to="/"
          className="mt-4 inline-block text-blue-600 hover:underline text-sm"
        >
          Kembali ke beranda
        </Link>
      </div>
    );
  }

  const badgeColor =
    categoryStyle[product.category] ?? "bg-gray-100 text-gray-600";

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Tombol kembali */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors"
      >
        ← Kembali ke beranda
      </Link>

      {/* Card utama */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 md:p-10 flex flex-col md:flex-row gap-10">
        {/* Kolom kiri — Gambar */}
        <div className="flex-1 flex justify-center items-start">
          <div className="bg-gray-50 rounded-xl p-8 w-full flex justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-56 h-56 object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Kolom kanan — Detail */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Badge kategori */}
          <span
            className={`${badgeColor} text-xs font-medium px-3 py-1 rounded-full w-fit capitalize`}
          >
            {product.category}
          </span>

          {/* Judul */}
          <h1 className="text-2xl font-semibold text-gray-800 leading-snug">
            {product.title}
          </h1>

          {/* Rating */}
          <StarRating
            rate={product.rating?.rate}
            count={product.rating?.count}
          />

          {/* Harga */}
          <p className="text-3xl font-bold text-gray-900 mt-1">
            ${product.price}
          </p>

          {/* Tab Deskripsi / Spesifikasi */}
          <div className="mt-2 border-t border-gray-100 pt-4">
            <div className="flex gap-1 mb-3">
              {["desc", "spec"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${
                    activeTab === tab
                      ? "bg-gray-100 text-gray-800 font-medium"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab === "desc" ? "Deskripsi" : "Spesifikasi"}
                </button>
              ))}
            </div>

            {activeTab === "desc" && (
              <p className="text-sm text-gray-500 leading-relaxed">
                {product.description}
              </p>
            )}
            {activeTab === "spec" && (
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-gray-50">
                    <td className="py-2 text-gray-400">Kategori</td>
                    <td className="py-2 text-right text-gray-700 capitalize">
                      {product.category}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-50">
                    <td className="py-2 text-gray-400">Harga</td>
                    <td className="py-2 text-right text-gray-700">
                      ${product.price}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-400">Rating</td>
                    <td className="py-2 text-right text-gray-700">
                      {product.rating?.rate} / 5
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>

          {/* Tombol aksi */}
          <div className="flex gap-3 mt-4">
            <button className="flex-1 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 text-sm">
              + Tambah ke Keranjang
            </button>
            <button
              className="p-3 rounded-xl border border-gray-200 hover:bg-gray-50 active:scale-95 transition-all duration-200 text-gray-400 hover:text-red-400"
              aria-label="Simpan ke wishlist"
            >
              ♡
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
