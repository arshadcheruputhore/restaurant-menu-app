import { Pencil, Trash2 } from "lucide-react";

function ItemCard({ item, onEdit, onDelete }) {
  return (
    <div className="bg-gray-800 text-white p-4 rounded shadow flex flex-col justify-between relative">
      <div className="pr-10">
        <h4 className="text-base sm:text-lg font-bold mb-1 break-words">{item.itemName}</h4>
        <p className="text-sm text-gray-300 break-words">{item.description}</p>
        <p className="font-semibold mt-2 text-green-400 text-sm sm:text-base">
          ₹ {item.price}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={onEdit}
          className="text-blue-400 hover:text-blue-300 transition-colors"
          aria-label="Edit Item"
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={onDelete}
          className="text-red-400 hover:text-red-300 transition-colors"
          aria-label="Delete Item"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

export default ItemCard;
