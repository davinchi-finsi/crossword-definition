class BaseTask {
    constructor(params) {
        this._registerParams(params);
        this.toExclude = this._resolveExcludeFiles();
        let files = this._resolveFiles();
        this.files = files.concat(this.toExclude);
        //this.files = this.path.resolve(this.gulpConfig.src,this.taskConfig.files);
    }

    _registerParams(params) {
        let instance = this;
        for (let key in params) {
            instance[key] = params[key];
        }
    }

    _compile(files) {

    }

    _resolveFiles() {
        let files = this.taskConfig.files,
            result = [],
            src = this.gulpConfig.src;
        if (!Array.isArray(files)) {
            files = [files];
        }
        for (let fileIndex = 0, filesLength = files.length; fileIndex < filesLength; fileIndex++) {
            let currentFile = files[fileIndex];
            result.push(this.path.resolve(src, currentFile));
        }
        return result;
    }

    _resolveExcludeFiles() {
        let toExclude = [];
        if (this.taskConfig && this.taskConfig.exclude) {
            let exclude = this.taskConfig.exclude;
            for (let excludeIndex = 0, excludeLength = exclude.length; excludeIndex < excludeLength; excludeIndex++) {
                let currentExclude = exclude[excludeIndex];
                toExclude.push("!" + this.path.resolve(this.gulpConfig.src, currentExclude));
            }
        }
        return toExclude;
    }

    _onFileChange(e) {
        let toCompile = e.path;
        if (this.taskConfig.compileAllOnChange) {
            toCompile = this.files
        } else {
            if (!Array.isArray(toCompile)) {
                toCompile = [toCompile];
            }
            toCompile = toCompile.concat(this.toExclude);
        }
        this._compile(toCompile)
    }

    watch() {
        return this.gulp.watch(this.files, this._onFileChange.bind(this));
    }

    build() {
        return this._compile(this.files);
    }
}

module.exports = BaseTask;