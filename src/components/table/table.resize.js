import { $ } from '@core/dom';

export function resizeHandler($root, event) {
  const $resizer = $(event.target);
  const $parent = $resizer.closest('[data-type="resizable"]');
  const coords = $parent.getCoords();
  const type = $resizer.$el.dataset.resize;
  const minWidth = 40;
  const minHeight = 20;
  let value;
  const sideProp = type === 'col' ? 'bottom' : 'right';

  $resizer.css({
    opacity: 1,
    [sideProp]: '-5000px',
  });

  document.onmousemove = e => {
    if (type === 'col') {
      const delta = e.pageX - coords.right;
      value = coords.width + delta;
      if (value > minWidth) {
        $resizer.css({ right: -delta + 'px' });
      } else {
        $resizer.css({ right: `calc(100% - ${minWidth})` });
      }
    } else {
      const delta = e.pageY - coords.bottom;
      value = coords.height + delta;
      if (value > minHeight) {
        $resizer.css({ bottom: -delta + 'px' });
      } else {
        $resizer.css({ bottom: `calc(100% - ${minHeight})` });
      }
    }
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;

    if (type === 'col') {
      if (value < minWidth) {
        value = minWidth;
      }

      $parent.css({ width: value + 'px' });
      $root
        .findAll(`[data-col="${$parent.data.col}"]`)
        .forEach(el => (el.style.width = value + 'px'));
    } else {
      if (value < minHeight) {
        value = minHeight;
      }
      $parent.css({ height: value + 'px' });
    }

    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0,
    });
  };
}
