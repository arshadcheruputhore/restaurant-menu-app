import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";

function ItemCard({ item, onEdit, onDelete }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700 rounded-xl overflow-hidden shadow-lg transition-all duration-200 flex flex-col h-full"
    >
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold mb-2 text-white line-clamp-2">
            {item.itemName}
          </h3>
          <p className="text-lg font-bold text-green-400 whitespace-nowrap ml-3">
            ₹{item.price}
          </p>
        </div>
        
        {item.description && (
          <p className="text-gray-400 text-sm line-clamp-3 mt-2">
            {item.description}
          </p>
        )}
      </div>

      <div className="px-4 py-3 bg-gray-800/50 border-t border-gray-700 flex justify-end gap-3">
        <button
          onClick={() => onEdit(item)}  // Pass the entire item object
          className="text-blue-400 hover:text-blue-300 transition-colors p-1 rounded-full hover:bg-gray-700"
          aria-label="Edit item"
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={onDelete}
          className="text-red-400 hover:text-red-300 transition-colors p-1 rounded-full hover:bg-gray-700"
          aria-label="Delete item"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </motion.div>
  );
}

export default ItemCard;