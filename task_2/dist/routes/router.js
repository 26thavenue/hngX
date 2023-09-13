"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../controller/controller");
const router = (0, express_1.Router)();
router
    .get('/', controller_1.createUser)
    .get('/user_id', controller_1.readUser)
    .put('/user_id', controller_1.updateUser)
    .delete('/user_id', controller_1.deleteUser);
exports.default = router;
