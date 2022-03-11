<template>
  <div class="post ">
    <router-link
      :to="{
        name: 'profile',
        params: {
          id: this.post.user,
          profile: { id: this.post.user, name: this.post.name }
        }
      }"
    >
      <p class="user">{{ this.post.name }}</p>
    </router-link>
    <p class="time">{{ formattedDate }}</p>
    <p class="text">{{ this.post.text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    post: Object
  },
  computed: {
    formattedDate() {
      let days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ]
      let months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]

      let dateString = ''
      let date = new Date(this.post.date)
      let today = new Date()

      let todayMidnight = new Date()
      todayMidnight.setHours(0)
      todayMidnight.setMinutes(0)
      let timeDifference = todayMidnight.getTime() - date.getTime()
      let dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24))

      // Calculate date string
      if (date.getFullYear() == today.getFullYear()) {
        if (
          date.getMonth() == today.getMonth() &&
          date.getDate() == today.getDate()
        ) {
          dateString += 'Today'
        } else if (dayDifference <= 1) {
          dateString += 'Yesterday'
        } else if (dayDifference < 7) {
          dateString += days[date.getDay().toString()]
        } else {
          dateString +=
            date.getDate().toString() + ' ' + months[date.getMonth()]
        }
      } else {
        dateString +=
          date.getDate().toString() +
          ' ' +
          months[date.getMonth()] +
          ' ' +
          date.getFullYear().toString()
      }

      // Calculate time string
      dateString += ' '
      if (date.getHours() < 10)
        dateString += '0' + date.getHours().toString() + ':'
      else dateString += date.getHours().toString() + ':'
      if (date.getMinutes() < 10)
        dateString += '0' + date.getMinutes().toString()
      else dateString += date.getMinutes().toString()

      return dateString
    }
  }
}
</script>

<style lang="scss" scoped>
.post {
  max-width: 700px;
  background-color: rgba(#ffffff, 0.05);
  border-radius: 15px;
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 24px;
  text-align: left;
}
.user {
  color: #42b983;
  font-weight: bolder;
  padding-right: 6px;
  display: inline;
  cursor: pointer;
}
.time {
  color: rgba(#ffffff, 0.38);
  font-size: 14px;
  display: inline;
  cursor: default;
}
.text {
  color: rgba(#ffffff, 0.87);
  display: block;
  word-wrap: normal;
  margin-top: 5px;
  margin-bottom: 5px;
  cursor: default;
}
</style>
