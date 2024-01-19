Feature('user');

Scenario('creation_de_compte', async ({I}) => {
  I.amOnPage("http://localhost:3000/");
  I.click('#yourUsername');
  I.click('.card-body');
  I.click('Créer un compte');
  I.click('/html/body/div/div/div/form/div[1]/input');
  I.fillField('/html/body/div/div/div/form/div[1]/input', 'testIt');
  I.click('/html/body/div/div/div/form/div[2]/input');
  I.fillField('/html/body/div/div/div/form/div[2]/input', 'testtest');
  I.click('/html/body/div/div/div/form/div[3]/input');
  I.fillField('/html/body/div/div/div/form/div[3]/input', 'testtest@gmail.com');
  I.click('.btn');
});