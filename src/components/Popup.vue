<template>
  <q-dialog v-model="props.show" seamless position="bottom">
    <q-card style="width: 250px" :class="props.isPositive ? 'bg-positive' : 'bg-negative'">
      <q-card-section class="row items-center no-wrap text-center">
        <div class="col">
          <span class="col text-h5 text-white">{{ props.message }}</span>
          <q-icon
            class="col text-white q-pb-xs q-pl-sm"
            :name="props.isPositive ? 'verified' : 'highlight_off'"
            size="xl"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Props {
  show: boolean;
  message: string;
  isPositive: boolean;
}

export default defineComponent({
  name: 'Popup',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isPositive: {
      type: Boolean,
      required: true,
    },
  },
  setup(props: Props) {
    return {
      props,
    };
  },
});
</script>
