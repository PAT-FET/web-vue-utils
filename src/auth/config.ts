export default function config () {
  return {
    userId: 'username',
    token: {
      enabled: true,
      key: 'X-Token',
      storage: {
        get: function () {
          return window.localStorage['X-Token']
        },
        set: function (token: string) {
          window.localStorage['X-Token'] = token
        }
      },
      resolvePath () {
        return window.location.hash.substr(1)
      }
    }
  }
}


