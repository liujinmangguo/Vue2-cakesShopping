var vm = new Vue({
        el: '#app',
        data:{
        	totalMoney: 0,
            productList : [],
            title: "hello Vue2!",
            checkAllFlag: false,
            delFlag: false
        },
        filters:{//只在当前实例使用
        	formatMoney: function(value){
        	    return '￥' + value.toFixed(2);
        	}
        },
        mounted: function(){
            this.cartView();
            this.calcTotalMoney();
        },
        methods:{
        cartView: function(){	
        	let _this = this;
        	this.$http.get('data/cart.json').then(res=>{
        		this.productList = res.data.result.list;    //res.data
        		this.totalMoney = res.data.result.totalMoney;
        	})
        },

        changeCount: function(product, way){
        	if(way>0){
        		product.count++
        	}else{
        		product.count--;
        		if(product.count<1){
        			product.count = 1;
        		}
        	}
        	this.calcTotalMoney();
        },

        selectedProduct: function(item){
        	if(typeof item.checked == 'undefined'){
        		// Vue.set(item, "checked", true);
        		this.$set(item, "checked", true);

        	}else{
        		item.checked = !item.checked;
        	}
        	this.calcTotalMoney();
        },

        checkAll: function(flag){
        	    this.checkAllFlag = flag;
        	    this.productList.forEach((item, index)=>{
        	    	if(typeof item.checked == 'undefined'){
                		// Vue.set(item, "checked", true);
                		this.$set(item, "checked", this.checkAllFlag);

                	}else{
                		item.checked = this.checkAllFlag;
                	}
        	    })
        	    this.calcTotalMoney();
        },

        calcTotalMoney: function(){
        	this.totalMoney = 0;
        	this.productList.forEach((item, index)=>{
        		if(item.checked){
        			this.totalMoney += item.price * item.count;
        			console.log(1);

        		}
        	})
        },
        delConfirm: function(item){
                this.delFlag = true;
                this.curProduct = item;
        },
        delProduct: function(){
                var index = this.productList.indexOf(this.curProduct);
                this.productList.splice(index,1);
                this.delFlag = false;
        }
        }
})

// Vue.filter('formatTotal', function(value, type){ //可全局使用
// 	return "￥" + value.toFixed(3) + type;
// })