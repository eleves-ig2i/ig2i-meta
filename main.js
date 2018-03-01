const fs = require('fs');
const http = require('http');
const https = require('https');
const util = require('util');
const chalk = require('chalk');
const exec = util.promisify(require('child_process').exec);

const options = {
	host: 'api.github.com',
	port: 443,
	path: '/users/eleves-ig2i/repos',
	method: 'GET',
	headers: {
		'Content-Type': 'application/json',
		'User-Agent': 'eleves-ig2i'
	}
};
const prefixe = 'git@github.com:eleves-ig2i/';
const suffixe = '.git';

let report = [];

/**
 * Inspired by https://stackoverflow.com/questions/9577611/http-get-request-in-node-js-express
 * getJSON:  REST get request returning JSON object(s)
 * @param options: http options object
 * @param callback: callback to pass the results JSON object(s) back
 */
const getJSON = function(options, onResult) {
	var port = options.port == 443 ? https : http;
	var req = port.request(options, function(res) {
		var output = '';
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			output += chunk;
		});
		res.on('end', function() {
			var obj = JSON.parse(output);
			onResult(res.statusCode, obj);
		});
	});
	req.on('error', function(err) {
		throw new Error(err);
	});
	req.end();
};

const checkPrefix = function(url, name) {
	let regex = /^ig2i-/g;
	let noIg2iPrefixe = !regex.exec(name);
	if(noIg2iPrefixe) {
		addError(url, 'no-ig2i-prefix');
	}
};

const checkTravisExists = function(url, name) {
	let noTravis = !fs.existsSync('repos/'+name+'/.travis.yml');
	if(noTravis) {
		addError(url, 'no-travis');
	}
};

const addError = function(url, code) {
	if(!report) {
		report = {};
	}
	if(!report[url]) {
		report[url] = {
			url: url,
			errors: []
		};
	}
	report[url].errors.push({
		code:code
	});
};

const getNameFromUrl = function(url) {
	return url.replace(prefixe, '').replace(suffixe, '');
};

const main = async function() {
	const {stdout2, stderr2} = await exec('mkdir repos;');
	getJSON(options, async function(statusCode, result) {
		let repos = result;
		for(const k in repos) {
			const repo = repos[k];
			const repoUrl = repo.ssh_url;
			const repoUrlHttps = repo.clone_url;
			const name = getNameFromUrl(repo.ssh_url);
			console.log('Cloning ' + name);
			const {stdout, stderr} = await exec(`cd repos; git clone ${repoUrlHttps}`);
			console.log('Checking ' + name);
			checkPrefix(repoUrl, name);
			checkTravisExists(repoUrl, name);
		};
		console.log('Cleaning');
		const {stdout, stderr} = await exec('rm -rf repos');
		console.log('Report');
		let readme = '# Report\n';
		let errorsCount = 0;
		for(const k in report) {
			readme += '\n';
			const repo = report[k];
			console.log(getNameFromUrl(repo.url));
			readme += `${getNameFromUrl(repo.url)} :\n`;
			repo.errors.forEach(function(error) {
				errorsCount++;
				console.log(`\t${chalk.red('error')}\t${error.code}`);
				readme += ('- error\t' + error.code + '\n');
			});
		};
		if (errorsCount) {
			console.log(chalk.red(errorsCount + ' errors'));
		}
		console.log('Readme');
		const {stdoutReadme, stderrReadme} = await exec(`printf "${readme}" > README.md`);
		const {stdoutReadme2, stderrReadme2} = await exec('cat README.md');
		var content = fs.readFileSync('README.md', 'utf8');
		console.log(content);
		const {stdoutGit2, stderrGit2} = await exec('git remote add tmp https://github.com/eleves-ig2i/ig2i-meta.git');
		const {stdoutGit, stderrGit} = await exec('git commit -am "Update README.md"');
		//const {stdoutGit3, stderrGit3} = await exec('git push tmp master');
		console.log('Done');
		if (errorsCount) {
			process.exit(1);
		}
	});
};

main();
