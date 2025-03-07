"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    score: {
        correct: { type: Number, default: 0 },
        incorrect: { type: Number, default: 0 },
    },
});
exports.default = (0, mongoose_1.model)('User', UserSchema);
