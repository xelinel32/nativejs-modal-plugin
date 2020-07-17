const fruits = [
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
const modal = $.modal({
  title: 'Artemy Modal',
  closable: true,
  content: `
  <p>Lorem lorem lorem lorem</p>
  `,
  width: '400px',
  footerButtons: [
    {
      text: 'Ok',
      type: 'primary',
      handler() {
        console.log('Primary btn clicked!');
      },
    },
    {
      text: 'Cancel',
      type: 'danger',
      handler() {
        modal.close();
      },
    },
  ],
});
