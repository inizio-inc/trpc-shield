"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMiddlewareFromRuleTree = void 0;
/**
 *
 * @param ruleTree
 * @param options
 *
 * Generates middleware from given rules.
 *
 */
function generateMiddlewareFromRuleTree(ruleTree, options) {
    return ({ next, ctx, type, path, input, rawInput, }) => {
        var _a, _b, _c;
        const opWithPath = path.split('.');
        const opName = opWithPath[opWithPath.length - 1];
        const keys = Object.keys(ruleTree);
        let rule;
        if (keys.includes('query') || keys.includes('mutation')) {
            //@ts-ignore
            rule = ((_a = ruleTree === null || ruleTree === void 0 ? void 0 : ruleTree[type]) === null || _a === void 0 ? void 0 : _a[opName]) || options.fallbackRule;
        }
        else {
            const namespace = opWithPath[0];
            const tree = ruleTree[namespace];
            if ((_b = tree === null || tree === void 0 ? void 0 : tree[type]) === null || _b === void 0 ? void 0 : _b[opName]) {
                rule = ((_c = tree === null || tree === void 0 ? void 0 : tree[type]) === null || _c === void 0 ? void 0 : _c[opName]) || options.fallbackRule;
                return;
            }
        }
        if (rule) {
            return rule === null || rule === void 0 ? void 0 : rule.resolve(ctx, type, path, input, rawInput, options).then((result) => {
                if (result instanceof Error)
                    throw result;
                if (!result)
                    throw options.fallbackError;
                return next();
            });
        }
        return next();
    };
}
exports.generateMiddlewareFromRuleTree = generateMiddlewareFromRuleTree;
//# sourceMappingURL=generator.js.map