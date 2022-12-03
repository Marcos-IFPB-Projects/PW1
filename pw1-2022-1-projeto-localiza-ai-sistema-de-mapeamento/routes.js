const express = require("express");
const passport = require("passport");

const User = require("./models/user");
const router = express.Router();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash("info", "Você deve ter se autenticado para ver esta página.");
    res.redirect("/login");
  }
}

router.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});

router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/Mapeamento", function (req, res, next) {
  res.render("Mapeamento");
});

router.get("/Boletins", function (req, res, next) {
  User.find()
    .sort({ createdAt: "descending" })
    .exec(function (err, users) {
      if (err) {
        return next(err);
      }
      res.render("Boletins", { users: users });
    });
});


router.get("/login", function (req, res) {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.get("/logout", function (req, res) {
  req.logout(User)
  res.redirect("/");
});

router.get("/signup", function (req, res) {
  res.render("signup");
});

router.post(
  "/signup",
  function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return next(err);
      }
      if (user) {
        req.flash("error", "Usuário já exite.");
        return res.redirect("/signup");
      }

      const newUser = new User({
        username: username,
        password: password,
      });
      newUser.save(next);
    });
  },
  passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/signup",
    failureFlash: true,
  })
);

router.get("/users/:username", function (req, res, next) {
  User.findOne({ username: req.params.username }, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(404);
    }
    res.render("profile", { user: user });
  });
});

router.get("/edit", ensureAuthenticated, function (req, res) {
  res.render("edit");
});

router.get("/delete", ensureAuthenticated, function (req, res) {
  res.render("delete");
});

router.post("/delete", ensureAuthenticated, function (req, res) {
  res.locals.currentUser.checkPassword(req.body.confirmationPassword, async function(err, isMatch) {
    if(err) {
      return next(err);
    }
    if(isMatch) {
      const response = await User.deleteOne({ _id: res.locals.currentUser._id });
      if(response.deletedCount) {
        req.flash("info", "Conta Excluída com Sucesso.");
        res.redirect("/");
      } else {
        req.flash("error", "Não conseguimos excluir sua conta.");
        res.redirect("/");
      }
    } else {
      req.flash("error", "Senha incorreta.");
      res.redirect("/delete");
    }
  });
});

router.post("/edit", ensureAuthenticated, function (req, res, next) {
  req.user.displayName = req.body.displayname;
  req.user.bio = req.body.bio;
  req.user.save(function (err) {
    if (err) {
      next(err);
      return;
    }
    req.flash("info", "Pefil atualizado!");
    res.redirect("/");
  });
});

module.exports = router;
