import { Component, Vue } from 'vue-property-decorator'

export interface StorageVendor {
    get (key: string, namespace: string): Promise<any>

    set (key: string, value: any, namespace: string): Promise<any>
}

export class LocalStorage implements StorageVendor {
  get (key: string, namespace: string): Promise<any> {
    let name = this.resolveKey(key, namespace)
    let value = window.localStorage.getItem(name)
    value = value && JSON.parse(value)
    return Promise.resolve(value)
  }

  set (key: string, value: any, namespace: string): Promise<any> {
    let name = this.resolveKey(key, namespace)
    let sequence = JSON.stringify(value)
    window.localStorage.setItem(name, sequence)
    return Promise.resolve()
  }

  private resolveKey (key: string, namespace: string) {
    return namespace + '.' + key
  }
}

export interface StorageOption {
    vendor?: StorageVendor
}

@Component
export default class Storage extends Vue {
  static install (_Vue: typeof Vue, options: StorageOption) {
    const storage = new Storage()
    if (options && options.vendor) storage.vendor = options.vendor
    _Vue.prototype.$storage = storage
  }

    public vendor: StorageVendor = new LocalStorage()

    public namespace: string = ''

    private state: any = {}

    public set (key: string, value: any, namespace?: string) {
      let ns = namespace || this.namespace
      return this.vendor.set(key, value, ns).then(() => {
        return this.get(key, ns)
      })
    }

    public get (key: string, namespace?: string) {
      let ns = namespace || this.namespace
      let value = this.state[key]
      if (value === undefined) this.$set(this.state, key, null)
      value = this.state[key] // just for dependence
      return this.vendor.get(key, ns).then(data => {
        this.state[key] = data || null
      })
    }
}
