const fs = require('fs');
const path = require('path');
exports.autoImport = (nextPath,callback) => {
    let isDir = fs.statSync(nextPath).isDirectory();
    if(isDir){
        fs
            .readdirSync(nextPath)
            .filter((file) => {
                return file !== "index.js" && file !== "migrate.js" && file.indexOf(".") !== 0;
            }).forEach((fileName) => {
            let tmpPath = path.join(nextPath,fileName);
            if(fs.statSync(tmpPath).isDirectory()){
                autoImport(tmpPath,callback);
            }else{
                callback(tmpPath);
            }
        });
    }
};
