NEJ.define([
  'base/chain',
  'base/klass',
  'base/element',
  'base/event',
  'util/dispatcher/module',
  'util/template/tpl',
  'util/template/jst',
  'util/cache/storage',
  'ui/item/list',
  'text!./index.html',
  'text!./index.css'
], function($, _klass, _element, _event, _module, _tpl, _jst, _storage, _list, _html, _css, _p) {

  _p._$$ModuleItem = _klass._$klass()
  var _pro = _p._$$ModuleItem._$extend(_list._$$ListItem)

  // 初始化外观
  // 此过程只会在控件第一次创建时进入
  _pro.__initXGui = (function(){
    var _seed_css = _element._$pushCSSText(_css),
      _seed_html = _tpl._$addNodeTemplate(_html)
    return function(){
      this.__seed_css = _seed_css
      this.__seed_html = _seed_html
    }
  })()

  // 初始化结构
  // 此过程只会在控件第一次创建时进入
  _pro.__initNode = function() {
    this.__super()
    // 0 - 完成按钮
    // 1 - todo内容
    // 2 - 修改&删除
    var _els = _element._$getByClassName(this.__body, 'section')
    var _btns = _element._$getChildren(_els[2])
    this.__nindex = _els[0]
    this.__ntitle = _els[1]
    this.__ndel = _btns[0]
    // 事件
    _event._$addEvent(
      _els[0],
      'click',
      this.__onAction._$bind(this),
      false
    )
    _event._$addEvent(
      _btns[0], // delete btn
      'click',
      this.__onAction._$bind(this),
      false
    )
  }

  // 刷新
  _pro.__doRefresh = function(_data) {
    
    this.__data = _data
    this.__ntitle.innerHTML = _data.title

    this._setCompletedStatus(_data.completed)

    var dataInStorage = _storage._$getDataInStorage('todo-' + _data.id)
    if(!dataInStorage) {
      // 存入 localstorage
      _storage._$setDataInStorage('todo-' + _data.id, _data)
      // todos 更新
      var todos = _storage._$getDataInStorage('todos')
      todos.push(_data.id)
      _storage._$setDataInStorage('todos', todos)
    }
    
  }

  // 操作
  _pro.__onAction = function(_actionEvent) {
    var _node = _event._$getElement(_actionEvent)
    if (!_node) return
    if(_actionEvent.type === 'click') {
      switch(_node) {
        case this.__nindex: {
          // complete
          var _nextStatus = !this.__data.completed
          this.__data.completed = _nextStatus

          _storage._$setDataInStorage('todo-' + this.__data.id, this.__data)

          this._setCompletedStatus(_nextStatus)
          this._$dispatchEvent('ontoggle', this)
          break
        }
        case this.__ndel: {
          // del
          var _id = this.__data.id

          this._delTodoItemInStorage(_id)
          this._$dispatchEvent('onaftercycle', this)

          this._$recycle()
          break
        }
      }
    }
  }

  _pro._setCompletedStatus = function(_completed) {
    if(_completed) {
      _element._$replaceClassName(this.__nindex, 'z-index-completed-no', 'z-index-completed-ok')
      _element._$replaceClassName(this.__ntitle, 'z-item-completed-no', 'z-item-completed-ok')
    } else {
      _element._$replaceClassName(this.__nindex, 'z-index-completed-ok', 'z-index-completed-no')
      _element._$replaceClassName(this.__ntitle, 'z-item-completed-ok', 'z-item-completed-no')
    }
  }

  _pro._delTodoItemInStorage = function(_id) {
    // 删除 todo item 后更新数据
    var _idIndex
    var todos = _storage._$getDataInStorage('todos')
    // 更新 localstorage todos
    
    // es6
    // _idIndex = todos.findIndex(id => id === _id)

    // todos.forEach(function(id, i) {
    //   if(id === _id) _idIndex = i
    // })
    // if(_idIndex > -1) todos.splice(_idIndex, 1)
    
    for(var i = 0; i < todos.length; i++) {
      if(todos[i] === _id) {
        todos.splice(i, 1)
        break
      }
    }

    _storage._$delDataInStorage('todo-' + _id)
    _storage._$setDataInStorage('todos', todos)
  }

  _pro._$updateTodoItem = function(_data) {
    // 当 icon 被点击时 (event: ontoggle) 触发
    _storage._$setDataInStorage('todo-' + _data.id, _data)
    this.__doRefresh(_data)
  }

  return _p
})