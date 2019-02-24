NEJ.define([
  'base/element',
  'base/klass',
  'base/event',
  'util/dispatcher/module',
  'util/template/jst',
  'util/template/tpl',
  'util/clipboard/clipboard',
], function(_element, _klass, _event, _module, _jst, _tpl, _clipboard, _p) {
  
  _p._$$ModuleTip = _klass._$klass()
  var _pro = _p._$$ModuleTip._$extend(_module._$$ModuleAbstract)

  _pro.__doBuild = function() {
    this.__super()
    this.__body = _element._$html2node(_tpl._$getTextTemplate('m-tip-container'))
    this.__data = { id: null }
    _jst._$add('m-tip-template')

    _clipboard._$copy('user-id-copye-btn', this.__data.id)
    _event._$addEvent('user-id-copye-btn', 'click', function() {
      console.log(1)
    })
  }

  _pro.__onRefresh = function(_data) {
    this.__super(_data)
    if(_data.id) {
      if(!this.__body) this.__body = _element._$html2node(_tpl._$getTextTemplate('m-tip-container'))
      this.__body.innerHTML = _jst._$get('m-tip-template', _data)
    }
  }

  _pro.__onShow = function(_options) {
    this.__super(_options)
  }

  _pro.__onMessage = function(_msgEvent) {
    if(_msgEvent.from === '/todo/list') {
      var data = _msgEvent.data
      this.__data.id = data.id
      this.__events.onrefresh(this.__data)
    }
    console.log('_msgEvent', _msgEvent)
  }

  _module._$regist('todo-tip', _p._$$ModuleTip)
  return _p
})