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
            <building-volume/>
            <fitout-category/>
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
import FitoutCostPredictorApi from '../../services/api/fitoutCostPredictorApi';
import { handleError } from '../../services/error_handling/error_handler/errorHandler';
import ErrorWithCustomMsgToUser from '../../services/error_handling/errors/errorWithCustomMsgToUser';
import BuildingVolume from './BuildingVolume.vue';
import FitoutCategory from './FitoutCategory.vue';

const fitoutCostPredictorApi = new FitoutCostPredictorApi();

export default {
  name: 'FitoutCostPredictor',

  components: {
    'building-volume': BuildingVolume,
    'fitout-category': FitoutCategory,
  },

  data() {
    return {
      fitoutCostPrediction: {
        cost: '',
      },
    };    
  },

  computed: {
    ...mapGetters([
      'getFloorAreaValue',
      'getFloorAreaUnit',
      'getAverageFloorHeightValue',
      'getAverageFloorHeightUnit',
      'getIsBuildingVolumeInvalid',
      'getFitoutCategory',
      'getIsFitoutCategoryInvalid',
    ]),
  },
  
  methods: {
    ...mapMutations([
      'UPDATE_FITOUT_COST_INPUTS_DIRTY',
    ]),

    async calculateCostPrediction() {
      this.setPredictionFormToDirty();
      if (this.arePredictionParametersValid()) {
        this.setPredictionFormToClean();
        try {
          const cost = await this.getCostPrediction();
          this.fitoutCostPrediction.cost = this.formatCost(cost);
        } catch (error) {
          handleError(error);
        }
      }
    },

    setPredictionFormToDirty() {
      this.UPDATE_FITOUT_COST_INPUTS_DIRTY(true);
    },

    arePredictionParametersValid() {
      if (!this.getIsBuildingVolumeInvalid && 
        !this.getIsFitoutCategoryInvalid) {
        return true;
      }
      return false;
    },

    setPredictionFormToClean() {
      this.UPDATE_FITOUT_COST_INPUTS_DIRTY(false);
    },

    getCostPrediction() {
      return fitoutCostPredictorApi.getFitoutCostPrediction({
        floorArea: {
          areaValue: this.getFloorAreaValue,
          areaUnit: this.getFloorAreaUnit,
        },
        averageFloorHeight: {
          heightValue: this.getAverageFloorHeightValue,
          heightUnit: this.getAverageFloorHeightUnit,
        },
        isCatAIncluded: this.getFitoutCategory.isCatAIncluded,
        isCatBIncluded: this.getFitoutCategory.isCatBIncluded,
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
  },
};
</script>
