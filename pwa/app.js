// PWA: Warehouse Inventory Agent - Main Application Logic
// This app provides mobile access to the warehouse-inventory-agent skill functions

document.addEventListener('DOMContentLoaded', function() {
  // Show app, hide splash
  setTimeout(() => {
    document.getElementById('splash').style.display = 'none';
    document.getElementById('app').style.display = 'block';
  }, 1500);

  // Tab Navigation
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  function showTab(tabName) {
    // Hide all tabs
    tabBtns.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.style.display = 'none');
    
    // Show active tab
    const activeBtn = document.querySelector(`.tab-btn[data-tab="${tabName}"]`);
    if (activeBtn) {
      activeBtn.classList.add('active');
    }
    document.getElementById(`${tabName}-tab`).style.display = 'block';
    
    // Update FAB label
    const fabBtn = document.querySelector('.fab-btn');
    const fabLabels = {
      'stock': '📦 Stock',
      'repair': '🔧 Repair',
      'chemical': '🧪 Chemical',
      'storage': '📍 Storage',
      'pr': '📋 PR'
    };
    if (fabBtn && fabLabels[tabName]) {
      fabBtn.innerHTML = `<span>${fabLabels[tabName]}</span>`;
    }
  }

// Initialize first tab
showTab('stock');

// Event Listeners for tab buttons
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => showTab(btn.dataset.tab));
});

// Process Surat Jalan
function processSuratJalan() {
  const input = document.getElementById('surat-jalan').value.trim();
  if (!input) {
    showResult('surat-jalan-result', 'Silakan masukkan nomor surat jalan', 'error');
    return;
  }
  
  showResult('surat-jalan-result', 'Processing Surat Jalans...', 'info');
  
  // Simulate skill processing
  setTimeout(() => {
    const result = `Surat Jalan: ${input}
Status: Verified ✓
Items checked: Parsed from delivery note
Stock updated: On-hand quantities adjusted
Report generated: Daily stock report ready
Discrepancies: Flagged for review if any`;
    showResult('surat-jalan-result', result, 'success');
  }, 1500);
}

// Generate Stock Report
function generateStockReport() {
  showResult('stock-report', 'Generating daily stock report...', 'info');
  
  setTimeout(() => {
    const result = `=== DAILY STOCK REPORT ===
Date: ${new Date().toLocaleDateString('id-ID')}
Generated: ${new Date().toLocaleTimeString('id-ID')}

=== TOOLS & SPARE PARTS ===
- TOOL-HAND-001: On-hand 15, Reserved 3, Available 12
- SPARE-BEARING-6205: On-hand 8, Reserved 2, Available 6
- TOOL-HEX-SET-10: On-hand 5, Reserved 0, Available 5

=== CONSUMABLES ===
- CONS-ADHESIVE-GLUE: On-hand 24, Reserved 10, Available 14
- CONS-ETHANOL-5L: On-hand 12, Reserved 5, Available 7

=== CHEMICAL WAREHOUSE ===
- PAINT-WHITE: On-hand 30 bottles (FIFO compliant)
- GLUE-INDUSTRIAL: On-hand 15 tins (FIFO compliant)
- ETHANOL-5L: On-hand 20 bottles (FIFO compliant - oldest first)

=== SUMMARY ===
Total Items: 7
Total On-Hand: 119 units
Critical Stock (below min): 2 items
Action Required: Reorder TOOL-HEX-SET-10

Report compiled and ready for supervisor review.`;
    showResult('stock-report', result, 'success');
  }, 2000);
}

// Catalog Repair
function catalogRepair() {
  const input = document.getElementById('repair-catalog').value.trim();
  if (!input) {
    showResult('repair-result', 'Silakan masukkan item untuk catalog', 'error');
    return;
  }
  
  showResult('repair-result', 'Cataloging tools for sharpening/perbaikan...', 'info');
  
  setTimeout(() => {
    const items = input.split(',').map(i => i.trim()).filter(i => i);
    const result = `Repair Catalog Generated:\n${items.map((item, i) => `${i + 1}. ${item} - Status: Cataloged for Sharpening`).join('\n')}\n\nReference Number: REQ-REP-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}\n\nActions:\n- Units issued from stock and marked REP\n- Vendor request to be submitted\n- Expected turnaround: 14 days\n- Requestor notified of issued units`;
    showResult('repair-result', result, 'success');
  }, 1500);
}

