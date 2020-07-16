function _createModal(options) {
  const vmodal = document.createElement('div');
  const DEFAULT_WIDTH = '600px';
  vmodal.classList.add('vmodal');
  vmodal.insertAdjacentHTML(
    'afterBegin',
    `<div class="vmodal-overlay" data-close="true">
        <div class="vmodal-window" style="width: ${
          options.width || DEFAULT_WIDTH
        }">
          <div class="vmodal-header">
            <span class="vmodal-title">${options.title || 'Window'}</span>
            ${
              options.closable
                ? `<span class="vmodal-close" data-close="true">&times;</span>`
                : ''
            }
          </div>
          <div class="vmodal-body">
            ${options.content || ''}
          </div>
          <div class="vmodal-footer">
            <button>Ok</button>
            <button>Cancel</button>
          </div>
        </div>
      </div>`
  );
  document.body.appendChild(vmodal);
  return vmodal;
}

$.modal = function (options) {
  const $modal = _createModal(options);
  const ANIMATION_SPEED = 200;
  let closing = false;
  let destroyed = false;

  const modal = {
    open() {
      if (destroyed) {
        return console.log('Modal is destroyed!');
      }
      if (!closing) {
        $modal.classList.add('open');
      }
    },
    close() {
      closing = true;
      $modal.classList.remove('open');
      $modal.classList.add('hide');
      setTimeout(() => {
        $modal.classList.remove('hide');
        closing = false;
      }, ANIMATION_SPEED);
    },
  };

  const listener = (e) => {
    if (event.target.dataset.close) {
      modal.close();
    }
  };

  $modal.addEventListener('click', listener);

  return Object.assign(modal, {
    destroy() {
      $modal.parentNode.removeChild($modal);
      $modal.removeEventListener('click', listener);
      destroyed = true;
    },
  });
};
