var path = require('path')

var slash = require('../helpers/slash')
var join = require('../helpers/join')

module.exports = function get_relative_path(file, dest) {
   var from = slash(join([file.cwd, dest]))
   var to = slash(file.history[0])
   var relativePath = slash(path.relative(from, to))
   var relFixDots = relativePath.replace(/^(\.\.?)/, '$1/')
   var relDotSlash = relFixDots.replace(/^([^.\/])/, './$1')
   var relDupesRemoved = relDotSlash.replace(/\/\//g, '/')

   return relDupesRemoved
}
