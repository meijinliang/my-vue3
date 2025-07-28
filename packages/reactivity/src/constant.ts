
// 触发依赖收集的类型
export enum TrackOpTypes {
  GET = 'get',
  HAS = 'has',
  ITERATE = 'iterate'
}

// 触发依赖更新的类型
export enum TriggerOpTypes {
  ADD = 'add',
  SET = 'set',
  CLEAR = 'clear',
  DELETE = 'delete'
}

export enum ReactiveFlag {
  SKIP = '__v_skip',
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
  IS_SHALLOW = '__v_isShallow',
  RAW = '__v_raw',
  IS_REF = '__v_isRef'
}