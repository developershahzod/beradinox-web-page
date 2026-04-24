#!/bin/bash

echo "🚀 Deploying Beradinox Admin Fix to Production Server..."

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running on server
if [ ! -f "docker-compose.yml" ]; then
    echo -e "${RED}❌ Error: docker-compose.yml not found. Run this script from project root.${NC}"
    exit 1
fi

echo -e "${YELLOW}📋 This script will:${NC}"
echo "   1. Stop admin container"
echo "   2. Rebuild admin with fixed API URL configuration"
echo "   3. Restart admin container"
echo "   4. Verify admin is running"
echo ""

read -p "Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment cancelled."
    exit 1
fi

echo ""
echo -e "${YELLOW}🛑 Stopping admin container...${NC}"
docker-compose stop admin

echo ""
echo -e "${YELLOW}🗑️  Removing old admin container...${NC}"
docker-compose rm -f admin

echo ""
echo -e "${YELLOW}🔨 Rebuilding admin with fixed configuration...${NC}"
docker-compose build --no-cache admin

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed! Check errors above.${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}🚀 Starting admin container...${NC}"
docker-compose up -d admin

echo ""
echo -e "${YELLOW}⏳ Waiting for admin to start...${NC}"
sleep 5

echo ""
echo -e "${YELLOW}📊 Checking container status...${NC}"
docker-compose ps admin

echo ""
echo -e "${YELLOW}📝 Recent admin logs:${NC}"
docker-compose logs --tail=20 admin

echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo -e "${GREEN}🌐 Admin panel should now be accessible at:${NC}"
echo "   http://your-server-ip:3001/admin"
echo "   or"
echo "   http://beradinox.uz:3001/admin"
echo ""
echo -e "${YELLOW}🔍 To verify the fix worked:${NC}"
echo "   1. Open admin panel in browser"
echo "   2. Login with your credentials"
echo "   3. Try to edit a category or product"
echo "   4. Check browser console (F12) for any API errors"
echo ""
echo -e "${YELLOW}📊 View live logs:${NC}"
echo "   docker-compose logs -f admin"
echo ""
echo -e "${YELLOW}🔄 If issues persist:${NC}"
echo "   docker-compose logs admin"
echo "   docker-compose restart admin"
echo ""
