"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withDefault = exports.flattenObjectOf = exports.isRuleFieldMap = exports.isRuleFunction = exports.isLogicRule = exports.isRule = void 0;
const rules_1 = require("./rules");
/**
 *
 * @param x
 *
 * Makes sure that a certain field is a rule.
 *
 */
function isRule(x) {
    return x instanceof rules_1.Rule || (x && x.constructor && x.constructor.name === 'Rule');
}
exports.isRule = isRule;
/**
 *
 * @param x
 *
 * Makes sure that a certain field is a logic rule.
 *
 */
function isLogicRule(x) {
    return (x instanceof rules_1.LogicRule ||
        (x &&
            x.constructor &&
            (x.constructor.name === 'RuleOr' ||
                x.constructor.name === 'RuleAnd' ||
                x.constructor.name === 'RuleChain' ||
                x.constructor.name === 'RuleRace' ||
                x.constructor.name === 'RuleNot' ||
                x.constructor.name === 'RuleTrue' ||
                x.constructor.name === 'RuleFalse')));
}
exports.isLogicRule = isLogicRule;
/**
 *
 * @param x
 *
 * Makes sure that a certain field is a rule or a logic rule.
 *
 */
function isRuleFunction(x) {
    return isRule(x) || isLogicRule(x);
}
exports.isRuleFunction = isRuleFunction;
/**
 *
 * @param x
 *
 * Determines whether a certain field is rule field map or not.
 *
 */
function isRuleFieldMap(x) {
    return typeof x === 'object' && Object.values(x).every((rule) => isRuleFunction(rule));
}
exports.isRuleFieldMap = isRuleFieldMap;
/**
 *
 * @param obj
 * @param func
 *
 * Flattens object of particular type by checking if the leaf
 * evaluates to true from particular function.
 *
 */
function flattenObjectOf(obj, f) {
    const values = Object.keys(obj).reduce((acc, key) => {
        const val = obj[key];
        if (f(val)) {
            return [...acc, val];
        }
        else if (typeof val === 'object' && !f(val)) {
            return [...acc, ...flattenObjectOf(val, f)];
        }
        else {
            return acc;
        }
    }, []);
    return values;
}
exports.flattenObjectOf = flattenObjectOf;
/**
 *
 * Returns fallback is provided value is undefined
 *
 * @param fallback
 */
function withDefault(fallback) {
    return (value) => {
        if (value === undefined)
            return fallback;
        return value;
    };
}
exports.withDefault = withDefault;
//# sourceMappingURL=utils.js.map