NEJ.define([
  'base/klass',
  'base/element',
  'base/event',
  'util/dispatcher/module',
  'util/template/tpl',
  'util/template/jst',
  'util/cache/storage',
  '../m-item/index.js'
], function(_klass, _element, _event, _module, _tpl, _jst, _storage, _mlist, _p) {

  _p._$$ModuleList = _klass._$klass()
  var _pro = _p._$$ModuleList._$extend(_module._$$ModuleAbstract)

  _pro.__doBuild = function() {
    this.__body = _element._$html2node(_tpl._$getTextTemplate('m-todo'))

    var todosInStorage = _storage._$getDataInStorageWithDefault('todos', [])
    var defaultTodos = todosInStorage.map(function(todoId) {
      return _storage._$getDataInStorage(todoId)
    }) || [
      { id: 'asfasf', title: 'true', isCompleted: true },
      { id: 'asjdiaw', title: 'false', isCompleted: false }
    ]

    var _todoList = _tpl._$getItemTemplate(
      defaultTodos,
      _mlist._$$ModuleItem,
      {
        parent: 'm-list',
        onchangestatus: function(_data) {},
        ondelete: function(_data) {},
      }
    )
    this.__list = _todoList

  }

  _pro.__onShow = function(_options) {
    this.__super(_options)
    var that = this
    var el_input = _element._$getByClassName(this.__body, 'u-input')[0]
    
    _event._$addEvent(el_input, 'enter', function(_actionEvent) {
      // 新增 todo
      var val = this.value
      this.value = ''
      that.__events.onrefresh({
        todo: {
          id: 'tempid-' + Date.now(),
          title: val
        }
      })
    }, false)
  }

  _pro.__onRefresh = function(_data) {
    this.__super(_data)
    console.log(1, 'onrefresh', _data)
    if(_data.todo) {
      // add
      _tpl._$getItemTemplate(
        [
          _data.todo
        ],
        _mlist._$$ModuleItem,
        {
          parent: 'm-list',
          onchangestatus: function(_data) {},
          ondelete: function(_data) {},
        }
      )
    }
  }

  _module._$regist('todo-list', _p._$$ModuleList)
  return _p
})