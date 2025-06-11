import { motion } from "framer-motion";
import { X } from "lucide-react";

function ItemFormModal({ isOpen, onClose, formData, setFormData, onSubmit, isEdit }) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-gray-800 text-white rounded-xl shadow-2xl p-6 w-full max-w-md relative border border-gray-700"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          {isEdit ? "Edit Menu Item" : "Add New Item"}
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="item-name" className="block text-sm font-medium mb-1 text-gray-300">
              Item Name *
            </label>
            <input
              id="item-name"
              type="text"
              placeholder="e.g. Margherita Pizza"
              value={formData.itemName}
              onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              autoFocus
            />
          </div>

          <div>
            <label htmlFor="item-price" className="block text-sm font-medium mb-1 text-gray-300">
              Price *
            </label>
            <input
              id="item-price"
              type="number"
              placeholder="e.g. 299"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <label htmlFor="item-desc" className="block text-sm font-medium mb-1 text-gray-300">
              Description
            </label>
            <textarea
              id="item-desc"
              placeholder="A delicious description of this item..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition-opacity"
            >
              {isEdit ? "Update Item" : "Add Item"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default ItemFormModal;