import { motion } from "framer-motion";
import { Plus } from "lucide-react";

function MenuList({
  menus,
  active,
  setActive,
  onAddMenu,
  onDeleteMenu,
  onAddItem,
}) {
  return (
    <div className="mb-10">
      <div className="flex flex-wrap gap-3 justify-center mb-4">
        {menus.map((menu) => (
          <motion.div
            key={menu._id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative px-5 py-2 rounded-full cursor-pointer border-2 transition-all duration-200 ${
              active === menu._id
                ? "bg-gradient-to-r from-blue-500 to-purple-600 border-transparent text-white shadow-lg"
                : "bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-gray-600"
            }`}
            onClick={() => {
              if (active !== menu._id) {
                setActive(menu._id);
              }
            }}
          >
            <span className="pr-6 font-medium">{menu.name}</span>
            <button
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-red-400 hover:text-red-300 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteMenu(menu._id);
              }}
              aria-label={`Delete ${menu.name} menu`}
            >
              ✕
            </button>
          </motion.div>
        ))}
      </div>
      
      <div className="flex justify-center gap-4">
        <motion.button
          onClick={onAddMenu}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full font-medium hover:opacity-90 transition-opacity shadow-lg"
        >
          <Plus size={18} />
          Add Menu
        </motion.button>
        
        {active && (
          <motion.button
            onClick={onAddItem}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full font-medium hover:opacity-90 transition-opacity shadow-lg"
          >
            <Plus size={18} />
            Add Item
          </motion.button>
        )}
      </div>
    </div>
  );
}

export default MenuList;