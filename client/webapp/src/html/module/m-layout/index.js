NEJ.define([
  'base/klass',
  'base/element',
  'util/dispatcher/module',
  'util/template/tpl',
], function(_klass, _element, _module, _tpl, _p) {
  /* 
    构建 - __doBuild：构建模块结构，缓存模块需要使用的节点，初始化组合控件的配置参数
    显示 - __onShow：将模块放置到指定的容器中，分配组合控件，添加相关事件，执行__onRefresh的业务逻辑
    刷新 - __onRefresh：根据外界输入的参数信息获取数据并展示（这里主要做数据处理）
    隐藏 - __onHide：模块放至内存中，回收在__onShow中分配的组合控件和添加的事件，回收__onRefresh中产生的视图（这里尽量保证执行完成后恢复到__doBuild后的状态）
  */
  /**
   * @class  {_$$ModuleLayoutSystem}
   * @extend {_$$ModuleAbstract}
   * @param  {Object}
   * @return {Object}
   */
  _p._$$ModuleLayoutApp = _klass._$klass()
  var _pro = _p._$$ModuleLayoutApp._$extend(_module._$$ModuleAbstract)

  // https://github.com/NEYouFan/nej-framework/blob/master/doc/DISPATCHER.md#%E6%A8%A1%E5%9D%97%E7%BB%84%E5%90%88-1
  _pro.__doParseParent = function(_options) {
    console.log('__doParseParent: ', _options)
    return _element._$get('app')
  }
  
  /**
   * 构建模块，主要处理以下业务逻辑
   * - 构建模块结构
   * - 缓存后续需要使用的节点
   * - 初始化需要使用的组件的配置信息
   * @return {Void}
   */
  _pro.__doBuild = function() {
    this.__super()
    var _containerTemplate = _tpl._$getTextTemplate('m-container')
    this.__body = _element._$html2node(_containerTemplate)

    var _banner = _element._$getByClassName(this.__body, 'm-banner')[0]
    var _todo = _element._$getByClassName(this.__body, 'm-todo')[0]
    this.__export = {
      banner: _banner,
      parent: _todo,
    }
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
    console.log('onShow args = ', arguments)
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
  _pro.__onHide = function(){
    this.__super()
    // TODO
  }
  
  _module._$regist('layout-app', _p._$$ModuleLayoutApp)
  return _p
})