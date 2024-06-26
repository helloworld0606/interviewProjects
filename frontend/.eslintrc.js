module.exports = {
    env: {
      node: true, 
      browser: true 
    },
    parserOptions: {
      parser: '@babel/eslint-parser',
      requireConfigFile: false 
    },
    extends: [
      'plugin:vue/vue3-essential',
      'eslint:recommended'
    ],
    rules: {
      
    }
  };
  