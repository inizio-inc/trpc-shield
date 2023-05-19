import { ILogicRule, IOptions, IRule, IRuleConstructorOptions, IRuleFunction, IRuleResult, ShieldRule } from './types';
export declare class Rule<TContext extends Record<string, any>> implements IRule<TContext> {
    readonly name: string;
    private func;
    constructor(name: string, func: IRuleFunction<TContext>, constructorOptions: IRuleConstructorOptions);
    resolve(ctx: TContext, type: string, path: string, input: {
        [name: string]: any;
    }, rawInput: unknown, options: IOptions<TContext>): Promise<IRuleResult>;
    /**
     *
     * Compares a given rule with the current one
     * and checks whether their functions are equal.
     *
     */
    equals(rule: Rule<TContext>): boolean;
    private executeRule;
}
export declare class LogicRule<TContext extends Record<string, any>> implements ILogicRule<TContext> {
    private rules;
    constructor(rules: ShieldRule<TContext>[]);
    /**
     * By default logic rule resolves to false.
     */
    resolve(ctx: TContext, type: string, path: string, input: {
        [name: string]: any;
    }, rawInput: unknown, options: IOptions<TContext>): Promise<IRuleResult>;
    /**
     * Evaluates all the rules.
     */
    evaluate(ctx: TContext, type: string, path: string, input: {
        [name: string]: any;
    }, rawInput: unknown, options: IOptions<TContext>): Promise<IRuleResult[]>;
    /**
     * Returns rules in a logic rule.
     */
    getRules(): ShieldRule<TContext>[];
}
export declare class RuleOr<TContext extends Record<string, any>> extends LogicRule<TContext> {
    constructor(rules: ShieldRule<TContext>[]);
    /**
     * Makes sure that at least one of them has evaluated to true.
     */
    resolve(ctx: TContext, type: string, path: string, input: {
        [name: string]: any;
    }, rawInput: unknown, options: IOptions<TContext>): Promise<IRuleResult>;
}
export declare class RuleAnd<TContext extends Record<string, any>> extends LogicRule<TContext> {
    constructor(rules: ShieldRule<TContext>[]);
    /**
     * Makes sure that all of them have resolved to true.
     */
    resolve(ctx: TContext, type: string, path: string, input: {
        [name: string]: any;
    }, rawInput: unknown, options: IOptions<TContext>): Promise<IRuleResult>;
}
export declare class RuleChain<TContext extends Record<string, any>> extends LogicRule<TContext> {
    constructor(rules: ShieldRule<TContext>[]);
    /**
     * Makes sure that all of them have resolved to true.
     */
    resolve(ctx: TContext, type: string, path: string, input: {
        [name: string]: any;
    }, rawInput: unknown, options: IOptions<TContext>): Promise<IRuleResult>;
    /**
     * Evaluates all the rules.
     */
    evaluate(ctx: TContext, type: string, path: string, input: {
        [name: string]: any;
    }, rawInput: unknown, options: IOptions<TContext>): Promise<IRuleResult[]>;
}
export declare class RuleRace<TContext extends Record<string, any>> extends LogicRule<TContext> {
    constructor(rules: ShieldRule<TContext>[]);
    /**
     * Makes sure that at least one of them resolved to true.
     */
    resolve(ctx: TContext, type: string, path: string, input: {
        [name: string]: any;
    }, rawInput: unknown, options: IOptions<TContext>): Promise<IRuleResult>;
    /**
     * Evaluates all the rules.
     */
    evaluate(ctx: TContext, type: string, path: string, input: {
        [name: string]: any;
    }, rawInput: unknown, options: IOptions<TContext>): Promise<IRuleResult[]>;
}
export declare class RuleNot<TContext extends Record<string, any>> extends LogicRule<TContext> {
    error?: Error;
    constructor(rule: ShieldRule<TContext>, error?: Error);
    /**
     *
     * Negates the result.
     *
     */
    resolve(ctx: TContext, type: string, path: string, input: {
        [name: string]: any;
    }, rawInput: unknown, options: IOptions<TContext>): Promise<IRuleResult>;
}
export declare class RuleTrue<TContext extends Record<string, any>> extends LogicRule<TContext> {
    constructor();
    /**
     *
     * Always true.
     *
     */
    resolve(): Promise<IRuleResult>;
}
export declare class RuleFalse<TContext extends Record<string, any>> extends LogicRule<TContext> {
    constructor();
    /**
     *
     * Always false.
     *
     */
    resolve(): Promise<IRuleResult>;
}
