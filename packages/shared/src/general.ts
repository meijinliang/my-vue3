export const NOOP = (): void => {}

const hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * keyof typeof 获取target对象的所有键的联合类型
 *
 */
export const hasOwn = (
  target: Object,
  key: string | symbol
): key is keyof typeof target => hasOwnProperty.call(target, key)

// 看不太懂ts类型的作用 但是知道这个的作用应该等价于 const isArray = Array.isArray
export const isArray: typeof Array.isArray = Array.isArray

export const isMap = (val: unknown): val is Map<any, any> =>
  toTypeString(val) === '[object Map]'
export const isSet = (val: unknown): val is Set<any> =>
  toTypeString(val) === '[object Set]'

export const isDate = (val: unknown): val is Date =>
  toTypeString(val) === '[object Date]'
export const isRegExp = (val: unknown): val is RegExp =>
  toTypeString(val) === '[object RegExp]'
export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function'
/**
 * val: unknown 传入的值任意类型
 * : val is string 函数返回的结果类型 is关键字
 */
export const isString = (val: unknown): val is string => typeof val === 'string'

export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'

export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'

// 判断传入的值是否是整数
export const isIntegerKey = (key: unknown): boolean =>
  isString(key) &&
  key !== 'NAN' &&
  key[0] !== '-' &&
  '' + parseInt(key, 10) === key

export const hasChanged = (value: any, oldValue: any): boolean => {
  return !Object.is(value, oldValue)
}

export const objectToString: typeof Object.prototype.toString =
  Object.prototype.toString

export const toTypeString = (value: unknown): string =>
  objectToString.call(value)

export const toRawType = (value: unknown): string =>
  toTypeString(value).slice(8, -1)

export const isPlainObject = (value: unknown): boolean =>
  toTypeString(value) === '[object Object]'
