import watType from 'wat-type';
import state from './state';
import Resize from './resize';
import Drag from './drag';
import aggregation from './aggregation';
import { disableDraggable } from './common';

class Hotspot extends aggregation(Resize, Drag) {
  constructor($target) {
    if (!watType.isHTMLElement($target)) {
      return new Error('Not Dom element');
    }
    super();

    const $root = document.createElement('div');
    $root.style.width = '100%';
    $root.style.height = '100%';
    $root.style.padding = '0';
    $root.style.border = '0';
    $root.style.margin = '0';
    $root.style.position = 'relative';
    $target.appendChild($root);
    const $elm = this.createRectangle()
    this.state = {
      ...state,
      $target,
      $root,
      $elm
    };

    this.appendImage(this.state.$root);
    this.state.$root.appendChild($elm);
    this.addResize($elm);
    this.drag($elm);
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
}

export default Hotspot