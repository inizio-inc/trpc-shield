import { IOptions, IRules } from './types';
/**
 *
 * @param ruleTree
 * @param options
 *
 * Generates middleware from given rules.
 *
 */
export declare function generateMiddlewareFromRuleTree<TContext extends Record<string, unknown>>(ruleTree: IRules<TContext>, options: IOptions<TContext>): ({ next, ctx, type, path, input, rawInput, }: {
    next: Function;
    ctx: TContext;
    type: string;
    path: string;
    input: {
        [name: string]: any;
    };
    rawInput: unknown;
}) => any;
