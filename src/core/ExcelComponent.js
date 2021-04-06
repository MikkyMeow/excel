import { DomListener } from '@core/DOMListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
  }

  // Возвращает шаблон компонента
  toHTML() {
    return '';
  }

  init() {
    this.initDOMListeners();
  }
}
