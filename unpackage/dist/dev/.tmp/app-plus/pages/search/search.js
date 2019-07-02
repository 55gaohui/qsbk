(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/search/search"],{

/***/ "../../../vue/qsbk/pages/search/search.vue":
/*!**************************************************!*\
  !*** D:/gaohui/vue/qsbk/pages/search/search.vue ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _search_vue_vue_type_template_id_2ddf8d92___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./search.vue?vue&type=template&id=2ddf8d92& */ "../../../vue/qsbk/pages/search/search.vue?vue&type=template&id=2ddf8d92&");
/* harmony import */ var _search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./search.vue?vue&type=script&lang=js& */ "../../../vue/qsbk/pages/search/search.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _search_vue_vue_type_template_id_2ddf8d92___WEBPACK_IMPORTED_MODULE_0__["render"],
  _search_vue_vue_type_template_id_2ddf8d92___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "vue/qsbk/pages/search/search.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "../../../vue/qsbk/pages/search/search.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** D:/gaohui/vue/qsbk/pages/search/search.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!./search.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!../../../vue/qsbk/pages/search/search.vue?vue&type=script&lang=js&");
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "../../../vue/qsbk/pages/search/search.vue?vue&type=template&id=2ddf8d92&":
/*!*********************************************************************************!*\
  !*** D:/gaohui/vue/qsbk/pages/search/search.vue?vue&type=template&id=2ddf8d92& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_search_vue_vue_type_template_id_2ddf8d92___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!./search.vue?vue&type=template&id=2ddf8d92& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!../../../vue/qsbk/pages/search/search.vue?vue&type=template&id=2ddf8d92&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_search_vue_vue_type_template_id_2ddf8d92___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_search_vue_vue_type_template_id_2ddf8d92___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!../../../vue/qsbk/pages/search/search.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!D:/gaohui/vue/qsbk/pages/search/search.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var indexList = function indexList() {return __webpack_require__.e(/*! import() | components/index/index-list */ "components/index/index-list").then(__webpack_require__.bind(null, /*! ../../components/index/index-list.vue */ "../../../vue/qsbk/components/index/index-list.vue"));};var loadMore = function loadMore() {return __webpack_require__.e(/*! import() | components/common/load-more */ "components/common/load-more").then(__webpack_require__.bind(null, /*! ../../components/common/load-more.vue */ "../../../vue/qsbk/components/common/load-more.vue"));};var noThing = function noThing() {return __webpack_require__.e(/*! import() | components/common/no-thing */ "components/common/no-thing").then(__webpack_require__.bind(null, /*! ../../components/common/no-thing.vue */ "../../../vue/qsbk/components/common/no-thing.vue"));};var _default =



















{
  name: "search",
  components: {
    indexList: indexList,
    loadMore: loadMore,
    noThing: noThing },

  data: function data() {
    return {
      issearch: false,
      loadtext: "上拉加载更多",
      list: [],
      searchtext: '' };

  },
  //监听原生标题导航按钮点击事件
  onNavigationBarButtonTap: function onNavigationBarButtonTap(e) {
    if (e.index == 0) {
      uni.navigateBack({
        delta: 1 });

    }
  },
  //监听原生输入框 文本发生改变
  onNavigationBarSearchInputChanged: function onNavigationBarSearchInputChanged(e) {
    this.searchtext = e.text;
  },
  //监听 原生键盘内的搜索按钮点击
  onNavigationBarSearchInputConfirmed: function onNavigationBarSearchInputConfirmed(e) {
    if (e.text) {
      this.getdata();
    }
  },
  //上拉加载
  onReachBottom: function onReachBottom() {
    this.loadmore();
  },
  // 监听下拉刷新
  onPullDownRefresh: function onPullDownRefresh() {
    console.log('2', " at pages\\search\\search.vue:60");
    this.getdata();
    uni.stopPullDownRefresh();

  },
  methods: {
    // 搜索事件
    getdata: function getdata() {var _this = this;
      //请求服务器   this.searchtext
      uni.showLoading();
      setTimeout(function () {
        var arr = [{
          userpic: '../../static/demo/userpic/6.jpg',
          username: '昵称',
          isguanzhu: false,
          title: '我是标题',
          type: 'img', //img：图文；video：视频
          titlepic: '../../static/demo/datapic/16.jpg',
          play: "20w",
          long: "2:15",
          infonum: {
            index: 0, //0：没有操作，1：顶，2：踩
            dingnum: 11,
            cainum: 11 },

          commentnum: 10,
          sharenum: 12 },

        {
          userpic: '../../static/demo/userpic/7.jpg',
          username: '视频',
          isguanzhu: true,
          title: '我是视频内容',
          type: 'video', //img：图文；video：视频
          titlepic: '../../static/demo/datapic/16.jpg',
          play: "20w",
          long: "2:15",
          infonum: {
            index: 2, //0：没有操作，1：顶，2：踩
            dingnum: 15,
            cainum: 11 },

          commentnum: 10,
          sharenum: 12 },

        {
          userpic: '../../static/demo/userpic/6.jpg',
          username: '昵称',
          isguanzhu: false,
          title: '我是标题',
          type: 'img', //img：图文；video：视频
          titlepic: '../../static/demo/datapic/16.jpg',
          play: "20w",
          long: "2:15",
          infonum: {
            index: 0, //0：没有操作，1：顶，2：踩
            dingnum: 11,
            cainum: 11 },

          commentnum: 10,
          sharenum: 12 }];


        _this.list = arr;
        uni.hideLoading();
        _this.issearch = true;
      }, 1000);
    },
    loadmore: function loadmore() {var _this2 = this;
      //如果当前状态是还在加载中，或没有更多数据，直接返回
      if (this.loadtext != "上拉加载更多") {
        return;
      }
      //修改状态
      this.loadtext = "加载中";
      //获取数据
      setTimeout(function () {
        //获取完成
        var obj = {
          userpic: '../../static/demo/userpic/6.jpg',
          username: '昵称',
          isguanzhu: false,
          title: '我是标题',
          type: 'img', //img：图文；video：视频
          titlepic: '../../static/demo/datapic/16.jpg',
          play: "20w",
          long: "2:15",
          infonum: {
            index: 0, //0：没有操作，1：顶，2：踩
            dingnum: 11,
            cainum: 11 },

          commentnum: 10,
          sharenum: 12 };

        _this2.list.push(obj);
        _this2.loadtext = "上拉加载更多";
      }, 1000);
      //如果没有数据显示
      // this.loadtext = "没有更多数据";
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["default"]))

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!../../../vue/qsbk/pages/search/search.vue?vue&type=template&id=2ddf8d92&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!D:/gaohui/vue/qsbk/pages/search/search.vue?vue&type=template&id=2ddf8d92& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var staticRenderFns = []
render._withStripped = true



/***/ })

},[["../../../vue/qsbk/main.js?{\"page\":\"pages%2Fsearch%2Fsearch\"}","common/runtime","common/vendor"]]]);