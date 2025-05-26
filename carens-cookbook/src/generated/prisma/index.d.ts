
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Recipe
 * 
 */
export type Recipe = $Result.DefaultSelection<Prisma.$RecipePayload>
/**
 * Model RecipeImage
 * 
 */
export type RecipeImage = $Result.DefaultSelection<Prisma.$RecipeImagePayload>
/**
 * Model RecipeFavorite
 * 
 */
export type RecipeFavorite = $Result.DefaultSelection<Prisma.$RecipeFavoritePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const CookingSkillLevel: {
  BEGINNER: 'BEGINNER',
  INTERMEDIATE: 'INTERMEDIATE',
  ADVANCED: 'ADVANCED'
};

export type CookingSkillLevel = (typeof CookingSkillLevel)[keyof typeof CookingSkillLevel]


export const DietaryPreference: {
  NONE: 'NONE',
  VEGETARIAN: 'VEGETARIAN',
  VEGAN: 'VEGAN',
  GLUTEN_FREE: 'GLUTEN_FREE',
  DAIRY_FREE: 'DAIRY_FREE',
  KETO: 'KETO',
  PALEO: 'PALEO',
  LOW_CARB: 'LOW_CARB',
  LOW_SODIUM: 'LOW_SODIUM',
  NUT_FREE: 'NUT_FREE',
  KOSHER: 'KOSHER',
  HALAL: 'HALAL'
};

export type DietaryPreference = (typeof DietaryPreference)[keyof typeof DietaryPreference]


export const ProcessingMethod: {
  OPENAI: 'OPENAI',
  GEMINI: 'GEMINI'
};

export type ProcessingMethod = (typeof ProcessingMethod)[keyof typeof ProcessingMethod]


export const CategorySource: {
  PREDEFINED: 'PREDEFINED',
  AI_GENERATED: 'AI_GENERATED',
  USER_CREATED: 'USER_CREATED'
};

export type CategorySource = (typeof CategorySource)[keyof typeof CategorySource]

}

export type CookingSkillLevel = $Enums.CookingSkillLevel

export const CookingSkillLevel: typeof $Enums.CookingSkillLevel

export type DietaryPreference = $Enums.DietaryPreference

export const DietaryPreference: typeof $Enums.DietaryPreference

export type ProcessingMethod = $Enums.ProcessingMethod

export const ProcessingMethod: typeof $Enums.ProcessingMethod

export type CategorySource = $Enums.CategorySource

