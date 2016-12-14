const pastT = new Vue({
  el: '#pastTweets',
  data: {
    five: true,
    ten: true,
    hour: true,
    today: false,
    totalTweets: 0,
    totalTweetsAnim: 0,
    todayT: 3,
    weekT: 16,
    lastTweet: '',
  },
  created: function () {
    this.tweetsWhen()
  },
  methods: {
    tweetsWhen() {
      this.$http.get('/api/maxtweets')
      .then(function(res){
        this.totalTweets = JSON.parse(res.body)[0]
        let ltt = new Date(JSON.parse(res.body)[1].time);
        let endT = new Date();
        this.lastTweet = Math.abs(ltt.getTime() - endT.getTime()) / (1000 * 3600 / 60);
        // this.five = JSON.parse(res.body)[1].in_five_min === "False" ? false : true;
        // this.ten = JSON.parse(res.body)[1].in_ten_min === "False" ? false : true;
        // this.hour = JSON.parse(res.body)[1].last_hour === "False" ? false : true;
        // this.today = JSON.parse(res.body)[1].today === "False" ? false : true;
        this.five = this.lastTweet < 5
        this.ten = this.lastTweet < 10
        this.hour = this.lastTweet < 60
        this.today = ltt.getDate() === endT.getDate()
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
  },
  watch: {
    totalTweets: function(newValue, oldValue) {
      var vm = this
      function animate (time) {
        requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      new TWEEN.Tween({ tweeningNumber: oldValue })
        .easing(TWEEN.Easing.Quadratic.Out)
        .to({ tweeningNumber: newValue }, 2000)
        .onUpdate(function () {
          vm.totalTweetsAnim = this.tweeningNumber.toFixed(0)
        })
        .start()
      animate()
    }
  }
})
