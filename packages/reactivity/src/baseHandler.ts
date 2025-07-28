import { type Target } from './reactive'
import { ReactiveFlag } from './constant'

// BaseReactiveHandler的类的实现通过ProxyHandler内置的，泛型使用Target是为什么
class BaseReactiveHandler implements ProxyHandler<Target> {
  /**
   * protected 属性只能在当前类及其子类中使用（外部不可直接访问）
   * readonly 属性初始化后不可修改（编译时会报错）
   * protected readonly 既保护属性不被外部篡改，又允许子类灵活扩展逻辑。
   * @param _isReadonly 标记对象是否只读（禁止修改）
   * @param _isShallow 标记是否为浅响应（不递归代理嵌套对象）
   */
  constructor(
    protected readonly _isReadonly = false,
    protected readonly _isShallow = false
  ) {}
  get(target: Target, key: string | symbol, recevier: object) {
    const isShallow = this._isShallow
    const isReadonly = this._isReadonly

    // 读取vue内置的私有属性
    if (key === ReactiveFlag.IS_REACTIVE) {
      return !isReadonly
    } else if (key === ReactiveFlag.IS_READONLY) {
      return isReadonly
    } else if (key === ReactiveFlag.IS_SHALLOW) {
      return isShallow
    }
    const result = Reflect.get(target, key, recevier)
    return result
  }
}

class MutableHandlers extends BaseReactiveHandler {
  constructor(isShallow = false) {
    super(false, isShallow)
  }
  set(
    target: Record<string | symbol, unknown>,
    key: string | symbol,
    value: unknown,
    recevier: object
  ): boolean {
    const result = Reflect.set(target, key, value, recevier)
    return result
  }
  deleteProperty(
    target: Record<string | symbol, unknown>,
    key: string | symbol
  ): boolean {
    return Reflect.deleteProperty(target, key)
  }
  has(target: Record<string | symbol, unknown>, key: string | symbol): boolean {
    return Reflect.has(target, key)
  }
  ownKeys(target: Record<string | symbol, unknown>): ArrayLike<any> {
    return Reflect.ownKeys(target)
  }
}

class ReadonlyHandlers extends BaseReactiveHandler {
  constructor(isShallow = false) {
    super(true, isShallow)
  }
  set() {}
  deleteProperty() {}
}

export const mutableHandlers = new MutableHandlers()
export const shallowReactiveHandlers = new MutableHandlers(true)

export const readonlyHandlers = new ReadonlyHandlers()
export const shallowReadonlyHandlers = new ReadonlyHandlers(true)
