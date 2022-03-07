const express = require("express");
const app = express();

app.use(logger);
app.use(checkPermission);

app.get("/books", logger, function (req, res) {
    return res.send({route: "/books"});
});

app.get("/libraries", logger, checkPermission("librarian"), function (req, res) {
    return res.send({
        route: "/libraries",
        permission: req.perm
    })
});

app.get("/authors", logger, checkPermission("author"), function (req, res) {
    return res.send({
        route: "/authors",
        permission: req.perm
    })
}) 

function logger(req, res, next) {
    
    console.log("called", req.path);
    return next();
}

function checkPermission(role) {
    return function checking(req, res, next)
    {
        if(role=="librarian" || role=="author")
        {
            req.perm=true;
            return next();
        }
        else
            return res.send("Access Denied!");
    }
}

app.listen(4000, () => {
    console.log("listening at port 4000");
})