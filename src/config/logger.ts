import { utilities as nestWinstonUtils } from 'nest-winston';
import { format, transports } from 'winston';
const { combine, timestamp, label, json, colorize, splat, printf } = format;

export default {
  format: combine(timestamp(), nestWinstonUtils.format.nestLike()),
  transports: [new transports.Console()],
};
