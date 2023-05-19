import { Rule, RuleAnd, RuleChain, RuleFalse, RuleNot, RuleOr, RuleRace, RuleTrue } from './rules';
import { IRuleConstructorOptions, IRuleFunction, ShieldRule } from './types';
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
export declare const rule: <TContext extends Record<string, any>>(name?: string, options?: IRuleConstructorOptions) => (func: IRuleFunction<TContext>) => Rule<TContext>;
/**
 *
 * @param rules
 *
 * Logical operator and serves as a wrapper for and operation.
 *
 */
export declare const and: <TContext extends Record<string, any>>(...rules: ShieldRule<TContext>[]) => RuleAnd<TContext>;
/**
 *
 * @param rules
 *
 * Logical operator and serves as a wrapper for and operation.
 *
 */
export declare const chain: <TContext extends Record<string, any>>(...rules: ShieldRule<TContext>[]) => RuleChain<TContext>;
/**
 *
 * @param rules
 *
 * Logical operator and serves as a wrapper for and operation.
 *
 */
export declare const race: <TContext extends Record<string, any>>(...rules: ShieldRule<TContext>[]) => RuleRace<TContext>;
/**
 *
 * @param rules
 *
 * Logical operator or serves as a wrapper for or operation.
 *
 */
export declare const or: <TContext extends Record<string, any>>(...rules: ShieldRule<TContext>[]) => RuleOr<TContext>;
/**
 *
 * @param rule
 *
 * Logical operator not serves as a wrapper for not operation.
 *
 */
export declare const not: <TContext extends Record<string, any>>(rule: ShieldRule<TContext>, error?: string | Error) => RuleNot<TContext>;
/**
 *
 * Allow queries.
 *
 */
export declare const allow: RuleTrue<Record<string, any>>;
/**
 *
 * Deny queries.
 *
 */
export declare const deny: RuleFalse<Record<string, any>>;
