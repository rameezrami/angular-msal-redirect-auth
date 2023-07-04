import { Injectable } from '@angular/core';
const APP_PRE = 'MYAPP_';
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}
  private parseStorageKey(property: string) {
    return `${APP_PRE}${property}`;
  }

  getLocalStorageValue(property: string): any {
    const item = localStorage.getItem(this.parseStorageKey(property));
    return item ? JSON.parse(item) : null;
  }

  setLocalStorageValue(property: string, value: any) {
    localStorage.setItem(this.parseStorageKey(property), JSON.stringify(value));
  }

  removeItemFromLocalStorage(property: string) {
    localStorage.removeItem(this.parseStorageKey(property));
  }

  clearLocalStorage() {
    localStorage.clear();
  }
  getSessionStorageValue(property: string): any {
    const item = sessionStorage.getItem(this.parseStorageKey(property));
    return item ? JSON.parse(item) : null;
  }

  setSessionStorageValue(property: string, value: any) {
    sessionStorage.setItem(
      this.parseStorageKey(property),
      JSON.stringify(value)
    );
  }

  removeSessionStorageItem(property: string) {
    sessionStorage.removeItem(this.parseStorageKey(property));
  }
  clearSessionStorage() {
    sessionStorage.clear();
  }
}
