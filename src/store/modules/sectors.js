const getters = {
  getSectors: (state) => {
    const sectors = state.sectors;
    return sectors.sort();
  },
};
  
const state = {
  sectors: [
    'Charity',
    'Consulting',
    'Design',
    'Education',
    'Energy',
    'Fashion retail',
    'Financial services',
    'Food and drink',
    'Hospitality',
    'Landlord fitout',
    'Legal',
    'Life sciences',
    'Media',
    'Public sector',
    'Retail',
    'Serviced office',
    'Technology',
    'Transportation'],
};  
  
export default {
  state,
  getters,
};
