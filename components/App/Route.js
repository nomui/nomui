export class Route {
    constructor(defaultPath) {
        var that = this;

        this.hash = location.hash;
        if (!this.hash) {
            this.hash = "#" + defaultPath;
        }
        this.path = this.hash.substring(1);
        this.paths = [null, null, null];
        this.query = {};
        this.queryStr = '';
        var queryIndex = this.hash.indexOf('?');

        if (this.hash.length > 1) {
            if (queryIndex > -1) {
                this.path = this.hash.substring(1, queryIndex);

                var paramStr = this.queryStr = this.hash.substring(queryIndex + 1);
                var paramArr = paramStr.split('&');

                paramArr.forEach(function (e) {
                    var item = e.split('='),
                        key,
                        val;
                    key = item[0];
                    val = item[1];
                    if (key !== '') {
                        that.query[key] = decodeURIComponent(val);
                    }
                });
            }
        }

        var pathArr = this.path.split('!');

        this.maxLevel = pathArr.length - 1;

        if (pathArr.length <= 3) {
            pathArr.forEach(function (path, index) {
                that.paths[index] = path;
            });
        }
    }
}