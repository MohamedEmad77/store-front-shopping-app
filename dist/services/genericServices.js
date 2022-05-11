"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_if_id_is_valid = void 0;
const check_if_id_is_valid = (id) => {
    if (!Number.parseInt(id))
        return false;
    return true;
};
exports.check_if_id_is_valid = check_if_id_is_valid;
