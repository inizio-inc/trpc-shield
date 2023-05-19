import type { MiddlewareFunction, ProcedureParams } from '@trpc/server';
import type { AnyRootConfig } from '@trpc/server/dist/core/internals/config';
import type { IOptionsConstructor, IRules } from './types';
/**
 *
 * @param ruleTree
 * @param options
 *
 * Validates rules and generates middleware from defined rule tree.
 *
 */
export declare function shield<TContext extends Record<string, any>, TConfig extends AnyRootConfig = AnyRootConfig, TContextOut = TContext, TInputIn = unknown, TInputOut = unknown, TOutputIn = unknown, TOutputOut = unknown, TMeta = unknown>(ruleTree: IRules<TContext>, options?: IOptionsConstructor<TContext>): MiddlewareFunction<ProcedureParams<TConfig, TContextOut, TInputIn, TInputOut, TOutputIn, TOutputOut, TMeta>, ProcedureParams<TConfig, TContextOut, TInputIn, TInputOut, TOutputIn, TOutputOut, TMeta>>;
