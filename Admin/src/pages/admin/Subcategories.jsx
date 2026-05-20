import { useEffect, useState } from "react";

export default function Subcategories() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");

  useEffect(() => {
    // Dummy Categories
    setCategories([
      "Electronics",
      "Steel",
      "Chemicals",
      "Plastics",
      "Industrial Tools",
    ]);

    // Dummy Subcategories
    setSubcategories([
      {
        id: 1,
        category: "Electronics",
        name: "Mobile Phones",
        status: "active",
      },
      {
        id: 2,
        category: "Electronics",
        name: "Laptops",
        status: "active",
      },
      {
        id: 3,
        category: "Steel",
        name: "Steel Rods",
        status: "inactive",
      },
    ]);
  }, []);

  // ADD SUBCATEGORY
  const handleAdd = () => {
    if (!selectedCategory || !subcategoryName) return;

    const newSubcategory = {
      id: Date.now(),
      category: selectedCategory,
      name: subcategoryName,
      status: "active",
    };

    setSubcategories([newSubcategory, ...subcategories]);

    setSelectedCategory("");
    setSubcategoryName("");
  };

  // TOGGLE STATUS
  const toggleStatus = (id) => {
    setSubcategories((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              status:
                s.status === "active"
                  ? "inactive"
                  : "active",
            }
          : s
      )
    );
  };

  // DELETE
  const handleDelete = (id) => {
    setSubcategories((prev) =>
      prev.filter((s) => s.id !== id)
    );
  };

  return (
    <div className="min-h-screen w-full bg-[#0A0A0F] text-white p-4 sm:p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Subcategories Management
        </h1>

        <p className="text-sm text-white/40 mt-1">
          Manage marketplace subcategories
        </p>
      </div>

      {/* ADD FORM */}
      <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5 mb-6">

        <h2 className="text-lg font-semibold mb-5">
          Add New Subcategory
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* CATEGORY SELECT */}
          <div>
            <label className="text-xs text-white/50 mb-2 block">
              Select Category
            </label>

            <select
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(e.target.value)
              }
              className="w-full bg-[#111118] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none"
            >
              <option value="">Choose Category</option>

              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* SUBCATEGORY INPUT */}
          <div>
            <label className="text-xs text-white/50 mb-2 block">
              Subcategory Name
            </label>

            <input
              type="text"
              placeholder="Enter subcategory"
              value={subcategoryName}
              onChange={(e) =>
                setSubcategoryName(e.target.value)
              }
              className="w-full bg-[#111118] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none"
            />
          </div>

          {/* BUTTON */}
          <div className="flex items-end">
            <button
              onClick={handleAdd}
              className="w-full bg-blue-800 hover:bg-blue-900 transition px-4 py-3 rounded-xl text-sm font-medium"
            >
              Add Subcategory
            </button>
          </div>

        </div>
      </div>

      {/* TABLE */}
      <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full text-sm text-left">

            <thead className="bg-white/5 text-white/60">
              <tr>
                <th className="p-4">Category</th>
                <th className="p-4">Subcategory</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {subcategories.map((s) => (
                <tr
                  key={s.id}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >

                  {/* CATEGORY */}
                  <td className="p-4 text-white/70">
                    {s.category}
                  </td>

                  {/* SUBCATEGORY */}
                  <td className="p-4 font-medium">
                    {s.name}
                  </td>

                  {/* STATUS */}
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium
                        ${
                          s.status === "active"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                    >
                      {s.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4 flex gap-2 flex-wrap">

                    <button
                      onClick={() => toggleStatus(s.id)}
                      className={`px-3 py-1 rounded text-xs
                        ${
                          s.status === "active"
                            ? "bg-yellow-600 hover:bg-yellow-700"
                            : "bg-green-700 hover:bg-green-800"
                        }`}
                    >
                      {s.status === "active"
                        ? "Disable"
                        : "Enable"}
                    </button>

                    <button
                      onClick={() => handleDelete(s.id)}
                      className="bg-red-700 hover:bg-red-800 px-3 py-1 rounded text-xs"
                    >
                      Delete
                    </button>

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