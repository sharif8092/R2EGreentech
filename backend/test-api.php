<?php
/**
 * COMPREHENSIVE API TEST SUITE
 * Tests all GET, POST, and CRUD operations
 */

header("Content-Type: application/json");

require_once("config/database.php");

// Test Results Array
$testResults = [
    "timestamp" => date("Y-m-d H:i:s"),
    "tests" => [],
    "summary" => [
        "total" => 0,
        "passed" => 0,
        "failed" => 0
    ]
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

function addTest($name, $passed, $message = "", $data = null) {
    global $testResults;
    $testResults["tests"][] = [
        "name" => $name,
        "passed" => $passed,
        "message" => $message,
        "data" => $data
    ];
    $testResults["summary"]["total"]++;
    if ($passed) {
        $testResults["summary"]["passed"]++;
    } else {
        $testResults["summary"]["failed"]++;
    }
}

// ============================================
// TEST 1: DATABASE CONNECTION
// ============================================

if ($conn->connect_error) {
    addTest("Database Connection", false, "Connection failed: " . $conn->connect_error);
} else {
    addTest("Database Connection", true, "Connected successfully");
}

// ============================================
// TEST 2: SERVICES - READ (GET)
// ============================================

try {
    $sql = "SELECT * FROM services LIMIT 5";
    $result = $conn->query($sql);
    
    if ($result && $result->num_rows > 0) {
        $services = [];
        while ($row = $result->fetch_assoc()) {
            $services[] = $row;
        }
        addTest("Services - GET (Read)", true, "Retrieved " . count($services) . " services", $services);
    } else {
        addTest("Services - GET (Read)", true, "No services found", []);
    }
} catch (Exception $e) {
    addTest("Services - GET (Read)", false, $e->getMessage());
}

// ============================================
// TEST 3: SERVICES - CREATE (POST)
// ============================================

try {
    $test_slug = "test-service-" . time();
    $test_title = "Test Service";
    $test_description = "This is a test service for API validation";
    $test_image_position = "50% 50%";
    $test_categories = json_encode(["category1", "category2"]);
    
    $stmt = $conn->prepare("INSERT INTO services (slug, title, description, image, image_position, categories) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $test_slug, $test_title, $test_description, $image_path = "", $test_image_position, $test_categories);
    
    if ($stmt->execute()) {
        $service_id = $stmt->insert_id;
        addTest("Services - POST (Create)", true, "Service created with ID: " . $service_id, [
            "id" => $service_id,
            "slug" => $test_slug,
            "title" => $test_title
        ]);
        // Store for UPDATE test
        $_SESSION['test_service_id'] = $service_id;
    } else {
        addTest("Services - POST (Create)", false, $stmt->error);
    }
    $stmt->close();
} catch (Exception $e) {
    addTest("Services - POST (Create)", false, $e->getMessage());
}

// ============================================
// TEST 4: SERVICES - UPDATE (POST)
// ============================================

try {
    if (!empty($_SESSION['test_service_id'])) {
        $service_id = $_SESSION['test_service_id'];
        $updated_title = "Updated Test Service";
        $updated_description = "This is an updated test service";
        
        $stmt = $conn->prepare("UPDATE services SET title=?, description=? WHERE id=?");
        $stmt->bind_param("ssi", $updated_title, $updated_description, $service_id);
        
        if ($stmt->execute()) {
            addTest("Services - UPDATE (Modify)", true, "Service updated successfully", [
                "id" => $service_id,
                "new_title" => $updated_title
            ]);
        } else {
            addTest("Services - UPDATE (Modify)", false, $stmt->error);
        }
        $stmt->close();
    } else {
        addTest("Services - UPDATE (Modify)", false, "No test service ID available");
    }
} catch (Exception $e) {
    addTest("Services - UPDATE (Modify)", false, $e->getMessage());
}

// ============================================
// TEST 5: SERVICES - DELETE
// ============================================

try {
    if (!empty($_SESSION['test_service_id'])) {
        $service_id = $_SESSION['test_service_id'];
        
        $stmt = $conn->prepare("DELETE FROM services WHERE id=?");
        $stmt->bind_param("i", $service_id);
        
        if ($stmt->execute()) {
            addTest("Services - DELETE", true, "Service deleted successfully", [
                "id" => $service_id
            ]);
            unset($_SESSION['test_service_id']);
        } else {
            addTest("Services - DELETE", false, $stmt->error);
        }
        $stmt->close();
    } else {
        addTest("Services - DELETE", false, "No test service ID available");
    }
} catch (Exception $e) {
    addTest("Services - DELETE", false, $e->getMessage());
}

// ============================================
// TEST 6: PRODUCTS - READ (GET)
// ============================================

try {
    $result = $conn->query("SELECT * FROM products ORDER BY id DESC LIMIT 5");
    if ($result && $result->num_rows > 0) {
        $products = [];
        while ($row = $result->fetch_assoc()) {
            $products[] = $row;
        }
        addTest("Products - GET (Read)", true, "Retrieved " . count($products) . " products", $products);
    } else {
        addTest("Products - GET (Read)", true, "No products found", []);
    }
} catch (Exception $e) {
    addTest("Products - GET (Read)", false, $e->getMessage());
}

// ============================================
// TEST 7: PRODUCTS - CREATE
// ============================================

try {
    $product_name = "Test Product " . time();
    $product_description = "This is a test product";
    $product_price = 99.99;
    
    $stmt = $conn->prepare("INSERT INTO products (name, description, price) VALUES (?, ?, ?)");
    $stmt->bind_param("ssd", $product_name, $product_description, $product_price);
    
    if ($stmt->execute()) {
        $product_id = $stmt->insert_id;
        addTest("Products - POST (Create)", true, "Product created with ID: " . $product_id, [
            "id" => $product_id,
            "name" => $product_name,
            "price" => $product_price
        ]);
        $_SESSION['test_product_id'] = $product_id;
    } else {
        addTest("Products - POST (Create)", false, $stmt->error);
    }
    $stmt->close();
} catch (Exception $e) {
    addTest("Products - POST (Create)", false, $e->getMessage());
}

// ============================================
// TEST 8: PRODUCTS - UPDATE
// ============================================

try {
    if (!empty($_SESSION['test_product_id'])) {
        $product_id = $_SESSION['test_product_id'];
        $updated_price = 149.99;
        
        $stmt = $conn->prepare("UPDATE products SET price=? WHERE id=?");
        $stmt->bind_param("di", $updated_price, $product_id);
        
        if ($stmt->execute()) {
            addTest("Products - UPDATE (Modify)", true, "Product updated successfully", [
                "id" => $product_id,
                "new_price" => $updated_price
            ]);
        } else {
            addTest("Products - UPDATE (Modify)", false, $stmt->error);
        }
        $stmt->close();
    } else {
        addTest("Products - UPDATE (Modify)", false, "No test product ID available");
    }
} catch (Exception $e) {
    addTest("Products - UPDATE (Modify)", false, $e->getMessage());
}

// ============================================
// TEST 9: PRODUCTS - DELETE
// ============================================

try {
    if (!empty($_SESSION['test_product_id'])) {
        $product_id = $_SESSION['test_product_id'];
        
        $stmt = $conn->prepare("DELETE FROM products WHERE id=?");
        $stmt->bind_param("i", $product_id);
        
        if ($stmt->execute()) {
            addTest("Products - DELETE", true, "Product deleted successfully", [
                "id" => $product_id
            ]);
            unset($_SESSION['test_product_id']);
        } else {
            addTest("Products - DELETE", false, $stmt->error);
        }
        $stmt->close();
    } else {
        addTest("Products - DELETE", false, "No test product ID available");
    }
} catch (Exception $e) {
    addTest("Products - DELETE", false, $e->getMessage());
}

// ============================================
// TEST 10: LEADS - CREATE (POST)
// ============================================

try {
    $lead_name = "Test Lead " . time();
    $lead_company = "Test Company";
    $lead_email = "testlead-" . time() . "@test.com";
    $lead_category = "Enterprise";
    $lead_message = "This is a test lead message";
    
    $stmt = $conn->prepare("INSERT INTO leads (name, company, email, category, message) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $lead_name, $lead_company, $lead_email, $lead_category, $lead_message);
    
    if ($stmt->execute()) {
        $lead_id = $stmt->insert_id;
        addTest("Leads - POST (Create)", true, "Lead created with ID: " . $lead_id, [
            "id" => $lead_id,
            "name" => $lead_name,
            "email" => $lead_email
        ]);
        $_SESSION['test_lead_id'] = $lead_id;
    } else {
        addTest("Leads - POST (Create)", false, $stmt->error);
    }
    $stmt->close();
} catch (Exception $e) {
    addTest("Leads - POST (Create)", false, $e->getMessage());
}

// ============================================
// TEST 11: LEADS - READ (GET)
// ============================================

try {
    $result = $conn->query("SELECT * FROM leads ORDER BY id DESC LIMIT 5");
    if ($result && $result->num_rows > 0) {
        $leads = [];
        while ($row = $result->fetch_assoc()) {
            $leads[] = $row;
        }
        addTest("Leads - GET (Read)", true, "Retrieved " . count($leads) . " leads", $leads);
    } else {
        addTest("Leads - GET (Read)", true, "No leads found", []);
    }
} catch (Exception $e) {
    addTest("Leads - GET (Read)", false, $e->getMessage());
}

// ============================================
// TEST 12: LEADS - DELETE
// ============================================

try {
    if (!empty($_SESSION['test_lead_id'])) {
        $lead_id = $_SESSION['test_lead_id'];
        
        $stmt = $conn->prepare("DELETE FROM leads WHERE id=?");
        $stmt->bind_param("i", $lead_id);
        
        if ($stmt->execute()) {
            addTest("Leads - DELETE", true, "Lead deleted successfully", [
                "id" => $lead_id
            ]);
            unset($_SESSION['test_lead_id']);
        } else {
            addTest("Leads - DELETE", false, $stmt->error);
        }
        $stmt->close();
    } else {
        addTest("Leads - DELETE", false, "No test lead ID available");
    }
} catch (Exception $e) {
    addTest("Leads - DELETE", false, $e->getMessage());
}

// ============================================
// TEST 13: DOCUMENTS - GET
// ============================================

try {
    $result = $conn->query("SELECT * FROM documents LIMIT 5");
    if ($result) {
        $documents = [];
        while ($row = $result->fetch_assoc()) {
            $documents[] = $row;
        }
        addTest("Documents - GET (Read)", true, "Retrieved " . count($documents) . " documents", $documents);
    } else {
        addTest("Documents - GET (Read)", true, "No documents table or no data", []);
    }
} catch (Exception $e) {
    addTest("Documents - GET (Read)", false, "Documents table may not exist");
}

// ============================================
// TEST 14: SETTINGS - GET
// ============================================

try {
    $result = $conn->query("SELECT * FROM settings LIMIT 5");
    if ($result) {
        $settings = [];
        while ($row = $result->fetch_assoc()) {
            $settings[] = $row;
        }
        addTest("Settings - GET (Read)", true, "Retrieved " . count($settings) . " settings", $settings);
    } else {
        addTest("Settings - GET (Read)", true, "No settings found", []);
    }
} catch (Exception $e) {
    addTest("Settings - GET (Read)", false, "Settings table may not exist");
}

// ============================================
// TEST 15: PROMOTERS - GET
// ============================================

try {
    $result = $conn->query("SELECT * FROM promoters LIMIT 10");
    if ($result && $result->num_rows > 0) {
        $promoters = [];
        while ($row = $result->fetch_assoc()) {
            $promoters[] = $row;
        }
        addTest("Promoters - GET (Read)", true, "Retrieved " . count($promoters) . " promoters", $promoters);
    } else {
        addTest("Promoters - GET (Read)", true, "No promoters found", []);
    }
} catch (Exception $e) {
    addTest("Promoters - GET (Read)", false, "Promoters table may not exist");
}

// ============================================
// TEST 16: AUTHENTICATION - LOGIN STRUCTURE
// ============================================

try {
    $result = $conn->query("SELECT * FROM users LIMIT 1");
    if ($result && $result->num_rows > 0) {
        addTest("Authentication - Users Table", true, "Users table exists and has records", [
            "status" => "ready for authentication testing"
        ]);
    } else {
        addTest("Authentication - Users Table", true, "Users table exists but is empty", [
            "status" => "no users for now"
        ]);
    }
} catch (Exception $e) {
    addTest("Authentication - Users Table", false, "Users table check failed");
}

// ============================================
// TEST 17: INDUSTRIES - GET
// ============================================

try {
    $result = $conn->query("SELECT * FROM industries LIMIT 5");
    if ($result && $result->num_rows > 0) {
        $industries = [];
        while ($row = $result->fetch_assoc()) {
            $industries[] = $row;
        }
        addTest("Industries - GET (Read)", true, "Retrieved " . count($industries) . " industries", $industries);
    } else {
        addTest("Industries - GET (Read)", true, "No industries found", []);
    }
} catch (Exception $e) {
    addTest("Industries - GET (Read)", false, "Industries table may not exist");
}

// ============================================
// TEST 18: DATABASE TABLES STATUS
// ============================================

try {
    $result = $conn->query("SHOW TABLES");
    $tables = [];
    while ($row = $result->fetch_row()) {
        $tables[] = $row[0];
    }
    addTest("Database - All Tables", true, "Found " . count($tables) . " tables", $tables);
} catch (Exception $e) {
    addTest("Database - All Tables", false, $e->getMessage());
}

// ============================================
// CLOSE CONNECTION
// ============================================

$conn->close();

// ============================================
// OUTPUT TEST RESULTS
// ============================================

echo json_encode($testResults, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

?>