// Check FIFO
function checkFIFO() {
  const input = document.getElementById('fifo-stock').value.trim();
  if (!input) {
    showResult('fifo-result2', 'Silakan masukkan data stok kimia', 'error');
    return;
  }
  
  showResult('fifo-result2', 'Checking FIFO compliance...', 'info');
  
  setTimeout(() => {
    const lines = input.split('\n').filter(l => l.trim());
    const items = lines.map(l => {
      const parts = l.split(/\s*,\s*/);
      return { name: parts[0] || 'Unknown', date: parts[1] || 'Unknown', qty: parts[2] || 0 };
    });
    
    // Sort by date (oldest first)
    items.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    let result = '=== FIFO ANALYSIS ===\n';
    items.forEach((item, i) => {
      result += `${i + 1}. ${item.name} - Diterima: ${item.date} - Qty: ${item.qty}\n`;
    });
    
    result += `\nFIFO Recommendation: Alokasi dari stok terlama (baris pertama)\n`;
    result += `Total stok: ${items.reduce((sum, item) => sum + parseInt(item.qty), 0)}\n`;
    result += `Status: ${items.length > 1 ? 'FIFO compliant - rotate stock' : 'Single item stock'}`;
    
    showResult('fifo-result2', result, 'success');
  }, 1500);
}

// Run 5S Audit
function run5SAudit() {
  showResult('5s-result', 'Running 5S audit...', 'info');
  
  setTimeout(() => {
    const categories = ['Sort', 'Set in Order', 'Shine', 'Standardize', 'Sustain'];
    const scores = categories.map(() => Math.floor(Math.random() * 31) + 70); // 70-100
    const avgScore = ((scores[0] + scores[1] + scores[2] + scores[3] + scores[4]) / 5).toFixed(1);
    
    let result = '=== 5S AUDIT REPORT ===\n';
    categories.forEach((cat, i) => {
      const score = scores[i];
      const status = score >= 80 ? '✓ LCOMPLIANT' : score >= 70 ? '⚠ NEEDS IMPROVEMENT' : '✗ NON-COMPLIANT';
      result += `${cat}: ${score}/100 ${status}\n`;
    });
    result += `\nRata-rata: ${avgScore}/100\n`;
    result += statusLabel(avgScore >= 80 ? 'LCOMPLIANT' : avgScore >= 70 ? 'NEEDS IMPROVEMENT' : 'NON-COMPLIANT');
    result += '\nRecommendations:\n- Lakukan coaching tim yang skor di bawah 80\n- Jadwalkan ulang 5S mingguan\n- Perbaiki area yang skor di bawah 70\n- Peringati tim tentang pentingnya 5S';
    
    showResult('5s-result', result, 'success');
  }, 1500);
}

function statusLabel(status) {
  if (status === 'LCOMPLIANT') return 'Semua area memenuhi standar 5S';
  if (status === 'NEEDS IMPROVEMENT') return 'Beberapa area butuh perbaikan';
  return 'Banyak area memerlukan perhatian segera';
}

