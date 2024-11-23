const Menu = require("../../model/menuItemModel");
const { successResponse, errorResponse } = require("../../utils/responseHelper");
const {
    MENU_ADD_SUCCESS,
    MENU_UPDATE_SUCCESS,
    MENU_DELETE_SUCCESS,
    MENU_FETCH_SUCCESS,
    MENU_NOT_FOUND,
    SOMETHING_WENT_WRONG,
    MENU_ALREADY_EXITS,
} = require("../../constants/messages");
const mongoose = require("mongoose");
const { TypeExceptions } = require("../../types/exceptions");

const MenuController = {
    addMenu: async (req, res) => {
        const { name, price, category, isAvailable } = req.body;

        try {
            const existingMenuItem = await Menu.findOne({ name });
            if (existingMenuItem) {
                return errorResponse(res, TypeExceptions.AlreadyExistsCommonFunction(MENU_ALREADY_EXITS));
            }
            const newMenuItem = new Menu({ name, price, category, isAvailable });
            const savedMenuItem = await newMenuItem.save();
            return successResponse(res, MENU_ADD_SUCCESS, savedMenuItem);
        } catch (error) {
            return errorResponse(res, TypeExceptions.UnknownError(SOMETHING_WENT_WRONG + error.message));
        }
    },

    getAllMenus: async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const searchText = req.query.search || "";
        const category = req.query.category || "";
        const priceMin = req.query.priceMin || 0;
        const priceMax = req.query.priceMax || 10000;
        const isAvailable = req.query.isAvailable || "";

        const skip = (page - 1) * limit;

        try {
            const searchQuery = {
                $and: [
                    searchText ? {
                        $or: [
                            { name: { $regex: searchText, $options: "i" } },
                            { description: { $regex: searchText, $options: "i" } }
                        ]
                    } : {},
                    category ? { category: { $regex: category, $options: "i" } } : {},
                    isAvailable ? { isAvailable: isAvailable === 'true' } : {},
                    priceMin ? { price: { $gte: parseFloat(priceMin) } } : {},
                    priceMax ? { price: { $lte: parseFloat(priceMax) } } : {}
                ]
            };

            const totalRecords = await Menu.countDocuments(searchQuery);
            const menus = await Menu.find(searchQuery)
                .skip(skip)
                .limit(limit)
                .sort({ price: req.query.sortPrice === 'desc' ? -1 : 1 });

            return successResponse(res, MENU_FETCH_SUCCESS, {
                menus,
                totalRecords
            });
        } catch (error) {
            return errorResponse(res, TypeExceptions.UnknownError(SOMETHING_WENT_WRONG + error.message));
        }
    },

    updateMenu: async (req, res) => {
        let { id } = req.params;
        const updates = req.body;

        try {
            id = new mongoose.Types.ObjectId(id);

            const updatedMenu = await Menu.findByIdAndUpdate(id, updates, {
                new: true,
                runValidators: true,
            });

            if (!updatedMenu) {
                return errorResponse(res, TypeExceptions.NotFoundCommonFunction(MENU_NOT_FOUND));
            }
            return successResponse(res, MENU_UPDATE_SUCCESS, updatedMenu);
        } catch (error) {
            return errorResponse(res, TypeExceptions.UnknownError(SOMETHING_WENT_WRONG + error.message));
        }
    },

    deleteMenu: async (req, res) => {
        let { id } = req.params;

        try {
            id = new mongoose.Types.ObjectId(id);

            const deletedMenu = await Menu.findByIdAndDelete(id);
            if (!deletedMenu) {
                return errorResponse(res, TypeExceptions.NotFoundCommonFunction(MENU_NOT_FOUND));
            }
            return successResponse(res, MENU_DELETE_SUCCESS);
        } catch (error) {
            return errorResponse(res, TypeExceptions.UnknownError(SOMETHING_WENT_WRONG + error.message));
        }
    },
};

module.exports = MenuController;
