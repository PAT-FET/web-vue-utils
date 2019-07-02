
import config from './config'

export function message (text: string): void {
  return (config.ui.message as any)(text)
}

export function confirm (title: string, content: string): Promise<any> {
  return (config.ui.confirm as any)(title, content)
}
