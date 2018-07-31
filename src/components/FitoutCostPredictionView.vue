<template>
  <v-content>
    <v-container 
      fluid 
      fill-height>
      <v-layout 
        justify-center
        align-center>
        <v-flex 
          xs12 
          sm7 
          md5
          lg4
          xl3>
          <v-layout 
            v-for="(fitoutCostItem, index) in fitoutCostItems"
            :class="getCostItemClass(fitoutCostItem.costCategory)"
            :key="index"
            row>
            <v-layout column>
              <div 
                id="displayedCostPrediction">{{ fitoutCostItem.costCategory }}:</div>
            </v-layout> 
            <v-layout 
              column 
              align-end>
              <div 
                id="displayedCostPrediction">{{ fitoutCostItem.cost }} </div>
            </v-layout>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>

export default {
  name: 'FitoutCostPredictionView',

  data() {
    return {
      fitoutCostItems: [
        { costCategory: 'Total', cost: '£5m' },
        { costCategory: 'Construction', cost: '£2m' },
        { costCategory: 'M&E', cost: '£1.5m' },
        { costCategory: 'Furniture', cost: '£250k' },
        { costCategory: 'AV / IT', cost: '£750k' },
        { costCategory: 'Fees', cost: '£500k' },
      ],
    };    
  },

  methods: {
    getCostItemClass(costCategory) {
      if (costCategory === 'Total') {
        return { 'cost-total': true };
      } 
      return { 'cost-item': true };
    },
  },
};
</script>
