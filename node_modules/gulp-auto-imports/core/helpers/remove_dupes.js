// Remove duplicate items from an array
module.exports = function remove_dupes(array) {
   return array.filter((value, index, self) => self.indexOf(value) === index)
}
