<template>
  <v-alert 
    id="errorAlert"
    v-model="errorStatus"  
    class="spacelab-alert"
    transition="scale-transition"
    type="error"
    dismissible>
    {{ getErrorMessage }}
  </v-alert>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Alert',

  computed: {
    ...mapGetters([
      'getErrorMessage',
      'getErrorStatus',
    ]),
    errorStatus: {
      get() {
        return this.getErrorStatus;
      },
      set(errorStatus) {
        this.UPDATE_ERROR_STATUS(errorStatus);
      },
    },
  },
  methods: {
    ...mapMutations([
      'UPDATE_ERROR_STATUS',
    ]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
