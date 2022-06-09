var get_ordered_paths = require('./get_ordered_paths')
var generate_content = require('./generate_content')

module.exports = function order_content({ oldContent, newPaths, opt }) {
   var orderedPaths = get_ordered_paths({ oldContent, newPaths })
   return generate_content({ pathsArray: orderedPaths, opt })
}
