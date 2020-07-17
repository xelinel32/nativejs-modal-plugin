let fruits = [
  {
    id: 1,
    title: 'Яблоки',
    price: 20,
    img:
      'https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348',
  },
  {
    id: 2,
    title: 'Апельсины',
    price: 30,
    img:
      'https://m.dom-eda.com/uploads/images/catalog/item/dfc9a3e974/3cbf3bd41c_1000.jpg',
  },
  {
    id: 3,
    title: 'Манго',
    price: 40,
    img:
      'https://itsfresh.ru/upload/iblock/178/178d8253202ef1c7af13bdbd67ce65cd.jpg',
  },
];

const toHTML = (fruit) => `
  <div class="col">
    <div class="card" style="width: 18rem;">
      <img
        src="${fruit.img}" style="width: 200px; margin: 0 auto; height: 150px "
        class="card-img-top"
      />
      <div class="card-body">
        <h5 class="card-title">${fruit.title}</h5>
        <a href="#" class="btn btn-primary" data-price="price" data-id=${fruit.id}>Посмотреть цену</a>
        <a href="#" class="btn btn-danger" data-price="remove" data-id=${fruit.id}>Удалить</a>
      </div>
    </div>
  </div>`;

function render() {
  const html = fruits.map((fruit) => toHTML(fruit)).join('');
  document.getElementById('fruits').innerHTML = html;
}

render();

const priceModal = $.modal({
  title: 'Цена на товар',
  closable: true,
  width: '400px',
  footerButtons: [
    {
      text: 'Close',
      type: 'primary',
      handler() {
        priceModal.close();
      },
    },
  ],
});

document.addEventListener('click', (e) => {
  e.preventDefault();
  const btnType = e.target.dataset.price;
  const id = Number(e.target.dataset.id);
  const fruit = fruits.find((f) => f.id === id);

  if (btnType === 'price') {
    priceModal.setContent(`
    <p>Цена на ${fruit.title} <strong>${fruit.price}$</strong></p>
    `);

    priceModal.open();
  } else if (btnType === 'remove') {
    $.confirm({
      title: 'Вы уверены?',
      content: `<p>Вы удаляете фрукт: <strong>${fruit.title}</strong></p>`,
    })
      .then(() => {
        fruits = fruits.filter((f = f.id !== id));
        render()
      })
      .catch(() => {
        console.log('Cancel');
      });
  }
});
