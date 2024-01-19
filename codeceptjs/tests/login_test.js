Feature('user');

Scenario('login', async ({I}) => {
    I.amOnPage("http://localhost:3000/");
    I.click('//*[@id="yourUsername"]');
    I.fillField('//*[@id="yourUsername"]', 'testtest@gmail.com');
    I.click('//*[@id="yourPassword"]');
    I.fillField('//*[@id="yourPassword"]', 'testtest');
    I.click('/html/body/main/div/section/div/div/div/div[2]/div/form/div[4]/button');
});