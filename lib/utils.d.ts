import { ILogicRule, IRule, IRuleFieldMap, ShieldRule } from './types';
/**
 *
 * @param x
 *
 * Makes sure that a certain field is a rule.
 *
 */
export declare function isRule<TContext extends Record<string, any>>(x: any): x is IRule<TContext>;
/**
 *
 * @param x
 *
 * Makes sure that a certain field is a logic rule.
 *
 */
export declare function isLogicRule<TContext extends Record<string, any>>(x: any): x is ILogicRule<TContext>;
/**
 *
 * @param x
 *
 * Makes sure that a certain field is a rule or a logic rule.
 *
 */
export declare function isRuleFunction<TContext extends Record<string, any>>(x: any): x is ShieldRule<TContext>;
/**
 *
 * @param x
 *
 * Determines whether a certain field is rule field map or not.
 *
 */
export declare function isRuleFieldMap<TContext extends Record<string, any>>(x: any): x is IRuleFieldMap<TContext>;
/**
 *
 * @param obj
 * @param func
 *
 * Flattens object of particular type by checking if the leaf
 * evaluates to true from particular function.
 *
 */
export declare function flattenObjectOf<T>(obj: {
    [key: string]: any;
}, f: (x: any) => boolean): T[];
/**
 *
 * Returns fallback is provided value is undefined
 *
 * @param fallback
 */
export declare function withDefault<T>(fallback: T): (value: T | undefined) => T;
