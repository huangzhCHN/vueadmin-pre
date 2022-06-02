import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
export default {
    state: {
      // 菜单栏数据
      menuList:  [],
      // 权限数据
      permList:  [],
      //是否已加载路由
      hasRoute: false,
      //顶部标签，选中项
      editableTabsValue: 'Index',
      //顶部标签，所有标签内容
      editableTabs: [{
          title: '首页',
          name: 'Index'
      }]
    },
    mutations: {
        //修改路由加载状态
        changeRouteStatus(state, hasRoute) {
            state.hasRoute = hasRoute
            sessionStorage.setItem("hasRoute", hasRoute)
        },
        //设置菜单列表
        setMenuList(state, menus) {
            state.menuList = menus
        },
        //设置权限列表
        setPermList(state, authoritys) {
            state.permList = authoritys
        },
        //添加标签页
        addTabs(state, tab) {
            //判断该标签是否已经存在
            let index = state.editableTabs.findIndex(item => item.name === tab.name)
            if(index === -1){
                state.editableTabs.push(tab)
            }
            //选中当前标签
            state.editableTabsValue = tab.name
        },
        //选中标签方法
        setActiveTab(state,tabName) {
            state.editableTabsValue = tabName
        }
    },
    actions: {

    }
}