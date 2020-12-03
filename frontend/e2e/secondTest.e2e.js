const login_test = async () => {
    await element(by.id('EmailInput_detox')).tap();
    await element(by.id('EmailInput_detox')).typeText('ruolin.li07@gmail.com');
    await element(by.id('PasswordInput_detox')).tap();
    await element(by.id('PasswordInput_detox')).typeText('Liruolin982100');
    await element(by.id('SignInFinderButton_detox')).tap();
};

const browse_test = async () => {
    await waitFor(element(by.id('BrowseButton_detox'))).toBeVisible().withTimeout(4000);
    await element(by.id('BrowseButton_detox')).tap();
    await waitFor(element(by.id('BrowseView_detox'))).toBeVisible().withTimeout(4000);
    await expect(element(by.id('BrowseView_detox'))).toBeVisible() && expect(element(by.id('ScrollViewCell_detox'))).toBeVisible();
}

describe('Testing browse posts use case', () => {
    // Test browse posts use case
    it('Should see pet posts', async () => {
        await device.reloadReactNative();
        await login_test();
        await waitFor(element(by.id('BrowseButton_detox'))).toBeVisible().withTimeout(4000);
        await browse_test();
    });


    // Test show detailed posts use case
    it('Should see the details of one specific posts and send contact request', async () => {
        await device.reloadReactNative();
        await login_test();
        await waitFor(element(by.id('BrowseButton_detox'))).toBeVisible().withTimeout(4000);
        await browse_test();
        await element(by.text('LEARN MORE')).atIndex(1).tap();
        await waitFor(element(by.id('ContactButton_detox'))).toBeVisible().withTimeout(4000);
        await expect(element(by.id('ContactButton_detox'))).toBeVisible() && expect(element(by.id('PetImage_detox'))).toBeVisible() && expect(element(by.id('Reporter_detox'))).toBeVisible() && expect(element(by.id('Location_detox'))).toBeVisible()  && expect(element(by.id('ReportDate_detox'))).toBeVisible() && expect(element(by.id('Color_detox'))).toBeVisible() && expect(element(by.id('Date_detox'))).toBeVisible() && expect(element(by.id('Distance_detox'))).toBeVisible() && expect(element(by.id('intersection_detox'))).toBeVisible() && expect(element(by.id('Tags_detox'))).toBeVisible();
        await element(by.id('ContactButton_detox')).tap();
        await waitFor(element(by.text('Request sent!'))).toBeVisible().withTimeout(4000);
        await expect(element(by.text('Request sent!'))).toBeVisible();
        await element(by.text('OK')).tap();
    });
});