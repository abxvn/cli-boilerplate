import { Command } from 'commander'
import { range } from 'lodash'
import { error, info, log } from './lib/loggers'
import { createProgress } from './lib/ProgressBar'

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

    // TODO: Add commands

    // TODO: Remove below tests
    // Test progressbar
    const progbarItems = [{
      title: 'Test',
      total: 100,
      current: 0
    }]

    const progbar = createProgress(progbarItems)

    range(1, 6).map(async t =>
      setTimeout(() => {
        progbarItems[0].current += 20
        progbar.merge(progbarItems)
      }, t * 500)
    )
    // Test log
    log('Hello World')
  } catch (err) {
    error(err)
  }
}

main(APP_CLI, APP_VERSION)
