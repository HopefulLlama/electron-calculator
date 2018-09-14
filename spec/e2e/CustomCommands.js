module.exports = client => {
  function clickButton(text) {
    return client.click(`.button=${text.toString()}`);
  }

  client.addCommand('clickButton', clickButton);
  client.addCommand('clickButtons', texts => {
    return texts.reduce((previousValue, text) => {
      return previousValue
        .then(clickButton(text));
    }, Promise.resolve());
  });

  function getDisplay() {
    return client.getValue('#active-display');
  }

  client.addCommand('getDisplay', getDisplay);
  client.addCommand('expectDisplayToBe', expectedText => {
    return getDisplay()
      .then(text => expect(text).toBe(expectedText.toString()));
  });

  function getSummary() {
    return client.getText('#summary-display');
  }

  client.addCommand('getSummary', getSummary);
  client.addCommand('expectSummaryToBe', expectedText => {
    return getSummary()
      .then(text => expect(text).toBe(expectedText.toString()));
  });
};