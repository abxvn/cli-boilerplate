import { Command } from 'commander'
import { error, info, log } from './lib/loggers'

declare var APP_CLI: string
declare var NODE_ENV: string
declare var APP_VERSION: string

const main = (name: string, version: string): void => {
  try {
    if (NODE_ENV === 'development') {
      info('Running on dev mode')
    }

    const cli = new Command(name)

    cli.version(version)
    cli.parse()

    log('Hello World')

    throw Error('Test')
  } catch (err) {
    error(err)
  }
}

main(APP_CLI, APP_VERSION)
