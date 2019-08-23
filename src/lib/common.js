const disableDraggable = ($elm) => {
  $elm.setAttribute('draggable', false);
  $elm.style.userDrag = 'none';
  $elm.userSelect = 'none';
  $elm['-moz-user-select'] = 'none';
  $elm['-webkit-user-drag'] = 'none';
  $elm['-webkit-user-select'] = 'none';
  $elm['-ms-user-select'] = 'none';
}

export { disableDraggable };
export default {
  disableDraggable
};
