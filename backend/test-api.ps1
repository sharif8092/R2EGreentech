# COMPREHENSIVE API PowerShell TEST SUITE
# Tests all GET, POST, and CRUD operations
# Run: powershell -ExecutionPolicy Bypass -File test-api.ps1

param(
    [string]$BaseUrl = "http://localhost"
)

# Initialize results
$testResults = @{
    timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    baseUrl = $BaseUrl
    tests = @()
    summary = @{
        total = 0
        passed = 0
        failed = 0
    }
}

# Function to run a test
function Run-Test {
    param(
        [string]$TestName,
        [string]$Method,
        [string]$Endpoint,
        [object]$Body = $null,
        [int]$ExpectedStatus = 200
    )
    
    $testResults.summary.total++
    
    try {
        $url = "$BaseUrl$Endpoint"
        
        $params = @{
            Uri = $url
            Method = $Method
            ContentType = "application/json"
            ErrorAction = "SilentlyContinue"
        }
        
        if ($Body) {
            $params.Body = $Body | ConvertTo-Json
        }
        
        $response = Invoke-WebRequest @params
        $httpCode = $response.StatusCode
        $responseBody = $response.Content
        
        if ($httpCode -eq $ExpectedStatus) {
            Write-Host "`u{2713} PASS: $TestName (HTTP $httpCode)" -ForegroundColor Green
            $status = "PASS"
            $testResults.summary.passed++
        } else {
            Write-Host "`u{2717} FAIL: $TestName (Expected $ExpectedStatus, got $httpCode)" -ForegroundColor Red
            $status = "FAIL"
            $testResults.summary.failed++
        }
    }
    catch {
        Write-Host "`u{2717} FAIL: $TestName - $($_.Exception.Message)" -ForegroundColor Red
        $status = "FAIL"
        $testResults.summary.failed++
        $httpCode = "ERROR"
        $responseBody = $_.Exception.Message
    }
    
    $testResults.tests += @{
        name = $TestName
        method = $Method
        endpoint = $Endpoint
        status = $status
        httpCode = $httpCode
        response = $responseBody
    }
}

# ============================================
# TEST 1: PHP API TEST FILE
# ============================================

Write-Host "`n=== Testing Main API Test Suite ===" -ForegroundColor Yellow
Run-Test -TestName "API Test Suite" -Method "GET" -Endpoint "/backend/test-api.php" -ExpectedStatus 200

# ============================================
# TEST 2: DATABASE CONNECTION
# ============================================

Write-Host "`n=== Testing Database Connection ===" -ForegroundColor Yellow
Run-Test -TestName "Database Test" -Method "GET" -Endpoint "/backend/test.php" -ExpectedStatus 200

# ============================================
# TEST 3: SERVICES ENDPOINTS
# ============================================

Write-Host "`n=== Testing Services Endpoints ===" -ForegroundColor Yellow
Run-Test -TestName "Get All Services" -Method "GET" -Endpoint "/backend/services/get-services.php" -ExpectedStatus 200

# ============================================
# TEST 4: PRODUCTS ENDPOINTS
# ============================================

Write-Host "`n=== Testing Products Endpoints ===" -ForegroundColor Yellow
Run-Test -TestName "Get All Products" -Method "GET" -Endpoint "/backend/products/read.php" -ExpectedStatus 200

# ============================================
# TEST 5: LEADS ENDPOINTS
# ============================================

Write-Host "`n=== Testing Leads Endpoints ===" -ForegroundColor Yellow
Run-Test -TestName "Get All Leads" -Method "GET" -Endpoint "/backend/leads/get-leads.php" -ExpectedStatus 200

$leadData = @{
    name = "John Doe"
    company = "Test Corp"
    email = "john-$(Get-Date -Format 'yyyyMMddHHmmss')@test.com"
    category = "Enterprise"
    message = "Test lead from PowerShell API"
}
Run-Test -TestName "Add Lead (POST)" -Method "POST" -Endpoint "/backend/leads/add-lead.php" -Body $leadData -ExpectedStatus 200

# ============================================
# TEST 6: SETTINGS ENDPOINTS
# ============================================

Write-Host "`n=== Testing Settings Endpoints ===" -ForegroundColor Yellow
Run-Test -TestName "Get Settings" -Method "GET" -Endpoint "/backend/settings/get-settings.php" -ExpectedStatus 200

# ============================================
# TEST 7: DOCUMENTS ENDPOINTS
# ============================================

Write-Host "`n=== Testing Documents Endpoints ===" -ForegroundColor Yellow
Run-Test -TestName "Get Documents" -Method "GET" -Endpoint "/backend/documents/get-profile.php" -ExpectedStatus 200

# ============================================
# TEST 8: INDUSTRIES ENDPOINTS
# ============================================

Write-Host "`n=== Testing Industries Endpoints ===" -ForegroundColor Yellow
Run-Test -TestName "Get Industries Images" -Method "GET" -Endpoint "/backend/industries/get-images.php" -ExpectedStatus 200

# ============================================
# TEST 9: PROMOTERS ENDPOINTS
# ============================================

Write-Host "`n=== Testing Promoters Endpoints ===" -ForegroundColor Yellow
Run-Test -TestName "Get Promoters" -Method "GET" -Endpoint "/backend/promoters/get-promoters.php" -ExpectedStatus 200

# ============================================
# PRINT SUMMARY
# ============================================

Write-Host "`n========== TEST SUMMARY ==========" -ForegroundColor Yellow
Write-Host "Total Tests: $($testResults.summary.total)"
Write-Host "Passed: $($testResults.summary.passed)" -ForegroundColor Green
Write-Host "Failed: $($testResults.summary.failed)" -ForegroundColor Red

# Save results to file
$resultsPath = "api-test-results-ps.json"
$testResults | ConvertTo-Json -Depth 10 | Out-File -FilePath $resultsPath -Encoding UTF8
Write-Host "`nDetailed results saved to: $resultsPath"

# Exit code
if ($testResults.summary.failed -eq 0) {
    Write-Host "`nAll tests passed!" -ForegroundColor Green
    exit 0
} else {
    Write-Host "`nSome tests failed!" -ForegroundColor Red
    exit 1
}
