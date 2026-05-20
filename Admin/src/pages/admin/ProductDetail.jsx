import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    // dummy data (backend aayega to API call hoga)
    const allProducts = [
      {
        id: 1,
        name: "Industrial Steel Rod",
        seller: "Rahul Traders",
        category: "Steel",
        price: "₹1200",
        status: "pending",
        description:
          "High quality industrial steel rod used in construction and manufacturing.",
      },
      {
        id: 2,
        name: "PVC Pipes",
        seller: "Tech Supplies",
        category: "Plastics",
        price: "₹450",
        status: "approved",
        description:
          "Durable PVC pipes for plumbing and industrial use.",
      },
    ];

    const found = allProducts.find((p) => p.id === Number(id));
    setProduct(found);
  }, [id]);

  if (!product) {
    return (
      <div className="p-6 text-white bg-[#0A0A0F] min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white p-6">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-blue-400 hover:text-blue-300"
      >
        ← Back to Products
      </button>

      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-4">
        Product Details
      </h1>

      {/* CARD */}
      <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-6 space-y-4">

        <div>
          <p className="text-white/40 text-sm">Product Name</p>
          <h2 className="text-lg font-semibold">{product.name}</h2>
        </div>

        <div>
          <p className="text-white/40 text-sm">Seller</p>
          <p>{product.seller}</p>
        </div>

        <div>
          <p className="text-white/40 text-sm">Category</p>
          <p>{product.category}</p>
        </div>

        <div>
          <p className="text-white/40 text-sm">Price</p>
          <p>{product.price}</p>
        </div>

        <div>
          <p className="text-white/40 text-sm">Description</p>
          <p className="text-white/70">
            {product.description}
          </p>
        </div>

        {/* STATUS */}
        <div>
          <p className="text-white/40 text-sm">Status</p>
          <span
            className={`inline-block mt-1 px-3 py-1 rounded text-xs font-medium
              ${
                product.status === "approved"
                  ? "bg-green-500/20 text-green-400"
                  : product.status === "rejected"
                  ? "bg-red-500/20 text-red-400"
                  : "bg-yellow-500/20 text-yellow-400"
              }`}
          >
            {product.status}
          </span>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-3 pt-4">

          <button className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded text-sm">
            Approve
          </button>

          <button className="bg-red-700 hover:bg-red-800 px-4 py-2 rounded text-sm">
            Reject
          </button>

        </div>

      </div>
    </div>
  );
}