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
3. Logging all creates, updates and deletes
4. Activity page
5. Sending confirmation email with token & verify-email link
6. Sending password reset OTP
7. Password reset page
8. Modal close on outclick
9. Account View (Transfer format), if fromAccount show as expense, if toAccount show as income.. meta: from -> to
10. Improve about-page or readme.me
11. Breadcrumbs last link (in Tabs.svelte + +layout.svelte pages)
12. Improve form error messages with dates and numbers
13. Safari Search fix
14. Test Completely

## Roadmap

1. Add chart in stats
3. Make responsive ui
4. Dark mode
5. PWA
6. Add filters to search
7. Throw on 4xx and 5xx status codes. So handleError can catch and log.