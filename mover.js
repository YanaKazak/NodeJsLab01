#!/usr/bin/env node
const fs = require("fs");

module.exports.readFile = function (path) {
    fs.readFile(path, function (error, data) {
            console.log("Reading file...");
            if (error) throw error;
            console.log(data.toString());
        });
}

module.exports.writeFile = function (path, data) {
    fs.writeFile(path, data, function (error) {
        if (error) throw error;
        console.log(">>File writing completed successfully.");
    });
}

module.exports.createFile = function (path) {
    fs.writeFile(path, "", function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Was created file: " + path);
        }
    });
}
try {
    module.exports.deleteFile = function (path) {
        fs.unlink(path, function (err) {
            if (error) throw error;
            console.log(path + " >> deleted successfully");
        })
    }
} catch (e) {
    console.log("Mistake" + e);
}
module.exports.individualTask = function (path, path2) {
    module.exports.walk(path, function (err, results) {
        if (err) console.error(err);
        else {
            console.log("The number of files: " + results.length);
            module.exports.writeFile(path2, "The number of files: " + results.length + "\n"+results);
        }
    });

}

module.exports.walk = function (dir, done) {
    var results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file) return done(null, results);
            file = dir + '/' + file;
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    module.exports.walk(file, function (err, res) {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    results.push(file);
                    next();
                }
            });
        })();
    });
};
