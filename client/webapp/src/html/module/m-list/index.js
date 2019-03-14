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
], function(_klass, _element, _event, _module, _tpl, _jst, _storage, _ajax, _mlist, _p) {
  var _todoItemConfObj
  var _children // 0 - icon , 1 - title, 2 - [ delbtn ]
  var _userRequestUrl = window.NEJ_CONF.api + '/users'
  var _userTodoRequestUrl // <SERVER-PATH>/user/:userId/todo
  var _userPersonalUrl // 个人链接

  _p._$$ModuleList = _klass._$klass()
  var _pro = _p._$$ModuleList._$extend(_module._$$ModuleAbstract)

  _pro.__doBuild = function() {
    this.__super()

    this.__isAllCompleted = false // 全选
    this.__data = [] // todo list <item: todo data>
    this.__list = [] // todo list <item: m-item module>
    this.__body = _element._$html2node(_tpl._$getTextTemplate('m-todo'))
    _children = this.__body.children[0].children

    // 获取用户 todo list
    var self = this
    self._checkUserToken(function() {
      self._getUserTodoList(function(data) {
        self.__data = data
        self._initTodoList(data)
      })
    })
    
  }

  _pro.__onShow = function(_options) {
    this.__super(_options)
    var self = this
    var el_icon = _children[0]
    var el_input =_children[1]
    
    // 输入 新增 todo item
    _event._$addEvent(el_input, 'enter', function(_actionEvent) {
      // 新增 todo
      if(this.value.length === 0) return
      // 发起 put 请求
      self._addUserTodoItem(this.value, function(putResult) {
        self.__events.onrefresh({
          todo: putResult
        })
      })
      this.value = ''
    }, false)

    // 全选
    _event._$addEvent(el_icon, 'click', function(_actionEvent) {
      // 修改 icon 状态
      var _isAllCompleted = !self.__isAllCompleted
      self.__isAllCompleted = _isAllCompleted

      // 修改样式先
      self._setIconClass(el_icon, _isAllCompleted)

      // post 批量修改
      self._modUserTodoItem('', _isAllCompleted)

      // 更新 todo item 组件
      self.__list.forEach(function(item) {
        item.__data.completed = _isAllCompleted
        item._$updateTodoItem(item.__data)
      })
      
    })
  }

  _pro.__onRefresh = function(_data) {
    this.__super(_data)
    if(_data.todo) {
      // 新增 todo item
      this.__list.push(_tpl._$getItemTemplate([ _data.todo ], _mlist._$$ModuleItem, _todoItemConfObj)[0])
      this._setIconClass(el_icon, this.__isAllCompleted = false)
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
    // 判断 icon 状态并修改
    var isAllCompleted = this.__list.length > 0 && this.__list.every(function(todoItem) { return todoItem.__data.completed })
    this._setIconClass(_children[0], this.__isAllCompleted = isAllCompleted)
  }

  _pro._initTodoList = function(todosArr) {
    // 初始化 todo list
    var self = this
    _todoItemConfObj =  {
      parent: 'm-list',
      onbeforecycle: function(_item) {
        // 从 self.__list 中移除 todo item

        // self.__list.splice(self.__list.findIndex(item => item === _item), 1)

        // var _itemIndex
        // self.__list.forEach(function(item, i) {
        //   if(item === _item) self.__list.splice(i, 1)
        // })
        // console.log(_item)
        self._delUserTodoItem(_item.__data.id, function() {
          for(var i = 0; i < self.__list.length; i++) {
            if(self.__list[i] === _item) {
              self.__list.splice(i, 1)
              break
            }
          }
          self._checkAllCompletedStatus()
        })
      },
      ontoggle: function(_item) {
        console.log(_item)
        self._modUserTodoItem(_item.__data.id, _item.__data.completed, function() {
          self._checkAllCompletedStatus()
        })
      }
    }
    var _todoList = _tpl._$getItemTemplate(todosArr, _mlist._$$ModuleItem, _todoItemConfObj)
    this.__list = _todoList

    // icon 的初始状态
    this._checkAllCompletedStatus()
  }

  _pro._checkUserToken = function(callback) {
    // 验证用户
    // _event._$addEvent(window, 'resterror', function(_error) {
    //   console.log(_error)
    // })
    var self = this
    var userId = location.parse(location.href).query.id || _storage._$getDataInStorage('user-id')
    var requestParam = userId ? { id: userId } : {}
    _ajax._$request(_userRequestUrl, {
      // sync: true,
      param: requestParam,
      method: 'get',
      onload: function(_data) {
        // 请求正常回调
        userId = _data.result.id
        _userTodoRequestUrl = _userRequestUrl + '/' + userId + '/todos'
        _userPersonalUrl = location.href.split('?')[0] + '?id=' + userId
        // 更新 url
        history.replaceState(null, null, '?id=' + userId)
        // 将 user id 存入本地 localstorage
        _storage._$setDataInStorage('user-id', userId)
        // 显示 todo list
        _element._$setStyle(self.__body, 'display', 'block')
        callback(_data)
      },
      onerror: function(_error) {
        // 错误提示
        self.__body.innerHTML = 'Your ID check failed... Retry it, please.'
        self.__body.className = 'z-error'
        // console.log(_error)
      },
    })
  }


  // 增删改查
  _pro._getUserTodoList = function(callback) {
    _ajax._$request(_userTodoRequestUrl, {
      method: 'get',
      onload: function(_data) {
        if(callback) callback(_data.result)
      },
      onerror: function(_error) {
        console.log(_error)
      }
    })
  }

  _pro._addUserTodoItem = function(itemTitle, callback) {
    _ajax._$request(_userTodoRequestUrl, {
      method: 'put',
      data: {
        title: itemTitle,
        date: Date.now(),
      },
      onload: function(_data) {
        if(callback) callback(_data.result)
      }
    })
  }

  _pro._delUserTodoItem = function(itemId, callback) {
    _ajax._$request(_userTodoRequestUrl + '/' + itemId, {
      method: 'delete',
      onload: function(_data) {
        if(callback) callback(_data.result)
      }
    })
  }

  _pro._modUserTodoItem = function(itemId, isCompleted, callback) {
    _ajax._$request(_userTodoRequestUrl + (itemId ? ('/' + itemId) : ''), {
      method: 'post',
      data: {
        completed: isCompleted
      },
      onload: function(_data) {
        if(callback) callback(_data.result)
      }
    })
  }

  _module._$regist('todo-list', _p._$$ModuleList)
  return _p
})