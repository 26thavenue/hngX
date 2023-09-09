"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const route_1 = __importDefault(require("./route"));
const app = (0, express_1.default)();
const PORT = 3001;
app.use((0, cors_1.default)({ origin: '*' }));
app.use(express_1.default.json());
app.use('/', route_1.default);
app.use('/', (req, res) => {
    res.send('Hello world!');
});
app.listen(PORT, () => {
    console.log('SERVER IS UP ON PORT:', PORT);
});
