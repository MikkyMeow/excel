import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import { $ } from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    return createTable(50);
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target);
      const $parent = $resizer.closest('[data-type="resizable"]');
      const coords = $parent.getCoords();

      if ($resizer.$el.dataset.resize === 'col') {
        document.onmousemove = e => {
          const delta = e.pageX - coords.right;
          const value = coords.width + delta;
          $parent.$el.style.width = value + 'px';
          document
            .querySelectorAll(`[data-col="${$parent.data.col}"]`)
            .forEach(el => (el.style.width = value + 'px'));
        };
      }

      if ($resizer.$el.dataset.resize === 'row') {
        document.onmousemove = e => {
          const delta = e.pageY - coords.bottom;
          const value = coords.height + delta;
          $parent.$el.style.height = value + 'px';
        };
      }

      document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
  }
}
