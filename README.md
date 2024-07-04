# Deal App

## Overview

Deal App is an offline-capable form application that allows users to input image, text, and voice data. The application is built using Angular and leverages NGRX for state management and local storage to enable offline functionality. When the user goes back online, the application automatically synchronizes the locally saved data with the server.

## Features

### User Interface:

User-friendly form interface with fields for image upload, text input, and voice recording.

### Image Input:

Allows users to upload images from their device's gallery or capture images using the device's camera, with validation for file type, size, and dimensions.

### Text Input:

Provides a text input field with validation for character limits and required fields.

### Voice Input:

Enables users to record voice inputs using the device's microphone with audio recording controls (start, stop, playback) and visual feedback during recording.

### Offline Support:

Enables users to fill out the form and save their inputs locally even without an internet connection. Automatically synchronizes the locally saved form submissions with the server once the internet connection is restored.

### Lazy Loading:

Implements lazy loading to optimize the form's performance.

### Server-Side Rendering (SSR):

Ensures the page can be crawled using SSR for better SEO and initial load performance.

## Technologies Used

### Angular:

Framework for building the application.

### NGRX:

State management library for handling application state.

### @ngx-pwa/local-storage:

Library for managing local storage.

### DomSanitizer:

Service for sanitizing URLs.

### Service Workers:

For enabling offline capabilities.

### SSR:

For server-side rendering using Angular Universal.

### HTML/CSS/SCSS:

For creating and styling the user interface.

## Installation

Clone the Repository:

```
git clone <repository_url>
cd dealapp13
```

Install Dependencies::

```
npm install
```

Build the Application:

```
npm run build:ssr
```

Serve the Application:

```
npm run serve:ssr
```

Start Development Server:

```
ng serve
```

## Run PWA

1-Build

```
ng build --prod
```

2-Change path

```
<urPath>/dealapp13/dist/dealapp13/browser
```

3-Run

```
http-server -o
```
