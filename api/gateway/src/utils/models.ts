/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export interface IRouter {
  get: (
    arg0: string,
    arg1: {
      (
        req: express.Request<
          ParamsDictionary,
          unknown,
          unknown,
          ParsedQs,
          Record<string, unknown>
        >,
        res: express.Response<unknown, Record<string, unknown>>,
        next: express.NextFunction
      ): void | express.Response<unknown, Record<string, unknown>>;
      (
        req: express.Request<
          ParamsDictionary,
          unknown,
          unknown,
          ParsedQs,
          Record<string, unknown>
        >,
        res: express.Response<unknown, Record<string, unknown>>,
        next: express.NextFunction
      ): void | express.Response<unknown, Record<string, unknown>>;
    },
    arg2: {
      (
        _req: express.Request<
          ParamsDictionary,
          unknown,
          unknown,
          ParsedQs,
          Record<string, unknown>
        >,
        res: express.Response<unknown, Record<string, unknown>>
      ): Promise<express.Response<unknown, Record<string, unknown>>>;
      (
        {
          params,
        }: express.Request<
          ParamsDictionary,
          unknown,
          unknown,
          ParsedQs,
          Record<string, unknown>
        >,
        res: express.Response<unknown, Record<string, unknown>>
      ): Promise<express.Response<unknown, Record<string, unknown>>>;
    }
  ) => void;
  post: (
    arg0: string,
    arg1: (
      req: express.Request<
        ParamsDictionary,
        any,
        any,
        ParsedQs,
        Record<string, any>
      >,
      res: express.Response<any, Record<string, any>>,
      next: express.NextFunction
    ) => void | express.Response<any, Record<string, any>>,
    arg2: (
      {
        body,
      }: express.Request<
        ParamsDictionary,
        any,
        any,
        ParsedQs,
        Record<string, any>
      >,
      res: express.Response<any, Record<string, any>>
    ) => Promise<express.Response<any, Record<string, any>>>
  ) => void;
  patch: (
    arg0: string,
    arg1: (
      req: express.Request<
        ParamsDictionary,
        any,
        any,
        ParsedQs,
        Record<string, any>
      >,
      res: express.Response<any, Record<string, any>>,
      next: express.NextFunction
    ) => void | express.Response<any, Record<string, any>>,
    arg2: (
      {
        params,
        body,
      }: express.Request<
        ParamsDictionary,
        any,
        any,
        ParsedQs,
        Record<string, any>
      >,
      res: express.Response<any, Record<string, any>>
    ) => Promise<express.Response<any, Record<string, any>>>
  ) => void;
  delete: (
    arg0: string,
    arg1: (
      req: express.Request<
        ParamsDictionary,
        any,
        any,
        ParsedQs,
        Record<string, any>
      >,
      res: express.Response<any, Record<string, any>>,
      next: express.NextFunction
    ) => void | express.Response<any, Record<string, any>>,
    arg2: (
      {
        params,
      }: express.Request<
        ParamsDictionary,
        any,
        any,
        ParsedQs,
        Record<string, any>
      >,
      res: express.Response<any, Record<string, any>>
    ) => Promise<express.Response<any, Record<string, any>>>
  ) => void;
}
