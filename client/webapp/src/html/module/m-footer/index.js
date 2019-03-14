NEJ.define([
  'base/klass',
  'base/element',
  'util/dispatcher/module',
  'util/template/tpl',
], function(_klass, _element, _module, _tpl, _p) {
  /**
   * @class  {_$$ModuleLayoutSystem}
   * @extend {_$$ModuleAbstract}
   * @param  {Object}
   * @return {Object}
   */
  _p._$$ModuleBanner = _klass._$klass()
  var _pro = _p._$$ModuleBanner._$extend(_module._$$ModuleAbstract)
  
  /**
   * 构建模块，主要处理以下业务逻辑
   * - 构建模块结构
   * - 缓存后续需要使用的节点
   * - 初始化需要使用的组件的配置信息
   * @return {Void}
   */
  _pro.__doBuild = function() {
    this.__super()
    this.__body = _element._$html2node(_tpl._$getTextTemplate('m-footer'))
  }

  /**
   * 显示模块，主要处理以下业务逻辑
   * - 添加事件
   * - 分配组件
   * - 处理输入信息
   * @param  {Object} 输入参数
   * @return {Void}
   */
  _pro.__onShow = function(_options) {
    this.__super(_options)
  }

  /**
   * 刷新模块，主要处理以下业务逻辑
   * - 分配组件，分配之前需验证
   * - 处理输入信息
   * - 同步状态
   * - 载入数据
   * @return {Void}
   */
  _pro.__onRefresh = function(_options) {
    this.__super(_options)
  }

  /**
   * 隐藏模块，主要处理以下业务逻辑
   * - 回收事件
   * - 回收组件
   * - 尽量保证恢复到构建时的状态
   * @return {Void}
   */
  _pro.__onHide = function() {
    this.__super()
    // TODO
  }

  _pro.__onMessage = function(_msgEvent) {
    const url = _msgEvent.data.url
    if(url) {
      this.__body.innerHTML = 'Your personal todos link: <a href="' + url + '">' + url + '</a>'
    }
  }
  
  _module._$regist('todo-footer', _p._$$ModuleBanner)
  return _p
})