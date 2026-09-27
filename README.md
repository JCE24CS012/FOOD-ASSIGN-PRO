# Tiffin Club Food Delivery App

A browser-based food delivery prototype developed as a Software Engineering laboratory project. Customers can browse Indian restaurants and dishes, manage a cart, log in with prototype validation, and place an order.

## Features

- Prototype customer login validation
- Restaurant and Indian food menu browsing
- Search by dish or restaurant
- Food category filters and price sorting
- Add, remove, and adjust cart quantities
- Automatic INR totals with a Rs. 39 delivery fee
- Basic order ID generation and order confirmation
- Responsive dashboard for desktop and mobile

## Run the App

No package installation or build step is required. Open `app/index.html` in a modern web browser.

The prototype login accepts any valid email address and a password with at least four characters. Authentication, menu data, and ordering are client-side demonstrations; there is no backend or real payment processing. The cart and prototype login are stored in browser local storage. Fonts and food photography load from Google Fonts and Unsplash when an internet connection is available.

## Project Files

```text
app/
  index.html    Application interface
  style.css     Responsive dashboard styling
  script.js     Menu, search, login, cart, and order logic
README.md       Project overview and run instructions
storyboard.md  Laboratory storyboard and task status
test-cases.md  Manual acceptance test cases
```

## Modules

1. Customer login validation
2. Restaurant and food menu
3. Food search and filtering
4. Cart management
5. Order management
6. Payment (planned)
7. Delivery tracking (planned)
8. Order history (planned)

## Testing

See [test-cases.md](test-cases.md) for manual test steps covering browsing, search, filtering, cart updates, login validation, order placement, INR totals, and responsive layout.