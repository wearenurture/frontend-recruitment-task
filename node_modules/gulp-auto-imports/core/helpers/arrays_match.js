module.exports = function arrays_match(array1, array2) {
   var string1 = JSON.stringify(array1)
   var string2 = JSON.stringify(array2)
   return string1 === string2
}
