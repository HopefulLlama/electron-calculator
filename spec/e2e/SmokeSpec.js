const Application = require('./Application');

let app;

describe('SmokeSpec', () => {
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

  it('should be visible', () => app.browserWindow.isVisible()
    .then(isVisible => expect(isVisible).toBe(true, 'visibility'))
  );

  it('should have the correct title', () => app.client.getTitle()
    .then(title => expect(title).toBe('Calculator'))
  );

  it('should be running', () => expect(app.isRunning()).toBe(true, 'running'));
});