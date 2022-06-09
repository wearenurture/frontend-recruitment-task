var formatPath = require('./formatPath')
var formatName = require('./formatName')
var Unique_Set = require('../helpers/Unique_Set')
var createPathObj = require('../helpers/createPathObj')

module.exports = function format_paths({
   relativePaths,
   format,
   formatReplace,
   formatKey,
   options,
}) {
   var uniqueSet = new Unique_Set()
   var formattedPaths = relativePaths.map(filePath => {
      var step_1_pathFormatted = formatPath(filePath, format, options)
      var step_2_nameFormatted = formatName(
         filePath,
         step_1_pathFormatted,
         uniqueSet
      )
      if (formatReplace) {
         return formatReplace({
            output: step_2_nameFormatted,
            format,
            formatKey,
            path: createPathObj(filePath),
         })
      }
      return step_2_nameFormatted
   })
   return formattedPaths.join('\n')
}
