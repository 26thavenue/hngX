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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./routes/router"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerSpec = require('./config/swagger.config.js');
const dbConn_1 = require("./dbConn");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: '*' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
const PORT = 3000;
const uri = process.env.MONGODB_URI;
// mongoose.connect(uri)
// .then(() => console.log('Connected to DB'))
// .catch(() => console.log('There is an error'))
app.use('/api', router_1.default);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
app.get('/', (req, res) => {
    res.send('Hello world!');
});
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, dbConn_1.connectDB)();
    console.log('SERVER IS UP ON PORT:', PORT);
}));
