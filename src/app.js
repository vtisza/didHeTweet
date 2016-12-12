const hello = new Vue({
  el: '#hello',
  data: {
    message: 'Hello World!',
    number: 12,
    evenNumber: false
  },
  methods: {
    randomMsg: function () {
      this.number = Math.round(Math.random() * 100)
      this.evenNumber = !(this.evenNumber)
    }
  }
})
