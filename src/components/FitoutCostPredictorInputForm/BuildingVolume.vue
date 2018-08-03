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
      id="floorHeightInput"
      v-model="floorHeight"
      :error-messages="floorHeightErrors"
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

  data() {
    return {
      floorArea: '',
      floorHeight: '',
      buildingVolumeUnit: 'cubic foot',
      errorMessage: 'So sorry, there\'s been an error - ' +
          'please try again later',
    };    
  },

  computed: {
    ...mapGetters([
      'getAreVolumeInputsDirty',
    ]),

    buildingVolumeValue() {
      return parseFloat(this.floorArea)
      * parseFloat(this.floorHeight);
    },

    floorAreaErrors() {
      const errors = [];
      if (this.$v.floorArea.$error) {
        errors.push('Please provide a floor area (minimum 10000 sq.ft.)');
      }
      return errors;
    },

    floorHeightErrors() {
      const errors = [];
      if (this.$v.floorHeight.$error) {
        errors.push('Please provide a floor height (minimum 2.5 m.)');
      }
      return errors;
    },
  },

  watch: {
    buildingVolumeValue: function (newBuildingVolumeValue) {
      this.UPDATE_BUILDING_VOLUME_VALUE(newBuildingVolumeValue);

      this.UPDATE_IS_BUILDING_VOLUME_INVALID(this.$v.$invalid);
    },

    getAreVolumeInputsDirty: function (newAreVolumeInputsDirty) {
      if (newAreVolumeInputsDirty) {
        this.$v.$touch();
      }
    },
  },

  created() {
    this.UPDATE_IS_BUILDING_VOLUME_INVALID(this.$v.$invalid);
  },

  validations: {
    floorArea: { 
      required,
      minValue: minValue(10000),
    },
      
    floorHeight: { 
      required, 
      minValue: minValue(2.5), 
    },
  },
  
  methods: {
    ...mapMutations([
      'UPDATE_BUILDING_VOLUME_VALUE',
      'UPDATE_IS_BUILDING_VOLUME_INVALID',
    ]),
  },
};
</script>
