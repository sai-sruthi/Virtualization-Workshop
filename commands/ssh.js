
const path = require('path');
const os   = require('os');

const { spawn } = require('child_process');
exports.command='ssh';
exports.desc='ssh into a new development environment';

exports.handler=async function ssh_manual(){
    let filepath = path.join(os.homedir(), '.bakerx', 'insecure_private_key');
    let sshcommand = `ssh -i "${filepath}" -p 2800 -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null vagrant@127.0.0.1 `;
    return new Promise(function (resolve, reject) {   
        spawn(`${sshcommand}`, [], {stdio: 'inherit', shell: true});
});
}

