module.exports = function(babel) {
  return {
    name: 'test',
    inherits: require('@babel/plugin-syntax-jsx'),
    visitor: {
      ImportDeclaration() {
      },
      Program() {
      },
      JSXAttribute() {
      },
      CallExpression: {
        exit() {
        }
      }
    }
  }
}
