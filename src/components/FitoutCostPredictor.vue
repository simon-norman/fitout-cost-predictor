<template>
  <v-content
    id="fitout-predictor-padding"
    class="fitout-predictor-component">
    <v-container 
      fluid
      fill-height>
      <v-layout
        justify-center
        align-center
      >
        <v-flex 
          xs12 
          sm7 
          md5
          lg4
          xl3
          @keyup.enter="calculateCostPrediction()"          
        >
          <div class="form">
            <v-text-field
              id="floorAreaInput"
              v-model="fitoutCostPredictionInputs.floorArea"
              :error-messages="floorAreaErrors"
              class="floorAreaInput"
              type="number"
              name="floor-area-input"
              label="Floor area (min. 10000 sq. ft.)"/>
            <v-text-field
              id="floorHeightInput"
              v-model="fitoutCostPredictionInputs.floorHeight"
              :error-messages="floorHeightErrors"
              type="number"
              name="floor-height-input"
              label="Slab to slab floor height (min. 2.5m)"/>
            <v-radio-group 
              :value="catTypeRadioButtonSelected"
              :error-messages="catAcatBErrorMessage"
              label="Fit out category type:"
              column>
              <v-radio 
                class="isCatAIncludedInput"
                value="catASelected" 
                label="Cat A"
                @click="setCatAOnly()"/>
              <v-radio 
                id="isCatBIncludedInput"
                class="isCatBIncludedInput"
                value="catBSelected" 
                label="Cat B"
                @click="setCatBOnly()"/>
              <v-radio 
                class="isCatAAndBIncludedInput"
                value="catAAndBSelected" 
                label="Cat A and B"
                @click="setCatAAndB()"/>
            </v-radio-group>
            <v-select
              id="sectorSelector"
              :items="getSectors"
              v-model="fitoutCostPredictionInputs.selectedSector"
              :error-messages="sectorErrors"
              content-class="sector-dropdown-list"
              label="Sector"
            />
          </div>
          <v-btn 
            id="calculateCostPrediction"
            class="spacelab-btn"
            block 
            @click="calculateCostPrediction()">Calculate cost prediction</v-btn>
          <div 
            id="displayedCostPrediction" 
            class="large-title">Cost:  {{ fitoutCostPrediction.cost }}</div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { required, minValue } from 'vuelidate/lib/validators';
import FitoutCostPredictorApi from '../api/fitoutCostPredictorApi';
import { handleError } from '../error_handler/errorHandler';
import ErrorWithCustomMsgToUser from '../error/errorWithCustomMsgToUser';

const fitoutCostPredictorApi = new FitoutCostPredictorApi();

