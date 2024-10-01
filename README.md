# Scruter

Scruter is a local classifieds and community site designed to bring people together for buying, selling, and exchanging goods and services.

## Live Demo

Access the live version of Scruter at [scruter.vercel.app](https://scruter.vercel.app).

![Scruter Preview](/public/screenshot.webp)

## Features

- **Local Commerce**: Connect with your community to buy, sell, and find goods and services.
- **Classified Ads**: Post and browse ads for housing, food, and items for sale.
- **Community Connection**: Discover what your local area has to offer and interact with others nearby.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js**: Download and install from [nodejs.org](https://nodejs.org/).
- **MongoDB**: Set up an account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- **Cloudinary Account**: Sign up at [Cloudinary](https://cloudinary.com/).

## Installation

Follow these steps to set up Scruter locally:
1. **Clone the repository**

```bash
git clone https://github.com/swarooppatilx/scruter.git
cd scruter
```
2. **Install dependencies**

Run the following command to install the necessary packages:
```bash
npm install
```
3. **Create a .env file**

In the project root, create a .env file and add the following environment variables

```bash
DB_URL=your_mongo_db_url
SESSION_SECRET=your_session_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

4. **Running the Application**

To start the application, use one of the following commands:

**Start the server**
```bash
npm start
```

**Start the server with Nodemon**

Nodemon automatically restarts the server upon detecting file changes:

```bash
npm test
```

## Technologies Used

Scruter is built using the following technologies:

- **Node.js**
- **Express.js**
- **MongoDB**
- **EJS (Embedded JavaScript templating)**
- **Cloudinary (Image hosting)**
- **Bootstrap (CSS framework)**
    
## Contributing

Contributions are welcome! Follow these steps to contribute:

Fork the repository

Click the "Fork" button at the top-right corner of the repository page to create a personal copy.
    
**Clone your forked repository**

```bash
git clone https://github.com/your-username/scruter.git
cd scruter
```

**Create a new branch**
```bash
git checkout -b feature-branch-name
```

**Add your changes**
```bash
git add .
```

**Make your changes and commit them**
```bash
git commit -m 'Add some feature'
```

**Push to the branch**
```bash
git push origin feature-branch-name
```

**Submit a pull request**

Go to the original repository and click on the "Pull Request" button to submit your changes.

**License**

This project is licensed under the [GPL-3.0 License](/LICENSE).

