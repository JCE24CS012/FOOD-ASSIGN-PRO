# Food Delivery App Test Cases

| ID | Test case | Steps | Expected result |
| --- | --- | --- | --- |
| TC-01 | Initial menu loads | Open `app/index.html` | Dilli Darbar and its Indian dishes are displayed by default. |
| TC-02 | Select restaurant | Select Madras Meals | Madras Meals is selected and its South Indian dishes are shown. |
| TC-03 | Search by dish | Enter `biryani` in search | Matching biryani dishes are shown; unrelated dishes are hidden. |
| TC-04 | Search by restaurant | Enter `Bombay` in search | Dishes from Bombay Tiffin are shown. |
| TC-05 | Filter by category | Select a category chip | Only dishes in that category remain visible. |
| TC-06 | Sort by price | Choose low-to-high sorting | Visible dishes are ordered by ascending price. |
| TC-07 | Add to bag | Add a dish | Bag count, line item, Rs. 39 delivery fee, and INR total are updated. |
| TC-08 | Change quantity | Increase then decrease a line item's quantity | Quantity and total update; reducing to zero removes the line. |
| TC-09 | Remove item | Choose Remove on a bag line | The line disappears and totals recalculate. |
| TC-10 | Login required at checkout | Add a dish and choose Place order while logged out | Login dialog opens and the bag remains unchanged. |
| TC-11 | Reject invalid login | Submit an invalid email or a password shorter than four characters | A field-specific validation message appears; login does not complete. |
| TC-12 | Accept valid prototype login | Submit a valid email and password of at least four characters | Dialog closes and the logged-in state is shown. |
| TC-13 | Place order | Log in, add a dish, and choose Place order | Confirmation with a generated order ID and INR total appears; bag is cleared. |
| TC-14 | Persist bag between reloads | Add a dish and reload the page | The bag contents and count are restored. |
| TC-15 | Empty search results | Search for a term with no match | A no-results message appears without breaking the page. |
| TC-16 | Responsive layout | Open at desktop and narrow mobile widths | Menu and cart remain readable and usable without horizontal page overflow. |
| TC-17 | Indian menu and INR totals | Browse the menu and add a dish | Indian dishes are listed and item, delivery, cart, and confirmation totals display in Indian rupees. |

## Test Scope

These are manual acceptance cases for the static prototype. Authentication, payment, delivery tracking, and order persistence are not connected to a backend.