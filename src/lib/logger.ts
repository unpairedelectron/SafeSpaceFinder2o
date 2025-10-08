// Logger utility for structured logging
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: any;
}

class Logger {
  private context: LogContext;

  constructor(context: LogContext = {}) {
    this.context = context;
  }

  private formatMessage(level: LogLevel, message: string, data?: LogContext): string {
    const timestamp = new Date().toISOString();
    const contextStr = JSON.stringify({ ...this.context, ...data });
    return `[${timestamp}] [${level.toUpperCase()}] ${message} ${contextStr !== '{}' ? contextStr : ''}`;
  }

  private log(level: LogLevel, message: string, data?: LogContext): void {
    const formattedMessage = this.formatMessage(level, message, data);

    // In production, send to logging service (Sentry, Logtail, etc.)
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to external logging service
      // this.sendToLoggingService(level, formattedMessage, data);
    }

    // Console output
    switch (level) {
      case 'debug':
        console.debug(formattedMessage);
        break;
      case 'info':
        console.info(formattedMessage);
        break;
      case 'warn':
        console.warn(formattedMessage);
        break;
      case 'error':
        console.error(formattedMessage);
        break;
    }
  }

  debug(message: string, data?: LogContext): void {
    this.log('debug', message, data);
  }

  info(message: string, data?: LogContext): void {
    this.log('info', message, data);
  }

  warn(message: string, data?: LogContext): void {
    this.log('warn', message, data);
  }

  error(message: string, error?: Error | unknown, data?: LogContext): void {
    const errorData: LogContext = {
      ...data,
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name,
      } : error,
    };
    this.log('error', message, errorData);
  }

  child(context: LogContext): Logger {
    return new Logger({ ...this.context, ...context });
  }
}

// Export singleton instance
export const logger = new Logger();

// Export factory for creating child loggers
export function createLogger(context: LogContext): Logger {
  return logger.child(context);
}
