import { EventEmitter, Injectable } from '@angular/core';


@Injectable()
export class StorageService<T> {

  /**
   * Get new instance of StorageService for specific property
   *
   * @param {string} key
   * @returns {StorageService<T>}
   */
  public static factory<T>(key: string): StorageService<T> {
    const storage = new StorageService<T>();
    storage.register(key);
    return storage;
  }

  /**
   * Set value to storage
   *
   * @param {string} key
   * @param {T} value
   */
  public static set<T>(key: string, value: T) {
    const data = StorageService.serialize<T>(value);
    localStorage.setItem(key, data);
  }

  /**
   * Get value from storage
   *
   * @param {string} key
   * @returns {T}
   */
  public static get<T>(key: string): T {
    const data = localStorage.getItem(key);
    return this.deserialize<T>(data);
  }

  /**
   * Clean Storage by key
   *
   * @param {string} key
   */
  public static remove(key: string) {
    localStorage.removeItem(key);
  }

  /**
   * Clear storage
   */
  public static clear(): void {
    localStorage.clear();
  }

  /**
   * Stringify data
   *
   * @param {T} data
   * @returns {string}
   */
  private static serialize<T>(data: T): string {
    return JSON.stringify(data || null);
  }

  /**
   * Parse data
   *
   * @param {string} data
   * @returns {T}
   */
  private static deserialize<T>(data: string): T {
    return JSON.parse(data || 'null');
  }

  private key: string;
  private value: T;
  private emitter: EventEmitter<T> = new EventEmitter<T>();

  set data(data: T) {
    this.value = data;
    StorageService.set<T>(this.key, data);
    this.emitter.emit(data);
  }

  get data(): T {
    this.value = StorageService.get<T>(this.key);
    return this.value;
  }

  public subscribe(fn: (newVal: T) => void) {
    this.emitter.subscribe(fn);
  }

  public destroy() {
    StorageService.remove(this.key);
  }

  public register(key: string) {
    this.key = key;
    this.value = StorageService.get<T>(key);
  }


}
