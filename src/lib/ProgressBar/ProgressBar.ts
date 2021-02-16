import { MultiBar, SingleBar } from 'cli-progress'
import { times } from 'lodash'
import IProgressBarItem from './IProgressBarItem'

/**
 * Adapter to simplize implementation of CLI Progress
 */
export default class ProgressBar {
  private readonly renderer: MultiBar
  private readonly bars: SingleBar[] = []
  data: IProgressBarItem[] = []

  constructor (data: IProgressBarItem[] = [], options: any = {}) {
    this.renderer = new MultiBar(options)
    this.merge(data)
  }

  merge (data: IProgressBarItem[]): void {
    const addedCount = data.length - this.data.length
    const removedCount = this.data.length - data.length

    this.data = data.slice()

    // times detect values > 0
    times(addedCount, () => this.bars.push(this.renderer.create(0, 0)))
    times(removedCount, () => {
      const lastBar = this.bars.pop()

      if (lastBar instanceof SingleBar) {
        this.renderer.remove(lastBar)
      }
    })

    this.data.forEach(({ total, current, title }, idx) => {
      const bar = this.bars[idx]

      bar.setTotal(total)
      bar.update(current, { title })
    })
  }

  stop (): void {
    this.renderer.stop()
  }
}
