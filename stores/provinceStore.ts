import { defineStore } from 'pinia';

export const useStore = defineStore('provinceStore', {
  state: () => ({
    code: '',
    province: {},
  }),
  actions: {
    setCode(value: string) {
      this.code = value;
    },
    setProvince(value: object) {
      this.province = value;
    },
  }
});
