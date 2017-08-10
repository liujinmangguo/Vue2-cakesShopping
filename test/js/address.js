var vm = new Vue({
	el:'#address',
	data:{
		listNum: 3,
	    addressList: [],
	    currentIndex: 0,
	    shippingMethod: 1

	},
	mounted: function(){
		this.$nextTick(function(){
		    this.getAddressList();
		});
	},
	computed: {
	    filterAddress: function(){
	    	return this.addressList.slice(0, this.listNum)
	    }
	},
	methods:{
	    getAddressList: function(){
	    	this.$http.get('data/address.json').then(res=>{
	    		var response = res.data;
	    		// this.addressList = res.data.result;
	    		if(response.status==0){
				    this.addressList = response.result;
	    		}
	    	})
	    },

	    moreList: function(){
		    this.listNum = this.addressList.length;
	    },

	    setDefault: function(addressId){
		    this.addressList.forEach((item,index)=>{
			    if(item.addressId==addressId){
			    	item.isDefault = true;
			    }else{
			    	item.isDefault = false;
			    }
		    })
		    
	    },

	    delAddress: function (index) {
	    	this.addressList.splice(index,1)
	    },

	    // changeAddress: function(item,index){
	    // 	this.addressList[index] = 
	    // }
	}
})