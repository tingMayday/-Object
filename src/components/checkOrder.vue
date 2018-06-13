<template>
  <div>
      <this-dialog :is-show="isShowCheckDialog" @on-close="checkStatus">
          请检查您的支付状态！
          <div class="button" @click="checkStatus">
              支付成功
          </div>
          <div class="button" @click="checkStatus">
              支付失败
          </div>
      </this-dialog>
      <this-dialog :is-show="isShowSuccessDialog" @on-close="toOrderList">
          购买成功！
          <div class="button" @click="toOrderList">确认</div>
      </this-dialog>
      <this-dialog :is-show="isShowFailDialog" @on-close="toOrderList">
          购买失败！
          <div class="button" @click="toOrderList">确认</div>
      </this-dialog>
  </div>
</template>

<script>
import Dialog from './base/dialog'
export default {
    components: {
        thisDialog: Dialog
    },
  props: {
    isShowCheckDialog:{
        type: Boolean,
        default: false
    },
    orderId: {
        type: [String, Number]
    }
  },
  data () {
    return {
      isShowSuccessDialog: false,
      isShowFailDialog: false
    }
  },
  methods: {
    checkStatus (index) {
      this.$http.get('/api/checkOrder', {
          orderId: this.orderId
      })
      .then(function(res){
          this.isShowSuccessDialog = true
          this.$emit('on-close-check-dialog')
      },function(err){
          this.isShowFailDialog = true
          this.$emit('on-close-check-dialog')
      })
    },
    toOrderList() {
        this.$router.push({path: '/orderList'})
        this.isShowSuccessDialog = false
        this.isShowFailDialog = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
