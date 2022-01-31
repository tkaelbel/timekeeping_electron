<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <div class="lt-md">
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
          />
        </div>

        <div class="gt-sm">
          <q-btn flat icon="schedule" label="Zeiterassung" to="/" />
          <q-btn
            flat
            icon="calculate"
            label="Zeitrechner"
            to="/timecalculator"
          />
          <q-btn flat icon="build" label="Konfiguration" to="/configuration" />
        </div>

        <div>
          <q-toggle
            class="fixed-top-right"
            color="secondary"
            v-model="isAutoSave"
            checked-icon="save"
            unchecked-icon="clear"
            size="lg"
          >
            <q-tooltip>
              Automatisches Speichern ist {{ isAutoSave ? 'an' : 'aus' }}
            </q-tooltip>
          </q-toggle>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered :width="200">
      <q-list padding>
        <q-item clickable to="/">
          <q-item-section avatar>
            <q-icon name="schedule" size="25px" />
          </q-item-section>
          <q-item-section>Zeiterfassung</q-item-section>
        </q-item>

        <q-item clickable to="/timecalculator">
          <q-item-section avatar>
            <q-icon name="calculate" size="25px" />
          </q-item-section>
          <q-item-section>Zeitrechner</q-item-section>
        </q-item>

        <q-item clickable to="/configuration">
          <q-item-section avatar>
            <q-icon name="build" size="25px" />
          </q-item-section>
          <q-item-section>Konfiguration</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <div>
        <router-view />
      </div>
      <popup :show="isShown" :message="text" :is-positive="isPositive"></popup>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CustomWindow } from 'src/models/custom-window';
import { useConfigurationStore, useTimekeepingStore } from 'src/store/store';
import { IConfigurationStore } from 'src/models/store-model';
import { IData } from 'src/models/month-model';
import { storeToRefs } from 'pinia';

import Popup from 'components/Popup.vue';
import { handleAutoSave } from 'src/services/auto-save-handler';

declare const window: CustomWindow;

export default defineComponent({
  name: 'MainLayout',
  components: { Popup },
  async setup() {
    const leftDrawerOpen = ref(false);

    const configurationStore = useConfigurationStore();

    const { isAutoSave } = storeToRefs(configurationStore);

    const timekeeperStore = useTimekeepingStore();

    // popup
    const isShown = ref(false);
    const text = ref('Gespeichert');
    const isPositive = ref(true);

    // here we need to load the configuration file and also date existing files
    try {
      const file = await window?.fileHandler.readFile('./configuration.json');
      console.debug('Loaded configuration.json successfully');

      // set configuration state
      const {
        yearlyVacationDays,
        weeklyHoursWorking,
        isAutoSave,
        autoSaveTimeSeconds,
      } = JSON.parse(file) as IConfigurationStore;
      configurationStore.yearlyVacationDays = yearlyVacationDays
        ? yearlyVacationDays
        : configurationStore.yearlyVacationDays;
      configurationStore.weeklyHoursWorking = weeklyHoursWorking
        ? weeklyHoursWorking
        : configurationStore.weeklyHoursWorking;
      configurationStore.isAutoSave = isAutoSave
        ? isAutoSave
        : configurationStore.isAutoSave;
      configurationStore.autoSaveTimeSeconds = autoSaveTimeSeconds
        ? autoSaveTimeSeconds
        : configurationStore.autoSaveTimeSeconds;
    } catch (error) {
      console.error('Could not load configuration.json. Defaults will be used');
    }

    try {
      const file = await window?.fileHandler.readFile('./data.json');
      console.debug('Loaded data.json successfully');

      // set configuration state
      const data = JSON.parse(file) as IData;
      timekeeperStore.data = data;
    } catch (error) {
      console.error('Could not load data.json. Defaults will be used');
    }

    if (configurationStore.isAutoSave === true)
      handleAutoSave(isShown, text, isPositive);

    // auto save
    configurationStore.$subscribe(() => {
      handleAutoSave(isShown, text, isPositive);
    });

    return {
      leftDrawerOpen,
      isAutoSave,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      isShown,
      text,
      isPositive,
    };
  },
});
</script>
