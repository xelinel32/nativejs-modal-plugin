$.confirm = function () {
  return new Promise((resolve, reject) => {
    const modal = $.modal({
      title: opetions.title,
      width: '400px',
      closable: false,
      content: opetions.content,
      onClose() {
        modal.destroy();
      },
      footerButtons: [
        {
          text: 'Back',
          type: 'secondary',
          handler() {
            modal.close();
            reject();
          },
        },
        {
          text: 'Delete',
          type: 'danger',
          handler() {
            modal.close();
            resolve();
          },
        },
      ],
    });

    setTimeout(() => {
      modal.open();
    }, 100);
  });
};
