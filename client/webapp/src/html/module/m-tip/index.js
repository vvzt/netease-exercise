NEJ.define([
  'base/element',
  'base/klass',
  'util/dispatcher/module',
  'util/template/jst',
], function(_element, _klass, _module, _jst, _p) {
  
  _p._$$ModuleTip = _klass._$klass()
  var _pro = _p._$$ModuleTip._$extend(_module._$$ModuleAbstract)

  _pro.__doBuild = function() {
    this.__super()
  }

  _module._$regist('todo-tip', _p._$$ModuleTip)
  return _p
})