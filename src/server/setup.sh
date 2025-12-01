#!/bin/bash

# Portfolio Backend Setup Script
# Author: Sandeep Rammilan Gupta

echo "🚀 Portfolio Backend Setup"
echo "=========================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js is installed
echo "📦 Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
else
    echo -e "${GREEN}✅ Node.js is installed ($(node -v))${NC}"
fi

# Check if MySQL is installed
echo "🗄️  Checking MySQL installation..."
if ! command -v mysql &> /dev/null; then
    echo -e "${RED}❌ MySQL is not installed. Please install MySQL first.${NC}"
    exit 1
else
    echo -e "${GREEN}✅ MySQL is installed${NC}"
fi

# Install npm dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Dependencies installed successfully${NC}"
else
    echo -e "${RED}❌ Failed to install dependencies${NC}"
    exit 1
fi

# Create .env file if it doesn't exist
echo ""
if [ ! -f .env ]; then
    echo "⚙️  Creating .env file..."
    cp ../.env.example .env
    echo -e "${GREEN}✅ .env file created${NC}"
    echo -e "${YELLOW}⚠️  Please update the .env file with your MySQL credentials${NC}"
else
    echo -e "${YELLOW}⚠️  .env file already exists${NC}"
fi

# Database setup
echo ""
echo "🗄️  Database Setup"
echo "=================="
read -p "Do you want to create the database now? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    read -p "Enter MySQL username (default: root): " DB_USER
    DB_USER=${DB_USER:-root}
    
    read -sp "Enter MySQL password: " DB_PASS
    echo ""
    
    echo "Creating database and tables..."
    mysql -u "$DB_USER" -p"$DB_PASS" < database/schema.sql
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Database created successfully${NC}"
    else
        echo -e "${RED}❌ Failed to create database${NC}"
        echo "Please run manually: mysql -u $DB_USER -p < database/schema.sql"
    fi
fi

# Summary
echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "Next steps:"
echo "1. Update the .env file with your configuration"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Test the API at http://localhost:5000/api/health"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
