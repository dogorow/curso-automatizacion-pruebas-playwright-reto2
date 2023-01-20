import { test, expect } from '@playwright/test';
 
test.beforeEach(async ({ page }) => {
  await page.goto('/');
 });

test('Realizar una busqueda que no tenga resultados', async ({ page }) => {
  
  await page.getByRole('button', { name: 'Search' }).click();
  await page.locator('internal:attr=[placeholder="Search docs"i]').click();

  await page.getByPlaceholder('Search docs').fill('hascontent');

  await expect(page.locator('.DocSearch-Title')).toBeVisible();

  await expect(page.locator('.DocSearch-Title')).toHaveText('No results for "hascontent"');

})

test('Limpiar el input de busqueda', async ({ page }) => {

  await page.getByRole('button', { name: 'Search' }).click();

  const searchBox = page.locator('internal:attr=[placeholder="Search docs"i]');

  await searchBox.click();

  await searchBox.fill('somerandomtext');

  await expect(searchBox).toBeVisible();

  await expect(searchBox).toHaveAttribute('value','somerandomtext');


  await page.locator('.DocSearch-Reset').click();

  await expect(searchBox).toHaveAttribute('value', '');
});

test('Realizar una busqueda que genere al menos tenga un resultado', async ({ page }) => {
  await page.getByRole('button', { name: 'Search ' }).click();

  const searchBox = page.getByPlaceholder('Search docs');

  await searchBox.click();

  await page.getByPlaceholder('Search docs').fill('toHaveText​');

  const expectedSearch = page.getByRole('link', { name: 'toHaveText​ LocatorAssertions' });
  await expect(expectedSearch).toContainText('toHaveText​');

  // Verity there are sections in the results
  await page.locator('.DocSearch-Dropdown-Container section').nth(1).waitFor();
  const numberOfResults = await page.locator('.DocSearch-Dropdown-Container section').count();
  await expect(numberOfResults).toBeGreaterThan(0);

});