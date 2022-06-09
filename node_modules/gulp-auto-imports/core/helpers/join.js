var slash = require('./slash')

module.exports = function join(array) {
   return slash(array.join('/'))
}
