# Tiffin Club Food Delivery App Storyboard

## Project Goal

Build a customer-facing Indian food ordering prototype for a software engineering laboratory. The prototype demonstrates the core path from browsing local restaurants to confirming an order, with menu and cart totals displayed in Indian rupees (INR).

## Customer Flow

1. The customer opens the menu and sees nearby restaurants, popular dishes, prices, ratings, and estimated delivery times.
2. The customer selects a restaurant or searches for a dish, cuisine, or restaurant name.
3. The customer narrows the menu by food category and can sort dishes by price.
4. The customer adds dishes to the bag, adjusts quantities, removes items, and checks the automatically updated total.
5. The customer chooses Place order. If not logged in, the app validates an email and password before continuing.
6. The app creates a basic order ID, displays the item count and total, then clears the bag.

## Problem / Task Progress

| No. | Problem / Task | Description | Status |
| --- | --- | --- | --- |
| 1 | Customer login validation | Validate the email address and minimum password length before checkout. | Completed |
| 2 | Restaurant and food listing | Browse Dilli Darbar, Madras Meals, and Bombay Tiffin with Indian menu items. | Completed |
| 3 | Food search and filtering | Search dishes or restaurants, filter by category, and sort by price. | Completed |
| 4 | Cart management | Add, remove, and change item quantities; calculate the cart total in INR. | Completed |
| 5 | Order placement | Generate an order ID, show the order total, and clear the cart after confirmation. | Completed |
| 6 | Responsive dashboard | Adapt restaurant selection, menu, and cart for desktop and mobile screens. | Completed |
| 7 | Payment | Add a real payment provider and payment status handling. | Completed |
| 8 | Delivery tracking | Show delivery progress and estimated arrival updates. | In Progress |
| 9 | Order history | Store and display a customer's previous orders. | In Progress |
| 10 | Backend services | Add server-side accounts, menu data, and persistent order storage. | In Progress |

## Implemented Modules

- Customer login validation (prototype-only; no backend authentication)
- Restaurant and food menu listing
- Food and restaurant search
- Category filtering and price sorting
- Cart quantity, removal, and total management
- Basic order placement and order ID generation
- Browser storage for the current bag and prototype login

## Future Laboratory Modules

- Payment processing
- Delivery tracking
- Order history
- Persistent accounts and server-side order storage

## Technology

HTML, CSS, and vanilla JavaScript. Open `app/index.html` in a browser to run the prototype. See `README.md` for setup and prototype limitations.