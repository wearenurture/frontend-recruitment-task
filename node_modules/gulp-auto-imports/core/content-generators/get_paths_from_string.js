var remove_dupes = require('../helpers/remove_dupes')

module.exports = function get_paths_from_string(string) {
   var pathRegEx = /\.\.?\/[^\n"?:*<>|]+\.[A-z0-9]+/g
   var paths = string.match(pathRegEx) || []
   return remove_dupes(paths)
}
