import { createLogger, format, transports } from "winston";
const { combine, colorize, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} | ${level} | ${message}`;
});

const level = process.env.LOG_LEVEL || "debug";

export const logger = createLogger({
    level: level,
    format: combine(colorize(), timestamp(), myFormat),
    transports: [new transports.Console()],
});