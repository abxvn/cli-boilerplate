import { bgYellow, blue, green, red } from 'chalk'
import {
  info as infoIcon,
  tick as checkIcon
} from 'figures'

declare var NODE_ENV: string
export const icons = {
  success: green(checkIcon),
  warn: bgYellow('warn'),
  info: blue(infoIcon)
}

export const log = (msg: any): void => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (msg) {
    console.log(msg)
  }
}
export const line = (): void => console.log('')
export const success = (message: string): void => log(icons.success + ' ' + message)
export const warn = (message: string): void => log(icons.warn + ' ' + message)
export const error = (err: Error): void => {
  if (NODE_ENV === 'development') {
    log(red(err.stack))
  } else {
    log(red('ERROR: ' + err.message))
  }
}
export const info = (message: string): void => log(icons.info + ' ' + message)
