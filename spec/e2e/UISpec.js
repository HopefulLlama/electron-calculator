const fs = require('fs');
const path = require('path');

const Application = require('./Application');

let app;

const numericButtons = ['0', '.', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operandButtons = ['÷', '×', '+', '-'];
const arbitraryButtons = ['=', 'C', 'AC'];

describe('UISpec', () => {
  beforeEach(() => {
    app = Application.createApp();
    return app.start();
  });

  afterEach(() => {
    if(app.isRunning()) {
      return app.stop();
    } else {
      return Promise.resolve();
    }
  });

  it('should take a picture', () => app.browserWindow.capturePage()
    .then(imageBuffer => {
      fs.writeFileSync(path.join('spec', 'e2e', 'ui.png'), imageBuffer);
    })
  );

  it('should have the right buttons', () => app.client.getText('.button')
    .then(buttonTexts => {
      const expectedTexts = numericButtons
        .concat(operandButtons)
        .concat(arbitraryButtons);

      expect(buttonTexts.length).toBe(18);
      expectedTexts.forEach(expectedText => {
        expect(buttonTexts.includes(expectedText)).toBe(true, `includes ${expectedText}`);
      });
    })
  );

  it('should have the right numeric buttons', () => app.client.getText('.numeric-button')
    .then(buttonTexts => {
      expect(buttonTexts.length).toBe(11);
      numericButtons.forEach(expectedText => {
        expect(buttonTexts.includes(expectedText)).toBe(true, `includes ${expectedText}`);
      });
    })
  );

  it('should have the right operand buttons', () => app.client.getText('.operand-button')
    .then(buttonTexts => {
      expect(buttonTexts.length).toBe(4);
      operandButtons.forEach(expectedText => {
        expect(buttonTexts.includes(expectedText)).toBe(true, `includes ${expectedText}`);
      });
    })
  );

  it('should have the right arbitrary buttons', () => app.client.getText('.arbitrary-button')
    .then(buttonTexts => {
      expect(buttonTexts.length).toBe(3);
      arbitraryButtons.forEach(expectedText => {
        expect(buttonTexts.includes(expectedText)).toBe(true, `includes ${expectedText}`);
      });
    })
  );
});