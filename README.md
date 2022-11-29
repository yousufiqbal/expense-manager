# Expense Manager

Expense Manager app can be used to manage day-to-day expenses.

## Features

1. Manage incomes & expenses
2. Multiple accounts
3. Transfer funds between accounts
4. Multiple users (login and registration)
5. All data on cloud
6. View stats of selected or all accounts
7. Complete activity logging
8. Platform agnostic. Use on any device including PC, laptop, mobiles, etc
9. Free for everyone (or maybe?)
10. Fully refrential data, accounts, categories, transactions, etc.

## Why?

I built this piece of code just to showcase some coding knowledge.

## Tech Stack

Following technologies were used to build this app:

1. SvelteKit
2. MySQL
3. Many other libraries (See package.json for more details)

## TODO

1. Account balance in account view
2. Sending password reset OTP & Password reset page
3. Account View (Transfer format), if fromAccount show as expense, if toAccount show as income..
4. Breadcrumbs last link (in Tabs.svelte + +layout.svelte pages)
5. Safari Search fix
6. Test Completely
7. Comment code
8. Improve readme.md
9. Verification email SMTP timeout issue
10. Add urlName to incomeCategories (for searching others in income-categories, it is needed)

## Roadmap

1. Add chart in stats
2. Make responsive ui
3. Dark mode
4. PWA
5. Add filters to search
6. Throw on 4xx and 5xx status codes. So handleError can catch and log.