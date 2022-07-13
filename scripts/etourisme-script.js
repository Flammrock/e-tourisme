#! /usr/bin/env node


/**
 * We use the path module to find config files
 */
const path = require('path');

/**
 * We use the npm module cross-spawn to run process in any os
 * (we can run amplify pull with this module very easly)
 */
const spawn = require('cross-spawn');

/**
 * We import "amplify/.config/project-config.json" to fetch information to pull automatically
 * the backend with : amplify pull
 * 
 * @see https://docs.amplify.aws/cli/usage/headless/#sample-script
 */
const projectConfig = require(path.join(__dirname,'../amplify/.config/project-config'));

/**
 * We import id and secret key of each social providers
 */
const socialProvidersConfig = require(path.join(__dirname,'../social-providers'));

/**
 * We build the --frontend argument,
 * @see https://docs.amplify.aws/cli/usage/headless/#sample-script for more details
 */
const frontend = {
  frontend: projectConfig.frontend,
  framework: projectConfig[projectConfig.frontend].framework,
  config: projectConfig[projectConfig.frontend].config
};

/**
 * We build the --categories argument,
 * @see https://docs.amplify.aws/cli/usage/headless/#sample-script for more details
 */
const categories = {
  auth: socialProvidersConfig
};

/**
 * We retrieve the task put as argument to this command with :
 * 
 * @example
 * ```
 * etourisme-script amplify-pull
 * ```
 */
const [task] = process.argv.slice(2);

switch (task) {
    
  /**
   * If the task is "amplify-pull", we pull automatically the backend by using information from config file
   * @TODO: Fetch Social Provider key from environment variable backend
   */
  case 'amplify-pull':
    const [appId, envName] = process.argv.slice(3);
    if (typeof appId === 'undefined' || typeof envName === 'undefined') {
        console.log(`Usage: etourisme-script ${task} <appId> <EnvName>`);
        console.log(`Example: etourisme-script ${task} dj1zw9xn6tfsr dev`);
        process.exit(1);
    }
    const amplifyResult = spawn.sync('amplify', ['pull', '--appId', appId, '--envName', envName, '--frontend', JSON.stringify(frontend),'--categories',JSON.stringify(categories),'--yes'], { stdio: 'inherit' });
    if (amplifyResult.signal) process.exit(1);
    process.exit(amplifyResult.status);
    
  /**
   * The task put as argument is not knowned
   */
  default:
    console.error('unknow command : ' + task);
    process.exit(1);
}
