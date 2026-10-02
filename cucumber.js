const browser = process.env.BROWSER || 'chromium';

module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['src/support/**/*.ts', 'src/steps/**/*.ts'],
    paths: ['src/features/**/*.feature'],
    format: [
      'progress',
      `html:reports/cucumber-report-${browser}.html`
    ]
  }
};
