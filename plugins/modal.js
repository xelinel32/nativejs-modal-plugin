Element.prototype.appendAfter = function (elem) {
  elem.parentNode.insertBefore(this, elem.nextSibling);
};

function noop() {}

function _createModalFooter(buttons = []) {
  if (buttons.length == 0) {
    return document.createElement('div');
  }

  const wrap = document.createElement('div');
  wrap.classList.add('vmodal-footer');
  buttons.forEach((btn) => {
    const $btn = document.createElement('button');
    $btn.textContent = btn.text;
    $btn.classList.add('btn');
    $btn.classList.add(`btn-${btn.type || 'secondary'}`);
    $btn.onclick = btn.handler || noop;
    wrap.appendChild($btn);
  });
  return wrap;
}

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
          <div class="vmodal-body" data-content>
            ${options.content || ''}
          </div>

        </div>
      </div>`
  );
  const footer = _createModalFooter(options.footerButtons);
  footer.appendAfter(vmodal.querySelector('[data-content]'));
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
        if (typeof options.onClose === 'function') {
          options.onClose();
        }
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
    setContent(content) {
      $modal.querySelector('[data-content]').innerHTML = content;
    },
  });
};
