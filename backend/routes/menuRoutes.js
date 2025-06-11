const express = require('express');
const router = express.Router();
const {
  getMenus,
  getMenu,
  createMenu,
  addMenuItem,
  deleteMenuItem,
  updateMenuItem,
  deleteMenu
} = require('../controllers/menuController');

router.get('/', getMenus);
router.get('/:id', getMenu);
router.post('/', createMenu);
router.post('/:id/items', addMenuItem);

router.delete("/:menuId/items/:itemId", deleteMenuItem);
router.put("/:menuId/items/:itemId", updateMenuItem);
router.delete("/:menuId", deleteMenu);

module.exports = router;
