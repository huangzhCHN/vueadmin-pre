<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view v-if="isRouterAlive"/>
  </div>
</template>
<script>
	export default {
		name: "App",
    data() {
      return {
        isRouterAlive: true
      }
    },
    methods: {
      reload() {
        this.isRouterAlive = false
        this.$nextTick(function() {
          this.isRouterAlive = true
        })
      }
    },
    provide() {
      return {
        reload: this.reload
      }
    },watch: {
			$route(to, from) {
				if (to.path != '/login') {
					let obj = {
						name: to.name,
						title: to.meta.title
					}
					this.$store.commit("addTabs", obj)
				}
			}
		}
	}

</script>
<style>
	html, body, #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  padding: 0;
  margin: 0;
  font-size: 15px;
}
</style>
