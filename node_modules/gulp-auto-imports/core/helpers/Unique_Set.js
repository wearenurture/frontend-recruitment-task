module.exports = function Unique_Set() {
   this.index = 1
   this.array = []

   this.test = string => this.array.indexOf(string) === -1
   this.increment = () => this.index++
   this.genString = string => `${string}_${this.index}`

   this.add = function (string) {
      var isUnique = this.test(string)
      if (isUnique) {
         this.array.push(string)
         return string
      } else {
         var uniqueString = this.genString(string)

         if (this.test(uniqueString)) {
            this.array.push(uniqueString)
            return uniqueString
         } else {
            this.increment()
            return this.add(this.genString(string))
         }
      }
   }
}
