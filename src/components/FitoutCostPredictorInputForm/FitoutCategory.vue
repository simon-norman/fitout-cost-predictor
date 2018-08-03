<template>
  <div>
    <v-radio-group 
      :value="catTypeRadioButtonSelected"
      :error-messages="catAcatBErrorMessage"
      label="Fit out category type:"
      column>
      <v-radio 
        class="isCatAIncludedInput"
        value="catASelected" 
        label="Cat A"
        @click="UPDATE_CAT_A_INCLUDED()"/>
      <v-radio 
        class="isCatBIncludedInput"
        value="catBSelected" 
        label="Cat B"
        @click="UPDATE_CAT_B_INCLUDED()"/>
      <v-radio 
        class="isCatAAndBIncludedInput"
        value="catAAndBSelected" 
        label="Cat A and B"
        @click="UPDATE_CAT_AB_INCLUDED()"/>
    </v-radio-group>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'FitoutCategory',

  computed: {
    ...mapGetters([
      'getAreFitoutCategoryInputsDirty',
      'getFitoutCategory',
    ]),

    catTypeRadioButtonSelected() {
      let catTypeSelected;

      if (this.fitoutCategory.isCatAIncluded && 
      !this.fitoutCategory.isCatBIncluded) {
        catTypeSelected = 'catASelected';
      } else if (!this.fitoutCategory.isCatAIncluded && 
      this.fitoutCategory.isCatBIncluded) {
        catTypeSelected = 'catBSelected';
      } else if (this.fitoutCategory.isCatAIncluded && 
      this.fitoutCategory.isCatBIncluded) {
        catTypeSelected = 'catAAndBSelected';
      }

      return catTypeSelected;
    },

    fitoutCategory: {
      get() {
        return this.getFitoutCategory;
      },
    },

    catAcatBErrorMessage() {
      const errors = [];
      if (this.$v.isEitherCatAOrBIncluded.$error) {
        errors.push('Please select the fitout category');
      }
      return errors;
    },
  },

  validations: {
    isCatBIncluded: {
      required(v) {
        return this.fitoutCategory.isCatAIncluded || required(v);
      },
    },

    isCatAIncluded: {
      required(v) {
        return this.fitoutCategory.isCatBIncluded || required(v);
      },
    },
      
    isEitherCatAOrBIncluded: ['isCatAIncluded', 'isCatBIncluded'],
  },

  watch: {
    fitoutCategory: function () {
      this.UPDATE_IS_FITOUT_CATEGORY_INVALID(this.$v.$invalid);
    },

    getAreFitoutCategoryInputsDirty: function (newAreFitoutCategoryInputsDirty) {
      if (newAreFitoutCategoryInputsDirty) {
        this.$v.$touch();
      }
    },
  },

  created() {
    this.UPDATE_IS_FITOUT_CATEGORY_INVALID(this.$v.$invalid);
  },

  methods: {
    ...mapMutations([
      'UPDATE_CAT_A_INCLUDED',
      'UPDATE_CAT_B_INCLUDED',
      'UPDATE_CAT_AB_INCLUDED',
      'UPDATE_IS_FITOUT_CATEGORY_INVALID',
    ]),
  },
};
</script>
