<template>
  <div>
    <v-text-field
      id="floorAreaInput"
      v-model="floorArea"
      :error-messages="floorAreaErrors"
      class="floorAreaInput"
      type="number"
      name="floor-area-input"
      label="Floor area (min. 10000 sq. ft.)"/>
    <v-text-field
      id="averageFloorHeightInput"
      v-model="averageFloorHeight"
      :error-messages="averageFloorHeightErrors"
      type="number"
      name="floor-height-input"
      label="Slab to slab floor height (min. 2.5m)"/>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { required, minValue } from 'vuelidate/lib/validators';

export default {
  name: 'BuildingVolume',

  computed: {
    ...mapGetters([
      'getFloorAreaValue',
      'getAverageFloorHeightValue',
      'getAreVolumeInputsDirty',
    ]),

    floorArea: {
      set(floorArea) {
        this.UPDATE_FLOOR_AREA(floorArea);
        this.UPDATE_IS_BUILDING_VOLUME_INVALID(this.$v.$invalid);
      },

      get() {
        return this.getFloorAreaValue;
      },
    },

    averageFloorHeight: {
      set(averageFloorHeight) {
        this.UPDATE_AVERAGE_FLOOR_HEIGHT(averageFloorHeight);
        this.UPDATE_IS_BUILDING_VOLUME_INVALID(this.$v.$invalid);
      },

      get() {
        return this.getAverageFloorHeightValue;
      },
    },

    floorAreaErrors() {
      const errors = [];
      if (this.$v.floorArea.$error) {
        errors.push('Please provide a floor area (minimum 10000 sq.ft.)');
      }
      return errors;
    },

    averageFloorHeightErrors() {
      const errors = [];
      if (this.$v.averageFloorHeight.$error) {
        errors.push('Please provide a floor height (minimum 2.5 m.)');
      }
      return errors;
    },
  },

  validations: {
    floorArea: { 
      required,
      minValue: minValue(10000),
    },
      
    averageFloorHeight: { 
      required, 
      minValue: minValue(2.5), 
    },
  },

  watch: {
    getAreVolumeInputsDirty: function (newAreVolumeInputsDirty) {
      if (newAreVolumeInputsDirty) {
        this.$v.$touch();
      }
    },
  },

  created() {
    this.UPDATE_IS_BUILDING_VOLUME_INVALID(this.$v.$invalid);
  },
  
  methods: {
    ...mapMutations([
      'UPDATE_FLOOR_AREA',
      'UPDATE_AVERAGE_FLOOR_HEIGHT',
      'UPDATE_IS_BUILDING_VOLUME_INVALID',
    ]),
  },
};
</script>
