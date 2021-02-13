const chalk = require('chalk');
const fs    = require('fs');
const os    = require('os');
const path  = require('path');

exports.command = 'ssh';
exports.desc = 'ssh into a new development environment';
exports.builder = yargs => {
    yargs.options({
        force: {
            alias: 'f',
            describe: 'Force the old VM to be deleted when provisioning',
            default: false,
            type: 'boolean'
        }
    });
};

const {spawn} = require('child_process');

let filename = path.join(os.homedir(), '.bakerx', 'insecure_private_key');
let sshcommand = `ssh -i "${filename}" -p 2800 -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null vagrant@127.0.0.1 `;


exports.handler = async argv => {
    const { force } = argv;

    (async () => {
    
        sshvm(force);

    })();

};

async function sshvm(force)
{
    // Use current working directory to derive name of virtual machine
    let cwd = process.cwd().replace(/[/]/g,"-").replace(/\\/g,"-");
    let name = `V-${cwd}`;    
    console.log(chalk.keyword('pink')(`Bringing up machine ${name}`));

    // We will use the image we've pulled down with bakerx.
    let image = path.join(os.homedir(), '.bakerx', '.persist', 'images', 'focal', 'box.ovf');
    if( !fs.existsSync(image) )
    {
        console.log(chalk.red(`Could not find ${image}. Please download with 'bakerx pull ${image} cloud-images.ubuntu.com'.`))
    }
    return new Promise(function (resolve, reject) {   
           spawn(`${sshcommand}`,[],{stdio: 'inherit', shell: true});
    });
}

