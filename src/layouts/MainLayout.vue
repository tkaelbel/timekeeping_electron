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

        <div>
          <!-- <q-btn flat icon="watch_later" label="Timekeeper" /> -->
          <!-- <q-img icon="watch_later"></q-img> -->
          <!-- <q-img
            class="q-mr-lg"
            src="../statics/timekeeper_1.png"
            width="250px"
            height="42px"
          /> -->
        </div>

        <div class="gt-sm">
          <q-btn flat icon="schedule" label="Timekeeping" to="/" />
          <q-btn
            flat
            icon="calculate"
            label="Time-Calculator"
            to="/timecalculator"
          />
          <q-btn flat icon="build" label="Configuration" to="/configuration" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered :width="200">
      <q-list padding>
        <q-item clickable to="/">
          <q-item-section avatar>
            <q-icon name="schedule" size="25px" />
          </q-item-section>
          <q-item-section>TIMEKEEPING</q-item-section>
        </q-item>

        <q-item clickable to="/timecalculator">
          <q-item-section avatar>
            <q-icon name="calculate" size="25px" />
          </q-item-section>
          <q-item-section>TIME-CALCULATOR</q-item-section>
        </q-item>

        <q-item clickable to="/configuration">
          <q-item-section avatar>
            <q-icon name="build" size="25px" />
          </q-item-section>
          <q-item-section>CONFIGURATION</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <div>
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access*/

import { defineComponent, ref, onMounted } from 'vue';
import { CustomWindow } from 'src/models/custom-window';
import { useConfigurationStore } from 'src/store/store';
import { IConfigurationStore } from 'src/models/store-model';

declare let window: CustomWindow;

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const leftDrawerOpen = ref(false);

    const configurationStore = useConfigurationStore();

    onMounted(async () => {
      // here we need to load the configuration file and also date existing files
      try {
        const file = (await window?.fileHandler.readFile(
          './configuration.json'
        )) as string;

        console.debug('Loaded configuration.json successfully');
        console.log(file);

        // set configuration state
        const { yearlyVacationDays, weeklyHoursWorking } = JSON.parse(
          file
        ) as IConfigurationStore;
        configurationStore.yearlyVacationDays = yearlyVacationDays;
        configurationStore.weeklyHoursWorking = weeklyHoursWorking;
      } catch (error) {
        console.error(
          'Could not load configuration.json. Defaults will be used'
        );
      }
    });

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
