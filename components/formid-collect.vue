<template>
  <view>
    <form
      @submit="formSubmit"
      report-submit="true"
      class="formid-button"
    >
      <button form-type="submit">
        <view class='formid-button-wrap'>
          <slot />
        </view>
      </button>
    </form>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    formSubmit(e) {
			this.postFormId(e.detail.formId);
    },
		async postFormId(id) {
			let res = await this.myRequest('/api/user/store-form-id', {
				form_id: id
			}, 'POST', true, false);
		}
  }
};
</script>

<style lang="scss">
.formid-button {
  button {
		height: 0;
    line-height: normal;
    padding: 0;
    overflow: visible;
  }
  button::after {
    border: none;
  }
  button:hover {
    color: #333 !important;
  }
}

.formid-button-wrap {
  background: white;
  top: 0;
  text-align: left;
  overflow: visible;
}
</style>
