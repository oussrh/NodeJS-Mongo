module.exports = app => {
    let mongo = require('mongodb');
    let MongoClient = require('mongodb').MongoClient;
    let url = "mongodb://localhost:27017/";

    //POST new students
    app.post("/user", (req, res) => {
        let nom = req.body.name;
        let prenom = req.body.prenom;

        MongoClient.connect(url, {
            useNewUrlParser: true
        }, function (err, db) {
            if (err) throw err;
            let dbo = db.db("mydb");
            let myobj = {
                name: nom,
                prenom: prenom
            };
            dbo.collection("student").insertOne(myobj, function (err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
        });
        res.sendStatus(200);
    });

    //GET => all students
    app.get("/user", (req, res) => {
        MongoClient.connect(url, {
            useNewUrlParser: true
        }, function (err, db) {
            if (err) throw err;
            let dbo = db.db("mydb");
            dbo.collection("student").find({}).toArray(function (err, res) {
                if (err) throw err;
                show(res)
                db.close();
            });
        });

        function show(result) {
            res.send(result)
        }
    });

    //GET =>  one student
    app.get("/user/:nom", (req, res) => {
        MongoClient.connect(url, {
            useNewUrlParser: true
        }, function (err, db) {
            if (err) throw err;
            let dbo = db.db("mydb");
            dbo.collection("student").find({"name": req.params.nom}).toArray(function (err, res) {
                if (err) throw err;
                show(res)
                db.close();
            });
        });

        function show(result) {
            res.send(result)
        }
    });

    //PUT => update one student
    app.put("/user/:id", (req, res) => {
        MongoClient.connect(url, {
            useNewUrlParser: true
        }, function (err, db) {
            if (err) throw err;
            let dbo = db.db("mydb");
            let myquery = {
                _id: new mongo.ObjectID(req.params.id)
            };
            let newvalues = {
                $set: {
                    name: req.body.name,
                    prenom: req.body.prenom
                }
            };
            dbo.collection("student").updateOne(myquery,newvalues, function (err, res) {
                if (err) throw err;
                console.log("1 document updated");
                db.close();
            });
        });
        res.sendStatus(200);
    });

    //DELETE => DELETE one student
    app.delete("/user/:id", (req, res) => {
        MongoClient.connect(url, {
            useNewUrlParser: true
        }, function (err, db) {
            if (err) throw err;
            let dbo = db.db("mydb");

            let myquery = {
                _id: new mongo.ObjectID(req.params.id)
            };

            dbo.collection("student").deleteOne(myquery, function (err, res) {
                if (err) throw err;
                console.log("1 document deleted");
                db.close();
            });
        });

        res.sendStatus(200);
    });
}
