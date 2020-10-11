[![REUSE status](https://api.reuse.software/badge/github.com/SAP/cloud-foundry-tools)](https://api.reuse.software/info/github.com/SAP/cloud-foundry-tools)
![GitHub package.json version](https://img.shields.io/github/package-json/v/SAP/cloud-foundry-tools)
[![CircleCI](https://circleci.com/gh/SAP/cloud-foundry-tools.svg?style=svg)](https://circleci.com/gh/SAP/cloud-foundry-tools)
[![Coverage Status](https://coveralls.io/repos/github/SAP/cloud-foundry-tools/badge.svg?branch=master)](https://coveralls.io/github/SAP/cloud-foundry-tools?branch=master)


# cloud-foundry-tools
This VSCode extension provides tools for easy application development with Cloud Foundry. Its' tools contains such functionality as "Login to Cloud Foundry", "Create service", "Bind service", "Unbind service", etc. 

## Table of contents

- [Features](#features)
- [Dependencies](#dependencies)
- [How to Run Locally](#how-to-run-locally)
- [How to set up logger preferences](#how-to-set-up-logger-preferences)
- [Known Issues](#known-issues)

---

## Features

* a new View-Container of vscode, with a new View is added titled "Cloud Foundry".

[back to top](#table-of-contents)

---


## Dependencies
* cf-cli 
* cf-cli extension `targets`[see here](https://github.com/guidowb/cf-targets-plugin)
* cf-cli extension called cf-service-info (from here)[http://nexus.wdf.sap.corp:8081/nexus/content/groups/build.releases/com/sap/golang/com/sap/devx/wing/cfserviceinfo/]

[back to top](#table-of-contents)

---

### How to run locally
* clone the repo
* open it in a vscode
* run the launch config 'Run Extension'

[back to top](#table-of-contents)

---

### How to set up logger preferences

![Alt text](media/settings.png?raw=true "Settings")

[back to top](#table-of-contents)

---

## Known Issues

* Mostly needs handling failure situation and nice cancelation option for long running steps.

[back to top](#table-of-contents)

---
