#!/usr/bin/env node
const gitRemoteOriginUrl = require('git-remote-origin-url');
const GitUrlParse = require('git-url-parse');
const branch = require('git-branch');
const opn = require('opn');

gitRemoteOriginUrl()
.then(url => {
    const address = GitUrlParse(url)
    if (address.source === 'bitbucket.org') {
        uri = 'https://' + address.resource + address.pathname.slice(0, -4)

        opn(`${uri}/pull-requests/new?source=${branch.sync()}&t=1`)
        process.exit()
    }
    throw Error('This isn\'t an BitBucket repository!')
}).catch(err => {
    console.log(err);
})
