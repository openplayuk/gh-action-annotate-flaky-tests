const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

async function run() {
  try {

    const filePath = core.getInput('report_path');

    if(fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath);
      jsonData = JSON.parse(content);
    } else {
      console.log('file not found');
      return;
    }
    
    const annotations = [];

    if (jsonData) {
      core.summary.addHeading('Flaky Tests');
      for (const item of jsonData) {
        core.summary.addDetails(':yellow_circle:	' + item.title, item.file);
      }
      core.summary.write();
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();