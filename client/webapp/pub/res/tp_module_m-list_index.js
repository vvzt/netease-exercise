I$("bf26c3077a5ffaf4b6313bc9d0d91688",function(e,t,n,i){e.__getItemInStorage=function(e){return localStorage.getItem(e)};e.__setItemToStorage=function(e,t){localStorage.setItem(e,t)};e.__removeItemFromStorage=function(e){localStorage.removeItem(e)};e.__clearStorage=function(){localStorage.clear()};e.__initStorage=function(){(document.onstorageready||n)()};e.__isStorageReady=function(){return!0};return e});I$("0afc9fc49c812de72b6a29d5457067c4",function(e,t,n,i,r,a,o){if("trident"===e._$KERNEL.engine&&e._$KERNEL.release<="3.0")I$("3f1ddded762eb0e8b8f339f8d4e07764",function(e,i){var r;var a=function(){if(!r)i._$flash({hidden:!0,src:e._$get("storage.swf"),params:{AllowScriptAccess:"sameDomain"},onready:function(e){if(!e)void 0;else{r=e;r.initStorage("nej-storage")}t._$dispatchEvent(document,"storageready")}})};n.__getItemInStorage=function(e){if(r)return r.getItem(e)};n.__setItemToStorage=function(e,t){if(r)r.setItem(e,t)};n.__removeItemFromStorage=function(e){if(r)r.removeItem(e)};n.__clearStorage=function(){if(r)r.clear()};n.__initStorage=function(){a()};n.__isStorageReady=function(){return!!r}},"2e98cc3bf6706a072f04f35536551585","ae214a3be66cb3f95af604bb77206dee");return n},"4093f0c4677b6eef534fb261c50a4a5c","eecc23edefd7b6f55f0449dd4ea3d15e","bf26c3077a5ffaf4b6313bc9d0d91688");I$("050e6495ff6a373455270b35563d2542",function(e,t,n,i,r,a,o,_,f,s){var c={};o._$init=function(){var e=!1;return function(){if(!e){e=!0;var i=function(){var e=function(e,t,n){a.__setItemToStorage(t,JSON.stringify(e));delete n[t]};return function(){t._$loop(c,e)}}();n._$addEvent(document,"storageready",i);a.__initStorage()}}}();o._$setDataInStorage=function(e,t){o._$init();var n=JSON.stringify(t);try{a.__setItemToStorage(e,n)}catch(i){void 0;void 0}if(n!=a.__getItemInStorage(e))c[e]=t};o._$getDataInStorage=function(e){o._$init();var t=JSON.parse(a.__getItemInStorage(e)||"null");return null==t?c[e]:t};o._$getDataInStorageWithDefault=function(e,t){var n=o._$getDataInStorage(e);if(null==n){n=t;o._$setDataInStorage(e,n)}return n};o._$delDataInStorage=function(e){o._$init();delete c[e];a.__removeItemFromStorage(e)};o._$clearDataInStorage=function(){var e=function(e,t,n){delete n[t]};return function(){o._$init();t._$loop(c,e);a.__clearStorage()}}();i._$$CustomEvent._$allocate({element:document,event:"storageready",oneventadd:function(){if(a.__isStorageReady())n._$dispatchEvent(document,"storageready")}});if(!0)e.copy(e.P("nej.j"),o);return o},"580f0ebacdd006bd6c6d443496e0879f","f5ee14fceba19fe881dd149118d539b3","eecc23edefd7b6f55f0449dd4ea3d15e","3e7ed525a6eade67d2e7bd9946a3708e","0e75599e00a80337855a212b6a212b35","0afc9fc49c812de72b6a29d5457067c4");I$("219114cff7d3f03dddbf4c3cdbefab90",function(e,t,n,i,r,a,o,_,f,s){o._$request=function(){var e={},a=/\{(.*?)\}/gi,o=/^get|delete|head$/i,c=/json/i,d=/xml/i;var u=function(t){var n=e[t];if(n){delete n.s;delete n.f;delete e[t]}};var l=function(t,n){var i=e[t];if(i){var r=i[n],a=s.slice.call(arguments,2);try{(r||f).apply(null,a)}catch(o){if(!1)throw o;void 0;void 0}u(t)}};var h=function(e,t){l(e,"s",t)};var $=function(e,n){n=n||{};if(n.code!=i._$CODE_ERRSERV||204!=n.data){t._$dispatchEvent(window,"resterror",n);if(!n.stopped)l(e,"f",n);else u(e)}else h(e,null)};var p=function(e,t,n){var i=e[t]||e[t.toLowerCase()];if(!i){i=n;e[t]=i}return i};var v=function(e,t,i){if(n._$isArray(e))i[t]=JSON.stringify(e)};return function(t,i){i=n._$merge({},i);var s={},u=i.param||_;t=t.replace(a,function(e,t){var n=u[t];if(null!=n)s[t]=!0;return encodeURIComponent(n||"")||e});var l=i.data||{};n._$loop(u,function(e,t){if(!s[t])l[t]=e});var b="text",m=i.headers||{},g=p(m,"Accept","application/json"),y=p(m,"Content-Type","application/json");if(c.test(g))b="json";else if(d.test(g))b="xml";var E=n._$uniqueID();e[E]={s:i.onload||f,f:i.onerror||f};i.method=i.method||"GET";if(o.test(i.method.trim())){n._$forIn(l,v);i.query=l;l=null}else if(c.test(y))l=JSON.stringify(l);i.type=b;i.data=l;i.headers=m;i.onload=h._$bind(null,E);i.onerror=$._$bind(null,E);return r._$request(t,i)}}();o._$abort=function(e){r._$abort(e)};a._$$CustomEvent._$allocate({element:window,event:"resterror"});if(!0)e.P("nej.j")._$requestByREST=o._$request;return o},"580f0ebacdd006bd6c6d443496e0879f","eecc23edefd7b6f55f0449dd4ea3d15e","f5ee14fceba19fe881dd149118d539b3","09334b73646b5415854443df33a8635e","55c01898e62ea30d183d3235b4c6fdf7","3e7ed525a6eade67d2e7bd9946a3708e");I$("5dbad4250fcd0c98d78664a474d6fd09",function(e,t,n,i,r,a,o,_,f,s){var c;o._$$Abstract=t._$klass();c=o._$$Abstract._$extend(r._$$EventTarget);c.__init=function(){this.__super();n._$dumpCSSText();this.__initXGui();this.__initNode()};c.__reset=function(e){this.__super(e);this.__doInitClass(e.clazz);this.__doInitDataset(e.dataset);this._$appendTo(e.parent)};c.__destroy=function(){this.__super();this.__doDelParentClass();this.__doDelParentDataset();delete this.__parent;n._$removeByEC(this.__body);n._$delClassName(this.__body,this.__class);delete this.__class};c.__initXGui=f;c.__initNode=function(){if(!this.__seed_html)this.__initNodeTemplate();this.__body=a._$getNodeTemplate(this.__seed_html);if(!this.__body)this.__body=n._$create("div",this.__seed_css);n._$addClassName(this.__body,this.__seed_css)};c.__initNodeTemplate=f;c.__doInitClass=function(e){this.__class=e||"";n._$addClassName(this.__body,this.__class)};c.__doInitDataset=function(e){this.__datamap=i._$merge({},e);n._$dataset(this.__body,this.__datamap)};c.__doDelParentDataset=function(){i._$forIn(this.__datamap,function(e,t){n._$dataset(this.__body,t,"")},this)};c.__doAddParentClass=function(){if(this.__seed_css){var e=this.__seed_css.split(/\s+/);n._$addClassName(this.__parent,e.pop()+"-parent")}};c.__doDelParentClass=function(){if(this.__seed_css){var e=this.__seed_css.split(/\s+/);n._$delClassName(this.__parent,e.pop()+"-parent")}};c._$getBody=function(){return this.__body};c._$appendTo=function(e){if(this.__body){this.__doDelParentClass();if(i._$isFunction(e))this.__parent=e(this.__body);else{this.__parent=n._$get(e);if(this.__parent)this.__parent.appendChild(this.__body)}this.__doAddParentClass()}};c._$show=function(){if(this.__parent&&this.__body&&this.__body.parentNode!=this.__parent)this.__parent.appendChild(this.__body)};c._$hide=function(){n._$removeByEC(this.__body)};if(!0)e.copy(e.P("nej.ui"),o);return o},"580f0ebacdd006bd6c6d443496e0879f","6e188f10d572e9a142108235adfa4915","f0fd54de6fd620391a02bb9e06b6c513","f5ee14fceba19fe881dd149118d539b3","08b7bbdadaa98d9612811209c82c24e2","fe0d39bab335ccf46822edd68e6685a2");I$("d8af46d6a44547eb34d88d028a542fdf",function(e,t,n,i,r,a,o){var _;i._$$Item=t._$klass();_=i._$$Item._$extend(n._$$Abstract);_.__init=function(){this.__id=this.__genId();this.__super()};_.__reset=function(e){this.__super(e);this.__index=e.index;this.__total=e.total;this.__range=e.range;this._$refresh(e.data)};_.__destroy=function(){this.__super();delete this.__data;delete this.__index;delete this.__total;delete this.__range};_.__doRefresh=a;_.__genId=function(){var e=+new Date;return function(){return"itm-"+ ++e}}();_._$getId=function(){return this.__id};_._$getData=function(){return this.__data};_._$refresh=function(e){this.__data=e||{};this.__doRefresh(this.__data)};if(!0)e.copy(e.P("nej.ui"),i);return i},"580f0ebacdd006bd6c6d443496e0879f","6e188f10d572e9a142108235adfa4915","5dbad4250fcd0c98d78664a474d6fd09");I$("422ba9dce477c2f03e151fc7f71b4a3c",function(e,t,n,i,r,a,o){var _;i._$$ListItem=t._$klass();_=i._$$ListItem._$extend(n._$$Item);_.__reset=function(e){this.__pkey=e.pkey||"id";this.__prefix=e.prefix||"";this.__super(e)};_.__onDelete=function(e){this._$dispatchEvent("ondelete",{ext:e,id:this._$getId(),data:this._$getData(),body:this._$getBody()})};_.__onUpdate=function(e){this._$dispatchEvent("onupdate",{ext:e,id:this._$getId(),data:this._$getData(),body:this._$getBody()})};_._$refresh=function(e){this.__super(e);var t=this.__data[this.__pkey];this.__id=this.__prefix+t||this.__genId()};if(!0)e.copy(e.P("nej.ui"),i);return i},"580f0ebacdd006bd6c6d443496e0879f","6e188f10d572e9a142108235adfa4915","d8af46d6a44547eb34d88d028a542fdf");I$("49ccd2512bff34fd66c7ec13a7cd9287",'<div class="g-item-wrapper">\n<div class="section g-item-index z-item-completed-no"></div>\n<div class="section g-item-title"></div>\n<div class="section g-item-action-btns z-item-hide">\n<button class="u-item-action-del"></button>\n</div>\n</div>');I$("9f5ebfd6a8475d90a7ddcdd2572ef632","\n.g-item-index, .u-item-action-del, .u-item-action-edit {\n  outline: none;\n  cursor:pointer;\n  background-position: 50% 50%;\n  background-size: 18px 18px;\n  background-repeat: no-repeat;\n  background-color: transparent;\n}\n\n.section {\n  width: 100%;\n}\n\n.g-item-wrapper {\n  display: flex;\n  clear: both;\n  padding: 0 20px;\n  border-bottom: 1px solid rgba(166, 166, 166, 0.1);\n}\n.g-item-wrapper:last-child {\n  border-bottom: none;\n}\n\n.g-item-index {\n  width: 40px;\n  height: 50px;\n  padding: 5px 15px;\n  background-size: 32px 32px;\n}\n\n.g-item-title {\n  height: 50px;\n  font-size: 20px;\n  text-indent: 10px;\n  line-height: 60px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  transition: all .2s;\n}\n\n.g-item-action-btns {\n  display: flex;\n  align-items: center;\n  max-width: 60px;\n}\n\n.u-item-action-del {\n  box-sizing: border-box;\n  flex: 1 0 auto;\n  height: 30px;\n  border: none;\n  background-image: url(/res/img/del.png);\n}\n\n.z-item-completed-ok {\n  color: #D9D9D9;\n  text-decoration: line-through; \n}\n\n/* .z-item-completed-no {\n  \n} */\n\n.z-index-completed-ok {\n  background-image: url(/res/img/todo_item_completed.png);\n}\n\n.z-index-completed-no {\n  background-image: url(/res/img/todo_item.png);\n}");I$("fd0f7359bbdf9ee27011fdb3e7a57498",function(e,t,n,i,r,a,o,_,f,s,c,d){d._$$ModuleItem=t._$klass();var u=d._$$ModuleItem._$extend(f._$$ListItem);u.__initXGui=function(){var e=n._$pushCSSText(c),t=a._$addNodeTemplate(s);return function(){this.__seed_css=e;this.__seed_html=t}}();u.__initNode=function(){
this.__super();var e=n._$getByClassName(this.__body,"section");var t=n._$getChildren(e[2]);this.__nindex=e[0];this.__ntitle=e[1];this.__ndel=t[0];i._$addEvent(e[0],"click",this.__onAction._$bind(this),!1);i._$addEvent(t[0],"click",this.__onAction._$bind(this),!1)};u.__doRefresh=function(e){this.__data=e;this.__ntitle.innerHTML=e.title;this._setCompletedStatus(e.completed)};u.__onAction=function(e){var t=i._$getElement(e);if(t)if("click"===e.type)switch(t){case this.__nindex:var n=!this.__data.completed;this.__data.completed=n;this._setCompletedStatus(n);this._$dispatchEvent("ontoggle",this);break;case this.__ndel:this._$dispatchEvent("onbeforecycle",this);this._$recycle()}};u._setCompletedStatus=function(e){if(e){n._$replaceClassName(this.__nindex,"z-index-completed-no","z-index-completed-ok");n._$replaceClassName(this.__ntitle,"z-item-completed-no","z-item-completed-ok")}else{n._$replaceClassName(this.__nindex,"z-index-completed-ok","z-index-completed-no");n._$replaceClassName(this.__ntitle,"z-item-completed-ok","z-item-completed-no")}};u._$updateTodoItem=function(e){this.__doRefresh(e)};return d},"ddc5d9fe2a390e5f5fe595cd04572c7d","6e188f10d572e9a142108235adfa4915","f0fd54de6fd620391a02bb9e06b6c513","eecc23edefd7b6f55f0449dd4ea3d15e","fd669d6764cd91c6787248abf4ceda94","fe0d39bab335ccf46822edd68e6685a2","2109056772715e84285b5962aa5a1df1","050e6495ff6a373455270b35563d2542","422ba9dce477c2f03e151fc7f71b4a3c","49ccd2512bff34fd66c7ec13a7cd9287","9f5ebfd6a8475d90a7ddcdd2572ef632");I$("f80edea3f137916c8248edcb2e7db00f",function(e,t,n,i,r,a,o,_,f,s){var c;var d;var u=window.NEJ_CONF.api+"/users";var l;var h;s._$$ModuleList=e._$klass();var $=s._$$ModuleList._$extend(i._$$ModuleAbstract);$.__doBuild=function(){this.__super();this.__isAllCompleted=!1;this.__data=[];this.__list=[];this.__body=t._$html2node(r._$getTextTemplate("m-todo"));d=this.__body.children[0].children;var e=this;e._checkUserToken(function(){e._getUserTodoList(function(t){e.__data=t;e._initTodoList(t)})})};$.__onShow=function(e){this.__super(e);var t=this;var i=d[0];var r=d[1];n._$addEvent(r,"enter",function(e){if(0!==this.value.length){t._addUserTodoItem(this.value,function(e){t.__events.onrefresh({todo:e})});this.value=""}},!1);n._$addEvent(i,"click",function(e){var n=!t.__isAllCompleted;t.__isAllCompleted=n;t._setIconClass(i,n);t._modUserTodoItem("",n);t.__list.forEach(function(e){e.__data.completed=n;e._$updateTodoItem(e.__data)})})};$.__onRefresh=function(e){this.__super(e);if(e.todo){this.__list.push(r._$getItemTemplate([e.todo],f._$$ModuleItem,c)[0]);this._setIconClass(d[0],this.__isAllCompleted=!1)}};$._setIconClass=function(e,n){if(n)t._$addClassName(e,"u-icon-active");else t._$replaceClassName(e,"u-icon-active","")};$._checkAllCompletedStatus=function(){var e=this.__list.length>0&&this.__list.every(function(e){return e.__data.completed});this._setIconClass(d[0],this.__isAllCompleted=e)};$._initTodoList=function(e){var t=this;c={parent:"m-list",onbeforecycle:function(e){t._delUserTodoItem(e.__data.id,function(){for(var n=0;n<t.__list.length;n++)if(t.__list[n]===e){t.__list.splice(n,1);break}t._checkAllCompletedStatus()})},ontoggle:function(e){void 0;t._modUserTodoItem(e.__data.id,e.__data.completed,function(){t._checkAllCompletedStatus()})}};var n=r._$getItemTemplate(e,f._$$ModuleItem,c);this.__list=n;this._checkAllCompletedStatus()};$._checkUserToken=function(e){var n=this;var i=location.parse(location.href).query.id||o._$getDataInStorage("user-id");var r=i?{id:i}:{};_._$request(u,{param:r,method:"get",onload:function(r){i=r.result.id;l=u+"/"+i+"/todos";h=location.href.split("?")[0]+"?id="+i;history.replaceState(null,null,"?id="+i);o._$setDataInStorage("user-id",i);t._$setStyle(n.__body,"display","block");n.__doSendMessage("/?/footer",{url:h});e(r)},onerror:function(e){n.__body.innerHTML="Your ID check failed... Retry it, please.";n.__body.className="z-error"}})};$._getUserTodoList=function(e){_._$request(l,{method:"get",onload:function(t){if(e)e(t.result)},onerror:function(e){void 0}})};$._addUserTodoItem=function(e,t){_._$request(l,{method:"put",data:{title:e,date:Date.now()},onload:function(e){if(t)t(e.result)}})};$._delUserTodoItem=function(e,t){_._$request(l+"/"+e,{method:"delete",onload:function(e){if(t)t(e.result)}})};$._modUserTodoItem=function(e,t,n){_._$request(l+(e?"/"+e:""),{method:"post",data:{completed:t},onload:function(e){if(n)n(e.result)}})};i._$regist("todo-list",s._$$ModuleList);return s},"6e188f10d572e9a142108235adfa4915","f0fd54de6fd620391a02bb9e06b6c513","eecc23edefd7b6f55f0449dd4ea3d15e","fd669d6764cd91c6787248abf4ceda94","fe0d39bab335ccf46822edd68e6685a2","2109056772715e84285b5962aa5a1df1","050e6495ff6a373455270b35563d2542","219114cff7d3f03dddbf4c3cdbefab90","fd0f7359bbdf9ee27011fdb3e7a57498");