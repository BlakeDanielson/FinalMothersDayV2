
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
 * Model UserOnboardingProgress
 * 
 */
export type UserOnboardingProgress = $Result.DefaultSelection<Prisma.$UserOnboardingProgressPayload>
/**
 * Model RecipeExtractionMetrics
 * 
 */
export type RecipeExtractionMetrics = $Result.DefaultSelection<Prisma.$RecipeExtractionMetricsPayload>
/**
 * Model DomainPerformanceMetrics
 * 
 */
export type DomainPerformanceMetrics = $Result.DefaultSelection<Prisma.$DomainPerformanceMetricsPayload>
/**
 * Model AIProviderCosts
 * 
 */
export type AIProviderCosts = $Result.DefaultSelection<Prisma.$AIProviderCostsPayload>
/**
 * Model AnonymousSession
 * 
 */
export type AnonymousSession = $Result.DefaultSelection<Prisma.$AnonymousSessionPayload>
/**
 * Model ConversionEvent
 * 
 */
export type ConversionEvent = $Result.DefaultSelection<Prisma.$ConversionEventPayload>
/**
 * Model DailyRateLimit
 * 
 */
export type DailyRateLimit = $Result.DefaultSelection<Prisma.$DailyRateLimitPayload>
/**
 * Model InternalRecipeData
 * 
 */
export type InternalRecipeData = $Result.DefaultSelection<Prisma.$InternalRecipeDataPayload>

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


export const ExtractionStrategy: {
  URL_DIRECT: 'URL_DIRECT',
  HTML_FALLBACK: 'HTML_FALLBACK'
};

export type ExtractionStrategy = (typeof ExtractionStrategy)[keyof typeof ExtractionStrategy]


export const AIProvider: {
  OPENAI_MINI: 'OPENAI_MINI',
  OPENAI_MAIN: 'OPENAI_MAIN',
  GEMINI_MAIN: 'GEMINI_MAIN',
  GEMINI_FLASH: 'GEMINI_FLASH'
};

export type AIProvider = (typeof AIProvider)[keyof typeof AIProvider]


export const ConversionEventType: {
  SESSION_STARTED: 'SESSION_STARTED',
  RECIPE_EXTRACTED: 'RECIPE_EXTRACTED',
  RATE_LIMIT_HIT: 'RATE_LIMIT_HIT',
  SIGNUP_PROMPT_SHOWN: 'SIGNUP_PROMPT_SHOWN',
  SIGNUP_CLICKED: 'SIGNUP_CLICKED',
  SIGNUP_COMPLETED: 'SIGNUP_COMPLETED',
  RECIPE_SAVE_ATTEMPTED: 'RECIPE_SAVE_ATTEMPTED',
  FEATURE_INTERACTION: 'FEATURE_INTERACTION'
};

export type ConversionEventType = (typeof ConversionEventType)[keyof typeof ConversionEventType]

}

export type CookingSkillLevel = $Enums.CookingSkillLevel

export const CookingSkillLevel: typeof $Enums.CookingSkillLevel

export type DietaryPreference = $Enums.DietaryPreference

export const DietaryPreference: typeof $Enums.DietaryPreference

export type ProcessingMethod = $Enums.ProcessingMethod

export const ProcessingMethod: typeof $Enums.ProcessingMethod

export type CategorySource = $Enums.CategorySource

export const CategorySource: typeof $Enums.CategorySource

export type ExtractionStrategy = $Enums.ExtractionStrategy

export const ExtractionStrategy: typeof $Enums.ExtractionStrategy

export type AIProvider = $Enums.AIProvider

export const AIProvider: typeof $Enums.AIProvider

export type ConversionEventType = $Enums.ConversionEventType

export const ConversionEventType: typeof $Enums.ConversionEventType

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

  /**
   * `prisma.userOnboardingProgress`: Exposes CRUD operations for the **UserOnboardingProgress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserOnboardingProgresses
    * const userOnboardingProgresses = await prisma.userOnboardingProgress.findMany()
    * ```
    */
  get userOnboardingProgress(): Prisma.UserOnboardingProgressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.recipeExtractionMetrics`: Exposes CRUD operations for the **RecipeExtractionMetrics** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RecipeExtractionMetrics
    * const recipeExtractionMetrics = await prisma.recipeExtractionMetrics.findMany()
    * ```
    */
  get recipeExtractionMetrics(): Prisma.RecipeExtractionMetricsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.domainPerformanceMetrics`: Exposes CRUD operations for the **DomainPerformanceMetrics** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DomainPerformanceMetrics
    * const domainPerformanceMetrics = await prisma.domainPerformanceMetrics.findMany()
    * ```
    */
  get domainPerformanceMetrics(): Prisma.DomainPerformanceMetricsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aIProviderCosts`: Exposes CRUD operations for the **AIProviderCosts** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIProviderCosts
    * const aIProviderCosts = await prisma.aIProviderCosts.findMany()
    * ```
    */
  get aIProviderCosts(): Prisma.AIProviderCostsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.anonymousSession`: Exposes CRUD operations for the **AnonymousSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AnonymousSessions
    * const anonymousSessions = await prisma.anonymousSession.findMany()
    * ```
    */
  get anonymousSession(): Prisma.AnonymousSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.conversionEvent`: Exposes CRUD operations for the **ConversionEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ConversionEvents
    * const conversionEvents = await prisma.conversionEvent.findMany()
    * ```
    */
  get conversionEvent(): Prisma.ConversionEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dailyRateLimit`: Exposes CRUD operations for the **DailyRateLimit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DailyRateLimits
    * const dailyRateLimits = await prisma.dailyRateLimit.findMany()
    * ```
    */
  get dailyRateLimit(): Prisma.DailyRateLimitDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.internalRecipeData`: Exposes CRUD operations for the **InternalRecipeData** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InternalRecipeData
    * const internalRecipeData = await prisma.internalRecipeData.findMany()
    * ```
    */
  get internalRecipeData(): Prisma.InternalRecipeDataDelegate<ExtArgs, ClientOptions>;
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
    RecipeFavorite: 'RecipeFavorite',
    UserOnboardingProgress: 'UserOnboardingProgress',
    RecipeExtractionMetrics: 'RecipeExtractionMetrics',
    DomainPerformanceMetrics: 'DomainPerformanceMetrics',
    AIProviderCosts: 'AIProviderCosts',
    AnonymousSession: 'AnonymousSession',
    ConversionEvent: 'ConversionEvent',
    DailyRateLimit: 'DailyRateLimit',
    InternalRecipeData: 'InternalRecipeData'
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
      modelProps: "user" | "recipe" | "recipeImage" | "recipeFavorite" | "userOnboardingProgress" | "recipeExtractionMetrics" | "domainPerformanceMetrics" | "aIProviderCosts" | "anonymousSession" | "conversionEvent" | "dailyRateLimit" | "internalRecipeData"
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
      UserOnboardingProgress: {
        payload: Prisma.$UserOnboardingProgressPayload<ExtArgs>
        fields: Prisma.UserOnboardingProgressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserOnboardingProgressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOnboardingProgressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserOnboardingProgressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOnboardingProgressPayload>
          }
          findFirst: {
            args: Prisma.UserOnboardingProgressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOnboardingProgressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserOnboardingProgressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOnboardingProgressPayload>
          }
          findMany: {
            args: Prisma.UserOnboardingProgressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOnboardingProgressPayload>[]
          }
          create: {
            args: Prisma.UserOnboardingProgressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOnboardingProgressPayload>
          }
          createMany: {
            args: Prisma.UserOnboardingProgressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserOnboardingProgressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOnboardingProgressPayload>[]
          }
          delete: {
            args: Prisma.UserOnboardingProgressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOnboardingProgressPayload>
          }
          update: {
            args: Prisma.UserOnboardingProgressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOnboardingProgressPayload>
          }
          deleteMany: {
            args: Prisma.UserOnboardingProgressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserOnboardingProgressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserOnboardingProgressUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOnboardingProgressPayload>[]
          }
          upsert: {
            args: Prisma.UserOnboardingProgressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserOnboardingProgressPayload>
          }
          aggregate: {
            args: Prisma.UserOnboardingProgressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserOnboardingProgress>
          }
          groupBy: {
            args: Prisma.UserOnboardingProgressGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserOnboardingProgressGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserOnboardingProgressCountArgs<ExtArgs>
            result: $Utils.Optional<UserOnboardingProgressCountAggregateOutputType> | number
          }
        }
      }
      RecipeExtractionMetrics: {
        payload: Prisma.$RecipeExtractionMetricsPayload<ExtArgs>
        fields: Prisma.RecipeExtractionMetricsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecipeExtractionMetricsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeExtractionMetricsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecipeExtractionMetricsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeExtractionMetricsPayload>
          }
          findFirst: {
            args: Prisma.RecipeExtractionMetricsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeExtractionMetricsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecipeExtractionMetricsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeExtractionMetricsPayload>
          }
          findMany: {
            args: Prisma.RecipeExtractionMetricsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeExtractionMetricsPayload>[]
          }
          create: {
            args: Prisma.RecipeExtractionMetricsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeExtractionMetricsPayload>
          }
          createMany: {
            args: Prisma.RecipeExtractionMetricsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RecipeExtractionMetricsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeExtractionMetricsPayload>[]
          }
          delete: {
            args: Prisma.RecipeExtractionMetricsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeExtractionMetricsPayload>
          }
          update: {
            args: Prisma.RecipeExtractionMetricsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeExtractionMetricsPayload>
          }
          deleteMany: {
            args: Prisma.RecipeExtractionMetricsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecipeExtractionMetricsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RecipeExtractionMetricsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeExtractionMetricsPayload>[]
          }
          upsert: {
            args: Prisma.RecipeExtractionMetricsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecipeExtractionMetricsPayload>
          }
          aggregate: {
            args: Prisma.RecipeExtractionMetricsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecipeExtractionMetrics>
          }
          groupBy: {
            args: Prisma.RecipeExtractionMetricsGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecipeExtractionMetricsGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecipeExtractionMetricsCountArgs<ExtArgs>
            result: $Utils.Optional<RecipeExtractionMetricsCountAggregateOutputType> | number
          }
        }
      }
      DomainPerformanceMetrics: {
        payload: Prisma.$DomainPerformanceMetricsPayload<ExtArgs>
        fields: Prisma.DomainPerformanceMetricsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DomainPerformanceMetricsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPerformanceMetricsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DomainPerformanceMetricsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPerformanceMetricsPayload>
          }
          findFirst: {
            args: Prisma.DomainPerformanceMetricsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPerformanceMetricsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DomainPerformanceMetricsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPerformanceMetricsPayload>
          }
          findMany: {
            args: Prisma.DomainPerformanceMetricsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPerformanceMetricsPayload>[]
          }
          create: {
            args: Prisma.DomainPerformanceMetricsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPerformanceMetricsPayload>
          }
          createMany: {
            args: Prisma.DomainPerformanceMetricsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DomainPerformanceMetricsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPerformanceMetricsPayload>[]
          }
          delete: {
            args: Prisma.DomainPerformanceMetricsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPerformanceMetricsPayload>
          }
          update: {
            args: Prisma.DomainPerformanceMetricsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPerformanceMetricsPayload>
          }
          deleteMany: {
            args: Prisma.DomainPerformanceMetricsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DomainPerformanceMetricsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DomainPerformanceMetricsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPerformanceMetricsPayload>[]
          }
          upsert: {
            args: Prisma.DomainPerformanceMetricsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPerformanceMetricsPayload>
          }
          aggregate: {
            args: Prisma.DomainPerformanceMetricsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDomainPerformanceMetrics>
          }
          groupBy: {
            args: Prisma.DomainPerformanceMetricsGroupByArgs<ExtArgs>
            result: $Utils.Optional<DomainPerformanceMetricsGroupByOutputType>[]
          }
          count: {
            args: Prisma.DomainPerformanceMetricsCountArgs<ExtArgs>
            result: $Utils.Optional<DomainPerformanceMetricsCountAggregateOutputType> | number
          }
        }
      }
      AIProviderCosts: {
        payload: Prisma.$AIProviderCostsPayload<ExtArgs>
        fields: Prisma.AIProviderCostsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIProviderCostsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIProviderCostsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIProviderCostsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIProviderCostsPayload>
          }
          findFirst: {
            args: Prisma.AIProviderCostsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIProviderCostsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIProviderCostsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIProviderCostsPayload>
          }
          findMany: {
            args: Prisma.AIProviderCostsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIProviderCostsPayload>[]
          }
          create: {
            args: Prisma.AIProviderCostsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIProviderCostsPayload>
          }
          createMany: {
            args: Prisma.AIProviderCostsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIProviderCostsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIProviderCostsPayload>[]
          }
          delete: {
            args: Prisma.AIProviderCostsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIProviderCostsPayload>
          }
          update: {
            args: Prisma.AIProviderCostsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIProviderCostsPayload>
          }
          deleteMany: {
            args: Prisma.AIProviderCostsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIProviderCostsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIProviderCostsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIProviderCostsPayload>[]
          }
          upsert: {
            args: Prisma.AIProviderCostsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIProviderCostsPayload>
          }
          aggregate: {
            args: Prisma.AIProviderCostsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIProviderCosts>
          }
          groupBy: {
            args: Prisma.AIProviderCostsGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIProviderCostsGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIProviderCostsCountArgs<ExtArgs>
            result: $Utils.Optional<AIProviderCostsCountAggregateOutputType> | number
          }
        }
      }
      AnonymousSession: {
        payload: Prisma.$AnonymousSessionPayload<ExtArgs>
        fields: Prisma.AnonymousSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnonymousSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnonymousSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousSessionPayload>
          }
          findFirst: {
            args: Prisma.AnonymousSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnonymousSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousSessionPayload>
          }
          findMany: {
            args: Prisma.AnonymousSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousSessionPayload>[]
          }
          create: {
            args: Prisma.AnonymousSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousSessionPayload>
          }
          createMany: {
            args: Prisma.AnonymousSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnonymousSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousSessionPayload>[]
          }
          delete: {
            args: Prisma.AnonymousSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousSessionPayload>
          }
          update: {
            args: Prisma.AnonymousSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousSessionPayload>
          }
          deleteMany: {
            args: Prisma.AnonymousSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnonymousSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AnonymousSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousSessionPayload>[]
          }
          upsert: {
            args: Prisma.AnonymousSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnonymousSessionPayload>
          }
          aggregate: {
            args: Prisma.AnonymousSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnonymousSession>
          }
          groupBy: {
            args: Prisma.AnonymousSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnonymousSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnonymousSessionCountArgs<ExtArgs>
            result: $Utils.Optional<AnonymousSessionCountAggregateOutputType> | number
          }
        }
      }
      ConversionEvent: {
        payload: Prisma.$ConversionEventPayload<ExtArgs>
        fields: Prisma.ConversionEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConversionEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversionEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConversionEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversionEventPayload>
          }
          findFirst: {
            args: Prisma.ConversionEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversionEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConversionEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversionEventPayload>
          }
          findMany: {
            args: Prisma.ConversionEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversionEventPayload>[]
          }
          create: {
            args: Prisma.ConversionEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversionEventPayload>
          }
          createMany: {
            args: Prisma.ConversionEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConversionEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversionEventPayload>[]
          }
          delete: {
            args: Prisma.ConversionEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversionEventPayload>
          }
          update: {
            args: Prisma.ConversionEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversionEventPayload>
          }
          deleteMany: {
            args: Prisma.ConversionEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConversionEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConversionEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversionEventPayload>[]
          }
          upsert: {
            args: Prisma.ConversionEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversionEventPayload>
          }
          aggregate: {
            args: Prisma.ConversionEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConversionEvent>
          }
          groupBy: {
            args: Prisma.ConversionEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConversionEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConversionEventCountArgs<ExtArgs>
            result: $Utils.Optional<ConversionEventCountAggregateOutputType> | number
          }
        }
      }
      DailyRateLimit: {
        payload: Prisma.$DailyRateLimitPayload<ExtArgs>
        fields: Prisma.DailyRateLimitFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DailyRateLimitFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyRateLimitPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DailyRateLimitFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyRateLimitPayload>
          }
          findFirst: {
            args: Prisma.DailyRateLimitFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyRateLimitPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DailyRateLimitFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyRateLimitPayload>
          }
          findMany: {
            args: Prisma.DailyRateLimitFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyRateLimitPayload>[]
          }
          create: {
            args: Prisma.DailyRateLimitCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyRateLimitPayload>
          }
          createMany: {
            args: Prisma.DailyRateLimitCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DailyRateLimitCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyRateLimitPayload>[]
          }
          delete: {
            args: Prisma.DailyRateLimitDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyRateLimitPayload>
          }
          update: {
            args: Prisma.DailyRateLimitUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyRateLimitPayload>
          }
          deleteMany: {
            args: Prisma.DailyRateLimitDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DailyRateLimitUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DailyRateLimitUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyRateLimitPayload>[]
          }
          upsert: {
            args: Prisma.DailyRateLimitUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyRateLimitPayload>
          }
          aggregate: {
            args: Prisma.DailyRateLimitAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDailyRateLimit>
          }
          groupBy: {
            args: Prisma.DailyRateLimitGroupByArgs<ExtArgs>
            result: $Utils.Optional<DailyRateLimitGroupByOutputType>[]
          }
          count: {
            args: Prisma.DailyRateLimitCountArgs<ExtArgs>
            result: $Utils.Optional<DailyRateLimitCountAggregateOutputType> | number
          }
        }
      }
      InternalRecipeData: {
        payload: Prisma.$InternalRecipeDataPayload<ExtArgs>
        fields: Prisma.InternalRecipeDataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InternalRecipeDataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InternalRecipeDataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InternalRecipeDataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InternalRecipeDataPayload>
          }
          findFirst: {
            args: Prisma.InternalRecipeDataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InternalRecipeDataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InternalRecipeDataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InternalRecipeDataPayload>
          }
          findMany: {
            args: Prisma.InternalRecipeDataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InternalRecipeDataPayload>[]
          }
          create: {
            args: Prisma.InternalRecipeDataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InternalRecipeDataPayload>
          }
          createMany: {
            args: Prisma.InternalRecipeDataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InternalRecipeDataCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InternalRecipeDataPayload>[]
          }
          delete: {
            args: Prisma.InternalRecipeDataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InternalRecipeDataPayload>
          }
          update: {
            args: Prisma.InternalRecipeDataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InternalRecipeDataPayload>
          }
          deleteMany: {
            args: Prisma.InternalRecipeDataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InternalRecipeDataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InternalRecipeDataUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InternalRecipeDataPayload>[]
          }
          upsert: {
            args: Prisma.InternalRecipeDataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InternalRecipeDataPayload>
          }
          aggregate: {
            args: Prisma.InternalRecipeDataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInternalRecipeData>
          }
          groupBy: {
            args: Prisma.InternalRecipeDataGroupByArgs<ExtArgs>
            result: $Utils.Optional<InternalRecipeDataGroupByOutputType>[]
          }
          count: {
            args: Prisma.InternalRecipeDataCountArgs<ExtArgs>
            result: $Utils.Optional<InternalRecipeDataCountAggregateOutputType> | number
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
    userOnboardingProgress?: UserOnboardingProgressOmit
    recipeExtractionMetrics?: RecipeExtractionMetricsOmit
    domainPerformanceMetrics?: DomainPerformanceMetricsOmit
    aIProviderCosts?: AIProviderCostsOmit
    anonymousSession?: AnonymousSessionOmit
    conversionEvent?: ConversionEventOmit
    dailyRateLimit?: DailyRateLimitOmit
    internalRecipeData?: InternalRecipeDataOmit
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
    onboardingProgress: number
    extractionMetrics: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recipes?: boolean | UserCountOutputTypeCountRecipesArgs
    favorites?: boolean | UserCountOutputTypeCountFavoritesArgs
    onboardingProgress?: boolean | UserCountOutputTypeCountOnboardingProgressArgs
    extractionMetrics?: boolean | UserCountOutputTypeCountExtractionMetricsArgs
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
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOnboardingProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserOnboardingProgressWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountExtractionMetricsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecipeExtractionMetricsWhereInput
  }


  /**
   * Count Type RecipeCountOutputType
   */

  export type RecipeCountOutputType = {
    favorites: number
    images: number
    extractionMetrics: number
  }

  export type RecipeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    favorites?: boolean | RecipeCountOutputTypeCountFavoritesArgs
    images?: boolean | RecipeCountOutputTypeCountImagesArgs
    extractionMetrics?: boolean | RecipeCountOutputTypeCountExtractionMetricsArgs
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
   * RecipeCountOutputType without action
   */
  export type RecipeCountOutputTypeCountExtractionMetricsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecipeExtractionMetricsWhereInput
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
    onboardingProgress?: boolean | User$onboardingProgressArgs<ExtArgs>
    extractionMetrics?: boolean | User$extractionMetricsArgs<ExtArgs>
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
    onboardingProgress?: boolean | User$onboardingProgressArgs<ExtArgs>
    extractionMetrics?: boolean | User$extractionMetricsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      recipes: Prisma.$RecipePayload<ExtArgs>[]
      favorites: Prisma.$RecipeFavoritePayload<ExtArgs>[]
      onboardingProgress: Prisma.$UserOnboardingProgressPayload<ExtArgs>[]
      extractionMetrics: Prisma.$RecipeExtractionMetricsPayload<ExtArgs>[]
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
    onboardingProgress<T extends User$onboardingProgressArgs<ExtArgs> = {}>(args?: Subset<T, User$onboardingProgressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserOnboardingProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    extractionMetrics<T extends User$extractionMetricsArgs<ExtArgs> = {}>(args?: Subset<T, User$extractionMetricsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipeExtractionMetricsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * User.onboardingProgress
   */
  export type User$onboardingProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnboardingProgress
     */
    select?: UserOnboardingProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOnboardingProgress
     */
    omit?: UserOnboardingProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOnboardingProgressInclude<ExtArgs> | null
    where?: UserOnboardingProgressWhereInput
    orderBy?: UserOnboardingProgressOrderByWithRelationInput | UserOnboardingProgressOrderByWithRelationInput[]
    cursor?: UserOnboardingProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserOnboardingProgressScalarFieldEnum | UserOnboardingProgressScalarFieldEnum[]
  }

  /**
   * User.extractionMetrics
   */
  export type User$extractionMetricsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeExtractionMetrics
     */
    select?: RecipeExtractionMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeExtractionMetrics
     */
    omit?: RecipeExtractionMetricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeExtractionMetricsInclude<ExtArgs> | null
    where?: RecipeExtractionMetricsWhereInput
    orderBy?: RecipeExtractionMetricsOrderByWithRelationInput | RecipeExtractionMetricsOrderByWithRelationInput[]
    cursor?: RecipeExtractionMetricsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecipeExtractionMetricsScalarFieldEnum | RecipeExtractionMetricsScalarFieldEnum[]
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
    extractionMetrics?: boolean | Recipe$extractionMetricsArgs<ExtArgs>
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
    extractionMetrics?: boolean | Recipe$extractionMetricsArgs<ExtArgs>
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
      extractionMetrics: Prisma.$RecipeExtractionMetricsPayload<ExtArgs>[]
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
    extractionMetrics<T extends Recipe$extractionMetricsArgs<ExtArgs> = {}>(args?: Subset<T, Recipe$extractionMetricsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipeExtractionMetricsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Recipe.extractionMetrics
   */
  export type Recipe$extractionMetricsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeExtractionMetrics
     */
    select?: RecipeExtractionMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeExtractionMetrics
     */
    omit?: RecipeExtractionMetricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeExtractionMetricsInclude<ExtArgs> | null
    where?: RecipeExtractionMetricsWhereInput
    orderBy?: RecipeExtractionMetricsOrderByWithRelationInput | RecipeExtractionMetricsOrderByWithRelationInput[]
    cursor?: RecipeExtractionMetricsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecipeExtractionMetricsScalarFieldEnum | RecipeExtractionMetricsScalarFieldEnum[]
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
   * Model UserOnboardingProgress
   */

  export type AggregateUserOnboardingProgress = {
    _count: UserOnboardingProgressCountAggregateOutputType | null
    _avg: UserOnboardingProgressAvgAggregateOutputType | null
    _sum: UserOnboardingProgressSumAggregateOutputType | null
    _min: UserOnboardingProgressMinAggregateOutputType | null
    _max: UserOnboardingProgressMaxAggregateOutputType | null
  }

  export type UserOnboardingProgressAvgAggregateOutputType = {
    stepId: number | null
  }

  export type UserOnboardingProgressSumAggregateOutputType = {
    stepId: number | null
  }

  export type UserOnboardingProgressMinAggregateOutputType = {
    id: string | null
    userId: string | null
    stepId: number | null
    stepKey: string | null
    completedAt: Date | null
    skippedAt: Date | null
    isRequired: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserOnboardingProgressMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    stepId: number | null
    stepKey: string | null
    completedAt: Date | null
    skippedAt: Date | null
    isRequired: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserOnboardingProgressCountAggregateOutputType = {
    id: number
    userId: number
    stepId: number
    stepKey: number
    completedAt: number
    skippedAt: number
    data: number
    isRequired: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserOnboardingProgressAvgAggregateInputType = {
    stepId?: true
  }

  export type UserOnboardingProgressSumAggregateInputType = {
    stepId?: true
  }

  export type UserOnboardingProgressMinAggregateInputType = {
    id?: true
    userId?: true
    stepId?: true
    stepKey?: true
    completedAt?: true
    skippedAt?: true
    isRequired?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserOnboardingProgressMaxAggregateInputType = {
    id?: true
    userId?: true
    stepId?: true
    stepKey?: true
    completedAt?: true
    skippedAt?: true
    isRequired?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserOnboardingProgressCountAggregateInputType = {
    id?: true
    userId?: true
    stepId?: true
    stepKey?: true
    completedAt?: true
    skippedAt?: true
    data?: true
    isRequired?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserOnboardingProgressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserOnboardingProgress to aggregate.
     */
    where?: UserOnboardingProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserOnboardingProgresses to fetch.
     */
    orderBy?: UserOnboardingProgressOrderByWithRelationInput | UserOnboardingProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserOnboardingProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserOnboardingProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserOnboardingProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserOnboardingProgresses
    **/
    _count?: true | UserOnboardingProgressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserOnboardingProgressAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserOnboardingProgressSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserOnboardingProgressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserOnboardingProgressMaxAggregateInputType
  }

  export type GetUserOnboardingProgressAggregateType<T extends UserOnboardingProgressAggregateArgs> = {
        [P in keyof T & keyof AggregateUserOnboardingProgress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserOnboardingProgress[P]>
      : GetScalarType<T[P], AggregateUserOnboardingProgress[P]>
  }




  export type UserOnboardingProgressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserOnboardingProgressWhereInput
    orderBy?: UserOnboardingProgressOrderByWithAggregationInput | UserOnboardingProgressOrderByWithAggregationInput[]
    by: UserOnboardingProgressScalarFieldEnum[] | UserOnboardingProgressScalarFieldEnum
    having?: UserOnboardingProgressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserOnboardingProgressCountAggregateInputType | true
    _avg?: UserOnboardingProgressAvgAggregateInputType
    _sum?: UserOnboardingProgressSumAggregateInputType
    _min?: UserOnboardingProgressMinAggregateInputType
    _max?: UserOnboardingProgressMaxAggregateInputType
  }

  export type UserOnboardingProgressGroupByOutputType = {
    id: string
    userId: string
    stepId: number
    stepKey: string
    completedAt: Date | null
    skippedAt: Date | null
    data: JsonValue | null
    isRequired: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserOnboardingProgressCountAggregateOutputType | null
    _avg: UserOnboardingProgressAvgAggregateOutputType | null
    _sum: UserOnboardingProgressSumAggregateOutputType | null
    _min: UserOnboardingProgressMinAggregateOutputType | null
    _max: UserOnboardingProgressMaxAggregateOutputType | null
  }

  type GetUserOnboardingProgressGroupByPayload<T extends UserOnboardingProgressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserOnboardingProgressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserOnboardingProgressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserOnboardingProgressGroupByOutputType[P]>
            : GetScalarType<T[P], UserOnboardingProgressGroupByOutputType[P]>
        }
      >
    >


  export type UserOnboardingProgressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    stepId?: boolean
    stepKey?: boolean
    completedAt?: boolean
    skippedAt?: boolean
    data?: boolean
    isRequired?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userOnboardingProgress"]>

  export type UserOnboardingProgressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    stepId?: boolean
    stepKey?: boolean
    completedAt?: boolean
    skippedAt?: boolean
    data?: boolean
    isRequired?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userOnboardingProgress"]>

  export type UserOnboardingProgressSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    stepId?: boolean
    stepKey?: boolean
    completedAt?: boolean
    skippedAt?: boolean
    data?: boolean
    isRequired?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userOnboardingProgress"]>

  export type UserOnboardingProgressSelectScalar = {
    id?: boolean
    userId?: boolean
    stepId?: boolean
    stepKey?: boolean
    completedAt?: boolean
    skippedAt?: boolean
    data?: boolean
    isRequired?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOnboardingProgressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "stepId" | "stepKey" | "completedAt" | "skippedAt" | "data" | "isRequired" | "createdAt" | "updatedAt", ExtArgs["result"]["userOnboardingProgress"]>
  export type UserOnboardingProgressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserOnboardingProgressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserOnboardingProgressIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserOnboardingProgressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserOnboardingProgress"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      stepId: number
      stepKey: string
      completedAt: Date | null
      skippedAt: Date | null
      data: Prisma.JsonValue | null
      isRequired: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userOnboardingProgress"]>
    composites: {}
  }

  type UserOnboardingProgressGetPayload<S extends boolean | null | undefined | UserOnboardingProgressDefaultArgs> = $Result.GetResult<Prisma.$UserOnboardingProgressPayload, S>

  type UserOnboardingProgressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserOnboardingProgressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserOnboardingProgressCountAggregateInputType | true
    }

  export interface UserOnboardingProgressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserOnboardingProgress'], meta: { name: 'UserOnboardingProgress' } }
    /**
     * Find zero or one UserOnboardingProgress that matches the filter.
     * @param {UserOnboardingProgressFindUniqueArgs} args - Arguments to find a UserOnboardingProgress
     * @example
     * // Get one UserOnboardingProgress
     * const userOnboardingProgress = await prisma.userOnboardingProgress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserOnboardingProgressFindUniqueArgs>(args: SelectSubset<T, UserOnboardingProgressFindUniqueArgs<ExtArgs>>): Prisma__UserOnboardingProgressClient<$Result.GetResult<Prisma.$UserOnboardingProgressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserOnboardingProgress that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserOnboardingProgressFindUniqueOrThrowArgs} args - Arguments to find a UserOnboardingProgress
     * @example
     * // Get one UserOnboardingProgress
     * const userOnboardingProgress = await prisma.userOnboardingProgress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserOnboardingProgressFindUniqueOrThrowArgs>(args: SelectSubset<T, UserOnboardingProgressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserOnboardingProgressClient<$Result.GetResult<Prisma.$UserOnboardingProgressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserOnboardingProgress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOnboardingProgressFindFirstArgs} args - Arguments to find a UserOnboardingProgress
     * @example
     * // Get one UserOnboardingProgress
     * const userOnboardingProgress = await prisma.userOnboardingProgress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserOnboardingProgressFindFirstArgs>(args?: SelectSubset<T, UserOnboardingProgressFindFirstArgs<ExtArgs>>): Prisma__UserOnboardingProgressClient<$Result.GetResult<Prisma.$UserOnboardingProgressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserOnboardingProgress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOnboardingProgressFindFirstOrThrowArgs} args - Arguments to find a UserOnboardingProgress
     * @example
     * // Get one UserOnboardingProgress
     * const userOnboardingProgress = await prisma.userOnboardingProgress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserOnboardingProgressFindFirstOrThrowArgs>(args?: SelectSubset<T, UserOnboardingProgressFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserOnboardingProgressClient<$Result.GetResult<Prisma.$UserOnboardingProgressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserOnboardingProgresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOnboardingProgressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserOnboardingProgresses
     * const userOnboardingProgresses = await prisma.userOnboardingProgress.findMany()
     * 
     * // Get first 10 UserOnboardingProgresses
     * const userOnboardingProgresses = await prisma.userOnboardingProgress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userOnboardingProgressWithIdOnly = await prisma.userOnboardingProgress.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserOnboardingProgressFindManyArgs>(args?: SelectSubset<T, UserOnboardingProgressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserOnboardingProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserOnboardingProgress.
     * @param {UserOnboardingProgressCreateArgs} args - Arguments to create a UserOnboardingProgress.
     * @example
     * // Create one UserOnboardingProgress
     * const UserOnboardingProgress = await prisma.userOnboardingProgress.create({
     *   data: {
     *     // ... data to create a UserOnboardingProgress
     *   }
     * })
     * 
     */
    create<T extends UserOnboardingProgressCreateArgs>(args: SelectSubset<T, UserOnboardingProgressCreateArgs<ExtArgs>>): Prisma__UserOnboardingProgressClient<$Result.GetResult<Prisma.$UserOnboardingProgressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserOnboardingProgresses.
     * @param {UserOnboardingProgressCreateManyArgs} args - Arguments to create many UserOnboardingProgresses.
     * @example
     * // Create many UserOnboardingProgresses
     * const userOnboardingProgress = await prisma.userOnboardingProgress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserOnboardingProgressCreateManyArgs>(args?: SelectSubset<T, UserOnboardingProgressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserOnboardingProgresses and returns the data saved in the database.
     * @param {UserOnboardingProgressCreateManyAndReturnArgs} args - Arguments to create many UserOnboardingProgresses.
     * @example
     * // Create many UserOnboardingProgresses
     * const userOnboardingProgress = await prisma.userOnboardingProgress.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserOnboardingProgresses and only return the `id`
     * const userOnboardingProgressWithIdOnly = await prisma.userOnboardingProgress.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserOnboardingProgressCreateManyAndReturnArgs>(args?: SelectSubset<T, UserOnboardingProgressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserOnboardingProgressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserOnboardingProgress.
     * @param {UserOnboardingProgressDeleteArgs} args - Arguments to delete one UserOnboardingProgress.
     * @example
     * // Delete one UserOnboardingProgress
     * const UserOnboardingProgress = await prisma.userOnboardingProgress.delete({
     *   where: {
     *     // ... filter to delete one UserOnboardingProgress
     *   }
     * })
     * 
     */
    delete<T extends UserOnboardingProgressDeleteArgs>(args: SelectSubset<T, UserOnboardingProgressDeleteArgs<ExtArgs>>): Prisma__UserOnboardingProgressClient<$Result.GetResult<Prisma.$UserOnboardingProgressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserOnboardingProgress.
     * @param {UserOnboardingProgressUpdateArgs} args - Arguments to update one UserOnboardingProgress.
     * @example
     * // Update one UserOnboardingProgress
     * const userOnboardingProgress = await prisma.userOnboardingProgress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserOnboardingProgressUpdateArgs>(args: SelectSubset<T, UserOnboardingProgressUpdateArgs<ExtArgs>>): Prisma__UserOnboardingProgressClient<$Result.GetResult<Prisma.$UserOnboardingProgressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserOnboardingProgresses.
     * @param {UserOnboardingProgressDeleteManyArgs} args - Arguments to filter UserOnboardingProgresses to delete.
     * @example
     * // Delete a few UserOnboardingProgresses
     * const { count } = await prisma.userOnboardingProgress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserOnboardingProgressDeleteManyArgs>(args?: SelectSubset<T, UserOnboardingProgressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserOnboardingProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOnboardingProgressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserOnboardingProgresses
     * const userOnboardingProgress = await prisma.userOnboardingProgress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserOnboardingProgressUpdateManyArgs>(args: SelectSubset<T, UserOnboardingProgressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserOnboardingProgresses and returns the data updated in the database.
     * @param {UserOnboardingProgressUpdateManyAndReturnArgs} args - Arguments to update many UserOnboardingProgresses.
     * @example
     * // Update many UserOnboardingProgresses
     * const userOnboardingProgress = await prisma.userOnboardingProgress.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserOnboardingProgresses and only return the `id`
     * const userOnboardingProgressWithIdOnly = await prisma.userOnboardingProgress.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserOnboardingProgressUpdateManyAndReturnArgs>(args: SelectSubset<T, UserOnboardingProgressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserOnboardingProgressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserOnboardingProgress.
     * @param {UserOnboardingProgressUpsertArgs} args - Arguments to update or create a UserOnboardingProgress.
     * @example
     * // Update or create a UserOnboardingProgress
     * const userOnboardingProgress = await prisma.userOnboardingProgress.upsert({
     *   create: {
     *     // ... data to create a UserOnboardingProgress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserOnboardingProgress we want to update
     *   }
     * })
     */
    upsert<T extends UserOnboardingProgressUpsertArgs>(args: SelectSubset<T, UserOnboardingProgressUpsertArgs<ExtArgs>>): Prisma__UserOnboardingProgressClient<$Result.GetResult<Prisma.$UserOnboardingProgressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserOnboardingProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOnboardingProgressCountArgs} args - Arguments to filter UserOnboardingProgresses to count.
     * @example
     * // Count the number of UserOnboardingProgresses
     * const count = await prisma.userOnboardingProgress.count({
     *   where: {
     *     // ... the filter for the UserOnboardingProgresses we want to count
     *   }
     * })
    **/
    count<T extends UserOnboardingProgressCountArgs>(
      args?: Subset<T, UserOnboardingProgressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserOnboardingProgressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserOnboardingProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOnboardingProgressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserOnboardingProgressAggregateArgs>(args: Subset<T, UserOnboardingProgressAggregateArgs>): Prisma.PrismaPromise<GetUserOnboardingProgressAggregateType<T>>

    /**
     * Group by UserOnboardingProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOnboardingProgressGroupByArgs} args - Group by arguments.
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
      T extends UserOnboardingProgressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserOnboardingProgressGroupByArgs['orderBy'] }
        : { orderBy?: UserOnboardingProgressGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserOnboardingProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserOnboardingProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserOnboardingProgress model
   */
  readonly fields: UserOnboardingProgressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserOnboardingProgress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserOnboardingProgressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the UserOnboardingProgress model
   */
  interface UserOnboardingProgressFieldRefs {
    readonly id: FieldRef<"UserOnboardingProgress", 'String'>
    readonly userId: FieldRef<"UserOnboardingProgress", 'String'>
    readonly stepId: FieldRef<"UserOnboardingProgress", 'Int'>
    readonly stepKey: FieldRef<"UserOnboardingProgress", 'String'>
    readonly completedAt: FieldRef<"UserOnboardingProgress", 'DateTime'>
    readonly skippedAt: FieldRef<"UserOnboardingProgress", 'DateTime'>
    readonly data: FieldRef<"UserOnboardingProgress", 'Json'>
    readonly isRequired: FieldRef<"UserOnboardingProgress", 'Boolean'>
    readonly createdAt: FieldRef<"UserOnboardingProgress", 'DateTime'>
    readonly updatedAt: FieldRef<"UserOnboardingProgress", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserOnboardingProgress findUnique
   */
  export type UserOnboardingProgressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnboardingProgress
     */
    select?: UserOnboardingProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOnboardingProgress
     */
    omit?: UserOnboardingProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOnboardingProgressInclude<ExtArgs> | null
    /**
     * Filter, which UserOnboardingProgress to fetch.
     */
    where: UserOnboardingProgressWhereUniqueInput
  }

  /**
   * UserOnboardingProgress findUniqueOrThrow
   */
  export type UserOnboardingProgressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnboardingProgress
     */
    select?: UserOnboardingProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOnboardingProgress
     */
    omit?: UserOnboardingProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOnboardingProgressInclude<ExtArgs> | null
    /**
     * Filter, which UserOnboardingProgress to fetch.
     */
    where: UserOnboardingProgressWhereUniqueInput
  }

  /**
   * UserOnboardingProgress findFirst
   */
  export type UserOnboardingProgressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnboardingProgress
     */
    select?: UserOnboardingProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOnboardingProgress
     */
    omit?: UserOnboardingProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOnboardingProgressInclude<ExtArgs> | null
    /**
     * Filter, which UserOnboardingProgress to fetch.
     */
    where?: UserOnboardingProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserOnboardingProgresses to fetch.
     */
    orderBy?: UserOnboardingProgressOrderByWithRelationInput | UserOnboardingProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserOnboardingProgresses.
     */
    cursor?: UserOnboardingProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserOnboardingProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserOnboardingProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserOnboardingProgresses.
     */
    distinct?: UserOnboardingProgressScalarFieldEnum | UserOnboardingProgressScalarFieldEnum[]
  }

  /**
   * UserOnboardingProgress findFirstOrThrow
   */
  export type UserOnboardingProgressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnboardingProgress
     */
    select?: UserOnboardingProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOnboardingProgress
     */
    omit?: UserOnboardingProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOnboardingProgressInclude<ExtArgs> | null
    /**
     * Filter, which UserOnboardingProgress to fetch.
     */
    where?: UserOnboardingProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserOnboardingProgresses to fetch.
     */
    orderBy?: UserOnboardingProgressOrderByWithRelationInput | UserOnboardingProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserOnboardingProgresses.
     */
    cursor?: UserOnboardingProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserOnboardingProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserOnboardingProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserOnboardingProgresses.
     */
    distinct?: UserOnboardingProgressScalarFieldEnum | UserOnboardingProgressScalarFieldEnum[]
  }

  /**
   * UserOnboardingProgress findMany
   */
  export type UserOnboardingProgressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnboardingProgress
     */
    select?: UserOnboardingProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOnboardingProgress
     */
    omit?: UserOnboardingProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOnboardingProgressInclude<ExtArgs> | null
    /**
     * Filter, which UserOnboardingProgresses to fetch.
     */
    where?: UserOnboardingProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserOnboardingProgresses to fetch.
     */
    orderBy?: UserOnboardingProgressOrderByWithRelationInput | UserOnboardingProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserOnboardingProgresses.
     */
    cursor?: UserOnboardingProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserOnboardingProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserOnboardingProgresses.
     */
    skip?: number
    distinct?: UserOnboardingProgressScalarFieldEnum | UserOnboardingProgressScalarFieldEnum[]
  }

  /**
   * UserOnboardingProgress create
   */
  export type UserOnboardingProgressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnboardingProgress
     */
    select?: UserOnboardingProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOnboardingProgress
     */
    omit?: UserOnboardingProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOnboardingProgressInclude<ExtArgs> | null
    /**
     * The data needed to create a UserOnboardingProgress.
     */
    data: XOR<UserOnboardingProgressCreateInput, UserOnboardingProgressUncheckedCreateInput>
  }

  /**
   * UserOnboardingProgress createMany
   */
  export type UserOnboardingProgressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserOnboardingProgresses.
     */
    data: UserOnboardingProgressCreateManyInput | UserOnboardingProgressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserOnboardingProgress createManyAndReturn
   */
  export type UserOnboardingProgressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnboardingProgress
     */
    select?: UserOnboardingProgressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserOnboardingProgress
     */
    omit?: UserOnboardingProgressOmit<ExtArgs> | null
    /**
     * The data used to create many UserOnboardingProgresses.
     */
    data: UserOnboardingProgressCreateManyInput | UserOnboardingProgressCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOnboardingProgressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserOnboardingProgress update
   */
  export type UserOnboardingProgressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnboardingProgress
     */
    select?: UserOnboardingProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOnboardingProgress
     */
    omit?: UserOnboardingProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOnboardingProgressInclude<ExtArgs> | null
    /**
     * The data needed to update a UserOnboardingProgress.
     */
    data: XOR<UserOnboardingProgressUpdateInput, UserOnboardingProgressUncheckedUpdateInput>
    /**
     * Choose, which UserOnboardingProgress to update.
     */
    where: UserOnboardingProgressWhereUniqueInput
  }

  /**
   * UserOnboardingProgress updateMany
   */
  export type UserOnboardingProgressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserOnboardingProgresses.
     */
    data: XOR<UserOnboardingProgressUpdateManyMutationInput, UserOnboardingProgressUncheckedUpdateManyInput>
    /**
     * Filter which UserOnboardingProgresses to update
     */
    where?: UserOnboardingProgressWhereInput
    /**
     * Limit how many UserOnboardingProgresses to update.
     */
    limit?: number
  }

  /**
   * UserOnboardingProgress updateManyAndReturn
   */
  export type UserOnboardingProgressUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnboardingProgress
     */
    select?: UserOnboardingProgressSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserOnboardingProgress
     */
    omit?: UserOnboardingProgressOmit<ExtArgs> | null
    /**
     * The data used to update UserOnboardingProgresses.
     */
    data: XOR<UserOnboardingProgressUpdateManyMutationInput, UserOnboardingProgressUncheckedUpdateManyInput>
    /**
     * Filter which UserOnboardingProgresses to update
     */
    where?: UserOnboardingProgressWhereInput
    /**
     * Limit how many UserOnboardingProgresses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOnboardingProgressIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserOnboardingProgress upsert
   */
  export type UserOnboardingProgressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnboardingProgress
     */
    select?: UserOnboardingProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOnboardingProgress
     */
    omit?: UserOnboardingProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOnboardingProgressInclude<ExtArgs> | null
    /**
     * The filter to search for the UserOnboardingProgress to update in case it exists.
     */
    where: UserOnboardingProgressWhereUniqueInput
    /**
     * In case the UserOnboardingProgress found by the `where` argument doesn't exist, create a new UserOnboardingProgress with this data.
     */
    create: XOR<UserOnboardingProgressCreateInput, UserOnboardingProgressUncheckedCreateInput>
    /**
     * In case the UserOnboardingProgress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserOnboardingProgressUpdateInput, UserOnboardingProgressUncheckedUpdateInput>
  }

  /**
   * UserOnboardingProgress delete
   */
  export type UserOnboardingProgressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnboardingProgress
     */
    select?: UserOnboardingProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOnboardingProgress
     */
    omit?: UserOnboardingProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOnboardingProgressInclude<ExtArgs> | null
    /**
     * Filter which UserOnboardingProgress to delete.
     */
    where: UserOnboardingProgressWhereUniqueInput
  }

  /**
   * UserOnboardingProgress deleteMany
   */
  export type UserOnboardingProgressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserOnboardingProgresses to delete
     */
    where?: UserOnboardingProgressWhereInput
    /**
     * Limit how many UserOnboardingProgresses to delete.
     */
    limit?: number
  }

  /**
   * UserOnboardingProgress without action
   */
  export type UserOnboardingProgressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnboardingProgress
     */
    select?: UserOnboardingProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserOnboardingProgress
     */
    omit?: UserOnboardingProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserOnboardingProgressInclude<ExtArgs> | null
  }


  /**
   * Model RecipeExtractionMetrics
   */

  export type AggregateRecipeExtractionMetrics = {
    _count: RecipeExtractionMetricsCountAggregateOutputType | null
    _avg: RecipeExtractionMetricsAvgAggregateOutputType | null
    _sum: RecipeExtractionMetricsSumAggregateOutputType | null
    _min: RecipeExtractionMetricsMinAggregateOutputType | null
    _max: RecipeExtractionMetricsMaxAggregateOutputType | null
  }

  export type RecipeExtractionMetricsAvgAggregateOutputType = {
    totalDuration: number | null
    htmlFetchDuration: number | null
    aiProcessingDuration: number | null
    validationDuration: number | null
    databaseSaveDuration: number | null
    htmlContentSize: number | null
    cleanedContentSize: number | null
    promptTokens: number | null
    responseTokens: number | null
    totalTokens: number | null
    completenessScore: number | null
    categoryConfidence: number | null
    estimatedCost: number | null
  }

  export type RecipeExtractionMetricsSumAggregateOutputType = {
    totalDuration: number | null
    htmlFetchDuration: number | null
    aiProcessingDuration: number | null
    validationDuration: number | null
    databaseSaveDuration: number | null
    htmlContentSize: number | null
    cleanedContentSize: number | null
    promptTokens: number | null
    responseTokens: number | null
    totalTokens: number | null
    completenessScore: number | null
    categoryConfidence: number | null
    estimatedCost: number | null
  }

  export type RecipeExtractionMetricsMinAggregateOutputType = {
    id: string | null
    userId: string | null
    sessionId: string | null
    recipeUrl: string | null
    domain: string | null
    requestTimestamp: Date | null
    primaryStrategy: $Enums.ExtractionStrategy | null
    aiProvider: $Enums.AIProvider | null
    fallbackUsed: boolean | null
    fallbackReason: string | null
    totalDuration: number | null
    htmlFetchDuration: number | null
    aiProcessingDuration: number | null
    validationDuration: number | null
    databaseSaveDuration: number | null
    htmlContentSize: number | null
    cleanedContentSize: number | null
    promptTokens: number | null
    responseTokens: number | null
    totalTokens: number | null
    extractionSuccess: boolean | null
    completenessScore: number | null
    categoryConfidence: number | null
    hasStructuredData: boolean | null
    estimatedCost: number | null
    recipeId: string | null
    wasOptimal: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RecipeExtractionMetricsMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    sessionId: string | null
    recipeUrl: string | null
    domain: string | null
    requestTimestamp: Date | null
    primaryStrategy: $Enums.ExtractionStrategy | null
    aiProvider: $Enums.AIProvider | null
    fallbackUsed: boolean | null
    fallbackReason: string | null
    totalDuration: number | null
    htmlFetchDuration: number | null
    aiProcessingDuration: number | null
    validationDuration: number | null
    databaseSaveDuration: number | null
    htmlContentSize: number | null
    cleanedContentSize: number | null
    promptTokens: number | null
    responseTokens: number | null
    totalTokens: number | null
    extractionSuccess: boolean | null
    completenessScore: number | null
    categoryConfidence: number | null
    hasStructuredData: boolean | null
    estimatedCost: number | null
    recipeId: string | null
    wasOptimal: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RecipeExtractionMetricsCountAggregateOutputType = {
    id: number
    userId: number
    sessionId: number
    recipeUrl: number
    domain: number
    requestTimestamp: number
    primaryStrategy: number
    aiProvider: number
    fallbackUsed: number
    fallbackReason: number
    totalDuration: number
    htmlFetchDuration: number
    aiProcessingDuration: number
    validationDuration: number
    databaseSaveDuration: number
    htmlContentSize: number
    cleanedContentSize: number
    promptTokens: number
    responseTokens: number
    totalTokens: number
    extractionSuccess: number
    validationErrors: number
    missingFields: number
    completenessScore: number
    categoryConfidence: number
    hasStructuredData: number
    estimatedCost: number
    recipeId: number
    wasOptimal: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RecipeExtractionMetricsAvgAggregateInputType = {
    totalDuration?: true
    htmlFetchDuration?: true
    aiProcessingDuration?: true
    validationDuration?: true
    databaseSaveDuration?: true
    htmlContentSize?: true
    cleanedContentSize?: true
    promptTokens?: true
    responseTokens?: true
    totalTokens?: true
    completenessScore?: true
    categoryConfidence?: true
    estimatedCost?: true
  }

  export type RecipeExtractionMetricsSumAggregateInputType = {
    totalDuration?: true
    htmlFetchDuration?: true
    aiProcessingDuration?: true
    validationDuration?: true
    databaseSaveDuration?: true
    htmlContentSize?: true
    cleanedContentSize?: true
    promptTokens?: true
    responseTokens?: true
    totalTokens?: true
    completenessScore?: true
    categoryConfidence?: true
    estimatedCost?: true
  }

  export type RecipeExtractionMetricsMinAggregateInputType = {
    id?: true
    userId?: true
    sessionId?: true
    recipeUrl?: true
    domain?: true
    requestTimestamp?: true
    primaryStrategy?: true
    aiProvider?: true
    fallbackUsed?: true
    fallbackReason?: true
    totalDuration?: true
    htmlFetchDuration?: true
    aiProcessingDuration?: true
    validationDuration?: true
    databaseSaveDuration?: true
    htmlContentSize?: true
    cleanedContentSize?: true
    promptTokens?: true
    responseTokens?: true
    totalTokens?: true
    extractionSuccess?: true
    completenessScore?: true
    categoryConfidence?: true
    hasStructuredData?: true
    estimatedCost?: true
    recipeId?: true
    wasOptimal?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RecipeExtractionMetricsMaxAggregateInputType = {
    id?: true
    userId?: true
    sessionId?: true
    recipeUrl?: true
    domain?: true
    requestTimestamp?: true
    primaryStrategy?: true
    aiProvider?: true
    fallbackUsed?: true
    fallbackReason?: true
    totalDuration?: true
    htmlFetchDuration?: true
    aiProcessingDuration?: true
    validationDuration?: true
    databaseSaveDuration?: true
    htmlContentSize?: true
    cleanedContentSize?: true
    promptTokens?: true
    responseTokens?: true
    totalTokens?: true
    extractionSuccess?: true
    completenessScore?: true
    categoryConfidence?: true
    hasStructuredData?: true
    estimatedCost?: true
    recipeId?: true
    wasOptimal?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RecipeExtractionMetricsCountAggregateInputType = {
    id?: true
    userId?: true
    sessionId?: true
    recipeUrl?: true
    domain?: true
    requestTimestamp?: true
    primaryStrategy?: true
    aiProvider?: true
    fallbackUsed?: true
    fallbackReason?: true
    totalDuration?: true
    htmlFetchDuration?: true
    aiProcessingDuration?: true
    validationDuration?: true
    databaseSaveDuration?: true
    htmlContentSize?: true
    cleanedContentSize?: true
    promptTokens?: true
    responseTokens?: true
    totalTokens?: true
    extractionSuccess?: true
    validationErrors?: true
    missingFields?: true
    completenessScore?: true
    categoryConfidence?: true
    hasStructuredData?: true
    estimatedCost?: true
    recipeId?: true
    wasOptimal?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RecipeExtractionMetricsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecipeExtractionMetrics to aggregate.
     */
    where?: RecipeExtractionMetricsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecipeExtractionMetrics to fetch.
     */
    orderBy?: RecipeExtractionMetricsOrderByWithRelationInput | RecipeExtractionMetricsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecipeExtractionMetricsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecipeExtractionMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecipeExtractionMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RecipeExtractionMetrics
    **/
    _count?: true | RecipeExtractionMetricsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RecipeExtractionMetricsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RecipeExtractionMetricsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecipeExtractionMetricsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecipeExtractionMetricsMaxAggregateInputType
  }

  export type GetRecipeExtractionMetricsAggregateType<T extends RecipeExtractionMetricsAggregateArgs> = {
        [P in keyof T & keyof AggregateRecipeExtractionMetrics]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecipeExtractionMetrics[P]>
      : GetScalarType<T[P], AggregateRecipeExtractionMetrics[P]>
  }




  export type RecipeExtractionMetricsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecipeExtractionMetricsWhereInput
    orderBy?: RecipeExtractionMetricsOrderByWithAggregationInput | RecipeExtractionMetricsOrderByWithAggregationInput[]
    by: RecipeExtractionMetricsScalarFieldEnum[] | RecipeExtractionMetricsScalarFieldEnum
    having?: RecipeExtractionMetricsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecipeExtractionMetricsCountAggregateInputType | true
    _avg?: RecipeExtractionMetricsAvgAggregateInputType
    _sum?: RecipeExtractionMetricsSumAggregateInputType
    _min?: RecipeExtractionMetricsMinAggregateInputType
    _max?: RecipeExtractionMetricsMaxAggregateInputType
  }

  export type RecipeExtractionMetricsGroupByOutputType = {
    id: string
    userId: string | null
    sessionId: string | null
    recipeUrl: string
    domain: string
    requestTimestamp: Date
    primaryStrategy: $Enums.ExtractionStrategy
    aiProvider: $Enums.AIProvider
    fallbackUsed: boolean
    fallbackReason: string | null
    totalDuration: number
    htmlFetchDuration: number | null
    aiProcessingDuration: number
    validationDuration: number | null
    databaseSaveDuration: number | null
    htmlContentSize: number | null
    cleanedContentSize: number | null
    promptTokens: number | null
    responseTokens: number | null
    totalTokens: number | null
    extractionSuccess: boolean
    validationErrors: JsonValue | null
    missingFields: string[]
    completenessScore: number | null
    categoryConfidence: number | null
    hasStructuredData: boolean | null
    estimatedCost: number | null
    recipeId: string | null
    wasOptimal: boolean
    createdAt: Date
    updatedAt: Date
    _count: RecipeExtractionMetricsCountAggregateOutputType | null
    _avg: RecipeExtractionMetricsAvgAggregateOutputType | null
    _sum: RecipeExtractionMetricsSumAggregateOutputType | null
    _min: RecipeExtractionMetricsMinAggregateOutputType | null
    _max: RecipeExtractionMetricsMaxAggregateOutputType | null
  }

  type GetRecipeExtractionMetricsGroupByPayload<T extends RecipeExtractionMetricsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecipeExtractionMetricsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecipeExtractionMetricsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecipeExtractionMetricsGroupByOutputType[P]>
            : GetScalarType<T[P], RecipeExtractionMetricsGroupByOutputType[P]>
        }
      >
    >


  export type RecipeExtractionMetricsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sessionId?: boolean
    recipeUrl?: boolean
    domain?: boolean
    requestTimestamp?: boolean
    primaryStrategy?: boolean
    aiProvider?: boolean
    fallbackUsed?: boolean
    fallbackReason?: boolean
    totalDuration?: boolean
    htmlFetchDuration?: boolean
    aiProcessingDuration?: boolean
    validationDuration?: boolean
    databaseSaveDuration?: boolean
    htmlContentSize?: boolean
    cleanedContentSize?: boolean
    promptTokens?: boolean
    responseTokens?: boolean
    totalTokens?: boolean
    extractionSuccess?: boolean
    validationErrors?: boolean
    missingFields?: boolean
    completenessScore?: boolean
    categoryConfidence?: boolean
    hasStructuredData?: boolean
    estimatedCost?: boolean
    recipeId?: boolean
    wasOptimal?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | RecipeExtractionMetrics$userArgs<ExtArgs>
    recipe?: boolean | RecipeExtractionMetrics$recipeArgs<ExtArgs>
  }, ExtArgs["result"]["recipeExtractionMetrics"]>

  export type RecipeExtractionMetricsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sessionId?: boolean
    recipeUrl?: boolean
    domain?: boolean
    requestTimestamp?: boolean
    primaryStrategy?: boolean
    aiProvider?: boolean
    fallbackUsed?: boolean
    fallbackReason?: boolean
    totalDuration?: boolean
    htmlFetchDuration?: boolean
    aiProcessingDuration?: boolean
    validationDuration?: boolean
    databaseSaveDuration?: boolean
    htmlContentSize?: boolean
    cleanedContentSize?: boolean
    promptTokens?: boolean
    responseTokens?: boolean
    totalTokens?: boolean
    extractionSuccess?: boolean
    validationErrors?: boolean
    missingFields?: boolean
    completenessScore?: boolean
    categoryConfidence?: boolean
    hasStructuredData?: boolean
    estimatedCost?: boolean
    recipeId?: boolean
    wasOptimal?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | RecipeExtractionMetrics$userArgs<ExtArgs>
    recipe?: boolean | RecipeExtractionMetrics$recipeArgs<ExtArgs>
  }, ExtArgs["result"]["recipeExtractionMetrics"]>

  export type RecipeExtractionMetricsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sessionId?: boolean
    recipeUrl?: boolean
    domain?: boolean
    requestTimestamp?: boolean
    primaryStrategy?: boolean
    aiProvider?: boolean
    fallbackUsed?: boolean
    fallbackReason?: boolean
    totalDuration?: boolean
    htmlFetchDuration?: boolean
    aiProcessingDuration?: boolean
    validationDuration?: boolean
    databaseSaveDuration?: boolean
    htmlContentSize?: boolean
    cleanedContentSize?: boolean
    promptTokens?: boolean
    responseTokens?: boolean
    totalTokens?: boolean
    extractionSuccess?: boolean
    validationErrors?: boolean
    missingFields?: boolean
    completenessScore?: boolean
    categoryConfidence?: boolean
    hasStructuredData?: boolean
    estimatedCost?: boolean
    recipeId?: boolean
    wasOptimal?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | RecipeExtractionMetrics$userArgs<ExtArgs>
    recipe?: boolean | RecipeExtractionMetrics$recipeArgs<ExtArgs>
  }, ExtArgs["result"]["recipeExtractionMetrics"]>

  export type RecipeExtractionMetricsSelectScalar = {
    id?: boolean
    userId?: boolean
    sessionId?: boolean
    recipeUrl?: boolean
    domain?: boolean
    requestTimestamp?: boolean
    primaryStrategy?: boolean
    aiProvider?: boolean
    fallbackUsed?: boolean
    fallbackReason?: boolean
    totalDuration?: boolean
    htmlFetchDuration?: boolean
    aiProcessingDuration?: boolean
    validationDuration?: boolean
    databaseSaveDuration?: boolean
    htmlContentSize?: boolean
    cleanedContentSize?: boolean
    promptTokens?: boolean
    responseTokens?: boolean
    totalTokens?: boolean
    extractionSuccess?: boolean
    validationErrors?: boolean
    missingFields?: boolean
    completenessScore?: boolean
    categoryConfidence?: boolean
    hasStructuredData?: boolean
    estimatedCost?: boolean
    recipeId?: boolean
    wasOptimal?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RecipeExtractionMetricsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "sessionId" | "recipeUrl" | "domain" | "requestTimestamp" | "primaryStrategy" | "aiProvider" | "fallbackUsed" | "fallbackReason" | "totalDuration" | "htmlFetchDuration" | "aiProcessingDuration" | "validationDuration" | "databaseSaveDuration" | "htmlContentSize" | "cleanedContentSize" | "promptTokens" | "responseTokens" | "totalTokens" | "extractionSuccess" | "validationErrors" | "missingFields" | "completenessScore" | "categoryConfidence" | "hasStructuredData" | "estimatedCost" | "recipeId" | "wasOptimal" | "createdAt" | "updatedAt", ExtArgs["result"]["recipeExtractionMetrics"]>
  export type RecipeExtractionMetricsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | RecipeExtractionMetrics$userArgs<ExtArgs>
    recipe?: boolean | RecipeExtractionMetrics$recipeArgs<ExtArgs>
  }
  export type RecipeExtractionMetricsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | RecipeExtractionMetrics$userArgs<ExtArgs>
    recipe?: boolean | RecipeExtractionMetrics$recipeArgs<ExtArgs>
  }
  export type RecipeExtractionMetricsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | RecipeExtractionMetrics$userArgs<ExtArgs>
    recipe?: boolean | RecipeExtractionMetrics$recipeArgs<ExtArgs>
  }

  export type $RecipeExtractionMetricsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RecipeExtractionMetrics"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      recipe: Prisma.$RecipePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      sessionId: string | null
      recipeUrl: string
      domain: string
      requestTimestamp: Date
      primaryStrategy: $Enums.ExtractionStrategy
      aiProvider: $Enums.AIProvider
      fallbackUsed: boolean
      fallbackReason: string | null
      totalDuration: number
      htmlFetchDuration: number | null
      aiProcessingDuration: number
      validationDuration: number | null
      databaseSaveDuration: number | null
      htmlContentSize: number | null
      cleanedContentSize: number | null
      promptTokens: number | null
      responseTokens: number | null
      totalTokens: number | null
      extractionSuccess: boolean
      validationErrors: Prisma.JsonValue | null
      missingFields: string[]
      completenessScore: number | null
      categoryConfidence: number | null
      hasStructuredData: boolean | null
      estimatedCost: number | null
      recipeId: string | null
      wasOptimal: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["recipeExtractionMetrics"]>
    composites: {}
  }

  type RecipeExtractionMetricsGetPayload<S extends boolean | null | undefined | RecipeExtractionMetricsDefaultArgs> = $Result.GetResult<Prisma.$RecipeExtractionMetricsPayload, S>

  type RecipeExtractionMetricsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RecipeExtractionMetricsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RecipeExtractionMetricsCountAggregateInputType | true
    }

  export interface RecipeExtractionMetricsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RecipeExtractionMetrics'], meta: { name: 'RecipeExtractionMetrics' } }
    /**
     * Find zero or one RecipeExtractionMetrics that matches the filter.
     * @param {RecipeExtractionMetricsFindUniqueArgs} args - Arguments to find a RecipeExtractionMetrics
     * @example
     * // Get one RecipeExtractionMetrics
     * const recipeExtractionMetrics = await prisma.recipeExtractionMetrics.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecipeExtractionMetricsFindUniqueArgs>(args: SelectSubset<T, RecipeExtractionMetricsFindUniqueArgs<ExtArgs>>): Prisma__RecipeExtractionMetricsClient<$Result.GetResult<Prisma.$RecipeExtractionMetricsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RecipeExtractionMetrics that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RecipeExtractionMetricsFindUniqueOrThrowArgs} args - Arguments to find a RecipeExtractionMetrics
     * @example
     * // Get one RecipeExtractionMetrics
     * const recipeExtractionMetrics = await prisma.recipeExtractionMetrics.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecipeExtractionMetricsFindUniqueOrThrowArgs>(args: SelectSubset<T, RecipeExtractionMetricsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecipeExtractionMetricsClient<$Result.GetResult<Prisma.$RecipeExtractionMetricsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RecipeExtractionMetrics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeExtractionMetricsFindFirstArgs} args - Arguments to find a RecipeExtractionMetrics
     * @example
     * // Get one RecipeExtractionMetrics
     * const recipeExtractionMetrics = await prisma.recipeExtractionMetrics.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecipeExtractionMetricsFindFirstArgs>(args?: SelectSubset<T, RecipeExtractionMetricsFindFirstArgs<ExtArgs>>): Prisma__RecipeExtractionMetricsClient<$Result.GetResult<Prisma.$RecipeExtractionMetricsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RecipeExtractionMetrics that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeExtractionMetricsFindFirstOrThrowArgs} args - Arguments to find a RecipeExtractionMetrics
     * @example
     * // Get one RecipeExtractionMetrics
     * const recipeExtractionMetrics = await prisma.recipeExtractionMetrics.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecipeExtractionMetricsFindFirstOrThrowArgs>(args?: SelectSubset<T, RecipeExtractionMetricsFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecipeExtractionMetricsClient<$Result.GetResult<Prisma.$RecipeExtractionMetricsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RecipeExtractionMetrics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeExtractionMetricsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RecipeExtractionMetrics
     * const recipeExtractionMetrics = await prisma.recipeExtractionMetrics.findMany()
     * 
     * // Get first 10 RecipeExtractionMetrics
     * const recipeExtractionMetrics = await prisma.recipeExtractionMetrics.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recipeExtractionMetricsWithIdOnly = await prisma.recipeExtractionMetrics.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RecipeExtractionMetricsFindManyArgs>(args?: SelectSubset<T, RecipeExtractionMetricsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipeExtractionMetricsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RecipeExtractionMetrics.
     * @param {RecipeExtractionMetricsCreateArgs} args - Arguments to create a RecipeExtractionMetrics.
     * @example
     * // Create one RecipeExtractionMetrics
     * const RecipeExtractionMetrics = await prisma.recipeExtractionMetrics.create({
     *   data: {
     *     // ... data to create a RecipeExtractionMetrics
     *   }
     * })
     * 
     */
    create<T extends RecipeExtractionMetricsCreateArgs>(args: SelectSubset<T, RecipeExtractionMetricsCreateArgs<ExtArgs>>): Prisma__RecipeExtractionMetricsClient<$Result.GetResult<Prisma.$RecipeExtractionMetricsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RecipeExtractionMetrics.
     * @param {RecipeExtractionMetricsCreateManyArgs} args - Arguments to create many RecipeExtractionMetrics.
     * @example
     * // Create many RecipeExtractionMetrics
     * const recipeExtractionMetrics = await prisma.recipeExtractionMetrics.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecipeExtractionMetricsCreateManyArgs>(args?: SelectSubset<T, RecipeExtractionMetricsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RecipeExtractionMetrics and returns the data saved in the database.
     * @param {RecipeExtractionMetricsCreateManyAndReturnArgs} args - Arguments to create many RecipeExtractionMetrics.
     * @example
     * // Create many RecipeExtractionMetrics
     * const recipeExtractionMetrics = await prisma.recipeExtractionMetrics.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RecipeExtractionMetrics and only return the `id`
     * const recipeExtractionMetricsWithIdOnly = await prisma.recipeExtractionMetrics.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RecipeExtractionMetricsCreateManyAndReturnArgs>(args?: SelectSubset<T, RecipeExtractionMetricsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipeExtractionMetricsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RecipeExtractionMetrics.
     * @param {RecipeExtractionMetricsDeleteArgs} args - Arguments to delete one RecipeExtractionMetrics.
     * @example
     * // Delete one RecipeExtractionMetrics
     * const RecipeExtractionMetrics = await prisma.recipeExtractionMetrics.delete({
     *   where: {
     *     // ... filter to delete one RecipeExtractionMetrics
     *   }
     * })
     * 
     */
    delete<T extends RecipeExtractionMetricsDeleteArgs>(args: SelectSubset<T, RecipeExtractionMetricsDeleteArgs<ExtArgs>>): Prisma__RecipeExtractionMetricsClient<$Result.GetResult<Prisma.$RecipeExtractionMetricsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RecipeExtractionMetrics.
     * @param {RecipeExtractionMetricsUpdateArgs} args - Arguments to update one RecipeExtractionMetrics.
     * @example
     * // Update one RecipeExtractionMetrics
     * const recipeExtractionMetrics = await prisma.recipeExtractionMetrics.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecipeExtractionMetricsUpdateArgs>(args: SelectSubset<T, RecipeExtractionMetricsUpdateArgs<ExtArgs>>): Prisma__RecipeExtractionMetricsClient<$Result.GetResult<Prisma.$RecipeExtractionMetricsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RecipeExtractionMetrics.
     * @param {RecipeExtractionMetricsDeleteManyArgs} args - Arguments to filter RecipeExtractionMetrics to delete.
     * @example
     * // Delete a few RecipeExtractionMetrics
     * const { count } = await prisma.recipeExtractionMetrics.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecipeExtractionMetricsDeleteManyArgs>(args?: SelectSubset<T, RecipeExtractionMetricsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RecipeExtractionMetrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeExtractionMetricsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RecipeExtractionMetrics
     * const recipeExtractionMetrics = await prisma.recipeExtractionMetrics.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecipeExtractionMetricsUpdateManyArgs>(args: SelectSubset<T, RecipeExtractionMetricsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RecipeExtractionMetrics and returns the data updated in the database.
     * @param {RecipeExtractionMetricsUpdateManyAndReturnArgs} args - Arguments to update many RecipeExtractionMetrics.
     * @example
     * // Update many RecipeExtractionMetrics
     * const recipeExtractionMetrics = await prisma.recipeExtractionMetrics.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RecipeExtractionMetrics and only return the `id`
     * const recipeExtractionMetricsWithIdOnly = await prisma.recipeExtractionMetrics.updateManyAndReturn({
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
    updateManyAndReturn<T extends RecipeExtractionMetricsUpdateManyAndReturnArgs>(args: SelectSubset<T, RecipeExtractionMetricsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecipeExtractionMetricsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RecipeExtractionMetrics.
     * @param {RecipeExtractionMetricsUpsertArgs} args - Arguments to update or create a RecipeExtractionMetrics.
     * @example
     * // Update or create a RecipeExtractionMetrics
     * const recipeExtractionMetrics = await prisma.recipeExtractionMetrics.upsert({
     *   create: {
     *     // ... data to create a RecipeExtractionMetrics
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RecipeExtractionMetrics we want to update
     *   }
     * })
     */
    upsert<T extends RecipeExtractionMetricsUpsertArgs>(args: SelectSubset<T, RecipeExtractionMetricsUpsertArgs<ExtArgs>>): Prisma__RecipeExtractionMetricsClient<$Result.GetResult<Prisma.$RecipeExtractionMetricsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RecipeExtractionMetrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeExtractionMetricsCountArgs} args - Arguments to filter RecipeExtractionMetrics to count.
     * @example
     * // Count the number of RecipeExtractionMetrics
     * const count = await prisma.recipeExtractionMetrics.count({
     *   where: {
     *     // ... the filter for the RecipeExtractionMetrics we want to count
     *   }
     * })
    **/
    count<T extends RecipeExtractionMetricsCountArgs>(
      args?: Subset<T, RecipeExtractionMetricsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecipeExtractionMetricsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RecipeExtractionMetrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeExtractionMetricsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RecipeExtractionMetricsAggregateArgs>(args: Subset<T, RecipeExtractionMetricsAggregateArgs>): Prisma.PrismaPromise<GetRecipeExtractionMetricsAggregateType<T>>

    /**
     * Group by RecipeExtractionMetrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipeExtractionMetricsGroupByArgs} args - Group by arguments.
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
      T extends RecipeExtractionMetricsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecipeExtractionMetricsGroupByArgs['orderBy'] }
        : { orderBy?: RecipeExtractionMetricsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RecipeExtractionMetricsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecipeExtractionMetricsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RecipeExtractionMetrics model
   */
  readonly fields: RecipeExtractionMetricsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RecipeExtractionMetrics.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecipeExtractionMetricsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends RecipeExtractionMetrics$userArgs<ExtArgs> = {}>(args?: Subset<T, RecipeExtractionMetrics$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    recipe<T extends RecipeExtractionMetrics$recipeArgs<ExtArgs> = {}>(args?: Subset<T, RecipeExtractionMetrics$recipeArgs<ExtArgs>>): Prisma__RecipeClient<$Result.GetResult<Prisma.$RecipePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the RecipeExtractionMetrics model
   */
  interface RecipeExtractionMetricsFieldRefs {
    readonly id: FieldRef<"RecipeExtractionMetrics", 'String'>
    readonly userId: FieldRef<"RecipeExtractionMetrics", 'String'>
    readonly sessionId: FieldRef<"RecipeExtractionMetrics", 'String'>
    readonly recipeUrl: FieldRef<"RecipeExtractionMetrics", 'String'>
    readonly domain: FieldRef<"RecipeExtractionMetrics", 'String'>
    readonly requestTimestamp: FieldRef<"RecipeExtractionMetrics", 'DateTime'>
    readonly primaryStrategy: FieldRef<"RecipeExtractionMetrics", 'ExtractionStrategy'>
    readonly aiProvider: FieldRef<"RecipeExtractionMetrics", 'AIProvider'>
    readonly fallbackUsed: FieldRef<"RecipeExtractionMetrics", 'Boolean'>
    readonly fallbackReason: FieldRef<"RecipeExtractionMetrics", 'String'>
    readonly totalDuration: FieldRef<"RecipeExtractionMetrics", 'Int'>
    readonly htmlFetchDuration: FieldRef<"RecipeExtractionMetrics", 'Int'>
    readonly aiProcessingDuration: FieldRef<"RecipeExtractionMetrics", 'Int'>
    readonly validationDuration: FieldRef<"RecipeExtractionMetrics", 'Int'>
    readonly databaseSaveDuration: FieldRef<"RecipeExtractionMetrics", 'Int'>
    readonly htmlContentSize: FieldRef<"RecipeExtractionMetrics", 'Int'>
    readonly cleanedContentSize: FieldRef<"RecipeExtractionMetrics", 'Int'>
    readonly promptTokens: FieldRef<"RecipeExtractionMetrics", 'Int'>
    readonly responseTokens: FieldRef<"RecipeExtractionMetrics", 'Int'>
    readonly totalTokens: FieldRef<"RecipeExtractionMetrics", 'Int'>
    readonly extractionSuccess: FieldRef<"RecipeExtractionMetrics", 'Boolean'>
    readonly validationErrors: FieldRef<"RecipeExtractionMetrics", 'Json'>
    readonly missingFields: FieldRef<"RecipeExtractionMetrics", 'String[]'>
    readonly completenessScore: FieldRef<"RecipeExtractionMetrics", 'Float'>
    readonly categoryConfidence: FieldRef<"RecipeExtractionMetrics", 'Float'>
    readonly hasStructuredData: FieldRef<"RecipeExtractionMetrics", 'Boolean'>
    readonly estimatedCost: FieldRef<"RecipeExtractionMetrics", 'Float'>
    readonly recipeId: FieldRef<"RecipeExtractionMetrics", 'String'>
    readonly wasOptimal: FieldRef<"RecipeExtractionMetrics", 'Boolean'>
    readonly createdAt: FieldRef<"RecipeExtractionMetrics", 'DateTime'>
    readonly updatedAt: FieldRef<"RecipeExtractionMetrics", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RecipeExtractionMetrics findUnique
   */
  export type RecipeExtractionMetricsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeExtractionMetrics
     */
    select?: RecipeExtractionMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeExtractionMetrics
     */
    omit?: RecipeExtractionMetricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeExtractionMetricsInclude<ExtArgs> | null
    /**
     * Filter, which RecipeExtractionMetrics to fetch.
     */
    where: RecipeExtractionMetricsWhereUniqueInput
  }

  /**
   * RecipeExtractionMetrics findUniqueOrThrow
   */
  export type RecipeExtractionMetricsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeExtractionMetrics
     */
    select?: RecipeExtractionMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeExtractionMetrics
     */
    omit?: RecipeExtractionMetricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeExtractionMetricsInclude<ExtArgs> | null
    /**
     * Filter, which RecipeExtractionMetrics to fetch.
     */
    where: RecipeExtractionMetricsWhereUniqueInput
  }

  /**
   * RecipeExtractionMetrics findFirst
   */
  export type RecipeExtractionMetricsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeExtractionMetrics
     */
    select?: RecipeExtractionMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeExtractionMetrics
     */
    omit?: RecipeExtractionMetricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeExtractionMetricsInclude<ExtArgs> | null
    /**
     * Filter, which RecipeExtractionMetrics to fetch.
     */
    where?: RecipeExtractionMetricsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecipeExtractionMetrics to fetch.
     */
    orderBy?: RecipeExtractionMetricsOrderByWithRelationInput | RecipeExtractionMetricsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecipeExtractionMetrics.
     */
    cursor?: RecipeExtractionMetricsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecipeExtractionMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecipeExtractionMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecipeExtractionMetrics.
     */
    distinct?: RecipeExtractionMetricsScalarFieldEnum | RecipeExtractionMetricsScalarFieldEnum[]
  }

  /**
   * RecipeExtractionMetrics findFirstOrThrow
   */
  export type RecipeExtractionMetricsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeExtractionMetrics
     */
    select?: RecipeExtractionMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeExtractionMetrics
     */
    omit?: RecipeExtractionMetricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeExtractionMetricsInclude<ExtArgs> | null
    /**
     * Filter, which RecipeExtractionMetrics to fetch.
     */
    where?: RecipeExtractionMetricsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecipeExtractionMetrics to fetch.
     */
    orderBy?: RecipeExtractionMetricsOrderByWithRelationInput | RecipeExtractionMetricsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecipeExtractionMetrics.
     */
    cursor?: RecipeExtractionMetricsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecipeExtractionMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecipeExtractionMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecipeExtractionMetrics.
     */
    distinct?: RecipeExtractionMetricsScalarFieldEnum | RecipeExtractionMetricsScalarFieldEnum[]
  }

  /**
   * RecipeExtractionMetrics findMany
   */
  export type RecipeExtractionMetricsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeExtractionMetrics
     */
    select?: RecipeExtractionMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeExtractionMetrics
     */
    omit?: RecipeExtractionMetricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeExtractionMetricsInclude<ExtArgs> | null
    /**
     * Filter, which RecipeExtractionMetrics to fetch.
     */
    where?: RecipeExtractionMetricsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecipeExtractionMetrics to fetch.
     */
    orderBy?: RecipeExtractionMetricsOrderByWithRelationInput | RecipeExtractionMetricsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RecipeExtractionMetrics.
     */
    cursor?: RecipeExtractionMetricsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecipeExtractionMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecipeExtractionMetrics.
     */
    skip?: number
    distinct?: RecipeExtractionMetricsScalarFieldEnum | RecipeExtractionMetricsScalarFieldEnum[]
  }

  /**
   * RecipeExtractionMetrics create
   */
  export type RecipeExtractionMetricsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeExtractionMetrics
     */
    select?: RecipeExtractionMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeExtractionMetrics
     */
    omit?: RecipeExtractionMetricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeExtractionMetricsInclude<ExtArgs> | null
    /**
     * The data needed to create a RecipeExtractionMetrics.
     */
    data: XOR<RecipeExtractionMetricsCreateInput, RecipeExtractionMetricsUncheckedCreateInput>
  }

  /**
   * RecipeExtractionMetrics createMany
   */
  export type RecipeExtractionMetricsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RecipeExtractionMetrics.
     */
    data: RecipeExtractionMetricsCreateManyInput | RecipeExtractionMetricsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RecipeExtractionMetrics createManyAndReturn
   */
  export type RecipeExtractionMetricsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeExtractionMetrics
     */
    select?: RecipeExtractionMetricsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeExtractionMetrics
     */
    omit?: RecipeExtractionMetricsOmit<ExtArgs> | null
    /**
     * The data used to create many RecipeExtractionMetrics.
     */
    data: RecipeExtractionMetricsCreateManyInput | RecipeExtractionMetricsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeExtractionMetricsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RecipeExtractionMetrics update
   */
  export type RecipeExtractionMetricsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeExtractionMetrics
     */
    select?: RecipeExtractionMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeExtractionMetrics
     */
    omit?: RecipeExtractionMetricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeExtractionMetricsInclude<ExtArgs> | null
    /**
     * The data needed to update a RecipeExtractionMetrics.
     */
    data: XOR<RecipeExtractionMetricsUpdateInput, RecipeExtractionMetricsUncheckedUpdateInput>
    /**
     * Choose, which RecipeExtractionMetrics to update.
     */
    where: RecipeExtractionMetricsWhereUniqueInput
  }

  /**
   * RecipeExtractionMetrics updateMany
   */
  export type RecipeExtractionMetricsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RecipeExtractionMetrics.
     */
    data: XOR<RecipeExtractionMetricsUpdateManyMutationInput, RecipeExtractionMetricsUncheckedUpdateManyInput>
    /**
     * Filter which RecipeExtractionMetrics to update
     */
    where?: RecipeExtractionMetricsWhereInput
    /**
     * Limit how many RecipeExtractionMetrics to update.
     */
    limit?: number
  }

  /**
   * RecipeExtractionMetrics updateManyAndReturn
   */
  export type RecipeExtractionMetricsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeExtractionMetrics
     */
    select?: RecipeExtractionMetricsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeExtractionMetrics
     */
    omit?: RecipeExtractionMetricsOmit<ExtArgs> | null
    /**
     * The data used to update RecipeExtractionMetrics.
     */
    data: XOR<RecipeExtractionMetricsUpdateManyMutationInput, RecipeExtractionMetricsUncheckedUpdateManyInput>
    /**
     * Filter which RecipeExtractionMetrics to update
     */
    where?: RecipeExtractionMetricsWhereInput
    /**
     * Limit how many RecipeExtractionMetrics to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeExtractionMetricsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RecipeExtractionMetrics upsert
   */
  export type RecipeExtractionMetricsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeExtractionMetrics
     */
    select?: RecipeExtractionMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeExtractionMetrics
     */
    omit?: RecipeExtractionMetricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeExtractionMetricsInclude<ExtArgs> | null
    /**
     * The filter to search for the RecipeExtractionMetrics to update in case it exists.
     */
    where: RecipeExtractionMetricsWhereUniqueInput
    /**
     * In case the RecipeExtractionMetrics found by the `where` argument doesn't exist, create a new RecipeExtractionMetrics with this data.
     */
    create: XOR<RecipeExtractionMetricsCreateInput, RecipeExtractionMetricsUncheckedCreateInput>
    /**
     * In case the RecipeExtractionMetrics was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecipeExtractionMetricsUpdateInput, RecipeExtractionMetricsUncheckedUpdateInput>
  }

  /**
   * RecipeExtractionMetrics delete
   */
  export type RecipeExtractionMetricsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeExtractionMetrics
     */
    select?: RecipeExtractionMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeExtractionMetrics
     */
    omit?: RecipeExtractionMetricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeExtractionMetricsInclude<ExtArgs> | null
    /**
     * Filter which RecipeExtractionMetrics to delete.
     */
    where: RecipeExtractionMetricsWhereUniqueInput
  }

  /**
   * RecipeExtractionMetrics deleteMany
   */
  export type RecipeExtractionMetricsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecipeExtractionMetrics to delete
     */
    where?: RecipeExtractionMetricsWhereInput
    /**
     * Limit how many RecipeExtractionMetrics to delete.
     */
    limit?: number
  }

  /**
   * RecipeExtractionMetrics.user
   */
  export type RecipeExtractionMetrics$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
    where?: UserWhereInput
  }

  /**
   * RecipeExtractionMetrics.recipe
   */
  export type RecipeExtractionMetrics$recipeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
  }

  /**
   * RecipeExtractionMetrics without action
   */
  export type RecipeExtractionMetricsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipeExtractionMetrics
     */
    select?: RecipeExtractionMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecipeExtractionMetrics
     */
    omit?: RecipeExtractionMetricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecipeExtractionMetricsInclude<ExtArgs> | null
  }


  /**
   * Model DomainPerformanceMetrics
   */

  export type AggregateDomainPerformanceMetrics = {
    _count: DomainPerformanceMetricsCountAggregateOutputType | null
    _avg: DomainPerformanceMetricsAvgAggregateOutputType | null
    _sum: DomainPerformanceMetricsSumAggregateOutputType | null
    _min: DomainPerformanceMetricsMinAggregateOutputType | null
    _max: DomainPerformanceMetricsMaxAggregateOutputType | null
  }

  export type DomainPerformanceMetricsAvgAggregateOutputType = {
    totalExtractions: number | null
    successfulExtractions: number | null
    averageExtractTime: number | null
    averageTokens: number | null
    averageCost: number | null
    averageCompleteness: number | null
    hasStructuredDataPct: number | null
  }

  export type DomainPerformanceMetricsSumAggregateOutputType = {
    totalExtractions: number | null
    successfulExtractions: number | null
    averageExtractTime: number | null
    averageTokens: number | null
    averageCost: number | null
    averageCompleteness: number | null
    hasStructuredDataPct: number | null
  }

  export type DomainPerformanceMetricsMinAggregateOutputType = {
    id: string | null
    domain: string | null
    totalExtractions: number | null
    successfulExtractions: number | null
    averageExtractTime: number | null
    averageTokens: number | null
    averageCost: number | null
    optimalStrategy: $Enums.ExtractionStrategy | null
    optimalProvider: $Enums.AIProvider | null
    averageCompleteness: number | null
    hasStructuredDataPct: number | null
    lastUpdated: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DomainPerformanceMetricsMaxAggregateOutputType = {
    id: string | null
    domain: string | null
    totalExtractions: number | null
    successfulExtractions: number | null
    averageExtractTime: number | null
    averageTokens: number | null
    averageCost: number | null
    optimalStrategy: $Enums.ExtractionStrategy | null
    optimalProvider: $Enums.AIProvider | null
    averageCompleteness: number | null
    hasStructuredDataPct: number | null
    lastUpdated: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DomainPerformanceMetricsCountAggregateOutputType = {
    id: number
    domain: number
    totalExtractions: number
    successfulExtractions: number
    averageExtractTime: number
    averageTokens: number
    averageCost: number
    optimalStrategy: number
    optimalProvider: number
    averageCompleteness: number
    hasStructuredDataPct: number
    lastUpdated: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DomainPerformanceMetricsAvgAggregateInputType = {
    totalExtractions?: true
    successfulExtractions?: true
    averageExtractTime?: true
    averageTokens?: true
    averageCost?: true
    averageCompleteness?: true
    hasStructuredDataPct?: true
  }

  export type DomainPerformanceMetricsSumAggregateInputType = {
    totalExtractions?: true
    successfulExtractions?: true
    averageExtractTime?: true
    averageTokens?: true
    averageCost?: true
    averageCompleteness?: true
    hasStructuredDataPct?: true
  }

  export type DomainPerformanceMetricsMinAggregateInputType = {
    id?: true
    domain?: true
    totalExtractions?: true
    successfulExtractions?: true
    averageExtractTime?: true
    averageTokens?: true
    averageCost?: true
    optimalStrategy?: true
    optimalProvider?: true
    averageCompleteness?: true
    hasStructuredDataPct?: true
    lastUpdated?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DomainPerformanceMetricsMaxAggregateInputType = {
    id?: true
    domain?: true
    totalExtractions?: true
    successfulExtractions?: true
    averageExtractTime?: true
    averageTokens?: true
    averageCost?: true
    optimalStrategy?: true
    optimalProvider?: true
    averageCompleteness?: true
    hasStructuredDataPct?: true
    lastUpdated?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DomainPerformanceMetricsCountAggregateInputType = {
    id?: true
    domain?: true
    totalExtractions?: true
    successfulExtractions?: true
    averageExtractTime?: true
    averageTokens?: true
    averageCost?: true
    optimalStrategy?: true
    optimalProvider?: true
    averageCompleteness?: true
    hasStructuredDataPct?: true
    lastUpdated?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DomainPerformanceMetricsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DomainPerformanceMetrics to aggregate.
     */
    where?: DomainPerformanceMetricsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DomainPerformanceMetrics to fetch.
     */
    orderBy?: DomainPerformanceMetricsOrderByWithRelationInput | DomainPerformanceMetricsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DomainPerformanceMetricsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DomainPerformanceMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DomainPerformanceMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DomainPerformanceMetrics
    **/
    _count?: true | DomainPerformanceMetricsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DomainPerformanceMetricsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DomainPerformanceMetricsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DomainPerformanceMetricsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DomainPerformanceMetricsMaxAggregateInputType
  }

  export type GetDomainPerformanceMetricsAggregateType<T extends DomainPerformanceMetricsAggregateArgs> = {
        [P in keyof T & keyof AggregateDomainPerformanceMetrics]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDomainPerformanceMetrics[P]>
      : GetScalarType<T[P], AggregateDomainPerformanceMetrics[P]>
  }




  export type DomainPerformanceMetricsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DomainPerformanceMetricsWhereInput
    orderBy?: DomainPerformanceMetricsOrderByWithAggregationInput | DomainPerformanceMetricsOrderByWithAggregationInput[]
    by: DomainPerformanceMetricsScalarFieldEnum[] | DomainPerformanceMetricsScalarFieldEnum
    having?: DomainPerformanceMetricsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DomainPerformanceMetricsCountAggregateInputType | true
    _avg?: DomainPerformanceMetricsAvgAggregateInputType
    _sum?: DomainPerformanceMetricsSumAggregateInputType
    _min?: DomainPerformanceMetricsMinAggregateInputType
    _max?: DomainPerformanceMetricsMaxAggregateInputType
  }

  export type DomainPerformanceMetricsGroupByOutputType = {
    id: string
    domain: string
    totalExtractions: number
    successfulExtractions: number
    averageExtractTime: number | null
    averageTokens: number | null
    averageCost: number | null
    optimalStrategy: $Enums.ExtractionStrategy | null
    optimalProvider: $Enums.AIProvider | null
    averageCompleteness: number | null
    hasStructuredDataPct: number | null
    lastUpdated: Date
    createdAt: Date
    updatedAt: Date
    _count: DomainPerformanceMetricsCountAggregateOutputType | null
    _avg: DomainPerformanceMetricsAvgAggregateOutputType | null
    _sum: DomainPerformanceMetricsSumAggregateOutputType | null
    _min: DomainPerformanceMetricsMinAggregateOutputType | null
    _max: DomainPerformanceMetricsMaxAggregateOutputType | null
  }

  type GetDomainPerformanceMetricsGroupByPayload<T extends DomainPerformanceMetricsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DomainPerformanceMetricsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DomainPerformanceMetricsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DomainPerformanceMetricsGroupByOutputType[P]>
            : GetScalarType<T[P], DomainPerformanceMetricsGroupByOutputType[P]>
        }
      >
    >


  export type DomainPerformanceMetricsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    domain?: boolean
    totalExtractions?: boolean
    successfulExtractions?: boolean
    averageExtractTime?: boolean
    averageTokens?: boolean
    averageCost?: boolean
    optimalStrategy?: boolean
    optimalProvider?: boolean
    averageCompleteness?: boolean
    hasStructuredDataPct?: boolean
    lastUpdated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["domainPerformanceMetrics"]>

  export type DomainPerformanceMetricsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    domain?: boolean
    totalExtractions?: boolean
    successfulExtractions?: boolean
    averageExtractTime?: boolean
    averageTokens?: boolean
    averageCost?: boolean
    optimalStrategy?: boolean
    optimalProvider?: boolean
    averageCompleteness?: boolean
    hasStructuredDataPct?: boolean
    lastUpdated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["domainPerformanceMetrics"]>

  export type DomainPerformanceMetricsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    domain?: boolean
    totalExtractions?: boolean
    successfulExtractions?: boolean
    averageExtractTime?: boolean
    averageTokens?: boolean
    averageCost?: boolean
    optimalStrategy?: boolean
    optimalProvider?: boolean
    averageCompleteness?: boolean
    hasStructuredDataPct?: boolean
    lastUpdated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["domainPerformanceMetrics"]>

  export type DomainPerformanceMetricsSelectScalar = {
    id?: boolean
    domain?: boolean
    totalExtractions?: boolean
    successfulExtractions?: boolean
    averageExtractTime?: boolean
    averageTokens?: boolean
    averageCost?: boolean
    optimalStrategy?: boolean
    optimalProvider?: boolean
    averageCompleteness?: boolean
    hasStructuredDataPct?: boolean
    lastUpdated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DomainPerformanceMetricsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "domain" | "totalExtractions" | "successfulExtractions" | "averageExtractTime" | "averageTokens" | "averageCost" | "optimalStrategy" | "optimalProvider" | "averageCompleteness" | "hasStructuredDataPct" | "lastUpdated" | "createdAt" | "updatedAt", ExtArgs["result"]["domainPerformanceMetrics"]>

  export type $DomainPerformanceMetricsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DomainPerformanceMetrics"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      domain: string
      totalExtractions: number
      successfulExtractions: number
      averageExtractTime: number | null
      averageTokens: number | null
      averageCost: number | null
      optimalStrategy: $Enums.ExtractionStrategy | null
      optimalProvider: $Enums.AIProvider | null
      averageCompleteness: number | null
      hasStructuredDataPct: number | null
      lastUpdated: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["domainPerformanceMetrics"]>
    composites: {}
  }

  type DomainPerformanceMetricsGetPayload<S extends boolean | null | undefined | DomainPerformanceMetricsDefaultArgs> = $Result.GetResult<Prisma.$DomainPerformanceMetricsPayload, S>

  type DomainPerformanceMetricsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DomainPerformanceMetricsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DomainPerformanceMetricsCountAggregateInputType | true
    }

  export interface DomainPerformanceMetricsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DomainPerformanceMetrics'], meta: { name: 'DomainPerformanceMetrics' } }
    /**
     * Find zero or one DomainPerformanceMetrics that matches the filter.
     * @param {DomainPerformanceMetricsFindUniqueArgs} args - Arguments to find a DomainPerformanceMetrics
     * @example
     * // Get one DomainPerformanceMetrics
     * const domainPerformanceMetrics = await prisma.domainPerformanceMetrics.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DomainPerformanceMetricsFindUniqueArgs>(args: SelectSubset<T, DomainPerformanceMetricsFindUniqueArgs<ExtArgs>>): Prisma__DomainPerformanceMetricsClient<$Result.GetResult<Prisma.$DomainPerformanceMetricsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DomainPerformanceMetrics that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DomainPerformanceMetricsFindUniqueOrThrowArgs} args - Arguments to find a DomainPerformanceMetrics
     * @example
     * // Get one DomainPerformanceMetrics
     * const domainPerformanceMetrics = await prisma.domainPerformanceMetrics.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DomainPerformanceMetricsFindUniqueOrThrowArgs>(args: SelectSubset<T, DomainPerformanceMetricsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DomainPerformanceMetricsClient<$Result.GetResult<Prisma.$DomainPerformanceMetricsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DomainPerformanceMetrics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainPerformanceMetricsFindFirstArgs} args - Arguments to find a DomainPerformanceMetrics
     * @example
     * // Get one DomainPerformanceMetrics
     * const domainPerformanceMetrics = await prisma.domainPerformanceMetrics.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DomainPerformanceMetricsFindFirstArgs>(args?: SelectSubset<T, DomainPerformanceMetricsFindFirstArgs<ExtArgs>>): Prisma__DomainPerformanceMetricsClient<$Result.GetResult<Prisma.$DomainPerformanceMetricsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DomainPerformanceMetrics that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainPerformanceMetricsFindFirstOrThrowArgs} args - Arguments to find a DomainPerformanceMetrics
     * @example
     * // Get one DomainPerformanceMetrics
     * const domainPerformanceMetrics = await prisma.domainPerformanceMetrics.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DomainPerformanceMetricsFindFirstOrThrowArgs>(args?: SelectSubset<T, DomainPerformanceMetricsFindFirstOrThrowArgs<ExtArgs>>): Prisma__DomainPerformanceMetricsClient<$Result.GetResult<Prisma.$DomainPerformanceMetricsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DomainPerformanceMetrics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainPerformanceMetricsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DomainPerformanceMetrics
     * const domainPerformanceMetrics = await prisma.domainPerformanceMetrics.findMany()
     * 
     * // Get first 10 DomainPerformanceMetrics
     * const domainPerformanceMetrics = await prisma.domainPerformanceMetrics.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const domainPerformanceMetricsWithIdOnly = await prisma.domainPerformanceMetrics.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DomainPerformanceMetricsFindManyArgs>(args?: SelectSubset<T, DomainPerformanceMetricsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DomainPerformanceMetricsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DomainPerformanceMetrics.
     * @param {DomainPerformanceMetricsCreateArgs} args - Arguments to create a DomainPerformanceMetrics.
     * @example
     * // Create one DomainPerformanceMetrics
     * const DomainPerformanceMetrics = await prisma.domainPerformanceMetrics.create({
     *   data: {
     *     // ... data to create a DomainPerformanceMetrics
     *   }
     * })
     * 
     */
    create<T extends DomainPerformanceMetricsCreateArgs>(args: SelectSubset<T, DomainPerformanceMetricsCreateArgs<ExtArgs>>): Prisma__DomainPerformanceMetricsClient<$Result.GetResult<Prisma.$DomainPerformanceMetricsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DomainPerformanceMetrics.
     * @param {DomainPerformanceMetricsCreateManyArgs} args - Arguments to create many DomainPerformanceMetrics.
     * @example
     * // Create many DomainPerformanceMetrics
     * const domainPerformanceMetrics = await prisma.domainPerformanceMetrics.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DomainPerformanceMetricsCreateManyArgs>(args?: SelectSubset<T, DomainPerformanceMetricsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DomainPerformanceMetrics and returns the data saved in the database.
     * @param {DomainPerformanceMetricsCreateManyAndReturnArgs} args - Arguments to create many DomainPerformanceMetrics.
     * @example
     * // Create many DomainPerformanceMetrics
     * const domainPerformanceMetrics = await prisma.domainPerformanceMetrics.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DomainPerformanceMetrics and only return the `id`
     * const domainPerformanceMetricsWithIdOnly = await prisma.domainPerformanceMetrics.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DomainPerformanceMetricsCreateManyAndReturnArgs>(args?: SelectSubset<T, DomainPerformanceMetricsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DomainPerformanceMetricsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DomainPerformanceMetrics.
     * @param {DomainPerformanceMetricsDeleteArgs} args - Arguments to delete one DomainPerformanceMetrics.
     * @example
     * // Delete one DomainPerformanceMetrics
     * const DomainPerformanceMetrics = await prisma.domainPerformanceMetrics.delete({
     *   where: {
     *     // ... filter to delete one DomainPerformanceMetrics
     *   }
     * })
     * 
     */
    delete<T extends DomainPerformanceMetricsDeleteArgs>(args: SelectSubset<T, DomainPerformanceMetricsDeleteArgs<ExtArgs>>): Prisma__DomainPerformanceMetricsClient<$Result.GetResult<Prisma.$DomainPerformanceMetricsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DomainPerformanceMetrics.
     * @param {DomainPerformanceMetricsUpdateArgs} args - Arguments to update one DomainPerformanceMetrics.
     * @example
     * // Update one DomainPerformanceMetrics
     * const domainPerformanceMetrics = await prisma.domainPerformanceMetrics.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DomainPerformanceMetricsUpdateArgs>(args: SelectSubset<T, DomainPerformanceMetricsUpdateArgs<ExtArgs>>): Prisma__DomainPerformanceMetricsClient<$Result.GetResult<Prisma.$DomainPerformanceMetricsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DomainPerformanceMetrics.
     * @param {DomainPerformanceMetricsDeleteManyArgs} args - Arguments to filter DomainPerformanceMetrics to delete.
     * @example
     * // Delete a few DomainPerformanceMetrics
     * const { count } = await prisma.domainPerformanceMetrics.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DomainPerformanceMetricsDeleteManyArgs>(args?: SelectSubset<T, DomainPerformanceMetricsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DomainPerformanceMetrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainPerformanceMetricsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DomainPerformanceMetrics
     * const domainPerformanceMetrics = await prisma.domainPerformanceMetrics.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DomainPerformanceMetricsUpdateManyArgs>(args: SelectSubset<T, DomainPerformanceMetricsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DomainPerformanceMetrics and returns the data updated in the database.
     * @param {DomainPerformanceMetricsUpdateManyAndReturnArgs} args - Arguments to update many DomainPerformanceMetrics.
     * @example
     * // Update many DomainPerformanceMetrics
     * const domainPerformanceMetrics = await prisma.domainPerformanceMetrics.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DomainPerformanceMetrics and only return the `id`
     * const domainPerformanceMetricsWithIdOnly = await prisma.domainPerformanceMetrics.updateManyAndReturn({
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
    updateManyAndReturn<T extends DomainPerformanceMetricsUpdateManyAndReturnArgs>(args: SelectSubset<T, DomainPerformanceMetricsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DomainPerformanceMetricsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DomainPerformanceMetrics.
     * @param {DomainPerformanceMetricsUpsertArgs} args - Arguments to update or create a DomainPerformanceMetrics.
     * @example
     * // Update or create a DomainPerformanceMetrics
     * const domainPerformanceMetrics = await prisma.domainPerformanceMetrics.upsert({
     *   create: {
     *     // ... data to create a DomainPerformanceMetrics
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DomainPerformanceMetrics we want to update
     *   }
     * })
     */
    upsert<T extends DomainPerformanceMetricsUpsertArgs>(args: SelectSubset<T, DomainPerformanceMetricsUpsertArgs<ExtArgs>>): Prisma__DomainPerformanceMetricsClient<$Result.GetResult<Prisma.$DomainPerformanceMetricsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DomainPerformanceMetrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainPerformanceMetricsCountArgs} args - Arguments to filter DomainPerformanceMetrics to count.
     * @example
     * // Count the number of DomainPerformanceMetrics
     * const count = await prisma.domainPerformanceMetrics.count({
     *   where: {
     *     // ... the filter for the DomainPerformanceMetrics we want to count
     *   }
     * })
    **/
    count<T extends DomainPerformanceMetricsCountArgs>(
      args?: Subset<T, DomainPerformanceMetricsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DomainPerformanceMetricsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DomainPerformanceMetrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainPerformanceMetricsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DomainPerformanceMetricsAggregateArgs>(args: Subset<T, DomainPerformanceMetricsAggregateArgs>): Prisma.PrismaPromise<GetDomainPerformanceMetricsAggregateType<T>>

    /**
     * Group by DomainPerformanceMetrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainPerformanceMetricsGroupByArgs} args - Group by arguments.
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
      T extends DomainPerformanceMetricsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DomainPerformanceMetricsGroupByArgs['orderBy'] }
        : { orderBy?: DomainPerformanceMetricsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DomainPerformanceMetricsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDomainPerformanceMetricsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DomainPerformanceMetrics model
   */
  readonly fields: DomainPerformanceMetricsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DomainPerformanceMetrics.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DomainPerformanceMetricsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the DomainPerformanceMetrics model
   */
  interface DomainPerformanceMetricsFieldRefs {
    readonly id: FieldRef<"DomainPerformanceMetrics", 'String'>
    readonly domain: FieldRef<"DomainPerformanceMetrics", 'String'>
    readonly totalExtractions: FieldRef<"DomainPerformanceMetrics", 'Int'>
    readonly successfulExtractions: FieldRef<"DomainPerformanceMetrics", 'Int'>
    readonly averageExtractTime: FieldRef<"DomainPerformanceMetrics", 'Int'>
    readonly averageTokens: FieldRef<"DomainPerformanceMetrics", 'Int'>
    readonly averageCost: FieldRef<"DomainPerformanceMetrics", 'Float'>
    readonly optimalStrategy: FieldRef<"DomainPerformanceMetrics", 'ExtractionStrategy'>
    readonly optimalProvider: FieldRef<"DomainPerformanceMetrics", 'AIProvider'>
    readonly averageCompleteness: FieldRef<"DomainPerformanceMetrics", 'Float'>
    readonly hasStructuredDataPct: FieldRef<"DomainPerformanceMetrics", 'Float'>
    readonly lastUpdated: FieldRef<"DomainPerformanceMetrics", 'DateTime'>
    readonly createdAt: FieldRef<"DomainPerformanceMetrics", 'DateTime'>
    readonly updatedAt: FieldRef<"DomainPerformanceMetrics", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DomainPerformanceMetrics findUnique
   */
  export type DomainPerformanceMetricsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainPerformanceMetrics
     */
    select?: DomainPerformanceMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainPerformanceMetrics
     */
    omit?: DomainPerformanceMetricsOmit<ExtArgs> | null
    /**
     * Filter, which DomainPerformanceMetrics to fetch.
     */
    where: DomainPerformanceMetricsWhereUniqueInput
  }

  /**
   * DomainPerformanceMetrics findUniqueOrThrow
   */
  export type DomainPerformanceMetricsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainPerformanceMetrics
     */
    select?: DomainPerformanceMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainPerformanceMetrics
     */
    omit?: DomainPerformanceMetricsOmit<ExtArgs> | null
    /**
     * Filter, which DomainPerformanceMetrics to fetch.
     */
    where: DomainPerformanceMetricsWhereUniqueInput
  }

  /**
   * DomainPerformanceMetrics findFirst
   */
  export type DomainPerformanceMetricsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainPerformanceMetrics
     */
    select?: DomainPerformanceMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainPerformanceMetrics
     */
    omit?: DomainPerformanceMetricsOmit<ExtArgs> | null
    /**
     * Filter, which DomainPerformanceMetrics to fetch.
     */
    where?: DomainPerformanceMetricsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DomainPerformanceMetrics to fetch.
     */
    orderBy?: DomainPerformanceMetricsOrderByWithRelationInput | DomainPerformanceMetricsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DomainPerformanceMetrics.
     */
    cursor?: DomainPerformanceMetricsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DomainPerformanceMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DomainPerformanceMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DomainPerformanceMetrics.
     */
    distinct?: DomainPerformanceMetricsScalarFieldEnum | DomainPerformanceMetricsScalarFieldEnum[]
  }

  /**
   * DomainPerformanceMetrics findFirstOrThrow
   */
  export type DomainPerformanceMetricsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainPerformanceMetrics
     */
    select?: DomainPerformanceMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainPerformanceMetrics
     */
    omit?: DomainPerformanceMetricsOmit<ExtArgs> | null
    /**
     * Filter, which DomainPerformanceMetrics to fetch.
     */
    where?: DomainPerformanceMetricsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DomainPerformanceMetrics to fetch.
     */
    orderBy?: DomainPerformanceMetricsOrderByWithRelationInput | DomainPerformanceMetricsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DomainPerformanceMetrics.
     */
    cursor?: DomainPerformanceMetricsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DomainPerformanceMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DomainPerformanceMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DomainPerformanceMetrics.
     */
    distinct?: DomainPerformanceMetricsScalarFieldEnum | DomainPerformanceMetricsScalarFieldEnum[]
  }

  /**
   * DomainPerformanceMetrics findMany
   */
  export type DomainPerformanceMetricsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainPerformanceMetrics
     */
    select?: DomainPerformanceMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainPerformanceMetrics
     */
    omit?: DomainPerformanceMetricsOmit<ExtArgs> | null
    /**
     * Filter, which DomainPerformanceMetrics to fetch.
     */
    where?: DomainPerformanceMetricsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DomainPerformanceMetrics to fetch.
     */
    orderBy?: DomainPerformanceMetricsOrderByWithRelationInput | DomainPerformanceMetricsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DomainPerformanceMetrics.
     */
    cursor?: DomainPerformanceMetricsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DomainPerformanceMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DomainPerformanceMetrics.
     */
    skip?: number
    distinct?: DomainPerformanceMetricsScalarFieldEnum | DomainPerformanceMetricsScalarFieldEnum[]
  }

  /**
   * DomainPerformanceMetrics create
   */
  export type DomainPerformanceMetricsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainPerformanceMetrics
     */
    select?: DomainPerformanceMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainPerformanceMetrics
     */
    omit?: DomainPerformanceMetricsOmit<ExtArgs> | null
    /**
     * The data needed to create a DomainPerformanceMetrics.
     */
    data: XOR<DomainPerformanceMetricsCreateInput, DomainPerformanceMetricsUncheckedCreateInput>
  }

  /**
   * DomainPerformanceMetrics createMany
   */
  export type DomainPerformanceMetricsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DomainPerformanceMetrics.
     */
    data: DomainPerformanceMetricsCreateManyInput | DomainPerformanceMetricsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DomainPerformanceMetrics createManyAndReturn
   */
  export type DomainPerformanceMetricsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainPerformanceMetrics
     */
    select?: DomainPerformanceMetricsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DomainPerformanceMetrics
     */
    omit?: DomainPerformanceMetricsOmit<ExtArgs> | null
    /**
     * The data used to create many DomainPerformanceMetrics.
     */
    data: DomainPerformanceMetricsCreateManyInput | DomainPerformanceMetricsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DomainPerformanceMetrics update
   */
  export type DomainPerformanceMetricsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainPerformanceMetrics
     */
    select?: DomainPerformanceMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainPerformanceMetrics
     */
    omit?: DomainPerformanceMetricsOmit<ExtArgs> | null
    /**
     * The data needed to update a DomainPerformanceMetrics.
     */
    data: XOR<DomainPerformanceMetricsUpdateInput, DomainPerformanceMetricsUncheckedUpdateInput>
    /**
     * Choose, which DomainPerformanceMetrics to update.
     */
    where: DomainPerformanceMetricsWhereUniqueInput
  }

  /**
   * DomainPerformanceMetrics updateMany
   */
  export type DomainPerformanceMetricsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DomainPerformanceMetrics.
     */
    data: XOR<DomainPerformanceMetricsUpdateManyMutationInput, DomainPerformanceMetricsUncheckedUpdateManyInput>
    /**
     * Filter which DomainPerformanceMetrics to update
     */
    where?: DomainPerformanceMetricsWhereInput
    /**
     * Limit how many DomainPerformanceMetrics to update.
     */
    limit?: number
  }

  /**
   * DomainPerformanceMetrics updateManyAndReturn
   */
  export type DomainPerformanceMetricsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainPerformanceMetrics
     */
    select?: DomainPerformanceMetricsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DomainPerformanceMetrics
     */
    omit?: DomainPerformanceMetricsOmit<ExtArgs> | null
    /**
     * The data used to update DomainPerformanceMetrics.
     */
    data: XOR<DomainPerformanceMetricsUpdateManyMutationInput, DomainPerformanceMetricsUncheckedUpdateManyInput>
    /**
     * Filter which DomainPerformanceMetrics to update
     */
    where?: DomainPerformanceMetricsWhereInput
    /**
     * Limit how many DomainPerformanceMetrics to update.
     */
    limit?: number
  }

  /**
   * DomainPerformanceMetrics upsert
   */
  export type DomainPerformanceMetricsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainPerformanceMetrics
     */
    select?: DomainPerformanceMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainPerformanceMetrics
     */
    omit?: DomainPerformanceMetricsOmit<ExtArgs> | null
    /**
     * The filter to search for the DomainPerformanceMetrics to update in case it exists.
     */
    where: DomainPerformanceMetricsWhereUniqueInput
    /**
     * In case the DomainPerformanceMetrics found by the `where` argument doesn't exist, create a new DomainPerformanceMetrics with this data.
     */
    create: XOR<DomainPerformanceMetricsCreateInput, DomainPerformanceMetricsUncheckedCreateInput>
    /**
     * In case the DomainPerformanceMetrics was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DomainPerformanceMetricsUpdateInput, DomainPerformanceMetricsUncheckedUpdateInput>
  }

  /**
   * DomainPerformanceMetrics delete
   */
  export type DomainPerformanceMetricsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainPerformanceMetrics
     */
    select?: DomainPerformanceMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainPerformanceMetrics
     */
    omit?: DomainPerformanceMetricsOmit<ExtArgs> | null
    /**
     * Filter which DomainPerformanceMetrics to delete.
     */
    where: DomainPerformanceMetricsWhereUniqueInput
  }

  /**
   * DomainPerformanceMetrics deleteMany
   */
  export type DomainPerformanceMetricsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DomainPerformanceMetrics to delete
     */
    where?: DomainPerformanceMetricsWhereInput
    /**
     * Limit how many DomainPerformanceMetrics to delete.
     */
    limit?: number
  }

  /**
   * DomainPerformanceMetrics without action
   */
  export type DomainPerformanceMetricsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DomainPerformanceMetrics
     */
    select?: DomainPerformanceMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DomainPerformanceMetrics
     */
    omit?: DomainPerformanceMetricsOmit<ExtArgs> | null
  }


  /**
   * Model AIProviderCosts
   */

  export type AggregateAIProviderCosts = {
    _count: AIProviderCostsCountAggregateOutputType | null
    _avg: AIProviderCostsAvgAggregateOutputType | null
    _sum: AIProviderCostsSumAggregateOutputType | null
    _min: AIProviderCostsMinAggregateOutputType | null
    _max: AIProviderCostsMaxAggregateOutputType | null
  }

  export type AIProviderCostsAvgAggregateOutputType = {
    inputTokenCost: number | null
    outputTokenCost: number | null
  }

  export type AIProviderCostsSumAggregateOutputType = {
    inputTokenCost: number | null
    outputTokenCost: number | null
  }

  export type AIProviderCostsMinAggregateOutputType = {
    id: string | null
    provider: string | null
    model: string | null
    inputTokenCost: number | null
    outputTokenCost: number | null
    effectiveDate: Date | null
    createdAt: Date | null
  }

  export type AIProviderCostsMaxAggregateOutputType = {
    id: string | null
    provider: string | null
    model: string | null
    inputTokenCost: number | null
    outputTokenCost: number | null
    effectiveDate: Date | null
    createdAt: Date | null
  }

  export type AIProviderCostsCountAggregateOutputType = {
    id: number
    provider: number
    model: number
    inputTokenCost: number
    outputTokenCost: number
    effectiveDate: number
    createdAt: number
    _all: number
  }


  export type AIProviderCostsAvgAggregateInputType = {
    inputTokenCost?: true
    outputTokenCost?: true
  }

  export type AIProviderCostsSumAggregateInputType = {
    inputTokenCost?: true
    outputTokenCost?: true
  }

  export type AIProviderCostsMinAggregateInputType = {
    id?: true
    provider?: true
    model?: true
    inputTokenCost?: true
    outputTokenCost?: true
    effectiveDate?: true
    createdAt?: true
  }

  export type AIProviderCostsMaxAggregateInputType = {
    id?: true
    provider?: true
    model?: true
    inputTokenCost?: true
    outputTokenCost?: true
    effectiveDate?: true
    createdAt?: true
  }

  export type AIProviderCostsCountAggregateInputType = {
    id?: true
    provider?: true
    model?: true
    inputTokenCost?: true
    outputTokenCost?: true
    effectiveDate?: true
    createdAt?: true
    _all?: true
  }

  export type AIProviderCostsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIProviderCosts to aggregate.
     */
    where?: AIProviderCostsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIProviderCosts to fetch.
     */
    orderBy?: AIProviderCostsOrderByWithRelationInput | AIProviderCostsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIProviderCostsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIProviderCosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIProviderCosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIProviderCosts
    **/
    _count?: true | AIProviderCostsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AIProviderCostsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AIProviderCostsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIProviderCostsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIProviderCostsMaxAggregateInputType
  }

  export type GetAIProviderCostsAggregateType<T extends AIProviderCostsAggregateArgs> = {
        [P in keyof T & keyof AggregateAIProviderCosts]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIProviderCosts[P]>
      : GetScalarType<T[P], AggregateAIProviderCosts[P]>
  }




  export type AIProviderCostsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIProviderCostsWhereInput
    orderBy?: AIProviderCostsOrderByWithAggregationInput | AIProviderCostsOrderByWithAggregationInput[]
    by: AIProviderCostsScalarFieldEnum[] | AIProviderCostsScalarFieldEnum
    having?: AIProviderCostsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIProviderCostsCountAggregateInputType | true
    _avg?: AIProviderCostsAvgAggregateInputType
    _sum?: AIProviderCostsSumAggregateInputType
    _min?: AIProviderCostsMinAggregateInputType
    _max?: AIProviderCostsMaxAggregateInputType
  }

  export type AIProviderCostsGroupByOutputType = {
    id: string
    provider: string
    model: string
    inputTokenCost: number
    outputTokenCost: number
    effectiveDate: Date
    createdAt: Date
    _count: AIProviderCostsCountAggregateOutputType | null
    _avg: AIProviderCostsAvgAggregateOutputType | null
    _sum: AIProviderCostsSumAggregateOutputType | null
    _min: AIProviderCostsMinAggregateOutputType | null
    _max: AIProviderCostsMaxAggregateOutputType | null
  }

  type GetAIProviderCostsGroupByPayload<T extends AIProviderCostsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIProviderCostsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIProviderCostsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIProviderCostsGroupByOutputType[P]>
            : GetScalarType<T[P], AIProviderCostsGroupByOutputType[P]>
        }
      >
    >


  export type AIProviderCostsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    model?: boolean
    inputTokenCost?: boolean
    outputTokenCost?: boolean
    effectiveDate?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["aIProviderCosts"]>

  export type AIProviderCostsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    model?: boolean
    inputTokenCost?: boolean
    outputTokenCost?: boolean
    effectiveDate?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["aIProviderCosts"]>

  export type AIProviderCostsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    model?: boolean
    inputTokenCost?: boolean
    outputTokenCost?: boolean
    effectiveDate?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["aIProviderCosts"]>

  export type AIProviderCostsSelectScalar = {
    id?: boolean
    provider?: boolean
    model?: boolean
    inputTokenCost?: boolean
    outputTokenCost?: boolean
    effectiveDate?: boolean
    createdAt?: boolean
  }

  export type AIProviderCostsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "provider" | "model" | "inputTokenCost" | "outputTokenCost" | "effectiveDate" | "createdAt", ExtArgs["result"]["aIProviderCosts"]>

  export type $AIProviderCostsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIProviderCosts"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      provider: string
      model: string
      inputTokenCost: number
      outputTokenCost: number
      effectiveDate: Date
      createdAt: Date
    }, ExtArgs["result"]["aIProviderCosts"]>
    composites: {}
  }

  type AIProviderCostsGetPayload<S extends boolean | null | undefined | AIProviderCostsDefaultArgs> = $Result.GetResult<Prisma.$AIProviderCostsPayload, S>

  type AIProviderCostsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIProviderCostsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIProviderCostsCountAggregateInputType | true
    }

  export interface AIProviderCostsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIProviderCosts'], meta: { name: 'AIProviderCosts' } }
    /**
     * Find zero or one AIProviderCosts that matches the filter.
     * @param {AIProviderCostsFindUniqueArgs} args - Arguments to find a AIProviderCosts
     * @example
     * // Get one AIProviderCosts
     * const aIProviderCosts = await prisma.aIProviderCosts.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIProviderCostsFindUniqueArgs>(args: SelectSubset<T, AIProviderCostsFindUniqueArgs<ExtArgs>>): Prisma__AIProviderCostsClient<$Result.GetResult<Prisma.$AIProviderCostsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AIProviderCosts that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIProviderCostsFindUniqueOrThrowArgs} args - Arguments to find a AIProviderCosts
     * @example
     * // Get one AIProviderCosts
     * const aIProviderCosts = await prisma.aIProviderCosts.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIProviderCostsFindUniqueOrThrowArgs>(args: SelectSubset<T, AIProviderCostsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIProviderCostsClient<$Result.GetResult<Prisma.$AIProviderCostsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIProviderCosts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIProviderCostsFindFirstArgs} args - Arguments to find a AIProviderCosts
     * @example
     * // Get one AIProviderCosts
     * const aIProviderCosts = await prisma.aIProviderCosts.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIProviderCostsFindFirstArgs>(args?: SelectSubset<T, AIProviderCostsFindFirstArgs<ExtArgs>>): Prisma__AIProviderCostsClient<$Result.GetResult<Prisma.$AIProviderCostsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AIProviderCosts that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIProviderCostsFindFirstOrThrowArgs} args - Arguments to find a AIProviderCosts
     * @example
     * // Get one AIProviderCosts
     * const aIProviderCosts = await prisma.aIProviderCosts.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIProviderCostsFindFirstOrThrowArgs>(args?: SelectSubset<T, AIProviderCostsFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIProviderCostsClient<$Result.GetResult<Prisma.$AIProviderCostsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AIProviderCosts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIProviderCostsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIProviderCosts
     * const aIProviderCosts = await prisma.aIProviderCosts.findMany()
     * 
     * // Get first 10 AIProviderCosts
     * const aIProviderCosts = await prisma.aIProviderCosts.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIProviderCostsWithIdOnly = await prisma.aIProviderCosts.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIProviderCostsFindManyArgs>(args?: SelectSubset<T, AIProviderCostsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIProviderCostsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AIProviderCosts.
     * @param {AIProviderCostsCreateArgs} args - Arguments to create a AIProviderCosts.
     * @example
     * // Create one AIProviderCosts
     * const AIProviderCosts = await prisma.aIProviderCosts.create({
     *   data: {
     *     // ... data to create a AIProviderCosts
     *   }
     * })
     * 
     */
    create<T extends AIProviderCostsCreateArgs>(args: SelectSubset<T, AIProviderCostsCreateArgs<ExtArgs>>): Prisma__AIProviderCostsClient<$Result.GetResult<Prisma.$AIProviderCostsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AIProviderCosts.
     * @param {AIProviderCostsCreateManyArgs} args - Arguments to create many AIProviderCosts.
     * @example
     * // Create many AIProviderCosts
     * const aIProviderCosts = await prisma.aIProviderCosts.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIProviderCostsCreateManyArgs>(args?: SelectSubset<T, AIProviderCostsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIProviderCosts and returns the data saved in the database.
     * @param {AIProviderCostsCreateManyAndReturnArgs} args - Arguments to create many AIProviderCosts.
     * @example
     * // Create many AIProviderCosts
     * const aIProviderCosts = await prisma.aIProviderCosts.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIProviderCosts and only return the `id`
     * const aIProviderCostsWithIdOnly = await prisma.aIProviderCosts.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIProviderCostsCreateManyAndReturnArgs>(args?: SelectSubset<T, AIProviderCostsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIProviderCostsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AIProviderCosts.
     * @param {AIProviderCostsDeleteArgs} args - Arguments to delete one AIProviderCosts.
     * @example
     * // Delete one AIProviderCosts
     * const AIProviderCosts = await prisma.aIProviderCosts.delete({
     *   where: {
     *     // ... filter to delete one AIProviderCosts
     *   }
     * })
     * 
     */
    delete<T extends AIProviderCostsDeleteArgs>(args: SelectSubset<T, AIProviderCostsDeleteArgs<ExtArgs>>): Prisma__AIProviderCostsClient<$Result.GetResult<Prisma.$AIProviderCostsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AIProviderCosts.
     * @param {AIProviderCostsUpdateArgs} args - Arguments to update one AIProviderCosts.
     * @example
     * // Update one AIProviderCosts
     * const aIProviderCosts = await prisma.aIProviderCosts.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIProviderCostsUpdateArgs>(args: SelectSubset<T, AIProviderCostsUpdateArgs<ExtArgs>>): Prisma__AIProviderCostsClient<$Result.GetResult<Prisma.$AIProviderCostsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AIProviderCosts.
     * @param {AIProviderCostsDeleteManyArgs} args - Arguments to filter AIProviderCosts to delete.
     * @example
     * // Delete a few AIProviderCosts
     * const { count } = await prisma.aIProviderCosts.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIProviderCostsDeleteManyArgs>(args?: SelectSubset<T, AIProviderCostsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIProviderCosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIProviderCostsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIProviderCosts
     * const aIProviderCosts = await prisma.aIProviderCosts.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIProviderCostsUpdateManyArgs>(args: SelectSubset<T, AIProviderCostsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIProviderCosts and returns the data updated in the database.
     * @param {AIProviderCostsUpdateManyAndReturnArgs} args - Arguments to update many AIProviderCosts.
     * @example
     * // Update many AIProviderCosts
     * const aIProviderCosts = await prisma.aIProviderCosts.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIProviderCosts and only return the `id`
     * const aIProviderCostsWithIdOnly = await prisma.aIProviderCosts.updateManyAndReturn({
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
    updateManyAndReturn<T extends AIProviderCostsUpdateManyAndReturnArgs>(args: SelectSubset<T, AIProviderCostsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIProviderCostsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AIProviderCosts.
     * @param {AIProviderCostsUpsertArgs} args - Arguments to update or create a AIProviderCosts.
     * @example
     * // Update or create a AIProviderCosts
     * const aIProviderCosts = await prisma.aIProviderCosts.upsert({
     *   create: {
     *     // ... data to create a AIProviderCosts
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIProviderCosts we want to update
     *   }
     * })
     */
    upsert<T extends AIProviderCostsUpsertArgs>(args: SelectSubset<T, AIProviderCostsUpsertArgs<ExtArgs>>): Prisma__AIProviderCostsClient<$Result.GetResult<Prisma.$AIProviderCostsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AIProviderCosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIProviderCostsCountArgs} args - Arguments to filter AIProviderCosts to count.
     * @example
     * // Count the number of AIProviderCosts
     * const count = await prisma.aIProviderCosts.count({
     *   where: {
     *     // ... the filter for the AIProviderCosts we want to count
     *   }
     * })
    **/
    count<T extends AIProviderCostsCountArgs>(
      args?: Subset<T, AIProviderCostsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIProviderCostsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIProviderCosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIProviderCostsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AIProviderCostsAggregateArgs>(args: Subset<T, AIProviderCostsAggregateArgs>): Prisma.PrismaPromise<GetAIProviderCostsAggregateType<T>>

    /**
     * Group by AIProviderCosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIProviderCostsGroupByArgs} args - Group by arguments.
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
      T extends AIProviderCostsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIProviderCostsGroupByArgs['orderBy'] }
        : { orderBy?: AIProviderCostsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AIProviderCostsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIProviderCostsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIProviderCosts model
   */
  readonly fields: AIProviderCostsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIProviderCosts.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIProviderCostsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the AIProviderCosts model
   */
  interface AIProviderCostsFieldRefs {
    readonly id: FieldRef<"AIProviderCosts", 'String'>
    readonly provider: FieldRef<"AIProviderCosts", 'String'>
    readonly model: FieldRef<"AIProviderCosts", 'String'>
    readonly inputTokenCost: FieldRef<"AIProviderCosts", 'Float'>
    readonly outputTokenCost: FieldRef<"AIProviderCosts", 'Float'>
    readonly effectiveDate: FieldRef<"AIProviderCosts", 'DateTime'>
    readonly createdAt: FieldRef<"AIProviderCosts", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AIProviderCosts findUnique
   */
  export type AIProviderCostsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIProviderCosts
     */
    select?: AIProviderCostsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIProviderCosts
     */
    omit?: AIProviderCostsOmit<ExtArgs> | null
    /**
     * Filter, which AIProviderCosts to fetch.
     */
    where: AIProviderCostsWhereUniqueInput
  }

  /**
   * AIProviderCosts findUniqueOrThrow
   */
  export type AIProviderCostsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIProviderCosts
     */
    select?: AIProviderCostsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIProviderCosts
     */
    omit?: AIProviderCostsOmit<ExtArgs> | null
    /**
     * Filter, which AIProviderCosts to fetch.
     */
    where: AIProviderCostsWhereUniqueInput
  }

  /**
   * AIProviderCosts findFirst
   */
  export type AIProviderCostsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIProviderCosts
     */
    select?: AIProviderCostsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIProviderCosts
     */
    omit?: AIProviderCostsOmit<ExtArgs> | null
    /**
     * Filter, which AIProviderCosts to fetch.
     */
    where?: AIProviderCostsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIProviderCosts to fetch.
     */
    orderBy?: AIProviderCostsOrderByWithRelationInput | AIProviderCostsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIProviderCosts.
     */
    cursor?: AIProviderCostsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIProviderCosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIProviderCosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIProviderCosts.
     */
    distinct?: AIProviderCostsScalarFieldEnum | AIProviderCostsScalarFieldEnum[]
  }

  /**
   * AIProviderCosts findFirstOrThrow
   */
  export type AIProviderCostsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIProviderCosts
     */
    select?: AIProviderCostsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIProviderCosts
     */
    omit?: AIProviderCostsOmit<ExtArgs> | null
    /**
     * Filter, which AIProviderCosts to fetch.
     */
    where?: AIProviderCostsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIProviderCosts to fetch.
     */
    orderBy?: AIProviderCostsOrderByWithRelationInput | AIProviderCostsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIProviderCosts.
     */
    cursor?: AIProviderCostsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIProviderCosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIProviderCosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIProviderCosts.
     */
    distinct?: AIProviderCostsScalarFieldEnum | AIProviderCostsScalarFieldEnum[]
  }

  /**
   * AIProviderCosts findMany
   */
  export type AIProviderCostsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIProviderCosts
     */
    select?: AIProviderCostsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIProviderCosts
     */
    omit?: AIProviderCostsOmit<ExtArgs> | null
    /**
     * Filter, which AIProviderCosts to fetch.
     */
    where?: AIProviderCostsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIProviderCosts to fetch.
     */
    orderBy?: AIProviderCostsOrderByWithRelationInput | AIProviderCostsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIProviderCosts.
     */
    cursor?: AIProviderCostsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIProviderCosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIProviderCosts.
     */
    skip?: number
    distinct?: AIProviderCostsScalarFieldEnum | AIProviderCostsScalarFieldEnum[]
  }

  /**
   * AIProviderCosts create
   */
  export type AIProviderCostsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIProviderCosts
     */
    select?: AIProviderCostsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIProviderCosts
     */
    omit?: AIProviderCostsOmit<ExtArgs> | null
    /**
     * The data needed to create a AIProviderCosts.
     */
    data: XOR<AIProviderCostsCreateInput, AIProviderCostsUncheckedCreateInput>
  }

  /**
   * AIProviderCosts createMany
   */
  export type AIProviderCostsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIProviderCosts.
     */
    data: AIProviderCostsCreateManyInput | AIProviderCostsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIProviderCosts createManyAndReturn
   */
  export type AIProviderCostsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIProviderCosts
     */
    select?: AIProviderCostsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIProviderCosts
     */
    omit?: AIProviderCostsOmit<ExtArgs> | null
    /**
     * The data used to create many AIProviderCosts.
     */
    data: AIProviderCostsCreateManyInput | AIProviderCostsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIProviderCosts update
   */
  export type AIProviderCostsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIProviderCosts
     */
    select?: AIProviderCostsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIProviderCosts
     */
    omit?: AIProviderCostsOmit<ExtArgs> | null
    /**
     * The data needed to update a AIProviderCosts.
     */
    data: XOR<AIProviderCostsUpdateInput, AIProviderCostsUncheckedUpdateInput>
    /**
     * Choose, which AIProviderCosts to update.
     */
    where: AIProviderCostsWhereUniqueInput
  }

  /**
   * AIProviderCosts updateMany
   */
  export type AIProviderCostsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIProviderCosts.
     */
    data: XOR<AIProviderCostsUpdateManyMutationInput, AIProviderCostsUncheckedUpdateManyInput>
    /**
     * Filter which AIProviderCosts to update
     */
    where?: AIProviderCostsWhereInput
    /**
     * Limit how many AIProviderCosts to update.
     */
    limit?: number
  }

  /**
   * AIProviderCosts updateManyAndReturn
   */
  export type AIProviderCostsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIProviderCosts
     */
    select?: AIProviderCostsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIProviderCosts
     */
    omit?: AIProviderCostsOmit<ExtArgs> | null
    /**
     * The data used to update AIProviderCosts.
     */
    data: XOR<AIProviderCostsUpdateManyMutationInput, AIProviderCostsUncheckedUpdateManyInput>
    /**
     * Filter which AIProviderCosts to update
     */
    where?: AIProviderCostsWhereInput
    /**
     * Limit how many AIProviderCosts to update.
     */
    limit?: number
  }

  /**
   * AIProviderCosts upsert
   */
  export type AIProviderCostsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIProviderCosts
     */
    select?: AIProviderCostsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIProviderCosts
     */
    omit?: AIProviderCostsOmit<ExtArgs> | null
    /**
     * The filter to search for the AIProviderCosts to update in case it exists.
     */
    where: AIProviderCostsWhereUniqueInput
    /**
     * In case the AIProviderCosts found by the `where` argument doesn't exist, create a new AIProviderCosts with this data.
     */
    create: XOR<AIProviderCostsCreateInput, AIProviderCostsUncheckedCreateInput>
    /**
     * In case the AIProviderCosts was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIProviderCostsUpdateInput, AIProviderCostsUncheckedUpdateInput>
  }

  /**
   * AIProviderCosts delete
   */
  export type AIProviderCostsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIProviderCosts
     */
    select?: AIProviderCostsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIProviderCosts
     */
    omit?: AIProviderCostsOmit<ExtArgs> | null
    /**
     * Filter which AIProviderCosts to delete.
     */
    where: AIProviderCostsWhereUniqueInput
  }

  /**
   * AIProviderCosts deleteMany
   */
  export type AIProviderCostsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIProviderCosts to delete
     */
    where?: AIProviderCostsWhereInput
    /**
     * Limit how many AIProviderCosts to delete.
     */
    limit?: number
  }

  /**
   * AIProviderCosts without action
   */
  export type AIProviderCostsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIProviderCosts
     */
    select?: AIProviderCostsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIProviderCosts
     */
    omit?: AIProviderCostsOmit<ExtArgs> | null
  }


  /**
   * Model AnonymousSession
   */

  export type AggregateAnonymousSession = {
    _count: AnonymousSessionCountAggregateOutputType | null
    _avg: AnonymousSessionAvgAggregateOutputType | null
    _sum: AnonymousSessionSumAggregateOutputType | null
    _min: AnonymousSessionMinAggregateOutputType | null
    _max: AnonymousSessionMaxAggregateOutputType | null
  }

  export type AnonymousSessionAvgAggregateOutputType = {
    totalRecipeAttempts: number | null
    totalSuccessfulExtractions: number | null
  }

  export type AnonymousSessionSumAggregateOutputType = {
    totalRecipeAttempts: number | null
    totalSuccessfulExtractions: number | null
  }

  export type AnonymousSessionMinAggregateOutputType = {
    id: string | null
    sessionId: string | null
    ipAddress: string | null
    userAgent: string | null
    deviceType: string | null
    operatingSystem: string | null
    browser: string | null
    screenResolution: string | null
    timezone: string | null
    language: string | null
    firstSeenAt: Date | null
    lastSeenAt: Date | null
    totalRecipeAttempts: number | null
    totalSuccessfulExtractions: number | null
    hitRateLimit: boolean | null
    rateLimitHitAt: Date | null
    showedSignupPrompt: boolean | null
    signupPromptShownAt: Date | null
    convertedToUser: boolean | null
    convertedUserId: string | null
    convertedAt: Date | null
    referrerDomain: string | null
    countryCode: string | null
    cityName: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AnonymousSessionMaxAggregateOutputType = {
    id: string | null
    sessionId: string | null
    ipAddress: string | null
    userAgent: string | null
    deviceType: string | null
    operatingSystem: string | null
    browser: string | null
    screenResolution: string | null
    timezone: string | null
    language: string | null
    firstSeenAt: Date | null
    lastSeenAt: Date | null
    totalRecipeAttempts: number | null
    totalSuccessfulExtractions: number | null
    hitRateLimit: boolean | null
    rateLimitHitAt: Date | null
    showedSignupPrompt: boolean | null
    signupPromptShownAt: Date | null
    convertedToUser: boolean | null
    convertedUserId: string | null
    convertedAt: Date | null
    referrerDomain: string | null
    countryCode: string | null
    cityName: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AnonymousSessionCountAggregateOutputType = {
    id: number
    sessionId: number
    ipAddress: number
    userAgent: number
    deviceType: number
    operatingSystem: number
    browser: number
    screenResolution: number
    timezone: number
    language: number
    firstSeenAt: number
    lastSeenAt: number
    totalRecipeAttempts: number
    totalSuccessfulExtractions: number
    hitRateLimit: number
    rateLimitHitAt: number
    showedSignupPrompt: number
    signupPromptShownAt: number
    convertedToUser: number
    convertedUserId: number
    convertedAt: number
    referrerDomain: number
    countryCode: number
    cityName: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AnonymousSessionAvgAggregateInputType = {
    totalRecipeAttempts?: true
    totalSuccessfulExtractions?: true
  }

  export type AnonymousSessionSumAggregateInputType = {
    totalRecipeAttempts?: true
    totalSuccessfulExtractions?: true
  }

  export type AnonymousSessionMinAggregateInputType = {
    id?: true
    sessionId?: true
    ipAddress?: true
    userAgent?: true
    deviceType?: true
    operatingSystem?: true
    browser?: true
    screenResolution?: true
    timezone?: true
    language?: true
    firstSeenAt?: true
    lastSeenAt?: true
    totalRecipeAttempts?: true
    totalSuccessfulExtractions?: true
    hitRateLimit?: true
    rateLimitHitAt?: true
    showedSignupPrompt?: true
    signupPromptShownAt?: true
    convertedToUser?: true
    convertedUserId?: true
    convertedAt?: true
    referrerDomain?: true
    countryCode?: true
    cityName?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AnonymousSessionMaxAggregateInputType = {
    id?: true
    sessionId?: true
    ipAddress?: true
    userAgent?: true
    deviceType?: true
    operatingSystem?: true
    browser?: true
    screenResolution?: true
    timezone?: true
    language?: true
    firstSeenAt?: true
    lastSeenAt?: true
    totalRecipeAttempts?: true
    totalSuccessfulExtractions?: true
    hitRateLimit?: true
    rateLimitHitAt?: true
    showedSignupPrompt?: true
    signupPromptShownAt?: true
    convertedToUser?: true
    convertedUserId?: true
    convertedAt?: true
    referrerDomain?: true
    countryCode?: true
    cityName?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AnonymousSessionCountAggregateInputType = {
    id?: true
    sessionId?: true
    ipAddress?: true
    userAgent?: true
    deviceType?: true
    operatingSystem?: true
    browser?: true
    screenResolution?: true
    timezone?: true
    language?: true
    firstSeenAt?: true
    lastSeenAt?: true
    totalRecipeAttempts?: true
    totalSuccessfulExtractions?: true
    hitRateLimit?: true
    rateLimitHitAt?: true
    showedSignupPrompt?: true
    signupPromptShownAt?: true
    convertedToUser?: true
    convertedUserId?: true
    convertedAt?: true
    referrerDomain?: true
    countryCode?: true
    cityName?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AnonymousSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnonymousSession to aggregate.
     */
    where?: AnonymousSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnonymousSessions to fetch.
     */
    orderBy?: AnonymousSessionOrderByWithRelationInput | AnonymousSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnonymousSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnonymousSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnonymousSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AnonymousSessions
    **/
    _count?: true | AnonymousSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AnonymousSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AnonymousSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnonymousSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnonymousSessionMaxAggregateInputType
  }

  export type GetAnonymousSessionAggregateType<T extends AnonymousSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateAnonymousSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnonymousSession[P]>
      : GetScalarType<T[P], AggregateAnonymousSession[P]>
  }




  export type AnonymousSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnonymousSessionWhereInput
    orderBy?: AnonymousSessionOrderByWithAggregationInput | AnonymousSessionOrderByWithAggregationInput[]
    by: AnonymousSessionScalarFieldEnum[] | AnonymousSessionScalarFieldEnum
    having?: AnonymousSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnonymousSessionCountAggregateInputType | true
    _avg?: AnonymousSessionAvgAggregateInputType
    _sum?: AnonymousSessionSumAggregateInputType
    _min?: AnonymousSessionMinAggregateInputType
    _max?: AnonymousSessionMaxAggregateInputType
  }

  export type AnonymousSessionGroupByOutputType = {
    id: string
    sessionId: string
    ipAddress: string
    userAgent: string
    deviceType: string | null
    operatingSystem: string | null
    browser: string | null
    screenResolution: string | null
    timezone: string | null
    language: string | null
    firstSeenAt: Date
    lastSeenAt: Date
    totalRecipeAttempts: number
    totalSuccessfulExtractions: number
    hitRateLimit: boolean
    rateLimitHitAt: Date | null
    showedSignupPrompt: boolean
    signupPromptShownAt: Date | null
    convertedToUser: boolean
    convertedUserId: string | null
    convertedAt: Date | null
    referrerDomain: string | null
    countryCode: string | null
    cityName: string | null
    expiresAt: Date
    createdAt: Date
    updatedAt: Date
    _count: AnonymousSessionCountAggregateOutputType | null
    _avg: AnonymousSessionAvgAggregateOutputType | null
    _sum: AnonymousSessionSumAggregateOutputType | null
    _min: AnonymousSessionMinAggregateOutputType | null
    _max: AnonymousSessionMaxAggregateOutputType | null
  }

  type GetAnonymousSessionGroupByPayload<T extends AnonymousSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnonymousSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnonymousSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnonymousSessionGroupByOutputType[P]>
            : GetScalarType<T[P], AnonymousSessionGroupByOutputType[P]>
        }
      >
    >


  export type AnonymousSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    deviceType?: boolean
    operatingSystem?: boolean
    browser?: boolean
    screenResolution?: boolean
    timezone?: boolean
    language?: boolean
    firstSeenAt?: boolean
    lastSeenAt?: boolean
    totalRecipeAttempts?: boolean
    totalSuccessfulExtractions?: boolean
    hitRateLimit?: boolean
    rateLimitHitAt?: boolean
    showedSignupPrompt?: boolean
    signupPromptShownAt?: boolean
    convertedToUser?: boolean
    convertedUserId?: boolean
    convertedAt?: boolean
    referrerDomain?: boolean
    countryCode?: boolean
    cityName?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["anonymousSession"]>

  export type AnonymousSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    deviceType?: boolean
    operatingSystem?: boolean
    browser?: boolean
    screenResolution?: boolean
    timezone?: boolean
    language?: boolean
    firstSeenAt?: boolean
    lastSeenAt?: boolean
    totalRecipeAttempts?: boolean
    totalSuccessfulExtractions?: boolean
    hitRateLimit?: boolean
    rateLimitHitAt?: boolean
    showedSignupPrompt?: boolean
    signupPromptShownAt?: boolean
    convertedToUser?: boolean
    convertedUserId?: boolean
    convertedAt?: boolean
    referrerDomain?: boolean
    countryCode?: boolean
    cityName?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["anonymousSession"]>

  export type AnonymousSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    deviceType?: boolean
    operatingSystem?: boolean
    browser?: boolean
    screenResolution?: boolean
    timezone?: boolean
    language?: boolean
    firstSeenAt?: boolean
    lastSeenAt?: boolean
    totalRecipeAttempts?: boolean
    totalSuccessfulExtractions?: boolean
    hitRateLimit?: boolean
    rateLimitHitAt?: boolean
    showedSignupPrompt?: boolean
    signupPromptShownAt?: boolean
    convertedToUser?: boolean
    convertedUserId?: boolean
    convertedAt?: boolean
    referrerDomain?: boolean
    countryCode?: boolean
    cityName?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["anonymousSession"]>

  export type AnonymousSessionSelectScalar = {
    id?: boolean
    sessionId?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    deviceType?: boolean
    operatingSystem?: boolean
    browser?: boolean
    screenResolution?: boolean
    timezone?: boolean
    language?: boolean
    firstSeenAt?: boolean
    lastSeenAt?: boolean
    totalRecipeAttempts?: boolean
    totalSuccessfulExtractions?: boolean
    hitRateLimit?: boolean
    rateLimitHitAt?: boolean
    showedSignupPrompt?: boolean
    signupPromptShownAt?: boolean
    convertedToUser?: boolean
    convertedUserId?: boolean
    convertedAt?: boolean
    referrerDomain?: boolean
    countryCode?: boolean
    cityName?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AnonymousSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionId" | "ipAddress" | "userAgent" | "deviceType" | "operatingSystem" | "browser" | "screenResolution" | "timezone" | "language" | "firstSeenAt" | "lastSeenAt" | "totalRecipeAttempts" | "totalSuccessfulExtractions" | "hitRateLimit" | "rateLimitHitAt" | "showedSignupPrompt" | "signupPromptShownAt" | "convertedToUser" | "convertedUserId" | "convertedAt" | "referrerDomain" | "countryCode" | "cityName" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["anonymousSession"]>

  export type $AnonymousSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AnonymousSession"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionId: string
      ipAddress: string
      userAgent: string
      deviceType: string | null
      operatingSystem: string | null
      browser: string | null
      screenResolution: string | null
      timezone: string | null
      language: string | null
      firstSeenAt: Date
      lastSeenAt: Date
      totalRecipeAttempts: number
      totalSuccessfulExtractions: number
      hitRateLimit: boolean
      rateLimitHitAt: Date | null
      showedSignupPrompt: boolean
      signupPromptShownAt: Date | null
      convertedToUser: boolean
      convertedUserId: string | null
      convertedAt: Date | null
      referrerDomain: string | null
      countryCode: string | null
      cityName: string | null
      expiresAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["anonymousSession"]>
    composites: {}
  }

  type AnonymousSessionGetPayload<S extends boolean | null | undefined | AnonymousSessionDefaultArgs> = $Result.GetResult<Prisma.$AnonymousSessionPayload, S>

  type AnonymousSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AnonymousSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnonymousSessionCountAggregateInputType | true
    }

  export interface AnonymousSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AnonymousSession'], meta: { name: 'AnonymousSession' } }
    /**
     * Find zero or one AnonymousSession that matches the filter.
     * @param {AnonymousSessionFindUniqueArgs} args - Arguments to find a AnonymousSession
     * @example
     * // Get one AnonymousSession
     * const anonymousSession = await prisma.anonymousSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnonymousSessionFindUniqueArgs>(args: SelectSubset<T, AnonymousSessionFindUniqueArgs<ExtArgs>>): Prisma__AnonymousSessionClient<$Result.GetResult<Prisma.$AnonymousSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AnonymousSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnonymousSessionFindUniqueOrThrowArgs} args - Arguments to find a AnonymousSession
     * @example
     * // Get one AnonymousSession
     * const anonymousSession = await prisma.anonymousSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnonymousSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, AnonymousSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnonymousSessionClient<$Result.GetResult<Prisma.$AnonymousSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AnonymousSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnonymousSessionFindFirstArgs} args - Arguments to find a AnonymousSession
     * @example
     * // Get one AnonymousSession
     * const anonymousSession = await prisma.anonymousSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnonymousSessionFindFirstArgs>(args?: SelectSubset<T, AnonymousSessionFindFirstArgs<ExtArgs>>): Prisma__AnonymousSessionClient<$Result.GetResult<Prisma.$AnonymousSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AnonymousSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnonymousSessionFindFirstOrThrowArgs} args - Arguments to find a AnonymousSession
     * @example
     * // Get one AnonymousSession
     * const anonymousSession = await prisma.anonymousSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnonymousSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, AnonymousSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnonymousSessionClient<$Result.GetResult<Prisma.$AnonymousSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AnonymousSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnonymousSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AnonymousSessions
     * const anonymousSessions = await prisma.anonymousSession.findMany()
     * 
     * // Get first 10 AnonymousSessions
     * const anonymousSessions = await prisma.anonymousSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const anonymousSessionWithIdOnly = await prisma.anonymousSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnonymousSessionFindManyArgs>(args?: SelectSubset<T, AnonymousSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnonymousSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AnonymousSession.
     * @param {AnonymousSessionCreateArgs} args - Arguments to create a AnonymousSession.
     * @example
     * // Create one AnonymousSession
     * const AnonymousSession = await prisma.anonymousSession.create({
     *   data: {
     *     // ... data to create a AnonymousSession
     *   }
     * })
     * 
     */
    create<T extends AnonymousSessionCreateArgs>(args: SelectSubset<T, AnonymousSessionCreateArgs<ExtArgs>>): Prisma__AnonymousSessionClient<$Result.GetResult<Prisma.$AnonymousSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AnonymousSessions.
     * @param {AnonymousSessionCreateManyArgs} args - Arguments to create many AnonymousSessions.
     * @example
     * // Create many AnonymousSessions
     * const anonymousSession = await prisma.anonymousSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnonymousSessionCreateManyArgs>(args?: SelectSubset<T, AnonymousSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AnonymousSessions and returns the data saved in the database.
     * @param {AnonymousSessionCreateManyAndReturnArgs} args - Arguments to create many AnonymousSessions.
     * @example
     * // Create many AnonymousSessions
     * const anonymousSession = await prisma.anonymousSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AnonymousSessions and only return the `id`
     * const anonymousSessionWithIdOnly = await prisma.anonymousSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnonymousSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, AnonymousSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnonymousSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AnonymousSession.
     * @param {AnonymousSessionDeleteArgs} args - Arguments to delete one AnonymousSession.
     * @example
     * // Delete one AnonymousSession
     * const AnonymousSession = await prisma.anonymousSession.delete({
     *   where: {
     *     // ... filter to delete one AnonymousSession
     *   }
     * })
     * 
     */
    delete<T extends AnonymousSessionDeleteArgs>(args: SelectSubset<T, AnonymousSessionDeleteArgs<ExtArgs>>): Prisma__AnonymousSessionClient<$Result.GetResult<Prisma.$AnonymousSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AnonymousSession.
     * @param {AnonymousSessionUpdateArgs} args - Arguments to update one AnonymousSession.
     * @example
     * // Update one AnonymousSession
     * const anonymousSession = await prisma.anonymousSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnonymousSessionUpdateArgs>(args: SelectSubset<T, AnonymousSessionUpdateArgs<ExtArgs>>): Prisma__AnonymousSessionClient<$Result.GetResult<Prisma.$AnonymousSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AnonymousSessions.
     * @param {AnonymousSessionDeleteManyArgs} args - Arguments to filter AnonymousSessions to delete.
     * @example
     * // Delete a few AnonymousSessions
     * const { count } = await prisma.anonymousSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnonymousSessionDeleteManyArgs>(args?: SelectSubset<T, AnonymousSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AnonymousSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnonymousSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AnonymousSessions
     * const anonymousSession = await prisma.anonymousSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnonymousSessionUpdateManyArgs>(args: SelectSubset<T, AnonymousSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AnonymousSessions and returns the data updated in the database.
     * @param {AnonymousSessionUpdateManyAndReturnArgs} args - Arguments to update many AnonymousSessions.
     * @example
     * // Update many AnonymousSessions
     * const anonymousSession = await prisma.anonymousSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AnonymousSessions and only return the `id`
     * const anonymousSessionWithIdOnly = await prisma.anonymousSession.updateManyAndReturn({
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
    updateManyAndReturn<T extends AnonymousSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, AnonymousSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnonymousSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AnonymousSession.
     * @param {AnonymousSessionUpsertArgs} args - Arguments to update or create a AnonymousSession.
     * @example
     * // Update or create a AnonymousSession
     * const anonymousSession = await prisma.anonymousSession.upsert({
     *   create: {
     *     // ... data to create a AnonymousSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AnonymousSession we want to update
     *   }
     * })
     */
    upsert<T extends AnonymousSessionUpsertArgs>(args: SelectSubset<T, AnonymousSessionUpsertArgs<ExtArgs>>): Prisma__AnonymousSessionClient<$Result.GetResult<Prisma.$AnonymousSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AnonymousSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnonymousSessionCountArgs} args - Arguments to filter AnonymousSessions to count.
     * @example
     * // Count the number of AnonymousSessions
     * const count = await prisma.anonymousSession.count({
     *   where: {
     *     // ... the filter for the AnonymousSessions we want to count
     *   }
     * })
    **/
    count<T extends AnonymousSessionCountArgs>(
      args?: Subset<T, AnonymousSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnonymousSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AnonymousSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnonymousSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AnonymousSessionAggregateArgs>(args: Subset<T, AnonymousSessionAggregateArgs>): Prisma.PrismaPromise<GetAnonymousSessionAggregateType<T>>

    /**
     * Group by AnonymousSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnonymousSessionGroupByArgs} args - Group by arguments.
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
      T extends AnonymousSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnonymousSessionGroupByArgs['orderBy'] }
        : { orderBy?: AnonymousSessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AnonymousSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnonymousSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AnonymousSession model
   */
  readonly fields: AnonymousSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AnonymousSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnonymousSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the AnonymousSession model
   */
  interface AnonymousSessionFieldRefs {
    readonly id: FieldRef<"AnonymousSession", 'String'>
    readonly sessionId: FieldRef<"AnonymousSession", 'String'>
    readonly ipAddress: FieldRef<"AnonymousSession", 'String'>
    readonly userAgent: FieldRef<"AnonymousSession", 'String'>
    readonly deviceType: FieldRef<"AnonymousSession", 'String'>
    readonly operatingSystem: FieldRef<"AnonymousSession", 'String'>
    readonly browser: FieldRef<"AnonymousSession", 'String'>
    readonly screenResolution: FieldRef<"AnonymousSession", 'String'>
    readonly timezone: FieldRef<"AnonymousSession", 'String'>
    readonly language: FieldRef<"AnonymousSession", 'String'>
    readonly firstSeenAt: FieldRef<"AnonymousSession", 'DateTime'>
    readonly lastSeenAt: FieldRef<"AnonymousSession", 'DateTime'>
    readonly totalRecipeAttempts: FieldRef<"AnonymousSession", 'Int'>
    readonly totalSuccessfulExtractions: FieldRef<"AnonymousSession", 'Int'>
    readonly hitRateLimit: FieldRef<"AnonymousSession", 'Boolean'>
    readonly rateLimitHitAt: FieldRef<"AnonymousSession", 'DateTime'>
    readonly showedSignupPrompt: FieldRef<"AnonymousSession", 'Boolean'>
    readonly signupPromptShownAt: FieldRef<"AnonymousSession", 'DateTime'>
    readonly convertedToUser: FieldRef<"AnonymousSession", 'Boolean'>
    readonly convertedUserId: FieldRef<"AnonymousSession", 'String'>
    readonly convertedAt: FieldRef<"AnonymousSession", 'DateTime'>
    readonly referrerDomain: FieldRef<"AnonymousSession", 'String'>
    readonly countryCode: FieldRef<"AnonymousSession", 'String'>
    readonly cityName: FieldRef<"AnonymousSession", 'String'>
    readonly expiresAt: FieldRef<"AnonymousSession", 'DateTime'>
    readonly createdAt: FieldRef<"AnonymousSession", 'DateTime'>
    readonly updatedAt: FieldRef<"AnonymousSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AnonymousSession findUnique
   */
  export type AnonymousSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousSession
     */
    select?: AnonymousSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousSession
     */
    omit?: AnonymousSessionOmit<ExtArgs> | null
    /**
     * Filter, which AnonymousSession to fetch.
     */
    where: AnonymousSessionWhereUniqueInput
  }

  /**
   * AnonymousSession findUniqueOrThrow
   */
  export type AnonymousSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousSession
     */
    select?: AnonymousSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousSession
     */
    omit?: AnonymousSessionOmit<ExtArgs> | null
    /**
     * Filter, which AnonymousSession to fetch.
     */
    where: AnonymousSessionWhereUniqueInput
  }

  /**
   * AnonymousSession findFirst
   */
  export type AnonymousSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousSession
     */
    select?: AnonymousSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousSession
     */
    omit?: AnonymousSessionOmit<ExtArgs> | null
    /**
     * Filter, which AnonymousSession to fetch.
     */
    where?: AnonymousSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnonymousSessions to fetch.
     */
    orderBy?: AnonymousSessionOrderByWithRelationInput | AnonymousSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnonymousSessions.
     */
    cursor?: AnonymousSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnonymousSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnonymousSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnonymousSessions.
     */
    distinct?: AnonymousSessionScalarFieldEnum | AnonymousSessionScalarFieldEnum[]
  }

  /**
   * AnonymousSession findFirstOrThrow
   */
  export type AnonymousSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousSession
     */
    select?: AnonymousSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousSession
     */
    omit?: AnonymousSessionOmit<ExtArgs> | null
    /**
     * Filter, which AnonymousSession to fetch.
     */
    where?: AnonymousSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnonymousSessions to fetch.
     */
    orderBy?: AnonymousSessionOrderByWithRelationInput | AnonymousSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnonymousSessions.
     */
    cursor?: AnonymousSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnonymousSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnonymousSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnonymousSessions.
     */
    distinct?: AnonymousSessionScalarFieldEnum | AnonymousSessionScalarFieldEnum[]
  }

  /**
   * AnonymousSession findMany
   */
  export type AnonymousSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousSession
     */
    select?: AnonymousSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousSession
     */
    omit?: AnonymousSessionOmit<ExtArgs> | null
    /**
     * Filter, which AnonymousSessions to fetch.
     */
    where?: AnonymousSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnonymousSessions to fetch.
     */
    orderBy?: AnonymousSessionOrderByWithRelationInput | AnonymousSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AnonymousSessions.
     */
    cursor?: AnonymousSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnonymousSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnonymousSessions.
     */
    skip?: number
    distinct?: AnonymousSessionScalarFieldEnum | AnonymousSessionScalarFieldEnum[]
  }

  /**
   * AnonymousSession create
   */
  export type AnonymousSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousSession
     */
    select?: AnonymousSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousSession
     */
    omit?: AnonymousSessionOmit<ExtArgs> | null
    /**
     * The data needed to create a AnonymousSession.
     */
    data: XOR<AnonymousSessionCreateInput, AnonymousSessionUncheckedCreateInput>
  }

  /**
   * AnonymousSession createMany
   */
  export type AnonymousSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AnonymousSessions.
     */
    data: AnonymousSessionCreateManyInput | AnonymousSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AnonymousSession createManyAndReturn
   */
  export type AnonymousSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousSession
     */
    select?: AnonymousSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousSession
     */
    omit?: AnonymousSessionOmit<ExtArgs> | null
    /**
     * The data used to create many AnonymousSessions.
     */
    data: AnonymousSessionCreateManyInput | AnonymousSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AnonymousSession update
   */
  export type AnonymousSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousSession
     */
    select?: AnonymousSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousSession
     */
    omit?: AnonymousSessionOmit<ExtArgs> | null
    /**
     * The data needed to update a AnonymousSession.
     */
    data: XOR<AnonymousSessionUpdateInput, AnonymousSessionUncheckedUpdateInput>
    /**
     * Choose, which AnonymousSession to update.
     */
    where: AnonymousSessionWhereUniqueInput
  }

  /**
   * AnonymousSession updateMany
   */
  export type AnonymousSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AnonymousSessions.
     */
    data: XOR<AnonymousSessionUpdateManyMutationInput, AnonymousSessionUncheckedUpdateManyInput>
    /**
     * Filter which AnonymousSessions to update
     */
    where?: AnonymousSessionWhereInput
    /**
     * Limit how many AnonymousSessions to update.
     */
    limit?: number
  }

  /**
   * AnonymousSession updateManyAndReturn
   */
  export type AnonymousSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousSession
     */
    select?: AnonymousSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousSession
     */
    omit?: AnonymousSessionOmit<ExtArgs> | null
    /**
     * The data used to update AnonymousSessions.
     */
    data: XOR<AnonymousSessionUpdateManyMutationInput, AnonymousSessionUncheckedUpdateManyInput>
    /**
     * Filter which AnonymousSessions to update
     */
    where?: AnonymousSessionWhereInput
    /**
     * Limit how many AnonymousSessions to update.
     */
    limit?: number
  }

  /**
   * AnonymousSession upsert
   */
  export type AnonymousSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousSession
     */
    select?: AnonymousSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousSession
     */
    omit?: AnonymousSessionOmit<ExtArgs> | null
    /**
     * The filter to search for the AnonymousSession to update in case it exists.
     */
    where: AnonymousSessionWhereUniqueInput
    /**
     * In case the AnonymousSession found by the `where` argument doesn't exist, create a new AnonymousSession with this data.
     */
    create: XOR<AnonymousSessionCreateInput, AnonymousSessionUncheckedCreateInput>
    /**
     * In case the AnonymousSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnonymousSessionUpdateInput, AnonymousSessionUncheckedUpdateInput>
  }

  /**
   * AnonymousSession delete
   */
  export type AnonymousSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousSession
     */
    select?: AnonymousSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousSession
     */
    omit?: AnonymousSessionOmit<ExtArgs> | null
    /**
     * Filter which AnonymousSession to delete.
     */
    where: AnonymousSessionWhereUniqueInput
  }

  /**
   * AnonymousSession deleteMany
   */
  export type AnonymousSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnonymousSessions to delete
     */
    where?: AnonymousSessionWhereInput
    /**
     * Limit how many AnonymousSessions to delete.
     */
    limit?: number
  }

  /**
   * AnonymousSession without action
   */
  export type AnonymousSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnonymousSession
     */
    select?: AnonymousSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnonymousSession
     */
    omit?: AnonymousSessionOmit<ExtArgs> | null
  }


  /**
   * Model ConversionEvent
   */

  export type AggregateConversionEvent = {
    _count: ConversionEventCountAggregateOutputType | null
    _avg: ConversionEventAvgAggregateOutputType | null
    _sum: ConversionEventSumAggregateOutputType | null
    _min: ConversionEventMinAggregateOutputType | null
    _max: ConversionEventMaxAggregateOutputType | null
  }

  export type ConversionEventAvgAggregateOutputType = {
    sessionDuration: number | null
  }

  export type ConversionEventSumAggregateOutputType = {
    sessionDuration: number | null
  }

  export type ConversionEventMinAggregateOutputType = {
    id: string | null
    sessionId: string | null
    userId: string | null
    eventType: $Enums.ConversionEventType | null
    recipeUrl: string | null
    pageUrl: string | null
    sessionDuration: number | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type ConversionEventMaxAggregateOutputType = {
    id: string | null
    sessionId: string | null
    userId: string | null
    eventType: $Enums.ConversionEventType | null
    recipeUrl: string | null
    pageUrl: string | null
    sessionDuration: number | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type ConversionEventCountAggregateOutputType = {
    id: number
    sessionId: number
    userId: number
    eventType: number
    eventData: number
    recipeUrl: number
    pageUrl: number
    sessionDuration: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type ConversionEventAvgAggregateInputType = {
    sessionDuration?: true
  }

  export type ConversionEventSumAggregateInputType = {
    sessionDuration?: true
  }

  export type ConversionEventMinAggregateInputType = {
    id?: true
    sessionId?: true
    userId?: true
    eventType?: true
    recipeUrl?: true
    pageUrl?: true
    sessionDuration?: true
    expiresAt?: true
    createdAt?: true
  }

  export type ConversionEventMaxAggregateInputType = {
    id?: true
    sessionId?: true
    userId?: true
    eventType?: true
    recipeUrl?: true
    pageUrl?: true
    sessionDuration?: true
    expiresAt?: true
    createdAt?: true
  }

  export type ConversionEventCountAggregateInputType = {
    id?: true
    sessionId?: true
    userId?: true
    eventType?: true
    eventData?: true
    recipeUrl?: true
    pageUrl?: true
    sessionDuration?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type ConversionEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConversionEvent to aggregate.
     */
    where?: ConversionEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConversionEvents to fetch.
     */
    orderBy?: ConversionEventOrderByWithRelationInput | ConversionEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConversionEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConversionEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConversionEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ConversionEvents
    **/
    _count?: true | ConversionEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ConversionEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ConversionEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConversionEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConversionEventMaxAggregateInputType
  }

  export type GetConversionEventAggregateType<T extends ConversionEventAggregateArgs> = {
        [P in keyof T & keyof AggregateConversionEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConversionEvent[P]>
      : GetScalarType<T[P], AggregateConversionEvent[P]>
  }




  export type ConversionEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversionEventWhereInput
    orderBy?: ConversionEventOrderByWithAggregationInput | ConversionEventOrderByWithAggregationInput[]
    by: ConversionEventScalarFieldEnum[] | ConversionEventScalarFieldEnum
    having?: ConversionEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConversionEventCountAggregateInputType | true
    _avg?: ConversionEventAvgAggregateInputType
    _sum?: ConversionEventSumAggregateInputType
    _min?: ConversionEventMinAggregateInputType
    _max?: ConversionEventMaxAggregateInputType
  }

  export type ConversionEventGroupByOutputType = {
    id: string
    sessionId: string
    userId: string | null
    eventType: $Enums.ConversionEventType
    eventData: JsonValue | null
    recipeUrl: string | null
    pageUrl: string | null
    sessionDuration: number | null
    expiresAt: Date
    createdAt: Date
    _count: ConversionEventCountAggregateOutputType | null
    _avg: ConversionEventAvgAggregateOutputType | null
    _sum: ConversionEventSumAggregateOutputType | null
    _min: ConversionEventMinAggregateOutputType | null
    _max: ConversionEventMaxAggregateOutputType | null
  }

  type GetConversionEventGroupByPayload<T extends ConversionEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConversionEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConversionEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConversionEventGroupByOutputType[P]>
            : GetScalarType<T[P], ConversionEventGroupByOutputType[P]>
        }
      >
    >


  export type ConversionEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    userId?: boolean
    eventType?: boolean
    eventData?: boolean
    recipeUrl?: boolean
    pageUrl?: boolean
    sessionDuration?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["conversionEvent"]>

  export type ConversionEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    userId?: boolean
    eventType?: boolean
    eventData?: boolean
    recipeUrl?: boolean
    pageUrl?: boolean
    sessionDuration?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["conversionEvent"]>

  export type ConversionEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    userId?: boolean
    eventType?: boolean
    eventData?: boolean
    recipeUrl?: boolean
    pageUrl?: boolean
    sessionDuration?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["conversionEvent"]>

  export type ConversionEventSelectScalar = {
    id?: boolean
    sessionId?: boolean
    userId?: boolean
    eventType?: boolean
    eventData?: boolean
    recipeUrl?: boolean
    pageUrl?: boolean
    sessionDuration?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }

  export type ConversionEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionId" | "userId" | "eventType" | "eventData" | "recipeUrl" | "pageUrl" | "sessionDuration" | "expiresAt" | "createdAt", ExtArgs["result"]["conversionEvent"]>

  export type $ConversionEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ConversionEvent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionId: string
      userId: string | null
      eventType: $Enums.ConversionEventType
      eventData: Prisma.JsonValue | null
      recipeUrl: string | null
      pageUrl: string | null
      sessionDuration: number | null
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["conversionEvent"]>
    composites: {}
  }

  type ConversionEventGetPayload<S extends boolean | null | undefined | ConversionEventDefaultArgs> = $Result.GetResult<Prisma.$ConversionEventPayload, S>

  type ConversionEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConversionEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConversionEventCountAggregateInputType | true
    }

  export interface ConversionEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ConversionEvent'], meta: { name: 'ConversionEvent' } }
    /**
     * Find zero or one ConversionEvent that matches the filter.
     * @param {ConversionEventFindUniqueArgs} args - Arguments to find a ConversionEvent
     * @example
     * // Get one ConversionEvent
     * const conversionEvent = await prisma.conversionEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConversionEventFindUniqueArgs>(args: SelectSubset<T, ConversionEventFindUniqueArgs<ExtArgs>>): Prisma__ConversionEventClient<$Result.GetResult<Prisma.$ConversionEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ConversionEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConversionEventFindUniqueOrThrowArgs} args - Arguments to find a ConversionEvent
     * @example
     * // Get one ConversionEvent
     * const conversionEvent = await prisma.conversionEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConversionEventFindUniqueOrThrowArgs>(args: SelectSubset<T, ConversionEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConversionEventClient<$Result.GetResult<Prisma.$ConversionEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ConversionEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversionEventFindFirstArgs} args - Arguments to find a ConversionEvent
     * @example
     * // Get one ConversionEvent
     * const conversionEvent = await prisma.conversionEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConversionEventFindFirstArgs>(args?: SelectSubset<T, ConversionEventFindFirstArgs<ExtArgs>>): Prisma__ConversionEventClient<$Result.GetResult<Prisma.$ConversionEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ConversionEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversionEventFindFirstOrThrowArgs} args - Arguments to find a ConversionEvent
     * @example
     * // Get one ConversionEvent
     * const conversionEvent = await prisma.conversionEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConversionEventFindFirstOrThrowArgs>(args?: SelectSubset<T, ConversionEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConversionEventClient<$Result.GetResult<Prisma.$ConversionEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ConversionEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversionEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ConversionEvents
     * const conversionEvents = await prisma.conversionEvent.findMany()
     * 
     * // Get first 10 ConversionEvents
     * const conversionEvents = await prisma.conversionEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const conversionEventWithIdOnly = await prisma.conversionEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConversionEventFindManyArgs>(args?: SelectSubset<T, ConversionEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversionEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ConversionEvent.
     * @param {ConversionEventCreateArgs} args - Arguments to create a ConversionEvent.
     * @example
     * // Create one ConversionEvent
     * const ConversionEvent = await prisma.conversionEvent.create({
     *   data: {
     *     // ... data to create a ConversionEvent
     *   }
     * })
     * 
     */
    create<T extends ConversionEventCreateArgs>(args: SelectSubset<T, ConversionEventCreateArgs<ExtArgs>>): Prisma__ConversionEventClient<$Result.GetResult<Prisma.$ConversionEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ConversionEvents.
     * @param {ConversionEventCreateManyArgs} args - Arguments to create many ConversionEvents.
     * @example
     * // Create many ConversionEvents
     * const conversionEvent = await prisma.conversionEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConversionEventCreateManyArgs>(args?: SelectSubset<T, ConversionEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ConversionEvents and returns the data saved in the database.
     * @param {ConversionEventCreateManyAndReturnArgs} args - Arguments to create many ConversionEvents.
     * @example
     * // Create many ConversionEvents
     * const conversionEvent = await prisma.conversionEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ConversionEvents and only return the `id`
     * const conversionEventWithIdOnly = await prisma.conversionEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConversionEventCreateManyAndReturnArgs>(args?: SelectSubset<T, ConversionEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversionEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ConversionEvent.
     * @param {ConversionEventDeleteArgs} args - Arguments to delete one ConversionEvent.
     * @example
     * // Delete one ConversionEvent
     * const ConversionEvent = await prisma.conversionEvent.delete({
     *   where: {
     *     // ... filter to delete one ConversionEvent
     *   }
     * })
     * 
     */
    delete<T extends ConversionEventDeleteArgs>(args: SelectSubset<T, ConversionEventDeleteArgs<ExtArgs>>): Prisma__ConversionEventClient<$Result.GetResult<Prisma.$ConversionEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ConversionEvent.
     * @param {ConversionEventUpdateArgs} args - Arguments to update one ConversionEvent.
     * @example
     * // Update one ConversionEvent
     * const conversionEvent = await prisma.conversionEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConversionEventUpdateArgs>(args: SelectSubset<T, ConversionEventUpdateArgs<ExtArgs>>): Prisma__ConversionEventClient<$Result.GetResult<Prisma.$ConversionEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ConversionEvents.
     * @param {ConversionEventDeleteManyArgs} args - Arguments to filter ConversionEvents to delete.
     * @example
     * // Delete a few ConversionEvents
     * const { count } = await prisma.conversionEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConversionEventDeleteManyArgs>(args?: SelectSubset<T, ConversionEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConversionEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversionEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ConversionEvents
     * const conversionEvent = await prisma.conversionEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConversionEventUpdateManyArgs>(args: SelectSubset<T, ConversionEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConversionEvents and returns the data updated in the database.
     * @param {ConversionEventUpdateManyAndReturnArgs} args - Arguments to update many ConversionEvents.
     * @example
     * // Update many ConversionEvents
     * const conversionEvent = await prisma.conversionEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ConversionEvents and only return the `id`
     * const conversionEventWithIdOnly = await prisma.conversionEvent.updateManyAndReturn({
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
    updateManyAndReturn<T extends ConversionEventUpdateManyAndReturnArgs>(args: SelectSubset<T, ConversionEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversionEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ConversionEvent.
     * @param {ConversionEventUpsertArgs} args - Arguments to update or create a ConversionEvent.
     * @example
     * // Update or create a ConversionEvent
     * const conversionEvent = await prisma.conversionEvent.upsert({
     *   create: {
     *     // ... data to create a ConversionEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ConversionEvent we want to update
     *   }
     * })
     */
    upsert<T extends ConversionEventUpsertArgs>(args: SelectSubset<T, ConversionEventUpsertArgs<ExtArgs>>): Prisma__ConversionEventClient<$Result.GetResult<Prisma.$ConversionEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ConversionEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversionEventCountArgs} args - Arguments to filter ConversionEvents to count.
     * @example
     * // Count the number of ConversionEvents
     * const count = await prisma.conversionEvent.count({
     *   where: {
     *     // ... the filter for the ConversionEvents we want to count
     *   }
     * })
    **/
    count<T extends ConversionEventCountArgs>(
      args?: Subset<T, ConversionEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConversionEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ConversionEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversionEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ConversionEventAggregateArgs>(args: Subset<T, ConversionEventAggregateArgs>): Prisma.PrismaPromise<GetConversionEventAggregateType<T>>

    /**
     * Group by ConversionEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversionEventGroupByArgs} args - Group by arguments.
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
      T extends ConversionEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConversionEventGroupByArgs['orderBy'] }
        : { orderBy?: ConversionEventGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ConversionEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConversionEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ConversionEvent model
   */
  readonly fields: ConversionEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ConversionEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConversionEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the ConversionEvent model
   */
  interface ConversionEventFieldRefs {
    readonly id: FieldRef<"ConversionEvent", 'String'>
    readonly sessionId: FieldRef<"ConversionEvent", 'String'>
    readonly userId: FieldRef<"ConversionEvent", 'String'>
    readonly eventType: FieldRef<"ConversionEvent", 'ConversionEventType'>
    readonly eventData: FieldRef<"ConversionEvent", 'Json'>
    readonly recipeUrl: FieldRef<"ConversionEvent", 'String'>
    readonly pageUrl: FieldRef<"ConversionEvent", 'String'>
    readonly sessionDuration: FieldRef<"ConversionEvent", 'Int'>
    readonly expiresAt: FieldRef<"ConversionEvent", 'DateTime'>
    readonly createdAt: FieldRef<"ConversionEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ConversionEvent findUnique
   */
  export type ConversionEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversionEvent
     */
    select?: ConversionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversionEvent
     */
    omit?: ConversionEventOmit<ExtArgs> | null
    /**
     * Filter, which ConversionEvent to fetch.
     */
    where: ConversionEventWhereUniqueInput
  }

  /**
   * ConversionEvent findUniqueOrThrow
   */
  export type ConversionEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversionEvent
     */
    select?: ConversionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversionEvent
     */
    omit?: ConversionEventOmit<ExtArgs> | null
    /**
     * Filter, which ConversionEvent to fetch.
     */
    where: ConversionEventWhereUniqueInput
  }

  /**
   * ConversionEvent findFirst
   */
  export type ConversionEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversionEvent
     */
    select?: ConversionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversionEvent
     */
    omit?: ConversionEventOmit<ExtArgs> | null
    /**
     * Filter, which ConversionEvent to fetch.
     */
    where?: ConversionEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConversionEvents to fetch.
     */
    orderBy?: ConversionEventOrderByWithRelationInput | ConversionEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConversionEvents.
     */
    cursor?: ConversionEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConversionEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConversionEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConversionEvents.
     */
    distinct?: ConversionEventScalarFieldEnum | ConversionEventScalarFieldEnum[]
  }

  /**
   * ConversionEvent findFirstOrThrow
   */
  export type ConversionEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversionEvent
     */
    select?: ConversionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversionEvent
     */
    omit?: ConversionEventOmit<ExtArgs> | null
    /**
     * Filter, which ConversionEvent to fetch.
     */
    where?: ConversionEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConversionEvents to fetch.
     */
    orderBy?: ConversionEventOrderByWithRelationInput | ConversionEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConversionEvents.
     */
    cursor?: ConversionEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConversionEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConversionEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConversionEvents.
     */
    distinct?: ConversionEventScalarFieldEnum | ConversionEventScalarFieldEnum[]
  }

  /**
   * ConversionEvent findMany
   */
  export type ConversionEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversionEvent
     */
    select?: ConversionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversionEvent
     */
    omit?: ConversionEventOmit<ExtArgs> | null
    /**
     * Filter, which ConversionEvents to fetch.
     */
    where?: ConversionEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConversionEvents to fetch.
     */
    orderBy?: ConversionEventOrderByWithRelationInput | ConversionEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ConversionEvents.
     */
    cursor?: ConversionEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConversionEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConversionEvents.
     */
    skip?: number
    distinct?: ConversionEventScalarFieldEnum | ConversionEventScalarFieldEnum[]
  }

  /**
   * ConversionEvent create
   */
  export type ConversionEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversionEvent
     */
    select?: ConversionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversionEvent
     */
    omit?: ConversionEventOmit<ExtArgs> | null
    /**
     * The data needed to create a ConversionEvent.
     */
    data: XOR<ConversionEventCreateInput, ConversionEventUncheckedCreateInput>
  }

  /**
   * ConversionEvent createMany
   */
  export type ConversionEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ConversionEvents.
     */
    data: ConversionEventCreateManyInput | ConversionEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ConversionEvent createManyAndReturn
   */
  export type ConversionEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversionEvent
     */
    select?: ConversionEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ConversionEvent
     */
    omit?: ConversionEventOmit<ExtArgs> | null
    /**
     * The data used to create many ConversionEvents.
     */
    data: ConversionEventCreateManyInput | ConversionEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ConversionEvent update
   */
  export type ConversionEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversionEvent
     */
    select?: ConversionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversionEvent
     */
    omit?: ConversionEventOmit<ExtArgs> | null
    /**
     * The data needed to update a ConversionEvent.
     */
    data: XOR<ConversionEventUpdateInput, ConversionEventUncheckedUpdateInput>
    /**
     * Choose, which ConversionEvent to update.
     */
    where: ConversionEventWhereUniqueInput
  }

  /**
   * ConversionEvent updateMany
   */
  export type ConversionEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ConversionEvents.
     */
    data: XOR<ConversionEventUpdateManyMutationInput, ConversionEventUncheckedUpdateManyInput>
    /**
     * Filter which ConversionEvents to update
     */
    where?: ConversionEventWhereInput
    /**
     * Limit how many ConversionEvents to update.
     */
    limit?: number
  }

  /**
   * ConversionEvent updateManyAndReturn
   */
  export type ConversionEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversionEvent
     */
    select?: ConversionEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ConversionEvent
     */
    omit?: ConversionEventOmit<ExtArgs> | null
    /**
     * The data used to update ConversionEvents.
     */
    data: XOR<ConversionEventUpdateManyMutationInput, ConversionEventUncheckedUpdateManyInput>
    /**
     * Filter which ConversionEvents to update
     */
    where?: ConversionEventWhereInput
    /**
     * Limit how many ConversionEvents to update.
     */
    limit?: number
  }

  /**
   * ConversionEvent upsert
   */
  export type ConversionEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversionEvent
     */
    select?: ConversionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversionEvent
     */
    omit?: ConversionEventOmit<ExtArgs> | null
    /**
     * The filter to search for the ConversionEvent to update in case it exists.
     */
    where: ConversionEventWhereUniqueInput
    /**
     * In case the ConversionEvent found by the `where` argument doesn't exist, create a new ConversionEvent with this data.
     */
    create: XOR<ConversionEventCreateInput, ConversionEventUncheckedCreateInput>
    /**
     * In case the ConversionEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConversionEventUpdateInput, ConversionEventUncheckedUpdateInput>
  }

  /**
   * ConversionEvent delete
   */
  export type ConversionEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversionEvent
     */
    select?: ConversionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversionEvent
     */
    omit?: ConversionEventOmit<ExtArgs> | null
    /**
     * Filter which ConversionEvent to delete.
     */
    where: ConversionEventWhereUniqueInput
  }

  /**
   * ConversionEvent deleteMany
   */
  export type ConversionEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConversionEvents to delete
     */
    where?: ConversionEventWhereInput
    /**
     * Limit how many ConversionEvents to delete.
     */
    limit?: number
  }

  /**
   * ConversionEvent without action
   */
  export type ConversionEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversionEvent
     */
    select?: ConversionEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversionEvent
     */
    omit?: ConversionEventOmit<ExtArgs> | null
  }


  /**
   * Model DailyRateLimit
   */

  export type AggregateDailyRateLimit = {
    _count: DailyRateLimitCountAggregateOutputType | null
    _avg: DailyRateLimitAvgAggregateOutputType | null
    _sum: DailyRateLimitSumAggregateOutputType | null
    _min: DailyRateLimitMinAggregateOutputType | null
    _max: DailyRateLimitMaxAggregateOutputType | null
  }

  export type DailyRateLimitAvgAggregateOutputType = {
    requestCount: number | null
  }

  export type DailyRateLimitSumAggregateOutputType = {
    requestCount: number | null
  }

  export type DailyRateLimitMinAggregateOutputType = {
    id: string | null
    identifier: string | null
    identifierType: string | null
    date: Date | null
    requestCount: number | null
    lastRequestAt: Date | null
    ipAddress: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DailyRateLimitMaxAggregateOutputType = {
    id: string | null
    identifier: string | null
    identifierType: string | null
    date: Date | null
    requestCount: number | null
    lastRequestAt: Date | null
    ipAddress: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DailyRateLimitCountAggregateOutputType = {
    id: number
    identifier: number
    identifierType: number
    date: number
    requestCount: number
    lastRequestAt: number
    ipAddress: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DailyRateLimitAvgAggregateInputType = {
    requestCount?: true
  }

  export type DailyRateLimitSumAggregateInputType = {
    requestCount?: true
  }

  export type DailyRateLimitMinAggregateInputType = {
    id?: true
    identifier?: true
    identifierType?: true
    date?: true
    requestCount?: true
    lastRequestAt?: true
    ipAddress?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DailyRateLimitMaxAggregateInputType = {
    id?: true
    identifier?: true
    identifierType?: true
    date?: true
    requestCount?: true
    lastRequestAt?: true
    ipAddress?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DailyRateLimitCountAggregateInputType = {
    id?: true
    identifier?: true
    identifierType?: true
    date?: true
    requestCount?: true
    lastRequestAt?: true
    ipAddress?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DailyRateLimitAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyRateLimit to aggregate.
     */
    where?: DailyRateLimitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyRateLimits to fetch.
     */
    orderBy?: DailyRateLimitOrderByWithRelationInput | DailyRateLimitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DailyRateLimitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyRateLimits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyRateLimits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DailyRateLimits
    **/
    _count?: true | DailyRateLimitCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DailyRateLimitAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DailyRateLimitSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DailyRateLimitMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DailyRateLimitMaxAggregateInputType
  }

  export type GetDailyRateLimitAggregateType<T extends DailyRateLimitAggregateArgs> = {
        [P in keyof T & keyof AggregateDailyRateLimit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDailyRateLimit[P]>
      : GetScalarType<T[P], AggregateDailyRateLimit[P]>
  }




  export type DailyRateLimitGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyRateLimitWhereInput
    orderBy?: DailyRateLimitOrderByWithAggregationInput | DailyRateLimitOrderByWithAggregationInput[]
    by: DailyRateLimitScalarFieldEnum[] | DailyRateLimitScalarFieldEnum
    having?: DailyRateLimitScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DailyRateLimitCountAggregateInputType | true
    _avg?: DailyRateLimitAvgAggregateInputType
    _sum?: DailyRateLimitSumAggregateInputType
    _min?: DailyRateLimitMinAggregateInputType
    _max?: DailyRateLimitMaxAggregateInputType
  }

  export type DailyRateLimitGroupByOutputType = {
    id: string
    identifier: string
    identifierType: string
    date: Date
    requestCount: number
    lastRequestAt: Date | null
    ipAddress: string | null
    createdAt: Date
    updatedAt: Date
    _count: DailyRateLimitCountAggregateOutputType | null
    _avg: DailyRateLimitAvgAggregateOutputType | null
    _sum: DailyRateLimitSumAggregateOutputType | null
    _min: DailyRateLimitMinAggregateOutputType | null
    _max: DailyRateLimitMaxAggregateOutputType | null
  }

  type GetDailyRateLimitGroupByPayload<T extends DailyRateLimitGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DailyRateLimitGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DailyRateLimitGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DailyRateLimitGroupByOutputType[P]>
            : GetScalarType<T[P], DailyRateLimitGroupByOutputType[P]>
        }
      >
    >


  export type DailyRateLimitSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    identifierType?: boolean
    date?: boolean
    requestCount?: boolean
    lastRequestAt?: boolean
    ipAddress?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["dailyRateLimit"]>

  export type DailyRateLimitSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    identifierType?: boolean
    date?: boolean
    requestCount?: boolean
    lastRequestAt?: boolean
    ipAddress?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["dailyRateLimit"]>

  export type DailyRateLimitSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    identifierType?: boolean
    date?: boolean
    requestCount?: boolean
    lastRequestAt?: boolean
    ipAddress?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["dailyRateLimit"]>

  export type DailyRateLimitSelectScalar = {
    id?: boolean
    identifier?: boolean
    identifierType?: boolean
    date?: boolean
    requestCount?: boolean
    lastRequestAt?: boolean
    ipAddress?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DailyRateLimitOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "identifier" | "identifierType" | "date" | "requestCount" | "lastRequestAt" | "ipAddress" | "createdAt" | "updatedAt", ExtArgs["result"]["dailyRateLimit"]>

  export type $DailyRateLimitPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DailyRateLimit"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      identifier: string
      identifierType: string
      date: Date
      requestCount: number
      lastRequestAt: Date | null
      ipAddress: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["dailyRateLimit"]>
    composites: {}
  }

  type DailyRateLimitGetPayload<S extends boolean | null | undefined | DailyRateLimitDefaultArgs> = $Result.GetResult<Prisma.$DailyRateLimitPayload, S>

  type DailyRateLimitCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DailyRateLimitFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DailyRateLimitCountAggregateInputType | true
    }

  export interface DailyRateLimitDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DailyRateLimit'], meta: { name: 'DailyRateLimit' } }
    /**
     * Find zero or one DailyRateLimit that matches the filter.
     * @param {DailyRateLimitFindUniqueArgs} args - Arguments to find a DailyRateLimit
     * @example
     * // Get one DailyRateLimit
     * const dailyRateLimit = await prisma.dailyRateLimit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DailyRateLimitFindUniqueArgs>(args: SelectSubset<T, DailyRateLimitFindUniqueArgs<ExtArgs>>): Prisma__DailyRateLimitClient<$Result.GetResult<Prisma.$DailyRateLimitPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DailyRateLimit that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DailyRateLimitFindUniqueOrThrowArgs} args - Arguments to find a DailyRateLimit
     * @example
     * // Get one DailyRateLimit
     * const dailyRateLimit = await prisma.dailyRateLimit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DailyRateLimitFindUniqueOrThrowArgs>(args: SelectSubset<T, DailyRateLimitFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DailyRateLimitClient<$Result.GetResult<Prisma.$DailyRateLimitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DailyRateLimit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyRateLimitFindFirstArgs} args - Arguments to find a DailyRateLimit
     * @example
     * // Get one DailyRateLimit
     * const dailyRateLimit = await prisma.dailyRateLimit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DailyRateLimitFindFirstArgs>(args?: SelectSubset<T, DailyRateLimitFindFirstArgs<ExtArgs>>): Prisma__DailyRateLimitClient<$Result.GetResult<Prisma.$DailyRateLimitPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DailyRateLimit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyRateLimitFindFirstOrThrowArgs} args - Arguments to find a DailyRateLimit
     * @example
     * // Get one DailyRateLimit
     * const dailyRateLimit = await prisma.dailyRateLimit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DailyRateLimitFindFirstOrThrowArgs>(args?: SelectSubset<T, DailyRateLimitFindFirstOrThrowArgs<ExtArgs>>): Prisma__DailyRateLimitClient<$Result.GetResult<Prisma.$DailyRateLimitPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DailyRateLimits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyRateLimitFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DailyRateLimits
     * const dailyRateLimits = await prisma.dailyRateLimit.findMany()
     * 
     * // Get first 10 DailyRateLimits
     * const dailyRateLimits = await prisma.dailyRateLimit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dailyRateLimitWithIdOnly = await prisma.dailyRateLimit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DailyRateLimitFindManyArgs>(args?: SelectSubset<T, DailyRateLimitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyRateLimitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DailyRateLimit.
     * @param {DailyRateLimitCreateArgs} args - Arguments to create a DailyRateLimit.
     * @example
     * // Create one DailyRateLimit
     * const DailyRateLimit = await prisma.dailyRateLimit.create({
     *   data: {
     *     // ... data to create a DailyRateLimit
     *   }
     * })
     * 
     */
    create<T extends DailyRateLimitCreateArgs>(args: SelectSubset<T, DailyRateLimitCreateArgs<ExtArgs>>): Prisma__DailyRateLimitClient<$Result.GetResult<Prisma.$DailyRateLimitPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DailyRateLimits.
     * @param {DailyRateLimitCreateManyArgs} args - Arguments to create many DailyRateLimits.
     * @example
     * // Create many DailyRateLimits
     * const dailyRateLimit = await prisma.dailyRateLimit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DailyRateLimitCreateManyArgs>(args?: SelectSubset<T, DailyRateLimitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DailyRateLimits and returns the data saved in the database.
     * @param {DailyRateLimitCreateManyAndReturnArgs} args - Arguments to create many DailyRateLimits.
     * @example
     * // Create many DailyRateLimits
     * const dailyRateLimit = await prisma.dailyRateLimit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DailyRateLimits and only return the `id`
     * const dailyRateLimitWithIdOnly = await prisma.dailyRateLimit.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DailyRateLimitCreateManyAndReturnArgs>(args?: SelectSubset<T, DailyRateLimitCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyRateLimitPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DailyRateLimit.
     * @param {DailyRateLimitDeleteArgs} args - Arguments to delete one DailyRateLimit.
     * @example
     * // Delete one DailyRateLimit
     * const DailyRateLimit = await prisma.dailyRateLimit.delete({
     *   where: {
     *     // ... filter to delete one DailyRateLimit
     *   }
     * })
     * 
     */
    delete<T extends DailyRateLimitDeleteArgs>(args: SelectSubset<T, DailyRateLimitDeleteArgs<ExtArgs>>): Prisma__DailyRateLimitClient<$Result.GetResult<Prisma.$DailyRateLimitPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DailyRateLimit.
     * @param {DailyRateLimitUpdateArgs} args - Arguments to update one DailyRateLimit.
     * @example
     * // Update one DailyRateLimit
     * const dailyRateLimit = await prisma.dailyRateLimit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DailyRateLimitUpdateArgs>(args: SelectSubset<T, DailyRateLimitUpdateArgs<ExtArgs>>): Prisma__DailyRateLimitClient<$Result.GetResult<Prisma.$DailyRateLimitPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DailyRateLimits.
     * @param {DailyRateLimitDeleteManyArgs} args - Arguments to filter DailyRateLimits to delete.
     * @example
     * // Delete a few DailyRateLimits
     * const { count } = await prisma.dailyRateLimit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DailyRateLimitDeleteManyArgs>(args?: SelectSubset<T, DailyRateLimitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyRateLimits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyRateLimitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DailyRateLimits
     * const dailyRateLimit = await prisma.dailyRateLimit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DailyRateLimitUpdateManyArgs>(args: SelectSubset<T, DailyRateLimitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyRateLimits and returns the data updated in the database.
     * @param {DailyRateLimitUpdateManyAndReturnArgs} args - Arguments to update many DailyRateLimits.
     * @example
     * // Update many DailyRateLimits
     * const dailyRateLimit = await prisma.dailyRateLimit.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DailyRateLimits and only return the `id`
     * const dailyRateLimitWithIdOnly = await prisma.dailyRateLimit.updateManyAndReturn({
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
    updateManyAndReturn<T extends DailyRateLimitUpdateManyAndReturnArgs>(args: SelectSubset<T, DailyRateLimitUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyRateLimitPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DailyRateLimit.
     * @param {DailyRateLimitUpsertArgs} args - Arguments to update or create a DailyRateLimit.
     * @example
     * // Update or create a DailyRateLimit
     * const dailyRateLimit = await prisma.dailyRateLimit.upsert({
     *   create: {
     *     // ... data to create a DailyRateLimit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DailyRateLimit we want to update
     *   }
     * })
     */
    upsert<T extends DailyRateLimitUpsertArgs>(args: SelectSubset<T, DailyRateLimitUpsertArgs<ExtArgs>>): Prisma__DailyRateLimitClient<$Result.GetResult<Prisma.$DailyRateLimitPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DailyRateLimits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyRateLimitCountArgs} args - Arguments to filter DailyRateLimits to count.
     * @example
     * // Count the number of DailyRateLimits
     * const count = await prisma.dailyRateLimit.count({
     *   where: {
     *     // ... the filter for the DailyRateLimits we want to count
     *   }
     * })
    **/
    count<T extends DailyRateLimitCountArgs>(
      args?: Subset<T, DailyRateLimitCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DailyRateLimitCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DailyRateLimit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyRateLimitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DailyRateLimitAggregateArgs>(args: Subset<T, DailyRateLimitAggregateArgs>): Prisma.PrismaPromise<GetDailyRateLimitAggregateType<T>>

    /**
     * Group by DailyRateLimit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyRateLimitGroupByArgs} args - Group by arguments.
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
      T extends DailyRateLimitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DailyRateLimitGroupByArgs['orderBy'] }
        : { orderBy?: DailyRateLimitGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DailyRateLimitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDailyRateLimitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DailyRateLimit model
   */
  readonly fields: DailyRateLimitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DailyRateLimit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DailyRateLimitClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the DailyRateLimit model
   */
  interface DailyRateLimitFieldRefs {
    readonly id: FieldRef<"DailyRateLimit", 'String'>
    readonly identifier: FieldRef<"DailyRateLimit", 'String'>
    readonly identifierType: FieldRef<"DailyRateLimit", 'String'>
    readonly date: FieldRef<"DailyRateLimit", 'DateTime'>
    readonly requestCount: FieldRef<"DailyRateLimit", 'Int'>
    readonly lastRequestAt: FieldRef<"DailyRateLimit", 'DateTime'>
    readonly ipAddress: FieldRef<"DailyRateLimit", 'String'>
    readonly createdAt: FieldRef<"DailyRateLimit", 'DateTime'>
    readonly updatedAt: FieldRef<"DailyRateLimit", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DailyRateLimit findUnique
   */
  export type DailyRateLimitFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyRateLimit
     */
    select?: DailyRateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyRateLimit
     */
    omit?: DailyRateLimitOmit<ExtArgs> | null
    /**
     * Filter, which DailyRateLimit to fetch.
     */
    where: DailyRateLimitWhereUniqueInput
  }

  /**
   * DailyRateLimit findUniqueOrThrow
   */
  export type DailyRateLimitFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyRateLimit
     */
    select?: DailyRateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyRateLimit
     */
    omit?: DailyRateLimitOmit<ExtArgs> | null
    /**
     * Filter, which DailyRateLimit to fetch.
     */
    where: DailyRateLimitWhereUniqueInput
  }

  /**
   * DailyRateLimit findFirst
   */
  export type DailyRateLimitFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyRateLimit
     */
    select?: DailyRateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyRateLimit
     */
    omit?: DailyRateLimitOmit<ExtArgs> | null
    /**
     * Filter, which DailyRateLimit to fetch.
     */
    where?: DailyRateLimitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyRateLimits to fetch.
     */
    orderBy?: DailyRateLimitOrderByWithRelationInput | DailyRateLimitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyRateLimits.
     */
    cursor?: DailyRateLimitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyRateLimits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyRateLimits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyRateLimits.
     */
    distinct?: DailyRateLimitScalarFieldEnum | DailyRateLimitScalarFieldEnum[]
  }

  /**
   * DailyRateLimit findFirstOrThrow
   */
  export type DailyRateLimitFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyRateLimit
     */
    select?: DailyRateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyRateLimit
     */
    omit?: DailyRateLimitOmit<ExtArgs> | null
    /**
     * Filter, which DailyRateLimit to fetch.
     */
    where?: DailyRateLimitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyRateLimits to fetch.
     */
    orderBy?: DailyRateLimitOrderByWithRelationInput | DailyRateLimitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyRateLimits.
     */
    cursor?: DailyRateLimitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyRateLimits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyRateLimits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyRateLimits.
     */
    distinct?: DailyRateLimitScalarFieldEnum | DailyRateLimitScalarFieldEnum[]
  }

  /**
   * DailyRateLimit findMany
   */
  export type DailyRateLimitFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyRateLimit
     */
    select?: DailyRateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyRateLimit
     */
    omit?: DailyRateLimitOmit<ExtArgs> | null
    /**
     * Filter, which DailyRateLimits to fetch.
     */
    where?: DailyRateLimitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyRateLimits to fetch.
     */
    orderBy?: DailyRateLimitOrderByWithRelationInput | DailyRateLimitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DailyRateLimits.
     */
    cursor?: DailyRateLimitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyRateLimits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyRateLimits.
     */
    skip?: number
    distinct?: DailyRateLimitScalarFieldEnum | DailyRateLimitScalarFieldEnum[]
  }

  /**
   * DailyRateLimit create
   */
  export type DailyRateLimitCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyRateLimit
     */
    select?: DailyRateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyRateLimit
     */
    omit?: DailyRateLimitOmit<ExtArgs> | null
    /**
     * The data needed to create a DailyRateLimit.
     */
    data: XOR<DailyRateLimitCreateInput, DailyRateLimitUncheckedCreateInput>
  }

  /**
   * DailyRateLimit createMany
   */
  export type DailyRateLimitCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DailyRateLimits.
     */
    data: DailyRateLimitCreateManyInput | DailyRateLimitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DailyRateLimit createManyAndReturn
   */
  export type DailyRateLimitCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyRateLimit
     */
    select?: DailyRateLimitSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DailyRateLimit
     */
    omit?: DailyRateLimitOmit<ExtArgs> | null
    /**
     * The data used to create many DailyRateLimits.
     */
    data: DailyRateLimitCreateManyInput | DailyRateLimitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DailyRateLimit update
   */
  export type DailyRateLimitUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyRateLimit
     */
    select?: DailyRateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyRateLimit
     */
    omit?: DailyRateLimitOmit<ExtArgs> | null
    /**
     * The data needed to update a DailyRateLimit.
     */
    data: XOR<DailyRateLimitUpdateInput, DailyRateLimitUncheckedUpdateInput>
    /**
     * Choose, which DailyRateLimit to update.
     */
    where: DailyRateLimitWhereUniqueInput
  }

  /**
   * DailyRateLimit updateMany
   */
  export type DailyRateLimitUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DailyRateLimits.
     */
    data: XOR<DailyRateLimitUpdateManyMutationInput, DailyRateLimitUncheckedUpdateManyInput>
    /**
     * Filter which DailyRateLimits to update
     */
    where?: DailyRateLimitWhereInput
    /**
     * Limit how many DailyRateLimits to update.
     */
    limit?: number
  }

  /**
   * DailyRateLimit updateManyAndReturn
   */
  export type DailyRateLimitUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyRateLimit
     */
    select?: DailyRateLimitSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DailyRateLimit
     */
    omit?: DailyRateLimitOmit<ExtArgs> | null
    /**
     * The data used to update DailyRateLimits.
     */
    data: XOR<DailyRateLimitUpdateManyMutationInput, DailyRateLimitUncheckedUpdateManyInput>
    /**
     * Filter which DailyRateLimits to update
     */
    where?: DailyRateLimitWhereInput
    /**
     * Limit how many DailyRateLimits to update.
     */
    limit?: number
  }

  /**
   * DailyRateLimit upsert
   */
  export type DailyRateLimitUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyRateLimit
     */
    select?: DailyRateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyRateLimit
     */
    omit?: DailyRateLimitOmit<ExtArgs> | null
    /**
     * The filter to search for the DailyRateLimit to update in case it exists.
     */
    where: DailyRateLimitWhereUniqueInput
    /**
     * In case the DailyRateLimit found by the `where` argument doesn't exist, create a new DailyRateLimit with this data.
     */
    create: XOR<DailyRateLimitCreateInput, DailyRateLimitUncheckedCreateInput>
    /**
     * In case the DailyRateLimit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DailyRateLimitUpdateInput, DailyRateLimitUncheckedUpdateInput>
  }

  /**
   * DailyRateLimit delete
   */
  export type DailyRateLimitDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyRateLimit
     */
    select?: DailyRateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyRateLimit
     */
    omit?: DailyRateLimitOmit<ExtArgs> | null
    /**
     * Filter which DailyRateLimit to delete.
     */
    where: DailyRateLimitWhereUniqueInput
  }

  /**
   * DailyRateLimit deleteMany
   */
  export type DailyRateLimitDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyRateLimits to delete
     */
    where?: DailyRateLimitWhereInput
    /**
     * Limit how many DailyRateLimits to delete.
     */
    limit?: number
  }

  /**
   * DailyRateLimit without action
   */
  export type DailyRateLimitDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyRateLimit
     */
    select?: DailyRateLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyRateLimit
     */
    omit?: DailyRateLimitOmit<ExtArgs> | null
  }


  /**
   * Model InternalRecipeData
   */

  export type AggregateInternalRecipeData = {
    _count: InternalRecipeDataCountAggregateOutputType | null
    _avg: InternalRecipeDataAvgAggregateOutputType | null
    _sum: InternalRecipeDataSumAggregateOutputType | null
    _min: InternalRecipeDataMinAggregateOutputType | null
    _max: InternalRecipeDataMaxAggregateOutputType | null
  }

  export type InternalRecipeDataAvgAggregateOutputType = {
    totalProcessingTimeMs: number | null
    fetchTimeMs: number | null
    parseTimeMs: number | null
    aiTimeMs: number | null
  }

  export type InternalRecipeDataSumAggregateOutputType = {
    totalProcessingTimeMs: number | null
    fetchTimeMs: number | null
    parseTimeMs: number | null
    aiTimeMs: number | null
  }

  export type InternalRecipeDataMinAggregateOutputType = {
    id: string | null
    title: string | null
    sourceUrl: string | null
    domain: string | null
    extractedAt: Date | null
    createdAt: Date | null
    extractionStrategy: $Enums.ExtractionStrategy | null
    aiProvider: $Enums.AIProvider | null
    totalProcessingTimeMs: number | null
    fetchTimeMs: number | null
    parseTimeMs: number | null
    aiTimeMs: number | null
  }

  export type InternalRecipeDataMaxAggregateOutputType = {
    id: string | null
    title: string | null
    sourceUrl: string | null
    domain: string | null
    extractedAt: Date | null
    createdAt: Date | null
    extractionStrategy: $Enums.ExtractionStrategy | null
    aiProvider: $Enums.AIProvider | null
    totalProcessingTimeMs: number | null
    fetchTimeMs: number | null
    parseTimeMs: number | null
    aiTimeMs: number | null
  }

  export type InternalRecipeDataCountAggregateOutputType = {
    id: number
    title: number
    sourceUrl: number
    domain: number
    extractedAt: number
    createdAt: number
    extractionStrategy: number
    aiProvider: number
    totalProcessingTimeMs: number
    fetchTimeMs: number
    parseTimeMs: number
    aiTimeMs: number
    _all: number
  }


  export type InternalRecipeDataAvgAggregateInputType = {
    totalProcessingTimeMs?: true
    fetchTimeMs?: true
    parseTimeMs?: true
    aiTimeMs?: true
  }

  export type InternalRecipeDataSumAggregateInputType = {
    totalProcessingTimeMs?: true
    fetchTimeMs?: true
    parseTimeMs?: true
    aiTimeMs?: true
  }

  export type InternalRecipeDataMinAggregateInputType = {
    id?: true
    title?: true
    sourceUrl?: true
    domain?: true
    extractedAt?: true
    createdAt?: true
    extractionStrategy?: true
    aiProvider?: true
    totalProcessingTimeMs?: true
    fetchTimeMs?: true
    parseTimeMs?: true
    aiTimeMs?: true
  }

  export type InternalRecipeDataMaxAggregateInputType = {
    id?: true
    title?: true
    sourceUrl?: true
    domain?: true
    extractedAt?: true
    createdAt?: true
    extractionStrategy?: true
    aiProvider?: true
    totalProcessingTimeMs?: true
    fetchTimeMs?: true
    parseTimeMs?: true
    aiTimeMs?: true
  }

  export type InternalRecipeDataCountAggregateInputType = {
    id?: true
    title?: true
    sourceUrl?: true
    domain?: true
    extractedAt?: true
    createdAt?: true
    extractionStrategy?: true
    aiProvider?: true
    totalProcessingTimeMs?: true
    fetchTimeMs?: true
    parseTimeMs?: true
    aiTimeMs?: true
    _all?: true
  }

  export type InternalRecipeDataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InternalRecipeData to aggregate.
     */
    where?: InternalRecipeDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InternalRecipeData to fetch.
     */
    orderBy?: InternalRecipeDataOrderByWithRelationInput | InternalRecipeDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InternalRecipeDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InternalRecipeData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InternalRecipeData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InternalRecipeData
    **/
    _count?: true | InternalRecipeDataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InternalRecipeDataAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InternalRecipeDataSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InternalRecipeDataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InternalRecipeDataMaxAggregateInputType
  }

  export type GetInternalRecipeDataAggregateType<T extends InternalRecipeDataAggregateArgs> = {
        [P in keyof T & keyof AggregateInternalRecipeData]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInternalRecipeData[P]>
      : GetScalarType<T[P], AggregateInternalRecipeData[P]>
  }




  export type InternalRecipeDataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InternalRecipeDataWhereInput
    orderBy?: InternalRecipeDataOrderByWithAggregationInput | InternalRecipeDataOrderByWithAggregationInput[]
    by: InternalRecipeDataScalarFieldEnum[] | InternalRecipeDataScalarFieldEnum
    having?: InternalRecipeDataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InternalRecipeDataCountAggregateInputType | true
    _avg?: InternalRecipeDataAvgAggregateInputType
    _sum?: InternalRecipeDataSumAggregateInputType
    _min?: InternalRecipeDataMinAggregateInputType
    _max?: InternalRecipeDataMaxAggregateInputType
  }

  export type InternalRecipeDataGroupByOutputType = {
    id: string
    title: string
    sourceUrl: string
    domain: string
    extractedAt: Date
    createdAt: Date
    extractionStrategy: $Enums.ExtractionStrategy
    aiProvider: $Enums.AIProvider
    totalProcessingTimeMs: number
    fetchTimeMs: number | null
    parseTimeMs: number | null
    aiTimeMs: number | null
    _count: InternalRecipeDataCountAggregateOutputType | null
    _avg: InternalRecipeDataAvgAggregateOutputType | null
    _sum: InternalRecipeDataSumAggregateOutputType | null
    _min: InternalRecipeDataMinAggregateOutputType | null
    _max: InternalRecipeDataMaxAggregateOutputType | null
  }

  type GetInternalRecipeDataGroupByPayload<T extends InternalRecipeDataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InternalRecipeDataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InternalRecipeDataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InternalRecipeDataGroupByOutputType[P]>
            : GetScalarType<T[P], InternalRecipeDataGroupByOutputType[P]>
        }
      >
    >


  export type InternalRecipeDataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    sourceUrl?: boolean
    domain?: boolean
    extractedAt?: boolean
    createdAt?: boolean
    extractionStrategy?: boolean
    aiProvider?: boolean
    totalProcessingTimeMs?: boolean
    fetchTimeMs?: boolean
    parseTimeMs?: boolean
    aiTimeMs?: boolean
  }, ExtArgs["result"]["internalRecipeData"]>

  export type InternalRecipeDataSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    sourceUrl?: boolean
    domain?: boolean
    extractedAt?: boolean
    createdAt?: boolean
    extractionStrategy?: boolean
    aiProvider?: boolean
    totalProcessingTimeMs?: boolean
    fetchTimeMs?: boolean
    parseTimeMs?: boolean
    aiTimeMs?: boolean
  }, ExtArgs["result"]["internalRecipeData"]>

  export type InternalRecipeDataSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    sourceUrl?: boolean
    domain?: boolean
    extractedAt?: boolean
    createdAt?: boolean
    extractionStrategy?: boolean
    aiProvider?: boolean
    totalProcessingTimeMs?: boolean
    fetchTimeMs?: boolean
    parseTimeMs?: boolean
    aiTimeMs?: boolean
  }, ExtArgs["result"]["internalRecipeData"]>

  export type InternalRecipeDataSelectScalar = {
    id?: boolean
    title?: boolean
    sourceUrl?: boolean
    domain?: boolean
    extractedAt?: boolean
    createdAt?: boolean
    extractionStrategy?: boolean
    aiProvider?: boolean
    totalProcessingTimeMs?: boolean
    fetchTimeMs?: boolean
    parseTimeMs?: boolean
    aiTimeMs?: boolean
  }

  export type InternalRecipeDataOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "sourceUrl" | "domain" | "extractedAt" | "createdAt" | "extractionStrategy" | "aiProvider" | "totalProcessingTimeMs" | "fetchTimeMs" | "parseTimeMs" | "aiTimeMs", ExtArgs["result"]["internalRecipeData"]>

  export type $InternalRecipeDataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InternalRecipeData"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      sourceUrl: string
      domain: string
      extractedAt: Date
      createdAt: Date
      extractionStrategy: $Enums.ExtractionStrategy
      aiProvider: $Enums.AIProvider
      totalProcessingTimeMs: number
      fetchTimeMs: number | null
      parseTimeMs: number | null
      aiTimeMs: number | null
    }, ExtArgs["result"]["internalRecipeData"]>
    composites: {}
  }

  type InternalRecipeDataGetPayload<S extends boolean | null | undefined | InternalRecipeDataDefaultArgs> = $Result.GetResult<Prisma.$InternalRecipeDataPayload, S>

  type InternalRecipeDataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InternalRecipeDataFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InternalRecipeDataCountAggregateInputType | true
    }

  export interface InternalRecipeDataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InternalRecipeData'], meta: { name: 'InternalRecipeData' } }
    /**
     * Find zero or one InternalRecipeData that matches the filter.
     * @param {InternalRecipeDataFindUniqueArgs} args - Arguments to find a InternalRecipeData
     * @example
     * // Get one InternalRecipeData
     * const internalRecipeData = await prisma.internalRecipeData.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InternalRecipeDataFindUniqueArgs>(args: SelectSubset<T, InternalRecipeDataFindUniqueArgs<ExtArgs>>): Prisma__InternalRecipeDataClient<$Result.GetResult<Prisma.$InternalRecipeDataPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one InternalRecipeData that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InternalRecipeDataFindUniqueOrThrowArgs} args - Arguments to find a InternalRecipeData
     * @example
     * // Get one InternalRecipeData
     * const internalRecipeData = await prisma.internalRecipeData.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InternalRecipeDataFindUniqueOrThrowArgs>(args: SelectSubset<T, InternalRecipeDataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InternalRecipeDataClient<$Result.GetResult<Prisma.$InternalRecipeDataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InternalRecipeData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InternalRecipeDataFindFirstArgs} args - Arguments to find a InternalRecipeData
     * @example
     * // Get one InternalRecipeData
     * const internalRecipeData = await prisma.internalRecipeData.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InternalRecipeDataFindFirstArgs>(args?: SelectSubset<T, InternalRecipeDataFindFirstArgs<ExtArgs>>): Prisma__InternalRecipeDataClient<$Result.GetResult<Prisma.$InternalRecipeDataPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InternalRecipeData that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InternalRecipeDataFindFirstOrThrowArgs} args - Arguments to find a InternalRecipeData
     * @example
     * // Get one InternalRecipeData
     * const internalRecipeData = await prisma.internalRecipeData.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InternalRecipeDataFindFirstOrThrowArgs>(args?: SelectSubset<T, InternalRecipeDataFindFirstOrThrowArgs<ExtArgs>>): Prisma__InternalRecipeDataClient<$Result.GetResult<Prisma.$InternalRecipeDataPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more InternalRecipeData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InternalRecipeDataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InternalRecipeData
     * const internalRecipeData = await prisma.internalRecipeData.findMany()
     * 
     * // Get first 10 InternalRecipeData
     * const internalRecipeData = await prisma.internalRecipeData.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const internalRecipeDataWithIdOnly = await prisma.internalRecipeData.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InternalRecipeDataFindManyArgs>(args?: SelectSubset<T, InternalRecipeDataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InternalRecipeDataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a InternalRecipeData.
     * @param {InternalRecipeDataCreateArgs} args - Arguments to create a InternalRecipeData.
     * @example
     * // Create one InternalRecipeData
     * const InternalRecipeData = await prisma.internalRecipeData.create({
     *   data: {
     *     // ... data to create a InternalRecipeData
     *   }
     * })
     * 
     */
    create<T extends InternalRecipeDataCreateArgs>(args: SelectSubset<T, InternalRecipeDataCreateArgs<ExtArgs>>): Prisma__InternalRecipeDataClient<$Result.GetResult<Prisma.$InternalRecipeDataPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many InternalRecipeData.
     * @param {InternalRecipeDataCreateManyArgs} args - Arguments to create many InternalRecipeData.
     * @example
     * // Create many InternalRecipeData
     * const internalRecipeData = await prisma.internalRecipeData.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InternalRecipeDataCreateManyArgs>(args?: SelectSubset<T, InternalRecipeDataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InternalRecipeData and returns the data saved in the database.
     * @param {InternalRecipeDataCreateManyAndReturnArgs} args - Arguments to create many InternalRecipeData.
     * @example
     * // Create many InternalRecipeData
     * const internalRecipeData = await prisma.internalRecipeData.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InternalRecipeData and only return the `id`
     * const internalRecipeDataWithIdOnly = await prisma.internalRecipeData.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InternalRecipeDataCreateManyAndReturnArgs>(args?: SelectSubset<T, InternalRecipeDataCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InternalRecipeDataPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a InternalRecipeData.
     * @param {InternalRecipeDataDeleteArgs} args - Arguments to delete one InternalRecipeData.
     * @example
     * // Delete one InternalRecipeData
     * const InternalRecipeData = await prisma.internalRecipeData.delete({
     *   where: {
     *     // ... filter to delete one InternalRecipeData
     *   }
     * })
     * 
     */
    delete<T extends InternalRecipeDataDeleteArgs>(args: SelectSubset<T, InternalRecipeDataDeleteArgs<ExtArgs>>): Prisma__InternalRecipeDataClient<$Result.GetResult<Prisma.$InternalRecipeDataPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one InternalRecipeData.
     * @param {InternalRecipeDataUpdateArgs} args - Arguments to update one InternalRecipeData.
     * @example
     * // Update one InternalRecipeData
     * const internalRecipeData = await prisma.internalRecipeData.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InternalRecipeDataUpdateArgs>(args: SelectSubset<T, InternalRecipeDataUpdateArgs<ExtArgs>>): Prisma__InternalRecipeDataClient<$Result.GetResult<Prisma.$InternalRecipeDataPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more InternalRecipeData.
     * @param {InternalRecipeDataDeleteManyArgs} args - Arguments to filter InternalRecipeData to delete.
     * @example
     * // Delete a few InternalRecipeData
     * const { count } = await prisma.internalRecipeData.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InternalRecipeDataDeleteManyArgs>(args?: SelectSubset<T, InternalRecipeDataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InternalRecipeData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InternalRecipeDataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InternalRecipeData
     * const internalRecipeData = await prisma.internalRecipeData.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InternalRecipeDataUpdateManyArgs>(args: SelectSubset<T, InternalRecipeDataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InternalRecipeData and returns the data updated in the database.
     * @param {InternalRecipeDataUpdateManyAndReturnArgs} args - Arguments to update many InternalRecipeData.
     * @example
     * // Update many InternalRecipeData
     * const internalRecipeData = await prisma.internalRecipeData.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more InternalRecipeData and only return the `id`
     * const internalRecipeDataWithIdOnly = await prisma.internalRecipeData.updateManyAndReturn({
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
    updateManyAndReturn<T extends InternalRecipeDataUpdateManyAndReturnArgs>(args: SelectSubset<T, InternalRecipeDataUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InternalRecipeDataPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one InternalRecipeData.
     * @param {InternalRecipeDataUpsertArgs} args - Arguments to update or create a InternalRecipeData.
     * @example
     * // Update or create a InternalRecipeData
     * const internalRecipeData = await prisma.internalRecipeData.upsert({
     *   create: {
     *     // ... data to create a InternalRecipeData
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InternalRecipeData we want to update
     *   }
     * })
     */
    upsert<T extends InternalRecipeDataUpsertArgs>(args: SelectSubset<T, InternalRecipeDataUpsertArgs<ExtArgs>>): Prisma__InternalRecipeDataClient<$Result.GetResult<Prisma.$InternalRecipeDataPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of InternalRecipeData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InternalRecipeDataCountArgs} args - Arguments to filter InternalRecipeData to count.
     * @example
     * // Count the number of InternalRecipeData
     * const count = await prisma.internalRecipeData.count({
     *   where: {
     *     // ... the filter for the InternalRecipeData we want to count
     *   }
     * })
    **/
    count<T extends InternalRecipeDataCountArgs>(
      args?: Subset<T, InternalRecipeDataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InternalRecipeDataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InternalRecipeData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InternalRecipeDataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends InternalRecipeDataAggregateArgs>(args: Subset<T, InternalRecipeDataAggregateArgs>): Prisma.PrismaPromise<GetInternalRecipeDataAggregateType<T>>

    /**
     * Group by InternalRecipeData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InternalRecipeDataGroupByArgs} args - Group by arguments.
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
      T extends InternalRecipeDataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InternalRecipeDataGroupByArgs['orderBy'] }
        : { orderBy?: InternalRecipeDataGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, InternalRecipeDataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInternalRecipeDataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InternalRecipeData model
   */
  readonly fields: InternalRecipeDataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InternalRecipeData.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InternalRecipeDataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the InternalRecipeData model
   */
  interface InternalRecipeDataFieldRefs {
    readonly id: FieldRef<"InternalRecipeData", 'String'>
    readonly title: FieldRef<"InternalRecipeData", 'String'>
    readonly sourceUrl: FieldRef<"InternalRecipeData", 'String'>
    readonly domain: FieldRef<"InternalRecipeData", 'String'>
    readonly extractedAt: FieldRef<"InternalRecipeData", 'DateTime'>
    readonly createdAt: FieldRef<"InternalRecipeData", 'DateTime'>
    readonly extractionStrategy: FieldRef<"InternalRecipeData", 'ExtractionStrategy'>
    readonly aiProvider: FieldRef<"InternalRecipeData", 'AIProvider'>
    readonly totalProcessingTimeMs: FieldRef<"InternalRecipeData", 'Int'>
    readonly fetchTimeMs: FieldRef<"InternalRecipeData", 'Int'>
    readonly parseTimeMs: FieldRef<"InternalRecipeData", 'Int'>
    readonly aiTimeMs: FieldRef<"InternalRecipeData", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * InternalRecipeData findUnique
   */
  export type InternalRecipeDataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InternalRecipeData
     */
    select?: InternalRecipeDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InternalRecipeData
     */
    omit?: InternalRecipeDataOmit<ExtArgs> | null
    /**
     * Filter, which InternalRecipeData to fetch.
     */
    where: InternalRecipeDataWhereUniqueInput
  }

  /**
   * InternalRecipeData findUniqueOrThrow
   */
  export type InternalRecipeDataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InternalRecipeData
     */
    select?: InternalRecipeDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InternalRecipeData
     */
    omit?: InternalRecipeDataOmit<ExtArgs> | null
    /**
     * Filter, which InternalRecipeData to fetch.
     */
    where: InternalRecipeDataWhereUniqueInput
  }

  /**
   * InternalRecipeData findFirst
   */
  export type InternalRecipeDataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InternalRecipeData
     */
    select?: InternalRecipeDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InternalRecipeData
     */
    omit?: InternalRecipeDataOmit<ExtArgs> | null
    /**
     * Filter, which InternalRecipeData to fetch.
     */
    where?: InternalRecipeDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InternalRecipeData to fetch.
     */
    orderBy?: InternalRecipeDataOrderByWithRelationInput | InternalRecipeDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InternalRecipeData.
     */
    cursor?: InternalRecipeDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InternalRecipeData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InternalRecipeData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InternalRecipeData.
     */
    distinct?: InternalRecipeDataScalarFieldEnum | InternalRecipeDataScalarFieldEnum[]
  }

  /**
   * InternalRecipeData findFirstOrThrow
   */
  export type InternalRecipeDataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InternalRecipeData
     */
    select?: InternalRecipeDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InternalRecipeData
     */
    omit?: InternalRecipeDataOmit<ExtArgs> | null
    /**
     * Filter, which InternalRecipeData to fetch.
     */
    where?: InternalRecipeDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InternalRecipeData to fetch.
     */
    orderBy?: InternalRecipeDataOrderByWithRelationInput | InternalRecipeDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InternalRecipeData.
     */
    cursor?: InternalRecipeDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InternalRecipeData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InternalRecipeData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InternalRecipeData.
     */
    distinct?: InternalRecipeDataScalarFieldEnum | InternalRecipeDataScalarFieldEnum[]
  }

  /**
   * InternalRecipeData findMany
   */
  export type InternalRecipeDataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InternalRecipeData
     */
    select?: InternalRecipeDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InternalRecipeData
     */
    omit?: InternalRecipeDataOmit<ExtArgs> | null
    /**
     * Filter, which InternalRecipeData to fetch.
     */
    where?: InternalRecipeDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InternalRecipeData to fetch.
     */
    orderBy?: InternalRecipeDataOrderByWithRelationInput | InternalRecipeDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InternalRecipeData.
     */
    cursor?: InternalRecipeDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InternalRecipeData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InternalRecipeData.
     */
    skip?: number
    distinct?: InternalRecipeDataScalarFieldEnum | InternalRecipeDataScalarFieldEnum[]
  }

  /**
   * InternalRecipeData create
   */
  export type InternalRecipeDataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InternalRecipeData
     */
    select?: InternalRecipeDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InternalRecipeData
     */
    omit?: InternalRecipeDataOmit<ExtArgs> | null
    /**
     * The data needed to create a InternalRecipeData.
     */
    data: XOR<InternalRecipeDataCreateInput, InternalRecipeDataUncheckedCreateInput>
  }

  /**
   * InternalRecipeData createMany
   */
  export type InternalRecipeDataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InternalRecipeData.
     */
    data: InternalRecipeDataCreateManyInput | InternalRecipeDataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InternalRecipeData createManyAndReturn
   */
  export type InternalRecipeDataCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InternalRecipeData
     */
    select?: InternalRecipeDataSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InternalRecipeData
     */
    omit?: InternalRecipeDataOmit<ExtArgs> | null
    /**
     * The data used to create many InternalRecipeData.
     */
    data: InternalRecipeDataCreateManyInput | InternalRecipeDataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InternalRecipeData update
   */
  export type InternalRecipeDataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InternalRecipeData
     */
    select?: InternalRecipeDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InternalRecipeData
     */
    omit?: InternalRecipeDataOmit<ExtArgs> | null
    /**
     * The data needed to update a InternalRecipeData.
     */
    data: XOR<InternalRecipeDataUpdateInput, InternalRecipeDataUncheckedUpdateInput>
    /**
     * Choose, which InternalRecipeData to update.
     */
    where: InternalRecipeDataWhereUniqueInput
  }

  /**
   * InternalRecipeData updateMany
   */
  export type InternalRecipeDataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InternalRecipeData.
     */
    data: XOR<InternalRecipeDataUpdateManyMutationInput, InternalRecipeDataUncheckedUpdateManyInput>
    /**
     * Filter which InternalRecipeData to update
     */
    where?: InternalRecipeDataWhereInput
    /**
     * Limit how many InternalRecipeData to update.
     */
    limit?: number
  }

  /**
   * InternalRecipeData updateManyAndReturn
   */
  export type InternalRecipeDataUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InternalRecipeData
     */
    select?: InternalRecipeDataSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InternalRecipeData
     */
    omit?: InternalRecipeDataOmit<ExtArgs> | null
    /**
     * The data used to update InternalRecipeData.
     */
    data: XOR<InternalRecipeDataUpdateManyMutationInput, InternalRecipeDataUncheckedUpdateManyInput>
    /**
     * Filter which InternalRecipeData to update
     */
    where?: InternalRecipeDataWhereInput
    /**
     * Limit how many InternalRecipeData to update.
     */
    limit?: number
  }

  /**
   * InternalRecipeData upsert
   */
  export type InternalRecipeDataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InternalRecipeData
     */
    select?: InternalRecipeDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InternalRecipeData
     */
    omit?: InternalRecipeDataOmit<ExtArgs> | null
    /**
     * The filter to search for the InternalRecipeData to update in case it exists.
     */
    where: InternalRecipeDataWhereUniqueInput
    /**
     * In case the InternalRecipeData found by the `where` argument doesn't exist, create a new InternalRecipeData with this data.
     */
    create: XOR<InternalRecipeDataCreateInput, InternalRecipeDataUncheckedCreateInput>
    /**
     * In case the InternalRecipeData was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InternalRecipeDataUpdateInput, InternalRecipeDataUncheckedUpdateInput>
  }

  /**
   * InternalRecipeData delete
   */
  export type InternalRecipeDataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InternalRecipeData
     */
    select?: InternalRecipeDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InternalRecipeData
     */
    omit?: InternalRecipeDataOmit<ExtArgs> | null
    /**
     * Filter which InternalRecipeData to delete.
     */
    where: InternalRecipeDataWhereUniqueInput
  }

  /**
   * InternalRecipeData deleteMany
   */
  export type InternalRecipeDataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InternalRecipeData to delete
     */
    where?: InternalRecipeDataWhereInput
    /**
     * Limit how many InternalRecipeData to delete.
     */
    limit?: number
  }

  /**
   * InternalRecipeData without action
   */
  export type InternalRecipeDataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InternalRecipeData
     */
    select?: InternalRecipeDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InternalRecipeData
     */
    omit?: InternalRecipeDataOmit<ExtArgs> | null
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


  export const UserOnboardingProgressScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    stepId: 'stepId',
    stepKey: 'stepKey',
    completedAt: 'completedAt',
    skippedAt: 'skippedAt',
    data: 'data',
    isRequired: 'isRequired',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserOnboardingProgressScalarFieldEnum = (typeof UserOnboardingProgressScalarFieldEnum)[keyof typeof UserOnboardingProgressScalarFieldEnum]


  export const RecipeExtractionMetricsScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    sessionId: 'sessionId',
    recipeUrl: 'recipeUrl',
    domain: 'domain',
    requestTimestamp: 'requestTimestamp',
    primaryStrategy: 'primaryStrategy',
    aiProvider: 'aiProvider',
    fallbackUsed: 'fallbackUsed',
    fallbackReason: 'fallbackReason',
    totalDuration: 'totalDuration',
    htmlFetchDuration: 'htmlFetchDuration',
    aiProcessingDuration: 'aiProcessingDuration',
    validationDuration: 'validationDuration',
    databaseSaveDuration: 'databaseSaveDuration',
    htmlContentSize: 'htmlContentSize',
    cleanedContentSize: 'cleanedContentSize',
    promptTokens: 'promptTokens',
    responseTokens: 'responseTokens',
    totalTokens: 'totalTokens',
    extractionSuccess: 'extractionSuccess',
    validationErrors: 'validationErrors',
    missingFields: 'missingFields',
    completenessScore: 'completenessScore',
    categoryConfidence: 'categoryConfidence',
    hasStructuredData: 'hasStructuredData',
    estimatedCost: 'estimatedCost',
    recipeId: 'recipeId',
    wasOptimal: 'wasOptimal',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RecipeExtractionMetricsScalarFieldEnum = (typeof RecipeExtractionMetricsScalarFieldEnum)[keyof typeof RecipeExtractionMetricsScalarFieldEnum]


  export const DomainPerformanceMetricsScalarFieldEnum: {
    id: 'id',
    domain: 'domain',
    totalExtractions: 'totalExtractions',
    successfulExtractions: 'successfulExtractions',
    averageExtractTime: 'averageExtractTime',
    averageTokens: 'averageTokens',
    averageCost: 'averageCost',
    optimalStrategy: 'optimalStrategy',
    optimalProvider: 'optimalProvider',
    averageCompleteness: 'averageCompleteness',
    hasStructuredDataPct: 'hasStructuredDataPct',
    lastUpdated: 'lastUpdated',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DomainPerformanceMetricsScalarFieldEnum = (typeof DomainPerformanceMetricsScalarFieldEnum)[keyof typeof DomainPerformanceMetricsScalarFieldEnum]


  export const AIProviderCostsScalarFieldEnum: {
    id: 'id',
    provider: 'provider',
    model: 'model',
    inputTokenCost: 'inputTokenCost',
    outputTokenCost: 'outputTokenCost',
    effectiveDate: 'effectiveDate',
    createdAt: 'createdAt'
  };

  export type AIProviderCostsScalarFieldEnum = (typeof AIProviderCostsScalarFieldEnum)[keyof typeof AIProviderCostsScalarFieldEnum]


  export const AnonymousSessionScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    deviceType: 'deviceType',
    operatingSystem: 'operatingSystem',
    browser: 'browser',
    screenResolution: 'screenResolution',
    timezone: 'timezone',
    language: 'language',
    firstSeenAt: 'firstSeenAt',
    lastSeenAt: 'lastSeenAt',
    totalRecipeAttempts: 'totalRecipeAttempts',
    totalSuccessfulExtractions: 'totalSuccessfulExtractions',
    hitRateLimit: 'hitRateLimit',
    rateLimitHitAt: 'rateLimitHitAt',
    showedSignupPrompt: 'showedSignupPrompt',
    signupPromptShownAt: 'signupPromptShownAt',
    convertedToUser: 'convertedToUser',
    convertedUserId: 'convertedUserId',
    convertedAt: 'convertedAt',
    referrerDomain: 'referrerDomain',
    countryCode: 'countryCode',
    cityName: 'cityName',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AnonymousSessionScalarFieldEnum = (typeof AnonymousSessionScalarFieldEnum)[keyof typeof AnonymousSessionScalarFieldEnum]


  export const ConversionEventScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    userId: 'userId',
    eventType: 'eventType',
    eventData: 'eventData',
    recipeUrl: 'recipeUrl',
    pageUrl: 'pageUrl',
    sessionDuration: 'sessionDuration',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type ConversionEventScalarFieldEnum = (typeof ConversionEventScalarFieldEnum)[keyof typeof ConversionEventScalarFieldEnum]


  export const DailyRateLimitScalarFieldEnum: {
    id: 'id',
    identifier: 'identifier',
    identifierType: 'identifierType',
    date: 'date',
    requestCount: 'requestCount',
    lastRequestAt: 'lastRequestAt',
    ipAddress: 'ipAddress',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DailyRateLimitScalarFieldEnum = (typeof DailyRateLimitScalarFieldEnum)[keyof typeof DailyRateLimitScalarFieldEnum]


  export const InternalRecipeDataScalarFieldEnum: {
    id: 'id',
    title: 'title',
    sourceUrl: 'sourceUrl',
    domain: 'domain',
    extractedAt: 'extractedAt',
    createdAt: 'createdAt',
    extractionStrategy: 'extractionStrategy',
    aiProvider: 'aiProvider',
    totalProcessingTimeMs: 'totalProcessingTimeMs',
    fetchTimeMs: 'fetchTimeMs',
    parseTimeMs: 'parseTimeMs',
    aiTimeMs: 'aiTimeMs'
  };

  export type InternalRecipeDataScalarFieldEnum = (typeof InternalRecipeDataScalarFieldEnum)[keyof typeof InternalRecipeDataScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


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


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'ExtractionStrategy'
   */
  export type EnumExtractionStrategyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExtractionStrategy'>
    


  /**
   * Reference to a field of type 'ExtractionStrategy[]'
   */
  export type ListEnumExtractionStrategyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExtractionStrategy[]'>
    


  /**
   * Reference to a field of type 'AIProvider'
   */
  export type EnumAIProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AIProvider'>
    


  /**
   * Reference to a field of type 'AIProvider[]'
   */
  export type ListEnumAIProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AIProvider[]'>
    


  /**
   * Reference to a field of type 'ConversionEventType'
   */
  export type EnumConversionEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConversionEventType'>
    


  /**
   * Reference to a field of type 'ConversionEventType[]'
   */
  export type ListEnumConversionEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConversionEventType[]'>
    
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
    onboardingProgress?: UserOnboardingProgressListRelationFilter
    extractionMetrics?: RecipeExtractionMetricsListRelationFilter
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
    onboardingProgress?: UserOnboardingProgressOrderByRelationAggregateInput
    extractionMetrics?: RecipeExtractionMetricsOrderByRelationAggregateInput
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
    onboardingProgress?: UserOnboardingProgressListRelationFilter
    extractionMetrics?: RecipeExtractionMetricsListRelationFilter
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
    extractionMetrics?: RecipeExtractionMetricsListRelationFilter
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
    extractionMetrics?: RecipeExtractionMetricsOrderByRelationAggregateInput
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
    extractionMetrics?: RecipeExtractionMetricsListRelationFilter
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

  export type UserOnboardingProgressWhereInput = {
    AND?: UserOnboardingProgressWhereInput | UserOnboardingProgressWhereInput[]
    OR?: UserOnboardingProgressWhereInput[]
    NOT?: UserOnboardingProgressWhereInput | UserOnboardingProgressWhereInput[]
    id?: StringFilter<"UserOnboardingProgress"> | string
    userId?: StringFilter<"UserOnboardingProgress"> | string
    stepId?: IntFilter<"UserOnboardingProgress"> | number
    stepKey?: StringFilter<"UserOnboardingProgress"> | string
    completedAt?: DateTimeNullableFilter<"UserOnboardingProgress"> | Date | string | null
    skippedAt?: DateTimeNullableFilter<"UserOnboardingProgress"> | Date | string | null
    data?: JsonNullableFilter<"UserOnboardingProgress">
    isRequired?: BoolFilter<"UserOnboardingProgress"> | boolean
    createdAt?: DateTimeFilter<"UserOnboardingProgress"> | Date | string
    updatedAt?: DateTimeFilter<"UserOnboardingProgress"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserOnboardingProgressOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    stepId?: SortOrder
    stepKey?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    skippedAt?: SortOrderInput | SortOrder
    data?: SortOrderInput | SortOrder
    isRequired?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserOnboardingProgressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_stepId?: UserOnboardingProgressUserIdStepIdCompoundUniqueInput
    AND?: UserOnboardingProgressWhereInput | UserOnboardingProgressWhereInput[]
    OR?: UserOnboardingProgressWhereInput[]
    NOT?: UserOnboardingProgressWhereInput | UserOnboardingProgressWhereInput[]
    userId?: StringFilter<"UserOnboardingProgress"> | string
    stepId?: IntFilter<"UserOnboardingProgress"> | number
    stepKey?: StringFilter<"UserOnboardingProgress"> | string
    completedAt?: DateTimeNullableFilter<"UserOnboardingProgress"> | Date | string | null
    skippedAt?: DateTimeNullableFilter<"UserOnboardingProgress"> | Date | string | null
    data?: JsonNullableFilter<"UserOnboardingProgress">
    isRequired?: BoolFilter<"UserOnboardingProgress"> | boolean
    createdAt?: DateTimeFilter<"UserOnboardingProgress"> | Date | string
    updatedAt?: DateTimeFilter<"UserOnboardingProgress"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_stepId">

  export type UserOnboardingProgressOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    stepId?: SortOrder
    stepKey?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    skippedAt?: SortOrderInput | SortOrder
    data?: SortOrderInput | SortOrder
    isRequired?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserOnboardingProgressCountOrderByAggregateInput
    _avg?: UserOnboardingProgressAvgOrderByAggregateInput
    _max?: UserOnboardingProgressMaxOrderByAggregateInput
    _min?: UserOnboardingProgressMinOrderByAggregateInput
    _sum?: UserOnboardingProgressSumOrderByAggregateInput
  }

  export type UserOnboardingProgressScalarWhereWithAggregatesInput = {
    AND?: UserOnboardingProgressScalarWhereWithAggregatesInput | UserOnboardingProgressScalarWhereWithAggregatesInput[]
    OR?: UserOnboardingProgressScalarWhereWithAggregatesInput[]
    NOT?: UserOnboardingProgressScalarWhereWithAggregatesInput | UserOnboardingProgressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserOnboardingProgress"> | string
    userId?: StringWithAggregatesFilter<"UserOnboardingProgress"> | string
    stepId?: IntWithAggregatesFilter<"UserOnboardingProgress"> | number
    stepKey?: StringWithAggregatesFilter<"UserOnboardingProgress"> | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"UserOnboardingProgress"> | Date | string | null
    skippedAt?: DateTimeNullableWithAggregatesFilter<"UserOnboardingProgress"> | Date | string | null
    data?: JsonNullableWithAggregatesFilter<"UserOnboardingProgress">
    isRequired?: BoolWithAggregatesFilter<"UserOnboardingProgress"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"UserOnboardingProgress"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserOnboardingProgress"> | Date | string
  }

  export type RecipeExtractionMetricsWhereInput = {
    AND?: RecipeExtractionMetricsWhereInput | RecipeExtractionMetricsWhereInput[]
    OR?: RecipeExtractionMetricsWhereInput[]
    NOT?: RecipeExtractionMetricsWhereInput | RecipeExtractionMetricsWhereInput[]
    id?: StringFilter<"RecipeExtractionMetrics"> | string
    userId?: StringNullableFilter<"RecipeExtractionMetrics"> | string | null
    sessionId?: StringNullableFilter<"RecipeExtractionMetrics"> | string | null
    recipeUrl?: StringFilter<"RecipeExtractionMetrics"> | string
    domain?: StringFilter<"RecipeExtractionMetrics"> | string
    requestTimestamp?: DateTimeFilter<"RecipeExtractionMetrics"> | Date | string
    primaryStrategy?: EnumExtractionStrategyFilter<"RecipeExtractionMetrics"> | $Enums.ExtractionStrategy
    aiProvider?: EnumAIProviderFilter<"RecipeExtractionMetrics"> | $Enums.AIProvider
    fallbackUsed?: BoolFilter<"RecipeExtractionMetrics"> | boolean
    fallbackReason?: StringNullableFilter<"RecipeExtractionMetrics"> | string | null
    totalDuration?: IntFilter<"RecipeExtractionMetrics"> | number
    htmlFetchDuration?: IntNullableFilter<"RecipeExtractionMetrics"> | number | null
    aiProcessingDuration?: IntFilter<"RecipeExtractionMetrics"> | number
    validationDuration?: IntNullableFilter<"RecipeExtractionMetrics"> | number | null
    databaseSaveDuration?: IntNullableFilter<"RecipeExtractionMetrics"> | number | null
    htmlContentSize?: IntNullableFilter<"RecipeExtractionMetrics"> | number | null
    cleanedContentSize?: IntNullableFilter<"RecipeExtractionMetrics"> | number | null
    promptTokens?: IntNullableFilter<"RecipeExtractionMetrics"> | number | null
    responseTokens?: IntNullableFilter<"RecipeExtractionMetrics"> | number | null
    totalTokens?: IntNullableFilter<"RecipeExtractionMetrics"> | number | null
    extractionSuccess?: BoolFilter<"RecipeExtractionMetrics"> | boolean
    validationErrors?: JsonNullableFilter<"RecipeExtractionMetrics">
    missingFields?: StringNullableListFilter<"RecipeExtractionMetrics">
    completenessScore?: FloatNullableFilter<"RecipeExtractionMetrics"> | number | null
    categoryConfidence?: FloatNullableFilter<"RecipeExtractionMetrics"> | number | null
    hasStructuredData?: BoolNullableFilter<"RecipeExtractionMetrics"> | boolean | null
    estimatedCost?: FloatNullableFilter<"RecipeExtractionMetrics"> | number | null
    recipeId?: StringNullableFilter<"RecipeExtractionMetrics"> | string | null
    wasOptimal?: BoolFilter<"RecipeExtractionMetrics"> | boolean
    createdAt?: DateTimeFilter<"RecipeExtractionMetrics"> | Date | string
    updatedAt?: DateTimeFilter<"RecipeExtractionMetrics"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    recipe?: XOR<RecipeNullableScalarRelationFilter, RecipeWhereInput> | null
  }

  export type RecipeExtractionMetricsOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    sessionId?: SortOrderInput | SortOrder
    recipeUrl?: SortOrder
    domain?: SortOrder
    requestTimestamp?: SortOrder
    primaryStrategy?: SortOrder
    aiProvider?: SortOrder
    fallbackUsed?: SortOrder
    fallbackReason?: SortOrderInput | SortOrder
    totalDuration?: SortOrder
    htmlFetchDuration?: SortOrderInput | SortOrder
    aiProcessingDuration?: SortOrder
    validationDuration?: SortOrderInput | SortOrder
    databaseSaveDuration?: SortOrderInput | SortOrder
    htmlContentSize?: SortOrderInput | SortOrder
    cleanedContentSize?: SortOrderInput | SortOrder
    promptTokens?: SortOrderInput | SortOrder
    responseTokens?: SortOrderInput | SortOrder
    totalTokens?: SortOrderInput | SortOrder
    extractionSuccess?: SortOrder
    validationErrors?: SortOrderInput | SortOrder
    missingFields?: SortOrder
    completenessScore?: SortOrderInput | SortOrder
    categoryConfidence?: SortOrderInput | SortOrder
    hasStructuredData?: SortOrderInput | SortOrder
    estimatedCost?: SortOrderInput | SortOrder
    recipeId?: SortOrderInput | SortOrder
    wasOptimal?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    recipe?: RecipeOrderByWithRelationInput
  }

  export type RecipeExtractionMetricsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RecipeExtractionMetricsWhereInput | RecipeExtractionMetricsWhereInput[]
    OR?: RecipeExtractionMetricsWhereInput[]
    NOT?: RecipeExtractionMetricsWhereInput | RecipeExtractionMetricsWhereInput[]
    userId?: StringNullableFilter<"RecipeExtractionMetrics"> | string | null
    sessionId?: StringNullableFilter<"RecipeExtractionMetrics"> | string | null
    recipeUrl?: StringFilter<"RecipeExtractionMetrics"> | string
    domain?: StringFilter<"RecipeExtractionMetrics"> | string
    requestTimestamp?: DateTimeFilter<"RecipeExtractionMetrics"> | Date | string
    primaryStrategy?: EnumExtractionStrategyFilter<"RecipeExtractionMetrics"> | $Enums.ExtractionStrategy
    aiProvider?: EnumAIProviderFilter<"RecipeExtractionMetrics"> | $Enums.AIProvider
    fallbackUsed?: BoolFilter<"RecipeExtractionMetrics"> | boolean
    fallbackReason?: StringNullableFilter<"RecipeExtractionMetrics"> | string | null
    totalDuration?: IntFilter<"RecipeExtractionMetrics"> | number
    htmlFetchDuration?: IntNullableFilter<"RecipeExtractionMetrics"> | number | null
    aiProcessingDuration?: IntFilter<"RecipeExtractionMetrics"> | number
    validationDuration?: IntNullableFilter<"RecipeExtractionMetrics"> | number | null
    databaseSaveDuration?: IntNullableFilter<"RecipeExtractionMetrics"> | number | null
    htmlContentSize?: IntNullableFilter<"RecipeExtractionMetrics"> | number | null
    cleanedContentSize?: IntNullableFilter<"RecipeExtractionMetrics"> | number | null
    promptTokens?: IntNullableFilter<"RecipeExtractionMetrics"> | number | null
    responseTokens?: IntNullableFilter<"RecipeExtractionMetrics"> | number | null
    totalTokens?: IntNullableFilter<"RecipeExtractionMetrics"> | number | null
    extractionSuccess?: BoolFilter<"RecipeExtractionMetrics"> | boolean
    validationErrors?: JsonNullableFilter<"RecipeExtractionMetrics">
    missingFields?: StringNullableListFilter<"RecipeExtractionMetrics">
    completenessScore?: FloatNullableFilter<"RecipeExtractionMetrics"> | number | null
    categoryConfidence?: FloatNullableFilter<"RecipeExtractionMetrics"> | number | null
    hasStructuredData?: BoolNullableFilter<"RecipeExtractionMetrics"> | boolean | null
    estimatedCost?: FloatNullableFilter<"RecipeExtractionMetrics"> | number | null
    recipeId?: StringNullableFilter<"RecipeExtractionMetrics"> | string | null
    wasOptimal?: BoolFilter<"RecipeExtractionMetrics"> | boolean
    createdAt?: DateTimeFilter<"RecipeExtractionMetrics"> | Date | string
    updatedAt?: DateTimeFilter<"RecipeExtractionMetrics"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    recipe?: XOR<RecipeNullableScalarRelationFilter, RecipeWhereInput> | null
  }, "id">

  export type RecipeExtractionMetricsOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    sessionId?: SortOrderInput | SortOrder
    recipeUrl?: SortOrder
    domain?: SortOrder
    requestTimestamp?: SortOrder
    primaryStrategy?: SortOrder
    aiProvider?: SortOrder
    fallbackUsed?: SortOrder
    fallbackReason?: SortOrderInput | SortOrder
    totalDuration?: SortOrder
    htmlFetchDuration?: SortOrderInput | SortOrder
    aiProcessingDuration?: SortOrder
    validationDuration?: SortOrderInput | SortOrder
    databaseSaveDuration?: SortOrderInput | SortOrder
    htmlContentSize?: SortOrderInput | SortOrder
    cleanedContentSize?: SortOrderInput | SortOrder
    promptTokens?: SortOrderInput | SortOrder
    responseTokens?: SortOrderInput | SortOrder
    totalTokens?: SortOrderInput | SortOrder
    extractionSuccess?: SortOrder
    validationErrors?: SortOrderInput | SortOrder
    missingFields?: SortOrder
    completenessScore?: SortOrderInput | SortOrder
    categoryConfidence?: SortOrderInput | SortOrder
    hasStructuredData?: SortOrderInput | SortOrder
    estimatedCost?: SortOrderInput | SortOrder
    recipeId?: SortOrderInput | SortOrder
    wasOptimal?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RecipeExtractionMetricsCountOrderByAggregateInput
    _avg?: RecipeExtractionMetricsAvgOrderByAggregateInput
    _max?: RecipeExtractionMetricsMaxOrderByAggregateInput
    _min?: RecipeExtractionMetricsMinOrderByAggregateInput
    _sum?: RecipeExtractionMetricsSumOrderByAggregateInput
  }

  export type RecipeExtractionMetricsScalarWhereWithAggregatesInput = {
    AND?: RecipeExtractionMetricsScalarWhereWithAggregatesInput | RecipeExtractionMetricsScalarWhereWithAggregatesInput[]
    OR?: RecipeExtractionMetricsScalarWhereWithAggregatesInput[]
    NOT?: RecipeExtractionMetricsScalarWhereWithAggregatesInput | RecipeExtractionMetricsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RecipeExtractionMetrics"> | string
    userId?: StringNullableWithAggregatesFilter<"RecipeExtractionMetrics"> | string | null
    sessionId?: StringNullableWithAggregatesFilter<"RecipeExtractionMetrics"> | string | null
    recipeUrl?: StringWithAggregatesFilter<"RecipeExtractionMetrics"> | string
    domain?: StringWithAggregatesFilter<"RecipeExtractionMetrics"> | string
    requestTimestamp?: DateTimeWithAggregatesFilter<"RecipeExtractionMetrics"> | Date | string
    primaryStrategy?: EnumExtractionStrategyWithAggregatesFilter<"RecipeExtractionMetrics"> | $Enums.ExtractionStrategy
    aiProvider?: EnumAIProviderWithAggregatesFilter<"RecipeExtractionMetrics"> | $Enums.AIProvider
    fallbackUsed?: BoolWithAggregatesFilter<"RecipeExtractionMetrics"> | boolean
    fallbackReason?: StringNullableWithAggregatesFilter<"RecipeExtractionMetrics"> | string | null
    totalDuration?: IntWithAggregatesFilter<"RecipeExtractionMetrics"> | number
    htmlFetchDuration?: IntNullableWithAggregatesFilter<"RecipeExtractionMetrics"> | number | null
    aiProcessingDuration?: IntWithAggregatesFilter<"RecipeExtractionMetrics"> | number
    validationDuration?: IntNullableWithAggregatesFilter<"RecipeExtractionMetrics"> | number | null
    databaseSaveDuration?: IntNullableWithAggregatesFilter<"RecipeExtractionMetrics"> | number | null
    htmlContentSize?: IntNullableWithAggregatesFilter<"RecipeExtractionMetrics"> | number | null
    cleanedContentSize?: IntNullableWithAggregatesFilter<"RecipeExtractionMetrics"> | number | null
    promptTokens?: IntNullableWithAggregatesFilter<"RecipeExtractionMetrics"> | number | null
    responseTokens?: IntNullableWithAggregatesFilter<"RecipeExtractionMetrics"> | number | null
    totalTokens?: IntNullableWithAggregatesFilter<"RecipeExtractionMetrics"> | number | null
    extractionSuccess?: BoolWithAggregatesFilter<"RecipeExtractionMetrics"> | boolean
    validationErrors?: JsonNullableWithAggregatesFilter<"RecipeExtractionMetrics">
    missingFields?: StringNullableListFilter<"RecipeExtractionMetrics">
    completenessScore?: FloatNullableWithAggregatesFilter<"RecipeExtractionMetrics"> | number | null
    categoryConfidence?: FloatNullableWithAggregatesFilter<"RecipeExtractionMetrics"> | number | null
    hasStructuredData?: BoolNullableWithAggregatesFilter<"RecipeExtractionMetrics"> | boolean | null
    estimatedCost?: FloatNullableWithAggregatesFilter<"RecipeExtractionMetrics"> | number | null
    recipeId?: StringNullableWithAggregatesFilter<"RecipeExtractionMetrics"> | string | null
    wasOptimal?: BoolWithAggregatesFilter<"RecipeExtractionMetrics"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"RecipeExtractionMetrics"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RecipeExtractionMetrics"> | Date | string
  }

  export type DomainPerformanceMetricsWhereInput = {
    AND?: DomainPerformanceMetricsWhereInput | DomainPerformanceMetricsWhereInput[]
    OR?: DomainPerformanceMetricsWhereInput[]
    NOT?: DomainPerformanceMetricsWhereInput | DomainPerformanceMetricsWhereInput[]
    id?: StringFilter<"DomainPerformanceMetrics"> | string
    domain?: StringFilter<"DomainPerformanceMetrics"> | string
    totalExtractions?: IntFilter<"DomainPerformanceMetrics"> | number
    successfulExtractions?: IntFilter<"DomainPerformanceMetrics"> | number
    averageExtractTime?: IntNullableFilter<"DomainPerformanceMetrics"> | number | null
    averageTokens?: IntNullableFilter<"DomainPerformanceMetrics"> | number | null
    averageCost?: FloatNullableFilter<"DomainPerformanceMetrics"> | number | null
    optimalStrategy?: EnumExtractionStrategyNullableFilter<"DomainPerformanceMetrics"> | $Enums.ExtractionStrategy | null
    optimalProvider?: EnumAIProviderNullableFilter<"DomainPerformanceMetrics"> | $Enums.AIProvider | null
    averageCompleteness?: FloatNullableFilter<"DomainPerformanceMetrics"> | number | null
    hasStructuredDataPct?: FloatNullableFilter<"DomainPerformanceMetrics"> | number | null
    lastUpdated?: DateTimeFilter<"DomainPerformanceMetrics"> | Date | string
    createdAt?: DateTimeFilter<"DomainPerformanceMetrics"> | Date | string
    updatedAt?: DateTimeFilter<"DomainPerformanceMetrics"> | Date | string
  }

  export type DomainPerformanceMetricsOrderByWithRelationInput = {
    id?: SortOrder
    domain?: SortOrder
    totalExtractions?: SortOrder
    successfulExtractions?: SortOrder
    averageExtractTime?: SortOrderInput | SortOrder
    averageTokens?: SortOrderInput | SortOrder
    averageCost?: SortOrderInput | SortOrder
    optimalStrategy?: SortOrderInput | SortOrder
    optimalProvider?: SortOrderInput | SortOrder
    averageCompleteness?: SortOrderInput | SortOrder
    hasStructuredDataPct?: SortOrderInput | SortOrder
    lastUpdated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DomainPerformanceMetricsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    domain?: string
    AND?: DomainPerformanceMetricsWhereInput | DomainPerformanceMetricsWhereInput[]
    OR?: DomainPerformanceMetricsWhereInput[]
    NOT?: DomainPerformanceMetricsWhereInput | DomainPerformanceMetricsWhereInput[]
    totalExtractions?: IntFilter<"DomainPerformanceMetrics"> | number
    successfulExtractions?: IntFilter<"DomainPerformanceMetrics"> | number
    averageExtractTime?: IntNullableFilter<"DomainPerformanceMetrics"> | number | null
    averageTokens?: IntNullableFilter<"DomainPerformanceMetrics"> | number | null
    averageCost?: FloatNullableFilter<"DomainPerformanceMetrics"> | number | null
    optimalStrategy?: EnumExtractionStrategyNullableFilter<"DomainPerformanceMetrics"> | $Enums.ExtractionStrategy | null
    optimalProvider?: EnumAIProviderNullableFilter<"DomainPerformanceMetrics"> | $Enums.AIProvider | null
    averageCompleteness?: FloatNullableFilter<"DomainPerformanceMetrics"> | number | null
    hasStructuredDataPct?: FloatNullableFilter<"DomainPerformanceMetrics"> | number | null
    lastUpdated?: DateTimeFilter<"DomainPerformanceMetrics"> | Date | string
    createdAt?: DateTimeFilter<"DomainPerformanceMetrics"> | Date | string
    updatedAt?: DateTimeFilter<"DomainPerformanceMetrics"> | Date | string
  }, "id" | "domain">

  export type DomainPerformanceMetricsOrderByWithAggregationInput = {
    id?: SortOrder
    domain?: SortOrder
    totalExtractions?: SortOrder
    successfulExtractions?: SortOrder
    averageExtractTime?: SortOrderInput | SortOrder
    averageTokens?: SortOrderInput | SortOrder
    averageCost?: SortOrderInput | SortOrder
    optimalStrategy?: SortOrderInput | SortOrder
    optimalProvider?: SortOrderInput | SortOrder
    averageCompleteness?: SortOrderInput | SortOrder
    hasStructuredDataPct?: SortOrderInput | SortOrder
    lastUpdated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DomainPerformanceMetricsCountOrderByAggregateInput
    _avg?: DomainPerformanceMetricsAvgOrderByAggregateInput
    _max?: DomainPerformanceMetricsMaxOrderByAggregateInput
    _min?: DomainPerformanceMetricsMinOrderByAggregateInput
    _sum?: DomainPerformanceMetricsSumOrderByAggregateInput
  }

  export type DomainPerformanceMetricsScalarWhereWithAggregatesInput = {
    AND?: DomainPerformanceMetricsScalarWhereWithAggregatesInput | DomainPerformanceMetricsScalarWhereWithAggregatesInput[]
    OR?: DomainPerformanceMetricsScalarWhereWithAggregatesInput[]
    NOT?: DomainPerformanceMetricsScalarWhereWithAggregatesInput | DomainPerformanceMetricsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DomainPerformanceMetrics"> | string
    domain?: StringWithAggregatesFilter<"DomainPerformanceMetrics"> | string
    totalExtractions?: IntWithAggregatesFilter<"DomainPerformanceMetrics"> | number
    successfulExtractions?: IntWithAggregatesFilter<"DomainPerformanceMetrics"> | number
    averageExtractTime?: IntNullableWithAggregatesFilter<"DomainPerformanceMetrics"> | number | null
    averageTokens?: IntNullableWithAggregatesFilter<"DomainPerformanceMetrics"> | number | null
    averageCost?: FloatNullableWithAggregatesFilter<"DomainPerformanceMetrics"> | number | null
    optimalStrategy?: EnumExtractionStrategyNullableWithAggregatesFilter<"DomainPerformanceMetrics"> | $Enums.ExtractionStrategy | null
    optimalProvider?: EnumAIProviderNullableWithAggregatesFilter<"DomainPerformanceMetrics"> | $Enums.AIProvider | null
    averageCompleteness?: FloatNullableWithAggregatesFilter<"DomainPerformanceMetrics"> | number | null
    hasStructuredDataPct?: FloatNullableWithAggregatesFilter<"DomainPerformanceMetrics"> | number | null
    lastUpdated?: DateTimeWithAggregatesFilter<"DomainPerformanceMetrics"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"DomainPerformanceMetrics"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DomainPerformanceMetrics"> | Date | string
  }

  export type AIProviderCostsWhereInput = {
    AND?: AIProviderCostsWhereInput | AIProviderCostsWhereInput[]
    OR?: AIProviderCostsWhereInput[]
    NOT?: AIProviderCostsWhereInput | AIProviderCostsWhereInput[]
    id?: StringFilter<"AIProviderCosts"> | string
    provider?: StringFilter<"AIProviderCosts"> | string
    model?: StringFilter<"AIProviderCosts"> | string
    inputTokenCost?: FloatFilter<"AIProviderCosts"> | number
    outputTokenCost?: FloatFilter<"AIProviderCosts"> | number
    effectiveDate?: DateTimeFilter<"AIProviderCosts"> | Date | string
    createdAt?: DateTimeFilter<"AIProviderCosts"> | Date | string
  }

  export type AIProviderCostsOrderByWithRelationInput = {
    id?: SortOrder
    provider?: SortOrder
    model?: SortOrder
    inputTokenCost?: SortOrder
    outputTokenCost?: SortOrder
    effectiveDate?: SortOrder
    createdAt?: SortOrder
  }

  export type AIProviderCostsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AIProviderCostsWhereInput | AIProviderCostsWhereInput[]
    OR?: AIProviderCostsWhereInput[]
    NOT?: AIProviderCostsWhereInput | AIProviderCostsWhereInput[]
    provider?: StringFilter<"AIProviderCosts"> | string
    model?: StringFilter<"AIProviderCosts"> | string
    inputTokenCost?: FloatFilter<"AIProviderCosts"> | number
    outputTokenCost?: FloatFilter<"AIProviderCosts"> | number
    effectiveDate?: DateTimeFilter<"AIProviderCosts"> | Date | string
    createdAt?: DateTimeFilter<"AIProviderCosts"> | Date | string
  }, "id">

  export type AIProviderCostsOrderByWithAggregationInput = {
    id?: SortOrder
    provider?: SortOrder
    model?: SortOrder
    inputTokenCost?: SortOrder
    outputTokenCost?: SortOrder
    effectiveDate?: SortOrder
    createdAt?: SortOrder
    _count?: AIProviderCostsCountOrderByAggregateInput
    _avg?: AIProviderCostsAvgOrderByAggregateInput
    _max?: AIProviderCostsMaxOrderByAggregateInput
    _min?: AIProviderCostsMinOrderByAggregateInput
    _sum?: AIProviderCostsSumOrderByAggregateInput
  }

  export type AIProviderCostsScalarWhereWithAggregatesInput = {
    AND?: AIProviderCostsScalarWhereWithAggregatesInput | AIProviderCostsScalarWhereWithAggregatesInput[]
    OR?: AIProviderCostsScalarWhereWithAggregatesInput[]
    NOT?: AIProviderCostsScalarWhereWithAggregatesInput | AIProviderCostsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIProviderCosts"> | string
    provider?: StringWithAggregatesFilter<"AIProviderCosts"> | string
    model?: StringWithAggregatesFilter<"AIProviderCosts"> | string
    inputTokenCost?: FloatWithAggregatesFilter<"AIProviderCosts"> | number
    outputTokenCost?: FloatWithAggregatesFilter<"AIProviderCosts"> | number
    effectiveDate?: DateTimeWithAggregatesFilter<"AIProviderCosts"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"AIProviderCosts"> | Date | string
  }

  export type AnonymousSessionWhereInput = {
    AND?: AnonymousSessionWhereInput | AnonymousSessionWhereInput[]
    OR?: AnonymousSessionWhereInput[]
    NOT?: AnonymousSessionWhereInput | AnonymousSessionWhereInput[]
    id?: StringFilter<"AnonymousSession"> | string
    sessionId?: StringFilter<"AnonymousSession"> | string
    ipAddress?: StringFilter<"AnonymousSession"> | string
    userAgent?: StringFilter<"AnonymousSession"> | string
    deviceType?: StringNullableFilter<"AnonymousSession"> | string | null
    operatingSystem?: StringNullableFilter<"AnonymousSession"> | string | null
    browser?: StringNullableFilter<"AnonymousSession"> | string | null
    screenResolution?: StringNullableFilter<"AnonymousSession"> | string | null
    timezone?: StringNullableFilter<"AnonymousSession"> | string | null
    language?: StringNullableFilter<"AnonymousSession"> | string | null
    firstSeenAt?: DateTimeFilter<"AnonymousSession"> | Date | string
    lastSeenAt?: DateTimeFilter<"AnonymousSession"> | Date | string
    totalRecipeAttempts?: IntFilter<"AnonymousSession"> | number
    totalSuccessfulExtractions?: IntFilter<"AnonymousSession"> | number
    hitRateLimit?: BoolFilter<"AnonymousSession"> | boolean
    rateLimitHitAt?: DateTimeNullableFilter<"AnonymousSession"> | Date | string | null
    showedSignupPrompt?: BoolFilter<"AnonymousSession"> | boolean
    signupPromptShownAt?: DateTimeNullableFilter<"AnonymousSession"> | Date | string | null
    convertedToUser?: BoolFilter<"AnonymousSession"> | boolean
    convertedUserId?: StringNullableFilter<"AnonymousSession"> | string | null
    convertedAt?: DateTimeNullableFilter<"AnonymousSession"> | Date | string | null
    referrerDomain?: StringNullableFilter<"AnonymousSession"> | string | null
    countryCode?: StringNullableFilter<"AnonymousSession"> | string | null
    cityName?: StringNullableFilter<"AnonymousSession"> | string | null
    expiresAt?: DateTimeFilter<"AnonymousSession"> | Date | string
    createdAt?: DateTimeFilter<"AnonymousSession"> | Date | string
    updatedAt?: DateTimeFilter<"AnonymousSession"> | Date | string
  }

  export type AnonymousSessionOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    deviceType?: SortOrderInput | SortOrder
    operatingSystem?: SortOrderInput | SortOrder
    browser?: SortOrderInput | SortOrder
    screenResolution?: SortOrderInput | SortOrder
    timezone?: SortOrderInput | SortOrder
    language?: SortOrderInput | SortOrder
    firstSeenAt?: SortOrder
    lastSeenAt?: SortOrder
    totalRecipeAttempts?: SortOrder
    totalSuccessfulExtractions?: SortOrder
    hitRateLimit?: SortOrder
    rateLimitHitAt?: SortOrderInput | SortOrder
    showedSignupPrompt?: SortOrder
    signupPromptShownAt?: SortOrderInput | SortOrder
    convertedToUser?: SortOrder
    convertedUserId?: SortOrderInput | SortOrder
    convertedAt?: SortOrderInput | SortOrder
    referrerDomain?: SortOrderInput | SortOrder
    countryCode?: SortOrderInput | SortOrder
    cityName?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AnonymousSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionId?: string
    AND?: AnonymousSessionWhereInput | AnonymousSessionWhereInput[]
    OR?: AnonymousSessionWhereInput[]
    NOT?: AnonymousSessionWhereInput | AnonymousSessionWhereInput[]
    ipAddress?: StringFilter<"AnonymousSession"> | string
    userAgent?: StringFilter<"AnonymousSession"> | string
    deviceType?: StringNullableFilter<"AnonymousSession"> | string | null
    operatingSystem?: StringNullableFilter<"AnonymousSession"> | string | null
    browser?: StringNullableFilter<"AnonymousSession"> | string | null
    screenResolution?: StringNullableFilter<"AnonymousSession"> | string | null
    timezone?: StringNullableFilter<"AnonymousSession"> | string | null
    language?: StringNullableFilter<"AnonymousSession"> | string | null
    firstSeenAt?: DateTimeFilter<"AnonymousSession"> | Date | string
    lastSeenAt?: DateTimeFilter<"AnonymousSession"> | Date | string
    totalRecipeAttempts?: IntFilter<"AnonymousSession"> | number
    totalSuccessfulExtractions?: IntFilter<"AnonymousSession"> | number
    hitRateLimit?: BoolFilter<"AnonymousSession"> | boolean
    rateLimitHitAt?: DateTimeNullableFilter<"AnonymousSession"> | Date | string | null
    showedSignupPrompt?: BoolFilter<"AnonymousSession"> | boolean
    signupPromptShownAt?: DateTimeNullableFilter<"AnonymousSession"> | Date | string | null
    convertedToUser?: BoolFilter<"AnonymousSession"> | boolean
    convertedUserId?: StringNullableFilter<"AnonymousSession"> | string | null
    convertedAt?: DateTimeNullableFilter<"AnonymousSession"> | Date | string | null
    referrerDomain?: StringNullableFilter<"AnonymousSession"> | string | null
    countryCode?: StringNullableFilter<"AnonymousSession"> | string | null
    cityName?: StringNullableFilter<"AnonymousSession"> | string | null
    expiresAt?: DateTimeFilter<"AnonymousSession"> | Date | string
    createdAt?: DateTimeFilter<"AnonymousSession"> | Date | string
    updatedAt?: DateTimeFilter<"AnonymousSession"> | Date | string
  }, "id" | "sessionId">

  export type AnonymousSessionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    deviceType?: SortOrderInput | SortOrder
    operatingSystem?: SortOrderInput | SortOrder
    browser?: SortOrderInput | SortOrder
    screenResolution?: SortOrderInput | SortOrder
    timezone?: SortOrderInput | SortOrder
    language?: SortOrderInput | SortOrder
    firstSeenAt?: SortOrder
    lastSeenAt?: SortOrder
    totalRecipeAttempts?: SortOrder
    totalSuccessfulExtractions?: SortOrder
    hitRateLimit?: SortOrder
    rateLimitHitAt?: SortOrderInput | SortOrder
    showedSignupPrompt?: SortOrder
    signupPromptShownAt?: SortOrderInput | SortOrder
    convertedToUser?: SortOrder
    convertedUserId?: SortOrderInput | SortOrder
    convertedAt?: SortOrderInput | SortOrder
    referrerDomain?: SortOrderInput | SortOrder
    countryCode?: SortOrderInput | SortOrder
    cityName?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AnonymousSessionCountOrderByAggregateInput
    _avg?: AnonymousSessionAvgOrderByAggregateInput
    _max?: AnonymousSessionMaxOrderByAggregateInput
    _min?: AnonymousSessionMinOrderByAggregateInput
    _sum?: AnonymousSessionSumOrderByAggregateInput
  }

  export type AnonymousSessionScalarWhereWithAggregatesInput = {
    AND?: AnonymousSessionScalarWhereWithAggregatesInput | AnonymousSessionScalarWhereWithAggregatesInput[]
    OR?: AnonymousSessionScalarWhereWithAggregatesInput[]
    NOT?: AnonymousSessionScalarWhereWithAggregatesInput | AnonymousSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AnonymousSession"> | string
    sessionId?: StringWithAggregatesFilter<"AnonymousSession"> | string
    ipAddress?: StringWithAggregatesFilter<"AnonymousSession"> | string
    userAgent?: StringWithAggregatesFilter<"AnonymousSession"> | string
    deviceType?: StringNullableWithAggregatesFilter<"AnonymousSession"> | string | null
    operatingSystem?: StringNullableWithAggregatesFilter<"AnonymousSession"> | string | null
    browser?: StringNullableWithAggregatesFilter<"AnonymousSession"> | string | null
    screenResolution?: StringNullableWithAggregatesFilter<"AnonymousSession"> | string | null
    timezone?: StringNullableWithAggregatesFilter<"AnonymousSession"> | string | null
    language?: StringNullableWithAggregatesFilter<"AnonymousSession"> | string | null
    firstSeenAt?: DateTimeWithAggregatesFilter<"AnonymousSession"> | Date | string
    lastSeenAt?: DateTimeWithAggregatesFilter<"AnonymousSession"> | Date | string
    totalRecipeAttempts?: IntWithAggregatesFilter<"AnonymousSession"> | number
    totalSuccessfulExtractions?: IntWithAggregatesFilter<"AnonymousSession"> | number
    hitRateLimit?: BoolWithAggregatesFilter<"AnonymousSession"> | boolean
    rateLimitHitAt?: DateTimeNullableWithAggregatesFilter<"AnonymousSession"> | Date | string | null
    showedSignupPrompt?: BoolWithAggregatesFilter<"AnonymousSession"> | boolean
    signupPromptShownAt?: DateTimeNullableWithAggregatesFilter<"AnonymousSession"> | Date | string | null
    convertedToUser?: BoolWithAggregatesFilter<"AnonymousSession"> | boolean
    convertedUserId?: StringNullableWithAggregatesFilter<"AnonymousSession"> | string | null
    convertedAt?: DateTimeNullableWithAggregatesFilter<"AnonymousSession"> | Date | string | null
    referrerDomain?: StringNullableWithAggregatesFilter<"AnonymousSession"> | string | null
    countryCode?: StringNullableWithAggregatesFilter<"AnonymousSession"> | string | null
    cityName?: StringNullableWithAggregatesFilter<"AnonymousSession"> | string | null
    expiresAt?: DateTimeWithAggregatesFilter<"AnonymousSession"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"AnonymousSession"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AnonymousSession"> | Date | string
  }

  export type ConversionEventWhereInput = {
    AND?: ConversionEventWhereInput | ConversionEventWhereInput[]
    OR?: ConversionEventWhereInput[]
    NOT?: ConversionEventWhereInput | ConversionEventWhereInput[]
    id?: StringFilter<"ConversionEvent"> | string
    sessionId?: StringFilter<"ConversionEvent"> | string
    userId?: StringNullableFilter<"ConversionEvent"> | string | null
    eventType?: EnumConversionEventTypeFilter<"ConversionEvent"> | $Enums.ConversionEventType
    eventData?: JsonNullableFilter<"ConversionEvent">
    recipeUrl?: StringNullableFilter<"ConversionEvent"> | string | null
    pageUrl?: StringNullableFilter<"ConversionEvent"> | string | null
    sessionDuration?: IntNullableFilter<"ConversionEvent"> | number | null
    expiresAt?: DateTimeFilter<"ConversionEvent"> | Date | string
    createdAt?: DateTimeFilter<"ConversionEvent"> | Date | string
  }

  export type ConversionEventOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    userId?: SortOrderInput | SortOrder
    eventType?: SortOrder
    eventData?: SortOrderInput | SortOrder
    recipeUrl?: SortOrderInput | SortOrder
    pageUrl?: SortOrderInput | SortOrder
    sessionDuration?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ConversionEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConversionEventWhereInput | ConversionEventWhereInput[]
    OR?: ConversionEventWhereInput[]
    NOT?: ConversionEventWhereInput | ConversionEventWhereInput[]
    sessionId?: StringFilter<"ConversionEvent"> | string
    userId?: StringNullableFilter<"ConversionEvent"> | string | null
    eventType?: EnumConversionEventTypeFilter<"ConversionEvent"> | $Enums.ConversionEventType
    eventData?: JsonNullableFilter<"ConversionEvent">
    recipeUrl?: StringNullableFilter<"ConversionEvent"> | string | null
    pageUrl?: StringNullableFilter<"ConversionEvent"> | string | null
    sessionDuration?: IntNullableFilter<"ConversionEvent"> | number | null
    expiresAt?: DateTimeFilter<"ConversionEvent"> | Date | string
    createdAt?: DateTimeFilter<"ConversionEvent"> | Date | string
  }, "id">

  export type ConversionEventOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    userId?: SortOrderInput | SortOrder
    eventType?: SortOrder
    eventData?: SortOrderInput | SortOrder
    recipeUrl?: SortOrderInput | SortOrder
    pageUrl?: SortOrderInput | SortOrder
    sessionDuration?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: ConversionEventCountOrderByAggregateInput
    _avg?: ConversionEventAvgOrderByAggregateInput
    _max?: ConversionEventMaxOrderByAggregateInput
    _min?: ConversionEventMinOrderByAggregateInput
    _sum?: ConversionEventSumOrderByAggregateInput
  }

  export type ConversionEventScalarWhereWithAggregatesInput = {
    AND?: ConversionEventScalarWhereWithAggregatesInput | ConversionEventScalarWhereWithAggregatesInput[]
    OR?: ConversionEventScalarWhereWithAggregatesInput[]
    NOT?: ConversionEventScalarWhereWithAggregatesInput | ConversionEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ConversionEvent"> | string
    sessionId?: StringWithAggregatesFilter<"ConversionEvent"> | string
    userId?: StringNullableWithAggregatesFilter<"ConversionEvent"> | string | null
    eventType?: EnumConversionEventTypeWithAggregatesFilter<"ConversionEvent"> | $Enums.ConversionEventType
    eventData?: JsonNullableWithAggregatesFilter<"ConversionEvent">
    recipeUrl?: StringNullableWithAggregatesFilter<"ConversionEvent"> | string | null
    pageUrl?: StringNullableWithAggregatesFilter<"ConversionEvent"> | string | null
    sessionDuration?: IntNullableWithAggregatesFilter<"ConversionEvent"> | number | null
    expiresAt?: DateTimeWithAggregatesFilter<"ConversionEvent"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"ConversionEvent"> | Date | string
  }

  export type DailyRateLimitWhereInput = {
    AND?: DailyRateLimitWhereInput | DailyRateLimitWhereInput[]
    OR?: DailyRateLimitWhereInput[]
    NOT?: DailyRateLimitWhereInput | DailyRateLimitWhereInput[]
    id?: StringFilter<"DailyRateLimit"> | string
    identifier?: StringFilter<"DailyRateLimit"> | string
    identifierType?: StringFilter<"DailyRateLimit"> | string
    date?: DateTimeFilter<"DailyRateLimit"> | Date | string
    requestCount?: IntFilter<"DailyRateLimit"> | number
    lastRequestAt?: DateTimeNullableFilter<"DailyRateLimit"> | Date | string | null
    ipAddress?: StringNullableFilter<"DailyRateLimit"> | string | null
    createdAt?: DateTimeFilter<"DailyRateLimit"> | Date | string
    updatedAt?: DateTimeFilter<"DailyRateLimit"> | Date | string
  }

  export type DailyRateLimitOrderByWithRelationInput = {
    id?: SortOrder
    identifier?: SortOrder
    identifierType?: SortOrder
    date?: SortOrder
    requestCount?: SortOrder
    lastRequestAt?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyRateLimitWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    identifier_identifierType_date?: DailyRateLimitIdentifierIdentifierTypeDateCompoundUniqueInput
    AND?: DailyRateLimitWhereInput | DailyRateLimitWhereInput[]
    OR?: DailyRateLimitWhereInput[]
    NOT?: DailyRateLimitWhereInput | DailyRateLimitWhereInput[]
    identifier?: StringFilter<"DailyRateLimit"> | string
    identifierType?: StringFilter<"DailyRateLimit"> | string
    date?: DateTimeFilter<"DailyRateLimit"> | Date | string
    requestCount?: IntFilter<"DailyRateLimit"> | number
    lastRequestAt?: DateTimeNullableFilter<"DailyRateLimit"> | Date | string | null
    ipAddress?: StringNullableFilter<"DailyRateLimit"> | string | null
    createdAt?: DateTimeFilter<"DailyRateLimit"> | Date | string
    updatedAt?: DateTimeFilter<"DailyRateLimit"> | Date | string
  }, "id" | "identifier_identifierType_date">

  export type DailyRateLimitOrderByWithAggregationInput = {
    id?: SortOrder
    identifier?: SortOrder
    identifierType?: SortOrder
    date?: SortOrder
    requestCount?: SortOrder
    lastRequestAt?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DailyRateLimitCountOrderByAggregateInput
    _avg?: DailyRateLimitAvgOrderByAggregateInput
    _max?: DailyRateLimitMaxOrderByAggregateInput
    _min?: DailyRateLimitMinOrderByAggregateInput
    _sum?: DailyRateLimitSumOrderByAggregateInput
  }

  export type DailyRateLimitScalarWhereWithAggregatesInput = {
    AND?: DailyRateLimitScalarWhereWithAggregatesInput | DailyRateLimitScalarWhereWithAggregatesInput[]
    OR?: DailyRateLimitScalarWhereWithAggregatesInput[]
    NOT?: DailyRateLimitScalarWhereWithAggregatesInput | DailyRateLimitScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DailyRateLimit"> | string
    identifier?: StringWithAggregatesFilter<"DailyRateLimit"> | string
    identifierType?: StringWithAggregatesFilter<"DailyRateLimit"> | string
    date?: DateTimeWithAggregatesFilter<"DailyRateLimit"> | Date | string
    requestCount?: IntWithAggregatesFilter<"DailyRateLimit"> | number
    lastRequestAt?: DateTimeNullableWithAggregatesFilter<"DailyRateLimit"> | Date | string | null
    ipAddress?: StringNullableWithAggregatesFilter<"DailyRateLimit"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DailyRateLimit"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DailyRateLimit"> | Date | string
  }

  export type InternalRecipeDataWhereInput = {
    AND?: InternalRecipeDataWhereInput | InternalRecipeDataWhereInput[]
    OR?: InternalRecipeDataWhereInput[]
    NOT?: InternalRecipeDataWhereInput | InternalRecipeDataWhereInput[]
    id?: StringFilter<"InternalRecipeData"> | string
    title?: StringFilter<"InternalRecipeData"> | string
    sourceUrl?: StringFilter<"InternalRecipeData"> | string
    domain?: StringFilter<"InternalRecipeData"> | string
    extractedAt?: DateTimeFilter<"InternalRecipeData"> | Date | string
    createdAt?: DateTimeFilter<"InternalRecipeData"> | Date | string
    extractionStrategy?: EnumExtractionStrategyFilter<"InternalRecipeData"> | $Enums.ExtractionStrategy
    aiProvider?: EnumAIProviderFilter<"InternalRecipeData"> | $Enums.AIProvider
    totalProcessingTimeMs?: IntFilter<"InternalRecipeData"> | number
    fetchTimeMs?: IntNullableFilter<"InternalRecipeData"> | number | null
    parseTimeMs?: IntNullableFilter<"InternalRecipeData"> | number | null
    aiTimeMs?: IntNullableFilter<"InternalRecipeData"> | number | null
  }

  export type InternalRecipeDataOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    sourceUrl?: SortOrder
    domain?: SortOrder
    extractedAt?: SortOrder
    createdAt?: SortOrder
    extractionStrategy?: SortOrder
    aiProvider?: SortOrder
    totalProcessingTimeMs?: SortOrder
    fetchTimeMs?: SortOrderInput | SortOrder
    parseTimeMs?: SortOrderInput | SortOrder
    aiTimeMs?: SortOrderInput | SortOrder
  }

  export type InternalRecipeDataWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InternalRecipeDataWhereInput | InternalRecipeDataWhereInput[]
    OR?: InternalRecipeDataWhereInput[]
    NOT?: InternalRecipeDataWhereInput | InternalRecipeDataWhereInput[]
    title?: StringFilter<"InternalRecipeData"> | string
    sourceUrl?: StringFilter<"InternalRecipeData"> | string
    domain?: StringFilter<"InternalRecipeData"> | string
    extractedAt?: DateTimeFilter<"InternalRecipeData"> | Date | string
    createdAt?: DateTimeFilter<"InternalRecipeData"> | Date | string
    extractionStrategy?: EnumExtractionStrategyFilter<"InternalRecipeData"> | $Enums.ExtractionStrategy
    aiProvider?: EnumAIProviderFilter<"InternalRecipeData"> | $Enums.AIProvider
    totalProcessingTimeMs?: IntFilter<"InternalRecipeData"> | number
    fetchTimeMs?: IntNullableFilter<"InternalRecipeData"> | number | null
    parseTimeMs?: IntNullableFilter<"InternalRecipeData"> | number | null
    aiTimeMs?: IntNullableFilter<"InternalRecipeData"> | number | null
  }, "id">

  export type InternalRecipeDataOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    sourceUrl?: SortOrder
    domain?: SortOrder
    extractedAt?: SortOrder
    createdAt?: SortOrder
    extractionStrategy?: SortOrder
    aiProvider?: SortOrder
    totalProcessingTimeMs?: SortOrder
    fetchTimeMs?: SortOrderInput | SortOrder
    parseTimeMs?: SortOrderInput | SortOrder
    aiTimeMs?: SortOrderInput | SortOrder
    _count?: InternalRecipeDataCountOrderByAggregateInput
    _avg?: InternalRecipeDataAvgOrderByAggregateInput
    _max?: InternalRecipeDataMaxOrderByAggregateInput
    _min?: InternalRecipeDataMinOrderByAggregateInput
    _sum?: InternalRecipeDataSumOrderByAggregateInput
  }

  export type InternalRecipeDataScalarWhereWithAggregatesInput = {
    AND?: InternalRecipeDataScalarWhereWithAggregatesInput | InternalRecipeDataScalarWhereWithAggregatesInput[]
    OR?: InternalRecipeDataScalarWhereWithAggregatesInput[]
    NOT?: InternalRecipeDataScalarWhereWithAggregatesInput | InternalRecipeDataScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"InternalRecipeData"> | string
    title?: StringWithAggregatesFilter<"InternalRecipeData"> | string
    sourceUrl?: StringWithAggregatesFilter<"InternalRecipeData"> | string
    domain?: StringWithAggregatesFilter<"InternalRecipeData"> | string
    extractedAt?: DateTimeWithAggregatesFilter<"InternalRecipeData"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"InternalRecipeData"> | Date | string
    extractionStrategy?: EnumExtractionStrategyWithAggregatesFilter<"InternalRecipeData"> | $Enums.ExtractionStrategy
    aiProvider?: EnumAIProviderWithAggregatesFilter<"InternalRecipeData"> | $Enums.AIProvider
    totalProcessingTimeMs?: IntWithAggregatesFilter<"InternalRecipeData"> | number
    fetchTimeMs?: IntNullableWithAggregatesFilter<"InternalRecipeData"> | number | null
    parseTimeMs?: IntNullableWithAggregatesFilter<"InternalRecipeData"> | number | null
    aiTimeMs?: IntNullableWithAggregatesFilter<"InternalRecipeData"> | number | null
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
    onboardingProgress?: UserOnboardingProgressCreateNestedManyWithoutUserInput
    extractionMetrics?: RecipeExtractionMetricsCreateNestedManyWithoutUserInput
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
    onboardingProgress?: UserOnboardingProgressUncheckedCreateNestedManyWithoutUserInput
    extractionMetrics?: RecipeExtractionMetricsUncheckedCreateNestedManyWithoutUserInput
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
    onboardingProgress?: UserOnboardingProgressUpdateManyWithoutUserNestedInput
    extractionMetrics?: RecipeExtractionMetricsUpdateManyWithoutUserNestedInput
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
    onboardingProgress?: UserOnboardingProgressUncheckedUpdateManyWithoutUserNestedInput
    extractionMetrics?: RecipeExtractionMetricsUncheckedUpdateManyWithoutUserNestedInput
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
    extractionMetrics?: RecipeExtractionMetricsCreateNestedManyWithoutRecipeInput
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
    extractionMetrics?: RecipeExtractionMetricsUncheckedCreateNestedManyWithoutRecipeInput
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
    extractionMetrics?: RecipeExtractionMetricsUpdateManyWithoutRecipeNestedInput
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
    extractionMetrics?: RecipeExtractionMetricsUncheckedUpdateManyWithoutRecipeNestedInput
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

  export type UserOnboardingProgressCreateInput = {
    id?: string
    stepId: number
    stepKey: string
    completedAt?: Date | string | null
    skippedAt?: Date | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    isRequired?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutOnboardingProgressInput
  }

  export type UserOnboardingProgressUncheckedCreateInput = {
    id?: string
    userId: string
    stepId: number
    stepKey: string
    completedAt?: Date | string | null
    skippedAt?: Date | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    isRequired?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserOnboardingProgressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepId?: IntFieldUpdateOperationsInput | number
    stepKey?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    skippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    isRequired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOnboardingProgressNestedInput
  }

  export type UserOnboardingProgressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    stepId?: IntFieldUpdateOperationsInput | number
    stepKey?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    skippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    isRequired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserOnboardingProgressCreateManyInput = {
    id?: string
    userId: string
    stepId: number
    stepKey: string
    completedAt?: Date | string | null
    skippedAt?: Date | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    isRequired?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserOnboardingProgressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepId?: IntFieldUpdateOperationsInput | number
    stepKey?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    skippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    isRequired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserOnboardingProgressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    stepId?: IntFieldUpdateOperationsInput | number
    stepKey?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    skippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    isRequired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeExtractionMetricsCreateInput = {
    id?: string
    sessionId?: string | null
    recipeUrl: string
    domain: string
    requestTimestamp?: Date | string
    primaryStrategy: $Enums.ExtractionStrategy
    aiProvider: $Enums.AIProvider
    fallbackUsed?: boolean
    fallbackReason?: string | null
    totalDuration: number
    htmlFetchDuration?: number | null
    aiProcessingDuration: number
    validationDuration?: number | null
    databaseSaveDuration?: number | null
    htmlContentSize?: number | null
    cleanedContentSize?: number | null
    promptTokens?: number | null
    responseTokens?: number | null
    totalTokens?: number | null
    extractionSuccess: boolean
    validationErrors?: NullableJsonNullValueInput | InputJsonValue
    missingFields?: RecipeExtractionMetricsCreatemissingFieldsInput | string[]
    completenessScore?: number | null
    categoryConfidence?: number | null
    hasStructuredData?: boolean | null
    estimatedCost?: number | null
    wasOptimal?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutExtractionMetricsInput
    recipe?: RecipeCreateNestedOneWithoutExtractionMetricsInput
  }

  export type RecipeExtractionMetricsUncheckedCreateInput = {
    id?: string
    userId?: string | null
    sessionId?: string | null
    recipeUrl: string
    domain: string
    requestTimestamp?: Date | string
    primaryStrategy: $Enums.ExtractionStrategy
    aiProvider: $Enums.AIProvider
    fallbackUsed?: boolean
    fallbackReason?: string | null
    totalDuration: number
    htmlFetchDuration?: number | null
    aiProcessingDuration: number
    validationDuration?: number | null
    databaseSaveDuration?: number | null
    htmlContentSize?: number | null
    cleanedContentSize?: number | null
    promptTokens?: number | null
    responseTokens?: number | null
    totalTokens?: number | null
    extractionSuccess: boolean
    validationErrors?: NullableJsonNullValueInput | InputJsonValue
    missingFields?: RecipeExtractionMetricsCreatemissingFieldsInput | string[]
    completenessScore?: number | null
    categoryConfidence?: number | null
    hasStructuredData?: boolean | null
    estimatedCost?: number | null
    recipeId?: string | null
    wasOptimal?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecipeExtractionMetricsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    recipeUrl?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    requestTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    primaryStrategy?: EnumExtractionStrategyFieldUpdateOperationsInput | $Enums.ExtractionStrategy
    aiProvider?: EnumAIProviderFieldUpdateOperationsInput | $Enums.AIProvider
    fallbackUsed?: BoolFieldUpdateOperationsInput | boolean
    fallbackReason?: NullableStringFieldUpdateOperationsInput | string | null
    totalDuration?: IntFieldUpdateOperationsInput | number
    htmlFetchDuration?: NullableIntFieldUpdateOperationsInput | number | null
    aiProcessingDuration?: IntFieldUpdateOperationsInput | number
    validationDuration?: NullableIntFieldUpdateOperationsInput | number | null
    databaseSaveDuration?: NullableIntFieldUpdateOperationsInput | number | null
    htmlContentSize?: NullableIntFieldUpdateOperationsInput | number | null
    cleanedContentSize?: NullableIntFieldUpdateOperationsInput | number | null
    promptTokens?: NullableIntFieldUpdateOperationsInput | number | null
    responseTokens?: NullableIntFieldUpdateOperationsInput | number | null
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null
    extractionSuccess?: BoolFieldUpdateOperationsInput | boolean
    validationErrors?: NullableJsonNullValueInput | InputJsonValue
    missingFields?: RecipeExtractionMetricsUpdatemissingFieldsInput | string[]
    completenessScore?: NullableFloatFieldUpdateOperationsInput | number | null
    categoryConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    hasStructuredData?: NullableBoolFieldUpdateOperationsInput | boolean | null
    estimatedCost?: NullableFloatFieldUpdateOperationsInput | number | null
    wasOptimal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutExtractionMetricsNestedInput
    recipe?: RecipeUpdateOneWithoutExtractionMetricsNestedInput
  }

  export type RecipeExtractionMetricsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    recipeUrl?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    requestTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    primaryStrategy?: EnumExtractionStrategyFieldUpdateOperationsInput | $Enums.ExtractionStrategy
    aiProvider?: EnumAIProviderFieldUpdateOperationsInput | $Enums.AIProvider
    fallbackUsed?: BoolFieldUpdateOperationsInput | boolean
    fallbackReason?: NullableStringFieldUpdateOperationsInput | string | null
    totalDuration?: IntFieldUpdateOperationsInput | number
    htmlFetchDuration?: NullableIntFieldUpdateOperationsInput | number | null
    aiProcessingDuration?: IntFieldUpdateOperationsInput | number
    validationDuration?: NullableIntFieldUpdateOperationsInput | number | null
    databaseSaveDuration?: NullableIntFieldUpdateOperationsInput | number | null
    htmlContentSize?: NullableIntFieldUpdateOperationsInput | number | null
    cleanedContentSize?: NullableIntFieldUpdateOperationsInput | number | null
    promptTokens?: NullableIntFieldUpdateOperationsInput | number | null
    responseTokens?: NullableIntFieldUpdateOperationsInput | number | null
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null
    extractionSuccess?: BoolFieldUpdateOperationsInput | boolean
    validationErrors?: NullableJsonNullValueInput | InputJsonValue
    missingFields?: RecipeExtractionMetricsUpdatemissingFieldsInput | string[]
    completenessScore?: NullableFloatFieldUpdateOperationsInput | number | null
    categoryConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    hasStructuredData?: NullableBoolFieldUpdateOperationsInput | boolean | null
    estimatedCost?: NullableFloatFieldUpdateOperationsInput | number | null
    recipeId?: NullableStringFieldUpdateOperationsInput | string | null
    wasOptimal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeExtractionMetricsCreateManyInput = {
    id?: string
    userId?: string | null
    sessionId?: string | null
    recipeUrl: string
    domain: string
    requestTimestamp?: Date | string
    primaryStrategy: $Enums.ExtractionStrategy
    aiProvider: $Enums.AIProvider
    fallbackUsed?: boolean
    fallbackReason?: string | null
    totalDuration: number
    htmlFetchDuration?: number | null
    aiProcessingDuration: number
    validationDuration?: number | null
    databaseSaveDuration?: number | null
    htmlContentSize?: number | null
    cleanedContentSize?: number | null
    promptTokens?: number | null
    responseTokens?: number | null
    totalTokens?: number | null
    extractionSuccess: boolean
    validationErrors?: NullableJsonNullValueInput | InputJsonValue
    missingFields?: RecipeExtractionMetricsCreatemissingFieldsInput | string[]
    completenessScore?: number | null
    categoryConfidence?: number | null
    hasStructuredData?: boolean | null
    estimatedCost?: number | null
    recipeId?: string | null
    wasOptimal?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecipeExtractionMetricsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    recipeUrl?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    requestTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    primaryStrategy?: EnumExtractionStrategyFieldUpdateOperationsInput | $Enums.ExtractionStrategy
    aiProvider?: EnumAIProviderFieldUpdateOperationsInput | $Enums.AIProvider
    fallbackUsed?: BoolFieldUpdateOperationsInput | boolean
    fallbackReason?: NullableStringFieldUpdateOperationsInput | string | null
    totalDuration?: IntFieldUpdateOperationsInput | number
    htmlFetchDuration?: NullableIntFieldUpdateOperationsInput | number | null
    aiProcessingDuration?: IntFieldUpdateOperationsInput | number
    validationDuration?: NullableIntFieldUpdateOperationsInput | number | null
    databaseSaveDuration?: NullableIntFieldUpdateOperationsInput | number | null
    htmlContentSize?: NullableIntFieldUpdateOperationsInput | number | null
    cleanedContentSize?: NullableIntFieldUpdateOperationsInput | number | null
    promptTokens?: NullableIntFieldUpdateOperationsInput | number | null
    responseTokens?: NullableIntFieldUpdateOperationsInput | number | null
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null
    extractionSuccess?: BoolFieldUpdateOperationsInput | boolean
    validationErrors?: NullableJsonNullValueInput | InputJsonValue
    missingFields?: RecipeExtractionMetricsUpdatemissingFieldsInput | string[]
    completenessScore?: NullableFloatFieldUpdateOperationsInput | number | null
    categoryConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    hasStructuredData?: NullableBoolFieldUpdateOperationsInput | boolean | null
    estimatedCost?: NullableFloatFieldUpdateOperationsInput | number | null
    wasOptimal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeExtractionMetricsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    recipeUrl?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    requestTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    primaryStrategy?: EnumExtractionStrategyFieldUpdateOperationsInput | $Enums.ExtractionStrategy
    aiProvider?: EnumAIProviderFieldUpdateOperationsInput | $Enums.AIProvider
    fallbackUsed?: BoolFieldUpdateOperationsInput | boolean
    fallbackReason?: NullableStringFieldUpdateOperationsInput | string | null
    totalDuration?: IntFieldUpdateOperationsInput | number
    htmlFetchDuration?: NullableIntFieldUpdateOperationsInput | number | null
    aiProcessingDuration?: IntFieldUpdateOperationsInput | number
    validationDuration?: NullableIntFieldUpdateOperationsInput | number | null
    databaseSaveDuration?: NullableIntFieldUpdateOperationsInput | number | null
    htmlContentSize?: NullableIntFieldUpdateOperationsInput | number | null
    cleanedContentSize?: NullableIntFieldUpdateOperationsInput | number | null
    promptTokens?: NullableIntFieldUpdateOperationsInput | number | null
    responseTokens?: NullableIntFieldUpdateOperationsInput | number | null
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null
    extractionSuccess?: BoolFieldUpdateOperationsInput | boolean
    validationErrors?: NullableJsonNullValueInput | InputJsonValue
    missingFields?: RecipeExtractionMetricsUpdatemissingFieldsInput | string[]
    completenessScore?: NullableFloatFieldUpdateOperationsInput | number | null
    categoryConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    hasStructuredData?: NullableBoolFieldUpdateOperationsInput | boolean | null
    estimatedCost?: NullableFloatFieldUpdateOperationsInput | number | null
    recipeId?: NullableStringFieldUpdateOperationsInput | string | null
    wasOptimal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DomainPerformanceMetricsCreateInput = {
    id?: string
    domain: string
    totalExtractions?: number
    successfulExtractions?: number
    averageExtractTime?: number | null
    averageTokens?: number | null
    averageCost?: number | null
    optimalStrategy?: $Enums.ExtractionStrategy | null
    optimalProvider?: $Enums.AIProvider | null
    averageCompleteness?: number | null
    hasStructuredDataPct?: number | null
    lastUpdated?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DomainPerformanceMetricsUncheckedCreateInput = {
    id?: string
    domain: string
    totalExtractions?: number
    successfulExtractions?: number
    averageExtractTime?: number | null
    averageTokens?: number | null
    averageCost?: number | null
    optimalStrategy?: $Enums.ExtractionStrategy | null
    optimalProvider?: $Enums.AIProvider | null
    averageCompleteness?: number | null
    hasStructuredDataPct?: number | null
    lastUpdated?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DomainPerformanceMetricsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    totalExtractions?: IntFieldUpdateOperationsInput | number
    successfulExtractions?: IntFieldUpdateOperationsInput | number
    averageExtractTime?: NullableIntFieldUpdateOperationsInput | number | null
    averageTokens?: NullableIntFieldUpdateOperationsInput | number | null
    averageCost?: NullableFloatFieldUpdateOperationsInput | number | null
    optimalStrategy?: NullableEnumExtractionStrategyFieldUpdateOperationsInput | $Enums.ExtractionStrategy | null
    optimalProvider?: NullableEnumAIProviderFieldUpdateOperationsInput | $Enums.AIProvider | null
    averageCompleteness?: NullableFloatFieldUpdateOperationsInput | number | null
    hasStructuredDataPct?: NullableFloatFieldUpdateOperationsInput | number | null
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DomainPerformanceMetricsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    totalExtractions?: IntFieldUpdateOperationsInput | number
    successfulExtractions?: IntFieldUpdateOperationsInput | number
    averageExtractTime?: NullableIntFieldUpdateOperationsInput | number | null
    averageTokens?: NullableIntFieldUpdateOperationsInput | number | null
    averageCost?: NullableFloatFieldUpdateOperationsInput | number | null
    optimalStrategy?: NullableEnumExtractionStrategyFieldUpdateOperationsInput | $Enums.ExtractionStrategy | null
    optimalProvider?: NullableEnumAIProviderFieldUpdateOperationsInput | $Enums.AIProvider | null
    averageCompleteness?: NullableFloatFieldUpdateOperationsInput | number | null
    hasStructuredDataPct?: NullableFloatFieldUpdateOperationsInput | number | null
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DomainPerformanceMetricsCreateManyInput = {
    id?: string
    domain: string
    totalExtractions?: number
    successfulExtractions?: number
    averageExtractTime?: number | null
    averageTokens?: number | null
    averageCost?: number | null
    optimalStrategy?: $Enums.ExtractionStrategy | null
    optimalProvider?: $Enums.AIProvider | null
    averageCompleteness?: number | null
    hasStructuredDataPct?: number | null
    lastUpdated?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DomainPerformanceMetricsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    totalExtractions?: IntFieldUpdateOperationsInput | number
    successfulExtractions?: IntFieldUpdateOperationsInput | number
    averageExtractTime?: NullableIntFieldUpdateOperationsInput | number | null
    averageTokens?: NullableIntFieldUpdateOperationsInput | number | null
    averageCost?: NullableFloatFieldUpdateOperationsInput | number | null
    optimalStrategy?: NullableEnumExtractionStrategyFieldUpdateOperationsInput | $Enums.ExtractionStrategy | null
    optimalProvider?: NullableEnumAIProviderFieldUpdateOperationsInput | $Enums.AIProvider | null
    averageCompleteness?: NullableFloatFieldUpdateOperationsInput | number | null
    hasStructuredDataPct?: NullableFloatFieldUpdateOperationsInput | number | null
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DomainPerformanceMetricsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    totalExtractions?: IntFieldUpdateOperationsInput | number
    successfulExtractions?: IntFieldUpdateOperationsInput | number
    averageExtractTime?: NullableIntFieldUpdateOperationsInput | number | null
    averageTokens?: NullableIntFieldUpdateOperationsInput | number | null
    averageCost?: NullableFloatFieldUpdateOperationsInput | number | null
    optimalStrategy?: NullableEnumExtractionStrategyFieldUpdateOperationsInput | $Enums.ExtractionStrategy | null
    optimalProvider?: NullableEnumAIProviderFieldUpdateOperationsInput | $Enums.AIProvider | null
    averageCompleteness?: NullableFloatFieldUpdateOperationsInput | number | null
    hasStructuredDataPct?: NullableFloatFieldUpdateOperationsInput | number | null
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIProviderCostsCreateInput = {
    id?: string
    provider: string
    model: string
    inputTokenCost: number
    outputTokenCost: number
    effectiveDate: Date | string
    createdAt?: Date | string
  }

  export type AIProviderCostsUncheckedCreateInput = {
    id?: string
    provider: string
    model: string
    inputTokenCost: number
    outputTokenCost: number
    effectiveDate: Date | string
    createdAt?: Date | string
  }

  export type AIProviderCostsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    inputTokenCost?: FloatFieldUpdateOperationsInput | number
    outputTokenCost?: FloatFieldUpdateOperationsInput | number
    effectiveDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIProviderCostsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    inputTokenCost?: FloatFieldUpdateOperationsInput | number
    outputTokenCost?: FloatFieldUpdateOperationsInput | number
    effectiveDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIProviderCostsCreateManyInput = {
    id?: string
    provider: string
    model: string
    inputTokenCost: number
    outputTokenCost: number
    effectiveDate: Date | string
    createdAt?: Date | string
  }

  export type AIProviderCostsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    inputTokenCost?: FloatFieldUpdateOperationsInput | number
    outputTokenCost?: FloatFieldUpdateOperationsInput | number
    effectiveDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIProviderCostsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    inputTokenCost?: FloatFieldUpdateOperationsInput | number
    outputTokenCost?: FloatFieldUpdateOperationsInput | number
    effectiveDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnonymousSessionCreateInput = {
    id?: string
    sessionId: string
    ipAddress: string
    userAgent: string
    deviceType?: string | null
    operatingSystem?: string | null
    browser?: string | null
    screenResolution?: string | null
    timezone?: string | null
    language?: string | null
    firstSeenAt?: Date | string
    lastSeenAt?: Date | string
    totalRecipeAttempts?: number
    totalSuccessfulExtractions?: number
    hitRateLimit?: boolean
    rateLimitHitAt?: Date | string | null
    showedSignupPrompt?: boolean
    signupPromptShownAt?: Date | string | null
    convertedToUser?: boolean
    convertedUserId?: string | null
    convertedAt?: Date | string | null
    referrerDomain?: string | null
    countryCode?: string | null
    cityName?: string | null
    expiresAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnonymousSessionUncheckedCreateInput = {
    id?: string
    sessionId: string
    ipAddress: string
    userAgent: string
    deviceType?: string | null
    operatingSystem?: string | null
    browser?: string | null
    screenResolution?: string | null
    timezone?: string | null
    language?: string | null
    firstSeenAt?: Date | string
    lastSeenAt?: Date | string
    totalRecipeAttempts?: number
    totalSuccessfulExtractions?: number
    hitRateLimit?: boolean
    rateLimitHitAt?: Date | string | null
    showedSignupPrompt?: boolean
    signupPromptShownAt?: Date | string | null
    convertedToUser?: boolean
    convertedUserId?: string | null
    convertedAt?: Date | string | null
    referrerDomain?: string | null
    countryCode?: string | null
    cityName?: string | null
    expiresAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnonymousSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    userAgent?: StringFieldUpdateOperationsInput | string
    deviceType?: NullableStringFieldUpdateOperationsInput | string | null
    operatingSystem?: NullableStringFieldUpdateOperationsInput | string | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    screenResolution?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    firstSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalRecipeAttempts?: IntFieldUpdateOperationsInput | number
    totalSuccessfulExtractions?: IntFieldUpdateOperationsInput | number
    hitRateLimit?: BoolFieldUpdateOperationsInput | boolean
    rateLimitHitAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    showedSignupPrompt?: BoolFieldUpdateOperationsInput | boolean
    signupPromptShownAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    convertedToUser?: BoolFieldUpdateOperationsInput | boolean
    convertedUserId?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    referrerDomain?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    cityName?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnonymousSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    userAgent?: StringFieldUpdateOperationsInput | string
    deviceType?: NullableStringFieldUpdateOperationsInput | string | null
    operatingSystem?: NullableStringFieldUpdateOperationsInput | string | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    screenResolution?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    firstSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalRecipeAttempts?: IntFieldUpdateOperationsInput | number
    totalSuccessfulExtractions?: IntFieldUpdateOperationsInput | number
    hitRateLimit?: BoolFieldUpdateOperationsInput | boolean
    rateLimitHitAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    showedSignupPrompt?: BoolFieldUpdateOperationsInput | boolean
    signupPromptShownAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    convertedToUser?: BoolFieldUpdateOperationsInput | boolean
    convertedUserId?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    referrerDomain?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    cityName?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnonymousSessionCreateManyInput = {
    id?: string
    sessionId: string
    ipAddress: string
    userAgent: string
    deviceType?: string | null
    operatingSystem?: string | null
    browser?: string | null
    screenResolution?: string | null
    timezone?: string | null
    language?: string | null
    firstSeenAt?: Date | string
    lastSeenAt?: Date | string
    totalRecipeAttempts?: number
    totalSuccessfulExtractions?: number
    hitRateLimit?: boolean
    rateLimitHitAt?: Date | string | null
    showedSignupPrompt?: boolean
    signupPromptShownAt?: Date | string | null
    convertedToUser?: boolean
    convertedUserId?: string | null
    convertedAt?: Date | string | null
    referrerDomain?: string | null
    countryCode?: string | null
    cityName?: string | null
    expiresAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnonymousSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    userAgent?: StringFieldUpdateOperationsInput | string
    deviceType?: NullableStringFieldUpdateOperationsInput | string | null
    operatingSystem?: NullableStringFieldUpdateOperationsInput | string | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    screenResolution?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    firstSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalRecipeAttempts?: IntFieldUpdateOperationsInput | number
    totalSuccessfulExtractions?: IntFieldUpdateOperationsInput | number
    hitRateLimit?: BoolFieldUpdateOperationsInput | boolean
    rateLimitHitAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    showedSignupPrompt?: BoolFieldUpdateOperationsInput | boolean
    signupPromptShownAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    convertedToUser?: BoolFieldUpdateOperationsInput | boolean
    convertedUserId?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    referrerDomain?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    cityName?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnonymousSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    userAgent?: StringFieldUpdateOperationsInput | string
    deviceType?: NullableStringFieldUpdateOperationsInput | string | null
    operatingSystem?: NullableStringFieldUpdateOperationsInput | string | null
    browser?: NullableStringFieldUpdateOperationsInput | string | null
    screenResolution?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    firstSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalRecipeAttempts?: IntFieldUpdateOperationsInput | number
    totalSuccessfulExtractions?: IntFieldUpdateOperationsInput | number
    hitRateLimit?: BoolFieldUpdateOperationsInput | boolean
    rateLimitHitAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    showedSignupPrompt?: BoolFieldUpdateOperationsInput | boolean
    signupPromptShownAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    convertedToUser?: BoolFieldUpdateOperationsInput | boolean
    convertedUserId?: NullableStringFieldUpdateOperationsInput | string | null
    convertedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    referrerDomain?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    cityName?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversionEventCreateInput = {
    id?: string
    sessionId: string
    userId?: string | null
    eventType: $Enums.ConversionEventType
    eventData?: NullableJsonNullValueInput | InputJsonValue
    recipeUrl?: string | null
    pageUrl?: string | null
    sessionDuration?: number | null
    expiresAt?: Date | string
    createdAt?: Date | string
  }

  export type ConversionEventUncheckedCreateInput = {
    id?: string
    sessionId: string
    userId?: string | null
    eventType: $Enums.ConversionEventType
    eventData?: NullableJsonNullValueInput | InputJsonValue
    recipeUrl?: string | null
    pageUrl?: string | null
    sessionDuration?: number | null
    expiresAt?: Date | string
    createdAt?: Date | string
  }

  export type ConversionEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: EnumConversionEventTypeFieldUpdateOperationsInput | $Enums.ConversionEventType
    eventData?: NullableJsonNullValueInput | InputJsonValue
    recipeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sessionDuration?: NullableIntFieldUpdateOperationsInput | number | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversionEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: EnumConversionEventTypeFieldUpdateOperationsInput | $Enums.ConversionEventType
    eventData?: NullableJsonNullValueInput | InputJsonValue
    recipeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sessionDuration?: NullableIntFieldUpdateOperationsInput | number | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversionEventCreateManyInput = {
    id?: string
    sessionId: string
    userId?: string | null
    eventType: $Enums.ConversionEventType
    eventData?: NullableJsonNullValueInput | InputJsonValue
    recipeUrl?: string | null
    pageUrl?: string | null
    sessionDuration?: number | null
    expiresAt?: Date | string
    createdAt?: Date | string
  }

  export type ConversionEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: EnumConversionEventTypeFieldUpdateOperationsInput | $Enums.ConversionEventType
    eventData?: NullableJsonNullValueInput | InputJsonValue
    recipeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sessionDuration?: NullableIntFieldUpdateOperationsInput | number | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversionEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: EnumConversionEventTypeFieldUpdateOperationsInput | $Enums.ConversionEventType
    eventData?: NullableJsonNullValueInput | InputJsonValue
    recipeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    pageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sessionDuration?: NullableIntFieldUpdateOperationsInput | number | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyRateLimitCreateInput = {
    id?: string
    identifier: string
    identifierType: string
    date: Date | string
    requestCount?: number
    lastRequestAt?: Date | string | null
    ipAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyRateLimitUncheckedCreateInput = {
    id?: string
    identifier: string
    identifierType: string
    date: Date | string
    requestCount?: number
    lastRequestAt?: Date | string | null
    ipAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyRateLimitUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    identifierType?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    requestCount?: IntFieldUpdateOperationsInput | number
    lastRequestAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyRateLimitUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    identifierType?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    requestCount?: IntFieldUpdateOperationsInput | number
    lastRequestAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyRateLimitCreateManyInput = {
    id?: string
    identifier: string
    identifierType: string
    date: Date | string
    requestCount?: number
    lastRequestAt?: Date | string | null
    ipAddress?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyRateLimitUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    identifierType?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    requestCount?: IntFieldUpdateOperationsInput | number
    lastRequestAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyRateLimitUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    identifierType?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    requestCount?: IntFieldUpdateOperationsInput | number
    lastRequestAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InternalRecipeDataCreateInput = {
    id?: string
    title: string
    sourceUrl: string
    domain: string
    extractedAt?: Date | string
    createdAt?: Date | string
    extractionStrategy: $Enums.ExtractionStrategy
    aiProvider: $Enums.AIProvider
    totalProcessingTimeMs: number
    fetchTimeMs?: number | null
    parseTimeMs?: number | null
    aiTimeMs?: number | null
  }

  export type InternalRecipeDataUncheckedCreateInput = {
    id?: string
    title: string
    sourceUrl: string
    domain: string
    extractedAt?: Date | string
    createdAt?: Date | string
    extractionStrategy: $Enums.ExtractionStrategy
    aiProvider: $Enums.AIProvider
    totalProcessingTimeMs: number
    fetchTimeMs?: number | null
    parseTimeMs?: number | null
    aiTimeMs?: number | null
  }

  export type InternalRecipeDataUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    sourceUrl?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    extractedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    extractionStrategy?: EnumExtractionStrategyFieldUpdateOperationsInput | $Enums.ExtractionStrategy
    aiProvider?: EnumAIProviderFieldUpdateOperationsInput | $Enums.AIProvider
    totalProcessingTimeMs?: IntFieldUpdateOperationsInput | number
    fetchTimeMs?: NullableIntFieldUpdateOperationsInput | number | null
    parseTimeMs?: NullableIntFieldUpdateOperationsInput | number | null
    aiTimeMs?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type InternalRecipeDataUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    sourceUrl?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    extractedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    extractionStrategy?: EnumExtractionStrategyFieldUpdateOperationsInput | $Enums.ExtractionStrategy
    aiProvider?: EnumAIProviderFieldUpdateOperationsInput | $Enums.AIProvider
    totalProcessingTimeMs?: IntFieldUpdateOperationsInput | number
    fetchTimeMs?: NullableIntFieldUpdateOperationsInput | number | null
    parseTimeMs?: NullableIntFieldUpdateOperationsInput | number | null
    aiTimeMs?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type InternalRecipeDataCreateManyInput = {
    id?: string
    title: string
    sourceUrl: string
    domain: string
    extractedAt?: Date | string
    createdAt?: Date | string
    extractionStrategy: $Enums.ExtractionStrategy
    aiProvider: $Enums.AIProvider
    totalProcessingTimeMs: number
    fetchTimeMs?: number | null
    parseTimeMs?: number | null
    aiTimeMs?: number | null
  }

  export type InternalRecipeDataUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    sourceUrl?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    extractedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    extractionStrategy?: EnumExtractionStrategyFieldUpdateOperationsInput | $Enums.ExtractionStrategy
    aiProvider?: EnumAIProviderFieldUpdateOperationsInput | $Enums.AIProvider
    totalProcessingTimeMs?: IntFieldUpdateOperationsInput | number
    fetchTimeMs?: NullableIntFieldUpdateOperationsInput | number | null
    parseTimeMs?: NullableIntFieldUpdateOperationsInput | number | null
    aiTimeMs?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type InternalRecipeDataUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    sourceUrl?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    extractedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    extractionStrategy?: EnumExtractionStrategyFieldUpdateOperationsInput | $Enums.ExtractionStrategy
    aiProvider?: EnumAIProviderFieldUpdateOperationsInput | $Enums.AIProvider
    totalProcessingTimeMs?: IntFieldUpdateOperationsInput | number
    fetchTimeMs?: NullableIntFieldUpdateOperationsInput | number | null
    parseTimeMs?: NullableIntFieldUpdateOperationsInput | number | null
    aiTimeMs?: NullableIntFieldUpdateOperationsInput | number | null
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

  export type UserOnboardingProgressListRelationFilter = {
    every?: UserOnboardingProgressWhereInput
    some?: UserOnboardingProgressWhereInput
    none?: UserOnboardingProgressWhereInput
  }

  export type RecipeExtractionMetricsListRelationFilter = {
    every?: RecipeExtractionMetricsWhereInput
    some?: RecipeExtractionMetricsWhereInput
    none?: RecipeExtractionMetricsWhereInput
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

  export type UserOnboardingProgressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RecipeExtractionMetricsOrderByRelationAggregateInput = {
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

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserOnboardingProgressUserIdStepIdCompoundUniqueInput = {
    userId: string
    stepId: number
  }

  export type UserOnboardingProgressCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    stepId?: SortOrder
    stepKey?: SortOrder
    completedAt?: SortOrder
    skippedAt?: SortOrder
    data?: SortOrder
    isRequired?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserOnboardingProgressAvgOrderByAggregateInput = {
    stepId?: SortOrder
  }

  export type UserOnboardingProgressMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    stepId?: SortOrder
    stepKey?: SortOrder
    completedAt?: SortOrder
    skippedAt?: SortOrder
    isRequired?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserOnboardingProgressMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    stepId?: SortOrder
    stepKey?: SortOrder
    completedAt?: SortOrder
    skippedAt?: SortOrder
    isRequired?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserOnboardingProgressSumOrderByAggregateInput = {
    stepId?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumExtractionStrategyFilter<$PrismaModel = never> = {
    equals?: $Enums.ExtractionStrategy | EnumExtractionStrategyFieldRefInput<$PrismaModel>
    in?: $Enums.ExtractionStrategy[] | ListEnumExtractionStrategyFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExtractionStrategy[] | ListEnumExtractionStrategyFieldRefInput<$PrismaModel>
    not?: NestedEnumExtractionStrategyFilter<$PrismaModel> | $Enums.ExtractionStrategy
  }

  export type EnumAIProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.AIProvider | EnumAIProviderFieldRefInput<$PrismaModel>
    in?: $Enums.AIProvider[] | ListEnumAIProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIProvider[] | ListEnumAIProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumAIProviderFilter<$PrismaModel> | $Enums.AIProvider
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type RecipeNullableScalarRelationFilter = {
    is?: RecipeWhereInput | null
    isNot?: RecipeWhereInput | null
  }

  export type RecipeExtractionMetricsCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sessionId?: SortOrder
    recipeUrl?: SortOrder
    domain?: SortOrder
    requestTimestamp?: SortOrder
    primaryStrategy?: SortOrder
    aiProvider?: SortOrder
    fallbackUsed?: SortOrder
    fallbackReason?: SortOrder
    totalDuration?: SortOrder
    htmlFetchDuration?: SortOrder
    aiProcessingDuration?: SortOrder
    validationDuration?: SortOrder
    databaseSaveDuration?: SortOrder
    htmlContentSize?: SortOrder
    cleanedContentSize?: SortOrder
    promptTokens?: SortOrder
    responseTokens?: SortOrder
    totalTokens?: SortOrder
    extractionSuccess?: SortOrder
    validationErrors?: SortOrder
    missingFields?: SortOrder
    completenessScore?: SortOrder
    categoryConfidence?: SortOrder
    hasStructuredData?: SortOrder
    estimatedCost?: SortOrder
    recipeId?: SortOrder
    wasOptimal?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RecipeExtractionMetricsAvgOrderByAggregateInput = {
    totalDuration?: SortOrder
    htmlFetchDuration?: SortOrder
    aiProcessingDuration?: SortOrder
    validationDuration?: SortOrder
    databaseSaveDuration?: SortOrder
    htmlContentSize?: SortOrder
    cleanedContentSize?: SortOrder
    promptTokens?: SortOrder
    responseTokens?: SortOrder
    totalTokens?: SortOrder
    completenessScore?: SortOrder
    categoryConfidence?: SortOrder
    estimatedCost?: SortOrder
  }

  export type RecipeExtractionMetricsMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sessionId?: SortOrder
    recipeUrl?: SortOrder
    domain?: SortOrder
    requestTimestamp?: SortOrder
    primaryStrategy?: SortOrder
    aiProvider?: SortOrder
    fallbackUsed?: SortOrder
    fallbackReason?: SortOrder
    totalDuration?: SortOrder
    htmlFetchDuration?: SortOrder
    aiProcessingDuration?: SortOrder
    validationDuration?: SortOrder
    databaseSaveDuration?: SortOrder
    htmlContentSize?: SortOrder
    cleanedContentSize?: SortOrder
    promptTokens?: SortOrder
    responseTokens?: SortOrder
    totalTokens?: SortOrder
    extractionSuccess?: SortOrder
    completenessScore?: SortOrder
    categoryConfidence?: SortOrder
    hasStructuredData?: SortOrder
    estimatedCost?: SortOrder
    recipeId?: SortOrder
    wasOptimal?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RecipeExtractionMetricsMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sessionId?: SortOrder
    recipeUrl?: SortOrder
    domain?: SortOrder
    requestTimestamp?: SortOrder
    primaryStrategy?: SortOrder
    aiProvider?: SortOrder
    fallbackUsed?: SortOrder
    fallbackReason?: SortOrder
    totalDuration?: SortOrder
    htmlFetchDuration?: SortOrder
    aiProcessingDuration?: SortOrder
    validationDuration?: SortOrder
    databaseSaveDuration?: SortOrder
    htmlContentSize?: SortOrder
    cleanedContentSize?: SortOrder
    promptTokens?: SortOrder
    responseTokens?: SortOrder
    totalTokens?: SortOrder
    extractionSuccess?: SortOrder
    completenessScore?: SortOrder
    categoryConfidence?: SortOrder
    hasStructuredData?: SortOrder
    estimatedCost?: SortOrder
    recipeId?: SortOrder
    wasOptimal?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RecipeExtractionMetricsSumOrderByAggregateInput = {
    totalDuration?: SortOrder
    htmlFetchDuration?: SortOrder
    aiProcessingDuration?: SortOrder
    validationDuration?: SortOrder
    databaseSaveDuration?: SortOrder
    htmlContentSize?: SortOrder
    cleanedContentSize?: SortOrder
    promptTokens?: SortOrder
    responseTokens?: SortOrder
    totalTokens?: SortOrder
    completenessScore?: SortOrder
    categoryConfidence?: SortOrder
    estimatedCost?: SortOrder
  }

  export type EnumExtractionStrategyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExtractionStrategy | EnumExtractionStrategyFieldRefInput<$PrismaModel>
    in?: $Enums.ExtractionStrategy[] | ListEnumExtractionStrategyFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExtractionStrategy[] | ListEnumExtractionStrategyFieldRefInput<$PrismaModel>
    not?: NestedEnumExtractionStrategyWithAggregatesFilter<$PrismaModel> | $Enums.ExtractionStrategy
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExtractionStrategyFilter<$PrismaModel>
    _max?: NestedEnumExtractionStrategyFilter<$PrismaModel>
  }

  export type EnumAIProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AIProvider | EnumAIProviderFieldRefInput<$PrismaModel>
    in?: $Enums.AIProvider[] | ListEnumAIProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIProvider[] | ListEnumAIProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumAIProviderWithAggregatesFilter<$PrismaModel> | $Enums.AIProvider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAIProviderFilter<$PrismaModel>
    _max?: NestedEnumAIProviderFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type EnumExtractionStrategyNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ExtractionStrategy | EnumExtractionStrategyFieldRefInput<$PrismaModel> | null
    in?: $Enums.ExtractionStrategy[] | ListEnumExtractionStrategyFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ExtractionStrategy[] | ListEnumExtractionStrategyFieldRefInput<$PrismaModel> | null
    not?: NestedEnumExtractionStrategyNullableFilter<$PrismaModel> | $Enums.ExtractionStrategy | null
  }

  export type EnumAIProviderNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.AIProvider | EnumAIProviderFieldRefInput<$PrismaModel> | null
    in?: $Enums.AIProvider[] | ListEnumAIProviderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AIProvider[] | ListEnumAIProviderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAIProviderNullableFilter<$PrismaModel> | $Enums.AIProvider | null
  }

  export type DomainPerformanceMetricsCountOrderByAggregateInput = {
    id?: SortOrder
    domain?: SortOrder
    totalExtractions?: SortOrder
    successfulExtractions?: SortOrder
    averageExtractTime?: SortOrder
    averageTokens?: SortOrder
    averageCost?: SortOrder
    optimalStrategy?: SortOrder
    optimalProvider?: SortOrder
    averageCompleteness?: SortOrder
    hasStructuredDataPct?: SortOrder
    lastUpdated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DomainPerformanceMetricsAvgOrderByAggregateInput = {
    totalExtractions?: SortOrder
    successfulExtractions?: SortOrder
    averageExtractTime?: SortOrder
    averageTokens?: SortOrder
    averageCost?: SortOrder
    averageCompleteness?: SortOrder
    hasStructuredDataPct?: SortOrder
  }

  export type DomainPerformanceMetricsMaxOrderByAggregateInput = {
    id?: SortOrder
    domain?: SortOrder
    totalExtractions?: SortOrder
    successfulExtractions?: SortOrder
    averageExtractTime?: SortOrder
    averageTokens?: SortOrder
    averageCost?: SortOrder
    optimalStrategy?: SortOrder
    optimalProvider?: SortOrder
    averageCompleteness?: SortOrder
    hasStructuredDataPct?: SortOrder
    lastUpdated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DomainPerformanceMetricsMinOrderByAggregateInput = {
    id?: SortOrder
    domain?: SortOrder
    totalExtractions?: SortOrder
    successfulExtractions?: SortOrder
    averageExtractTime?: SortOrder
    averageTokens?: SortOrder
    averageCost?: SortOrder
    optimalStrategy?: SortOrder
    optimalProvider?: SortOrder
    averageCompleteness?: SortOrder
    hasStructuredDataPct?: SortOrder
    lastUpdated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DomainPerformanceMetricsSumOrderByAggregateInput = {
    totalExtractions?: SortOrder
    successfulExtractions?: SortOrder
    averageExtractTime?: SortOrder
    averageTokens?: SortOrder
    averageCost?: SortOrder
    averageCompleteness?: SortOrder
    hasStructuredDataPct?: SortOrder
  }

  export type EnumExtractionStrategyNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExtractionStrategy | EnumExtractionStrategyFieldRefInput<$PrismaModel> | null
    in?: $Enums.ExtractionStrategy[] | ListEnumExtractionStrategyFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ExtractionStrategy[] | ListEnumExtractionStrategyFieldRefInput<$PrismaModel> | null
    not?: NestedEnumExtractionStrategyNullableWithAggregatesFilter<$PrismaModel> | $Enums.ExtractionStrategy | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumExtractionStrategyNullableFilter<$PrismaModel>
    _max?: NestedEnumExtractionStrategyNullableFilter<$PrismaModel>
  }

  export type EnumAIProviderNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AIProvider | EnumAIProviderFieldRefInput<$PrismaModel> | null
    in?: $Enums.AIProvider[] | ListEnumAIProviderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AIProvider[] | ListEnumAIProviderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAIProviderNullableWithAggregatesFilter<$PrismaModel> | $Enums.AIProvider | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumAIProviderNullableFilter<$PrismaModel>
    _max?: NestedEnumAIProviderNullableFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type AIProviderCostsCountOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    model?: SortOrder
    inputTokenCost?: SortOrder
    outputTokenCost?: SortOrder
    effectiveDate?: SortOrder
    createdAt?: SortOrder
  }

  export type AIProviderCostsAvgOrderByAggregateInput = {
    inputTokenCost?: SortOrder
    outputTokenCost?: SortOrder
  }

  export type AIProviderCostsMaxOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    model?: SortOrder
    inputTokenCost?: SortOrder
    outputTokenCost?: SortOrder
    effectiveDate?: SortOrder
    createdAt?: SortOrder
  }

  export type AIProviderCostsMinOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    model?: SortOrder
    inputTokenCost?: SortOrder
    outputTokenCost?: SortOrder
    effectiveDate?: SortOrder
    createdAt?: SortOrder
  }

  export type AIProviderCostsSumOrderByAggregateInput = {
    inputTokenCost?: SortOrder
    outputTokenCost?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type AnonymousSessionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    deviceType?: SortOrder
    operatingSystem?: SortOrder
    browser?: SortOrder
    screenResolution?: SortOrder
    timezone?: SortOrder
    language?: SortOrder
    firstSeenAt?: SortOrder
    lastSeenAt?: SortOrder
    totalRecipeAttempts?: SortOrder
    totalSuccessfulExtractions?: SortOrder
    hitRateLimit?: SortOrder
    rateLimitHitAt?: SortOrder
    showedSignupPrompt?: SortOrder
    signupPromptShownAt?: SortOrder
    convertedToUser?: SortOrder
    convertedUserId?: SortOrder
    convertedAt?: SortOrder
    referrerDomain?: SortOrder
    countryCode?: SortOrder
    cityName?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AnonymousSessionAvgOrderByAggregateInput = {
    totalRecipeAttempts?: SortOrder
    totalSuccessfulExtractions?: SortOrder
  }

  export type AnonymousSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    deviceType?: SortOrder
    operatingSystem?: SortOrder
    browser?: SortOrder
    screenResolution?: SortOrder
    timezone?: SortOrder
    language?: SortOrder
    firstSeenAt?: SortOrder
    lastSeenAt?: SortOrder
    totalRecipeAttempts?: SortOrder
    totalSuccessfulExtractions?: SortOrder
    hitRateLimit?: SortOrder
    rateLimitHitAt?: SortOrder
    showedSignupPrompt?: SortOrder
    signupPromptShownAt?: SortOrder
    convertedToUser?: SortOrder
    convertedUserId?: SortOrder
    convertedAt?: SortOrder
    referrerDomain?: SortOrder
    countryCode?: SortOrder
    cityName?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AnonymousSessionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    deviceType?: SortOrder
    operatingSystem?: SortOrder
    browser?: SortOrder
    screenResolution?: SortOrder
    timezone?: SortOrder
    language?: SortOrder
    firstSeenAt?: SortOrder
    lastSeenAt?: SortOrder
    totalRecipeAttempts?: SortOrder
    totalSuccessfulExtractions?: SortOrder
    hitRateLimit?: SortOrder
    rateLimitHitAt?: SortOrder
    showedSignupPrompt?: SortOrder
    signupPromptShownAt?: SortOrder
    convertedToUser?: SortOrder
    convertedUserId?: SortOrder
    convertedAt?: SortOrder
    referrerDomain?: SortOrder
    countryCode?: SortOrder
    cityName?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AnonymousSessionSumOrderByAggregateInput = {
    totalRecipeAttempts?: SortOrder
    totalSuccessfulExtractions?: SortOrder
  }

  export type EnumConversionEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ConversionEventType | EnumConversionEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ConversionEventType[] | ListEnumConversionEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConversionEventType[] | ListEnumConversionEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumConversionEventTypeFilter<$PrismaModel> | $Enums.ConversionEventType
  }

  export type ConversionEventCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    userId?: SortOrder
    eventType?: SortOrder
    eventData?: SortOrder
    recipeUrl?: SortOrder
    pageUrl?: SortOrder
    sessionDuration?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ConversionEventAvgOrderByAggregateInput = {
    sessionDuration?: SortOrder
  }

  export type ConversionEventMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    userId?: SortOrder
    eventType?: SortOrder
    recipeUrl?: SortOrder
    pageUrl?: SortOrder
    sessionDuration?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ConversionEventMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    userId?: SortOrder
    eventType?: SortOrder
    recipeUrl?: SortOrder
    pageUrl?: SortOrder
    sessionDuration?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ConversionEventSumOrderByAggregateInput = {
    sessionDuration?: SortOrder
  }

  export type EnumConversionEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConversionEventType | EnumConversionEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ConversionEventType[] | ListEnumConversionEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConversionEventType[] | ListEnumConversionEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumConversionEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.ConversionEventType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConversionEventTypeFilter<$PrismaModel>
    _max?: NestedEnumConversionEventTypeFilter<$PrismaModel>
  }

  export type DailyRateLimitIdentifierIdentifierTypeDateCompoundUniqueInput = {
    identifier: string
    identifierType: string
    date: Date | string
  }

  export type DailyRateLimitCountOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    identifierType?: SortOrder
    date?: SortOrder
    requestCount?: SortOrder
    lastRequestAt?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyRateLimitAvgOrderByAggregateInput = {
    requestCount?: SortOrder
  }

  export type DailyRateLimitMaxOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    identifierType?: SortOrder
    date?: SortOrder
    requestCount?: SortOrder
    lastRequestAt?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyRateLimitMinOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    identifierType?: SortOrder
    date?: SortOrder
    requestCount?: SortOrder
    lastRequestAt?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyRateLimitSumOrderByAggregateInput = {
    requestCount?: SortOrder
  }

  export type InternalRecipeDataCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    sourceUrl?: SortOrder
    domain?: SortOrder
    extractedAt?: SortOrder
    createdAt?: SortOrder
    extractionStrategy?: SortOrder
    aiProvider?: SortOrder
    totalProcessingTimeMs?: SortOrder
    fetchTimeMs?: SortOrder
    parseTimeMs?: SortOrder
    aiTimeMs?: SortOrder
  }

  export type InternalRecipeDataAvgOrderByAggregateInput = {
    totalProcessingTimeMs?: SortOrder
    fetchTimeMs?: SortOrder
    parseTimeMs?: SortOrder
    aiTimeMs?: SortOrder
  }

  export type InternalRecipeDataMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    sourceUrl?: SortOrder
    domain?: SortOrder
    extractedAt?: SortOrder
    createdAt?: SortOrder
    extractionStrategy?: SortOrder
    aiProvider?: SortOrder
    totalProcessingTimeMs?: SortOrder
    fetchTimeMs?: SortOrder
    parseTimeMs?: SortOrder
    aiTimeMs?: SortOrder
  }

  export type InternalRecipeDataMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    sourceUrl?: SortOrder
    domain?: SortOrder
    extractedAt?: SortOrder
    createdAt?: SortOrder
    extractionStrategy?: SortOrder
    aiProvider?: SortOrder
    totalProcessingTimeMs?: SortOrder
    fetchTimeMs?: SortOrder
    parseTimeMs?: SortOrder
    aiTimeMs?: SortOrder
  }

  export type InternalRecipeDataSumOrderByAggregateInput = {
    totalProcessingTimeMs?: SortOrder
    fetchTimeMs?: SortOrder
    parseTimeMs?: SortOrder
    aiTimeMs?: SortOrder
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

  export type UserOnboardingProgressCreateNestedManyWithoutUserInput = {
    create?: XOR<UserOnboardingProgressCreateWithoutUserInput, UserOnboardingProgressUncheckedCreateWithoutUserInput> | UserOnboardingProgressCreateWithoutUserInput[] | UserOnboardingProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserOnboardingProgressCreateOrConnectWithoutUserInput | UserOnboardingProgressCreateOrConnectWithoutUserInput[]
    createMany?: UserOnboardingProgressCreateManyUserInputEnvelope
    connect?: UserOnboardingProgressWhereUniqueInput | UserOnboardingProgressWhereUniqueInput[]
  }

  export type RecipeExtractionMetricsCreateNestedManyWithoutUserInput = {
    create?: XOR<RecipeExtractionMetricsCreateWithoutUserInput, RecipeExtractionMetricsUncheckedCreateWithoutUserInput> | RecipeExtractionMetricsCreateWithoutUserInput[] | RecipeExtractionMetricsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecipeExtractionMetricsCreateOrConnectWithoutUserInput | RecipeExtractionMetricsCreateOrConnectWithoutUserInput[]
    createMany?: RecipeExtractionMetricsCreateManyUserInputEnvelope
    connect?: RecipeExtractionMetricsWhereUniqueInput | RecipeExtractionMetricsWhereUniqueInput[]
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

  export type UserOnboardingProgressUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserOnboardingProgressCreateWithoutUserInput, UserOnboardingProgressUncheckedCreateWithoutUserInput> | UserOnboardingProgressCreateWithoutUserInput[] | UserOnboardingProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserOnboardingProgressCreateOrConnectWithoutUserInput | UserOnboardingProgressCreateOrConnectWithoutUserInput[]
    createMany?: UserOnboardingProgressCreateManyUserInputEnvelope
    connect?: UserOnboardingProgressWhereUniqueInput | UserOnboardingProgressWhereUniqueInput[]
  }

  export type RecipeExtractionMetricsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RecipeExtractionMetricsCreateWithoutUserInput, RecipeExtractionMetricsUncheckedCreateWithoutUserInput> | RecipeExtractionMetricsCreateWithoutUserInput[] | RecipeExtractionMetricsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecipeExtractionMetricsCreateOrConnectWithoutUserInput | RecipeExtractionMetricsCreateOrConnectWithoutUserInput[]
    createMany?: RecipeExtractionMetricsCreateManyUserInputEnvelope
    connect?: RecipeExtractionMetricsWhereUniqueInput | RecipeExtractionMetricsWhereUniqueInput[]
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

  export type UserOnboardingProgressUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserOnboardingProgressCreateWithoutUserInput, UserOnboardingProgressUncheckedCreateWithoutUserInput> | UserOnboardingProgressCreateWithoutUserInput[] | UserOnboardingProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserOnboardingProgressCreateOrConnectWithoutUserInput | UserOnboardingProgressCreateOrConnectWithoutUserInput[]
    upsert?: UserOnboardingProgressUpsertWithWhereUniqueWithoutUserInput | UserOnboardingProgressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserOnboardingProgressCreateManyUserInputEnvelope
    set?: UserOnboardingProgressWhereUniqueInput | UserOnboardingProgressWhereUniqueInput[]
    disconnect?: UserOnboardingProgressWhereUniqueInput | UserOnboardingProgressWhereUniqueInput[]
    delete?: UserOnboardingProgressWhereUniqueInput | UserOnboardingProgressWhereUniqueInput[]
    connect?: UserOnboardingProgressWhereUniqueInput | UserOnboardingProgressWhereUniqueInput[]
    update?: UserOnboardingProgressUpdateWithWhereUniqueWithoutUserInput | UserOnboardingProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserOnboardingProgressUpdateManyWithWhereWithoutUserInput | UserOnboardingProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserOnboardingProgressScalarWhereInput | UserOnboardingProgressScalarWhereInput[]
  }

  export type RecipeExtractionMetricsUpdateManyWithoutUserNestedInput = {
    create?: XOR<RecipeExtractionMetricsCreateWithoutUserInput, RecipeExtractionMetricsUncheckedCreateWithoutUserInput> | RecipeExtractionMetricsCreateWithoutUserInput[] | RecipeExtractionMetricsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecipeExtractionMetricsCreateOrConnectWithoutUserInput | RecipeExtractionMetricsCreateOrConnectWithoutUserInput[]
    upsert?: RecipeExtractionMetricsUpsertWithWhereUniqueWithoutUserInput | RecipeExtractionMetricsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RecipeExtractionMetricsCreateManyUserInputEnvelope
    set?: RecipeExtractionMetricsWhereUniqueInput | RecipeExtractionMetricsWhereUniqueInput[]
    disconnect?: RecipeExtractionMetricsWhereUniqueInput | RecipeExtractionMetricsWhereUniqueInput[]
    delete?: RecipeExtractionMetricsWhereUniqueInput | RecipeExtractionMetricsWhereUniqueInput[]
    connect?: RecipeExtractionMetricsWhereUniqueInput | RecipeExtractionMetricsWhereUniqueInput[]
    update?: RecipeExtractionMetricsUpdateWithWhereUniqueWithoutUserInput | RecipeExtractionMetricsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RecipeExtractionMetricsUpdateManyWithWhereWithoutUserInput | RecipeExtractionMetricsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RecipeExtractionMetricsScalarWhereInput | RecipeExtractionMetricsScalarWhereInput[]
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

  export type UserOnboardingProgressUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserOnboardingProgressCreateWithoutUserInput, UserOnboardingProgressUncheckedCreateWithoutUserInput> | UserOnboardingProgressCreateWithoutUserInput[] | UserOnboardingProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserOnboardingProgressCreateOrConnectWithoutUserInput | UserOnboardingProgressCreateOrConnectWithoutUserInput[]
    upsert?: UserOnboardingProgressUpsertWithWhereUniqueWithoutUserInput | UserOnboardingProgressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserOnboardingProgressCreateManyUserInputEnvelope
    set?: UserOnboardingProgressWhereUniqueInput | UserOnboardingProgressWhereUniqueInput[]
    disconnect?: UserOnboardingProgressWhereUniqueInput | UserOnboardingProgressWhereUniqueInput[]
    delete?: UserOnboardingProgressWhereUniqueInput | UserOnboardingProgressWhereUniqueInput[]
    connect?: UserOnboardingProgressWhereUniqueInput | UserOnboardingProgressWhereUniqueInput[]
    update?: UserOnboardingProgressUpdateWithWhereUniqueWithoutUserInput | UserOnboardingProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserOnboardingProgressUpdateManyWithWhereWithoutUserInput | UserOnboardingProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserOnboardingProgressScalarWhereInput | UserOnboardingProgressScalarWhereInput[]
  }

  export type RecipeExtractionMetricsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RecipeExtractionMetricsCreateWithoutUserInput, RecipeExtractionMetricsUncheckedCreateWithoutUserInput> | RecipeExtractionMetricsCreateWithoutUserInput[] | RecipeExtractionMetricsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecipeExtractionMetricsCreateOrConnectWithoutUserInput | RecipeExtractionMetricsCreateOrConnectWithoutUserInput[]
    upsert?: RecipeExtractionMetricsUpsertWithWhereUniqueWithoutUserInput | RecipeExtractionMetricsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RecipeExtractionMetricsCreateManyUserInputEnvelope
    set?: RecipeExtractionMetricsWhereUniqueInput | RecipeExtractionMetricsWhereUniqueInput[]
    disconnect?: RecipeExtractionMetricsWhereUniqueInput | RecipeExtractionMetricsWhereUniqueInput[]
    delete?: RecipeExtractionMetricsWhereUniqueInput | RecipeExtractionMetricsWhereUniqueInput[]
    connect?: RecipeExtractionMetricsWhereUniqueInput | RecipeExtractionMetricsWhereUniqueInput[]
    update?: RecipeExtractionMetricsUpdateWithWhereUniqueWithoutUserInput | RecipeExtractionMetricsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RecipeExtractionMetricsUpdateManyWithWhereWithoutUserInput | RecipeExtractionMetricsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RecipeExtractionMetricsScalarWhereInput | RecipeExtractionMetricsScalarWhereInput[]
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

  export type RecipeExtractionMetricsCreateNestedManyWithoutRecipeInput = {
    create?: XOR<RecipeExtractionMetricsCreateWithoutRecipeInput, RecipeExtractionMetricsUncheckedCreateWithoutRecipeInput> | RecipeExtractionMetricsCreateWithoutRecipeInput[] | RecipeExtractionMetricsUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: RecipeExtractionMetricsCreateOrConnectWithoutRecipeInput | RecipeExtractionMetricsCreateOrConnectWithoutRecipeInput[]
    createMany?: RecipeExtractionMetricsCreateManyRecipeInputEnvelope
    connect?: RecipeExtractionMetricsWhereUniqueInput | RecipeExtractionMetricsWhereUniqueInput[]
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

  export type RecipeExtractionMetricsUncheckedCreateNestedManyWithoutRecipeInput = {
    create?: XOR<RecipeExtractionMetricsCreateWithoutRecipeInput, RecipeExtractionMetricsUncheckedCreateWithoutRecipeInput> | RecipeExtractionMetricsCreateWithoutRecipeInput[] | RecipeExtractionMetricsUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: RecipeExtractionMetricsCreateOrConnectWithoutRecipeInput | RecipeExtractionMetricsCreateOrConnectWithoutRecipeInput[]
    createMany?: RecipeExtractionMetricsCreateManyRecipeInputEnvelope
    connect?: RecipeExtractionMetricsWhereUniqueInput | RecipeExtractionMetricsWhereUniqueInput[]
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

  export type RecipeExtractionMetricsUpdateManyWithoutRecipeNestedInput = {
    create?: XOR<RecipeExtractionMetricsCreateWithoutRecipeInput, RecipeExtractionMetricsUncheckedCreateWithoutRecipeInput> | RecipeExtractionMetricsCreateWithoutRecipeInput[] | RecipeExtractionMetricsUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: RecipeExtractionMetricsCreateOrConnectWithoutRecipeInput | RecipeExtractionMetricsCreateOrConnectWithoutRecipeInput[]
    upsert?: RecipeExtractionMetricsUpsertWithWhereUniqueWithoutRecipeInput | RecipeExtractionMetricsUpsertWithWhereUniqueWithoutRecipeInput[]
    createMany?: RecipeExtractionMetricsCreateManyRecipeInputEnvelope
    set?: RecipeExtractionMetricsWhereUniqueInput | RecipeExtractionMetricsWhereUniqueInput[]
    disconnect?: RecipeExtractionMetricsWhereUniqueInput | RecipeExtractionMetricsWhereUniqueInput[]
    delete?: RecipeExtractionMetricsWhereUniqueInput | RecipeExtractionMetricsWhereUniqueInput[]
    connect?: RecipeExtractionMetricsWhereUniqueInput | RecipeExtractionMetricsWhereUniqueInput[]
    update?: RecipeExtractionMetricsUpdateWithWhereUniqueWithoutRecipeInput | RecipeExtractionMetricsUpdateWithWhereUniqueWithoutRecipeInput[]
    updateMany?: RecipeExtractionMetricsUpdateManyWithWhereWithoutRecipeInput | RecipeExtractionMetricsUpdateManyWithWhereWithoutRecipeInput[]
    deleteMany?: RecipeExtractionMetricsScalarWhereInput | RecipeExtractionMetricsScalarWhereInput[]
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

  export type RecipeExtractionMetricsUncheckedUpdateManyWithoutRecipeNestedInput = {
    create?: XOR<RecipeExtractionMetricsCreateWithoutRecipeInput, RecipeExtractionMetricsUncheckedCreateWithoutRecipeInput> | RecipeExtractionMetricsCreateWithoutRecipeInput[] | RecipeExtractionMetricsUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: RecipeExtractionMetricsCreateOrConnectWithoutRecipeInput | RecipeExtractionMetricsCreateOrConnectWithoutRecipeInput[]
    upsert?: RecipeExtractionMetricsUpsertWithWhereUniqueWithoutRecipeInput | RecipeExtractionMetricsUpsertWithWhereUniqueWithoutRecipeInput[]
    createMany?: RecipeExtractionMetricsCreateManyRecipeInputEnvelope
    set?: RecipeExtractionMetricsWhereUniqueInput | RecipeExtractionMetricsWhereUniqueInput[]
    disconnect?: RecipeExtractionMetricsWhereUniqueInput | RecipeExtractionMetricsWhereUniqueInput[]
    delete?: RecipeExtractionMetricsWhereUniqueInput | RecipeExtractionMetricsWhereUniqueInput[]
    connect?: RecipeExtractionMetricsWhereUniqueInput | RecipeExtractionMetricsWhereUniqueInput[]
    update?: RecipeExtractionMetricsUpdateWithWhereUniqueWithoutRecipeInput | RecipeExtractionMetricsUpdateWithWhereUniqueWithoutRecipeInput[]
    updateMany?: RecipeExtractionMetricsUpdateManyWithWhereWithoutRecipeInput | RecipeExtractionMetricsUpdateManyWithWhereWithoutRecipeInput[]
    deleteMany?: RecipeExtractionMetricsScalarWhereInput | RecipeExtractionMetricsScalarWhereInput[]
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

  export type UserCreateNestedOneWithoutOnboardingProgressInput = {
    create?: XOR<UserCreateWithoutOnboardingProgressInput, UserUncheckedCreateWithoutOnboardingProgressInput>
    connectOrCreate?: UserCreateOrConnectWithoutOnboardingProgressInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutOnboardingProgressNestedInput = {
    create?: XOR<UserCreateWithoutOnboardingProgressInput, UserUncheckedCreateWithoutOnboardingProgressInput>
    connectOrCreate?: UserCreateOrConnectWithoutOnboardingProgressInput
    upsert?: UserUpsertWithoutOnboardingProgressInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOnboardingProgressInput, UserUpdateWithoutOnboardingProgressInput>, UserUncheckedUpdateWithoutOnboardingProgressInput>
  }

  export type RecipeExtractionMetricsCreatemissingFieldsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutExtractionMetricsInput = {
    create?: XOR<UserCreateWithoutExtractionMetricsInput, UserUncheckedCreateWithoutExtractionMetricsInput>
    connectOrCreate?: UserCreateOrConnectWithoutExtractionMetricsInput
    connect?: UserWhereUniqueInput
  }

  export type RecipeCreateNestedOneWithoutExtractionMetricsInput = {
    create?: XOR<RecipeCreateWithoutExtractionMetricsInput, RecipeUncheckedCreateWithoutExtractionMetricsInput>
    connectOrCreate?: RecipeCreateOrConnectWithoutExtractionMetricsInput
    connect?: RecipeWhereUniqueInput
  }

  export type EnumExtractionStrategyFieldUpdateOperationsInput = {
    set?: $Enums.ExtractionStrategy
  }

  export type EnumAIProviderFieldUpdateOperationsInput = {
    set?: $Enums.AIProvider
  }

  export type RecipeExtractionMetricsUpdatemissingFieldsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type UserUpdateOneWithoutExtractionMetricsNestedInput = {
    create?: XOR<UserCreateWithoutExtractionMetricsInput, UserUncheckedCreateWithoutExtractionMetricsInput>
    connectOrCreate?: UserCreateOrConnectWithoutExtractionMetricsInput
    upsert?: UserUpsertWithoutExtractionMetricsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutExtractionMetricsInput, UserUpdateWithoutExtractionMetricsInput>, UserUncheckedUpdateWithoutExtractionMetricsInput>
  }

  export type RecipeUpdateOneWithoutExtractionMetricsNestedInput = {
    create?: XOR<RecipeCreateWithoutExtractionMetricsInput, RecipeUncheckedCreateWithoutExtractionMetricsInput>
    connectOrCreate?: RecipeCreateOrConnectWithoutExtractionMetricsInput
    upsert?: RecipeUpsertWithoutExtractionMetricsInput
    disconnect?: RecipeWhereInput | boolean
    delete?: RecipeWhereInput | boolean
    connect?: RecipeWhereUniqueInput
    update?: XOR<XOR<RecipeUpdateToOneWithWhereWithoutExtractionMetricsInput, RecipeUpdateWithoutExtractionMetricsInput>, RecipeUncheckedUpdateWithoutExtractionMetricsInput>
  }

  export type NullableEnumExtractionStrategyFieldUpdateOperationsInput = {
    set?: $Enums.ExtractionStrategy | null
  }

  export type NullableEnumAIProviderFieldUpdateOperationsInput = {
    set?: $Enums.AIProvider | null
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumConversionEventTypeFieldUpdateOperationsInput = {
    set?: $Enums.ConversionEventType
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

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumExtractionStrategyFilter<$PrismaModel = never> = {
    equals?: $Enums.ExtractionStrategy | EnumExtractionStrategyFieldRefInput<$PrismaModel>
    in?: $Enums.ExtractionStrategy[] | ListEnumExtractionStrategyFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExtractionStrategy[] | ListEnumExtractionStrategyFieldRefInput<$PrismaModel>
    not?: NestedEnumExtractionStrategyFilter<$PrismaModel> | $Enums.ExtractionStrategy
  }

  export type NestedEnumAIProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.AIProvider | EnumAIProviderFieldRefInput<$PrismaModel>
    in?: $Enums.AIProvider[] | ListEnumAIProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIProvider[] | ListEnumAIProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumAIProviderFilter<$PrismaModel> | $Enums.AIProvider
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedEnumExtractionStrategyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExtractionStrategy | EnumExtractionStrategyFieldRefInput<$PrismaModel>
    in?: $Enums.ExtractionStrategy[] | ListEnumExtractionStrategyFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExtractionStrategy[] | ListEnumExtractionStrategyFieldRefInput<$PrismaModel>
    not?: NestedEnumExtractionStrategyWithAggregatesFilter<$PrismaModel> | $Enums.ExtractionStrategy
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExtractionStrategyFilter<$PrismaModel>
    _max?: NestedEnumExtractionStrategyFilter<$PrismaModel>
  }

  export type NestedEnumAIProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AIProvider | EnumAIProviderFieldRefInput<$PrismaModel>
    in?: $Enums.AIProvider[] | ListEnumAIProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.AIProvider[] | ListEnumAIProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumAIProviderWithAggregatesFilter<$PrismaModel> | $Enums.AIProvider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAIProviderFilter<$PrismaModel>
    _max?: NestedEnumAIProviderFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedEnumExtractionStrategyNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ExtractionStrategy | EnumExtractionStrategyFieldRefInput<$PrismaModel> | null
    in?: $Enums.ExtractionStrategy[] | ListEnumExtractionStrategyFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ExtractionStrategy[] | ListEnumExtractionStrategyFieldRefInput<$PrismaModel> | null
    not?: NestedEnumExtractionStrategyNullableFilter<$PrismaModel> | $Enums.ExtractionStrategy | null
  }

  export type NestedEnumAIProviderNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.AIProvider | EnumAIProviderFieldRefInput<$PrismaModel> | null
    in?: $Enums.AIProvider[] | ListEnumAIProviderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AIProvider[] | ListEnumAIProviderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAIProviderNullableFilter<$PrismaModel> | $Enums.AIProvider | null
  }

  export type NestedEnumExtractionStrategyNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExtractionStrategy | EnumExtractionStrategyFieldRefInput<$PrismaModel> | null
    in?: $Enums.ExtractionStrategy[] | ListEnumExtractionStrategyFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ExtractionStrategy[] | ListEnumExtractionStrategyFieldRefInput<$PrismaModel> | null
    not?: NestedEnumExtractionStrategyNullableWithAggregatesFilter<$PrismaModel> | $Enums.ExtractionStrategy | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumExtractionStrategyNullableFilter<$PrismaModel>
    _max?: NestedEnumExtractionStrategyNullableFilter<$PrismaModel>
  }

  export type NestedEnumAIProviderNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AIProvider | EnumAIProviderFieldRefInput<$PrismaModel> | null
    in?: $Enums.AIProvider[] | ListEnumAIProviderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AIProvider[] | ListEnumAIProviderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAIProviderNullableWithAggregatesFilter<$PrismaModel> | $Enums.AIProvider | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumAIProviderNullableFilter<$PrismaModel>
    _max?: NestedEnumAIProviderNullableFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumConversionEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ConversionEventType | EnumConversionEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ConversionEventType[] | ListEnumConversionEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConversionEventType[] | ListEnumConversionEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumConversionEventTypeFilter<$PrismaModel> | $Enums.ConversionEventType
  }

  export type NestedEnumConversionEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConversionEventType | EnumConversionEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ConversionEventType[] | ListEnumConversionEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConversionEventType[] | ListEnumConversionEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumConversionEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.ConversionEventType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConversionEventTypeFilter<$PrismaModel>
    _max?: NestedEnumConversionEventTypeFilter<$PrismaModel>
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
    extractionMetrics?: RecipeExtractionMetricsCreateNestedManyWithoutRecipeInput
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
    extractionMetrics?: RecipeExtractionMetricsUncheckedCreateNestedManyWithoutRecipeInput
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

  export type UserOnboardingProgressCreateWithoutUserInput = {
    id?: string
    stepId: number
    stepKey: string
    completedAt?: Date | string | null
    skippedAt?: Date | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    isRequired?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserOnboardingProgressUncheckedCreateWithoutUserInput = {
    id?: string
    stepId: number
    stepKey: string
    completedAt?: Date | string | null
    skippedAt?: Date | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    isRequired?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserOnboardingProgressCreateOrConnectWithoutUserInput = {
    where: UserOnboardingProgressWhereUniqueInput
    create: XOR<UserOnboardingProgressCreateWithoutUserInput, UserOnboardingProgressUncheckedCreateWithoutUserInput>
  }

  export type UserOnboardingProgressCreateManyUserInputEnvelope = {
    data: UserOnboardingProgressCreateManyUserInput | UserOnboardingProgressCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RecipeExtractionMetricsCreateWithoutUserInput = {
    id?: string
    sessionId?: string | null
    recipeUrl: string
    domain: string
    requestTimestamp?: Date | string
    primaryStrategy: $Enums.ExtractionStrategy
    aiProvider: $Enums.AIProvider
    fallbackUsed?: boolean
    fallbackReason?: string | null
    totalDuration: number
    htmlFetchDuration?: number | null
    aiProcessingDuration: number
    validationDuration?: number | null
    databaseSaveDuration?: number | null
    htmlContentSize?: number | null
    cleanedContentSize?: number | null
    promptTokens?: number | null
    responseTokens?: number | null
    totalTokens?: number | null
    extractionSuccess: boolean
    validationErrors?: NullableJsonNullValueInput | InputJsonValue
    missingFields?: RecipeExtractionMetricsCreatemissingFieldsInput | string[]
    completenessScore?: number | null
    categoryConfidence?: number | null
    hasStructuredData?: boolean | null
    estimatedCost?: number | null
    wasOptimal?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    recipe?: RecipeCreateNestedOneWithoutExtractionMetricsInput
  }

  export type RecipeExtractionMetricsUncheckedCreateWithoutUserInput = {
    id?: string
    sessionId?: string | null
    recipeUrl: string
    domain: string
    requestTimestamp?: Date | string
    primaryStrategy: $Enums.ExtractionStrategy
    aiProvider: $Enums.AIProvider
    fallbackUsed?: boolean
    fallbackReason?: string | null
    totalDuration: number
    htmlFetchDuration?: number | null
    aiProcessingDuration: number
    validationDuration?: number | null
    databaseSaveDuration?: number | null
    htmlContentSize?: number | null
    cleanedContentSize?: number | null
    promptTokens?: number | null
    responseTokens?: number | null
    totalTokens?: number | null
    extractionSuccess: boolean
    validationErrors?: NullableJsonNullValueInput | InputJsonValue
    missingFields?: RecipeExtractionMetricsCreatemissingFieldsInput | string[]
    completenessScore?: number | null
    categoryConfidence?: number | null
    hasStructuredData?: boolean | null
    estimatedCost?: number | null
    recipeId?: string | null
    wasOptimal?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecipeExtractionMetricsCreateOrConnectWithoutUserInput = {
    where: RecipeExtractionMetricsWhereUniqueInput
    create: XOR<RecipeExtractionMetricsCreateWithoutUserInput, RecipeExtractionMetricsUncheckedCreateWithoutUserInput>
  }

  export type RecipeExtractionMetricsCreateManyUserInputEnvelope = {
    data: RecipeExtractionMetricsCreateManyUserInput | RecipeExtractionMetricsCreateManyUserInput[]
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

  export type UserOnboardingProgressUpsertWithWhereUniqueWithoutUserInput = {
    where: UserOnboardingProgressWhereUniqueInput
    update: XOR<UserOnboardingProgressUpdateWithoutUserInput, UserOnboardingProgressUncheckedUpdateWithoutUserInput>
    create: XOR<UserOnboardingProgressCreateWithoutUserInput, UserOnboardingProgressUncheckedCreateWithoutUserInput>
  }

  export type UserOnboardingProgressUpdateWithWhereUniqueWithoutUserInput = {
    where: UserOnboardingProgressWhereUniqueInput
    data: XOR<UserOnboardingProgressUpdateWithoutUserInput, UserOnboardingProgressUncheckedUpdateWithoutUserInput>
  }

  export type UserOnboardingProgressUpdateManyWithWhereWithoutUserInput = {
    where: UserOnboardingProgressScalarWhereInput
    data: XOR<UserOnboardingProgressUpdateManyMutationInput, UserOnboardingProgressUncheckedUpdateManyWithoutUserInput>
  }

  export type UserOnboardingProgressScalarWhereInput = {
    AND?: UserOnboardingProgressScalarWhereInput | UserOnboardingProgressScalarWhereInput[]
    OR?: UserOnboardingProgressScalarWhereInput[]
    NOT?: UserOnboardingProgressScalarWhereInput | UserOnboardingProgressScalarWhereInput[]
    id?: StringFilter<"UserOnboardingProgress"> | string
    userId?: StringFilter<"UserOnboardingProgress"> | string
    stepId?: IntFilter<"UserOnboardingProgress"> | number
    stepKey?: StringFilter<"UserOnboardingProgress"> | string
    completedAt?: DateTimeNullableFilter<"UserOnboardingProgress"> | Date | string | null
    skippedAt?: DateTimeNullableFilter<"UserOnboardingProgress"> | Date | string | null
    data?: JsonNullableFilter<"UserOnboardingProgress">
    isRequired?: BoolFilter<"UserOnboardingProgress"> | boolean
    createdAt?: DateTimeFilter<"UserOnboardingProgress"> | Date | string
    updatedAt?: DateTimeFilter<"UserOnboardingProgress"> | Date | string
  }

  export type RecipeExtractionMetricsUpsertWithWhereUniqueWithoutUserInput = {
    where: RecipeExtractionMetricsWhereUniqueInput
    update: XOR<RecipeExtractionMetricsUpdateWithoutUserInput, RecipeExtractionMetricsUncheckedUpdateWithoutUserInput>
    create: XOR<RecipeExtractionMetricsCreateWithoutUserInput, RecipeExtractionMetricsUncheckedCreateWithoutUserInput>
  }

  export type RecipeExtractionMetricsUpdateWithWhereUniqueWithoutUserInput = {
    where: RecipeExtractionMetricsWhereUniqueInput
    data: XOR<RecipeExtractionMetricsUpdateWithoutUserInput, RecipeExtractionMetricsUncheckedUpdateWithoutUserInput>
  }

  export type RecipeExtractionMetricsUpdateManyWithWhereWithoutUserInput = {
    where: RecipeExtractionMetricsScalarWhereInput
    data: XOR<RecipeExtractionMetricsUpdateManyMutationInput, RecipeExtractionMetricsUncheckedUpdateManyWithoutUserInput>
  }

  export type RecipeExtractionMetricsScalarWhereInput = {
    AND?: RecipeExtractionMetricsScalarWhereInput | RecipeExtractionMetricsScalarWhereInput[]
    OR?: RecipeExtractionMetricsScalarWhereInput[]
    NOT?: RecipeExtractionMetricsScalarWhereInput | RecipeExtractionMetricsScalarWhereInput[]
    id?: StringFilter<"RecipeExtractionMetrics"> | string
    userId?: StringNullableFilter<"RecipeExtractionMetrics"> | string | null
    sessionId?: StringNullableFilter<"RecipeExtractionMetrics"> | string | null
    recipeUrl?: StringFilter<"RecipeExtractionMetrics"> | string
    domain?: StringFilter<"RecipeExtractionMetrics"> | string
    requestTimestamp?: DateTimeFilter<"RecipeExtractionMetrics"> | Date | string
    primaryStrategy?: EnumExtractionStrategyFilter<"RecipeExtractionMetrics"> | $Enums.ExtractionStrategy
    aiProvider?: EnumAIProviderFilter<"RecipeExtractionMetrics"> | $Enums.AIProvider
    fallbackUsed?: BoolFilter<"RecipeExtractionMetrics"> | boolean
    fallbackReason?: StringNullableFilter<"RecipeExtractionMetrics"> | string | null
    totalDuration?: IntFilter<"RecipeExtractionMetrics"> | number
    htmlFetchDuration?: IntNullableFilter<"RecipeExtractionMetrics"> | number | null
    aiProcessingDuration?: IntFilter<"RecipeExtractionMetrics"> | number
    validationDuration?: IntNullableFilter<"RecipeExtractionMetrics"> | number | null
    databaseSaveDuration?: IntNullableFilter<"RecipeExtractionMetrics"> | number | null
    htmlContentSize?: IntNullableFilter<"RecipeExtractionMetrics"> | number | null
    cleanedContentSize?: IntNullableFilter<"RecipeExtractionMetrics"> | number | null
    promptTokens?: IntNullableFilter<"RecipeExtractionMetrics"> | number | null
    responseTokens?: IntNullableFilter<"RecipeExtractionMetrics"> | number | null
    totalTokens?: IntNullableFilter<"RecipeExtractionMetrics"> | number | null
    extractionSuccess?: BoolFilter<"RecipeExtractionMetrics"> | boolean
    validationErrors?: JsonNullableFilter<"RecipeExtractionMetrics">
    missingFields?: StringNullableListFilter<"RecipeExtractionMetrics">
    completenessScore?: FloatNullableFilter<"RecipeExtractionMetrics"> | number | null
    categoryConfidence?: FloatNullableFilter<"RecipeExtractionMetrics"> | number | null
    hasStructuredData?: BoolNullableFilter<"RecipeExtractionMetrics"> | boolean | null
    estimatedCost?: FloatNullableFilter<"RecipeExtractionMetrics"> | number | null
    recipeId?: StringNullableFilter<"RecipeExtractionMetrics"> | string | null
    wasOptimal?: BoolFilter<"RecipeExtractionMetrics"> | boolean
    createdAt?: DateTimeFilter<"RecipeExtractionMetrics"> | Date | string
    updatedAt?: DateTimeFilter<"RecipeExtractionMetrics"> | Date | string
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
    onboardingProgress?: UserOnboardingProgressCreateNestedManyWithoutUserInput
    extractionMetrics?: RecipeExtractionMetricsCreateNestedManyWithoutUserInput
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
    onboardingProgress?: UserOnboardingProgressUncheckedCreateNestedManyWithoutUserInput
    extractionMetrics?: RecipeExtractionMetricsUncheckedCreateNestedManyWithoutUserInput
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

  export type RecipeExtractionMetricsCreateWithoutRecipeInput = {
    id?: string
    sessionId?: string | null
    recipeUrl: string
    domain: string
    requestTimestamp?: Date | string
    primaryStrategy: $Enums.ExtractionStrategy
    aiProvider: $Enums.AIProvider
    fallbackUsed?: boolean
    fallbackReason?: string | null
    totalDuration: number
    htmlFetchDuration?: number | null
    aiProcessingDuration: number
    validationDuration?: number | null
    databaseSaveDuration?: number | null
    htmlContentSize?: number | null
    cleanedContentSize?: number | null
    promptTokens?: number | null
    responseTokens?: number | null
    totalTokens?: number | null
    extractionSuccess: boolean
    validationErrors?: NullableJsonNullValueInput | InputJsonValue
    missingFields?: RecipeExtractionMetricsCreatemissingFieldsInput | string[]
    completenessScore?: number | null
    categoryConfidence?: number | null
    hasStructuredData?: boolean | null
    estimatedCost?: number | null
    wasOptimal?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutExtractionMetricsInput
  }

  export type RecipeExtractionMetricsUncheckedCreateWithoutRecipeInput = {
    id?: string
    userId?: string | null
    sessionId?: string | null
    recipeUrl: string
    domain: string
    requestTimestamp?: Date | string
    primaryStrategy: $Enums.ExtractionStrategy
    aiProvider: $Enums.AIProvider
    fallbackUsed?: boolean
    fallbackReason?: string | null
    totalDuration: number
    htmlFetchDuration?: number | null
    aiProcessingDuration: number
    validationDuration?: number | null
    databaseSaveDuration?: number | null
    htmlContentSize?: number | null
    cleanedContentSize?: number | null
    promptTokens?: number | null
    responseTokens?: number | null
    totalTokens?: number | null
    extractionSuccess: boolean
    validationErrors?: NullableJsonNullValueInput | InputJsonValue
    missingFields?: RecipeExtractionMetricsCreatemissingFieldsInput | string[]
    completenessScore?: number | null
    categoryConfidence?: number | null
    hasStructuredData?: boolean | null
    estimatedCost?: number | null
    wasOptimal?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecipeExtractionMetricsCreateOrConnectWithoutRecipeInput = {
    where: RecipeExtractionMetricsWhereUniqueInput
    create: XOR<RecipeExtractionMetricsCreateWithoutRecipeInput, RecipeExtractionMetricsUncheckedCreateWithoutRecipeInput>
  }

  export type RecipeExtractionMetricsCreateManyRecipeInputEnvelope = {
    data: RecipeExtractionMetricsCreateManyRecipeInput | RecipeExtractionMetricsCreateManyRecipeInput[]
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
    onboardingProgress?: UserOnboardingProgressUpdateManyWithoutUserNestedInput
    extractionMetrics?: RecipeExtractionMetricsUpdateManyWithoutUserNestedInput
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
    onboardingProgress?: UserOnboardingProgressUncheckedUpdateManyWithoutUserNestedInput
    extractionMetrics?: RecipeExtractionMetricsUncheckedUpdateManyWithoutUserNestedInput
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

  export type RecipeExtractionMetricsUpsertWithWhereUniqueWithoutRecipeInput = {
    where: RecipeExtractionMetricsWhereUniqueInput
    update: XOR<RecipeExtractionMetricsUpdateWithoutRecipeInput, RecipeExtractionMetricsUncheckedUpdateWithoutRecipeInput>
    create: XOR<RecipeExtractionMetricsCreateWithoutRecipeInput, RecipeExtractionMetricsUncheckedCreateWithoutRecipeInput>
  }

  export type RecipeExtractionMetricsUpdateWithWhereUniqueWithoutRecipeInput = {
    where: RecipeExtractionMetricsWhereUniqueInput
    data: XOR<RecipeExtractionMetricsUpdateWithoutRecipeInput, RecipeExtractionMetricsUncheckedUpdateWithoutRecipeInput>
  }

  export type RecipeExtractionMetricsUpdateManyWithWhereWithoutRecipeInput = {
    where: RecipeExtractionMetricsScalarWhereInput
    data: XOR<RecipeExtractionMetricsUpdateManyMutationInput, RecipeExtractionMetricsUncheckedUpdateManyWithoutRecipeInput>
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
    extractionMetrics?: RecipeExtractionMetricsCreateNestedManyWithoutRecipeInput
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
    extractionMetrics?: RecipeExtractionMetricsUncheckedCreateNestedManyWithoutRecipeInput
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
    extractionMetrics?: RecipeExtractionMetricsUpdateManyWithoutRecipeNestedInput
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
    extractionMetrics?: RecipeExtractionMetricsUncheckedUpdateManyWithoutRecipeNestedInput
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
    onboardingProgress?: UserOnboardingProgressCreateNestedManyWithoutUserInput
    extractionMetrics?: RecipeExtractionMetricsCreateNestedManyWithoutUserInput
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
    onboardingProgress?: UserOnboardingProgressUncheckedCreateNestedManyWithoutUserInput
    extractionMetrics?: RecipeExtractionMetricsUncheckedCreateNestedManyWithoutUserInput
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
    extractionMetrics?: RecipeExtractionMetricsCreateNestedManyWithoutRecipeInput
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
    extractionMetrics?: RecipeExtractionMetricsUncheckedCreateNestedManyWithoutRecipeInput
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
    onboardingProgress?: UserOnboardingProgressUpdateManyWithoutUserNestedInput
    extractionMetrics?: RecipeExtractionMetricsUpdateManyWithoutUserNestedInput
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
    onboardingProgress?: UserOnboardingProgressUncheckedUpdateManyWithoutUserNestedInput
    extractionMetrics?: RecipeExtractionMetricsUncheckedUpdateManyWithoutUserNestedInput
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
    extractionMetrics?: RecipeExtractionMetricsUpdateManyWithoutRecipeNestedInput
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
    extractionMetrics?: RecipeExtractionMetricsUncheckedUpdateManyWithoutRecipeNestedInput
  }

  export type UserCreateWithoutOnboardingProgressInput = {
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
    extractionMetrics?: RecipeExtractionMetricsCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOnboardingProgressInput = {
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
    extractionMetrics?: RecipeExtractionMetricsUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOnboardingProgressInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOnboardingProgressInput, UserUncheckedCreateWithoutOnboardingProgressInput>
  }

  export type UserUpsertWithoutOnboardingProgressInput = {
    update: XOR<UserUpdateWithoutOnboardingProgressInput, UserUncheckedUpdateWithoutOnboardingProgressInput>
    create: XOR<UserCreateWithoutOnboardingProgressInput, UserUncheckedCreateWithoutOnboardingProgressInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOnboardingProgressInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOnboardingProgressInput, UserUncheckedUpdateWithoutOnboardingProgressInput>
  }

  export type UserUpdateWithoutOnboardingProgressInput = {
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
    extractionMetrics?: RecipeExtractionMetricsUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOnboardingProgressInput = {
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
    extractionMetrics?: RecipeExtractionMetricsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutExtractionMetricsInput = {
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
    onboardingProgress?: UserOnboardingProgressCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutExtractionMetricsInput = {
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
    onboardingProgress?: UserOnboardingProgressUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutExtractionMetricsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutExtractionMetricsInput, UserUncheckedCreateWithoutExtractionMetricsInput>
  }

  export type RecipeCreateWithoutExtractionMetricsInput = {
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

  export type RecipeUncheckedCreateWithoutExtractionMetricsInput = {
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

  export type RecipeCreateOrConnectWithoutExtractionMetricsInput = {
    where: RecipeWhereUniqueInput
    create: XOR<RecipeCreateWithoutExtractionMetricsInput, RecipeUncheckedCreateWithoutExtractionMetricsInput>
  }

  export type UserUpsertWithoutExtractionMetricsInput = {
    update: XOR<UserUpdateWithoutExtractionMetricsInput, UserUncheckedUpdateWithoutExtractionMetricsInput>
    create: XOR<UserCreateWithoutExtractionMetricsInput, UserUncheckedCreateWithoutExtractionMetricsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutExtractionMetricsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutExtractionMetricsInput, UserUncheckedUpdateWithoutExtractionMetricsInput>
  }

  export type UserUpdateWithoutExtractionMetricsInput = {
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
    onboardingProgress?: UserOnboardingProgressUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutExtractionMetricsInput = {
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
    onboardingProgress?: UserOnboardingProgressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RecipeUpsertWithoutExtractionMetricsInput = {
    update: XOR<RecipeUpdateWithoutExtractionMetricsInput, RecipeUncheckedUpdateWithoutExtractionMetricsInput>
    create: XOR<RecipeCreateWithoutExtractionMetricsInput, RecipeUncheckedCreateWithoutExtractionMetricsInput>
    where?: RecipeWhereInput
  }

  export type RecipeUpdateToOneWithWhereWithoutExtractionMetricsInput = {
    where?: RecipeWhereInput
    data: XOR<RecipeUpdateWithoutExtractionMetricsInput, RecipeUncheckedUpdateWithoutExtractionMetricsInput>
  }

  export type RecipeUpdateWithoutExtractionMetricsInput = {
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

  export type RecipeUncheckedUpdateWithoutExtractionMetricsInput = {
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

  export type UserOnboardingProgressCreateManyUserInput = {
    id?: string
    stepId: number
    stepKey: string
    completedAt?: Date | string | null
    skippedAt?: Date | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    isRequired?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RecipeExtractionMetricsCreateManyUserInput = {
    id?: string
    sessionId?: string | null
    recipeUrl: string
    domain: string
    requestTimestamp?: Date | string
    primaryStrategy: $Enums.ExtractionStrategy
    aiProvider: $Enums.AIProvider
    fallbackUsed?: boolean
    fallbackReason?: string | null
    totalDuration: number
    htmlFetchDuration?: number | null
    aiProcessingDuration: number
    validationDuration?: number | null
    databaseSaveDuration?: number | null
    htmlContentSize?: number | null
    cleanedContentSize?: number | null
    promptTokens?: number | null
    responseTokens?: number | null
    totalTokens?: number | null
    extractionSuccess: boolean
    validationErrors?: NullableJsonNullValueInput | InputJsonValue
    missingFields?: RecipeExtractionMetricsCreatemissingFieldsInput | string[]
    completenessScore?: number | null
    categoryConfidence?: number | null
    hasStructuredData?: boolean | null
    estimatedCost?: number | null
    recipeId?: string | null
    wasOptimal?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
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
    extractionMetrics?: RecipeExtractionMetricsUpdateManyWithoutRecipeNestedInput
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
    extractionMetrics?: RecipeExtractionMetricsUncheckedUpdateManyWithoutRecipeNestedInput
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

  export type UserOnboardingProgressUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepId?: IntFieldUpdateOperationsInput | number
    stepKey?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    skippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    isRequired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserOnboardingProgressUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepId?: IntFieldUpdateOperationsInput | number
    stepKey?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    skippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    isRequired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserOnboardingProgressUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    stepId?: IntFieldUpdateOperationsInput | number
    stepKey?: StringFieldUpdateOperationsInput | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    skippedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    isRequired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeExtractionMetricsUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    recipeUrl?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    requestTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    primaryStrategy?: EnumExtractionStrategyFieldUpdateOperationsInput | $Enums.ExtractionStrategy
    aiProvider?: EnumAIProviderFieldUpdateOperationsInput | $Enums.AIProvider
    fallbackUsed?: BoolFieldUpdateOperationsInput | boolean
    fallbackReason?: NullableStringFieldUpdateOperationsInput | string | null
    totalDuration?: IntFieldUpdateOperationsInput | number
    htmlFetchDuration?: NullableIntFieldUpdateOperationsInput | number | null
    aiProcessingDuration?: IntFieldUpdateOperationsInput | number
    validationDuration?: NullableIntFieldUpdateOperationsInput | number | null
    databaseSaveDuration?: NullableIntFieldUpdateOperationsInput | number | null
    htmlContentSize?: NullableIntFieldUpdateOperationsInput | number | null
    cleanedContentSize?: NullableIntFieldUpdateOperationsInput | number | null
    promptTokens?: NullableIntFieldUpdateOperationsInput | number | null
    responseTokens?: NullableIntFieldUpdateOperationsInput | number | null
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null
    extractionSuccess?: BoolFieldUpdateOperationsInput | boolean
    validationErrors?: NullableJsonNullValueInput | InputJsonValue
    missingFields?: RecipeExtractionMetricsUpdatemissingFieldsInput | string[]
    completenessScore?: NullableFloatFieldUpdateOperationsInput | number | null
    categoryConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    hasStructuredData?: NullableBoolFieldUpdateOperationsInput | boolean | null
    estimatedCost?: NullableFloatFieldUpdateOperationsInput | number | null
    wasOptimal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipe?: RecipeUpdateOneWithoutExtractionMetricsNestedInput
  }

  export type RecipeExtractionMetricsUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    recipeUrl?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    requestTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    primaryStrategy?: EnumExtractionStrategyFieldUpdateOperationsInput | $Enums.ExtractionStrategy
    aiProvider?: EnumAIProviderFieldUpdateOperationsInput | $Enums.AIProvider
    fallbackUsed?: BoolFieldUpdateOperationsInput | boolean
    fallbackReason?: NullableStringFieldUpdateOperationsInput | string | null
    totalDuration?: IntFieldUpdateOperationsInput | number
    htmlFetchDuration?: NullableIntFieldUpdateOperationsInput | number | null
    aiProcessingDuration?: IntFieldUpdateOperationsInput | number
    validationDuration?: NullableIntFieldUpdateOperationsInput | number | null
    databaseSaveDuration?: NullableIntFieldUpdateOperationsInput | number | null
    htmlContentSize?: NullableIntFieldUpdateOperationsInput | number | null
    cleanedContentSize?: NullableIntFieldUpdateOperationsInput | number | null
    promptTokens?: NullableIntFieldUpdateOperationsInput | number | null
    responseTokens?: NullableIntFieldUpdateOperationsInput | number | null
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null
    extractionSuccess?: BoolFieldUpdateOperationsInput | boolean
    validationErrors?: NullableJsonNullValueInput | InputJsonValue
    missingFields?: RecipeExtractionMetricsUpdatemissingFieldsInput | string[]
    completenessScore?: NullableFloatFieldUpdateOperationsInput | number | null
    categoryConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    hasStructuredData?: NullableBoolFieldUpdateOperationsInput | boolean | null
    estimatedCost?: NullableFloatFieldUpdateOperationsInput | number | null
    recipeId?: NullableStringFieldUpdateOperationsInput | string | null
    wasOptimal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeExtractionMetricsUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    recipeUrl?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    requestTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    primaryStrategy?: EnumExtractionStrategyFieldUpdateOperationsInput | $Enums.ExtractionStrategy
    aiProvider?: EnumAIProviderFieldUpdateOperationsInput | $Enums.AIProvider
    fallbackUsed?: BoolFieldUpdateOperationsInput | boolean
    fallbackReason?: NullableStringFieldUpdateOperationsInput | string | null
    totalDuration?: IntFieldUpdateOperationsInput | number
    htmlFetchDuration?: NullableIntFieldUpdateOperationsInput | number | null
    aiProcessingDuration?: IntFieldUpdateOperationsInput | number
    validationDuration?: NullableIntFieldUpdateOperationsInput | number | null
    databaseSaveDuration?: NullableIntFieldUpdateOperationsInput | number | null
    htmlContentSize?: NullableIntFieldUpdateOperationsInput | number | null
    cleanedContentSize?: NullableIntFieldUpdateOperationsInput | number | null
    promptTokens?: NullableIntFieldUpdateOperationsInput | number | null
    responseTokens?: NullableIntFieldUpdateOperationsInput | number | null
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null
    extractionSuccess?: BoolFieldUpdateOperationsInput | boolean
    validationErrors?: NullableJsonNullValueInput | InputJsonValue
    missingFields?: RecipeExtractionMetricsUpdatemissingFieldsInput | string[]
    completenessScore?: NullableFloatFieldUpdateOperationsInput | number | null
    categoryConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    hasStructuredData?: NullableBoolFieldUpdateOperationsInput | boolean | null
    estimatedCost?: NullableFloatFieldUpdateOperationsInput | number | null
    recipeId?: NullableStringFieldUpdateOperationsInput | string | null
    wasOptimal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type RecipeExtractionMetricsCreateManyRecipeInput = {
    id?: string
    userId?: string | null
    sessionId?: string | null
    recipeUrl: string
    domain: string
    requestTimestamp?: Date | string
    primaryStrategy: $Enums.ExtractionStrategy
    aiProvider: $Enums.AIProvider
    fallbackUsed?: boolean
    fallbackReason?: string | null
    totalDuration: number
    htmlFetchDuration?: number | null
    aiProcessingDuration: number
    validationDuration?: number | null
    databaseSaveDuration?: number | null
    htmlContentSize?: number | null
    cleanedContentSize?: number | null
    promptTokens?: number | null
    responseTokens?: number | null
    totalTokens?: number | null
    extractionSuccess: boolean
    validationErrors?: NullableJsonNullValueInput | InputJsonValue
    missingFields?: RecipeExtractionMetricsCreatemissingFieldsInput | string[]
    completenessScore?: number | null
    categoryConfidence?: number | null
    hasStructuredData?: boolean | null
    estimatedCost?: number | null
    wasOptimal?: boolean
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

  export type RecipeExtractionMetricsUpdateWithoutRecipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    recipeUrl?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    requestTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    primaryStrategy?: EnumExtractionStrategyFieldUpdateOperationsInput | $Enums.ExtractionStrategy
    aiProvider?: EnumAIProviderFieldUpdateOperationsInput | $Enums.AIProvider
    fallbackUsed?: BoolFieldUpdateOperationsInput | boolean
    fallbackReason?: NullableStringFieldUpdateOperationsInput | string | null
    totalDuration?: IntFieldUpdateOperationsInput | number
    htmlFetchDuration?: NullableIntFieldUpdateOperationsInput | number | null
    aiProcessingDuration?: IntFieldUpdateOperationsInput | number
    validationDuration?: NullableIntFieldUpdateOperationsInput | number | null
    databaseSaveDuration?: NullableIntFieldUpdateOperationsInput | number | null
    htmlContentSize?: NullableIntFieldUpdateOperationsInput | number | null
    cleanedContentSize?: NullableIntFieldUpdateOperationsInput | number | null
    promptTokens?: NullableIntFieldUpdateOperationsInput | number | null
    responseTokens?: NullableIntFieldUpdateOperationsInput | number | null
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null
    extractionSuccess?: BoolFieldUpdateOperationsInput | boolean
    validationErrors?: NullableJsonNullValueInput | InputJsonValue
    missingFields?: RecipeExtractionMetricsUpdatemissingFieldsInput | string[]
    completenessScore?: NullableFloatFieldUpdateOperationsInput | number | null
    categoryConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    hasStructuredData?: NullableBoolFieldUpdateOperationsInput | boolean | null
    estimatedCost?: NullableFloatFieldUpdateOperationsInput | number | null
    wasOptimal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutExtractionMetricsNestedInput
  }

  export type RecipeExtractionMetricsUncheckedUpdateWithoutRecipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    recipeUrl?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    requestTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    primaryStrategy?: EnumExtractionStrategyFieldUpdateOperationsInput | $Enums.ExtractionStrategy
    aiProvider?: EnumAIProviderFieldUpdateOperationsInput | $Enums.AIProvider
    fallbackUsed?: BoolFieldUpdateOperationsInput | boolean
    fallbackReason?: NullableStringFieldUpdateOperationsInput | string | null
    totalDuration?: IntFieldUpdateOperationsInput | number
    htmlFetchDuration?: NullableIntFieldUpdateOperationsInput | number | null
    aiProcessingDuration?: IntFieldUpdateOperationsInput | number
    validationDuration?: NullableIntFieldUpdateOperationsInput | number | null
    databaseSaveDuration?: NullableIntFieldUpdateOperationsInput | number | null
    htmlContentSize?: NullableIntFieldUpdateOperationsInput | number | null
    cleanedContentSize?: NullableIntFieldUpdateOperationsInput | number | null
    promptTokens?: NullableIntFieldUpdateOperationsInput | number | null
    responseTokens?: NullableIntFieldUpdateOperationsInput | number | null
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null
    extractionSuccess?: BoolFieldUpdateOperationsInput | boolean
    validationErrors?: NullableJsonNullValueInput | InputJsonValue
    missingFields?: RecipeExtractionMetricsUpdatemissingFieldsInput | string[]
    completenessScore?: NullableFloatFieldUpdateOperationsInput | number | null
    categoryConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    hasStructuredData?: NullableBoolFieldUpdateOperationsInput | boolean | null
    estimatedCost?: NullableFloatFieldUpdateOperationsInput | number | null
    wasOptimal?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecipeExtractionMetricsUncheckedUpdateManyWithoutRecipeInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    recipeUrl?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    requestTimestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    primaryStrategy?: EnumExtractionStrategyFieldUpdateOperationsInput | $Enums.ExtractionStrategy
    aiProvider?: EnumAIProviderFieldUpdateOperationsInput | $Enums.AIProvider
    fallbackUsed?: BoolFieldUpdateOperationsInput | boolean
    fallbackReason?: NullableStringFieldUpdateOperationsInput | string | null
    totalDuration?: IntFieldUpdateOperationsInput | number
    htmlFetchDuration?: NullableIntFieldUpdateOperationsInput | number | null
    aiProcessingDuration?: IntFieldUpdateOperationsInput | number
    validationDuration?: NullableIntFieldUpdateOperationsInput | number | null
    databaseSaveDuration?: NullableIntFieldUpdateOperationsInput | number | null
    htmlContentSize?: NullableIntFieldUpdateOperationsInput | number | null
    cleanedContentSize?: NullableIntFieldUpdateOperationsInput | number | null
    promptTokens?: NullableIntFieldUpdateOperationsInput | number | null
    responseTokens?: NullableIntFieldUpdateOperationsInput | number | null
    totalTokens?: NullableIntFieldUpdateOperationsInput | number | null
    extractionSuccess?: BoolFieldUpdateOperationsInput | boolean
    validationErrors?: NullableJsonNullValueInput | InputJsonValue
    missingFields?: RecipeExtractionMetricsUpdatemissingFieldsInput | string[]
    completenessScore?: NullableFloatFieldUpdateOperationsInput | number | null
    categoryConfidence?: NullableFloatFieldUpdateOperationsInput | number | null
    hasStructuredData?: NullableBoolFieldUpdateOperationsInput | boolean | null
    estimatedCost?: NullableFloatFieldUpdateOperationsInput | number | null
    wasOptimal?: BoolFieldUpdateOperationsInput | boolean
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