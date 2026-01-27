const loginWith = async (page, username, password) => {

    await page.getByLabel('username').fill(username)
    await page.getByLabel('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()

}
const createBlog = async (page, data) => {

    await page.getByRole('button', { name: 'create new blog' }).click()
    await page.getByLabel('Title').fill(data.title)
    await page.getByLabel('Author').fill(data.author)
    await page.getByLabel('Url').fill(data.url)
    await page.getByRole('button', { name: 'create' }).click()  
    await page.getByRole('button', { name: 'close' }).click()
    page.locator('.blog').getByText(data.title).waitFor()

    
}
export { loginWith, createBlog }