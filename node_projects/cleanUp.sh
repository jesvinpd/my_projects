# Define color codes
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color (reset)

echo -e "${YELLOW}🧹 Cleaning all node_modules and package-lock.json files recursively...${NC}"
# First remove package-lock.json files, 
find . -mindepth 2 -not -path "*/node_modules/*" -name "package-lock.json" -type f -delete
# Then remove node_modules directories
find . -mindepth 2 -not -path "*/node_modules/*" -name "node_modules" -type d -exec rm -rf {} +
echo -e "${GREEN}✅ Cleanup completed.${NC}"

#excluding node_modules directories