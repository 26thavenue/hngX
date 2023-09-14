"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.readUser = exports.createUser = void 0;
const model_1 = __importDefault(require("../model/model"));
const mongoose_1 = require("mongoose");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const name = (_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.trim();
    try {
        if (!name) {
            return res.status(400).json({ message: "No name was specified!" });
        }
        else {
            const existingUser = yield model_1.default.findOne({ name });
            if (existingUser) {
                return res.status(409).json({
                    message: "A user with that name already exists",
                });
            }
            else {
                const { name: username, _id: id } = yield new model_1.default({ name }).save();
                return res.json({ name: username, id });
            }
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.createUser = createUser;
const readUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const id = (_c = req.params) === null || _c === void 0 ? void 0 : _c.id;
    try {
        if (!id) {
            return res.status(400).json({ message: "There is no id given!" });
        }
        else if (!(0, mongoose_1.isValidObjectId)(id)) {
            return res.status(400).json({ message: "Invalid userId" });
        }
        else {
            const returnedUser = yield model_1.default.findById(id);
            if (!returnedUser) {
                return res.status(404).json({
                    message: "This user does not exist",
                });
            }
            else {
                const { name, _id: id } = returnedUser;
                return res.json({ user: name, id });
            }
        }
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'unable to process request' });
    }
});
exports.readUser = readUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    const updateDetails = (_e = (_d = req.body) === null || _d === void 0 ? void 0 : _d.name) === null || _e === void 0 ? void 0 : _e.trim();
    const id = (_f = req.params) === null || _f === void 0 ? void 0 : _f.id.trim();
    try {
        if (!id) {
            return res.status(400).json({ error: 'You need an id to perform this operation' });
        }
        else if (!(0, mongoose_1.isValidObjectId)(id)) {
            return res.status(400).json({ message: "Invalid Id" });
        }
        else if (!updateDetails) {
            return res.status(400).json({ error: 'The name field is empty' });
        }
        else {
            const checkDuplicateNme = yield model_1.default.findOne({ name: updateDetails });
            if (checkDuplicateNme) {
                return res.status(409).json("This target name already exists");
            }
            else {
                const updatedUser = yield model_1.default.findByIdAndUpdate({ _id: id }, { name: updateDetails });
                if (!updatedUser) {
                    return res.status(404).json({
                        message: "ID does not exist",
                    });
                }
                else {
                    const { _id: id } = updatedUser;
                    res.json({ name: updateDetails, id });
                }
            }
        }
    }
    catch (err) {
        res.status(500).json({ error: 'There is an error with the server' });
        console.error(err);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    const id = (_g = req.params) === null || _g === void 0 ? void 0 : _g.id;
    try {
        if (!id) {
            return res.status(400).json({ message: "There is no id given!" });
        }
        else if (!(0, mongoose_1.isValidObjectId)(id)) {
            return res.status(400).json({ message: "Invalid userId" });
        }
        else {
            const data = yield model_1.default.findByIdAndDelete(id);
            if (!data) {
                return res.status(404).json({ error: 'User not found' });
            }
            else {
                return res.status(200).json({ message: `User with ${id} has been deleted` });
            }
        }
    }
    catch (err) {
        res.status(500).json({ error: 'There is an error with the server' });
        console.error(err);
    }
});
exports.deleteUser = deleteUser;
