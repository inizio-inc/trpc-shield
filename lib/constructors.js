"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deny = exports.allow = exports.not = exports.or = exports.race = exports.chain = exports.and = exports.rule = void 0;
const rules_1 = require("./rules");
/**
 *
 * @param name
 * @param options
 *
 * Wraps a function into a Rule class. This way we can identify rules
 * once we start generating middleware from our ruleTree.
 *
 * 1.
 * const auth = rule()(async (ctx, type, path, input, rawInput, options) => {
 *  return true
 * })
 *
 * 2.
 * const auth = rule('name')(async (ctx, type, path, input, rawInput, options) => {
 *  return true
 * })
 *
 * 3.
 * const auth = rule({
 *  name: 'name',
 * })(async (ctx, type, path, input, rawInput, options) => {
 *  return true
 * })
 *
 */
const rule = (name, options) => (func) => {
    if (typeof name === 'object') {
        options = name;
        name = Math.random().toString();
    }
    else if (typeof name === 'string') {
        options = options || {};
    }
    else {
        name = Math.random().toString();
        options = {};
    }
    // @ts-ignore
    return new rules_1.Rule(name, func, {});
};
exports.rule = rule;
/**
 *
 * @param rules
 *
 * Logical operator and serves as a wrapper for and operation.
 *
 */
const and = (...rules) => {
    return new rules_1.RuleAnd(rules);
};
exports.and = and;
/**
 *
 * @param rules
 *
 * Logical operator and serves as a wrapper for and operation.
 *
 */
const chain = (...rules) => {
    return new rules_1.RuleChain(rules);
};
exports.chain = chain;
/**
 *
 * @param rules
 *
 * Logical operator and serves as a wrapper for and operation.
 *
 */
const race = (...rules) => {
    return new rules_1.RuleRace(rules);
};
exports.race = race;
/**
 *
 * @param rules
 *
 * Logical operator or serves as a wrapper for or operation.
 *
 */
const or = (...rules) => {
    return new rules_1.RuleOr(rules);
};
exports.or = or;
/**
 *
 * @param rule
 *
 * Logical operator not serves as a wrapper for not operation.
 *
 */
const not = (rule, error) => {
    if (typeof error === 'string')
        return new rules_1.RuleNot(rule, new Error(error));
    return new rules_1.RuleNot(rule, error);
};
exports.not = not;
/**
 *
 * Allow queries.
 *
 */
exports.allow = new rules_1.RuleTrue();
/**
 *
 * Deny queries.
 *
 */
exports.deny = new rules_1.RuleFalse();
//# sourceMappingURL=constructors.js.map