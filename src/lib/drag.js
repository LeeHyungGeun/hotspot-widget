class Drag {
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
    this.mousedownEvent = this.mousedownEvent.bind(this);
    this.mousemoveEvent = this.mousemoveEvent.bind(this);
    this.mouseupEvent = this.mouseupEvent.bind(this);
    $elm.addEventListener('mousedown', this.mousedownEvent, true);
  }
}

export default Drag;
