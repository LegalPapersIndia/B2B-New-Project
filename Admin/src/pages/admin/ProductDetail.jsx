// pages/admin/ProductDetail.jsx

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById, deleteProductAdmin } from "../../api/productApi";

export default function ProductDetail() {
  const { id }       = useParams();
  const navigate     = useNavigate();

  const [product, setProduct]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError]       = useState("");

  // ─────────────────────────────────────────
  // FETCH PRODUCT
  // ─────────────────────────────────────────
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        if (data.success) {
          setProduct(data.product);
        } else {
          setError(data.message || "Product not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ─────────────────────────────────────────
  // DELETE
  // ─────────────────────────────────────────
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      setDeleting(true);
      const data = await deleteProductAdmin(id);
      if (data.success) {
        navigate("/admin/products");
      } else {
        alert(data.message || "Delete failed");
      }
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  // ─────────────────────────────────────────
  // STATUS STYLE
  // ─────────────────────────────────────────
  const statusStyle = (status) => {
    switch (status) {
      case "approved": return "bg-green-500/20 text-green-400";
      case "rejected": return "bg-red-500/20 text-red-400";
      default:         return "bg-yellow-500/20 text-yellow-400";
    }
  };

  // ─────────────────────────────────────────
  // LOADING
  // ─────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-white/40 text-sm">Loading product...</p>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────
  // ERROR
  // ─────────────────────────────────────────
  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg">{error || "Product not found"}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-blue-400 hover:text-blue-300 text-sm"
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white p-6">

      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
      >
        ← Back to Products
      </button>

      <h1 className="text-2xl font-bold mb-6">Product Details</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ─── LEFT — IMAGES ─── */}
        <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-6">

          {/* MAIN IMAGE */}
          {product.images?.[0]?.url && (
            <img
              src={product.images[0].url}
              alt={product.title}
              className="w-full h-64 object-cover rounded-xl mb-4"
            />
          )}

          {/* THUMBNAILS */}
          {product.images?.length > 1 && (
            <div className="flex gap-3 flex-wrap">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img.url}
                  alt={`thumb-${i}`}
                  className="h-16 w-16 object-cover rounded-lg border border-white/10"
                />
              ))}
            </div>
          )}

        </div>

        {/* ─── RIGHT — DETAILS ─── */}
        <div className="space-y-4">

          {/* MAIN INFO */}
          <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-6 space-y-4">

            <div>
              <p className="text-white/40 text-xs mb-1">Product Name</p>
              <h2 className="text-xl font-bold">{product.title}</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">

              <div>
                <p className="text-white/40 text-xs mb-1">Category</p>
                <p className="font-medium">{product.category?.name || "—"}</p>
              </div>

              <div>
                <p className="text-white/40 text-xs mb-1">Sub Category</p>
                <p className="font-medium">{product.subcategory?.name || "—"}</p>
              </div>

              <div>
                <p className="text-white/40 text-xs mb-1">Price</p>
                <p className="font-medium text-blue-400">
                  ₹{product.price?.toLocaleString()} / {product.unit}
                </p>
              </div>

              <div>
                <p className="text-white/40 text-xs mb-1">MOQ</p>
                <p className="font-medium">{product.moq} {product.unit}</p>
              </div>

              <div>
                <p className="text-white/40 text-xs mb-1">Brand</p>
                <p className="font-medium">{product.brand || "—"}</p>
              </div>

              <div>
                <p className="text-white/40 text-xs mb-1">Stock</p>
                <p className={`font-medium ${product.stock > 0 ? "text-green-400" : "text-red-400"}`}>
                  {product.stock > 0 ? `${product.stock} Available` : "Out of Stock"}
                </p>
              </div>

            </div>

            {/* STATUS */}
            <div>
              <p className="text-white/40 text-xs mb-1">Status</p>
              <span className={`px-3 py-1 rounded text-xs font-medium capitalize ${statusStyle(product.status)}`}>
                {product.status}
              </span>
            </div>

            {/* DESCRIPTION */}
            {product.description && (
              <div>
                <p className="text-white/40 text-xs mb-1">Description</p>
                <p className="text-white/70 text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

          </div>

          {/* SELLER INFO */}
          <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-white/60 mb-3">Seller Info</h3>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-white/40 text-xs mb-1">Name</p>
                <p className="font-medium">{product.seller?.name || "—"}</p>
              </div>
              <div>
                <p className="text-white/40 text-xs mb-1">Email</p>
                <p className="font-medium text-xs">{product.seller?.email || "—"}</p>
              </div>
              <div>
                <p className="text-white/40 text-xs mb-1">Subscription</p>
                <p className={`font-medium text-xs ${product.seller?.subscriptionActive ? "text-green-400" : "text-yellow-400"}`}>
                  {product.seller?.subscriptionActive ? "✓ Active" : "⚠ Pending"}
                </p>
              </div>
              <div>
                <p className="text-white/40 text-xs mb-1">Account Status</p>
                <p className="font-medium text-xs capitalize">
                  {product.seller?.accountStatus || "—"}
                </p>
              </div>
            </div>
          </div>

          {/* DELETE BUTTON */}
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="w-full bg-red-700 hover:bg-red-800 disabled:opacity-50 py-3 rounded-xl text-sm font-semibold transition"
          >
            {deleting ? "Deleting..." : "🗑 Delete Product"}
          </button>

        </div>

      </div>

    </div>
  );
}