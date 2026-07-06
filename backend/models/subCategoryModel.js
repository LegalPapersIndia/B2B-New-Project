// import mongoose from "mongoose";

// const subCategorySchema =
//   new mongoose.Schema(
//     {
//       name: {
//         type: String,
//         required: true,
//       },

//       slug: {
//         type: String,
//         required: true,
//       },

//       desc: {
//         type: String,
//       },

//       image: {
//         type: String,
//       },

//       // MAIN CATEGORY LINK
//       category: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Category",
//         required: true,
//       },
//     },
//     {
//       timestamps: true,
//     }
//   );

// const SubCategory =
//   mongoose.model(
//     "SubCategory",
//     subCategorySchema
//   );

// export default SubCategory;




import mongoose from "mongoose";

const subCategorySchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      slug: {
        type: String,
        required: true,
      },

      desc: {
        type: String,
      },

      image: {
        type: String,
      },

      // MAIN CATEGORY LINK
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },

      order: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );

const SubCategory =
  mongoose.model(
    "SubCategory",
    subCategorySchema
  );

export default SubCategory;