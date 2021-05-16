import { Logger } from 'tslog';

const logger = new Logger({
  name: 'MainLogger',
  displayFilePath: 'hidden',
  displayFunctionName: false,
});

export default logger;
