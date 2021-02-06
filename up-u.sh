
#!/bin/bash

# Create VM
bakerx run ubuntu-vm focal

# Get ssh command
ssh_cmd=$(bakerx ssh-info ubuntu-vm|tr -d '"')

# Use heredoc to send script over ssh
$ssh_cmd << 'END_DOC'

# Install packages
sudo apt install curl
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs 
sudo apt-get install -y git

# Get projects
git clone https://github.com/CSC-DevOps/App
# Setup project
cd App
npm install

exit


END_DOC

VBoxManage controlvm ubuntu-vm natpf1 nodeport,tcp,,8089,,9000


echo $ssh_cmd
