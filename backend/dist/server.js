"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mongoose_1.default.connect(process.env.MONGO_URI || 'mongodb://localhost/globetrotter')
    .then(() => {
    app_1.default.listen(3000, () => console.log('Server running on port 3000'));
})
    .catch(err => console.error('MongoDB connection error:', err));
