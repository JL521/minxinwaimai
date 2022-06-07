Component({
  properties: {
    list: {
      type: Array,
      value: []
    },
    isOrder:{
      type:Boolean,
      value:false
    }
  },

  
  methods:{
    add(e){
      var data = e.currentTarget.dataset.item
      this.triggerEvent('add',{type:0,item:data})
    },
    del(e){
      var data = e.currentTarget.dataset.item
      console.log(data)
      this.triggerEvent('del',{type:0,item:data})
    },
  }
})

