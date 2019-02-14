NEJ.define([
  'base/klass',
  'base/element',
  'base/event',
  'util/dispatcher/module',
  'util/template/tpl',
  'util/template/jst',
  '../m-list/index.js'
], function(_klass, _element, _event, _module, _tpl, _jst, _mlist, _p) {
  
  _p._$$ModuleList = _klass._$klass()
  var _pro = _p._$$ModuleList._$extend(_module._$$ModuleAbstract)
  
  _pro.__doBuild = function() {
    this.__body = _element._$html2node(_tpl._$getTextTemplate('m-todo'))

    // var _templateSeed = _jst._$add('m-list-template')

    // _jst._$get(_templateSeed, {
    //   test: 123
    // })
    
    // _mlist._$$ModuleList._$allocate({
    //   parent: this.__body,
    //   clazz: 'ttt'
    // })

    var _todoList = _tpl._$getItemTemplate(
      [
        { id: 'asfasf', title: 'true', isCompleted: true },
        { id: 'asjdiaw', title: 'false', isCompleted: false }
      ],
      _mlist._$$ModuleList,
      {
        parent: 'm-list',
        onchangestatus: function(_data) {},
        ondelete: function(_data) {},
      }
    )
    this.__list = _todoList
    console.log('_todoList: ', _todoList)

    // _jst._$render('m-list', _todoList, {
    //   test: 222
    // })
    

  }

  _pro.__onShow = function(_options) {
    this.__super(_options)
    var that = this
    var el_input = _element._$getByClassName(this.__body, 'u-input')[0]
    _event._$addEvent(el_input, 'enter', function(_actionEvent) {
      console.log(_actionEvent, 'onenter')
      // onenter todo 
    }, false)
  }

  _pro.__onRefresh = function(_options) {
    this.__super(_options)
  }

  _module._$regist('todo-list', _p._$$ModuleList)
  return _p
})