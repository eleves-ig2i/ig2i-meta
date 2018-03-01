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

const checkUpperInRepoName = function(url, name) {
	let regex = /[A-Z]/g;
	let useUpper = name.match(regex);
	if(useUpper) {
		addError(url, 'repo-name-uppercase');
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
	if(!url) {
		//throw new Error('No url in getNameFromUrl()');
		//process.exit(1);
		console.log(chalk.red('No url in getNameFromUrl()'));
		return;
	}
	return url.replace(prefixe, '').replace(suffixe, '');
};

const main = async function() {
	let fail = false;
	const {stdout2, stderr2} = await exec('mkdir repos;');
	getJSON(options, async function(statusCode, result) {
		if (statusCode === 403) {
			fail = true;
		}
		let repos = result;
		for(const k in repos) {
			const repo = repos[k];
			const url = repo.ssh_url;
			const repoUrlHttps = repo.clone_url;
			if(!url) {
				console.log('no url for name');
				console.log('statusCode', statusCode);
				console.log('result', result);
			} else {
				const name = getNameFromUrl(url);
				console.log('Cloning ' + name);
				const {stdout, stderr} = await exec(`cd repos; git clone ${repoUrlHttps}`);
				console.log('Checking ' + name);
				checkPrefix(url, name);
				checkTravisExists(url, name);
				checkUpperInRepoName(url, name);
			}
		};
		console.log('Cleaning');
		const {stdout, stderr} = await exec('rm -rf repos');
		console.log('Report');
		let readmeReport = '';
		let errorsCount = 0;
		for(const k in report) {
			readmeReport += '\n';
			const repo = report[k];
			if(!repo.url) {
				console.log('no url for name2');
			}
			const name2 = getNameFromUrl(repo.url);
			console.log(name2);
			readmeReport += `${name2} :\n`;
			repo.errors.forEach(function(error) {
				errorsCount++;
				console.log(`\t${chalk.red('error')}\t${error.code}`);
				readmeReport += ('- error\t' + error.code + '\n');
			});
		};
		if (errorsCount) {
			console.log(chalk.red(errorsCount + ' errors'));
		}
		console.log('Readme');
		let readme = fs.readFileSync('README-template.md', 'utf8');
		readme = readme.replace('${report}', readmeReport);
		if(!fail) {
			const {stdoutReadme, stderrReadme} = await exec(`printf "${readme}" > README.md`);
		}
		const {stdoutReadme2, stderrReadme2} = await exec('cat README.md');
		console.log(readme);
		console.log('Done');
	});
};

main();