export default {
  name: 'FitoutCostPredictor',

  data() {
    return {
      fitoutCostPrediction: {
        cost: '',
      },
      fitoutCostPredictionInputs: {
        floorArea: '',
        floorHeight: '',
        isCatAIncluded: false,
        isCatBIncluded: false,
        selectedSector: '',
      },
      buildingVolumeUnit: 'cubic foot',
      errorMessage: 'So sorry, there\'s been an error - ' +
          'please try again later',
    };    
  },

  computed: {
    ...mapGetters([
      'getSectors',
    ]),

    buildingVolumeValue() {
      return parseFloat(this.fitoutCostPredictionInputs.floorArea)
      * parseFloat(this.fitoutCostPredictionInputs.floorHeight);
    },

    catTypeRadioButtonSelected() {
      let catTypeSelected;

      if (this.fitoutCostPredictionInputs.isCatAIncluded && 
      !this.fitoutCostPredictionInputs.isCatBIncluded) {
        catTypeSelected = 'catASelected';
      } else if (!this.fitoutCostPredictionInputs.isCatAIncluded && 
      this.fitoutCostPredictionInputs.isCatBIncluded) {
        catTypeSelected = 'catBSelected';
      } else if (this.fitoutCostPredictionInputs.isCatAIncluded && 
      this.fitoutCostPredictionInputs.isCatBIncluded) {
        catTypeSelected = 'catAAndBSelected';
      }

      return catTypeSelected;
    },

    floorAreaErrors() {
      const errors = [];
      if (this.$v.fitoutCostPredictionInputs.floorArea.$error) {
        errors.push('Please provide a floor area (minimum 10000 sq.ft.)');
      }
      return errors;
    },

    floorHeightErrors() {
      const errors = [];
      if (this.$v.fitoutCostPredictionInputs.floorHeight.$error) {
        errors.push('Please provide a floor height (minimum 2.5 m.)');
      }
      return errors;
    },

    catAcatBErrorMessage() {
      const errors = [];
      if (this.$v.fitoutCostPredictionInputs.isEitherCatAOrBIncluded.$error) {
        errors.push('Please select the fitout category');
      }
      return errors;
    },

    sectorErrors() {
      const errors = [];
      if (this.$v.fitoutCostPredictionInputs.selectedSector.$error) {
        errors.push('Please select a sector');
      }
      return errors;
    },
  },

  validations: {
    fitoutCostPredictionInputs: {
      floorArea: { 
        required,
        minValue: minValue(1000),
      },
      
      floorHeight: { 
        required, 
        minValue: minValue(2.5), 
      },

      isCatBIncluded: {
        required(v) {
          return this.fitoutCostPredictionInputs.isCatAIncluded || required(v);
        },
      },

      isCatAIncluded: {
        required(v) {
          return this.fitoutCostPredictionInputs.isCatBIncluded || required(v);
        },
      },
      
      isEitherCatAOrBIncluded: ['fitoutCostPredictionInputs.isCatAIncluded', 'fitoutCostPredictionInputs.isCatBIncluded'],

      selectedSector: { 
        required, 
      },
    },
  },
  
  methods: {
    ...mapMutations([
      'UPDATE_ERROR_MESSAGE',
      'UPDATE_ERROR_STATUS',
    ]),

    async calculateCostPrediction() {
      if (this.arePredictionParametersValid()) {
        try {
          const cost = await this.getCostPrediction();
          this.fitoutCostPrediction.cost = this.formatCost(cost);
        } catch (error) {
          handleError(error);
        }
      }
    },

    arePredictionParametersValid() {
      this.$v.$touch();
      if (!this.$v.$error) {
        this.$v.$reset();
        return true;
      }
      return false;
    },

    getCostPrediction() {
      return fitoutCostPredictorApi.getFitoutCostPrediction({
        buildingVolume: {
          buildingVolumeValue: this.buildingVolumeValue,
          buildingVolumeUnit: this.buildingVolumeUnit,
        },
        isCatAIncluded: this.fitoutCostPredictionInputs.isCatAIncluded,
        isCatBIncluded: this.fitoutCostPredictionInputs.isCatBIncluded,
        sector: this.fitoutCostPredictionInputs.selectedSector,
      }).then((resp) => resp.data.cost);
    },

    formatCost(predictedCost) {
      const costFormattedAsNumber = Number.parseFloat(predictedCost);

      if (Number.isNaN(costFormattedAsNumber)) {
        throw new Error('Cost prediction value is not a number');
      } else if (costFormattedAsNumber < 0.01) {
        throw new ErrorWithCustomMsgToUser('Cost prediction is less than £10k, which is too small to be considered accurate');
      } else if (costFormattedAsNumber < 0.999) {
        return this.formatCostInThousands(costFormattedAsNumber);
      } else {
        return this.formatCostInMillions(costFormattedAsNumber);
      }
    },

    formatCostInThousands(costFormattedAsNumber) {
      const costFormattedInThousands = costFormattedAsNumber * 1000;
      const costThreeSignificantFigures = costFormattedInThousands.toPrecision(3);
      return `£${costThreeSignificantFigures}k`;
    },

    formatCostInMillions(costFormattedAsNumber) {
      const costFormattedToTwoDecimals = costFormattedAsNumber.toFixed(2);
      return `£${costFormattedToTwoDecimals}m`;
    },

    setCatAOnly() {
      this.fitoutCostPredictionInputs.isCatAIncluded = true;
      this.fitoutCostPredictionInputs.isCatBIncluded = false;
    },

    setCatBOnly() {
      this.fitoutCostPredictionInputs.isCatAIncluded = false;
      this.fitoutCostPredictionInputs.isCatBIncluded = true;
    },

    setCatAAndB() {
      this.fitoutCostPredictionInputs.isCatAIncluded = true;
      this.fitoutCostPredictionInputs.isCatBIncluded = true;
    },
  },
};
</script>