export const CategorySource: typeof $Enums.CategorySource

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.recipe`: Exposes CRUD operations for the **Recipe** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Recipes
    * const recipes = await prisma.recipe.findMany()
    * ```
    */
  get recipe(): Prisma.RecipeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.recipeImage`: Exposes CRUD operations for the **RecipeImage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RecipeImages
    * const recipeImages = await prisma.recipeImage.findMany()
    * ```
    */
  get recipeImage(): Prisma.RecipeImageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.recipeFavorite`: Exposes CRUD operations for the **RecipeFavorite** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RecipeFavorites
    * const recipeFavorites = await prisma.recipeFavorite.findMany()
    * ```
    */
  get recipeFavorite(): Prisma.RecipeFavoriteDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Recipe: 'Recipe',
    RecipeImage: 'RecipeImage',
    RecipeFavorite: 'RecipeFavorite'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "recipe" | "recipeImage" | "recipeFavorite"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Recipe: {
        payload: Prisma.$RecipePayload<ExtArgs>
        fields: Prisma.RecipeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecipeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecipeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>
          }
          findFirst: {
            args: Prisma.RecipeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecipeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>
          }
          findMany: {
            args: Prisma.RecipeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>[]
          }
          create: {
            args: Prisma.RecipeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>
          }
          createMany: {
            args: Prisma.RecipeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RecipeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>[]
          }
          delete: {
            args: Prisma.RecipeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>
          }
          update: {
            args: Prisma.RecipeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>
          }
          deleteMany: {
            args: Prisma.RecipeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecipeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RecipeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>[]
          }
          upsert: {
            args: Prisma.RecipeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipePayload>
          }
          aggregate: {
            args: Prisma.RecipeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecipe>
          }
          groupBy: {
            args: Prisma.RecipeGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecipeGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecipeCountArgs<ExtArgs>
            result: $Utils.Optional<RecipeCountAggregateOutputType> | number
          }
        }
      }
      RecipeImage: {
        payload: Prisma.$RecipeImagePayload<ExtArgs>
        fields: Prisma.RecipeImageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecipeImageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeImagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecipeImageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeImagePayload>
          }
          findFirst: {
            args: Prisma.RecipeImageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeImagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecipeImageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeImagePayload>
          }
          findMany: {
            args: Prisma.RecipeImageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeImagePayload>[]
          }
          create: {
            args: Prisma.RecipeImageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeImagePayload>
          }
          createMany: {
            args: Prisma.RecipeImageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RecipeImageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeImagePayload>[]
          }
          delete: {
            args: Prisma.RecipeImageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeImagePayload>
          }
          update: {
            args: Prisma.RecipeImageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeImagePayload>
          }
          deleteMany: {
            args: Prisma.RecipeImageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecipeImageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RecipeImageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeImagePayload>[]
          }
          upsert: {
            args: Prisma.RecipeImageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeImagePayload>
          }
          aggregate: {
            args: Prisma.RecipeImageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecipeImage>
          }
          groupBy: {
            args: Prisma.RecipeImageGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecipeImageGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecipeImageCountArgs<ExtArgs>
            result: $Utils.Optional<RecipeImageCountAggregateOutputType> | number
          }
        }
      }
      RecipeFavorite: {
        payload: Prisma.$RecipeFavoritePayload<ExtArgs>
        fields: Prisma.RecipeFavoriteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecipeFavoriteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeFavoritePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecipeFavoriteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeFavoritePayload>
          }
          findFirst: {
            args: Prisma.RecipeFavoriteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeFavoritePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecipeFavoriteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeFavoritePayload>
          }
          findMany: {
            args: Prisma.RecipeFavoriteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeFavoritePayload>[]
          }
          create: {
            args: Prisma.RecipeFavoriteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeFavoritePayload>
          }
          createMany: {
            args: Prisma.RecipeFavoriteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RecipeFavoriteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeFavoritePayload>[]
          }
          delete: {
            args: Prisma.RecipeFavoriteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeFavoritePayload>
          }
          update: {
            args: Prisma.RecipeFavoriteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeFavoritePayload>
          }
          deleteMany: {
            args: Prisma.RecipeFavoriteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecipeFavoriteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RecipeFavoriteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeFavoritePayload>[]
          }
          upsert: {
            args: Prisma.RecipeFavoriteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeFavoritePayload>
          }
          aggregate: {
            args: Prisma.RecipeFavoriteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecipeFavorite>
          }
          groupBy: {
            args: Prisma.RecipeFavoriteGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecipeFavoriteGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecipeFavoriteCountArgs<ExtArgs>
            result: $Utils.Optional<RecipeFavoriteCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    recipe?: RecipeOmit
    recipeImage?: RecipeImageOmit
    recipeFavorite?: RecipeFavoriteOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    recipes: number
    favorites: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recipes?: boolean | UserCountOutputTypeCountRecipesArgs
    favorites?: boolean | UserCountOutputTypeCountFavoritesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRecipesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecipeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFavoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecipeFavoriteWhereInput
  }


  /**
   * Count Type RecipeCountOutputType
   */

  export type RecipeCountOutputType = {
    favorites: number
    images: number
  }

  export type RecipeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    favorites?: boolean | RecipeCountOutputTypeCountFavoritesArgs
    images?: boolean | RecipeCountOutputTypeCountImagesArgs
  }

  // Custom InputTypes
  /**
   * RecipeCountOutputType without action
   */
  export type RecipeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeCountOutputType
     */
    select?: RecipeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RecipeCountOutputType without action
   */
  export type RecipeCountOutputTypeCountFavoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecipeFavoriteWhereInput
  }

  /**
   * RecipeCountOutputType without action
   */
  export type RecipeCountOutputTypeCountImagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecipeImageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    onboardingStep: number | null
    householdSize: number | null
  }

  export type UserSumAggregateOutputType = {
    onboardingStep: number | null
    householdSize: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    firstName: string | null
    lastName: string | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
    onboardingCompleted: boolean | null
    onboardingStep: number | null
    cookingSkillLevel: $Enums.CookingSkillLevel | null
    householdSize: number | null
    defaultProcessingMethod: $Enums.ProcessingMethod | null
    timezone: string | null
    measurementSystem: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    firstName: string | null
    lastName: string | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
    onboardingCompleted: boolean | null
    onboardingStep: number | null
    cookingSkillLevel: $Enums.CookingSkillLevel | null
    householdSize: number | null
    defaultProcessingMethod: $Enums.ProcessingMethod | null
    timezone: string | null
    measurementSystem: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    firstName: number
    lastName: number
    imageUrl: number
    createdAt: number
    updatedAt: number
    onboardingCompleted: number
    onboardingStep: number
    cookingSkillLevel: number
    dietaryPreferences: number
    favoriteCuisines: number
    householdSize: number
    defaultProcessingMethod: number
    preferredCategories: number
    timezone: number
    measurementSystem: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    onboardingStep?: true
    householdSize?: true
  }

  export type UserSumAggregateInputType = {
    onboardingStep?: true
    householdSize?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastName?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
    onboardingCompleted?: true
    onboardingStep?: true
    cookingSkillLevel?: true
    householdSize?: true
    defaultProcessingMethod?: true
    timezone?: true
    measurementSystem?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastName?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
    onboardingCompleted?: true
    onboardingStep?: true
    cookingSkillLevel?: true
    householdSize?: true
    defaultProcessingMethod?: true
    timezone?: true
    measurementSystem?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastName?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
    onboardingCompleted?: true
    onboardingStep?: true
    cookingSkillLevel?: true
    dietaryPreferences?: true
    favoriteCuisines?: true
    householdSize?: true
    defaultProcessingMethod?: true
    preferredCategories?: true
    timezone?: true
    measurementSystem?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    firstName: string | null
    lastName: string | null
    imageUrl: string | null
    createdAt: Date
    updatedAt: Date
    onboardingCompleted: boolean
    onboardingStep: number | null
    cookingSkillLevel: $Enums.CookingSkillLevel | null
    dietaryPreferences: $Enums.DietaryPreference[]
    favoriteCuisines: string[]
    householdSize: number | null
    defaultProcessingMethod: $Enums.ProcessingMethod
    preferredCategories: string[]
    timezone: string | null
    measurementSystem: string | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    onboardingCompleted?: boolean
    onboardingStep?: boolean
    cookingSkillLevel?: boolean
    dietaryPreferences?: boolean
    favoriteCuisines?: boolean
    householdSize?: boolean
    defaultProcessingMethod?: boolean
    preferredCategories?: boolean
    timezone?: boolean
    measurementSystem?: boolean
    recipes?: boolean | User$recipesArgs<ExtArgs>
    favorites?: boolean | User$favoritesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    onboardingCompleted?: boolean
    onboardingStep?: boolean
    cookingSkillLevel?: boolean
    dietaryPreferences?: boolean
    favoriteCuisines?: boolean
    householdSize?: boolean
    defaultProcessingMethod?: boolean
    preferredCategories?: boolean
    timezone?: boolean
    measurementSystem?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    onboardingCompleted?: boolean
    onboardingStep?: boolean
    cookingSkillLevel?: boolean
    dietaryPreferences?: boolean
    favoriteCuisines?: boolean
    householdSize?: boolean
    defaultProcessingMethod?: boolean
    preferredCategories?: boolean
    timezone?: boolean
    measurementSystem?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    onboardingCompleted?: boolean
    onboardingStep?: boolean
    cookingSkillLevel?: boolean
    dietaryPreferences?: boolean
    favoriteCuisines?: boolean
    householdSize?: boolean
    defaultProcessingMethod?: boolean
    preferredCategories?: boolean
    timezone?: boolean
    measurementSystem?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "firstName" | "lastName" | "imageUrl" | "createdAt" | "updatedAt" | "onboardingCompleted" | "onboardingStep" | "cookingSkillLevel" | "dietaryPreferences" | "favoriteCuisines" | "householdSize" | "defaultProcessingMethod" | "preferredCategories" | "timezone" | "measurementSystem", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recipes?: boolean | User$recipesArgs<ExtArgs>
    favorites?: boolean | User$favoritesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      recipes: Prisma.$RecipePayload<ExtArgs>[]
      favorites: Prisma.$RecipeFavoritePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      firstName: string | null
      lastName: string | null
      imageUrl: string | null
      createdAt: Date
      updatedAt: Date
      onboardingCompleted: boolean
      onboardingStep: number | null
      cookingSkillLevel: $Enums.CookingSkillLevel | null
      dietaryPreferences: $Enums.DietaryPreference[]
      favoriteCuisines: string[]
      householdSize: number | null
      defaultProcessingMethod: $Enums.ProcessingMethod
      preferredCategories: string[]
      timezone: string | null
      measurementSystem: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    recipes<T extends User$recipesArgs<ExtArgs> = {}>(args?: Subset<T, User$recipesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    favorites<T extends User$favoritesArgs<ExtArgs> = {}>(args?: Subset<T, User$favoritesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipeFavoritePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly imageUrl: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly onboardingCompleted: FieldRef<"User", 'Boolean'>
    readonly onboardingStep: FieldRef<"User", 'Int'>
    readonly cookingSkillLevel: FieldRef<"User", 'CookingSkillLevel'>
    readonly dietaryPreferences: FieldRef<"User", 'DietaryPreference[]'>
    readonly favoriteCuisines: FieldRef<"User", 'String[]'>
    readonly householdSize: FieldRef<"User", 'Int'>
    readonly defaultProcessingMethod: FieldRef<"User", 'ProcessingMethod'>
    readonly preferredCategories: FieldRef<"User", 'String[]'>
    readonly timezone: FieldRef<"User", 'String'>
    readonly measurementSystem: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.recipes
   */
  export type User$recipesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    where?: RecipeWhereInput
    orderBy?: RecipeOrderByWithRelationInput | RecipeOrderByWithRelationInput[]
    cursor?: RecipeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecipeScalarFieldEnum | RecipeScalarFieldEnum[]
  }

  /**
   * User.favorites
   */
  export type User$favoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeFavorite
     */
    select?: RecipeFavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeFavorite
     */
    omit?: RecipeFavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeFavoriteInclude<ExtArgs> | null
    where?: RecipeFavoriteWhereInput
    orderBy?: RecipeFavoriteOrderByWithRelationInput | RecipeFavoriteOrderByWithRelationInput[]
    cursor?: RecipeFavoriteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecipeFavoriteScalarFieldEnum | RecipeFavoriteScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Recipe
   */

  export type AggregateRecipe = {
    _count: RecipeCountAggregateOutputType | null
    _avg: RecipeAvgAggregateOutputType | null
    _sum: RecipeSumAggregateOutputType | null
    _min: RecipeMinAggregateOutputType | null
    _max: RecipeMaxAggregateOutputType | null
  }

  export type RecipeAvgAggregateOutputType = {
    categoryConfidence: number | null
  }

  export type RecipeSumAggregateOutputType = {
    categoryConfidence: number | null
  }

  export type RecipeMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    image: string | null
    cuisine: string | null
    category: string | null
    prepTime: string | null
    cleanupTime: string | null
    createdAt: Date | null
    updatedAt: Date | null
    categorySource: $Enums.CategorySource | null
    categoryConfidence: number | null
    originalCategory: string | null
    userId: string | null
  }

  export type RecipeMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    image: string | null
    cuisine: string | null
    category: string | null
    prepTime: string | null
    cleanupTime: string | null
    createdAt: Date | null
    updatedAt: Date | null
    categorySource: $Enums.CategorySource | null
    categoryConfidence: number | null
    originalCategory: string | null
    userId: string | null
  }

  export type RecipeCountAggregateOutputType = {
    id: number
    title: number
    description: number
    ingredients: number
    steps: number
    image: number
    cuisine: number
    category: number
    prepTime: number
    cleanupTime: number
    createdAt: number
    updatedAt: number
    categorySource: number
    categoryConfidence: number
    originalCategory: number
    userId: number
    _all: number
  }


  export type RecipeAvgAggregateInputType = {
    categoryConfidence?: true
  }

  export type RecipeSumAggregateInputType = {
    categoryConfidence?: true
  }

  export type RecipeMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    image?: true
    cuisine?: true
    category?: true
    prepTime?: true
    cleanupTime?: true
    createdAt?: true
    updatedAt?: true
    categorySource?: true
    categoryConfidence?: true
    originalCategory?: true
    userId?: true
  }

  export type RecipeMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    image?: true
    cuisine?: true
    category?: true
    prepTime?: true
    cleanupTime?: true
    createdAt?: true
    updatedAt?: true
    categorySource?: true
    categoryConfidence?: true
    originalCategory?: true
    userId?: true
  }

  export type RecipeCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    ingredients?: true
    steps?: true
    image?: true
    cuisine?: true
    category?: true
    prepTime?: true
    cleanupTime?: true
    createdAt?: true
    updatedAt?: true
    categorySource?: true
    categoryConfidence?: true
    originalCategory?: true
    userId?: true
    _all?: true
  }

  export type RecipeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recipe to aggregate.
     */
    where?: RecipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipes to fetch.
     */
    orderBy?: RecipeOrderByWithRelationInput | RecipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Recipes
    **/
    _count?: true | RecipeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RecipeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RecipeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecipeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecipeMaxAggregateInputType
  }

  export type GetRecipeAggregateType<T extends RecipeAggregateArgs> = {
        [P in keyof T & keyof AggregateRecipe]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecipe[P]>
      : GetScalarType<T[P], AggregateRecipe[P]>
  }




  export type RecipeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecipeWhereInput
    orderBy?: RecipeOrderByWithAggregationInput | RecipeOrderByWithAggregationInput[]
    by: RecipeScalarFieldEnum[] | RecipeScalarFieldEnum
    having?: RecipeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecipeCountAggregateInputType | true
    _avg?: RecipeAvgAggregateInputType
    _sum?: RecipeSumAggregateInputType
    _min?: RecipeMinAggregateInputType
    _max?: RecipeMaxAggregateInputType
  }

  export type RecipeGroupByOutputType = {
    id: string
    title: string
    description: string
    ingredients: string[]
    steps: string[]
    image: string | null
    cuisine: string
    category: string
    prepTime: string
    cleanupTime: string
    createdAt: Date
    updatedAt: Date
    categorySource: $Enums.CategorySource | null
    categoryConfidence: number | null
    originalCategory: string | null
    userId: string
    _count: RecipeCountAggregateOutputType | null
    _avg: RecipeAvgAggregateOutputType | null
    _sum: RecipeSumAggregateOutputType | null
    _min: RecipeMinAggregateOutputType | null
    _max: RecipeMaxAggregateOutputType | null
  }

  type GetRecipeGroupByPayload<T extends RecipeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecipeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecipeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecipeGroupByOutputType[P]>
            : GetScalarType<T[P], RecipeGroupByOutputType[P]>
        }
      >
    >


  export type RecipeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    ingredients?: boolean
    steps?: boolean
    image?: boolean
    cuisine?: boolean
    category?: boolean
    prepTime?: boolean
    cleanupTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    categorySource?: boolean
    categoryConfidence?: boolean
    originalCategory?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    favorites?: boolean | Recipe$favoritesArgs<ExtArgs>
    images?: boolean | Recipe$imagesArgs<ExtArgs>
    _count?: boolean | RecipeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recipe"]>

  export type RecipeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    ingredients?: boolean
    steps?: boolean
    image?: boolean
    cuisine?: boolean
    category?: boolean
    prepTime?: boolean
    cleanupTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    categorySource?: boolean
    categoryConfidence?: boolean
    originalCategory?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recipe"]>

  export type RecipeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    ingredients?: boolean
    steps?: boolean
    image?: boolean
    cuisine?: boolean
    category?: boolean
    prepTime?: boolean
    cleanupTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    categorySource?: boolean
    categoryConfidence?: boolean
    originalCategory?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recipe"]>

  export type RecipeSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    ingredients?: boolean
    steps?: boolean
    image?: boolean
    cuisine?: boolean
    category?: boolean
    prepTime?: boolean
    cleanupTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    categorySource?: boolean
    categoryConfidence?: boolean
    originalCategory?: boolean
    userId?: boolean
  }

  export type RecipeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "ingredients" | "steps" | "image" | "cuisine" | "category" | "prepTime" | "cleanupTime" | "createdAt" | "updatedAt" | "categorySource" | "categoryConfidence" | "originalCategory" | "userId", ExtArgs["result"]["recipe"]>
  export type RecipeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    favorites?: boolean | Recipe$favoritesArgs<ExtArgs>
    images?: boolean | Recipe$imagesArgs<ExtArgs>
    _count?: boolean | RecipeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RecipeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RecipeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RecipePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Recipe"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      favorites: Prisma.$RecipeFavoritePayload<ExtArgs>[]
      images: Prisma.$RecipeImagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      ingredients: string[]
      steps: string[]
      image: string | null
      cuisine: string
      category: string
      prepTime: string
      cleanupTime: string
      createdAt: Date
      updatedAt: Date
      categorySource: $Enums.CategorySource | null
      categoryConfidence: number | null
      originalCategory: string | null
      userId: string
    }, ExtArgs["result"]["recipe"]>
    composites: {}
  }

  type RecipeGetPayload<S extends boolean | null | undefined | RecipeDefaultArgs> = $Result.GetResult<Prisma.$RecipePayload, S>

  type RecipeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RecipeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RecipeCountAggregateInputType | true
    }

  export interface RecipeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Recipe'], meta: { name: 'Recipe' } }
    /**
     * Find zero or one Recipe that matches the filter.
     * @param {RecipeFindUniqueArgs} args - Arguments to find a Recipe
     * @example
     * // Get one Recipe
     * const recipe = await prisma.recipe.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecipeFindUniqueArgs>(args: SelectSubset<T, RecipeFindUniqueArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Recipe that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RecipeFindUniqueOrThrowArgs} args - Arguments to find a Recipe
     * @example
     * // Get one Recipe
     * const recipe = await prisma.recipe.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecipeFindUniqueOrThrowArgs>(args: SelectSubset<T, RecipeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Recipe that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeFindFirstArgs} args - Arguments to find a Recipe
     * @example
     * // Get one Recipe
     * const recipe = await prisma.recipe.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecipeFindFirstArgs>(args?: SelectSubset<T, RecipeFindFirstArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Recipe that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeFindFirstOrThrowArgs} args - Arguments to find a Recipe
     * @example
     * // Get one Recipe
     * const recipe = await prisma.recipe.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecipeFindFirstOrThrowArgs>(args?: SelectSubset<T, RecipeFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Recipes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Recipes
     * const recipes = await prisma.recipe.findMany()
     * 
     * // Get first 10 Recipes
     * const recipes = await prisma.recipe.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recipeWithIdOnly = await prisma.recipe.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RecipeFindManyArgs>(args?: SelectSubset<T, RecipeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Recipe.
     * @param {RecipeCreateArgs} args - Arguments to create a Recipe.
     * @example
     * // Create one Recipe
     * const Recipe = await prisma.recipe.create({
     *   data: {
     *     // ... data to create a Recipe
     *   }
     * })
     * 
     */
    create<T extends RecipeCreateArgs>(args: SelectSubset<T, RecipeCreateArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Recipes.
     * @param {RecipeCreateManyArgs} args - Arguments to create many Recipes.
     * @example
     * // Create many Recipes
     * const recipe = await prisma.recipe.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecipeCreateManyArgs>(args?: SelectSubset<T, RecipeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Recipes and returns the data saved in the database.
     * @param {RecipeCreateManyAndReturnArgs} args - Arguments to create many Recipes.
     * @example
     * // Create many Recipes
     * const recipe = await prisma.recipe.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Recipes and only return the `id`
     * const recipeWithIdOnly = await prisma.recipe.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RecipeCreateManyAndReturnArgs>(args?: SelectSubset<T, RecipeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Recipe.
     * @param {RecipeDeleteArgs} args - Arguments to delete one Recipe.
     * @example
     * // Delete one Recipe
     * const Recipe = await prisma.recipe.delete({
     *   where: {
     *     // ... filter to delete one Recipe
     *   }
     * })
     * 
     */
    delete<T extends RecipeDeleteArgs>(args: SelectSubset<T, RecipeDeleteArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Recipe.
     * @param {RecipeUpdateArgs} args - Arguments to update one Recipe.
     * @example
     * // Update one Recipe
     * const recipe = await prisma.recipe.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecipeUpdateArgs>(args: SelectSubset<T, RecipeUpdateArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Recipes.
     * @param {RecipeDeleteManyArgs} args - Arguments to filter Recipes to delete.
     * @example
     * // Delete a few Recipes
     * const { count } = await prisma.recipe.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecipeDeleteManyArgs>(args?: SelectSubset<T, RecipeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Recipes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Recipes
     * const recipe = await prisma.recipe.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecipeUpdateManyArgs>(args: SelectSubset<T, RecipeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Recipes and returns the data updated in the database.
     * @param {RecipeUpdateManyAndReturnArgs} args - Arguments to update many Recipes.
     * @example
     * // Update many Recipes
     * const recipe = await prisma.recipe.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Recipes and only return the `id`
     * const recipeWithIdOnly = await prisma.recipe.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RecipeUpdateManyAndReturnArgs>(args: SelectSubset<T, RecipeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Recipe.
     * @param {RecipeUpsertArgs} args - Arguments to update or create a Recipe.
     * @example
     * // Update or create a Recipe
     * const recipe = await prisma.recipe.upsert({
     *   create: {
     *     // ... data to create a Recipe
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Recipe we want to update
     *   }
     * })
     */
    upsert<T extends RecipeUpsertArgs>(args: SelectSubset<T, RecipeUpsertArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Recipes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeCountArgs} args - Arguments to filter Recipes to count.
     * @example
     * // Count the number of Recipes
     * const count = await prisma.recipe.count({
     *   where: {
     *     // ... the filter for the Recipes we want to count
     *   }
     * })
    **/
    count<T extends RecipeCountArgs>(
      args?: Subset<T, RecipeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecipeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Recipe.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RecipeAggregateArgs>(args: Subset<T, RecipeAggregateArgs>): Prisma.PrismaPromise<GetRecipeAggregateType<T>>

    /**
     * Group by Recipe.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RecipeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecipeGroupByArgs['orderBy'] }
        : { orderBy?: RecipeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RecipeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecipeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Recipe model
   */
  readonly fields: RecipeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Recipe.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecipeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    favorites<T extends Recipe$favoritesArgs<ExtArgs> = {}>(args?: Subset<T, Recipe$favoritesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipeFavoritePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    images<T extends Recipe$imagesArgs<ExtArgs> = {}>(args?: Subset<T, Recipe$imagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipeImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Recipe model
   */
  interface RecipeFieldRefs {
    readonly id: FieldRef<"Recipe", 'String'>
    readonly title: FieldRef<"Recipe", 'String'>
    readonly description: FieldRef<"Recipe", 'String'>
    readonly ingredients: FieldRef<"Recipe", 'String[]'>
    readonly steps: FieldRef<"Recipe", 'String[]'>
    readonly image: FieldRef<"Recipe", 'String'>
    readonly cuisine: FieldRef<"Recipe", 'String'>
    readonly category: FieldRef<"Recipe", 'String'>
    readonly prepTime: FieldRef<"Recipe", 'String'>
    readonly cleanupTime: FieldRef<"Recipe", 'String'>
    readonly createdAt: FieldRef<"Recipe", 'DateTime'>
    readonly updatedAt: FieldRef<"Recipe", 'DateTime'>
    readonly categorySource: FieldRef<"Recipe", 'CategorySource'>
    readonly categoryConfidence: FieldRef<"Recipe", 'Float'>
    readonly originalCategory: FieldRef<"Recipe", 'String'>
    readonly userId: FieldRef<"Recipe", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Recipe findUnique
   */
  export type RecipeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * Filter, which Recipe to fetch.
     */
    where: RecipeWhereUniqueInput
  }

  /**
   * Recipe findUniqueOrThrow
   */
  export type RecipeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * Filter, which Recipe to fetch.
     */
    where: RecipeWhereUniqueInput
  }

  /**
   * Recipe findFirst
   */
  export type RecipeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * Filter, which Recipe to fetch.
     */
    where?: RecipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipes to fetch.
     */
    orderBy?: RecipeOrderByWithRelationInput | RecipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recipes.
     */
    cursor?: RecipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recipes.
     */
    distinct?: RecipeScalarFieldEnum | RecipeScalarFieldEnum[]
  }

  /**
   * Recipe findFirstOrThrow
   */
  export type RecipeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * Filter, which Recipe to fetch.
     */
    where?: RecipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipes to fetch.
     */
    orderBy?: RecipeOrderByWithRelationInput | RecipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recipes.
     */
    cursor?: RecipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recipes.
     */
    distinct?: RecipeScalarFieldEnum | RecipeScalarFieldEnum[]
  }

  /**
   * Recipe findMany
   */
  export type RecipeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * Filter, which Recipes to fetch.
     */
    where?: RecipeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recipes to fetch.
     */
    orderBy?: RecipeOrderByWithRelationInput | RecipeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Recipes.
     */
    cursor?: RecipeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recipes.
     */
    skip?: number
    distinct?: RecipeScalarFieldEnum | RecipeScalarFieldEnum[]
  }

  /**
   * Recipe create
   */
  export type RecipeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * The data needed to create a Recipe.
     */
    data: XOR<RecipeCreateInput, RecipeUncheckedCreateInput>
  }

  /**
   * Recipe createMany
   */
  export type RecipeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Recipes.
     */
    data: RecipeCreateManyInput | RecipeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Recipe createManyAndReturn
   */
  export type RecipeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * The data used to create many Recipes.
     */
    data: RecipeCreateManyInput | RecipeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Recipe update
   */
  export type RecipeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * The data needed to update a Recipe.
     */
    data: XOR<RecipeUpdateInput, RecipeUncheckedUpdateInput>
    /**
     * Choose, which Recipe to update.
     */
    where: RecipeWhereUniqueInput
  }

  /**
   * Recipe updateMany
   */
  export type RecipeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Recipes.
     */
    data: XOR<RecipeUpdateManyMutationInput, RecipeUncheckedUpdateManyInput>
    /**
     * Filter which Recipes to update
     */
    where?: RecipeWhereInput
    /**
     * Limit how many Recipes to update.
     */
    limit?: number
  }

  /**
   * Recipe updateManyAndReturn
   */
  export type RecipeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * The data used to update Recipes.
     */
    data: XOR<RecipeUpdateManyMutationInput, RecipeUncheckedUpdateManyInput>
    /**
     * Filter which Recipes to update
     */
    where?: RecipeWhereInput
    /**
     * Limit how many Recipes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Recipe upsert
   */
  export type RecipeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * The filter to search for the Recipe to update in case it exists.
     */
    where: RecipeWhereUniqueInput
    /**
     * In case the Recipe found by the `where` argument doesn't exist, create a new Recipe with this data.
     */
    create: XOR<RecipeCreateInput, RecipeUncheckedCreateInput>
    /**
     * In case the Recipe was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecipeUpdateInput, RecipeUncheckedUpdateInput>
  }

  /**
   * Recipe delete
   */
  export type RecipeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
    /**
     * Filter which Recipe to delete.
     */
    where: RecipeWhereUniqueInput
  }

  /**
   * Recipe deleteMany
   */
  export type RecipeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recipes to delete
     */
    where?: RecipeWhereInput
    /**
     * Limit how many Recipes to delete.
     */
    limit?: number
  }

  /**
   * Recipe.favorites
   */
  export type Recipe$favoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeFavorite
     */
    select?: RecipeFavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeFavorite
     */
    omit?: RecipeFavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeFavoriteInclude<ExtArgs> | null
    where?: RecipeFavoriteWhereInput
    orderBy?: RecipeFavoriteOrderByWithRelationInput | RecipeFavoriteOrderByWithRelationInput[]
    cursor?: RecipeFavoriteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecipeFavoriteScalarFieldEnum | RecipeFavoriteScalarFieldEnum[]
  }

  /**
   * Recipe.images
   */
  export type Recipe$imagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeImage
     */
    select?: RecipeImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeImage
     */
    omit?: RecipeImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeImageInclude<ExtArgs> | null
    where?: RecipeImageWhereInput
    orderBy?: RecipeImageOrderByWithRelationInput | RecipeImageOrderByWithRelationInput[]
    cursor?: RecipeImageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecipeImageScalarFieldEnum | RecipeImageScalarFieldEnum[]
  }

  /**
   * Recipe without action
   */
  export type RecipeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recipe
     */
    select?: RecipeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recipe
     */
    omit?: RecipeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeInclude<ExtArgs> | null
  }


  /**
   * Model RecipeImage
   */

  export type AggregateRecipeImage = {
    _count: RecipeImageCountAggregateOutputType | null
    _avg: RecipeImageAvgAggregateOutputType | null
    _sum: RecipeImageSumAggregateOutputType | null
    _min: RecipeImageMinAggregateOutputType | null
    _max: RecipeImageMaxAggregateOutputType | null
  }

  export type RecipeImageAvgAggregateOutputType = {
    order: number | null
  }

  export type RecipeImageSumAggregateOutputType = {
    order: number | null
  }

  export type RecipeImageMinAggregateOutputType = {
    id: string | null
    url: string | null
    alt: string | null
    isPrimary: boolean | null
    order: number | null
    createdAt: Date | null
    updatedAt: Date | null
    recipeId: string | null
  }

  export type RecipeImageMaxAggregateOutputType = {
    id: string | null
    url: string | null
    alt: string | null
    isPrimary: boolean | null
    order: number | null
    createdAt: Date | null
    updatedAt: Date | null
    recipeId: string | null
  }

  export type RecipeImageCountAggregateOutputType = {
    id: number
    url: number
    alt: number
    isPrimary: number
    order: number
    createdAt: number
    updatedAt: number
    recipeId: number
    _all: number
  }


  export type RecipeImageAvgAggregateInputType = {
    order?: true
  }

  export type RecipeImageSumAggregateInputType = {
    order?: true
  }

  export type RecipeImageMinAggregateInputType = {
    id?: true
    url?: true
    alt?: true
    isPrimary?: true
    order?: true
    createdAt?: true
    updatedAt?: true
    recipeId?: true
  }

  export type RecipeImageMaxAggregateInputType = {
    id?: true
    url?: true
    alt?: true
    isPrimary?: true
    order?: true
    createdAt?: true
    updatedAt?: true
    recipeId?: true
  }

  export type RecipeImageCountAggregateInputType = {
    id?: true
    url?: true
    alt?: true
    isPrimary?: true
    order?: true
    createdAt?: true
    updatedAt?: true
    recipeId?: true
    _all?: true
  }

  export type RecipeImageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecipeImage to aggregate.
     */
    where?: RecipeImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecipeImages to fetch.
     */
    orderBy?: RecipeImageOrderByWithRelationInput | RecipeImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecipeImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecipeImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecipeImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RecipeImages
    **/
    _count?: true | RecipeImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RecipeImageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RecipeImageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecipeImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecipeImageMaxAggregateInputType
  }

  export type GetRecipeImageAggregateType<T extends RecipeImageAggregateArgs> = {
        [P in keyof T & keyof AggregateRecipeImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecipeImage[P]>
      : GetScalarType<T[P], AggregateRecipeImage[P]>
  }




  export type RecipeImageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecipeImageWhereInput
    orderBy?: RecipeImageOrderByWithAggregationInput | RecipeImageOrderByWithAggregationInput[]
    by: RecipeImageScalarFieldEnum[] | RecipeImageScalarFieldEnum
    having?: RecipeImageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecipeImageCountAggregateInputType | true
    _avg?: RecipeImageAvgAggregateInputType
    _sum?: RecipeImageSumAggregateInputType
    _min?: RecipeImageMinAggregateInputType
    _max?: RecipeImageMaxAggregateInputType
  }

  export type RecipeImageGroupByOutputType = {
    id: string
    url: string
    alt: string | null
    isPrimary: boolean
    order: number
    createdAt: Date
    updatedAt: Date
    recipeId: string
    _count: RecipeImageCountAggregateOutputType | null
    _avg: RecipeImageAvgAggregateOutputType | null
    _sum: RecipeImageSumAggregateOutputType | null
    _min: RecipeImageMinAggregateOutputType | null
    _max: RecipeImageMaxAggregateOutputType | null
  }

  type GetRecipeImageGroupByPayload<T extends RecipeImageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecipeImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecipeImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecipeImageGroupByOutputType[P]>
            : GetScalarType<T[P], RecipeImageGroupByOutputType[P]>
        }
      >
    >


  export type RecipeImageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    alt?: boolean
    isPrimary?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    recipeId?: boolean
    recipe?: boolean | RecipeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recipeImage"]>

  export type RecipeImageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    alt?: boolean
    isPrimary?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    recipeId?: boolean
    recipe?: boolean | RecipeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recipeImage"]>

  export type RecipeImageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    alt?: boolean
    isPrimary?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    recipeId?: boolean
    recipe?: boolean | RecipeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recipeImage"]>

  export type RecipeImageSelectScalar = {
    id?: boolean
    url?: boolean
    alt?: boolean
    isPrimary?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    recipeId?: boolean
  }

  export type RecipeImageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "url" | "alt" | "isPrimary" | "order" | "createdAt" | "updatedAt" | "recipeId", ExtArgs["result"]["recipeImage"]>
  export type RecipeImageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recipe?: boolean | RecipeDefaultArgs<ExtArgs>
  }
  export type RecipeImageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recipe?: boolean | RecipeDefaultArgs<ExtArgs>
  }
  export type RecipeImageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recipe?: boolean | RecipeDefaultArgs<ExtArgs>
  }

  export type $RecipeImagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RecipeImage"
    objects: {
      recipe: Prisma.$RecipePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      url: string
      alt: string | null
      isPrimary: boolean
      order: number
      createdAt: Date
      updatedAt: Date
      recipeId: string
    }, ExtArgs["result"]["recipeImage"]>
    composites: {}
  }

  type RecipeImageGetPayload<S extends boolean | null | undefined | RecipeImageDefaultArgs> = $Result.GetResult<Prisma.$RecipeImagePayload, S>

  type RecipeImageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RecipeImageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RecipeImageCountAggregateInputType | true
    }

  export interface RecipeImageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RecipeImage'], meta: { name: 'RecipeImage' } }
    /**
     * Find zero or one RecipeImage that matches the filter.
     * @param {RecipeImageFindUniqueArgs} args - Arguments to find a RecipeImage
     * @example
     * // Get one RecipeImage
     * const recipeImage = await prisma.recipeImage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecipeImageFindUniqueArgs>(args: SelectSubset<T, RecipeImageFindUniqueArgs<ExtArgs>>): Prisma__RecipeImageClient<$Result.GetResult<Prisma.$RecipeImagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RecipeImage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RecipeImageFindUniqueOrThrowArgs} args - Arguments to find a RecipeImage
     * @example
     * // Get one RecipeImage
     * const recipeImage = await prisma.recipeImage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecipeImageFindUniqueOrThrowArgs>(args: SelectSubset<T, RecipeImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecipeImageClient<$Result.GetResult<Prisma.$RecipeImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RecipeImage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeImageFindFirstArgs} args - Arguments to find a RecipeImage
     * @example
     * // Get one RecipeImage
     * const recipeImage = await prisma.recipeImage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecipeImageFindFirstArgs>(args?: SelectSubset<T, RecipeImageFindFirstArgs<ExtArgs>>): Prisma__RecipeImageClient<$Result.GetResult<Prisma.$RecipeImagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RecipeImage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeImageFindFirstOrThrowArgs} args - Arguments to find a RecipeImage
     * @example
     * // Get one RecipeImage
     * const recipeImage = await prisma.recipeImage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecipeImageFindFirstOrThrowArgs>(args?: SelectSubset<T, RecipeImageFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecipeImageClient<$Result.GetResult<Prisma.$RecipeImagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RecipeImages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeImageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RecipeImages
     * const recipeImages = await prisma.recipeImage.findMany()
     * 
     * // Get first 10 RecipeImages
     * const recipeImages = await prisma.recipeImage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recipeImageWithIdOnly = await prisma.recipeImage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RecipeImageFindManyArgs>(args?: SelectSubset<T, RecipeImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipeImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RecipeImage.
     * @param {RecipeImageCreateArgs} args - Arguments to create a RecipeImage.
     * @example
     * // Create one RecipeImage
     * const RecipeImage = await prisma.recipeImage.create({
     *   data: {
     *     // ... data to create a RecipeImage
     *   }
     * })
     * 
     */
    create<T extends RecipeImageCreateArgs>(args: SelectSubset<T, RecipeImageCreateArgs<ExtArgs>>): Prisma__RecipeImageClient<$Result.GetResult<Prisma.$RecipeImagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RecipeImages.
     * @param {RecipeImageCreateManyArgs} args - Arguments to create many RecipeImages.
     * @example
     * // Create many RecipeImages
     * const recipeImage = await prisma.recipeImage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecipeImageCreateManyArgs>(args?: SelectSubset<T, RecipeImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RecipeImages and returns the data saved in the database.
     * @param {RecipeImageCreateManyAndReturnArgs} args - Arguments to create many RecipeImages.
     * @example
     * // Create many RecipeImages
     * const recipeImage = await prisma.recipeImage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RecipeImages and only return the `id`
     * const recipeImageWithIdOnly = await prisma.recipeImage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RecipeImageCreateManyAndReturnArgs>(args?: SelectSubset<T, RecipeImageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipeImagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RecipeImage.
     * @param {RecipeImageDeleteArgs} args - Arguments to delete one RecipeImage.
     * @example
     * // Delete one RecipeImage
     * const RecipeImage = await prisma.recipeImage.delete({
     *   where: {
     *     // ... filter to delete one RecipeImage
     *   }
     * })
     * 
     */
    delete<T extends RecipeImageDeleteArgs>(args: SelectSubset<T, RecipeImageDeleteArgs<ExtArgs>>): Prisma__RecipeImageClient<$Result.GetResult<Prisma.$RecipeImagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RecipeImage.
     * @param {RecipeImageUpdateArgs} args - Arguments to update one RecipeImage.
     * @example
     * // Update one RecipeImage
     * const recipeImage = await prisma.recipeImage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecipeImageUpdateArgs>(args: SelectSubset<T, RecipeImageUpdateArgs<ExtArgs>>): Prisma__RecipeImageClient<$Result.GetResult<Prisma.$RecipeImagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RecipeImages.
     * @param {RecipeImageDeleteManyArgs} args - Arguments to filter RecipeImages to delete.
     * @example
     * // Delete a few RecipeImages
     * const { count } = await prisma.recipeImage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecipeImageDeleteManyArgs>(args?: SelectSubset<T, RecipeImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RecipeImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RecipeImages
     * const recipeImage = await prisma.recipeImage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecipeImageUpdateManyArgs>(args: SelectSubset<T, RecipeImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RecipeImages and returns the data updated in the database.
     * @param {RecipeImageUpdateManyAndReturnArgs} args - Arguments to update many RecipeImages.
     * @example
     * // Update many RecipeImages
     * const recipeImage = await prisma.recipeImage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RecipeImages and only return the `id`
     * const recipeImageWithIdOnly = await prisma.recipeImage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RecipeImageUpdateManyAndReturnArgs>(args: SelectSubset<T, RecipeImageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipeImagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RecipeImage.
     * @param {RecipeImageUpsertArgs} args - Arguments to update or create a RecipeImage.
     * @example
     * // Update or create a RecipeImage
     * const recipeImage = await prisma.recipeImage.upsert({
     *   create: {
     *     // ... data to create a RecipeImage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RecipeImage we want to update
     *   }
     * })
     */
    upsert<T extends RecipeImageUpsertArgs>(args: SelectSubset<T, RecipeImageUpsertArgs<ExtArgs>>): Prisma__RecipeImageClient<$Result.GetResult<Prisma.$RecipeImagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RecipeImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeImageCountArgs} args - Arguments to filter RecipeImages to count.
     * @example
     * // Count the number of RecipeImages
     * const count = await prisma.recipeImage.count({
     *   where: {
     *     // ... the filter for the RecipeImages we want to count
     *   }
     * })
    **/
    count<T extends RecipeImageCountArgs>(
      args?: Subset<T, RecipeImageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecipeImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RecipeImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RecipeImageAggregateArgs>(args: Subset<T, RecipeImageAggregateArgs>): Prisma.PrismaPromise<GetRecipeImageAggregateType<T>>

    /**
     * Group by RecipeImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeImageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RecipeImageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecipeImageGroupByArgs['orderBy'] }
        : { orderBy?: RecipeImageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RecipeImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecipeImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RecipeImage model
   */
  readonly fields: RecipeImageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RecipeImage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecipeImageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    recipe<T extends RecipeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RecipeDefaultArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RecipeImage model
   */
  interface RecipeImageFieldRefs {
    readonly id: FieldRef<"RecipeImage", 'String'>
    readonly url: FieldRef<"RecipeImage", 'String'>
    readonly alt: FieldRef<"RecipeImage", 'String'>
    readonly isPrimary: FieldRef<"RecipeImage", 'Boolean'>
    readonly order: FieldRef<"RecipeImage", 'Int'>
    readonly createdAt: FieldRef<"RecipeImage", 'DateTime'>
    readonly updatedAt: FieldRef<"RecipeImage", 'DateTime'>
    readonly recipeId: FieldRef<"RecipeImage", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RecipeImage findUnique
   */
  export type RecipeImageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeImage
     */
    select?: RecipeImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeImage
     */
    omit?: RecipeImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeImageInclude<ExtArgs> | null
    /**
     * Filter, which RecipeImage to fetch.
     */
    where: RecipeImageWhereUniqueInput
  }

  /**
   * RecipeImage findUniqueOrThrow
   */
  export type RecipeImageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeImage
     */
    select?: RecipeImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeImage
     */
    omit?: RecipeImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeImageInclude<ExtArgs> | null
    /**
     * Filter, which RecipeImage to fetch.
     */
    where: RecipeImageWhereUniqueInput
  }

  /**
   * RecipeImage findFirst
   */
  export type RecipeImageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeImage
     */
    select?: RecipeImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeImage
     */
    omit?: RecipeImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeImageInclude<ExtArgs> | null
    /**
     * Filter, which RecipeImage to fetch.
     */
    where?: RecipeImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecipeImages to fetch.
     */
    orderBy?: RecipeImageOrderByWithRelationInput | RecipeImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecipeImages.
     */
    cursor?: RecipeImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecipeImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecipeImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecipeImages.
     */
    distinct?: RecipeImageScalarFieldEnum | RecipeImageScalarFieldEnum[]
  }

  /**
   * RecipeImage findFirstOrThrow
   */
  export type RecipeImageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeImage
     */
    select?: RecipeImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeImage
     */
    omit?: RecipeImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeImageInclude<ExtArgs> | null
    /**
     * Filter, which RecipeImage to fetch.
     */
    where?: RecipeImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecipeImages to fetch.
     */
    orderBy?: RecipeImageOrderByWithRelationInput | RecipeImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecipeImages.
     */
    cursor?: RecipeImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecipeImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecipeImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecipeImages.
     */
    distinct?: RecipeImageScalarFieldEnum | RecipeImageScalarFieldEnum[]
  }

  /**
   * RecipeImage findMany
   */
  export type RecipeImageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeImage
     */
    select?: RecipeImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeImage
     */
    omit?: RecipeImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeImageInclude<ExtArgs> | null
    /**
     * Filter, which RecipeImages to fetch.
     */
    where?: RecipeImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecipeImages to fetch.
     */
    orderBy?: RecipeImageOrderByWithRelationInput | RecipeImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RecipeImages.
     */
    cursor?: RecipeImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecipeImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecipeImages.
     */
    skip?: number
    distinct?: RecipeImageScalarFieldEnum | RecipeImageScalarFieldEnum[]
  }

  /**
   * RecipeImage create
   */
  export type RecipeImageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeImage
     */
    select?: RecipeImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeImage
     */
    omit?: RecipeImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeImageInclude<ExtArgs> | null
    /**
     * The data needed to create a RecipeImage.
     */
    data: XOR<RecipeImageCreateInput, RecipeImageUncheckedCreateInput>
  }

  /**
   * RecipeImage createMany
   */
  export type RecipeImageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RecipeImages.
     */
    data: RecipeImageCreateManyInput | RecipeImageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RecipeImage createManyAndReturn
   */
  export type RecipeImageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeImage
     */
    select?: RecipeImageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeImage
     */
    omit?: RecipeImageOmit<ExtArgs> | null
    /**
     * The data used to create many RecipeImages.
     */
    data: RecipeImageCreateManyInput | RecipeImageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeImageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RecipeImage update
   */
  export type RecipeImageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeImage
     */
    select?: RecipeImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeImage
     */
    omit?: RecipeImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeImageInclude<ExtArgs> | null
    /**
     * The data needed to update a RecipeImage.
     */
    data: XOR<RecipeImageUpdateInput, RecipeImageUncheckedUpdateInput>
    /**
     * Choose, which RecipeImage to update.
     */
    where: RecipeImageWhereUniqueInput
  }

  /**
   * RecipeImage updateMany
   */
  export type RecipeImageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RecipeImages.
     */
    data: XOR<RecipeImageUpdateManyMutationInput, RecipeImageUncheckedUpdateManyInput>
    /**
     * Filter which RecipeImages to update
     */
    where?: RecipeImageWhereInput
    /**
     * Limit how many RecipeImages to update.
     */
    limit?: number
  }

  /**
   * RecipeImage updateManyAndReturn
   */
  export type RecipeImageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeImage
     */
    select?: RecipeImageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeImage
     */
    omit?: RecipeImageOmit<ExtArgs> | null
    /**
     * The data used to update RecipeImages.
     */
    data: XOR<RecipeImageUpdateManyMutationInput, RecipeImageUncheckedUpdateManyInput>
    /**
     * Filter which RecipeImages to update
     */
    where?: RecipeImageWhereInput
    /**
     * Limit how many RecipeImages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeImageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RecipeImage upsert
   */
  export type RecipeImageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeImage
     */
    select?: RecipeImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeImage
     */
    omit?: RecipeImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeImageInclude<ExtArgs> | null
    /**
     * The filter to search for the RecipeImage to update in case it exists.
     */
    where: RecipeImageWhereUniqueInput
    /**
     * In case the RecipeImage found by the `where` argument doesn't exist, create a new RecipeImage with this data.
     */
    create: XOR<RecipeImageCreateInput, RecipeImageUncheckedCreateInput>
    /**
     * In case the RecipeImage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecipeImageUpdateInput, RecipeImageUncheckedUpdateInput>
  }

  /**
   * RecipeImage delete
   */
  export type RecipeImageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeImage
     */
    select?: RecipeImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeImage
     */
    omit?: RecipeImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeImageInclude<ExtArgs> | null
    /**
     * Filter which RecipeImage to delete.
     */
    where: RecipeImageWhereUniqueInput
  }

  /**
   * RecipeImage deleteMany
   */
  export type RecipeImageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecipeImages to delete
     */
    where?: RecipeImageWhereInput
    /**
     * Limit how many RecipeImages to delete.
     */
    limit?: number
  }

  /**
   * RecipeImage without action
   */
  export type RecipeImageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeImage
     */
    select?: RecipeImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeImage
     */
    omit?: RecipeImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeImageInclude<ExtArgs> | null
  }


  /**
   * Model RecipeFavorite
   */

  export type AggregateRecipeFavorite = {
    _count: RecipeFavoriteCountAggregateOutputType | null
    _min: RecipeFavoriteMinAggregateOutputType | null
    _max: RecipeFavoriteMaxAggregateOutputType | null
  }

  export type RecipeFavoriteMinAggregateOutputType = {
    id: string | null
    userId: string | null
    recipeId: string | null
    createdAt: Date | null
  }

  export type RecipeFavoriteMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    recipeId: string | null
    createdAt: Date | null
  }

  export type RecipeFavoriteCountAggregateOutputType = {
    id: number
    userId: number
    recipeId: number
    createdAt: number
    _all: number
  }


  export type RecipeFavoriteMinAggregateInputType = {
    id?: true
    userId?: true
    recipeId?: true
    createdAt?: true
  }

  export type RecipeFavoriteMaxAggregateInputType = {
    id?: true
    userId?: true
    recipeId?: true
    createdAt?: true
  }

  export type RecipeFavoriteCountAggregateInputType = {
    id?: true
    userId?: true
    recipeId?: true
    createdAt?: true
    _all?: true
  }

  export type RecipeFavoriteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecipeFavorite to aggregate.
     */
    where?: RecipeFavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecipeFavorites to fetch.
     */
    orderBy?: RecipeFavoriteOrderByWithRelationInput | RecipeFavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecipeFavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecipeFavorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecipeFavorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RecipeFavorites
    **/
    _count?: true | RecipeFavoriteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecipeFavoriteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecipeFavoriteMaxAggregateInputType
  }

  export type GetRecipeFavoriteAggregateType<T extends RecipeFavoriteAggregateArgs> = {
        [P in keyof T & keyof AggregateRecipeFavorite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecipeFavorite[P]>
      : GetScalarType<T[P], AggregateRecipeFavorite[P]>
  }




  export type RecipeFavoriteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecipeFavoriteWhereInput
    orderBy?: RecipeFavoriteOrderByWithAggregationInput | RecipeFavoriteOrderByWithAggregationInput[]
    by: RecipeFavoriteScalarFieldEnum[] | RecipeFavoriteScalarFieldEnum
    having?: RecipeFavoriteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecipeFavoriteCountAggregateInputType | true
    _min?: RecipeFavoriteMinAggregateInputType
    _max?: RecipeFavoriteMaxAggregateInputType
  }

  export type RecipeFavoriteGroupByOutputType = {
    id: string
    userId: string
    recipeId: string
    createdAt: Date
    _count: RecipeFavoriteCountAggregateOutputType | null
    _min: RecipeFavoriteMinAggregateOutputType | null
    _max: RecipeFavoriteMaxAggregateOutputType | null
  }

  type GetRecipeFavoriteGroupByPayload<T extends RecipeFavoriteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecipeFavoriteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecipeFavoriteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecipeFavoriteGroupByOutputType[P]>
            : GetScalarType<T[P], RecipeFavoriteGroupByOutputType[P]>
        }
      >
    >


  export type RecipeFavoriteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    recipeId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    recipe?: boolean | RecipeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recipeFavorite"]>

  export type RecipeFavoriteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    recipeId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    recipe?: boolean | RecipeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recipeFavorite"]>

  export type RecipeFavoriteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    recipeId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    recipe?: boolean | RecipeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recipeFavorite"]>

  export type RecipeFavoriteSelectScalar = {
    id?: boolean
    userId?: boolean
    recipeId?: boolean
    createdAt?: boolean
  }

  export type RecipeFavoriteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "recipeId" | "createdAt", ExtArgs["result"]["recipeFavorite"]>
  export type RecipeFavoriteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    recipe?: boolean | RecipeDefaultArgs<ExtArgs>
  }
  export type RecipeFavoriteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    recipe?: boolean | RecipeDefaultArgs<ExtArgs>
  }
  export type RecipeFavoriteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    recipe?: boolean | RecipeDefaultArgs<ExtArgs>
  }

  export type $RecipeFavoritePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RecipeFavorite"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      recipe: Prisma.$RecipePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      recipeId: string
      createdAt: Date
    }, ExtArgs["result"]["recipeFavorite"]>
    composites: {}
  }

  type RecipeFavoriteGetPayload<S extends boolean | null | undefined | RecipeFavoriteDefaultArgs> = $Result.GetResult<Prisma.$RecipeFavoritePayload, S>

  type RecipeFavoriteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RecipeFavoriteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RecipeFavoriteCountAggregateInputType | true
    }

  export interface RecipeFavoriteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RecipeFavorite'], meta: { name: 'RecipeFavorite' } }
    /**
     * Find zero or one RecipeFavorite that matches the filter.
     * @param {RecipeFavoriteFindUniqueArgs} args - Arguments to find a RecipeFavorite
     * @example
     * // Get one RecipeFavorite
     * const recipeFavorite = await prisma.recipeFavorite.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecipeFavoriteFindUniqueArgs>(args: SelectSubset<T, RecipeFavoriteFindUniqueArgs<ExtArgs>>): Prisma__RecipeFavoriteClient<$Result.GetResult<Prisma.$RecipeFavoritePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RecipeFavorite that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RecipeFavoriteFindUniqueOrThrowArgs} args - Arguments to find a RecipeFavorite
     * @example
     * // Get one RecipeFavorite
     * const recipeFavorite = await prisma.recipeFavorite.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecipeFavoriteFindUniqueOrThrowArgs>(args: SelectSubset<T, RecipeFavoriteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecipeFavoriteClient<$Result.GetResult<Prisma.$RecipeFavoritePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RecipeFavorite that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeFavoriteFindFirstArgs} args - Arguments to find a RecipeFavorite
     * @example
     * // Get one RecipeFavorite
     * const recipeFavorite = await prisma.recipeFavorite.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecipeFavoriteFindFirstArgs>(args?: SelectSubset<T, RecipeFavoriteFindFirstArgs<ExtArgs>>): Prisma__RecipeFavoriteClient<$Result.GetResult<Prisma.$RecipeFavoritePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RecipeFavorite that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeFavoriteFindFirstOrThrowArgs} args - Arguments to find a RecipeFavorite
     * @example
     * // Get one RecipeFavorite
     * const recipeFavorite = await prisma.recipeFavorite.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecipeFavoriteFindFirstOrThrowArgs>(args?: SelectSubset<T, RecipeFavoriteFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecipeFavoriteClient<$Result.GetResult<Prisma.$RecipeFavoritePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RecipeFavorites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeFavoriteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RecipeFavorites
     * const recipeFavorites = await prisma.recipeFavorite.findMany()
     * 
     * // Get first 10 RecipeFavorites
     * const recipeFavorites = await prisma.recipeFavorite.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recipeFavoriteWithIdOnly = await prisma.recipeFavorite.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RecipeFavoriteFindManyArgs>(args?: SelectSubset<T, RecipeFavoriteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipeFavoritePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RecipeFavorite.
     * @param {RecipeFavoriteCreateArgs} args - Arguments to create a RecipeFavorite.
     * @example
     * // Create one RecipeFavorite
     * const RecipeFavorite = await prisma.recipeFavorite.create({
     *   data: {
     *     // ... data to create a RecipeFavorite
     *   }
     * })
     * 
     */
    create<T extends RecipeFavoriteCreateArgs>(args: SelectSubset<T, RecipeFavoriteCreateArgs<ExtArgs>>): Prisma__RecipeFavoriteClient<$Result.GetResult<Prisma.$RecipeFavoritePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RecipeFavorites.
     * @param {RecipeFavoriteCreateManyArgs} args - Arguments to create many RecipeFavorites.
     * @example
     * // Create many RecipeFavorites
     * const recipeFavorite = await prisma.recipeFavorite.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecipeFavoriteCreateManyArgs>(args?: SelectSubset<T, RecipeFavoriteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RecipeFavorites and returns the data saved in the database.
     * @param {RecipeFavoriteCreateManyAndReturnArgs} args - Arguments to create many RecipeFavorites.
     * @example
     * // Create many RecipeFavorites
     * const recipeFavorite = await prisma.recipeFavorite.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RecipeFavorites and only return the `id`
     * const recipeFavoriteWithIdOnly = await prisma.recipeFavorite.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RecipeFavoriteCreateManyAndReturnArgs>(args?: SelectSubset<T, RecipeFavoriteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipeFavoritePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RecipeFavorite.
     * @param {RecipeFavoriteDeleteArgs} args - Arguments to delete one RecipeFavorite.
     * @example
     * // Delete one RecipeFavorite
     * const RecipeFavorite = await prisma.recipeFavorite.delete({
     *   where: {
     *     // ... filter to delete one RecipeFavorite
     *   }
     * })
     * 
     */
    delete<T extends RecipeFavoriteDeleteArgs>(args: SelectSubset<T, RecipeFavoriteDeleteArgs<ExtArgs>>): Prisma__RecipeFavoriteClient<$Result.GetResult<Prisma.$RecipeFavoritePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RecipeFavorite.
     * @param {RecipeFavoriteUpdateArgs} args - Arguments to update one RecipeFavorite.
     * @example
     * // Update one RecipeFavorite
     * const recipeFavorite = await prisma.recipeFavorite.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecipeFavoriteUpdateArgs>(args: SelectSubset<T, RecipeFavoriteUpdateArgs<ExtArgs>>): Prisma__RecipeFavoriteClient<$Result.GetResult<Prisma.$RecipeFavoritePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RecipeFavorites.
     * @param {RecipeFavoriteDeleteManyArgs} args - Arguments to filter RecipeFavorites to delete.
     * @example
     * // Delete a few RecipeFavorites
     * const { count } = await prisma.recipeFavorite.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecipeFavoriteDeleteManyArgs>(args?: SelectSubset<T, RecipeFavoriteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RecipeFavorites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeFavoriteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RecipeFavorites
     * const recipeFavorite = await prisma.recipeFavorite.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecipeFavoriteUpdateManyArgs>(args: SelectSubset<T, RecipeFavoriteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RecipeFavorites and returns the data updated in the database.
     * @param {RecipeFavoriteUpdateManyAndReturnArgs} args - Arguments to update many RecipeFavorites.
     * @example
     * // Update many RecipeFavorites
     * const recipeFavorite = await prisma.recipeFavorite.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RecipeFavorites and only return the `id`
     * const recipeFavoriteWithIdOnly = await prisma.recipeFavorite.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RecipeFavoriteUpdateManyAndReturnArgs>(args: SelectSubset<T, RecipeFavoriteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipeFavoritePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RecipeFavorite.
     * @param {RecipeFavoriteUpsertArgs} args - Arguments to update or create a RecipeFavorite.
     * @example
     * // Update or create a RecipeFavorite
     * const recipeFavorite = await prisma.recipeFavorite.upsert({
     *   create: {
     *     // ... data to create a RecipeFavorite
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RecipeFavorite we want to update
     *   }
     * })
     */
    upsert<T extends RecipeFavoriteUpsertArgs>(args: SelectSubset<T, RecipeFavoriteUpsertArgs<ExtArgs>>): Prisma__RecipeFavoriteClient<$Result.GetResult<Prisma.$RecipeFavoritePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RecipeFavorites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeFavoriteCountArgs} args - Arguments to filter RecipeFavorites to count.
     * @example
     * // Count the number of RecipeFavorites
     * const count = await prisma.recipeFavorite.count({
     *   where: {
     *     // ... the filter for the RecipeFavorites we want to count
     *   }
     * })
    **/
    count<T extends RecipeFavoriteCountArgs>(
      args?: Subset<T, RecipeFavoriteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecipeFavoriteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RecipeFavorite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeFavoriteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RecipeFavoriteAggregateArgs>(args: Subset<T, RecipeFavoriteAggregateArgs>): Prisma.PrismaPromise<GetRecipeFavoriteAggregateType<T>>

    /**
     * Group by RecipeFavorite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeFavoriteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RecipeFavoriteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecipeFavoriteGroupByArgs['orderBy'] }
        : { orderBy?: RecipeFavoriteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RecipeFavoriteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecipeFavoriteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RecipeFavorite model
   */
  readonly fields: RecipeFavoriteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RecipeFavorite.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecipeFavoriteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    recipe<T extends RecipeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RecipeDefaultArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RecipeFavorite model
   */
  interface RecipeFavoriteFieldRefs {
    readonly id: FieldRef<"RecipeFavorite", 'String'>
    readonly userId: FieldRef<"RecipeFavorite", 'String'>
    readonly recipeId: FieldRef<"RecipeFavorite", 'String'>
    readonly createdAt: FieldRef<"RecipeFavorite", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RecipeFavorite findUnique
   */
  export type RecipeFavoriteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeFavorite
     */
    select?: RecipeFavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeFavorite
     */
    omit?: RecipeFavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeFavoriteInclude<ExtArgs> | null
    /**
     * Filter, which RecipeFavorite to fetch.
     */
    where: RecipeFavoriteWhereUniqueInput
  }

  /**
   * RecipeFavorite findUniqueOrThrow
   */
  export type RecipeFavoriteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeFavorite
     */
    select?: RecipeFavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeFavorite
     */
    omit?: RecipeFavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeFavoriteInclude<ExtArgs> | null
    /**
     * Filter, which RecipeFavorite to fetch.
     */
    where: RecipeFavoriteWhereUniqueInput
  }

  /**
   * RecipeFavorite findFirst
   */
  export type RecipeFavoriteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeFavorite
     */
    select?: RecipeFavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeFavorite
     */
    omit?: RecipeFavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeFavoriteInclude<ExtArgs> | null
    /**
     * Filter, which RecipeFavorite to fetch.
     */
    where?: RecipeFavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecipeFavorites to fetch.
     */
    orderBy?: RecipeFavoriteOrderByWithRelationInput | RecipeFavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecipeFavorites.
     */
    cursor?: RecipeFavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecipeFavorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecipeFavorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecipeFavorites.
     */
    distinct?: RecipeFavoriteScalarFieldEnum | RecipeFavoriteScalarFieldEnum[]
  }

  /**
   * RecipeFavorite findFirstOrThrow
   */
  export type RecipeFavoriteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeFavorite
     */
    select?: RecipeFavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeFavorite
     */
    omit?: RecipeFavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeFavoriteInclude<ExtArgs> | null
    /**
     * Filter, which RecipeFavorite to fetch.
     */
    where?: RecipeFavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecipeFavorites to fetch.
     */
    orderBy?: RecipeFavoriteOrderByWithRelationInput | RecipeFavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecipeFavorites.
     */
    cursor?: RecipeFavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecipeFavorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecipeFavorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecipeFavorites.
     */
    distinct?: RecipeFavoriteScalarFieldEnum | RecipeFavoriteScalarFieldEnum[]
  }

  /**
   * RecipeFavorite findMany
   */
  export type RecipeFavoriteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeFavorite
     */
    select?: RecipeFavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeFavorite
     */
    omit?: RecipeFavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeFavoriteInclude<ExtArgs> | null
    /**
     * Filter, which RecipeFavorites to fetch.
     */
    where?: RecipeFavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecipeFavorites to fetch.
     */
    orderBy?: RecipeFavoriteOrderByWithRelationInput | RecipeFavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RecipeFavorites.
     */
    cursor?: RecipeFavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecipeFavorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecipeFavorites.
     */
    skip?: number
    distinct?: RecipeFavoriteScalarFieldEnum | RecipeFavoriteScalarFieldEnum[]
  }

  /**
   * RecipeFavorite create
   */
  export type RecipeFavoriteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeFavorite
     */
    select?: RecipeFavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeFavorite
     */
    omit?: RecipeFavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeFavoriteInclude<ExtArgs> | null
    /**
     * The data needed to create a RecipeFavorite.
     */
    data: XOR<RecipeFavoriteCreateInput, RecipeFavoriteUncheckedCreateInput>
  }

  /**
   * RecipeFavorite createMany
   */
  export type RecipeFavoriteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RecipeFavorites.
     */
    data: RecipeFavoriteCreateManyInput | RecipeFavoriteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RecipeFavorite createManyAndReturn
   */
  export type RecipeFavoriteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeFavorite
     */
    select?: RecipeFavoriteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeFavorite
     */
    omit?: RecipeFavoriteOmit<ExtArgs> | null
    /**
     * The data used to create many RecipeFavorites.
     */
    data: RecipeFavoriteCreateManyInput | RecipeFavoriteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeFavoriteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RecipeFavorite update
   */
  export type RecipeFavoriteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeFavorite
     */
    select?: RecipeFavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeFavorite
     */
    omit?: RecipeFavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeFavoriteInclude<ExtArgs> | null
    /**
     * The data needed to update a RecipeFavorite.
     */
    data: XOR<RecipeFavoriteUpdateInput, RecipeFavoriteUncheckedUpdateInput>
    /**
     * Choose, which RecipeFavorite to update.
     */
    where: RecipeFavoriteWhereUniqueInput
  }

  /**
   * RecipeFavorite updateMany
   */
  export type RecipeFavoriteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RecipeFavorites.
     */
    data: XOR<RecipeFavoriteUpdateManyMutationInput, RecipeFavoriteUncheckedUpdateManyInput>
    /**
     * Filter which RecipeFavorites to update
     */
    where?: RecipeFavoriteWhereInput
    /**
     * Limit how many RecipeFavorites to update.
     */
    limit?: number
  }

  /**
   * RecipeFavorite updateManyAndReturn
   */
  export type RecipeFavoriteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeFavorite
     */
    select?: RecipeFavoriteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeFavorite
     */
    omit?: RecipeFavoriteOmit<ExtArgs> | null
    /**
     * The data used to update RecipeFavorites.
     */
    data: XOR<RecipeFavoriteUpdateManyMutationInput, RecipeFavoriteUncheckedUpdateManyInput>
    /**
     * Filter which RecipeFavorites to update
     */
    where?: RecipeFavoriteWhereInput
    /**
     * Limit how many RecipeFavorites to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeFavoriteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RecipeFavorite upsert
   */
  export type RecipeFavoriteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeFavorite
     */
    select?: RecipeFavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeFavorite
     */
    omit?: RecipeFavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeFavoriteInclude<ExtArgs> | null
    /**
     * The filter to search for the RecipeFavorite to update in case it exists.
     */
    where: RecipeFavoriteWhereUniqueInput
    /**
     * In case the RecipeFavorite found by the `where` argument doesn't exist, create a new RecipeFavorite with this data.
     */
    create: XOR<RecipeFavoriteCreateInput, RecipeFavoriteUncheckedCreateInput>
    /**
     * In case the RecipeFavorite was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecipeFavoriteUpdateInput, RecipeFavoriteUncheckedUpdateInput>
  }

  /**
   * RecipeFavorite delete
   */
  export type RecipeFavoriteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeFavorite
     */
    select?: RecipeFavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeFavorite
     */
    omit?: RecipeFavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeFavoriteInclude<ExtArgs> | null
    /**
     * Filter which RecipeFavorite to delete.
     */
    where: RecipeFavoriteWhereUniqueInput
  }

  /**
   * RecipeFavorite deleteMany
   */
  export type RecipeFavoriteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecipeFavorites to delete
     */
    where?: RecipeFavoriteWhereInput
    /**
     * Limit how many RecipeFavorites to delete.
     */
    limit?: number
  }

  /**
   * RecipeFavorite without action
   */
  export type RecipeFavoriteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeFavorite
     */
    select?: RecipeFavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeFavorite
     */
    omit?: RecipeFavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeFavoriteInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    firstName: 'firstName',
    lastName: 'lastName',
    imageUrl: 'imageUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    onboardingCompleted: 'onboardingCompleted',
    onboardingStep: 'onboardingStep',
    cookingSkillLevel: 'cookingSkillLevel',
    dietaryPreferences: 'dietaryPreferences',
    favoriteCuisines: 'favoriteCuisines',
    householdSize: 'householdSize',
    defaultProcessingMethod: 'defaultProcessingMethod',
    preferredCategories: 'preferredCategories',
    timezone: 'timezone',
    measurementSystem: 'measurementSystem'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const RecipeScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    ingredients: 'ingredients',
    steps: 'steps',
    image: 'image',
    cuisine: 'cuisine',
    category: 'category',
    prepTime: 'prepTime',
    cleanupTime: 'cleanupTime',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    categorySource: 'categorySource',
    categoryConfidence: 'categoryConfidence',
    originalCategory: 'originalCategory',
    userId: 'userId'
  };

  export type RecipeScalarFieldEnum = (typeof RecipeScalarFieldEnum)[keyof typeof RecipeScalarFieldEnum]


  export const RecipeImageScalarFieldEnum: {
    id: 'id',
    url: 'url',
    alt: 'alt',
    isPrimary: 'isPrimary',
    order: 'order',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    recipeId: 'recipeId'
  };

  export type RecipeImageScalarFieldEnum = (typeof RecipeImageScalarFieldEnum)[keyof typeof RecipeImageScalarFieldEnum]


  export const RecipeFavoriteScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    recipeId: 'recipeId',
    createdAt: 'createdAt'
  };

  export type RecipeFavoriteScalarFieldEnum = (typeof RecipeFavoriteScalarFieldEnum)[keyof typeof RecipeFavoriteScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'CookingSkillLevel'
   */
  export type EnumCookingSkillLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CookingSkillLevel'>
    


  /**
   * Reference to a field of type 'CookingSkillLevel[]'
   */
  export type ListEnumCookingSkillLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CookingSkillLevel[]'>
    


  /**
   * Reference to a field of type 'DietaryPreference[]'
   */
  export type ListEnumDietaryPreferenceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DietaryPreference[]'>
    


  /**
   * Reference to a field of type 'DietaryPreference'
   */
  export type EnumDietaryPreferenceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DietaryPreference'>
    


  /**
   * Reference to a field of type 'ProcessingMethod'
   */
  export type EnumProcessingMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProcessingMethod'>
    


  /**
   * Reference to a field of type 'ProcessingMethod[]'
   */
  export type ListEnumProcessingMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProcessingMethod[]'>
    


  /**
   * Reference to a field of type 'CategorySource'
   */
  export type EnumCategorySourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CategorySource'>
    


  /**
   * Reference to a field of type 'CategorySource[]'
   */
  export type ListEnumCategorySourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CategorySource[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    imageUrl?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    onboardingCompleted?: BoolFilter<"User"> | boolean
    onboardingStep?: IntNullableFilter<"User"> | number | null
    cookingSkillLevel?: EnumCookingSkillLevelNullableFilter<"User"> | $Enums.CookingSkillLevel | null
    dietaryPreferences?: EnumDietaryPreferenceNullableListFilter<"User">
    favoriteCuisines?: StringNullableListFilter<"User">
    householdSize?: IntNullableFilter<"User"> | number | null
    defaultProcessingMethod?: EnumProcessingMethodFilter<"User"> | $Enums.ProcessingMethod
    preferredCategories?: StringNullableListFilter<"User">
    timezone?: StringNullableFilter<"User"> | string | null
    measurementSystem?: StringNullableFilter<"User"> | string | null
    recipes?: RecipeListRelationFilter
    favorites?: RecipeFavoriteListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    onboardingCompleted?: SortOrder
    onboardingStep?: SortOrderInput | SortOrder
    cookingSkillLevel?: SortOrderInput | SortOrder
    dietaryPreferences?: SortOrder
    favoriteCuisines?: SortOrder
    householdSize?: SortOrderInput | SortOrder
    defaultProcessingMethod?: SortOrder
    preferredCategories?: SortOrder
    timezone?: SortOrderInput | SortOrder
    measurementSystem?: SortOrderInput | SortOrder
    recipes?: RecipeOrderByRelationAggregateInput
    favorites?: RecipeFavoriteOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    imageUrl?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    onboardingCompleted?: BoolFilter<"User"> | boolean
    onboardingStep?: IntNullableFilter<"User"> | number | null
    cookingSkillLevel?: EnumCookingSkillLevelNullableFilter<"User"> | $Enums.CookingSkillLevel | null
    dietaryPreferences?: EnumDietaryPreferenceNullableListFilter<"User">
    favoriteCuisines?: StringNullableListFilter<"User">
    householdSize?: IntNullableFilter<"User"> | number | null
    defaultProcessingMethod?: EnumProcessingMethodFilter<"User"> | $Enums.ProcessingMethod
    preferredCategories?: StringNullableListFilter<"User">
    timezone?: StringNullableFilter<"User"> | string | null
    measurementSystem?: StringNullableFilter<"User"> | string | null
    recipes?: RecipeListRelationFilter
    favorites?: RecipeFavoriteListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    onboardingCompleted?: SortOrder
    onboardingStep?: SortOrderInput | SortOrder
    cookingSkillLevel?: SortOrderInput | SortOrder
    dietaryPreferences?: SortOrder
    favoriteCuisines?: SortOrder
    householdSize?: SortOrderInput | SortOrder
    defaultProcessingMethod?: SortOrder
    preferredCategories?: SortOrder
    timezone?: SortOrderInput | SortOrder
    measurementSystem?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    onboardingCompleted?: BoolWithAggregatesFilter<"User"> | boolean
    onboardingStep?: IntNullableWithAggregatesFilter<"User"> | number | null
    cookingSkillLevel?: EnumCookingSkillLevelNullableWithAggregatesFilter<"User"> | $Enums.CookingSkillLevel | null
    dietaryPreferences?: EnumDietaryPreferenceNullableListFilter<"User">
    favoriteCuisines?: StringNullableListFilter<"User">
    householdSize?: IntNullableWithAggregatesFilter<"User"> | number | null
    defaultProcessingMethod?: EnumProcessingMethodWithAggregatesFilter<"User"> | $Enums.ProcessingMethod
    preferredCategories?: StringNullableListFilter<"User">
    timezone?: StringNullableWithAggregatesFilter<"User"> | string | null
    measurementSystem?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type RecipeWhereInput = {
    AND?: RecipeWhereInput | RecipeWhereInput[]
    OR?: RecipeWhereInput[]
    NOT?: RecipeWhereInput | RecipeWhereInput[]
    id?: StringFilter<"Recipe"> | string
    title?: StringFilter<"Recipe"> | string
    description?: StringFilter<"Recipe"> | string
    ingredients?: StringNullableListFilter<"Recipe">
    steps?: StringNullableListFilter<"Recipe">
    image?: StringNullableFilter<"Recipe"> | string | null
    cuisine?: StringFilter<"Recipe"> | string
    category?: StringFilter<"Recipe"> | string
    prepTime?: StringFilter<"Recipe"> | string
    cleanupTime?: StringFilter<"Recipe"> | string
    createdAt?: DateTimeFilter<"Recipe"> | Date | string
    updatedAt?: DateTimeFilter<"Recipe"> | Date | string
    categorySource?: EnumCategorySourceNullableFilter<"Recipe"> | $Enums.CategorySource | null
    categoryConfidence?: FloatNullableFilter<"Recipe"> | number | null
    originalCategory?: StringNullableFilter<"Recipe"> | string | null
    userId?: StringFilter<"Recipe"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    favorites?: RecipeFavoriteListRelationFilter
    images?: RecipeImageListRelationFilter
  }

  export type RecipeOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    ingredients?: SortOrder
    steps?: SortOrder
    image?: SortOrderInput | SortOrder
    cuisine?: SortOrder
    category?: SortOrder
    prepTime?: SortOrder
    cleanupTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    categorySource?: SortOrderInput | SortOrder
    categoryConfidence?: SortOrderInput | SortOrder
    originalCategory?: SortOrderInput | SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    favorites?: RecipeFavoriteOrderByRelationAggregateInput
    images?: RecipeImageOrderByRelationAggregateInput
  }

  export type RecipeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RecipeWhereInput | RecipeWhereInput[]
    OR?: RecipeWhereInput[]
    NOT?: RecipeWhereInput | RecipeWhereInput[]
    title?: StringFilter<"Recipe"> | string
    description?: StringFilter<"Recipe"> | string
    ingredients?: StringNullableListFilter<"Recipe">
    steps?: StringNullableListFilter<"Recipe">
    image?: StringNullableFilter<"Recipe"> | string | null
    cuisine?: StringFilter<"Recipe"> | string
    category?: StringFilter<"Recipe"> | string
    prepTime?: StringFilter<"Recipe"> | string
    cleanupTime?: StringFilter<"Recipe"> | string
    createdAt?: DateTimeFilter<"Recipe"> | Date | string
    updatedAt?: DateTimeFilter<"Recipe"> | Date | string
    categorySource?: EnumCategorySourceNullableFilter<"Recipe"> | $Enums.CategorySource | null
    categoryConfidence?: FloatNullableFilter<"Recipe"> | number | null
    originalCategory?: StringNullableFilter<"Recipe"> | string | null
    userId?: StringFilter<"Recipe"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    favorites?: RecipeFavoriteListRelationFilter
    images?: RecipeImageListRelationFilter
  }, "id">

  export type RecipeOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    ingredients?: SortOrder
    steps?: SortOrder
    image?: SortOrderInput | SortOrder
    cuisine?: SortOrder
    category?: SortOrder
    prepTime?: SortOrder
    cleanupTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    categorySource?: SortOrderInput | SortOrder
    categoryConfidence?: SortOrderInput | SortOrder
    originalCategory?: SortOrderInput | SortOrder
    userId?: SortOrder
    _count?: RecipeCountOrderByAggregateInput
    _avg?: RecipeAvgOrderByAggregateInput
    _max?: RecipeMaxOrderByAggregateInput
    _min?: RecipeMinOrderByAggregateInput
    _sum?: RecipeSumOrderByAggregateInput
  }

  export type RecipeScalarWhereWithAggregatesInput = {
    AND?: RecipeScalarWhereWithAggregatesInput | RecipeScalarWhereWithAggregatesInput[]
    OR?: RecipeScalarWhereWithAggregatesInput[]
    NOT?: RecipeScalarWhereWithAggregatesInput | RecipeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Recipe"> | string
    title?: StringWithAggregatesFilter<"Recipe"> | string
    description?: StringWithAggregatesFilter<"Recipe"> | string
    ingredients?: StringNullableListFilter<"Recipe">
    steps?: StringNullableListFilter<"Recipe">
    image?: StringNullableWithAggregatesFilter<"Recipe"> | string | null
    cuisine?: StringWithAggregatesFilter<"Recipe"> | string
    category?: StringWithAggregatesFilter<"Recipe"> | string
    prepTime?: StringWithAggregatesFilter<"Recipe"> | string
    cleanupTime?: StringWithAggregatesFilter<"Recipe"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Recipe"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Recipe"> | Date | string
    categorySource?: EnumCategorySourceNullableWithAggregatesFilter<"Recipe"> | $Enums.CategorySource | null
    categoryConfidence?: FloatNullableWithAggregatesFilter<"Recipe"> | number | null
    originalCategory?: StringNullableWithAggregatesFilter<"Recipe"> | string | null
    userId?: StringWithAggregatesFilter<"Recipe"> | string
  }

  export type RecipeImageWhereInput = {
    AND?: RecipeImageWhereInput | RecipeImageWhereInput[]
    OR?: RecipeImageWhereInput[]
    NOT?: RecipeImageWhereInput | RecipeImageWhereInput[]
    id?: StringFilter<"RecipeImage"> | string
    url?: StringFilter<"RecipeImage"> | string
    alt?: StringNullableFilter<"RecipeImage"> | string | null
    isPrimary?: BoolFilter<"RecipeImage"> | boolean
    order?: IntFilter<"RecipeImage"> | number
    createdAt?: DateTimeFilter<"RecipeImage"> | Date | string
    updatedAt?: DateTimeFilter<"RecipeImage"> | Date | string
    recipeId?: StringFilter<"RecipeImage"> | string
    recipe?: XOR<RecipeScalarRelationFilter, RecipeWhereInput>
  }

  export type RecipeImageOrderByWithRelationInput = {
    id?: SortOrder
    url?: SortOrder
    alt?: SortOrderInput | SortOrder
    isPrimary?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    recipeId?: SortOrder
    recipe?: RecipeOrderByWithRelationInput
  }

  export type RecipeImageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RecipeImageWhereInput | RecipeImageWhereInput[]
    OR?: RecipeImageWhereInput[]
    NOT?: RecipeImageWhereInput | RecipeImageWhereInput[]
    url?: StringFilter<"RecipeImage"> | string
    alt?: StringNullableFilter<"RecipeImage"> | string | null
    isPrimary?: BoolFilter<"RecipeImage"> | boolean
    order?: IntFilter<"RecipeImage"> | number
    createdAt?: DateTimeFilter<"RecipeImage"> | Date | string
    updatedAt?: DateTimeFilter<"RecipeImage"> | Date | string
    recipeId?: StringFilter<"RecipeImage"> | string
    recipe?: XOR<RecipeScalarRelationFilter, RecipeWhereInput>
  }, "id">

  export type RecipeImageOrderByWithAggregationInput = {
    id?: SortOrder
    url?: SortOrder
    alt?: SortOrderInput | SortOrder
    isPrimary?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    recipeId?: SortOrder
    _count?: RecipeImageCountOrderByAggregateInput
    _avg?: RecipeImageAvgOrderByAggregateInput
    _max?: RecipeImageMaxOrderByAggregateInput
    _min?: RecipeImageMinOrderByAggregateInput
    _sum?: RecipeImageSumOrderByAggregateInput
  }

  export type RecipeImageScalarWhereWithAggregatesInput = {
    AND?: RecipeImageScalarWhereWithAggregatesInput | RecipeImageScalarWhereWithAggregatesInput[]
    OR?: RecipeImageScalarWhereWithAggregatesInput[]
    NOT?: RecipeImageScalarWhereWithAggregatesInput | RecipeImageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RecipeImage"> | string
    url?: StringWithAggregatesFilter<"RecipeImage"> | string
    alt?: StringNullableWithAggregatesFilter<"RecipeImage"> | string | null
    isPrimary?: BoolWithAggregatesFilter<"RecipeImage"> | boolean
    order?: IntWithAggregatesFilter<"RecipeImage"> | number
    createdAt?: DateTimeWithAggregatesFilter<"RecipeImage"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RecipeImage"> | Date | string
    recipeId?: StringWithAggregatesFilter<"RecipeImage"> | string
  }

  export type RecipeFavoriteWhereInput = {
    AND?: RecipeFavoriteWhereInput | RecipeFavoriteWhereInput[]
    OR?: RecipeFavoriteWhereInput[]
    NOT?: RecipeFavoriteWhereInput | RecipeFavoriteWhereInput[]
    id?: StringFilter<"RecipeFavorite"> | string
    userId?: StringFilter<"RecipeFavorite"> | string
    recipeId?: StringFilter<"RecipeFavorite"> | string
    createdAt?: DateTimeFilter<"RecipeFavorite"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    recipe?: XOR<RecipeScalarRelationFilter, RecipeWhereInput>
  }

  export type RecipeFavoriteOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    recipeId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    recipe?: RecipeOrderByWithRelationInput
  }

  export type RecipeFavoriteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_recipeId?: RecipeFavoriteUserIdRecipeIdCompoundUniqueInput
    AND?: RecipeFavoriteWhereInput | RecipeFavoriteWhereInput[]
    OR?: RecipeFavoriteWhereInput[]
    NOT?: RecipeFavoriteWhereInput | RecipeFavoriteWhereInput[]
    userId?: StringFilter<"RecipeFavorite"> | string
    recipeId?: StringFilter<"RecipeFavorite"> | string
    createdAt?: DateTimeFilter<"RecipeFavorite"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    recipe?: XOR<RecipeScalarRelationFilter, RecipeWhereInput>
  }, "id" | "userId_recipeId">

  export type RecipeFavoriteOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    recipeId?: SortOrder
    createdAt?: SortOrder
    _count?: RecipeFavoriteCountOrderByAggregateInput
    _max?: RecipeFavoriteMaxOrderByAggregateInput
    _min?: RecipeFavoriteMinOrderByAggregateInput
  }

  export type RecipeFavoriteScalarWhereWithAggregatesInput = {
    AND?: RecipeFavoriteScalarWhereWithAggregatesInput | RecipeFavoriteScalarWhereWithAggregatesInput[]
    OR?: RecipeFavoriteScalarWhereWithAggregatesInput[]
    NOT?: RecipeFavoriteScalarWhereWithAggregatesInput | RecipeFavoriteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RecipeFavorite"> | string
    userId?: StringWithAggregatesFilter<"RecipeFavorite"> | string
    recipeId?: StringWithAggregatesFilter<"RecipeFavorite"> | string
    createdAt?: DateTimeWithAggregatesFilter<"RecipeFavorite"> | Date | string
  }

  export type UserCreateInput = {
    id: string
    email: string
    firstName?: string | null
    lastName?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    onboardingCompleted?: boolean
    onboardingStep?: number | null
    cookingSkillLevel?: $Enums.CookingSkillLevel | null
    dietaryPreferences?: UserCreatedietaryPreferencesInput | $Enums.DietaryPreference[]
    favoriteCuisines?: UserCreatefavoriteCuisinesInput | string[]
    householdSize?: number | null
    defaultProcessingMethod?: $Enums.ProcessingMethod
    preferredCategories?: UserCreatepreferredCategoriesInput | string[]
    timezone?: string | null
    measurementSystem?: string | null
    recipes?: RecipeCreateNestedManyWithoutUserInput
    favorites?: RecipeFavoriteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    email: string
    firstName?: string | null
    lastName?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    onboardingCompleted?: boolean
    onboardingStep?: number | null
    cookingSkillLevel?: $Enums.CookingSkillLevel | null
    dietaryPreferences?: UserCreatedietaryPreferencesInput | $Enums.DietaryPreference[]
    favoriteCuisines?: UserCreatefavoriteCuisinesInput | string[]
    householdSize?: number | null
    defaultProcessingMethod?: $Enums.ProcessingMethod
    preferredCategories?: UserCreatepreferredCategoriesInput | string[]
    timezone?: string | null
    measurementSystem?: string | null
    recipes?: RecipeUncheckedCreateNestedManyWithoutUserInput
    favorites?: RecipeFavoriteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    onboardingCompleted?: BoolFieldUpdateOperationsInput | boolean
    onboardingStep?: NullableIntFieldUpdateOperationsInput | number | null
    cookingSkillLevel?: NullableEnumCookingSkillLevelFieldUpdateOperationsInput | $Enums.CookingSkillLevel | null
    dietaryPreferences?: UserUpdatedietaryPreferencesInput | $Enums.DietaryPreference[]
    favoriteCuisines?: UserUpdatefavoriteCuisinesInput | string[]
    householdSize?: NullableIntFieldUpdateOperationsInput | number | null
    defaultProcessingMethod?: EnumProcessingMethodFieldUpdateOperationsInput | $Enums.ProcessingMethod
    preferredCategories?: UserUpdatepreferredCategoriesInput | string[]
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    measurementSystem?: NullableStringFieldUpdateOperationsInput | string | null
    recipes?: RecipeUpdateManyWithoutUserNestedInput
    favorites?: RecipeFavoriteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    onboardingCompleted?: BoolFieldUpdateOperationsInput | boolean
    onboardingStep?: NullableIntFieldUpdateOperationsInput | number | null
    cookingSkillLevel?: NullableEnumCookingSkillLevelFieldUpdateOperationsInput | $Enums.CookingSkillLevel | null
    dietaryPreferences?: UserUpdatedietaryPreferencesInput | $Enums.DietaryPreference[]
    favoriteCuisines?: UserUpdatefavoriteCuisinesInput | string[]
    householdSize?: NullableIntFieldUpdateOperationsInput | number | null
    defaultProcessingMethod?: EnumProcessingMethodFieldUpdateOperationsInput | $Enums.ProcessingMethod
    preferredCategories?: UserUpdatepreferredCategoriesInput | string[]
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    measurementSystem?: NullableStringFieldUpdateOperationsInput | string | null
    recipes?: RecipeUncheckedUpdateManyWithoutUserNestedInput
    favorites?: RecipeFavoriteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id: string
    email: string
    firstName?: string | null
    lastName?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    onboardingCompleted?: boolean
    onboardingStep?: number | null
    cookingSkillLevel?: $Enums.CookingSkillLevel | null
    dietaryPreferences?: UserCreatedietaryPreferencesInput | $Enums.DietaryPreference[]
    favoriteCuisines?: UserCreatefavoriteCuisinesInput | string[]
    householdSize?: number | null
    defaultProcessingMethod?: $Enums.ProcessingMethod
    preferredCategories?: UserCreatepreferredCategoriesInput | string[]
    timezone?: string | null
    measurementSystem?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    onboardingCompleted?: BoolFieldUpdateOperationsInput | boolean
    onboardingStep?: NullableIntFieldUpdateOperationsInput | number | null
    cookingSkillLevel?: NullableEnumCookingSkillLevelFieldUpdateOperationsInput | $Enums.CookingSkillLevel | null
    dietaryPreferences?: UserUpdatedietaryPreferencesInput | $Enums.DietaryPreference[]
    favoriteCuisines?: UserUpdatefavoriteCuisinesInput | string[]
    householdSize?: NullableIntFieldUpdateOperationsInput | number | null
    defaultProcessingMethod?: EnumProcessingMethodFieldUpdateOperationsInput | $Enums.ProcessingMethod
    preferredCategories?: UserUpdatepreferredCategoriesInput | string[]
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    measurementSystem?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    onboardingCompleted?: BoolFieldUpdateOperationsInput | boolean
    onboardingStep?: NullableIntFieldUpdateOperationsInput | number | null
    cookingSkillLevel?: NullableEnumCookingSkillLevelFieldUpdateOperationsInput | $Enums.CookingSkillLevel | null
    dietaryPreferences?: UserUpdatedietaryPreferencesInput | $Enums.DietaryPreference[]
    favoriteCuisines?: UserUpdatefavoriteCuisinesInput | string[]
    householdSize?: NullableIntFieldUpdateOperationsInput | number | null
    defaultProcessingMethod?: EnumProcessingMethodFieldUpdateOperationsInput | $Enums.ProcessingMethod
    preferredCategories?: UserUpdatepreferredCategoriesInput | string[]
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    measurementSystem?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RecipeCreateInput = {
    id?: string
    title: string
    description: string
    ingredients?: RecipeCreateingredientsInput | string[]
    steps?: RecipeCreatestepsInput | string[]
    image?: string | null
    cuisine: string
    category: string
    prepTime: string
    cleanupTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
    categorySource?: $Enums.CategorySource | null
    categoryConfidence?: number | null
    originalCategory?: string | null
    user: UserCreateNestedOneWithoutRecipesInput
    favorites?: RecipeFavoriteCreateNestedManyWithoutRecipeInput
    images?: RecipeImageCreateNestedManyWithoutRecipeInput
  }

  export type RecipeUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    ingredients?: RecipeCreateingredientsInput | string[]
    steps?: RecipeCreatestepsInput | string[]
    image?: string | null
    cuisine: string
    category: string
    prepTime: string
    cleanupTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
    categorySource?: $Enums.CategorySource | null
    categoryConfidence?: number | null
    originalCategory?: string | null
    userId: string
    favorites?: RecipeFavoriteUncheckedCreateNestedManyWithoutRecipeInput
    images?: RecipeImageUncheckedCreateNestedManyWithoutRecipeInput
  }

  export type RecipeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    ingredients?: RecipeUpdateingredientsInput | string[]
    steps?: RecipeUpdatestepsInput | string[]
    image?: NullableStringFieldUpdateOperationsInput | string | null
    cuisine?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    prepTime?: StringFieldUpdateOperationsInput | string
    cleanupTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categorySource?: NullableEnumCategorySourceFieldUpdateOperationsInput | $Enums.CategorySource | null
    categoryConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    originalCategory?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutRecipesNestedInput
    favorites?: RecipeFavoriteUpdateManyWithoutRecipeNestedInput
    images?: RecipeImageUpdateManyWithoutRecipeNestedInput
  }

  export type RecipeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    ingredients?: RecipeUpdateingredientsInput | string[]
    steps?: RecipeUpdatestepsInput | string[]
    image?: NullableStringFieldUpdateOperationsInput | string | null
    cuisine?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    prepTime?: StringFieldUpdateOperationsInput | string
    cleanupTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categorySource?: NullableEnumCategorySourceFieldUpdateOperationsInput | $Enums.CategorySource | null
    categoryConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    originalCategory?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    favorites?: RecipeFavoriteUncheckedUpdateManyWithoutRecipeNestedInput
    images?: RecipeImageUncheckedUpdateManyWithoutRecipeNestedInput
  }

  export type RecipeCreateManyInput = {
    id?: string
    title: string
    description: string
    ingredients?: RecipeCreateingredientsInput | string[]
    steps?: RecipeCreatestepsInput | string[]
    image?: string | null
    cuisine: string
    category: string
    prepTime: string
    cleanupTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
    categorySource?: $Enums.CategorySource | null
    categoryConfidence?: number | null
    originalCategory?: string | null
    userId: string
  }

  export type RecipeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    ingredients?: RecipeUpdateingredientsInput | string[]
    steps?: RecipeUpdatestepsInput | string[]
    image?: NullableStringFieldUpdateOperationsInput | string | null
    cuisine?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    prepTime?: StringFieldUpdateOperationsInput | string
    cleanupTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categorySource?: NullableEnumCategorySourceFieldUpdateOperationsInput | $Enums.CategorySource | null
    categoryConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    originalCategory?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RecipeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    ingredients?: RecipeUpdateingredientsInput | string[]
    steps?: RecipeUpdatestepsInput | string[]
    image?: NullableStringFieldUpdateOperationsInput | string | null
    cuisine?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    prepTime?: StringFieldUpdateOperationsInput | string
    cleanupTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categorySource?: NullableEnumCategorySourceFieldUpdateOperationsInput | $Enums.CategorySource | null
    categoryConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    originalCategory?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type RecipeImageCreateInput = {
    id?: string
    url: string
    alt?: string | null
    isPrimary?: boolean
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    recipe: RecipeCreateNestedOneWithoutImagesInput
  }

  export type RecipeImageUncheckedCreateInput = {
    id?: string
    url: string
    alt?: string | null
    isPrimary?: boolean
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    recipeId: string
  }

  export type RecipeImageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    alt?: NullableStringFieldUpdateOperationsInput | string | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipe?: RecipeUpdateOneRequiredWithoutImagesNestedInput
  }

  export type RecipeImageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    alt?: NullableStringFieldUpdateOperationsInput | string | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipeId?: StringFieldUpdateOperationsInput | string
  }

  export type RecipeImageCreateManyInput = {
    id?: string
    url: string
    alt?: string | null
    isPrimary?: boolean
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    recipeId: string
  }

  export type RecipeImageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    alt?: NullableStringFieldUpdateOperationsInput | string | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeImageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    alt?: NullableStringFieldUpdateOperationsInput | string | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipeId?: StringFieldUpdateOperationsInput | string
  }

  export type RecipeFavoriteCreateInput = {
    id?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFavoritesInput
    recipe: RecipeCreateNestedOneWithoutFavoritesInput
  }

  export type RecipeFavoriteUncheckedCreateInput = {
    id?: string
    userId: string
    recipeId: string
    createdAt?: Date | string
  }

  export type RecipeFavoriteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFavoritesNestedInput
    recipe?: RecipeUpdateOneRequiredWithoutFavoritesNestedInput
  }

  export type RecipeFavoriteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    recipeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeFavoriteCreateManyInput = {
    id?: string
    userId: string
    recipeId: string
    createdAt?: Date | string
  }

  export type RecipeFavoriteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeFavoriteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    recipeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumCookingSkillLevelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CookingSkillLevel | EnumCookingSkillLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.CookingSkillLevel[] | ListEnumCookingSkillLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CookingSkillLevel[] | ListEnumCookingSkillLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCookingSkillLevelNullableFilter<$PrismaModel> | $Enums.CookingSkillLevel | null
  }

  export type EnumDietaryPreferenceNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.DietaryPreference[] | ListEnumDietaryPreferenceFieldRefInput<$PrismaModel> | null
    has?: $Enums.DietaryPreference | EnumDietaryPreferenceFieldRefInput<$PrismaModel> | null
    hasEvery?: $Enums.DietaryPreference[] | ListEnumDietaryPreferenceFieldRefInput<$PrismaModel>
    hasSome?: $Enums.DietaryPreference[] | ListEnumDietaryPreferenceFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EnumProcessingMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.ProcessingMethod | EnumProcessingMethodFieldRefInput<$PrismaModel>
    in?: $Enums.ProcessingMethod[] | ListEnumProcessingMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProcessingMethod[] | ListEnumProcessingMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumProcessingMethodFilter<$PrismaModel> | $Enums.ProcessingMethod
  }

  export type RecipeListRelationFilter = {
    every?: RecipeWhereInput
    some?: RecipeWhereInput
    none?: RecipeWhereInput
  }

  export type RecipeFavoriteListRelationFilter = {
    every?: RecipeFavoriteWhereInput
    some?: RecipeFavoriteWhereInput
    none?: RecipeFavoriteWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RecipeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RecipeFavoriteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    onboardingCompleted?: SortOrder
    onboardingStep?: SortOrder
    cookingSkillLevel?: SortOrder
    dietaryPreferences?: SortOrder
    favoriteCuisines?: SortOrder
    householdSize?: SortOrder
    defaultProcessingMethod?: SortOrder
    preferredCategories?: SortOrder
    timezone?: SortOrder
    measurementSystem?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    onboardingStep?: SortOrder
    householdSize?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    onboardingCompleted?: SortOrder
    onboardingStep?: SortOrder
    cookingSkillLevel?: SortOrder
    householdSize?: SortOrder
    defaultProcessingMethod?: SortOrder
    timezone?: SortOrder
    measurementSystem?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    onboardingCompleted?: SortOrder
    onboardingStep?: SortOrder
    cookingSkillLevel?: SortOrder
    householdSize?: SortOrder
    defaultProcessingMethod?: SortOrder
    timezone?: SortOrder
    measurementSystem?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    onboardingStep?: SortOrder
    householdSize?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumCookingSkillLevelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CookingSkillLevel | EnumCookingSkillLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.CookingSkillLevel[] | ListEnumCookingSkillLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CookingSkillLevel[] | ListEnumCookingSkillLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCookingSkillLevelNullableWithAggregatesFilter<$PrismaModel> | $Enums.CookingSkillLevel | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumCookingSkillLevelNullableFilter<$PrismaModel>
    _max?: NestedEnumCookingSkillLevelNullableFilter<$PrismaModel>
  }

  export type EnumProcessingMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProcessingMethod | EnumProcessingMethodFieldRefInput<$PrismaModel>
    in?: $Enums.ProcessingMethod[] | ListEnumProcessingMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProcessingMethod[] | ListEnumProcessingMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumProcessingMethodWithAggregatesFilter<$PrismaModel> | $Enums.ProcessingMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProcessingMethodFilter<$PrismaModel>
    _max?: NestedEnumProcessingMethodFilter<$PrismaModel>
  }

  export type EnumCategorySourceNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CategorySource | EnumCategorySourceFieldRefInput<$PrismaModel> | null
    in?: $Enums.CategorySource[] | ListEnumCategorySourceFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CategorySource[] | ListEnumCategorySourceFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCategorySourceNullableFilter<$PrismaModel> | $Enums.CategorySource | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type RecipeImageListRelationFilter = {
    every?: RecipeImageWhereInput
    some?: RecipeImageWhereInput
    none?: RecipeImageWhereInput
  }

  export type RecipeImageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RecipeCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    ingredients?: SortOrder
    steps?: SortOrder
    image?: SortOrder
    cuisine?: SortOrder
    category?: SortOrder
    prepTime?: SortOrder
    cleanupTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    categorySource?: SortOrder
    categoryConfidence?: SortOrder
    originalCategory?: SortOrder
    userId?: SortOrder
  }

  export type RecipeAvgOrderByAggregateInput = {
    categoryConfidence?: SortOrder
  }

  export type RecipeMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    image?: SortOrder
    cuisine?: SortOrder
    category?: SortOrder
    prepTime?: SortOrder
    cleanupTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    categorySource?: SortOrder
    categoryConfidence?: SortOrder
    originalCategory?: SortOrder
    userId?: SortOrder
  }

  export type RecipeMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    image?: SortOrder
    cuisine?: SortOrder
    category?: SortOrder
    prepTime?: SortOrder
    cleanupTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    categorySource?: SortOrder
    categoryConfidence?: SortOrder
    originalCategory?: SortOrder
    userId?: SortOrder
  }

  export type RecipeSumOrderByAggregateInput = {
    categoryConfidence?: SortOrder
  }

  export type EnumCategorySourceNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CategorySource | EnumCategorySourceFieldRefInput<$PrismaModel> | null
    in?: $Enums.CategorySource[] | ListEnumCategorySourceFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CategorySource[] | ListEnumCategorySourceFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCategorySourceNullableWithAggregatesFilter<$PrismaModel> | $Enums.CategorySource | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumCategorySourceNullableFilter<$PrismaModel>
    _max?: NestedEnumCategorySourceNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type RecipeScalarRelationFilter = {
    is?: RecipeWhereInput
    isNot?: RecipeWhereInput
  }

  export type RecipeImageCountOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    alt?: SortOrder
    isPrimary?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    recipeId?: SortOrder
  }

  export type RecipeImageAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type RecipeImageMaxOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    alt?: SortOrder
    isPrimary?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    recipeId?: SortOrder
  }

  export type RecipeImageMinOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    alt?: SortOrder
    isPrimary?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    recipeId?: SortOrder
  }

  export type RecipeImageSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type RecipeFavoriteUserIdRecipeIdCompoundUniqueInput = {
    userId: string
    recipeId: string
  }

  export type RecipeFavoriteCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    recipeId?: SortOrder
    createdAt?: SortOrder
  }

  export type RecipeFavoriteMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    recipeId?: SortOrder
    createdAt?: SortOrder
  }

  export type RecipeFavoriteMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    recipeId?: SortOrder
    createdAt?: SortOrder
  }

  export type UserCreatedietaryPreferencesInput = {
    set: $Enums.DietaryPreference[]
  }

  export type UserCreatefavoriteCuisinesInput = {
    set: string[]
  }

  export type UserCreatepreferredCategoriesInput = {
    set: string[]
  }

  export type RecipeCreateNestedManyWithoutUserInput = {
    create?: XOR<RecipeCreateWithoutUserInput, RecipeUncheckedCreateWithoutUserInput> | RecipeCreateWithoutUserInput[] | RecipeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecipeCreateOrConnectWithoutUserInput | RecipeCreateOrConnectWithoutUserInput[]
    createMany?: RecipeCreateManyUserInputEnvelope
    connect?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
  }

  export type RecipeFavoriteCreateNestedManyWithoutUserInput = {
    create?: XOR<RecipeFavoriteCreateWithoutUserInput, RecipeFavoriteUncheckedCreateWithoutUserInput> | RecipeFavoriteCreateWithoutUserInput[] | RecipeFavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecipeFavoriteCreateOrConnectWithoutUserInput | RecipeFavoriteCreateOrConnectWithoutUserInput[]
    createMany?: RecipeFavoriteCreateManyUserInputEnvelope
    connect?: RecipeFavoriteWhereUniqueInput | RecipeFavoriteWhereUniqueInput[]
  }

  export type RecipeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RecipeCreateWithoutUserInput, RecipeUncheckedCreateWithoutUserInput> | RecipeCreateWithoutUserInput[] | RecipeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecipeCreateOrConnectWithoutUserInput | RecipeCreateOrConnectWithoutUserInput[]
    createMany?: RecipeCreateManyUserInputEnvelope
    connect?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
  }

  export type RecipeFavoriteUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RecipeFavoriteCreateWithoutUserInput, RecipeFavoriteUncheckedCreateWithoutUserInput> | RecipeFavoriteCreateWithoutUserInput[] | RecipeFavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecipeFavoriteCreateOrConnectWithoutUserInput | RecipeFavoriteCreateOrConnectWithoutUserInput[]
    createMany?: RecipeFavoriteCreateManyUserInputEnvelope
    connect?: RecipeFavoriteWhereUniqueInput | RecipeFavoriteWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableEnumCookingSkillLevelFieldUpdateOperationsInput = {
    set?: $Enums.CookingSkillLevel | null
  }

  export type UserUpdatedietaryPreferencesInput = {
    set?: $Enums.DietaryPreference[]
    push?: $Enums.DietaryPreference | $Enums.DietaryPreference[]
  }

  export type UserUpdatefavoriteCuisinesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumProcessingMethodFieldUpdateOperationsInput = {
    set?: $Enums.ProcessingMethod
  }

  export type UserUpdatepreferredCategoriesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type RecipeUpdateManyWithoutUserNestedInput = {
    create?: XOR<RecipeCreateWithoutUserInput, RecipeUncheckedCreateWithoutUserInput> | RecipeCreateWithoutUserInput[] | RecipeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecipeCreateOrConnectWithoutUserInput | RecipeCreateOrConnectWithoutUserInput[]
    upsert?: RecipeUpsertWithWhereUniqueWithoutUserInput | RecipeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RecipeCreateManyUserInputEnvelope
    set?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    disconnect?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    delete?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    connect?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    update?: RecipeUpdateWithWhereUniqueWithoutUserInput | RecipeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RecipeUpdateManyWithWhereWithoutUserInput | RecipeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RecipeScalarWhereInput | RecipeScalarWhereInput[]
  }

  export type RecipeFavoriteUpdateManyWithoutUserNestedInput = {
    create?: XOR<RecipeFavoriteCreateWithoutUserInput, RecipeFavoriteUncheckedCreateWithoutUserInput> | RecipeFavoriteCreateWithoutUserInput[] | RecipeFavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecipeFavoriteCreateOrConnectWithoutUserInput | RecipeFavoriteCreateOrConnectWithoutUserInput[]
    upsert?: RecipeFavoriteUpsertWithWhereUniqueWithoutUserInput | RecipeFavoriteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RecipeFavoriteCreateManyUserInputEnvelope
    set?: RecipeFavoriteWhereUniqueInput | RecipeFavoriteWhereUniqueInput[]
    disconnect?: RecipeFavoriteWhereUniqueInput | RecipeFavoriteWhereUniqueInput[]
    delete?: RecipeFavoriteWhereUniqueInput | RecipeFavoriteWhereUniqueInput[]
    connect?: RecipeFavoriteWhereUniqueInput | RecipeFavoriteWhereUniqueInput[]
    update?: RecipeFavoriteUpdateWithWhereUniqueWithoutUserInput | RecipeFavoriteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RecipeFavoriteUpdateManyWithWhereWithoutUserInput | RecipeFavoriteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RecipeFavoriteScalarWhereInput | RecipeFavoriteScalarWhereInput[]
  }

  export type RecipeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RecipeCreateWithoutUserInput, RecipeUncheckedCreateWithoutUserInput> | RecipeCreateWithoutUserInput[] | RecipeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecipeCreateOrConnectWithoutUserInput | RecipeCreateOrConnectWithoutUserInput[]
    upsert?: RecipeUpsertWithWhereUniqueWithoutUserInput | RecipeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RecipeCreateManyUserInputEnvelope
    set?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    disconnect?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    delete?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    connect?: RecipeWhereUniqueInput | RecipeWhereUniqueInput[]
    update?: RecipeUpdateWithWhereUniqueWithoutUserInput | RecipeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RecipeUpdateManyWithWhereWithoutUserInput | RecipeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RecipeScalarWhereInput | RecipeScalarWhereInput[]
  }

  export type RecipeFavoriteUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RecipeFavoriteCreateWithoutUserInput, RecipeFavoriteUncheckedCreateWithoutUserInput> | RecipeFavoriteCreateWithoutUserInput[] | RecipeFavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecipeFavoriteCreateOrConnectWithoutUserInput | RecipeFavoriteCreateOrConnectWithoutUserInput[]
    upsert?: RecipeFavoriteUpsertWithWhereUniqueWithoutUserInput | RecipeFavoriteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RecipeFavoriteCreateManyUserInputEnvelope
    set?: RecipeFavoriteWhereUniqueInput | RecipeFavoriteWhereUniqueInput[]
    disconnect?: RecipeFavoriteWhereUniqueInput | RecipeFavoriteWhereUniqueInput[]
    delete?: RecipeFavoriteWhereUniqueInput | RecipeFavoriteWhereUniqueInput[]
    connect?: RecipeFavoriteWhereUniqueInput | RecipeFavoriteWhereUniqueInput[]
    update?: RecipeFavoriteUpdateWithWhereUniqueWithoutUserInput | RecipeFavoriteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RecipeFavoriteUpdateManyWithWhereWithoutUserInput | RecipeFavoriteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RecipeFavoriteScalarWhereInput | RecipeFavoriteScalarWhereInput[]
  }

  export type RecipeCreateingredientsInput = {
    set: string[]
  }

  export type RecipeCreatestepsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutRecipesInput = {
    create?: XOR<UserCreateWithoutRecipesInput, UserUncheckedCreateWithoutRecipesInput>
    connectOrCreate?: UserCreateOrConnectWithoutRecipesInput
    connect?: UserWhereUniqueInput
  }

  export type RecipeFavoriteCreateNestedManyWithoutRecipeInput = {
    create?: XOR<RecipeFavoriteCreateWithoutRecipeInput, RecipeFavoriteUncheckedCreateWithoutRecipeInput> | RecipeFavoriteCreateWithoutRecipeInput[] | RecipeFavoriteUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: RecipeFavoriteCreateOrConnectWithoutRecipeInput | RecipeFavoriteCreateOrConnectWithoutRecipeInput[]
    createMany?: RecipeFavoriteCreateManyRecipeInputEnvelope
    connect?: RecipeFavoriteWhereUniqueInput | RecipeFavoriteWhereUniqueInput[]
  }

  export type RecipeImageCreateNestedManyWithoutRecipeInput = {
    create?: XOR<RecipeImageCreateWithoutRecipeInput, RecipeImageUncheckedCreateWithoutRecipeInput> | RecipeImageCreateWithoutRecipeInput[] | RecipeImageUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: RecipeImageCreateOrConnectWithoutRecipeInput | RecipeImageCreateOrConnectWithoutRecipeInput[]
    createMany?: RecipeImageCreateManyRecipeInputEnvelope
    connect?: RecipeImageWhereUniqueInput | RecipeImageWhereUniqueInput[]
  }

  export type RecipeFavoriteUncheckedCreateNestedManyWithoutRecipeInput = {
    create?: XOR<RecipeFavoriteCreateWithoutRecipeInput, RecipeFavoriteUncheckedCreateWithoutRecipeInput> | RecipeFavoriteCreateWithoutRecipeInput[] | RecipeFavoriteUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: RecipeFavoriteCreateOrConnectWithoutRecipeInput | RecipeFavoriteCreateOrConnectWithoutRecipeInput[]
    createMany?: RecipeFavoriteCreateManyRecipeInputEnvelope
    connect?: RecipeFavoriteWhereUniqueInput | RecipeFavoriteWhereUniqueInput[]
  }

  export type RecipeImageUncheckedCreateNestedManyWithoutRecipeInput = {
    create?: XOR<RecipeImageCreateWithoutRecipeInput, RecipeImageUncheckedCreateWithoutRecipeInput> | RecipeImageCreateWithoutRecipeInput[] | RecipeImageUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: RecipeImageCreateOrConnectWithoutRecipeInput | RecipeImageCreateOrConnectWithoutRecipeInput[]
    createMany?: RecipeImageCreateManyRecipeInputEnvelope
    connect?: RecipeImageWhereUniqueInput | RecipeImageWhereUniqueInput[]
  }

  export type RecipeUpdateingredientsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type RecipeUpdatestepsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableEnumCategorySourceFieldUpdateOperationsInput = {
    set?: $Enums.CategorySource | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutRecipesNestedInput = {
    create?: XOR<UserCreateWithoutRecipesInput, UserUncheckedCreateWithoutRecipesInput>
    connectOrCreate?: UserCreateOrConnectWithoutRecipesInput
    upsert?: UserUpsertWithoutRecipesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRecipesInput, UserUpdateWithoutRecipesInput>, UserUncheckedUpdateWithoutRecipesInput>
  }

  export type RecipeFavoriteUpdateManyWithoutRecipeNestedInput = {
    create?: XOR<RecipeFavoriteCreateWithoutRecipeInput, RecipeFavoriteUncheckedCreateWithoutRecipeInput> | RecipeFavoriteCreateWithoutRecipeInput[] | RecipeFavoriteUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: RecipeFavoriteCreateOrConnectWithoutRecipeInput | RecipeFavoriteCreateOrConnectWithoutRecipeInput[]
    upsert?: RecipeFavoriteUpsertWithWhereUniqueWithoutRecipeInput | RecipeFavoriteUpsertWithWhereUniqueWithoutRecipeInput[]
    createMany?: RecipeFavoriteCreateManyRecipeInputEnvelope
    set?: RecipeFavoriteWhereUniqueInput | RecipeFavoriteWhereUniqueInput[]
    disconnect?: RecipeFavoriteWhereUniqueInput | RecipeFavoriteWhereUniqueInput[]
    delete?: RecipeFavoriteWhereUniqueInput | RecipeFavoriteWhereUniqueInput[]
    connect?: RecipeFavoriteWhereUniqueInput | RecipeFavoriteWhereUniqueInput[]
    update?: RecipeFavoriteUpdateWithWhereUniqueWithoutRecipeInput | RecipeFavoriteUpdateWithWhereUniqueWithoutRecipeInput[]
    updateMany?: RecipeFavoriteUpdateManyWithWhereWithoutRecipeInput | RecipeFavoriteUpdateManyWithWhereWithoutRecipeInput[]
    deleteMany?: RecipeFavoriteScalarWhereInput | RecipeFavoriteScalarWhereInput[]
  }

  export type RecipeImageUpdateManyWithoutRecipeNestedInput = {
    create?: XOR<RecipeImageCreateWithoutRecipeInput, RecipeImageUncheckedCreateWithoutRecipeInput> | RecipeImageCreateWithoutRecipeInput[] | RecipeImageUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: RecipeImageCreateOrConnectWithoutRecipeInput | RecipeImageCreateOrConnectWithoutRecipeInput[]
    upsert?: RecipeImageUpsertWithWhereUniqueWithoutRecipeInput | RecipeImageUpsertWithWhereUniqueWithoutRecipeInput[]
    createMany?: RecipeImageCreateManyRecipeInputEnvelope
    set?: RecipeImageWhereUniqueInput | RecipeImageWhereUniqueInput[]
    disconnect?: RecipeImageWhereUniqueInput | RecipeImageWhereUniqueInput[]
    delete?: RecipeImageWhereUniqueInput | RecipeImageWhereUniqueInput[]
    connect?: RecipeImageWhereUniqueInput | RecipeImageWhereUniqueInput[]
    update?: RecipeImageUpdateWithWhereUniqueWithoutRecipeInput | RecipeImageUpdateWithWhereUniqueWithoutRecipeInput[]
    updateMany?: RecipeImageUpdateManyWithWhereWithoutRecipeInput | RecipeImageUpdateManyWithWhereWithoutRecipeInput[]
    deleteMany?: RecipeImageScalarWhereInput | RecipeImageScalarWhereInput[]
  }

  export type RecipeFavoriteUncheckedUpdateManyWithoutRecipeNestedInput = {
    create?: XOR<RecipeFavoriteCreateWithoutRecipeInput, RecipeFavoriteUncheckedCreateWithoutRecipeInput> | RecipeFavoriteCreateWithoutRecipeInput[] | RecipeFavoriteUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: RecipeFavoriteCreateOrConnectWithoutRecipeInput | RecipeFavoriteCreateOrConnectWithoutRecipeInput[]
    upsert?: RecipeFavoriteUpsertWithWhereUniqueWithoutRecipeInput | RecipeFavoriteUpsertWithWhereUniqueWithoutRecipeInput[]
    createMany?: RecipeFavoriteCreateManyRecipeInputEnvelope
    set?: RecipeFavoriteWhereUniqueInput | RecipeFavoriteWhereUniqueInput[]
    disconnect?: RecipeFavoriteWhereUniqueInput | RecipeFavoriteWhereUniqueInput[]
    delete?: RecipeFavoriteWhereUniqueInput | RecipeFavoriteWhereUniqueInput[]
    connect?: RecipeFavoriteWhereUniqueInput | RecipeFavoriteWhereUniqueInput[]
    update?: RecipeFavoriteUpdateWithWhereUniqueWithoutRecipeInput | RecipeFavoriteUpdateWithWhereUniqueWithoutRecipeInput[]
    updateMany?: RecipeFavoriteUpdateManyWithWhereWithoutRecipeInput | RecipeFavoriteUpdateManyWithWhereWithoutRecipeInput[]
    deleteMany?: RecipeFavoriteScalarWhereInput | RecipeFavoriteScalarWhereInput[]
  }

  export type RecipeImageUncheckedUpdateManyWithoutRecipeNestedInput = {
    create?: XOR<RecipeImageCreateWithoutRecipeInput, RecipeImageUncheckedCreateWithoutRecipeInput> | RecipeImageCreateWithoutRecipeInput[] | RecipeImageUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: RecipeImageCreateOrConnectWithoutRecipeInput | RecipeImageCreateOrConnectWithoutRecipeInput[]
    upsert?: RecipeImageUpsertWithWhereUniqueWithoutRecipeInput | RecipeImageUpsertWithWhereUniqueWithoutRecipeInput[]
    createMany?: RecipeImageCreateManyRecipeInputEnvelope
    set?: RecipeImageWhereUniqueInput | RecipeImageWhereUniqueInput[]
    disconnect?: RecipeImageWhereUniqueInput | RecipeImageWhereUniqueInput[]
    delete?: RecipeImageWhereUniqueInput | RecipeImageWhereUniqueInput[]
    connect?: RecipeImageWhereUniqueInput | RecipeImageWhereUniqueInput[]
    update?: RecipeImageUpdateWithWhereUniqueWithoutRecipeInput | RecipeImageUpdateWithWhereUniqueWithoutRecipeInput[]
    updateMany?: RecipeImageUpdateManyWithWhereWithoutRecipeInput | RecipeImageUpdateManyWithWhereWithoutRecipeInput[]
    deleteMany?: RecipeImageScalarWhereInput | RecipeImageScalarWhereInput[]
  }

  export type RecipeCreateNestedOneWithoutImagesInput = {
    create?: XOR<RecipeCreateWithoutImagesInput, RecipeUncheckedCreateWithoutImagesInput>
    connectOrCreate?: RecipeCreateOrConnectWithoutImagesInput
    connect?: RecipeWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type RecipeUpdateOneRequiredWithoutImagesNestedInput = {
    create?: XOR<RecipeCreateWithoutImagesInput, RecipeUncheckedCreateWithoutImagesInput>
    connectOrCreate?: RecipeCreateOrConnectWithoutImagesInput
    upsert?: RecipeUpsertWithoutImagesInput
    connect?: RecipeWhereUniqueInput
    update?: XOR<XOR<RecipeUpdateToOneWithWhereWithoutImagesInput, RecipeUpdateWithoutImagesInput>, RecipeUncheckedUpdateWithoutImagesInput>
  }

  export type UserCreateNestedOneWithoutFavoritesInput = {
    create?: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFavoritesInput
    connect?: UserWhereUniqueInput
  }

  export type RecipeCreateNestedOneWithoutFavoritesInput = {
    create?: XOR<RecipeCreateWithoutFavoritesInput, RecipeUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: RecipeCreateOrConnectWithoutFavoritesInput
    connect?: RecipeWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFavoritesNestedInput = {
    create?: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFavoritesInput
    upsert?: UserUpsertWithoutFavoritesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFavoritesInput, UserUpdateWithoutFavoritesInput>, UserUncheckedUpdateWithoutFavoritesInput>
  }

  export type RecipeUpdateOneRequiredWithoutFavoritesNestedInput = {
    create?: XOR<RecipeCreateWithoutFavoritesInput, RecipeUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: RecipeCreateOrConnectWithoutFavoritesInput
    upsert?: RecipeUpsertWithoutFavoritesInput
    connect?: RecipeWhereUniqueInput
    update?: XOR<XOR<RecipeUpdateToOneWithWhereWithoutFavoritesInput, RecipeUpdateWithoutFavoritesInput>, RecipeUncheckedUpdateWithoutFavoritesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumCookingSkillLevelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CookingSkillLevel | EnumCookingSkillLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.CookingSkillLevel[] | ListEnumCookingSkillLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CookingSkillLevel[] | ListEnumCookingSkillLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCookingSkillLevelNullableFilter<$PrismaModel> | $Enums.CookingSkillLevel | null
  }

  export type NestedEnumProcessingMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.ProcessingMethod | EnumProcessingMethodFieldRefInput<$PrismaModel>
    in?: $Enums.ProcessingMethod[] | ListEnumProcessingMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProcessingMethod[] | ListEnumProcessingMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumProcessingMethodFilter<$PrismaModel> | $Enums.ProcessingMethod
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumCookingSkillLevelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CookingSkillLevel | EnumCookingSkillLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.CookingSkillLevel[] | ListEnumCookingSkillLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CookingSkillLevel[] | ListEnumCookingSkillLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCookingSkillLevelNullableWithAggregatesFilter<$PrismaModel> | $Enums.CookingSkillLevel | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumCookingSkillLevelNullableFilter<$PrismaModel>
    _max?: NestedEnumCookingSkillLevelNullableFilter<$PrismaModel>
  }

  export type NestedEnumProcessingMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProcessingMethod | EnumProcessingMethodFieldRefInput<$PrismaModel>
    in?: $Enums.ProcessingMethod[] | ListEnumProcessingMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProcessingMethod[] | ListEnumProcessingMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumProcessingMethodWithAggregatesFilter<$PrismaModel> | $Enums.ProcessingMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProcessingMethodFilter<$PrismaModel>
    _max?: NestedEnumProcessingMethodFilter<$PrismaModel>
  }

  export type NestedEnumCategorySourceNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CategorySource | EnumCategorySourceFieldRefInput<$PrismaModel> | null
    in?: $Enums.CategorySource[] | ListEnumCategorySourceFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CategorySource[] | ListEnumCategorySourceFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCategorySourceNullableFilter<$PrismaModel> | $Enums.CategorySource | null
  }

  export type NestedEnumCategorySourceNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CategorySource | EnumCategorySourceFieldRefInput<$PrismaModel> | null
    in?: $Enums.CategorySource[] | ListEnumCategorySourceFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CategorySource[] | ListEnumCategorySourceFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCategorySourceNullableWithAggregatesFilter<$PrismaModel> | $Enums.CategorySource | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumCategorySourceNullableFilter<$PrismaModel>
    _max?: NestedEnumCategorySourceNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type RecipeCreateWithoutUserInput = {
    id?: string
    title: string
    description: string
    ingredients?: RecipeCreateingredientsInput | string[]
    steps?: RecipeCreatestepsInput | string[]
    image?: string | null
    cuisine: string
    category: string
    prepTime: string
    cleanupTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
    categorySource?: $Enums.CategorySource | null
    categoryConfidence?: number | null
    originalCategory?: string | null
    favorites?: RecipeFavoriteCreateNestedManyWithoutRecipeInput
    images?: RecipeImageCreateNestedManyWithoutRecipeInput
  }

  export type RecipeUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    description: string
    ingredients?: RecipeCreateingredientsInput | string[]
    steps?: RecipeCreatestepsInput | string[]
    image?: string | null
    cuisine: string
    category: string
    prepTime: string
    cleanupTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
    categorySource?: $Enums.CategorySource | null
    categoryConfidence?: number | null
    originalCategory?: string | null
    favorites?: RecipeFavoriteUncheckedCreateNestedManyWithoutRecipeInput
    images?: RecipeImageUncheckedCreateNestedManyWithoutRecipeInput
  }

  export type RecipeCreateOrConnectWithoutUserInput = {
    where: RecipeWhereUniqueInput
    create: XOR<RecipeCreateWithoutUserInput, RecipeUncheckedCreateWithoutUserInput>
  }

  export type RecipeCreateManyUserInputEnvelope = {
    data: RecipeCreateManyUserInput | RecipeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RecipeFavoriteCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    recipe: RecipeCreateNestedOneWithoutFavoritesInput
  }

  export type RecipeFavoriteUncheckedCreateWithoutUserInput = {
    id?: string
    recipeId: string
    createdAt?: Date | string
  }

  export type RecipeFavoriteCreateOrConnectWithoutUserInput = {
    where: RecipeFavoriteWhereUniqueInput
    create: XOR<RecipeFavoriteCreateWithoutUserInput, RecipeFavoriteUncheckedCreateWithoutUserInput>
  }

  export type RecipeFavoriteCreateManyUserInputEnvelope = {
    data: RecipeFavoriteCreateManyUserInput | RecipeFavoriteCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RecipeUpsertWithWhereUniqueWithoutUserInput = {
    where: RecipeWhereUniqueInput
    update: XOR<RecipeUpdateWithoutUserInput, RecipeUncheckedUpdateWithoutUserInput>
    create: XOR<RecipeCreateWithoutUserInput, RecipeUncheckedCreateWithoutUserInput>
  }

  export type RecipeUpdateWithWhereUniqueWithoutUserInput = {
    where: RecipeWhereUniqueInput
    data: XOR<RecipeUpdateWithoutUserInput, RecipeUncheckedUpdateWithoutUserInput>
  }

  export type RecipeUpdateManyWithWhereWithoutUserInput = {
    where: RecipeScalarWhereInput
    data: XOR<RecipeUpdateManyMutationInput, RecipeUncheckedUpdateManyWithoutUserInput>
  }

  export type RecipeScalarWhereInput = {
    AND?: RecipeScalarWhereInput | RecipeScalarWhereInput[]
    OR?: RecipeScalarWhereInput[]
    NOT?: RecipeScalarWhereInput | RecipeScalarWhereInput[]
    id?: StringFilter<"Recipe"> | string
    title?: StringFilter<"Recipe"> | string
    description?: StringFilter<"Recipe"> | string
    ingredients?: StringNullableListFilter<"Recipe">
    steps?: StringNullableListFilter<"Recipe">
    image?: StringNullableFilter<"Recipe"> | string | null
    cuisine?: StringFilter<"Recipe"> | string
    category?: StringFilter<"Recipe"> | string
    prepTime?: StringFilter<"Recipe"> | string
    cleanupTime?: StringFilter<"Recipe"> | string
    createdAt?: DateTimeFilter<"Recipe"> | Date | string
    updatedAt?: DateTimeFilter<"Recipe"> | Date | string
    categorySource?: EnumCategorySourceNullableFilter<"Recipe"> | $Enums.CategorySource | null
    categoryConfidence?: FloatNullableFilter<"Recipe"> | number | null
    originalCategory?: StringNullableFilter<"Recipe"> | string | null
    userId?: StringFilter<"Recipe"> | string
  }

  export type RecipeFavoriteUpsertWithWhereUniqueWithoutUserInput = {
    where: RecipeFavoriteWhereUniqueInput
    update: XOR<RecipeFavoriteUpdateWithoutUserInput, RecipeFavoriteUncheckedUpdateWithoutUserInput>
    create: XOR<RecipeFavoriteCreateWithoutUserInput, RecipeFavoriteUncheckedCreateWithoutUserInput>
  }

  export type RecipeFavoriteUpdateWithWhereUniqueWithoutUserInput = {
    where: RecipeFavoriteWhereUniqueInput
    data: XOR<RecipeFavoriteUpdateWithoutUserInput, RecipeFavoriteUncheckedUpdateWithoutUserInput>
  }

  export type RecipeFavoriteUpdateManyWithWhereWithoutUserInput = {
    where: RecipeFavoriteScalarWhereInput
    data: XOR<RecipeFavoriteUpdateManyMutationInput, RecipeFavoriteUncheckedUpdateManyWithoutUserInput>
  }

  export type RecipeFavoriteScalarWhereInput = {
    AND?: RecipeFavoriteScalarWhereInput | RecipeFavoriteScalarWhereInput[]
    OR?: RecipeFavoriteScalarWhereInput[]
    NOT?: RecipeFavoriteScalarWhereInput | RecipeFavoriteScalarWhereInput[]
    id?: StringFilter<"RecipeFavorite"> | string
    userId?: StringFilter<"RecipeFavorite"> | string
    recipeId?: StringFilter<"RecipeFavorite"> | string
    createdAt?: DateTimeFilter<"RecipeFavorite"> | Date | string
  }

  export type UserCreateWithoutRecipesInput = {
    id: string
    email: string
    firstName?: string | null
    lastName?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    onboardingCompleted?: boolean
    onboardingStep?: number | null
    cookingSkillLevel?: $Enums.CookingSkillLevel | null
    dietaryPreferences?: UserCreatedietaryPreferencesInput | $Enums.DietaryPreference[]
    favoriteCuisines?: UserCreatefavoriteCuisinesInput | string[]
    householdSize?: number | null
    defaultProcessingMethod?: $Enums.ProcessingMethod
    preferredCategories?: UserCreatepreferredCategoriesInput | string[]
    timezone?: string | null
    measurementSystem?: string | null
    favorites?: RecipeFavoriteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRecipesInput = {
    id: string
    email: string
    firstName?: string | null
    lastName?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    onboardingCompleted?: boolean
    onboardingStep?: number | null
    cookingSkillLevel?: $Enums.CookingSkillLevel | null
    dietaryPreferences?: UserCreatedietaryPreferencesInput | $Enums.DietaryPreference[]
    favoriteCuisines?: UserCreatefavoriteCuisinesInput | string[]
    householdSize?: number | null
    defaultProcessingMethod?: $Enums.ProcessingMethod
    preferredCategories?: UserCreatepreferredCategoriesInput | string[]
    timezone?: string | null
    measurementSystem?: string | null
    favorites?: RecipeFavoriteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRecipesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRecipesInput, UserUncheckedCreateWithoutRecipesInput>
  }

  export type RecipeFavoriteCreateWithoutRecipeInput = {
    id?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFavoritesInput
  }

  export type RecipeFavoriteUncheckedCreateWithoutRecipeInput = {
    id?: string
    userId: string
    createdAt?: Date | string
  }

  export type RecipeFavoriteCreateOrConnectWithoutRecipeInput = {
    where: RecipeFavoriteWhereUniqueInput
    create: XOR<RecipeFavoriteCreateWithoutRecipeInput, RecipeFavoriteUncheckedCreateWithoutRecipeInput>
  }

  export type RecipeFavoriteCreateManyRecipeInputEnvelope = {
    data: RecipeFavoriteCreateManyRecipeInput | RecipeFavoriteCreateManyRecipeInput[]
    skipDuplicates?: boolean
  }

  export type RecipeImageCreateWithoutRecipeInput = {
    id?: string
    url: string
    alt?: string | null
    isPrimary?: boolean
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecipeImageUncheckedCreateWithoutRecipeInput = {
    id?: string
    url: string
    alt?: string | null
    isPrimary?: boolean
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecipeImageCreateOrConnectWithoutRecipeInput = {
    where: RecipeImageWhereUniqueInput
    create: XOR<RecipeImageCreateWithoutRecipeInput, RecipeImageUncheckedCreateWithoutRecipeInput>
  }

  export type RecipeImageCreateManyRecipeInputEnvelope = {
    data: RecipeImageCreateManyRecipeInput | RecipeImageCreateManyRecipeInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutRecipesInput = {
    update: XOR<UserUpdateWithoutRecipesInput, UserUncheckedUpdateWithoutRecipesInput>
    create: XOR<UserCreateWithoutRecipesInput, UserUncheckedCreateWithoutRecipesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRecipesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRecipesInput, UserUncheckedUpdateWithoutRecipesInput>
  }

  export type UserUpdateWithoutRecipesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    onboardingCompleted?: BoolFieldUpdateOperationsInput | boolean
    onboardingStep?: NullableIntFieldUpdateOperationsInput | number | null
    cookingSkillLevel?: NullableEnumCookingSkillLevelFieldUpdateOperationsInput | $Enums.CookingSkillLevel | null
    dietaryPreferences?: UserUpdatedietaryPreferencesInput | $Enums.DietaryPreference[]
    favoriteCuisines?: UserUpdatefavoriteCuisinesInput | string[]
    householdSize?: NullableIntFieldUpdateOperationsInput | number | null
    defaultProcessingMethod?: EnumProcessingMethodFieldUpdateOperationsInput | $Enums.ProcessingMethod
    preferredCategories?: UserUpdatepreferredCategoriesInput | string[]
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    measurementSystem?: NullableStringFieldUpdateOperationsInput | string | null
    favorites?: RecipeFavoriteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRecipesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    onboardingCompleted?: BoolFieldUpdateOperationsInput | boolean
    onboardingStep?: NullableIntFieldUpdateOperationsInput | number | null
    cookingSkillLevel?: NullableEnumCookingSkillLevelFieldUpdateOperationsInput | $Enums.CookingSkillLevel | null
    dietaryPreferences?: UserUpdatedietaryPreferencesInput | $Enums.DietaryPreference[]
    favoriteCuisines?: UserUpdatefavoriteCuisinesInput | string[]
    householdSize?: NullableIntFieldUpdateOperationsInput | number | null
    defaultProcessingMethod?: EnumProcessingMethodFieldUpdateOperationsInput | $Enums.ProcessingMethod
    preferredCategories?: UserUpdatepreferredCategoriesInput | string[]
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    measurementSystem?: NullableStringFieldUpdateOperationsInput | string | null
    favorites?: RecipeFavoriteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RecipeFavoriteUpsertWithWhereUniqueWithoutRecipeInput = {
    where: RecipeFavoriteWhereUniqueInput
    update: XOR<RecipeFavoriteUpdateWithoutRecipeInput, RecipeFavoriteUncheckedUpdateWithoutRecipeInput>
    create: XOR<RecipeFavoriteCreateWithoutRecipeInput, RecipeFavoriteUncheckedCreateWithoutRecipeInput>
  }

  export type RecipeFavoriteUpdateWithWhereUniqueWithoutRecipeInput = {
    where: RecipeFavoriteWhereUniqueInput
    data: XOR<RecipeFavoriteUpdateWithoutRecipeInput, RecipeFavoriteUncheckedUpdateWithoutRecipeInput>
  }

  export type RecipeFavoriteUpdateManyWithWhereWithoutRecipeInput = {
    where: RecipeFavoriteScalarWhereInput
    data: XOR<RecipeFavoriteUpdateManyMutationInput, RecipeFavoriteUncheckedUpdateManyWithoutRecipeInput>
  }

  export type RecipeImageUpsertWithWhereUniqueWithoutRecipeInput = {
    where: RecipeImageWhereUniqueInput
    update: XOR<RecipeImageUpdateWithoutRecipeInput, RecipeImageUncheckedUpdateWithoutRecipeInput>
    create: XOR<RecipeImageCreateWithoutRecipeInput, RecipeImageUncheckedCreateWithoutRecipeInput>
  }

  export type RecipeImageUpdateWithWhereUniqueWithoutRecipeInput = {
    where: RecipeImageWhereUniqueInput
    data: XOR<RecipeImageUpdateWithoutRecipeInput, RecipeImageUncheckedUpdateWithoutRecipeInput>
  }

  export type RecipeImageUpdateManyWithWhereWithoutRecipeInput = {
    where: RecipeImageScalarWhereInput
    data: XOR<RecipeImageUpdateManyMutationInput, RecipeImageUncheckedUpdateManyWithoutRecipeInput>
  }

  export type RecipeImageScalarWhereInput = {
    AND?: RecipeImageScalarWhereInput | RecipeImageScalarWhereInput[]
    OR?: RecipeImageScalarWhereInput[]
    NOT?: RecipeImageScalarWhereInput | RecipeImageScalarWhereInput[]
    id?: StringFilter<"RecipeImage"> | string
    url?: StringFilter<"RecipeImage"> | string
    alt?: StringNullableFilter<"RecipeImage"> | string | null
    isPrimary?: BoolFilter<"RecipeImage"> | boolean
    order?: IntFilter<"RecipeImage"> | number
    createdAt?: DateTimeFilter<"RecipeImage"> | Date | string
    updatedAt?: DateTimeFilter<"RecipeImage"> | Date | string
    recipeId?: StringFilter<"RecipeImage"> | string
  }

  export type RecipeCreateWithoutImagesInput = {
    id?: string
    title: string
    description: string
    ingredients?: RecipeCreateingredientsInput | string[]
    steps?: RecipeCreatestepsInput | string[]
    image?: string | null
    cuisine: string
    category: string
    prepTime: string
    cleanupTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
    categorySource?: $Enums.CategorySource | null
    categoryConfidence?: number | null
    originalCategory?: string | null
    user: UserCreateNestedOneWithoutRecipesInput
    favorites?: RecipeFavoriteCreateNestedManyWithoutRecipeInput
  }

  export type RecipeUncheckedCreateWithoutImagesInput = {
    id?: string
    title: string
    description: string
    ingredients?: RecipeCreateingredientsInput | string[]
    steps?: RecipeCreatestepsInput | string[]
    image?: string | null
    cuisine: string
    category: string
    prepTime: string
    cleanupTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
    categorySource?: $Enums.CategorySource | null
    categoryConfidence?: number | null
    originalCategory?: string | null
    userId: string
    favorites?: RecipeFavoriteUncheckedCreateNestedManyWithoutRecipeInput
  }

  export type RecipeCreateOrConnectWithoutImagesInput = {
    where: RecipeWhereUniqueInput
    create: XOR<RecipeCreateWithoutImagesInput, RecipeUncheckedCreateWithoutImagesInput>
  }

  export type RecipeUpsertWithoutImagesInput = {
    update: XOR<RecipeUpdateWithoutImagesInput, RecipeUncheckedUpdateWithoutImagesInput>
    create: XOR<RecipeCreateWithoutImagesInput, RecipeUncheckedCreateWithoutImagesInput>
    where?: RecipeWhereInput
  }

  export type RecipeUpdateToOneWithWhereWithoutImagesInput = {
    where?: RecipeWhereInput
    data: XOR<RecipeUpdateWithoutImagesInput, RecipeUncheckedUpdateWithoutImagesInput>
  }

  export type RecipeUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    ingredients?: RecipeUpdateingredientsInput | string[]
    steps?: RecipeUpdatestepsInput | string[]
    image?: NullableStringFieldUpdateOperationsInput | string | null
    cuisine?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    prepTime?: StringFieldUpdateOperationsInput | string
    cleanupTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categorySource?: NullableEnumCategorySourceFieldUpdateOperationsInput | $Enums.CategorySource | null
    categoryConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    originalCategory?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutRecipesNestedInput
    favorites?: RecipeFavoriteUpdateManyWithoutRecipeNestedInput
  }

  export type RecipeUncheckedUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    ingredients?: RecipeUpdateingredientsInput | string[]
    steps?: RecipeUpdatestepsInput | string[]
    image?: NullableStringFieldUpdateOperationsInput | string | null
    cuisine?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    prepTime?: StringFieldUpdateOperationsInput | string
    cleanupTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categorySource?: NullableEnumCategorySourceFieldUpdateOperationsInput | $Enums.CategorySource | null
    categoryConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    originalCategory?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    favorites?: RecipeFavoriteUncheckedUpdateManyWithoutRecipeNestedInput
  }

  export type UserCreateWithoutFavoritesInput = {
    id: string
    email: string
    firstName?: string | null
    lastName?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    onboardingCompleted?: boolean
    onboardingStep?: number | null
    cookingSkillLevel?: $Enums.CookingSkillLevel | null
    dietaryPreferences?: UserCreatedietaryPreferencesInput | $Enums.DietaryPreference[]
    favoriteCuisines?: UserCreatefavoriteCuisinesInput | string[]
    householdSize?: number | null
    defaultProcessingMethod?: $Enums.ProcessingMethod
    preferredCategories?: UserCreatepreferredCategoriesInput | string[]
    timezone?: string | null
    measurementSystem?: string | null
    recipes?: RecipeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFavoritesInput = {
    id: string
    email: string
    firstName?: string | null
    lastName?: string | null
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    onboardingCompleted?: boolean
    onboardingStep?: number | null
    cookingSkillLevel?: $Enums.CookingSkillLevel | null
    dietaryPreferences?: UserCreatedietaryPreferencesInput | $Enums.DietaryPreference[]
    favoriteCuisines?: UserCreatefavoriteCuisinesInput | string[]
    householdSize?: number | null
    defaultProcessingMethod?: $Enums.ProcessingMethod
    preferredCategories?: UserCreatepreferredCategoriesInput | string[]
    timezone?: string | null
    measurementSystem?: string | null
    recipes?: RecipeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFavoritesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
  }

  export type RecipeCreateWithoutFavoritesInput = {
    id?: string
    title: string
    description: string
    ingredients?: RecipeCreateingredientsInput | string[]
    steps?: RecipeCreatestepsInput | string[]
    image?: string | null
    cuisine: string
    category: string
    prepTime: string
    cleanupTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
    categorySource?: $Enums.CategorySource | null
    categoryConfidence?: number | null
    originalCategory?: string | null
    user: UserCreateNestedOneWithoutRecipesInput
    images?: RecipeImageCreateNestedManyWithoutRecipeInput
  }

  export type RecipeUncheckedCreateWithoutFavoritesInput = {
    id?: string
    title: string
    description: string
    ingredients?: RecipeCreateingredientsInput | string[]
    steps?: RecipeCreatestepsInput | string[]
    image?: string | null
    cuisine: string
    category: string
    prepTime: string
    cleanupTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
    categorySource?: $Enums.CategorySource | null
    categoryConfidence?: number | null
    originalCategory?: string | null
    userId: string
    images?: RecipeImageUncheckedCreateNestedManyWithoutRecipeInput
  }

  export type RecipeCreateOrConnectWithoutFavoritesInput = {
    where: RecipeWhereUniqueInput
    create: XOR<RecipeCreateWithoutFavoritesInput, RecipeUncheckedCreateWithoutFavoritesInput>
  }

  export type UserUpsertWithoutFavoritesInput = {
    update: XOR<UserUpdateWithoutFavoritesInput, UserUncheckedUpdateWithoutFavoritesInput>
    create: XOR<UserCreateWithoutFavoritesInput, UserUncheckedCreateWithoutFavoritesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFavoritesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFavoritesInput, UserUncheckedUpdateWithoutFavoritesInput>
  }

  export type UserUpdateWithoutFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    onboardingCompleted?: BoolFieldUpdateOperationsInput | boolean
    onboardingStep?: NullableIntFieldUpdateOperationsInput | number | null
    cookingSkillLevel?: NullableEnumCookingSkillLevelFieldUpdateOperationsInput | $Enums.CookingSkillLevel | null
    dietaryPreferences?: UserUpdatedietaryPreferencesInput | $Enums.DietaryPreference[]
    favoriteCuisines?: UserUpdatefavoriteCuisinesInput | string[]
    householdSize?: NullableIntFieldUpdateOperationsInput | number | null
    defaultProcessingMethod?: EnumProcessingMethodFieldUpdateOperationsInput | $Enums.ProcessingMethod
    preferredCategories?: UserUpdatepreferredCategoriesInput | string[]
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    measurementSystem?: NullableStringFieldUpdateOperationsInput | string | null
    recipes?: RecipeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    onboardingCompleted?: BoolFieldUpdateOperationsInput | boolean
    onboardingStep?: NullableIntFieldUpdateOperationsInput | number | null
    cookingSkillLevel?: NullableEnumCookingSkillLevelFieldUpdateOperationsInput | $Enums.CookingSkillLevel | null
    dietaryPreferences?: UserUpdatedietaryPreferencesInput | $Enums.DietaryPreference[]
    favoriteCuisines?: UserUpdatefavoriteCuisinesInput | string[]
    householdSize?: NullableIntFieldUpdateOperationsInput | number | null
    defaultProcessingMethod?: EnumProcessingMethodFieldUpdateOperationsInput | $Enums.ProcessingMethod
    preferredCategories?: UserUpdatepreferredCategoriesInput | string[]
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    measurementSystem?: NullableStringFieldUpdateOperationsInput | string | null
    recipes?: RecipeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RecipeUpsertWithoutFavoritesInput = {
    update: XOR<RecipeUpdateWithoutFavoritesInput, RecipeUncheckedUpdateWithoutFavoritesInput>
    create: XOR<RecipeCreateWithoutFavoritesInput, RecipeUncheckedCreateWithoutFavoritesInput>
    where?: RecipeWhereInput
  }

  export type RecipeUpdateToOneWithWhereWithoutFavoritesInput = {
    where?: RecipeWhereInput
    data: XOR<RecipeUpdateWithoutFavoritesInput, RecipeUncheckedUpdateWithoutFavoritesInput>
  }

  export type RecipeUpdateWithoutFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    ingredients?: RecipeUpdateingredientsInput | string[]
    steps?: RecipeUpdatestepsInput | string[]
    image?: NullableStringFieldUpdateOperationsInput | string | null
    cuisine?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    prepTime?: StringFieldUpdateOperationsInput | string
    cleanupTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categorySource?: NullableEnumCategorySourceFieldUpdateOperationsInput | $Enums.CategorySource | null
    categoryConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    originalCategory?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutRecipesNestedInput
    images?: RecipeImageUpdateManyWithoutRecipeNestedInput
  }

  export type RecipeUncheckedUpdateWithoutFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    ingredients?: RecipeUpdateingredientsInput | string[]
    steps?: RecipeUpdatestepsInput | string[]
    image?: NullableStringFieldUpdateOperationsInput | string | null
    cuisine?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    prepTime?: StringFieldUpdateOperationsInput | string
    cleanupTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categorySource?: NullableEnumCategorySourceFieldUpdateOperationsInput | $Enums.CategorySource | null
    categoryConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    originalCategory?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    images?: RecipeImageUncheckedUpdateManyWithoutRecipeNestedInput
  }

  export type RecipeCreateManyUserInput = {
    id?: string
    title: string
    description: string
    ingredients?: RecipeCreateingredientsInput | string[]
    steps?: RecipeCreatestepsInput | string[]
    image?: string | null
    cuisine: string
    category: string
    prepTime: string
    cleanupTime: string
    createdAt?: Date | string
    updatedAt?: Date | string
    categorySource?: $Enums.CategorySource | null
    categoryConfidence?: number | null
    originalCategory?: string | null
  }

  export type RecipeFavoriteCreateManyUserInput = {
    id?: string
    recipeId: string
    createdAt?: Date | string
  }

  export type RecipeUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    ingredients?: RecipeUpdateingredientsInput | string[]
    steps?: RecipeUpdatestepsInput | string[]
    image?: NullableStringFieldUpdateOperationsInput | string | null
    cuisine?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    prepTime?: StringFieldUpdateOperationsInput | string
    cleanupTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categorySource?: NullableEnumCategorySourceFieldUpdateOperationsInput | $Enums.CategorySource | null
    categoryConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    originalCategory?: NullableStringFieldUpdateOperationsInput | string | null
    favorites?: RecipeFavoriteUpdateManyWithoutRecipeNestedInput
    images?: RecipeImageUpdateManyWithoutRecipeNestedInput
  }

  export type RecipeUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    ingredients?: RecipeUpdateingredientsInput | string[]
    steps?: RecipeUpdatestepsInput | string[]
    image?: NullableStringFieldUpdateOperationsInput | string | null
    cuisine?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    prepTime?: StringFieldUpdateOperationsInput | string
    cleanupTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categorySource?: NullableEnumCategorySourceFieldUpdateOperationsInput | $Enums.CategorySource | null
    categoryConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    originalCategory?: NullableStringFieldUpdateOperationsInput | string | null
    favorites?: RecipeFavoriteUncheckedUpdateManyWithoutRecipeNestedInput
    images?: RecipeImageUncheckedUpdateManyWithoutRecipeNestedInput
  }

  export type RecipeUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    ingredients?: RecipeUpdateingredientsInput | string[]
    steps?: RecipeUpdatestepsInput | string[]
    image?: NullableStringFieldUpdateOperationsInput | string | null
    cuisine?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    prepTime?: StringFieldUpdateOperationsInput | string
    cleanupTime?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categorySource?: NullableEnumCategorySourceFieldUpdateOperationsInput | $Enums.CategorySource | null
    categoryConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    originalCategory?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RecipeFavoriteUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipe?: RecipeUpdateOneRequiredWithoutFavoritesNestedInput
  }

  export type RecipeFavoriteUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    recipeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeFavoriteUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    recipeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeFavoriteCreateManyRecipeInput = {
    id?: string
    userId: string
    createdAt?: Date | string
  }

  export type RecipeImageCreateManyRecipeInput = {
    id?: string
    url: string
    alt?: string | null
    isPrimary?: boolean
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecipeFavoriteUpdateWithoutRecipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFavoritesNestedInput
  }

  export type RecipeFavoriteUncheckedUpdateWithoutRecipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeFavoriteUncheckedUpdateManyWithoutRecipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeImageUpdateWithoutRecipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    alt?: NullableStringFieldUpdateOperationsInput | string | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeImageUncheckedUpdateWithoutRecipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    alt?: NullableStringFieldUpdateOperationsInput | string | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeImageUncheckedUpdateManyWithoutRecipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    alt?: NullableStringFieldUpdateOperationsInput | string | null
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}