import pino from 'pino'


const transport = process.env.NODE_ENV === 'development'
  ? {
      target: 'pino-pretty',
      options: {
        colorize: true,
        levelFirst: true,
      }
    }
  : undefined;


export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport
})
