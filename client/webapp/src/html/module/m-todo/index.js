NEJ.define([
  'base/klass',
  'base/element',
  'base/event',
  'util/dispatcher/module',
  'util/template/tpl',
  'util/template/jst',
  'util/cache/storage',
  'util/ajax/rest',
  '../m-item/index.js',
  '../m-tip/index.js',
], function(_klass, _element, _event, _module, _tpl, _jst, _storage, _ajax, _mlist, _mtip, _p) {
  var _todoItemConfObj
  var _children // 0 - icon , 1 - title, 2 - [ delbtn ]

  _p._$$ModuleList = _klass._$klass()
  var _pro = _p._$$ModuleList._$extend(_module._$$ModuleAbstract)

  _pro.__doBuild = function() {
    
    // 获取用户 todo 数据 or 注册用户
    var userId = this._checkUserToken()

    this.__isAllCompleted // 全选
    this.__body = _element._$html2node(_tpl._$getTextTemplate('m-todo'))
    _children = this.__body.children

    // 读取数据
    var _todosInStorage = _storage._$getDataInStorageWithDefault('todos', [])
    var _todosArr = this.__todos = _todosInStorage.map(function(todoId) { return _storage._$getDataInStorage('todo-' + todoId) })

    // tip
    this.__mtip = _element._$get('m-tip')
    var _htmlSeed = _jst._$add('template-tip')
    var _html = _jst._$get('template-tip', { id: userId })
    this.__mtip.innerHTML = _html

    // todo list
    var that = this
    _todoItemConfObj =  {
      parent: 'm-list',
      onaftercycle: function(_item) {
        // 从 that.__list 中移除 todo item
        // var _itemIndex
        // that.__list.forEach(function(item, i) {
        //   if(item === _item) _itemIndex = i
        // })
        // if(_itemIndex > -1) that.__list.splice(_itemIndex, 1)
        for(var i = 0; i < that.__list.length; i++) {
          if(that.__list[i] === _item) {
            that.__list.splice(i, 1)
            break
          }
        }
        that._checkAllCompletedStatus()
      },
      ontoggle: function(_item) {
        that._checkAllCompletedStatus()
      }
    }
    var _todoList = _tpl._$getItemTemplate(_todosArr, _mlist._$$ModuleItem, _todoItemConfObj)
    this.__list = _todoList

    // icon 的初始状态
    this._checkAllCompletedStatus()
  }

  _pro.__onShow = function(_options) {
    this.__super(_options)
    var that = this
    var el_icon = _children[0]
    var el_input =_children[1]
    
    _event._$addEvent(el_input, 'enter', function(_actionEvent) {
      // 新增 todo
      if(this.value.length === 0) return
      that.__events.onrefresh({
        todo: {
          id: Date.now(),
          title: this.value,
          completed: false,
          date: Date.now(),
        }
      })
      this.value = ''
    }, false)

    _event._$addEvent(el_icon, 'click', function(_actionEvent) {
      // 修改 icon 状态
      var _isAllCompleted = !that.__isAllCompleted
      that.__isAllCompleted = _isAllCompleted

      // 修改样式先
      that._setIconClass(el_icon, _isAllCompleted)

      // 更新 todo item 组件
      that.__list.forEach(function(item) {
        item.__data.completed = _isAllCompleted
        item._$updateTodoItem(item.__data)
      })
      
    })
  }

  _pro.__onRefresh = function(_data) {console.log(_data)
    this.__super(_data)
    if(_data.todo) {
      // add
      this.__list.push(_tpl._$getItemTemplate([ _data.todo ], _mlist._$$ModuleItem, _todoItemConfObj)[0])
      this._setIconClass(_children[0], this.__isAllCompleted = false)
    }
  }

  _pro._setIconClass = function(el_icon, _isAllCompleted) {
    // 修改 icon 样式
    if(_isAllCompleted) {
      _element._$addClassName(el_icon, 'u-icon-active')
    } else {
      _element._$replaceClassName(el_icon, 'u-icon-active', '')
    }
  }

  _pro._checkAllCompletedStatus = function() {
    // 修改 icon 状态
    var isAllCompleted = this.__list.length > 0 && this.__list.every(function(todoItem) { return todoItem.__data.completed })
    this._setIconClass(_children[0], this.__isAllCompleted = isAllCompleted)
  }

  _pro._checkUserToken = function() {
    // _event._$addEvent(window, 'resterror', function(_error) {
    //   console.log(_error)
    // })
    var url = window.NEJ_CONF.api + '/users'
    var userId = _storage._$getDataInStorage('user-id')
    var requestParam = userId ? { id: userId } : {}
    _ajax._$request(url, {
      sync: true,
      param: requestParam,
      method: 'get',
      onload: function(_data) {
        // 请求正常回调
        userId = _data.result.id
        _storage._$setDataInStorage('user-id', userId)
      },
      onerror: function(_error) {
        _element._$get('app').innerHTML = '无法连接到服务器...'
      },
      onbeforerequest: function(_event) {
        // _event.request
        // _event.headers
      }
    })
    return userId
  }

  _module._$regist('todo-list', _p._$$ModuleList)
  return _p
})