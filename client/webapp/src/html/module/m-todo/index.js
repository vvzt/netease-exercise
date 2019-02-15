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

    this.__todoStorage = _storage._$getDataInStorageWithDefault('todos', {})


    var _todoList = _tpl._$getItemTemplate(
      [
        { id: 'asfasf', title: 'true', isCompleted: true },
        { id: 'asjdiaw', title: 'false', isCompleted: false }
      ],
      _mlist._$$ModuleItem,
      {
        parent: 'm-list',
        onchangestatus: function(_data) {},
        ondelete: function(_data) {},
      }
    )
    this.__list = _todoList

    // var _templateSeed = _jst._$add('m-list-template')

    // _jst._$get(_templateSeed, {
    //   test: 123
    // })
    
    // _mlist._$$ModuleList._$allocate({
    //   parent: this.__body,
    //   clazz: 'ttt'
    // })


    // _jst._$render('m-list', _todoList, {
    //   test: 222
    // })
    

  }

  _pro.__onShow = function(_options) {
    this.__super(_options)
    var that = this
    var el_input = _element._$getByClassName(this.__body, 'u-input')[0]
    _event._$addEvent(el_input, 'enter', function(_actionEvent) {
      var val = this.value
      this.value = ''
      that.__events.onrefresh({
        item: {
          id: '',
          title: val
        }
      })
      // onenter todo 
    }, false)
  }

  _pro.__onRefresh = function(_data) {
    this.__super(_data)
    console.log(1, 'onrefresh', _data)
    if(_data.item) {
      // add
      _tpl._$getItemTemplate(
        [
          _data.item
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