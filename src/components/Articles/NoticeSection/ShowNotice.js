import { useLocation } from "react-router-dom";

export const ShowNotice = () => {
  const { state } = useLocation();
  const { data } = state || {};

  if (!data) {
    return <p>No notice data available.</p>;
  }

  const { title, text, image } = data;

  return (
    <div className="max-w-2xl p-6 mx-auto text-white bg-gray-900 rounded-lg shadow-lg">
      <h1 className="mb-4 text-3xl font-bold">{title}</h1>
      <img
        src={image}
        alt={title}
        className="w-full h-auto mb-4 border-2 border-gray-700 rounded-lg shadow-sm"
      />
      <p className="text-gray-300">{text}</p>
    </div>
  );
};
