function MenuForm({
  menuName,
  setMenuName,
  menuDescription,
  setMenuDescription,
  onClose,
  onSubmit,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <form
        onSubmit={onSubmit}
        className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4">Add New Menu</h2>
        <input
          type="text"
          placeholder="Menu Name"
          value={menuName}
          onChange={(e) => setMenuName(e.target.value)}
          className="w-full border px-3 py-2 rounded bg-gray-700 text-white mb-3"
          required
        />
        <textarea
          placeholder="Menu Description"
          value={menuDescription}
          onChange={(e) => setMenuDescription(e.target.value)}
          className="w-full border px-3 py-2 rounded bg-gray-700 text-white mb-4"
        />
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default MenuForm;
