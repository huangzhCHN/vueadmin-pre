import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import store from './store'
import axios from 'axios'
Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/index',
        name: 'Index',
        meta: {
          title: "首页"
        },
        component: () => import('@/views/Index.vue')
      },
      {
				path: '/userCenter',
				name: 'UserCenter',
				meta: {
					title: "个人中心"
				},
				component: () => import('@/views/UserCenter.vue')
			}
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router =  new Router({
  //mode: 'history',
  //base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  //是否已加载过菜单
  let hasRoute = store.state.menus.hasRoute
  //获取token信息
  let token = sessionStorage.getItem('token')
  if (to.path == '/login') {
    //登录页面直接跳转
    next()
  } else if(!token) {
    //没有token直接跳转登录
    next({path: '/login'})
  } else if(token && !hasRoute){
    //有token，且没有加载过菜单路由，获取路由信息且加载
    axios.get('/sys/menu/nav',{
      headers: {Authorization: sessionStorage.getItem("token")}
    }).then(res => {
      // 拿到menuList,存储在store中
			store.commit("setMenuList", res.data.data.nav)
      // 拿到用户权限,存储在store中
			store.commit("setPermList", res.data.data.authoritys)
      // 动态绑定路由
			let newRoutes = router.options.routes
      //遍历menus菜单，将菜单信息转换为路由
      res.data.data.nav.forEach(menu => {
        if (menu.children) {
          menu.children.forEach(item => {
            let route = menuToRoute(item)
            if(route){
              newRoutes[0].children.push(route)
            }
          })
        }
      })
      //添加新的路由列表
      router.addRoutes(newRoutes)
      //修改为已加载路由
      store.commit("changeRouteStatus", true)
      next({path: to.path})
    })
  }else{
    next()
  }
})

const menuToRoute = (menu) => {
  if (!menu.component) {
    return null
  }
  // 复制属性
  let route = {
    name: menu.name,
    path: menu.path,
    meta: {
      icon: menu.icon,
      title: menu.title
    }
  }
  route.component = () => import('@/views/' + menu.component +'.vue')
  return route
}

export default router