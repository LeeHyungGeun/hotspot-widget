import watType from 'wat-type';
import state from './state';
import Resize from './resize';
import { disableDraggable } from './common';

class Hotspot extends Resize {
  constructor($target) {
    if (!watType.isHTMLElement($target)) {
      return new Error('Not Dom element');
    }
    super();

    this.mousemoveEvent = this.mousemoveEvent.bind(this);
    this.mousedownEvent = this.mousedownEvent.bind(this);
    this.mouseupEvent = this.mouseupEvent.bind(this); 

    const $root = document.createElement('div');
    $root.style.width = '100%';
    $root.style.height = '100%';
    $root.style.padding = '0';
    $root.style.border = '0';
    $root.style.margin = '0';
    $root.style.position = 'relative';
    $target.appendChild($root);
    this.state = Object.assign(state, {
      $target,
      $root
    });

    this.appendImage(this.state.$root);
    const $elm = this.createRectangle()
    this.state.$root.appendChild($elm);
    this.addResize($elm);
    this.drag($elm);

    this.state = {
      ...this.state,
      $elm
    };
  }
  appendImage($elm, filepath = '../public/beauty.jpg') {
    const $img = document.createElement('img');
    $img.src = filepath;
    $img.style.width = '100%';
    $img.style.height = '100%';
    disableDraggable($img);
    $elm.appendChild($img)
  }
  createRectangle() {
    const $div = document.createElement('div');
    $div.style.position = 'absolute';
    // $div.style.top = '50%';
    // $div.style.left = '50%';
    $div.style.top = '0';
    $div.style.left = '0';
    $div.style.width = '300px';
    $div.style.height = '300px';
    // $div.style.transform = 'translate(-50%, -50%)';
    $div.style.opacity = '1.0';
    
    const $rect = document.createElement('div');
    $rect.style.position = 'absolute';
    $rect.style.width = '100%';
    $rect.style.height = '100%';
    $rect.style.background = 'red';
    $rect.style.opacity = '0.5';

    $div.appendChild($rect);
    return $div;
  }
  mousedownEvent(e) {
    // e.preventDefault();
    this.state.dragPosition = {
      x: e.clientX,
      y: e.clientY,
      top: parseInt(this.state.$elm.style.top),
      left: parseInt(this.state.$elm.style.left)
    };
    window.addEventListener('mousemove', this.mousemoveEvent, true);
    window.addEventListener('mouseup', this.mouseupEvent, true);
  }
  mousemoveEvent(e) {
    // e.preventDefault();
    const { dragPosition: { x, y, top, left } } = this.state;
    this.state.$elm.style.top = top + (e.clientY - y) + 'px';
    this.state.$elm.style.left = left + (e.clientX - x) + 'px';
  }
  mouseupEvent(e) {
    // e.preventDefault();
    window.removeEventListener('mousemove', this.mousemoveEvent, true);
  }
  drag($elm) {
    $elm.addEventListener('mousedown', this.mousedownEvent, true);
  }
}

export default Hotspot