import chalk, { supportsColor } from 'chalk'

const logLevels = ['error', 'warn', 'info', 'debug', 'trace'] as const
type LogLevel = (typeof logLevels)[number]

const maxPrefixLength = Math.max(...logLevels.map((l) => l.length))

class Logger {
  private static log(level: LogLevel, tag: string, message: any): void {
    const colorMap = {
      error: chalk.bgRed.whiteBright,
      warn: chalk.bgYellow.black,
      info: chalk.bgBlue.black,
      debug: chalk.bgGreen.black,
      trace: chalk.bgMagenta.whiteBright,
    }

    const consoleMethodMap = {
      error: console.error,
      warn: console.warn,
      info: console.info,
      debug: console.debug,
      trace: console.log, // `console.trace` outputs stack trace, not suitable for logging messages
    }

    const colorize = supportsColor ? colorMap[level] : (s: string) => s
    const levelString = level.toUpperCase().padEnd(maxPrefixLength)
    const prefix = `${colorize(' ' + levelString + ' ')} ${new Date().toISOString()}`
    const consoleMethod = consoleMethodMap[level]

    const formattedTag = `[${tag}]`
    const formattedMessage =
      typeof message === 'string' ? message : JSON.stringify(message)

    // Check if the output supports color
    const output = `${prefix} ${formattedTag} ${formattedMessage}`

    consoleMethod(output)
  }

  static error(tag: string, message: any): void {
    this.log('error', tag, message)
  }

  static warn(tag: string, message: any): void {
    this.log('warn', tag, message)
  }

  static info(tag: string, message: any): void {
    this.log('info', tag, message)
  }

  static debug(tag: string, message: any): void {
    this.log('debug', tag, message)
  }

  static trace(tag: string, message: any): void {
    this.log('trace', tag, message)
  }
}

export default Logger
