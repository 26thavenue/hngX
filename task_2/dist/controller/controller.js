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
const nanoid_1 = require("nanoid");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const details = req.body;
    if (!details.name) {
        return res.status(404).json({ error: 'Name is required' });
    }
    if (typeof details.name !== 'string') {
        return res.status(400).json({ error: 'name must be a string' });
    }
    const checkforDuplicate = details.name;
    const duplicate = yield model_1.default.findOne({ checkforDuplicate }).lean().exec();
    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' });
    }
    try {
        const newUser = {
            id: (0, nanoid_1.nanoid)(5),
            name: details.name
        };
        const data = yield model_1.default.create(newUser);
        return res.json(data);
    }
    catch (err) {
        const errorCode = err.code;
        if (errorCode && errorCode == 11000) {
            return res.status(409).json({ error: 'user with slack name exists ' });
        }
        res.status(500).json({ error: 'unable to process request' });
        console.error(err);
    }
});
exports.createUser = createUser;
const readUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        // get user from db
        const user = yield model_1.default.findOne({ id: userId }, { __v: 0, _id: 0 });
        if (!user) {
            return res.status(404).json({ error: 'user not found' });
        }
        return res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ error: 'unable to process request' });
        console.error(err);
    }
});
exports.readUser = readUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateDetails = req.body;
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).json({ error: 'You need an id to erform this operation' });
    }
    if (!updateDetails.name) {
        return res.status(400).json({ error: 'The name field is empty' });
    }
    try {
        const data = yield model_1.default.findOneAndUpdate({ id: userId }, { name: updateDetails.name }, { new: true });
        if (!data) {
            return res.status(404).json({ error: 'User does not exist' });
        }
        return res
            .status(200)
            .json({ messsage: `User updated with ${userId} was updated` });
    }
    catch (err) {
        res.status(500).json({ error: 'There is an error with the server' });
        console.error(err);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    console.log(userId);
    try {
        const data = yield model_1.default.findOneAndDelete({ id: userId });
        if (data == null) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json({ message: `User with ${userId} has been deleted` });
    }
    catch (err) {
        res.status(500).json({ error: 'There is an error with the server' });
        console.error(err);
    }
});
exports.deleteUser = deleteUser;
