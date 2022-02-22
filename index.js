const fs = require("fs");
const fse = require("fs-extra");
const chokidar = require("chokidar");
const {execSync} = require("child_process");

// chokidarの初期化
const watcher = chokidar.watch("./", {
    ignored: [
        "./node_modules",
        "./build",
        "./*.*"
    ],
    persistent: true
})

// エラーハンドリング
process.on('uncaughtException', err => {
    console.log(err);
    console.log("================================================================================");
});

if (!fs.existsSync("./build")) {
    fs.mkdirSync("./build");
    fs.mkdirSync("./build/img");
}

// fse.copySync("./img","./build/img");

// イベント実行
watcher.on("all", (event, path) => {
    console.log(event + " on " + path);

    const dirs = path.split("\\");

    const stats = fs.statSync(path);
    // if (stats.isDirectory()) {
    //     console.log(`\x1b[31m${path} is a directory\x1b[0m`);
    // } else if (stats.isFile()) {
    //     console.log(`\x1b[31m${path} is a File\x1b[0m`);
    // }
    if (dirs.length >= 2 && stats.isFile() && dirs[0] === "src") {
        switch (dirs[1]) {
            case "haml":
                const filename = dirs[dirs.length-1].split(".")[0];
                const stdout = execSync(`haml ${path} build\\${filename}.html`);
                print(stdout, "haml");
                const stdout2 = execSync(`npx prettier --write build\\${filename}.html`);
                print(stdout2, "pritter");
                break;

            case "sass":
                const filename2 = dirs[dirs.length-1].split(".")[0];
                const stdout3 = execSync(`sass ${path} build\\css\\${filename2}.css`);
                print(stdout3, "sass");
                break;

            case "ts":
                const stdout4 = execSync(`npx tsc`);
                print(stdout4, "ts");
                break;

            case "img":
                const filename3 = dirs[dirs.length-1];
                const stdout5 = execSync(`copy ${path} .\\build\\img\\${filename3}`);

            default:
                break;
        }
    }

    console.log("================================================================================");
});

function print(stdout, typestr) {
    process.stdout.write("\x1b[36m");
    process.stdout.write(`${typestr} compile progress`);
    process.stdout.write("\x1b[0m\n");
    if (stdout.byteLength !== 0) {
        process.stdout.write(`${stdout.toString()}\n`);
    }
        process.stdout.write("... ");
        process.stdout.write("\x1b[32m");
        process.stdout.write("done");
        process.stdout.write("\x1b[0m\n");
}
