const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')
const { before } = require('node:test')

describe('Blog app', () => {

    beforeEach(async ({ page, request }) => {

        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'Rain Veskus',
                username: 'rainv',
                password: 'salasana'
            }
        })
        await request.post('/api/users', {
            data: {
                name: 'Test User',
                username: 'test',
                password: 'password'
            }
        })

        await page.goto('/')
})

  test('Login form is shown', async ({ page }) => {


    // Checks if frontpage is loaded
    await expect(page.getByText('BlogApp')).toBeVisible()

    //Checks if loginForm is loaded
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
    
  })

  describe('Login', () => {

    test('succeeds with correct credentials', async ({ page }) => {

        await loginWith(page, 'rainv', 'salasana')
        
        await expect(page.getByText('Logged in as Rain Veskus')).toBeVisible()

    })

    test('fails with wrong credentials and show right notification', async ({ page }) => {

        await loginWith(page, 'rainv', 'wrong')

        const notificationDiv = page.locator('.notification')

        await expect(notificationDiv).toContainText('wrong username or password')
        await expect(notificationDiv).toHaveCSS('border-style', 'solid')
        await expect(notificationDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
        await expect(page.getByText('Logged in as Rain Veskus')).not.toBeVisible()
    })
    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'rainv', 'salasana')

        })

        test('a new blog can be created', async ({ page }) => {

            await createBlog(page, {title:'Testing E2E is fun', author: 'E2E Tester', url: 'www.e2e.test'})

/*             await page.getByRole('button', { name: 'create new blog' }).click()

            await page.getByLabel('Title').fill('Testing E2E is fun')
            await page.getByLabel('Author').fill('E2E Tester')
            await page.getByLabel('Url').fill('www.e2e.test')

            await page.getByRole('button', { name: 'create' }).click() */

            const notificationDiv = page.locator('.notification')

            await expect(notificationDiv).toContainText('a new blog Testing E2E is fun added ')
            await expect(notificationDiv).toHaveCSS('border-style', 'solid')
            await expect(notificationDiv).toHaveCSS('color', 'rgb(0, 128, 0)')

            const blogDiv = page.locator('.blog')

            await expect(blogDiv).toContainText('Testing E2E is fun')

        })
        describe('and a blog is exists,', () => {
            beforeEach(async ({ page }) => {
                await createBlog(page, {title:'Testing E2E is fun', author: 'E2E Tester', url: 'www.e2e.test'})      
            })

            test('it can be "liked"', async ({ page }) => {

                await page.getByRole('button', { name: 'view'}).click()

                await expect(page.getByText('Likes')).toBeVisible()

                const likeSpan = page.locator('.likes')
                await expect(likeSpan).toContainText('0')

                await page.getByRole('button', { name: 'like' }).click()
                await expect(likeSpan).toContainText('1')

            })
            test('it can be removed', async ({ page }) => {

                await page.getByRole('button', { name: 'view'}).click()

                page.on('dialog', async dialog => {

                    expect(dialog.type()).toContain('confirm')

                    expect(dialog.message()).toContain('Remove blog Testing E2E is fun')

                    await dialog.accept()
                })

                await page.getByRole('button', { name: 'remove' }).click()

                await expect(page.getByText('Testing E2E is fun')).not.toBeVisible()

            })
            test('it doesnt show "remove" button for everyone', async ({ page }) => {

                await page.getByRole('button', { name: 'logout' }).click()
                await expect(page.getByText('Log in to application')).toBeVisible()
                await expect(page.getByLabel('username')).toBeVisible()
                await expect(page.getByLabel('password')).toBeVisible()

                await loginWith(page, 'test', 'password')

                await page.getByRole('button', { name: 'view'}).click()

                await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()

            })
            
        })
        describe('and multiple blogs exists', () => {
            beforeEach(async ({ page }) => {
                await createBlog(page, {title:'Testing E2E is fun', author: 'E2E Tester', url: 'www.e2e.test', likes: 5})
                await createBlog(page, {title:'Another one for E2E', author: 'E2E Tester', url: 'www.e2e.test', likes: 12})
                await createBlog(page, {title:'Third one for E2E', author: 'E2E Tester', url: 'www.e2e.test', likes: 8})

            })

            test('all blogs are rendeder', async ({ page }) => {

                await expect(page.locator('.blog').getByText('Testing E2E is fun')).toBeVisible()
                await expect(page.locator('.blog').getByText('Another one for E2E')).toBeVisible()
                await expect(page.locator('.blog').getByText('Third one for E2E')).toBeVisible()

            })
            test('all blogs are rendered in right order (highest likes first)', async ({ page }) => {

                // lets add 3 likes to 3rd blog

                await page.getByRole('button', { name: 'view' }).nth(2).click()

                await page.getByRole('button', { name: 'like' }).click()
                await page.getByRole('button', { name: 'like' }).click()
                await page.getByRole('button', { name: 'like' }).click()

                await expect(page.locator('.likes')).toContainText('Likes: 3')

                // lets add 5 likes to 2nd blog

                await page.getByRole('button', { name: 'hide' }).click()

                await page.getByRole('button', { name: 'view' }).nth(1).click()

                await page.getByRole('button', { name: 'like' }).click()
                await page.getByRole('button', { name: 'like' }).click()
                await page.getByRole('button', { name: 'like' }).click()
                await page.getByRole('button', { name: 'like' }).click()
                await page.getByRole('button', { name: 'like' }).click()
                

                await expect(page.locator('.likes')).toContainText('Likes: 5')

                await page.getByRole('button', { name: 'hide' }).click()

                // refresh page
                await page.goto('/')

                await page.getByRole('button', { name: 'view' }).first().click()
                await expect(page.locator('.likes')).toContainText('Likes: 5')
                await page.getByRole('button', { name: 'hide' }).click()

                await page.getByRole('button', { name: 'view' }).nth(1).click()
                await expect(page.locator('.likes')).toContainText('Likes: 3')
                await page.getByRole('button', { name: 'hide' }).click()

                await page.getByRole('button', { name: 'view' }).nth(2).click()
                await expect(page.locator('.likes')).toContainText('Likes: 0')
                await page.getByRole('button', { name: 'hide' }).click()

            })
        })     
    })
  })
})