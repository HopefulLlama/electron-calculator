const Application = require('./Application');
const CustomCommands = require('./CustomCommands');

let app;

describe('InteractionSpec', () => {
  beforeEach(() => {
    app = Application.createApp();

    return app
      .start()
      .then(() => CustomCommands(app.client));
  });

  afterEach(() => {
    if(app.isRunning()) {
      return app.stop();
    } else {
      return Promise.resolve();
    }
  });

  describe('basic button presses', () => {
    it('should default to zero and nothing', () => app.client.expectDisplayToBe('0')
      .then(() => app.client.expectSummaryToBe(''))
    );

    it('should display after pressing "1"', () => app.client.clickButton(1)
      .then(() => app.client.getDisplay())
      .then(text => expect(text).toBe('1'))
      .then(() => app.client.expectSummaryToBe(''))
    );

    it('should display after pressing "123"', () => app.client.click('.numeric-button=1')
      .then(() => app.client.click('.numeric-button=2'))
      .then(() => app.client.click('.numeric-button=3'))
      .then(() => app.client.getValue('#active-display'))
      .then(text => expect(text).toBe('123'))
    );

    it('should display after pressing "123" but with custom commands!', () => app.client.clickButtons([1, 2, 3])
      .then(() => app.client.expectDisplayToBe(123))
    );

    it('should display and summarise after pressing "123 ="', () => app.client.clickButtons([1, 2, 3, '='])
      .then(() => app.client.expectDisplayToBe(123))
      .then(() => app.client.expectSummaryToBe(123))
    );
  });

  describe('zeroes', () => {
    it('should not allow for multiple zeroes', () => app.client.clickButtons([0, 0, 0])
      .then(() => app.client.expectDisplayToBe(0))
      .then(() => app.client.clickButtons([0, 0, 0]))
      .then(() => app.client.expectDisplayToBe(0))
    );

    it('should allow for multiple trailing zeroes', () => app.client.clickButtons([1, 0])
      .then(() => app.client.expectDisplayToBe(10))
      .then(() => app.client.clickButtons([0, 0, 0]))
      .then(() => app.client.expectDisplayToBe(10000))
      .then(() => app.client.clickButtons([0, 0, 0]))
      .then(() => app.client.expectDisplayToBe(10000000))
    );

    it('should allow for multiple zeroes after decimal point', () => app.client.clickButtons(['.', 0])
      .then(() => app.client.expectDisplayToBe('0.0'))
      .then(() => app.client.clickButtons([0, 0, 0]))
      .then(() => app.client.expectDisplayToBe('0.0000'))
    );

    it('should replace zero', () => app.client.clickButton(1)
      .then(() => app.client.expectDisplayToBe(1))
    );
  });

  describe('decimal points', () => {
    it('should allow for a single decimal point', () => app.client.clickButton('.')
      .then(() => app.client.expectDisplayToBe('0.'))
    );

    it('should not allow for multiple decimal points', () => app.client.clickButtons(['.', '.', '.'])
      .then(() => app.client.expectDisplayToBe('0.'))
    );

    it('should not allow for decimal point immediately after operand', () => app.client.clickButtons(['+', '.', '.'])
      .then(() => app.client.expectDisplayToBe('0 + '))
    );
  });

  describe('should calculate after pressing', () => {
    it('"12 × 10 =', () => app.client.clickButtons([1, 2, '×', 1, 0, '='])
      .then(() => app.client.expectDisplayToBe(120))
      .then(() => app.client.expectSummaryToBe('12 × 10'))
    );

    it('"1000 + 23 ="', () => app.client.clickButtons([1, 0, 0, 0, '+', 2, 3, '='])
      .then(() => app.client.expectDisplayToBe(1023))
      .then(() => app.client.expectSummaryToBe('1000 + 23'))
    );

    it('"20 - 5 ="', () => app.client.clickButtons([2, 0, '-', 5, '='])
      .then(() => app.client.expectDisplayToBe(15))
      .then(() => app.client.expectSummaryToBe('20 - 5'))
    );

    it('"6 ÷ 3 ="', () => app.client.clickButtons([6, '÷', 3, '='])
      .then(() => app.client.expectDisplayToBe(2))
      .then(() => app.client.expectSummaryToBe('6 ÷ 3'))
    );

    it('"12.25 + 10.3 ="', () => app.client.clickButtons([1, 2, '.', 2, 5, '+', 1, 0, '.', 3, '='])
      .then(() => app.client.expectDisplayToBe(22.55))
      .then(() => app.client.expectSummaryToBe('12.25 + 10.3'))
    );
  });
});