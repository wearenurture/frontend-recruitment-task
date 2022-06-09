var get_paths_from_string = require('./get_paths_from_string')

module.exports = function get_ordered_paths({ oldContent, newPaths }) {
   var contains = (array, value) => array.indexOf(value) > -1
   var oldOrderedPaths = get_paths_from_string(oldContent)

   if (oldOrderedPaths.length < 1) {
      return newPaths
   }

   var newOrderedPaths = [].concat(oldOrderedPaths)
   newPaths.forEach(path => {
      if (!contains(oldOrderedPaths, path)) {
         var bestMatch = get_best_match(path, oldOrderedPaths)
         if (bestMatch.score < 2) {
            var originalIndex = newPaths.indexOf(path)
            newOrderedPaths.splice(originalIndex, 0, path)
         } else {
            newOrderedPaths.splice(bestMatch.index + 1, 0, path)
         }
      }
   })

   var finalPaths = newOrderedPaths.filter(path => {
      return contains(newPaths, path)
   })

   return finalPaths
}

function get_best_match(targetPath, comparisonArray) {
   var lineScores = comparisonArray.map(comparisonPath =>
      compare_paths(targetPath, comparisonPath)
   )
   var bestMatch = lineScores.reduce(
      (currentBestMatch, score, index) => {
         if (currentBestMatch.score <= score) {
            currentBestMatch = {
               index: index,
               score: score,
            }
         }
         return currentBestMatch
      },
      { score: 0, index: 0 }
   )

   return bestMatch
}

function compare_paths(targetPath, comparisonPath) {
   var targetArray = targetPath.replace(/\.?\.\//g, '').split('')
   var comparisonArray = comparisonPath.replace(/\.?\.\//g, '').split('')

   var i = 0
   var compare = i => targetArray[i] == comparisonArray[i]
   var isDefined = i => typeof targetArray[i] !== 'undefined'
   while (isDefined(i) && compare(i)) {
      i++
   }

   return i
}
