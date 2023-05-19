"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shield = void 0;
const constructors_1 = require("./constructors");
const generator_1 = require("./generator");
const utils_1 = require("./utils");
const validation_1 = require("./validation");
/**
 *
 * @param options
 *
 * Makes sure all of defined rules are in accord with the options
 * shield can process.
 *
 */
function normalizeOptions(options) {
    if (typeof options.fallbackError === 'string') {
        options.fallbackError = new Error(options.fallbackError);
    }
    return {
        debug: options.debug !== undefined ? options.debug : false,
        allowExternalErrors: (0, utils_1.withDefault)(false)(options.allowExternalErrors),
        fallbackRule: (0, utils_1.withDefault)(constructors_1.allow)(options.fallbackRule),
        fallbackError: (0, utils_1.withDefault)(new Error('Not Authorised!'))(options.fallbackError),
    };
}
/**
 *
 * @param ruleTree
 * @param options
 *
 * Validates rules and generates middleware from defined rule tree.
 *
 */
/*
$types,
*/
function shield(ruleTree, options = {}) {
    const normalizedOptions = normalizeOptions(options);
    const ruleTreeValidity = (0, validation_1.validateRuleTree)(ruleTree);
    if (ruleTreeValidity.status === 'ok') {
        return (0, generator_1.generateMiddlewareFromRuleTree)(ruleTree, normalizedOptions);
    }
    else {
        throw new validation_1.ValidationError(ruleTreeValidity.message);
    }
}
exports.shield = shield;
//# sourceMappingURL=shield.js.map