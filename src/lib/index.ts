import chalk, { supportsColor } from 'chalk'

const logLevels = ['error', 'warn', 'info', 'debug', 'trace'] as const
type LogLevel = (typeof logLevels)[number]

const maxPrefixLength = Math.max(...logLevels.map((l) => l.length))

class Logger {
  private static log(level: LogLevel, tag: string, ...messages: any[]): void {
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
    const formattedMessage = messages
      .map((message) =>
        typeof message === 'string' ? message : JSON.stringify(message),
      )
      .join(' ')

    // Check if the output supports color
    const output = `${prefix} ${formattedTag} ${formattedMessage}`

    consoleMethod(output)
  }

  static error(tag: string, ...messages: any[]): void {
    this.log('error', tag, ...messages)
  }

  static warn(tag: string, ...messages: any[]): void {
    this.log('warn', tag, ...messages)
  }

  static info(tag: string, ...messages: any[]): void {
    this.log('info', tag, ...messages)
  }

  static debug(tag: string, ...messages: any[]): void {
    this.log('debug', tag, ...messages)
  }

  static trace(tag: string, ...messages: any[]): void {
    this.log('trace', tag, ...messages)
  }
}

export default Logger
