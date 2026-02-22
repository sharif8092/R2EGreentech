#!/bin/bash

# COMPREHENSIVE API CURL TEST SUITE
# Tests all GET, POST, and CRUD operations

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
BASE_URL="http://localhost" # Change this to your server URL
RESULTS_FILE="api-test-results.json"

# Counter for tests
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Initialize results
echo "{" > "$RESULTS_FILE"
echo "  \"timestamp\": \"$(date)\", " >> "$RESULTS_FILE"
echo "  \"baseUrl\": \"$BASE_URL\", " >> "$RESULTS_FILE"
echo "  \"tests\": [" >> "$RESULTS_FILE"

# Function to run a test
run_test() {
    local test_name=$1
    local method=$2
    local endpoint=$3
    local data=$4
    local expected_status=$5
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    
    # Run curl
    if [ -z "$data" ]; then
        response=$(curl -s -w "\n%{http_code}" -X "$method" "$BASE_URL$endpoint")
    else
        response=$(curl -s -w "\n%{http_code}" -X "$method" \
            -H "Content-Type: application/json" \
            -d "$data" \
            "$BASE_URL$endpoint")
    fi
    
    # Extract response code and body
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    # Check if test passed
    if [[ "$http_code" == "$expected_status" ]]; then
        echo -e "${GREEN}✓ PASS${NC}: $test_name (HTTP $http_code)"
        PASSED_TESTS=$((PASSED_TESTS + 1))
        status="PASS"
    else
        echo -e "${RED}✗ FAIL${NC}: $test_name (Expected $expected_status, got $http_code)"
        FAILED_TESTS=$((FAILED_TESTS + 1))
        status="FAIL"
    fi
    
    # Log to results file
    if [ "$TOTAL_TESTS" -gt 1 ]; then
        echo "," >> "$RESULTS_FILE"
    fi
    
    cat >> "$RESULTS_FILE" << EOF
    {
      "name": "$test_name",
      "method": "$method",
      "endpoint": "$endpoint",
      "status": "$status",
      "httpCode": $http_code,
      "response": $(echo "$body" | jq -R . 2>/dev/null || echo "\"$body\"")
    }
EOF
}

# ============================================
# TEST 1: PHP API TEST FILE
# ============================================

echo -e "\n${YELLOW}Testing Main API Test Suite${NC}"
run_test "API Test Suite" "GET" "/backend/test-api.php" "" "200"

# ============================================
# TEST 2: SERVICES ENDPOINTS
# ============================================

echo -e "\n${YELLOW}Testing Services Endpoints${NC}"
run_test "Get All Services" "GET" "/backend/services/get-services.php" "" "200"

# For CREATE test with form data (multipart/form-data not supported easily in bash curl)
echo -e "\n${YELLOW}Note: Services CREATE/UPDATE/DELETE require form data or file uploads${NC}"
echo -e "${YELLOW}You may test these manually or use Postman collection provided${NC}"

# ============================================
# TEST 3: PRODUCTS ENDPOINTS
# ============================================

echo -e "\n${YELLOW}Testing Products Endpoints${NC}"
run_test "Get All Products" "GET" "/backend/products/read.php" "" "200"

# ============================================
# TEST 4: LEADS ENDPOINTS
# ============================================

echo -e "\n${YELLOW}Testing Leads Endpoints${NC}"
run_test "Get All Leads" "GET" "/backend/leads/get-leads.php" "" "200"

# Test Add Lead with JSON data
lead_data='{"name":"John Doe","company":"Test Corp","email":"john@test.com","category":"Enterprise","message":"Test lead from API"}'
run_test "Add Lead (POST)" "POST" "/backend/leads/add-lead.php" "$lead_data" "200"

# ============================================
# TEST 5: SETTINGS ENDPOINTS
// ============================================

echo -e "\n${YELLOW}Testing Settings Endpoints${NC}"
run_test "Get Settings" "GET" "/backend/settings/get-settings.php" "" "200"

# ============================================
# TEST 6: DOCUMENTS ENDPOINTS
// ============================================

echo -e "\n${YELLOW}Testing Documents Endpoints${NC}"
run_test "Get Documents" "GET" "/backend/documents/get-profile.php" "" "200"

# ============================================
// TEST 7: INDUSTRIES ENDPOINTS
// ============================================

echo -e "\n${YELLOW}Testing Industries Endpoints${NC}"
run_test "Get Industries Images" "GET" "/backend/industries/get-images.php" "" "200"

# ============================================
// TEST 8: PROMOTERS ENDPOINTS
// ============================================

echo -e "\n${YELLOW}Testing Promoters Endpoints${NC}"
run_test "Get Promoters" "GET" "/backend/promoters/get-promoters.php" "" "200"

# ============================================
// TEST 9: DATABASE TEST
// ============================================

echo -e "\n${YELLOW}Testing Database Connection${NC}"
run_test "Database Test" "GET" "/backend/test.php" "" "200"

# Close results file
echo "" >> "$RESULTS_FILE"
echo "  ]" >> "$RESULTS_FILE"
echo "}" >> "$RESULTS_FILE"

# Print summary
echo -e "\n${YELLOW}========== TEST SUMMARY ==========${NC}"
echo -e "Total Tests: $TOTAL_TESTS"
echo -e "${GREEN}Passed: $PASSED_TESTS${NC}"
echo -e "${RED}Failed: $FAILED_TESTS${NC}"
echo -e "\nDetailed results saved to: $RESULTS_FILE"

# Exit code based on failures
if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "\n${GREEN}All tests passed!${NC}"
    exit 0
else
    echo -e "\n${RED}Some tests failed!${NC}"
    exit 1
fi
