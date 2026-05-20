const SellerHeader = () => {
  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">

      <h2 className="font-semibold">
        Welcome Seller 👋
      </h2>

      <div className="flex items-center gap-3">

        <span className="text-sm text-gray-500">
          Seller Account
        </span>

        <img
          src="https://ui-avatars.com/api/?name=Seller"
          className="w-8 h-8 rounded-full"
        />

      </div>

    </div>
  );
};

export default SellerHeader;