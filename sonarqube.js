const scanner = require("sonarqube-scanner");

scanner(
  {
    serverUrl: "http://localhost:9000",
    token: "00091ca917f1dc5717179495becc738750d95601",
    options: {
      "sonar.projectKey": "siy",
      "sonar.projectName": "My App",
      "sonar.projectDescription": 'Description for "My App" project...',
      "sonar.sources": "src",
      "sonar.tests": "tests",
    },
  },
  () => process.exit()
);