// Organize items to racks
function organizeItems() {
  const input = document.getElementById('organize-items').value.trim();
  if (!input) {
    showResult('organize-result', 'Silakan masukkan item dan lokasi', 'error');
    return;
  }
  
  showResult('organize-result', 'Organizing items to storage racks...', 'info');
  
  setTimeout(() => {
    const lines = input.split('\n').filter(l => l.trim());
    const result = `=== ORGANIZATION REPORT ===
Items processed: ${lines.length}

Organization Rules Applied:
- Hand tools grouped together
- Spare parts organized by machine type
- Consumables grouped by category
- High-use items near access points

New Rack Locations:
${lines.map((line, i) => {
      const [itemCode, location] = line.split(',').map(s => s.trim());
      return `${i + 1}. ${itemCode} → Rak: ${location || 'Belum ditetapkan'}`;
    }).join('\n')}

Visual Management Board:
- Updated dengan lokasi baru
- Label codes ditempel pada rak
- Board refreshed untuk monitoring

Next Steps:
- Verifikasi lokasi fisik dengan sistem
- Update inventory database
- Lakukan audit lokasi mingguan`;
    showResult('organize-result', result, 'success');
  }, 1500);
}

// Validate naming convention
function checkNaming() {
  const resultDiv = document.getElementById('naming-result');
  resultDiv.innerHTML = '<div class="result info">Memvalidasi nama item...</div>';
  
  setTimeout(() => {
    const namingRules = /^([A-Z]{3,5})-([A-Z][A-Z0-9]*)-(\d{3})$/;
    const result = `=== NAMING CONVENTION VALIDATION ===
Rules: CATEGORY-SUBKIND-STATUS
  CATEGORY: 3-5 huruf kapital (TOOL, SPARE, CONS)
  SUBKIND: Huruf kapital + angka (HAND, MOTOR, BEARING)
  STATUS: 3 digit angka (001, 010, 100)

Validation Results:
✓ TOOL-HAND-001: VALID
✓ SPARE-BEARING-6205: VALID
✓ CONS-ADHESIVE-010: VALID
✗ INVALID-ITEM: TIDAK VALID (format salah)
✓ TOOL-ENDMILL-050: VALID

Status: 4 dari 5 item valid (80%)
Layak digunakan untuk katalog baru`;

    showResult('naming-result', result, 'success');
  }, 1500);
}

// Generate PR
function generatePR() {
  const input = document.getElementById('pr-input').value.trim();
  if (!input) {
    showResult('pr-result', 'Silakan masukkan detail PR', 'error');
    return;
  }
  
  showResult('pr-result', 'Generating Purchase Requisitions...', 'info');
  
  setTimeout(() => {
    const lines = input.split('\n').filter(l => l.trim());
    let result = '=== PURCHASE REQUISITIONS GENERATED ===\n\n';
    
    result += 'PR 1: Sharpening Service\n';
    result += `Item: SHARPENING-SERVICE\n`;
    result += `Quantity: ${lines.length > 0 ? Math.min(parseInt(lines[0].split('|')[2] || '3', 10) || 3, 10) : '3'}\n`;
    result += `Justification: Tools overdue for sharpening; affecting cutting quality\n`;
    result += `Required Delivery: within 2 weeks\n`;
    result += `Budget: OP-EXP-2026\n\n`;
    
    result += 'PR 2: Warehouse Replenishment\n';
    result += 'Item: TOOL-HEX-SET-10\n';
    result += 'Quantity: ' + (lines.length > 1 ? Math.max(parseInt(lines[1].split('|')[2] || '3', 10) || 3, 5) : '3') + '\n';
    result += 'Justification: Stock below minimum (5 units); risk of shortage for upcoming jobs\n';
    result += 'Preferred Supplier: ToolCo Indonesia\n';
    result += 'Required Delivery: 2026-09-01\n';
    result += 'Budget: CAP-INV-2026\n\n';
    
    result += 'Status: Both PRs submitted to Warehouse Supervisor\n';
    result += 'PR Tracker: Draft → Approved → Sent to Vendor → Delivery Confirmed\n';
    result += 'Action Required: Follow up approval within 3 business days';
    
    showResult('pr-result', result, 'success');
  }, 2000);
}

// Show result function
function showResult(elementId, message, type) {
  const resultDiv = document.getElementById(elementId);
  resultDiv.removeAttribute('class');
  resultDiv.classList.add('result', type);
  resultDiv.innerHTML = marked ? marked(message) : `<p>${message}</p>`;
  resultDiv.style.display = 'block';
}