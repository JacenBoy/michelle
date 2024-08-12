var request = require("request");

//0.4 => 1.0, thanks to the guy that pointed it out on GitHub

const kitsuURI = "https://kitsu.app/api/edge/";

exports.searchAnime = function (query, offset) {
  return new Promise(function (resolve, reject) {
    request({
      method: 'GET',
      url: kitsuURI + 'anime?filter[text]=' + query + '&page%5Boffset%5D=' + (offset.toString() ? offset : '0'),
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      }
    }, function (error, response, body) {
      if (error) {
        reject(Error(error))
      } else {
        var allofit = JSON.parse(body)
        var results = allofit.data
        resolve(results)
      }
    })
  })
}

exports.listAnime = function (offset) {
  return new Promise(function (resolve, reject) {
    if (offset === null || offset === undefined) {
      offset = 0
    }
    request({
      method: 'GET',
      url: kitsuURI + 'anime?page%5Blimit%5D=10&page%5Boffset%5D=' + (offset.toString() ? offset : '0'),
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      }
    }, function (error, response, body) {
      if (error) {
        reject(Error(error))
      } else {
        var allofit = JSON.parse(body)
        var results = allofit.data
        resolve(results)
      }
    })
  })
}

exports.searchManga = function (query, offset) {
  return new Promise(function (resolve, reject) {
    request({
      method: 'GET',
      url: kitsuURI + 'manga?filter[text]=' + query + '&page%5Boffset%5D=' + (offset.toString() ? offset : '0'),
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      }
    }, function (error, response, body) {
      if (error) {
        reject(Error(error))
      } else {
        var allofit = JSON.parse(body)
        var results = allofit.data
        resolve(results)
      }
    })
  })
}

exports.listManga = function (offset) {
  return new Promise(function (resolve, reject) {
    if (offset === null || offset === undefined) {
      offset = 0
    }
    request({
      method: 'GET',
      url: kitsuURI + 'manga?page%5Blimit%5D=10&page%5Boffset%5D=' + (offset.toString() ? offset : '0'),
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      }
    }, function (error, response, body) {
      if (error) {
        reject(Error(error))
      } else {
        var allofit = JSON.parse(body)
        var results = allofit.data
        resolve(results)
      }
    })
  })
}

exports.searchDrama = function (query, offset) {
  return new Promise(function (resolve, reject) {
    request({
      method: 'GET',
      url: kitsuURI + 'drama?filter[text]=' + query + '&page%5Boffset%5D=' + (offset.toString() ? offset : '0'),
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      }
    }, function (error, response, body) {
      if (error) {
        reject(Error(error))
      } else {
        var allofit = JSON.parse(body)
        var results = allofit.data
        resolve(results)
      }
    })
  })
}

exports.listDrama = function (offset) {
  return new Promise(function (resolve, reject) {
    if (offset === null || offset === undefined) {
      offset = 0
    }
    request({
      method: 'GET',
      url: kitsuURI + 'drama?page%5Blimit%5D=10&page%5Boffset%5D=' + (offset.toString() ? offset : '0'),
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      }
    }, function (error, response, body) {
      if (error) {
        reject(Error(error))
      } else {
        var allofit = JSON.parse(body)
        var results = allofit.data
        resolve(results)
      }
    })
  })
}

exports.listUsers = function (offset) {
  return new Promise(function (resolve, reject) {
    if (offset === null || offset === undefined) {
      offset = 0
    }
    request({
      method: 'GET',
      url: kitsuURI + 'users?page%5Blimit%5D=10&page%5Boffset%5D=' + (offset.toString() ? offset : '0'),
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      }
    }, function (error, response, body) {
      if (error) {
        reject(Error(error))
      } else {
        var allofit = JSON.parse(body)
        var results = allofit.data
        resolve(results)
      }
    })
  })
}

exports.getUser = function (username) {
  return new Promise(function (resolve, reject) {
    request({
      method: 'GET',
      url: kitsuURI + 'users?filter[slug]=' + username,
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      }
    }, function (error, response, body) {
      if (error) {
        reject(Error(error))
      } else {
        var allofit = JSON.parse(body)
        var results = allofit.data
        resolve(results)
      }
    })
  })
}

exports.listGenres = function (offset) {
  return new Promise(function (resolve, reject) {
    if (offset === null || offset === undefined) {
      offset = 0
    }
    request({
      method: 'GET',
      url: kitsuURI + 'genres?page%5Blimit%5D=10&page%5Boffset%5D=' + (offset.toString() ? offset : '0'),
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      }
    }, function (error, response, body) {
      if (error) {
        reject(Error(error))
      } else {
        var allofit = JSON.parse(body)
        var results = allofit.data
        resolve(results)
      }
    })
  })
}

exports.findCharacter = function (name, offset) {
  return new Promise(function (resolve, reject) {
    if (offset === null || offset === undefined) {
      offset = 0
    }
    request({
      method: 'GET',
      url: kitsuURI + 'characters?filter[name]=' + name + '&page%5Blimit%5D=10&page%5Boffset%5D=' + (offset.toString() ? offset : '0'),
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      }
    }, function (error, response, body) {
      if (error) {
        reject(Error(error))
      } else {
        var allofit = JSON.parse(body)
        var results = allofit.data
        resolve(results)
      }
    })
  })
}