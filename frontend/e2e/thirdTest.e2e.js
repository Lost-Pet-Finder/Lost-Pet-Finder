const login_test = async () => {
    await element(by.id('EmailInput_detox')).tap();
    await element(by.id('EmailInput_detox')).typeText('ruolin.li07@gmail.com');
    await element(by.id('PasswordInput_detox')).tap();
    await element(by.id('PasswordInput_detox')).typeText('Liruolin982100');
    await element(by.id('SignInFinderButton_detox')).tap();
};

const contact_test = async () => {
    await waitFor(element(by.id('HomeContactButton_detox'))).toBeVisible().withTimeout(4000);
    await element(by.id('HomeContactButton_detox')).tap();
    await waitFor(element(by.id('Pending_detox'))).toBeVisible().withTimeout(4000);
    await expect(element(by.id('Pending_detox'))).toBeVisible()
    await element(by.id('Pending_detox')).tap();
}

describe('Testing see contact page use case', () => {
    it('Should see contact requests', async () => {
        await device.reloadReactNative();
        await login_test();
        await contact_test();
    });
});