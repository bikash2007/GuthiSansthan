import { useLocation } from "react-router-dom";

export const ShowNotice = () => {
  const { state } = useLocation();
  const { data } = state || {};

  if (!data) {
    return <p>No notice data available.</p>;
  }

  const { title, text, image } = data;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gray-900 text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <img
        src={image}
        alt={title}
        className="w-full h-auto rounded-lg border-2 border-gray-700 shadow-sm mb-4"
      />
      <p className="text-gray-300">{text}</p>
    </div>
  );
};
