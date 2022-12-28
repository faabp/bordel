const db = require('./dbClient')

module.exports = {
  create: (user, callback) => {
    // Check parameters
    if(!user.id)
      return callback(new Error("Wrong user parameters"), null)
    // Create User schema
    const userObj = {
	  id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
	  email: user.email,
	  phone: user.phone,
    }
    // Check if user already exists
    db.hgetall(user.id, function(err, res) {
      if (err) return callback(err, null)
      if (!res) {
        // Save to DB
        db.hmset([
		'id', user.id,
		'first_name', user.firstname,
		'last_name', user.lastname,
		'email', user.email,
		'phone', user.phone
	  ], (err, res) => {
          if (err) return callback(err, null)
          callback(null, res) // Return callback
        })
      } else {
        callback(new Error("User already exists"), null)
      }
    })
  },
  get: (id, callback) => {
    if(!id)
      return callback(new Error("Id must be provided"), null)
    db.hgetall(id, function(err, res) {
      if (err) return callback(err, null)
      if (res)
        callback(null, res)
      else
        callback(new Error("User doesn't exists"), null)
    })
  }
}