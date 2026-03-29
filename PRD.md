# Product Requirement Document (PRD) - Impex

## 1. Executive Summary
**Impex** is a cross-border e-commerce platform designed to bridge the gap between Indian sellers and international buyers. The platform focuses on reducing the high costs of international shipping through **Collaborative Buying** (Group Orders) and simplifying the complexities of export/import through an **AI Assistant**.

## 2. Target Audience
*   **International Buyers:** Individuals or small businesses looking for authentic Indian products (textiles, handicrafts, spices, etc.) who want to save on shipping.
*   **Indian Sellers:** Manufacturers, wholesalers, and exporters seeking a global customer base without the overhead of traditional export marketing.
*   **Admins:** Platform moderators ensuring quality, verifying sellers, and managing disputes.

## 3. Core Features & Requirements

### 3.1 User Authentication & Profiles
*   **Requirement:** Secure login/signup for Buyers and Sellers.
*   **Details:** Profile management including business details for sellers and shipping addresses for buyers.
*   **Tech:** Firebase Authentication.

### 3.2 Buyer-Seller Marketplace
*   **Requirement:** A searchable catalog of products.
*   **Details:** Sellers can list products with high-quality images, descriptions, pricing, and specific export constraints (e.g., minimum export quantity).
*   **Tech:** Firestore for product data, Firebase Storage for images.

### 3.3 Collaborative Buying (Group Orders)
*   **Requirement:** Ability for buyers in the same country to combine orders.
*   **Details:** 
    *   Buyers can create or join a "Purchase Group" for a specific region/country.
    *   Orders within a group are consolidated into a single shipment to a central hub in the destination country, significantly reducing individual shipping fees.
    *   Real-time tracking of group progress (e.g., "3 more buyers needed to unlock bulk shipping").

### 3.4 AI Assistance Chat
*   **Requirement:** An intelligent assistant powered by Gemini.
*   **Details:**
    *   **For Buyers:** Advice on product quality, quantity recommendations, and import duty estimations.
    *   **For Sellers:** Guidance on HS codes, packaging standards, and required export documentation.
*   **Tech:** @google/genai (Gemini 3.1 Flash).

### 3.5 Order Management & Tracking
*   **Requirement:** End-to-end visibility of the purchase lifecycle.
*   **Details:** Status updates from "Order Placed" to "Consolidated" to "Shipped" and "Delivered".

## 4. Functional Modules
*   **Buyer Module:** Discovery, Group Joining, Personal Dashboard.
*   **Seller Module:** Inventory Management, Export Readiness Checklist.
*   **Collaboration Module:** Logistics logic for grouping orders by destination country.
*   **AI Module:** Context-aware chat interface.

## 5. Success Metrics
*   Average shipping cost reduction per buyer.
*   Number of successful export transactions for small-scale Indian sellers.
*   User retention rate for repeat group purchases.
