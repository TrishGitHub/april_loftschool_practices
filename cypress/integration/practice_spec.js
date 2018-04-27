describe('lesson-12', () => {
  describe('page exists', () => {
    it('visit index page', () => {
      cy.visit('/');
    });
  });

  describe('user scenarios', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('contains button Скачать', () => {
      cy.contains('button', 'Скачать');
    });

    it('После нажатия кнопки «Скачать» появляется текст «Загрузка...»', () => {
      cy.get('button').click();
      cy.contains('p', 'Загрузка...');
    });

    it('После нажатия кнопки «Скачать» появляются данные о стоимости рубля', () => {
      cy.get('button').click();
      cy.contains('h1', 'Курс рубля за');
    });
  });

});
