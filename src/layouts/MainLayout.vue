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

// import { useFileHandler } from 'app/src-electron/filehandler';
import { defineComponent, ref, onMounted } from 'vue';
import { CustomWindow } from 'src/models/custom-window';

declare let window: CustomWindow;

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const leftDrawerOpen = ref(false);

    onMounted(async () => {
      // here we need to load the configuration file and also date existing files
      const file = (await window?.fileHandler.readFile(
        'C:/Development/git_repository/timekeeping/weather.json'
      )) as JSON;
      console.log(file);
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
