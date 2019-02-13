NEJ.define([
  'base/chain',
  'base/klass',
  'base/element',
  'base/event',
  'util/dispatcher/module',
  'util/template/tpl',
  'util/template/jst',
  'ui/item/list',
  'text!./index.html',
  'text!./index.css'
], function($, _klass, _element, _event, _module, _tpl, _jst, _list, _html, _css, _p) {

  _p._$$ModuleList = _klass._$klass()
  var _pro = _p._$$ModuleList._$extend(_list._$$ListItem)

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
    // 0 - 头像图片节点
    // 1 - 用户名节点
    // 2 - 内容节点
    var _list = _element._$getByClassName(this.__body, 'section')
    this.__nindex = _list[0]
    this.__ntitle = _list[1]
    // 事件
    _event._$addEvent(
        _list[0],
        'click',
        this.__onAction._$bind(this)
    )
  }

  // 刷新
  _pro.__doRefresh = function(_data){
    this.__data = _data
    this.__nindex.id = this.__nindex.innerHTML = _data.id
    this.__ntitle.innerHTML = _data.title
    
    _element._$addClassName(this.__ntitle, 'z-item-completed-' + (_data.isCompleted ? 'ok' : 'no'))
    // // 子评论列表
    // if (!!_data.replies){
    //     // 子评论构造同当前评论项
    //     this.__items = _t._$getItemTemplate(
    //         _data.replies,this.constructor,{
    //             parent:this.__body,
    //             onreply:this.__onReply._$bind(this),
    //             ondelete:this.__onDelete._$bind(this)
    //         }
    //     )
    // }
  }

  // 操作
  _pro.__onAction = function(_actionEvent){
    var _node = _event._$getElement(_actionEvent)
    if (!_node) return
    switch(_actionEvent.type) {
      case 'click': {
        console.log('click fn:', this.__data)
        // 通过完成的状态切换 class
        var _nextStatus = !this.__data.isCompleted
        var _completedClassArray = ['z-item-completed-ok', 'z-item-completed-no']
        _element._$replaceClassName(this.__ntitle, ...(_nextStatus ? _completedClassArray.reverse() : _completedClassArray))
        
        this.__data.isCompleted = _nextStatus

        break
      }
    }
  }

  return _p
})