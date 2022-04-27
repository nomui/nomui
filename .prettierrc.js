const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.prettier,
  singleQuote: true,
  semi: false,
  editor:{
    formatOnSave:true
  }
};
