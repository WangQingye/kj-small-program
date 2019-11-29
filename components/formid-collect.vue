<template>
  <view>
    <form
      @submit="formSubmit"
      @reset="formReset"
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
      console.log(e);
    },
    test() {
      console.log(111);
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
