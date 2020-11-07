describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('login screen is visible', async () => {
    await expect(element(by.id('LoginScreen_detox'))).toBeVisible()
  });

  it('sign in button for finder is visible', async () => {
    await expect(element(by.id('SignInFinderButton_detox'))).toBeVisible()
  });

  it('sign in button for loser is visible', async () => {
    await expect(element(by.id('SignInLoserButton_detox'))).toBeVisible()
  });

  // Tap button
  it('signing in as finder takes us to home page', async () => {
    await element(by.id('SignInFinderButton_detox')).tap();
    await expect(by.id('HomePage_detox')).toBeVisible();
  });

  // Tap button
  it('signing in as loser takes us to home page', async () => {
    await element(by.id('SignInLoserButton_detox')).tap();
    await expect(by.id('HomePage_detox')).toBeVisible();
  });



});
