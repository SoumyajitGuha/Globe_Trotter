"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DestinationSchema = new mongoose_1.Schema({
    city: { type: String, required: true },
    country: { type: String, required: true },
    clues: [{ type: String, required: true }],
    fun_fact: [{ type: String, required: true }],
    trivia: [{ type: String, required: true }],
});
exports.default = (0, mongoose_1.model)('Destination', DestinationSchema);
