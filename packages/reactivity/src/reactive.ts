import { isObject } from '@vue/shared'

import {
  mutableHandlers,
  shallowReactiveHandlers,
  readonlyHandlers,
  shallowReadonlyHandlers
} from './baseHandler'

import { ReactiveFlag } from './constant'

export interface Target {
  [ReactiveFlag.SKIP]?: Boolean
  [ReactiveFlag.IS_REACTIVE]?: Boolean
  [ReactiveFlag.IS_READONLY]?: Boolean
  [ReactiveFlag.IS_SHALLOW]?: Boolean
  [ReactiveFlag.RAW]?: Boolean
}

// weakMap map
// 1.键的类型 map的键的类型可以是任意类型 weakMap只接受对象（null除外）和symbol值作为键名
// 2.垃圾回收 map中键的引用是强引用 weakMap键引用的对象是弱引用，只要所引用的对象的其他引用都被清除，垃圾回收就会释放该对象占用的内存，weakMap中的键名对象和所对应的键值都会删除
// 3.枚举性 weakMap没有遍历方法不可枚举

// 不是很清楚声明的类型
export const reactiveMap: WeakMap<Target, any> = new WeakMap<Target, any>()
export const shallowReactiveMap = new WeakMap()

export const readonlyMap = new WeakMap()
export const shallowReadonlyMap = new WeakMap()

let mutableCollectionHandlers
// 创建响应式对象
export function reactive(target) {
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  )
}

// 创建浅层响应式对象
export function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    mutableCollectionHandlers,
    shallowReactiveMap
  )
}

export function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    mutableCollectionHandlers,
    readonlyMap
  )
}

export function shallowReadonly(target) {
  return createReactiveObject(
    target,
    true,
    shallowReadonlyHandlers,
    mutableCollectionHandlers,
    shallowReadonlyMap
  )
}

function createReactiveObject(
  target: Target,
  isReadonly: Boolean,
  basehandler: ProxyHandler<any>,
  collectionHandlers: ProxyHandler<any>,
  proxyMap: WeakMap<Target, any>
) {
  if (!isObject(target)) {
    console.log('当前target不是对象')

    return target
  }

  const proxy = new Proxy(target, basehandler)
  return proxy
}
