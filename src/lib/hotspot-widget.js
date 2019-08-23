import watType from 'wat-type';

class Hotspot {
  constructor($elm) {
    if (!watType.isHTMLElement($elm)) {
      return new Error('Not Dom element');
    }

    this.injectImage();
    // console.log('Hotspot')
  }
  injectImage() {
    console.log('injectImage');
  }
}

export default Hotspot