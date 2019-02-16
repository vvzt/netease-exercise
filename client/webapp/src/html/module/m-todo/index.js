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
    this.__isAllCompleted = false // 全选
    this.__body = _element._$html2node(_tpl._$getTextTemplate('m-todo'))

    // 读取数据
    var _todosInStorage = _storage._$getDataInStorageWithDefault('todos', [])
    var _todosArr = this.__todos = _todosInStorage.map(function(todoId) {
      return _storage._$getDataInStorage('todo-' + todoId)
    })
    // console.log(_todosInStorage)

    var that = this
    var _todoList = _tpl._$getItemTemplate(
      _todosArr,
      _mlist._$$ModuleItem,
      {
        parent: 'm-list',
        onaftercycle: function(_item) {
          var _itemIndex
          that.__list.forEach(function(item, i) {
            if(item === _item) _itemIndex = i
          })
          if(_itemIndex > -1) that.__list.splice(_itemIndex, 1)
        }
      }
    )
    this.__list = _todoList
  }

  _pro.__onShow = function(_options) {
    this.__super(_options)
    var that = this
    var el_input = _element._$getByClassName(this.__body, 'u-input')[0]
    var el_icon = _element._$getByClassName(this.__body, 'u-icon')[0]
    
    _event._$addEvent(el_input, 'enter', function(_actionEvent) {
      // 新增 todo
      var val = this.value
      this.value = ''
      that.__events.onrefresh({
        todo: {
          id: Date.now(),
          title: val,
          completed: false,
          date: Date.now(),
        }
      })
    }, false)

    _event._$addEvent(el_icon, 'click', function(_actionEvent) {
      // 全选
      var _isAllCompleted = !that.__isAllCompleted
      that.__isAllCompleted = _isAllCompleted

      // 修改样式先
      if(_isAllCompleted) {
        _element._$addClassName(el_icon, 'u-icon-active')
      } else {
        _element._$replaceClassName(el_icon, 'u-icon-active', '')
      }

      // 更新 todo item 组件
      that.__list.forEach(function(item) {
        item.__data.completed = _isAllCompleted
        item._$updateTodoItem(item.__data)
      })
      
    })
  }

  _pro.__onRefresh = function(_data) {
    this.__super(_data)
    if(_data.todo) {
      // add
      this.__list.push(_tpl._$getItemTemplate(
        [
          _data.todo
        ],
        _mlist._$$ModuleItem,
        {
          parent: 'm-list',
          onchangestatus: function(_data) {},
          ondelete: function(_data) {},
        }
      )[0])
    }
  }

  _module._$regist('todo-list', _p._$$ModuleList)
  return _p
})