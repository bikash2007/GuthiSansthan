import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AdminPanel = ({ branchId }) => {
  const [tableData, setTableData] = useState([]);
  const [newRow, setNewRow] = useState({
    assigned_number: "",
    post: "",
    branch: branchId,
  });
  const [posts, setPosts] = useState([]);
  const baseUrl = useSelector((state) => state.baseUrl).backend;

  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${baseUrl}api/posts/`);
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          throw new Error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [baseUrl]);

  // Handle form inputs for new row
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRow({ ...newRow, [name]: value });
  };

  // Add a new row
  const addNewRow = async () => {
    try {
      const response = await fetch(`${baseUrl}api/darbandi/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRow),
      });

      if (response.ok) {
        const data = await response.json();
        const postName = posts.find((post) => post.id === newRow.post)?.name
          .English;
        setTableData([...tableData, { ...data, post_name: postName }]);
        resetNewRow();
        alert("Row added successfully");
      } else if (response.status === 400) {
        alert("Validation error: Please check your inputs");
      } else {
        alert("Failed to add row");
      }
    } catch (error) {
      console.error("Error adding row:", error);
      alert("An unexpected error occurred");
    }
  };

  // Reset the form to default state
  const resetNewRow = () => {
    setNewRow({
      assigned_number: "",
      post: "",
      branch: branchId,
    });
  };

  return (
    <div>
      <table className="w-full text-center border-collapse">
        <thead>
          <tr className="text-lg font-semibold tracking-wide text-white uppercase bg-blue-700">
            <th className="p-4 border-gray-200 rounded-tl-lg border-e-2">पद</th>
            <th className="p-4 border-gray-200">Assigned Number</th>
          </tr>
        </thead>
        <tbody>
          <tr className="transition-colors duration-300 bg-white border-b-2 border-gray-300 hover:bg-blue-50 last:border-b-0">
            <td className="p-4 text-gray-700 border-gray-200 border-e-2">
              <select
                name="post"
                value={newRow.post}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Post</option>
                {posts.map((post) => (
                  <option key={post.id} value={post.id}>
                    {post.name.English}
                  </option>
                ))}
              </select>
            </td>
            <td className="p-4 text-gray-700">
              <input
                type="number"
                name="assigned_number"
                value={newRow.assigned_number}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4">
        <button
          className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
          onClick={addNewRow}
        >
          Add Row
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
