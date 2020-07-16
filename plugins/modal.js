function _createModal(options) {
  const vmodal = document.createElement("div");
  vmodal.classList.add("vmodal");
  vmodal.insertAdjacentHTML(
    "afterBegin",
    `<div class="vmodal-overlay">
        <div class="vmodal-window">
          <div class="vmodal-header">
            <span class="vmodal-title">Modal title</span>
            <span class="vmodal-close">&times;</span>
          </div>
          <div class="vmodal-body">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Architecto nihil cumque libero delectus aut quos provident et,
              facere aliquam commodi aliquid sapiente odit, impedit iure quasi
              tempora voluptatibus non aspernatur.
            </p>
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
  return {
    open() {
      if (!closing) {
        $modal.classList.add("open");
      }
    },
    close() {
      closing = true;
      $modal.classList.remove("open");
      $modal.classList.add("hide");
      setTimeout(() => {
        $modal.classList.remove("hide");
        closing = false;
      }, ANIMATION_SPEED);
    },
    destroy() {},
  };
};
