# Product Catalogue

A mobile Product Catalogue application built with React Native, Expo, and TypeScript. The application uses the DummyJSON API to retrieve product data and allows users to browse products, search for products, view product details and reviews, and load additional products while scrolling.

## Features

Product list with title, thumbnail, category, rating, and price

Pagination / infinite scrolling using skip and limit

Product detail screen

Product description, price, rating, discount, stock, weight, and availability

Product reviews

Debounced product search using the DummyJSON search endpoint

Loading state

Error state with retry button

Empty state

Pull-to-refresh

Navigation between product list and product detail screens

Reusable UI components

## Tech Stack

React Native

Expo

TypeScript

Axios

React Navigation

DummyJSON API

## API

The application uses the free DummyJSON API.

GET /products?limit=20&skip=0
GET /products/{id}
GET /products/search?q={query}

For pagination, limit controls the number of products retrieved in each request and skip determines where the next batch starts.

For search, I chose the DummyJSON search endpoint rather than filtering only the products already loaded on the device. A short debounce is used before sending the search request.

## Clean Architecture

I chose a Clean Architecture-inspired approach to separate responsibilities and keep the project organized and maintainable.

### Domain Layer

The domain layer contains the core data structures:

ProductEntity.ts defines the product structure and types.

ReviewEntity.ts defines the product review structure and types.

These entities provide TypeScript type safety throughout the application.

### Application Layer

The application layer contains the product-related use cases:

getProducts.ts retrieves products and supports pagination.

getProductById.ts retrieves a selected product by ID.

searchProducts.ts retrieves products matching a search query.

### Infrastructure Layer

The infrastructure layer contains the technical configuration used to communicate with the external API.

axiosClient.ts creates a reusable Axios instance with the DummyJSON base URL and request timeout.

### Presentation Layer

The presentation layer contains the screens and reusable components that the user interacts with.

## Screens:

ProductListScreen.tsx

ProductDetailScreen.tsx

Components:

ProductCard.tsx

SearchBar.tsx

ScreenHeader.tsx

This layer displays product data and handles user interactions such as navigation, search, pagination, loading, retry, and pull-to-refresh.

## Architectural Decision

I chose this structure to separate UI concerns, application operations, domain data structures, and API configuration. Each layer has a clear responsibility, which makes the project easier to understand and maintain.

## Project Structure

src/
├── application/
│   └── usecases/
│       ├── getProductById.ts
│       ├── getProducts.ts
│       └── searchProducts.ts
├── domain/
│   └── entities/
│       ├── ProductEntity.ts
│       └── ReviewEntity.ts
├── infrastructure/
│   └── api/
│       └── axiosClient.ts
├── presentation/
│   ├── components/
│   │   ├── ProductCard.tsx
│   │   ├── ScreenHeader.tsx
│   │   └── SearchBar.tsx
│   └── screens/
│       ├── ProductDetailScreen.tsx
│       └── ProductListScreen.tsx
└── navigation/
    └── AppNavigator.tsx

## How to Run the App

### Prerequisites

Make sure Node.js and npm are installed. For Android, use an Android emulator or connected Android device.

**1. Install dependencies**

npm install

**2. Start Expo**

npx expo start

## Known Limitations / TODOs

The following bonus items are not currently implemented:

- Image loading placeholder / image error handling

- Unit tests

- Further UI/UX improvements could be added with additional development time.

## AI Assistance

AI was used to assist in creating the initial UI mockup for the application.

The application implementation, project structure, architectural decisions, and code were developed and reviewed by me, and I am able to explain the code used in this project.
