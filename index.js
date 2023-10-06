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
    
    if (jsonData) {
      core.summary.addHeading('Dusk Test Failures');
      for (const item of jsonData) {
        const details = item.message + '<br />' + item.file + '<br />' + item.trace;
        if(item.flaky) {
          core.summary.addDetails(':yellow_circle:	' + item.title, details);  
        } else {
          core.summary.addDetails(':red_circle:	' + item.title, details);
        }
      } 
      core.summary.write();
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();