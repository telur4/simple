# complex-web-development-environment

## Set up

1. Run "npm install" in PowerShell to install packages needs this project.

```shell
npm install
```

2. Install Haml

How to install haml is ```gem``` command point to you.
This is Ruby language's package manager, so you need to install ruby in your device.
And use ```gem``` command to execute below.

```shell
gem install haml
```

3. Install Dart sass

```shell
# Windows Powershell
choco install sass

# Mac
brew install sass/sass/sass
```

Using Windows PC and occurred a Problem, maybe you have to install chocolaty in your device.
Open the Powershell with admin authority, excute this command.

```shell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

```

4. Install Docker Desktop

please refer [here](https://www.docker.com/products/docker-desktop "Docker Desktop for Mac and Windows")

## Start

```shell
npm start
docker-compose up -d
# Windows PowerShell
start "http://localhost:8080"
```

