
const express = require('express')
var routes = new express.Router()
const jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

const User = require('./models/User')
const Deed = require('./models/Deed')
const UserStat = require('./models/UserStat')
const RankingTable = require('./models/RankingTable')
const Follow = require('./models/Follow')

routes.get('/create-user', (req, res) => {
  res.render('create-user.html')
})

routes.post('/create-user', (req, res) => {
  var form = req.body
  if (User.findByEmail(form.email) != null) {
      res.render('sign-in.html', {
        errorMessage: 'A user with this Email already exists'
      })
    return;
  }
  var passwordHash = bcrypt.hashSync(form.password, process.env.SALT_ROUNDS)
  User.insert(form.name, form.email, passwordHash)
  res.redirect('/dashboard')
})

function loggedIn(req, res, next){
  try {
    var LoggedInUser = User.findById((jwt.verify(req.signedCookies["jwt-token"], process.env.JWT_SECRET)).UserId)
    if (LoggedInUser == null) { return res.redirect('/sign-in') }
    if (req.params.UserId) {
      if (req.params.UserId != LoggedInUser.UserId) {
        return res.redirect('/dashboard', {
          errorMessage: 'Can not alter resources of another User'
        })
      }
    }
    if (req.params.DeedId) {
      if (Deed.findById(req.params.DeedId).UserId != LoggedInUser.UserId) {
        return res.redirect('/dashboard', {
          errorMessage: 'Can not edit deed of another User'
        })
      }
    }
    if (req.params.ReceiptUserId) {
      if (req.params.ReceiptUserId == LoggedInUser.UserId) {
        return res.redirect('/dashboard', {
          errorMessage: 'Can not follow yourself'
        })
      }
    }
  } catch(err) {
    return res.redirect('/sign-in')
  }
  req.user = LoggedInUser;
  next();
};

routes.get('/', loggedIn, (req, res) => {
  res.redirect("/dashboard")
})

routes.get('/sign-in', (req, res) => {
  res.clearCookie('jwt-token')
  res.render('sign-in.html')
})

routes.post('/sign-in', (req, res) => {
  var form = req.body
  var user = User.findByEmail(form.email)
  if (user != null) {
    if (bcrypt.compareSync(form.password, user.PasswordHash)) {

      var token = jwt.sign({ UserId: user.UserId }, process.env.JWT_SECRET, { expiresIn: 60*60 })
      res.cookie("jwt-token", token, { signed: true, httpOnly: true});

     return res.redirect('/dashboard')
    } else {
      res.render('sign-in.html', {
        errorMessage: 'Email address and password do not match'
      })
    }
  } else {
    res.render('sign-in.html', {
      errorMessage: 'No account with that email exists'
    })
  }
})

routes.get('/sign-out', loggedIn, (req, res) => {
  res.clearCookie('jwt-token')
  res.redirect('/sign-in')
});

routes.get('/delete-user', loggedIn, (req, res) => {
  User.delete(req.user.UserId);
  res.redirect("/sign-out");
});

routes.get('/dashboard', loggedIn, (req, res) => {
  LoggedInUser = User.findById(req.user.UserId)
  res.render('dashboard.html', {
    LoggedInUser: LoggedInUser,
    UserStat: UserStat.get(LoggedInUser.UserId),
    SelectDeedWhereCurrentUser: Deed.selectDeedWhereCurrentUser(req.user.UserId)
  })
})

routes.get('/ranking-follow', loggedIn, (req, res) => {
    res.render('ranking-follow.html', {
      RankingTable: RankingTable.select(req.user.UserId),
      LoggedInUser: User.findById(req.user.UserId)
    })
  })

routes.get('/deed-follow-given', loggedIn, (req, res) => {
    res.render('deed-follow-given.html', {
      SelectDeedWhereUserFollowGivenUserId: Deed.selectDeedWhereUserFollowGivenUserId(req.user.UserId),
      LoggedInUser: User.findById(req.user.UserId)
   })
})

routes.get('/user-follow-receipt', loggedIn, (req, res) => {
    res.render('user-follow-receipt.html', {
      SelectUserFollowReceipt: User.selectUserFollowReceipt(req.user.UserId)
     })
})

routes.get('/create-deed', loggedIn, (req, res) => {
    LoggedInUser = User.findById(req.user.UserId)
    res.render('create-deed.html', {
      LoggedInUser: LoggedInUser
    })
})

routes.post('/create-deed/', loggedIn, (req, res) => {
  var form = req.body
  Deed.insert(form.Title, form.StartTime, form.DurationHour, req.user.UserId)
  res.redirect('/dashboard')
})

routes.get('/update-deed/:DeedId', loggedIn, (req, res) => {
  LoggedInUser = User.findById(req.user.UserId)
  res.render('update-deed.html', {
    Deed: Deed.findById(req.params.DeedId),
    LoggedInUser: LoggedInUser
  })
})

routes.post('/update-deed/:DeedId', loggedIn, (req, res) => {
  var DeedId = req.params.DeedId
  var form = req.body
  Deed.update(DeedId, form.Title, form.StartTime, form.DurationHour)
  res.redirect('/dashboard')
})

routes.get('/delete-deed/:DeedId', loggedIn, (req, res) => {
    Deed.delete(req.params.DeedId)
    res.redirect('/dashboard')
})

routes.get('/insert-follow/:ReceiptUserId', loggedIn, (req, res) => {
  console.log("req.user.UserId" + req.user.UserId)
  console.log("req.params.ReceiptUserId" + req.params.ReceiptUserId)
  Follow.insert(req.user.UserId, req.params.ReceiptUserId)
  res.redirect('/dashboard')
})

module.exports = routes