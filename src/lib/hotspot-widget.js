import watType from 'wat-type';
import state from './state';
import Resize from './resize';
import { disableDraggable } from './common';

class Hotspot extends Resize {
  constructor($root) {
    if (!watType.isHTMLElement($root)) {
      return new Error('Not Dom element');
    }

    const $elm = document.createElement('div');
    $elm.style.width = '100%';
    $elm.style.height = '100%';
    $elm.style.padding = '0';
    $elm.style.border = '0';
    $elm.style.margin = '0';
    $elm.style.position = 'relative';
    $root.appendChild($elm);
    this.state = Object.assign(state, {
      $root,
      $elm
    });

    this.appendImage(this.state.$elm);
    this.createRectangle(this.state.$elm);
  }
  appendImage($elm, filepath = '../public/beauty.jpg') {
    const $img = document.createElement('img');
    $img.src = filepath;
    $img.style.width = '100%';
    $img.style.height = '100%';
    disableDraggable($img);
    $elm.appendChild($img)
  }
  createRectangle($elm) {
    const $div = document.createElement('div');
    $div.style.position = 'absolute';
    $div.style.top = '50%';
    $div.style.left = '50%';
    $div.style.width = '300px';
    $div.style.height = '300px';
    $div.style.transform = 'translate(-50%, -50%)';
    $div.style.opacity = '1.0';
    
    const $rect = document.createElement('div');
    $rect.style.position = 'absolute';
    $rect.style.width = '100%';
    $rect.style.height = '100%';
    $rect.style.background = 'red';
    $rect.style.opacity = '0.5';

    $div.appendChild($rect);
    $elm.appendChild($div);
    this.addResize($div);
  }
}

export default Hotspot