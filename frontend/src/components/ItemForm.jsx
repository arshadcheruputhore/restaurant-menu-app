function ItemForm({ item, setItem, onSubmit, editMode, onEdit }) {
    console.log('item is', item);
    
  return (
    <form
      onSubmit={onSubmit}
      className="bg-gray-800 text-white p-4 rounded-lg shadow-md max-w-2xl mx-auto w-full"
    >
      <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center">
        {editMode ? "Edit Item" : "Add Item"}
      </h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Name"
          value={item.itemName}
          onChange={(e) => setItem({ ...item, itemName: e.target.value })}
          className="w-full border px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="text"
          placeholder="Price"
          value={item.price}
          onChange={(e) => setItem({ ...item, price: e.target.value })}
          className="w-full border px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <textarea
          placeholder="Description"
          value={item.description}
          onChange={(e) => setItem({ ...item, description: e.target.value })}
          className="w-full sm:col-span-2 border px-3 py-2 rounded bg-gray-700 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
      </div>

      <div className="mt-6 text-center sm:text-right flex gap-3 justify-end">
        {editMode && <button
          type="submit"
          className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 transition-all duration-200"
            onClick={onEdit}
        >
          Cancel
        </button>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition-all duration-200"
        >
          {editMode ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
}

export default ItemForm;
