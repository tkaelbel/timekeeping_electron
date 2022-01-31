import { Ref } from 'vue';

const showPopup = (
  isShown: Ref<boolean>,
  text: Ref<string>,
  isPositive: Ref<boolean>,
  msg?: string,
  positive?: boolean
) => {
  isShown.value = true;
  text.value = msg ? msg : text.value;
  isPositive.value = positive === false ? false : true;
  setTimeout(() => {
    isShown.value = false;
  }, 3000);
};

export { showPopup };
