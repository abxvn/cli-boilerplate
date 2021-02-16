import { cyan, green, grey, yellow } from 'chalk'
import { line, tick } from 'figures'
import { assign, map, max, padEnd, round } from 'lodash'
import IProgressBarItem from './IProgressBarItem'
import ProgressBar from './ProgressBar'

const replaceTokens = (str: string, tokens: any): string => str.replace(/\{(\w+)\}/g, (_, key) => tokens[key] ?? key)

export const createProgress = (data: IProgressBarItem[] = [], options: any = {}): ProgressBar => {
  const progbar = new ProgressBar(data, assign({
    barCompleteChar: '-',
    barIncompleteChar: '·',
    clearOnComplete: false,
    stopOnComplete: true,
    hideCursor: true,
    barGlue: '>',
    format: (options: any, params: any, payload: any): string => {
      const {
        barsize,
        barCompleteString,
        barIncompleteString
      } = options

      const isCompleted = params.value >= params.total

      // bar
      const barGlue: string = isCompleted ? barCompleteString[0] : options.barGlue ?? ''
      const size = barsize - barGlue.length
      const completeSize = Math.round(params.progress * size)
      const completeString: string = barCompleteString.substr(0, completeSize)
      const incompleteString: string = barIncompleteString.substr(0, size - completeSize)
      const bar = `${completeString}${barGlue}${incompleteString}`

      const eta: string = params.eta
      let etaString

      if (eta === 'NULL') {
        etaString = grey('N/A')
      } else if (eta === 'INF') {
        etaString = yellow('∞')
      } else {
        etaString = cyan(`${eta}s`)
      }

      const longestTitle = max(map(progbar.data, i => i.title.length))
      const title = padEnd(payload.title, longestTitle, ' ')

      if (isCompleted) {
        return replaceTokens('{icon} {title} in {completeSeconds}s', assign({}, payload, params, {
          icon: green(tick),
          completeSeconds: round((params.stopTime.getTime() - params.startTime) / 1000, 1),
          title
        }))
      } else {
        return replaceTokens('{icon} {title} [{bar}] {value}/{total} {etaString}', assign({}, payload, params, {
          icon: grey(line),
          etaString,
          title,
          bar
        }))
      }
    }
  }, options))

  return progbar
}

export default ProgressBar
