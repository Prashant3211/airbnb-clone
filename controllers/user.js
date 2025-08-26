const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs")
};

module.exports.signup = async(req, res) => {
    try {
         let {username, email, password} = req.body;
    //  console.log(req.body.username);
    const newUser = new User({username, email});
     let registredUser = await User.register(newUser, password);
    //  console.log(registredUser);
    req.login(registredUser, (err) => {
        if(err) {
            return next();
        }
      req.flash("success", "Welcome to WanderLust");
       res.redirect("/listings");
    })
     
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }

    
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};


module.exports.login = async(req, res) => {
    req.flash("success", "Welcome back to WanderLust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logOut((err) => {
        if(err) {
            next(err);
        }
        req.flash("success", "You are loged out!");
        res.redirect("/listings");
    })
};