# Impex Database Schema (Firestore)

## Collections

### 1. `users`
*   `uid`: string (Primary Key)
*   `email`: string
*   `displayName`: string
*   `role`: enum ("buyer", "seller", "admin")
*   `country`: string
*   `address`: map { street, city, state, zip, country }
*   `createdAt`: timestamp
*   `isVerified`: boolean (for sellers)

### 2. `products`
*   `id`: string (Primary Key)
*   `sellerId`: string (FK to users.uid)
*   `name`: string
*   `description`: string
*   `price`: number
*   `category`: string
*   `images`: array of strings (URLs)
*   `stock`: number
*   `minExportQty`: number
*   `weight`: number (kg)
*   `dimensions`: map { l, w, h }
*   `hsCode`: string (optional)

### 3. `groups`
*   `id`: string (Primary Key)
*   `destinationCountry`: string
*   `status`: enum ("open", "locked", "shipped", "completed")
*   `currentWeight`: number
*   `targetWeight`: number (for shipping optimization)
*   `members`: array of strings (uids)
*   `createdAt`: timestamp
*   `estimatedShippingDate`: timestamp

### 4. `orders`
*   `id`: string (Primary Key)
*   `buyerId`: string (FK to users.uid)
*   `productId`: string (FK to products.id)
*   `groupId`: string (FK to groups.id, optional)
*   `quantity`: number
*   `totalPrice`: number
*   `status`: enum ("pending", "paid", "consolidated", "shipped", "delivered")
*   `shippingAddress`: map (snapshot of buyer address)
*   `createdAt`: timestamp

### 5. `chats`
*   `id`: string (Primary Key)
*   `participants`: array of strings (uids)
*   `lastMessage`: string
*   `updatedAt`: timestamp

### 6. `messages` (Sub-collection of chats)
*   `id`: string (Primary Key)
*   `senderId`: string
*   `text`: string
*   `timestamp`: timestamp
*   `type`: enum ("text", "system", "ai")
