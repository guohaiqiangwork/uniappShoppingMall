import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {//data数据
	   APPNAME:'商城',
	   guideStus:'',
       userName:'',//用户姓名
	   orangeD:0,//消息通知
	   title:'',//自定义头部标题
	   leftFalg:true,//自定义左边数据
	   rightFalg:true,//自定义右边数据
	   titleFalg:false,//是否显示自定义标题
	   token:'',//登录toke
	   typeCustomer:'0',//客户类型 0用户 1代理
	  
    },
	getters:{ 
	},
    mutations: {//函数方法func
        LOGIN(state,userName) {
            state.userName=userName||'新用户';
			console.log(state.userName) 
        },
		TITLE(state,title) {
            state.title=title||state.APPNAME;
        }
    }
})

export default store
