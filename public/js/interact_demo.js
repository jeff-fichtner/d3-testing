function renderInteract() {

  // target elements with the "draggable" class
  interact('.draggable')
    .draggable({
      // enable inertial throwing
      inertia: true,
      // keep the element within the area of it's parent
      restrict: {
        restriction: "parent",
        endOnly: true,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
      },
      // enable autoScroll
      // autoScroll: true,

      // call this function on every dragmove event
      onmove: dragMoveListener,
      // call this function on every dragend event
      // onend: function (event) {
        // var textEl = event.target.querySelector('p');

        // textEl && (textEl.textContent =
        //   'moved a distance of '
        //   + (Math.sqrt(event.dx * event.dx +
        //                event.dy * event.dy)|0) + 'px');
      // }
    });

    function dragMoveListener (event) {
      var target = event.target,
          // keep the dragged position in the data-x/data-y attributes
          x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
          y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      // translate the element
      target.style.webkitTransform =
      target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

      // update the position attributes
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    }

    // this is used later in the resizing and gesture demos
    window.dragMoveListener = dragMoveListener;

    /* The dragging code for '.draggable' from the demo above
   * applies to this demo as well so it doesn't have to be repeated. */

  // enable draggables to be dropped into this
  interact('#inner-dropzone').dropzone({
    // only accept elements matching this CSS selector
    accept: '.yes-drop',
    // Require a 75% element overlap for a drop to be possible
    overlap: .01,

    // listen for drop related events:

    ondropactivate: function (event) {
      // add active dropzone feedback
      event.target.classList.add('drop-active');
      console.log('drop activate');
    },
    ondragenter: function (event) {
      var draggableElement = event.relatedTarget,
          dropzoneElement = event.target;
      console.log('drag enter');
    },
    ondragleave: function (event) {
      event.target.classList.remove('drop-target');
      console.log('drag leave');
    },
    ondrop: function (event) {
      console.log('drop');
      if (currentSentenceIndex === sentences.length - 1) {
        window.location = "https://www.wtf.com/wtf/wtaf";
      } else {
        currentSentenceIndex += 1;
        run(sentences[currentSentenceIndex]);
      }
    },
    ondropdeactivate: function (event) {
      // remove active dropzone feedback
      event.target.classList.remove('drop-active');
      event.target.classList.remove('drop-target');
      console.log('drop deactivate');
    }
  });
}
