export const ViewEditButton = ({ onDelete }) => {
  return (
    <div className="z-50 flex gap-1 text-white ">
      <div className="flex px-2 py-1 bg-gray-600 border rounded-md cursor-pointer hover:bg-gray-700">
        Edit
      </div>
      <div
        className="flex px-2 py-1 bg-red-600 border rounded-md cursor-pointer hover:bg-red-700"
        onClick={onDelete}
      >
        Remove
      </div>
    </div>
  );
};
