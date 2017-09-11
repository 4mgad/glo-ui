const path = require('path');
const ajfs = require('ajfs');

const outputFile = "index.jsx";

const dirs2Libify = process.argv.slice(2);

let outputMap = {};
dirs2Libify.map((dir2Libify, idx) => {
	if (dir2Libify) {
		ajfs.walk({
			dir: dir2Libify,
			onDir: (err, dirPath) => {
				if (!err) {
					let indexFilePath = path.normalize(dirPath + "/../" + outputFile);
					let dname = path.basename(dirPath);
					let outputStr = outputMap[indexFilePath] || "";
					outputStr += "export * from './" + dname + "';\n";
					outputMap[indexFilePath] = outputStr;
				}
			},
			onFile: (err, filePath) => {
				if (!err) {
					if (ajfs.getFileExtension(filePath) === "jsx") {
						let indexFilePath = path.normalize(path.dirname(filePath) + "/" + outputFile);
						let outputStr = outputMap[indexFilePath] || "";
						let fname = path.basename(filePath, '.jsx');
						if (fname != "index") {
							outputStr += "export * from './" + fname + "';\n";
							outputStr += "export " + fname + " from './" + fname + "';\n";
						}
						outputMap[indexFilePath] = outputStr;
						let mdFile = filePath.replace(/\.jsx$/, ".md");
						if (!ajfs.existsSync(mdFile)) {
							let mdFilePath = path.normalize(mdFile);
							console.log(mdFilePath + " DOES NOT EXIST");
							outputMap[mdFilePath] = "";
						}

					}
				}
			},
			onComplete: () => {
				if (idx >= dirs2Libify.length - 1) {
					for (let indexFilePath in outputMap) {
						ajfs.writeFile(indexFilePath, outputMap[indexFilePath], (err) => {
							if (err) {
								return console.log(err);
							}
							console.log(indexFilePath + " generated successfully!!");
						});
					}
				}
			}
		});
	} else {
		console.warn("Couldn't find " + dir2Libify);
	}
});
