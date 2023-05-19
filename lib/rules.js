"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleFalse = exports.RuleTrue = exports.RuleNot = exports.RuleRace = exports.RuleChain = exports.RuleAnd = exports.RuleOr = exports.LogicRule = exports.Rule = void 0;
class Rule {
    constructor(name, func, constructorOptions) {
        const options = { ...constructorOptions };
        this.name = name;
        this.func = func;
    }
    async resolve(ctx, type, path, input, rawInput, options) {
        try {
            /* Resolve */
            const res = await this.executeRule(ctx, type, path, input, rawInput, options);
            if (res instanceof Error) {
                return res;
            }
            else if (typeof res === 'string') {
                return new Error(res);
            }
            else if (res === true) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            if (options.debug) {
                throw err;
            }
            else {
                return false;
            }
        }
    }
    /**
     *
     * Compares a given rule with the current one
     * and checks whether their functions are equal.
     *
     */
    equals(rule) {
        return this.func === rule.func;
    }
    executeRule(ctx, type, path, input, rawInput, options) {
        // @ts-ignore
        return this.func(ctx, type, path, input, rawInput, options);
    }
}
exports.Rule = Rule;
class LogicRule {
    constructor(rules) {
        this.rules = rules;
    }
    /**
     * By default logic rule resolves to false.
     */
    async resolve(ctx, type, path, input, rawInput, options) {
        return false;
    }
    /**
     * Evaluates all the rules.
     */
    async evaluate(ctx, type, path, input, rawInput, options) {
        const rules = this.getRules();
        const tasks = rules.map((rule) => rule.resolve(ctx, type, path, input, rawInput, options));
        return Promise.all(tasks);
    }
    /**
     * Returns rules in a logic rule.
     */
    getRules() {
        return this.rules;
    }
}
exports.LogicRule = LogicRule;
// Extended Types
class RuleOr extends LogicRule {
    constructor(rules) {
        super(rules);
    }
    /**
     * Makes sure that at least one of them has evaluated to true.
     */
    async resolve(ctx, type, path, input, rawInput, options) {
        const result = await this.evaluate(ctx, type, path, input, rawInput, options);
        if (result.every((res) => res !== true)) {
            const customError = result.find((res) => res instanceof Error);
            return customError || false;
        }
        else {
            return true;
        }
    }
}
exports.RuleOr = RuleOr;
class RuleAnd extends LogicRule {
    constructor(rules) {
        super(rules);
    }
    /**
     * Makes sure that all of them have resolved to true.
     */
    async resolve(ctx, type, path, input, rawInput, options) {
        const result = await this.evaluate(ctx, type, path, input, rawInput, options);
        if (result.some((res) => res !== true)) {
            const customError = result.find((res) => res instanceof Error);
            return customError || false;
        }
        else {
            return true;
        }
    }
}
exports.RuleAnd = RuleAnd;
class RuleChain extends LogicRule {
    constructor(rules) {
        super(rules);
    }
    /**
     * Makes sure that all of them have resolved to true.
     */
    async resolve(ctx, type, path, input, rawInput, options) {
        const result = await this.evaluate(ctx, type, path, input, rawInput, options);
        if (result.some((res) => res !== true)) {
            const customError = result.find((res) => res instanceof Error);
            return customError || false;
        }
        else {
            return true;
        }
    }
    /**
     * Evaluates all the rules.
     */
    async evaluate(ctx, type, path, input, rawInput, options) {
        const rules = this.getRules();
        return iterate(rules);
        async function iterate([rule, ...otherRules]) {
            if (rule === undefined)
                return [];
            return rule.resolve(ctx, type, path, input, rawInput, options).then((res) => {
                if (res !== true) {
                    return [res];
                }
                else {
                    return iterate(otherRules).then((ress) => ress.concat(res));
                }
            });
        }
    }
}
exports.RuleChain = RuleChain;
class RuleRace extends LogicRule {
    constructor(rules) {
        super(rules);
    }
    /**
     * Makes sure that at least one of them resolved to true.
     */
    async resolve(ctx, type, path, input, rawInput, options) {
        const result = await this.evaluate(ctx, type, path, input, rawInput, options);
        if (result.some((res) => res === true)) {
            return true;
        }
        else {
            const customError = result.find((res) => res instanceof Error);
            return customError || false;
        }
    }
    /**
     * Evaluates all the rules.
     */
    async evaluate(ctx, type, path, input, rawInput, options) {
        const rules = this.getRules();
        return iterate(rules);
        async function iterate([rule, ...otherRules]) {
            if (rule === undefined)
                return [];
            return rule.resolve(ctx, type, path, input, rawInput, options).then((res) => {
                if (res === true) {
                    return [res];
                }
                else {
                    return iterate(otherRules).then((ress) => ress.concat(res));
                }
            });
        }
    }
}
exports.RuleRace = RuleRace;
class RuleNot extends LogicRule {
    constructor(rule, error) {
        super([rule]);
        this.error = error;
    }
    /**
     *
     * Negates the result.
     *
     */
    async resolve(ctx, type, path, input, rawInput, options) {
        const [res] = await this.evaluate(ctx, type, path, input, rawInput, options);
        if (res instanceof Error) {
            return true;
        }
        else if (res !== true) {
            return true;
        }
        else {
            if (this.error)
                return this.error;
            return false;
        }
    }
}
exports.RuleNot = RuleNot;
class RuleTrue extends LogicRule {
    constructor() {
        super([]);
    }
    /**
     *
     * Always true.
     *
     */
    async resolve() {
        return true;
    }
}
exports.RuleTrue = RuleTrue;
class RuleFalse extends LogicRule {
    constructor() {
        super([]);
    }
    /**
     *
     * Always false.
     *
     */
    async resolve() {
        return false;
    }
}
exports.RuleFalse = RuleFalse;
//# sourceMappingURL=rules.js.map