import { disableDraggable } from './common';

class Resize {
  addResize($elm) {
    $elm.appendChild(this.defaultResizeHole({ top: '0', left: '0' }));
    $elm.appendChild(this.defaultResizeHole({ top: '0', left: '50%' }));
    $elm.appendChild(this.defaultResizeHole({ top: '0', left: '100%' }));

    $elm.appendChild(this.defaultResizeHole({ top: '50%', left: '0' }));
    $elm.appendChild(this.defaultResizeHole({ top: '50%', left: '100%' }));

    $elm.appendChild(this.defaultResizeHole({ top: '100%', left: '0' }));
    $elm.appendChild(this.defaultResizeHole({ top: '100%', left: '50%' }));
    $elm.appendChild(this.defaultResizeHole({ top: '100%', left: '100%' }));
  }
  defaultResizeHole({ top, left }) {
    if (!top || !left) {
      return new Error('Parameter error: top, left')
    }
    const $spot = document.createElement('div');
    $spot.style.width = '0';
    $spot.style.height = '0';
    $spot.style.padding = '7.5px';
    $spot.style.borderRadius = '50%';
    $spot.style.background = 'yellow';
    $spot.style.position = 'absolute';
    $spot.style.opacity = '1.0';
    disableDraggable($spot);
    $spot.style.transform = 'translate(-50%, -50%)';
    $spot.style.cursor = 'pointer';
    $spot.style.top = top;
    $spot.style.left = left;
    return $spot;
  }
}

export default Resize;
