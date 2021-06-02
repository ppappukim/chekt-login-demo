
const ToolPlugin = {
  install (Vue) {
    let tool = {
      wait: function (time) {
        return new Promise(resolve => {
          setTimeout(() => { resolve() }, time)
        })
      },
      getParameterByName: function (name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url)
        if (!results) return null
        if (!results[2]) return ''
        return decodeURIComponent(results[2].replace(/\+/g, ' '))
      },
      getStorageKey: function (key) {
        if ((key.indexOf(`chekt::prod::`) > -1) || (key.indexOf(`chekt::dev::`) > -1)) {
          return key
        }
        if (Vue.env.isProduction) {
          return `chekt::prod::${key}`
        } 
        return `chekt::dev::${key}`
      },
      storageGetKeys: async function () {
        const { keys } = await Storage.keys()
        return keys
      },
      storageGetItem: async function (key) {
        key = this.getStorageKey(key)
        const { value } = await Storage.get({ key })
        return value
      },
      storageSetItem: function (key, value) {
        key = this.getStorageKey(key)
        return Storage.set({ key, value })
      },
      storageRemoveItem: function (key) {
        key = this.getStorageKey(key)
        return Storage.remove({ key })
      },
      setCookie: function (cname, cvalue, date) {
        let domain = this.getCookieDomainForCurrentDomain()
        if (!date) {
          let now = new Date()
          now.setFullYear(now.getFullYear() + 5)
          date = now.toUTCString()
        }
        document.cookie = encodeURIComponent(cname) + '=' + encodeURIComponent(cvalue) + ';expires=' + date + ';domain=' + domain + ';path=/'
      },
      getCookie: function (cname) {
        let name = encodeURIComponent(cname) + '='
        let cookie = document.cookie
        let ca = cookie.split(';')
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i]
          while (c.charAt(0) === ' ') {
            c = c.substring(1)
          }
          if (c.indexOf(name) === 0) {
            let cookieToReturn = decodeURIComponent(c.substring(name.length, c.length))
            if (cookieToReturn === 'undefined') return undefined
            else if (cookieToReturn === 'null') return null
            else if (cookieToReturn === 'NaN') return NaN
            else return cookieToReturn
          }
        }
        return ''
      },
      deleteCookie: function (cname) {
        this.setCookie(cname, 'meaning_less_string', 'Thu, 01 Jan 1970 00:00:01 GMT')
      },
      getCookieDomainForCurrentDomain: function () {
        let temp = window.location.hostname.split('.')
        if (temp.length > 1) {
          return '.' + temp[+temp.length - 2] + '.' + temp[+temp.length - 1]
        } else {
          return temp[0]
        }
      },
      redirectToUrl: function (url) {
        // similar behavior as an HTTP redirect
        window.location.replace(url)
      },
      decodeJwtToken: function (str) {
        return jwtDecode(str)
      },
      encodeToBase64: function (str) {
        return window.btoa(str)
      },
      decodeFromBase64: function (base64Str) {
        return window.atob(base64Str)
      },
      encodeToBase64Url: function (str) {
        let base64Str = this.encodeToBase64(str)
        var base64Url = base64Str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
        return base64Url
      },
      decodeFromBase64Url: function (base64Url) {
        if (!base64Url) return ''
        if (base64Url.length % 4 === 2) base64Url = base64Url + '=='
        if (base64Url.length % 4 === 3) base64Url = base64Url + '='
        let base64Str = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        let str = this.decodeFromBase64(base64Str)
        return str
      },
      newObject: function (src) {
        return JSON.parse(JSON.stringify(src))
      },
      createUUID4: function () {
        // return uuid of form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
        let uuid = ''
        for (let ii = 0; ii < 32; ii += 1) {
          switch (ii) {
            case 8:
            case 20:
              uuid += '-'
              uuid += (Math.random() * 16 | 0).toString(16)
              break
            case 12:
              uuid += '-'
              uuid += '4'
              break
            case 16:
              uuid += '-'
              uuid += (Math.random() * 4 | 8).toString(16)
              break
            default:
              uuid += (Math.random() * 16 | 0).toString(16)
          }
        }
        return uuid
      },
      copyTextToClipboard: function (text) {
        let textArea = document.createElement('textarea')
        textArea.style.position = 'fixed'
        textArea.style.top = 0
        textArea.style.left = 0
        textArea.style.width = '2em'
        textArea.style.height = '2em'
        textArea.style.padding = 0
        textArea.style.border = 'none'
        textArea.style.outline = 'none'
        textArea.style.boxShadow = 'none'
        textArea.style.background = 'transparent'
        textArea.style.opacity = 0
        textArea.value = text
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        try {
          document.execCommand('copy')
          alert('"' + text + '" is successfully copied to your clipboard.')
        } catch (err) {
          alert('Oops, unable to copy text: ' + err)
        }
        document.body.removeChild(textArea)
      },
      makePhoneCall: function (phoneNumber) {
        window.location.href = 'tel:' + phoneNumber
      },
      sendEmail: function (emailAddress) {
        window.location.href = 'mailto:' + emailAddress
      },
      openMap: function (lat, lng) {
        let url = 'http://maps.apple.com/?q=' + lat + ',' + lng
        this.openNewTab(url)
      },
      openNewTab: function (url) {
        let win = window.open(url, '_blank')
        if (win) {
          // Browser has allowed it to be opened
          win.focus()
        } else {
          // Browser has blocked it
          alert('Please allow popups for this website')
        }
      },
      // debounce(Function fn, Number milliseconds_to_wait, Boolean immediate)
      _debounces: {},
      debounce: function (key, fn, milliseconds_to_wait) {
        if (this._debounces[key] === undefined) this._debounces[key] = []
        let keysToDelete = []
        for (let i = 0; i < this._debounces[key].length; i++) {
          clearTimeout(this._debounces[key][i])
          keysToDelete.push(this._debounces[key][i])
        }
        for (let i = 0; i < keysToDelete.length; i++) {
          let index = this._debounces[key].indexOf(keysToDelete[i])
          if (index > -1) delete this._debounces[key][index]
        }
        // console.log(milliseconds_to_wait + ' ' + key)
        let timeout = setTimeout(()=>{
          fn()
          // console.log(key)
        }, milliseconds_to_wait)
        this._debounces[key].push(timeout)
        return timeout
      },
      shuffleArray: function (array) {
        for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1))
          var temp = array[i]
          array[i] = array[j]
          array[j] = temp
        }
      },
    }
    Vue.prototype.$tool = tool
    Vue.tool = tool
  }
}

export default ToolPlugin
