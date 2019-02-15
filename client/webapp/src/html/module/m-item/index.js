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
  _pro.__initNode = function(){
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
      this.__onAction._$bind(this)
    )
    _event._$addEvent(
      _btns[0], // delete btn
      'click',
      this.__onAction._$bind(this)
    )
  }

  // 刷新
  _pro.__doRefresh = function(_data){
    this.__data = _data
    // this.__nindex.id = _data.id
    this.__ntitle.innerHTML = _data.title
    
    // 切换 class
    _element._$addClassName(this.__nindex, 'z-index-completed-' + (_data.isCompleted ? 'ok' : 'no'))
    _element._$addClassName(this.__ntitle, 'z-item-completed-' + (_data.isCompleted ? 'ok' : 'no'))

    // 存入 localstorage
    _storage._$setDataInStorage('todo' + _data.id, _data)
    // todos id索引数组
    this.__todos = _storage._$getDataInStorage('todos')
    this.__todos.push(_data.id)
    _storage._$setDataInStorage('todos', this.__todos)
    console.log(777)
  }

  // 操作
  _pro.__onAction = function(_actionEvent){
    var _node = _event._$getElement(_actionEvent)
    if (!_node) return
    if(_actionEvent.type === 'click') {
      switch(_node) {
        case this.__nindex: {
          // 通过完成的状态切换 class
          var _nextStatus = !this.__data.isCompleted
          
          this._$setCompleted(_nextStatus)
          this.__data.isCompleted = _nextStatus
          break
        }
        case this.__ndel: {
          // del
          var _id = this.__data.id

          // 更新 localstorage todos
          var _idIndex
          this.__todos.forEach(function(id, i) {
            if(id === _id) _idIndex = i
          })
          console.log(_idIndex, this.__todos[_idIndex])
          if(_idIndex > -1) this.__todos.splice(_idIndex, 1)
          _storage._$delDataInStorage('todo' + _id)
          _storage._$setDataInStorage('todos', this.__todos)
          console.log('todo del', _idIndex, this.__data.title)

          this.__destroy()
          break
        }
      }
    }
  }

  _pro._$setCompleted = function(_nextStatus) {
    if(_nextStatus) {
      _element._$replaceClassName(this.__nindex, 'z-index-completed-no', 'z-index-completed-ok')
      _element._$replaceClassName(this.__ntitle, 'z-item-completed-no', 'z-item-completed-ok')
    } else {
      _element._$replaceClassName(this.__nindex, 'z-index-completed-ok', 'z-index-completed-no')
      _element._$replaceClassName(this.__ntitle, 'z-item-completed-ok', 'z-item-completed-no')
    }
  }

  return _p
})