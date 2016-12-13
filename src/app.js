const hello = new Vue({
  el: '#hello',
  data: {
    message: 'Hello World!',
    number: 12,
    evenNumber: false,
  },
  methods: {
    randomMsg: function () {
      this.number = Math.round(Math.random() * 100)
      this.evenNumber = !(this.evenNumber)
    }
  }
})

const pastT = new Vue({
  el: '#pastTweets',
  data: {
    five: false,
    ten: false,
    hour: true,
    today: true,
    totalTweets: 34124,
    todayT: 3,
    weekT: 16,
  },
  computed: {
    daysAvg: function () {
      let startD = new Date(18/3/2009)
      let endD = new Date()
      let timeDiff = Math.abs(startD.getTime() - endD.getTime())
      return Math.round(this.totalTweets / Math.ceil(timeDiff / (1000 * 3600 * 24)) * 100) / 100
    }
  }
})
