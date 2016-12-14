const hello = new Vue({
  el: '#hello',
  data: {
    message: 'Hello World!',
    number: 42,
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
    five: true,
    ten: true,
    hour: true,
    today: false,
    totalTweets: 34124,
    todayT: 3,
    weekT: 16,
  },
  created: function () {
    this.tweetsWhen()
  },
  methods: {
    tweetsWhen() {
      this.$http.get('/api/maxtweets')
      .then(function(res){
        this.totalTweets = JSON.parse(res.body)[0]
        this.five = JSON.parse(res.body)[1].in_five_min === "False" ? false : true;
        this.ten = JSON.parse(res.body)[1].in_ten_min === "False" ? false : true;
        this.hour = JSON.parse(res.body)[1].last_hour === "False" ? false : true;
        this.today = JSON.parse(res.body)[1].today === "False" ? false : true;
      }, function(err){
        throw err
      })
    }
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
