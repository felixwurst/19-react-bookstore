/* ---------------------------------------- setup ---------------------------------------- */
// express
const express = require('express')
const app = express()
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// modules
const fs = require('fs')
const fileUpload = require('express-fileupload')
app.use(fileUpload({
    limits: { fileSize: 6 * 1024 * 1024 },
}))
const session = require('express-session')
app.use(session({
    secret: 'bookstore',
    resave: false,
    saveUninitialized: false,
    cookie: {}
}))

// database
const dataModule = require('./modules/mongooseDataModule')

// admin
const adminRoutes = require('./routes/adminRoutes')

// localhost:3000
const port = process.env.PORT || 3000

/* ---------------------------------------- post routes ---------------------------------------- */

// register
// 1 registration successful
// 2 inputs not filled or passwords not the same
// 3 user already exists
// 4 server error
app.post('/register', (req, res) => {
    const email = req.body.email.trim()
    const password = req.body.password
    const repassword = req.body.repassword
    if (email && password && password == repassword) {
        dataModule.registerUser(email, password).then(() => {
            res.json(1)
        }).catch(error => {
            console.log(error)
            if (error == "email already exists") {
                res.json(3)
            } else {
                res.json(4)
            }
        })
    } else {
        res.json(2)
    }
})

// login
// 1 login successful
// 2 server error
// 3 email is wrong
// 4 password is wrong
app.post('/login', (req, res) => {
    if (req.body.email && req.body.password) {
        dataModule.checkUser(req.body.email.trim(), req.body.password).then(user => {
            req.session.user = user
            res.json(1)
        }).catch(error => {
            if (error == 3) {
                res.json(3)
            } else if (error == 4) {
                res.json(4)
            } else {
                res.json(2)
            }
        })
    } else {
        res.json(2)
    }
})

// getbooks
app.post('/getbooks', (req, res) => {
    // get an array of books
    dataModule.getBooks().then(books => {
        res.json(books)
    }).catch(err => {
        res.json(2)
    })
})

// getbook
app.post('/getbook', (req, res) => {
    const bookID = req.body.id
    dataModule.getBook(bookID).then(data => {
        // show only the pdf if user is logged in
        if (!req.session.user) {
            data.pdf = null
        }
        res.json(data)
    }).catch(err => {
        res.json(2)
    })
})

// checklogin
app.post('/checklogin', (req, res) => {
    if (req.session.user) {
        res.json(req.session.user.email)
    } else {
        res.json(10)
    }
})

/* ---------------------------------------- use routes ---------------------------------------- */

// admin
app.use('/admin', adminRoutes)

// index
app.use('/', (req, res) => {
    const html = fs.readFileSync(__dirname + '/index.html', 'utf-8')
    res.send(html)
})

/* ---------------------------------------- localhost ---------------------------------------- */

app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
})