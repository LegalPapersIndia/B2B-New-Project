import { useState } from "react";

export default function Categories() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Steel",
      slug: "steel",
      products: 128,
      sellers: 34,
      status: "active",
    },

    {
      id: 2,
      name: "Plastics",
      slug: "plastics",
      products: 84,
      sellers: 21,
      status: "active",
    },

    {
      id: 3,
      name: "Chemicals",
      slug: "chemicals",
      products: 52,
      sellers: 17,
      status: "inactive",
    },

    {
      id: 4,
      name: "Electrical",
      slug: "electrical",
      products: 96,
      sellers: 28,
      status: "active",
    },
  ]);

  const [newCategory, setNewCategory] = useState("");

  // ─── ADD CATEGORY ───
  const handleAddCategory = () => {
    if (!newCategory.trim()) return;

    const slug = newCategory
      .toLowerCase()
      .replace(/\s+/g, "-");

    const newData = {
      id: Date.now(),
      name: newCategory,
      slug,
      products: 0,
      sellers: 0,
      status: "active",
    };

    setCategories([newData, ...categories]);
    setNewCategory("");
  };

  // ─── DELETE ───
  const handleDelete = (id) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  // ─── STATUS TOGGLE ───
  const toggleStatus = (id) => {
    setCategories(
      categories.map((c) =>
        c.id === id
          ? {
              ...c,
              status:
                c.status === "active"
                  ? "inactive"
                  : "active",
            }
          : c
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white p-4 sm:p-6 w-full">

      {/* ───────────────── HEADER ───────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">

        <div>
          <h1 className="text-2xl font-bold">
            Categories Management
          </h1>

          <p className="text-sm text-white/40 mt-1">
            Manage marketplace product categories
          </p>
        </div>

        {/* ADD CATEGORY */}
        <div className="flex gap-2">

          <input
            type="text"
            placeholder="Add category..."
            value={newCategory}
            onChange={(e) =>
              setNewCategory(e.target.value)
            }
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-blue-700 w-[220px]"
          />

          <button
            onClick={handleAddCategory}
            className="bg-blue-800 hover:bg-blue-900 px-4 py-2 rounded-xl text-sm font-medium transition"
          >
            Add Category
          </button>

        </div>

      </div>

      {/* ───────────────── STATS ───────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">
          <p className="text-white/40 text-sm">
            Total Categories
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {categories.length}
          </h2>
        </div>

        <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">
          <p className="text-white/40 text-sm">
            Active Categories
          </p>

          <h2 className="text-3xl font-bold mt-2 text-green-400">
            {
              categories.filter(
                (c) => c.status === "active"
              ).length
            }
          </h2>
        </div>

        <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">
          <p className="text-white/40 text-sm">
            Total Products
          </p>

          <h2 className="text-3xl font-bold mt-2 text-blue-400">
            {categories.reduce(
              (acc, c) => acc + c.products,
              0
            )}
          </h2>
        </div>

        <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">
          <p className="text-white/40 text-sm">
            Total Sellers
          </p>

          <h2 className="text-3xl font-bold mt-2 text-violet-400">
            {categories.reduce(
              (acc, c) => acc + c.sellers,
              0
            )}
          </h2>
        </div>

      </div>

      {/* ───────────────── TABLE ───────────────── */}
      <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="min-w-full text-sm text-left">

            {/* HEAD */}
            <thead className="bg-white/5 text-white/50 border-b border-white/10">

              <tr>
                <th className="p-4">Category</th>
                <th className="p-4">Slug</th>
                <th className="p-4">Products</th>
                <th className="p-4">Sellers</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>

            </thead>

            {/* BODY */}
            <tbody>

              {categories.map((cat) => (
                <tr
                  key={cat.id}
                  className="border-t border-white/10 hover:bg-white/[0.03] transition"
                >

                  {/* CATEGORY */}
                  <td className="p-4 font-medium">
                    {cat.name}
                  </td>

                  {/* SLUG */}
                  <td className="p-4 text-white/50">
                    /{cat.slug}
                  </td>

                  {/* PRODUCTS */}
                  <td className="p-4 text-white/60">
                    {cat.products}
                  </td>

                  {/* SELLERS */}
                  <td className="p-4 text-white/60">
                    {cat.sellers}
                  </td>

                  {/* STATUS */}
                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-medium
                      ${
                        cat.status === "active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {cat.status}
                    </span>

                  </td>

                  {/* ACTIONS */}
                  <td className="p-4">

                    <div className="flex gap-2 flex-wrap">

                      <button
                        onClick={() =>
                          toggleStatus(cat.id)
                        }
                        className="bg-blue-800 hover:bg-blue-900 px-3 py-1.5 rounded-lg text-xs transition"
                      >
                        Toggle Status
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(cat.id)
                        }
                        className="bg-red-800 hover:bg-red-900 px-3 py-1.5 rounded-lg text-xs transition"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}