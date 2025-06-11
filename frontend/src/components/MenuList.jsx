// components/MenuList.jsx
import { Plus } from "lucide-react";

function MenuList({
  menus,
  active,
  setActive,
  onAddMenu,
  onDeleteMenu,
  onEdit,
}) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-6">
      {menus.map((menu) => (
        <div
          key={menu._id}
          className={`relative px-4 py-2 rounded cursor-pointer border 
            ${
              active === menu._id
                ? "bg-blue-600"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          onClick={() => {
            if (active !== menu._id) {
              setActive(menu._id);
              onEdit();
            }
          }}
        >
          <span className="pr-6">{menu.name}</span>
          <button
            className="absolute top-0 right-1 text-red-400 hover:text-red-300"
            onClick={(e) => {
              e.stopPropagation(); // prevent menu activation
              onDeleteMenu(menu._id);
            }}
          >
            ✕
          </button>
        </div>
      ))}
      <button
        onClick={onAddMenu}
        className="px-4 py-2 bg-green-600 rounded hover:bg-green-500"
      >
        + Add Menu
      </button>
    </div>
  );
}

export default MenuList;
