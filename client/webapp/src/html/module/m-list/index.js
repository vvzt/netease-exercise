NEJ.define([
  'base/klass',
  'base/element',
  'util/dispatcher/module',
  'util/template/tpl',
], function(_klass, _element, _module, _tpl, _p) {
  
  _p._$$ModuleList = _klass._$klass()
  var _pro = _p._$$ModuleList._$extend(_module._$$ModuleAbstract)
  
  _pro.__doBuild = function() {
    this.__body = _element._$html2node(_tpl._$getTextTemplate('m-list'))
  }

  _pro.__onShow = function(_options) {
    this.__super(_options)
  }

  _module._$regist('todo-list', _p._$$ModuleList)
  return _p
})