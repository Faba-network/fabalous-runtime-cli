module.exports = function(gulp){
    var path = require('path');
    var webpack = require('webpack');

    var nodeConfig = require(path.join(__dirname + "./webpack.config.js"));
    function onBuild(done) {
        return function(err, stats) {
            if(err)console.error('Error', err);
            else console.log(stats.toString());
            if(done) done();
        }
    }

    gulp.task('runtime-cli-build', function(done) {
        webpack(nodeConfig).run(onBuild(done));
    });

    gulp.task('runtime-cli-watch', function(done) {
        webpack(nodeConfig).run(onBuild(done));
    });
};