export const loadingMixin = {
  computed: {
    isLoading() {
      if (this.saveButtonClick) {
        return {
          display: "block",
        };
      } else {
        return {
          display: "none",
        };
      }
    },
  },
};
