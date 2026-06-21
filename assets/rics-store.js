/* Reset and base styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    background: linear-gradient(135deg, #f5f7fa 0%, #e9ecf5 100%);
}
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

/* Header - Bluish gradient */
header {
    text-align: center;
    margin-bottom: 30px;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}
header h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Tabs */
.tabs {
    display: flex;
    background: white;
    border-radius: 8px 8px 0 0;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.tab-button {
    padding: 15px 30px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;
    border-bottom: 3px solid transparent;
}
.tab-button:hover {
    background: #f0f3ff;
}
.tab-button.active {
    background: white;
    border-bottom: 3px solid #667eea;
    color: #667eea;
    font-weight: bold;
}

/* Tab content */
.tab-content {
    background: white;
    border-radius: 0 0 8px 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    min-height: 400px;
}
.tab-pane {
    display: none;
    padding: 20px;
}
.tab-pane.active {
    display: block;
}

/* Search box */
.search-box {
    margin-bottom: 20px;
}
.search-input {
    width: 100%;
    padding: 12px;
    border: 2px solid #e9ecef;
    border-radius: 6px;
    font-size: 1rem;
    transition: all 0.3s ease;
}
.search-input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Table styles */
.table-container {
    overflow-x: auto;
}
.items-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}
.items-table th {
    background: linear-gradient(135deg, #f0f3ff 0%, #f5f0ff 100%);
    padding: 15px;
    text-align: left;
    font-weight: 600;
    color: #495057;
    border-bottom: 2px solid #764ba2;
    cursor: pointer;
    user-select: none;
    position: relative;
}
.items-table th:hover {
    background: linear-gradient(135deg, #e8ecff 0%, #ede5ff 100%);
}
.items-table th::after {
    content: '↕';
    position: absolute;
    right: 10px;
    opacity: 0.3;
    color: #667eea;
}
.items-table th.sort-asc::after {
    content: '↑';
    opacity: 1;
    color: #764ba2;
}
.items-table th.sort-desc::after {
    content: '↓';
    opacity: 1;
    color: #764ba2;
}
.items-table td {
    padding: 15px;
    border-bottom: 1px solid #dee2e6;
    vertical-align: top;
}
.items-table tbody tr:hover {
    background: linear-gradient(135deg, #f8faff 0%, #faf5ff 100%);
}

/* Metadata styles */
.metadata {
    font-size: 0.85rem;
    color: #6c757d;
    display: block;
    margin-top: 5px;
}

/* ==================== RACES COLLAPSIBLE GROUPS ==================== */
.races-container {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.race-group {
    border: 1px solid #c3c8e0;
    border-radius: 10px;
    background: white;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.08);
    transition: all 0.2s ease;
}

.race-group:hover {
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
}

.race-group summary {
    padding: 16px 20px;
    cursor: pointer;
    background: linear-gradient(135deg, #f0f3ff 0%, #f5f0ff 100%);
    font-weight: 600;
    color: #334155;
    list-style: none;
    position: relative;
    border-bottom: 1px solid #e2e8f0;
}

.race-group summary::-webkit-details-marker {
    display: none;
}

.race-group summary::after {
    content: '▼';
    position: absolute;
    right: 20px;
    color: #667eea;
    transition: transform 0.25s ease;
    font-size: 1.1em;
}

.race-group[open] summary::after {
    transform: rotate(180deg);
}

.race-group summary strong {
    color: #1e40af;
}

.xenotype-list {
    padding: 8px 0;
    background: #fafcff;
}

.xenotype-item {
    padding: 12px 20px;
    border-bottom: 1px solid #e6e9f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background 0.2s;
}

.xenotype-item:hover {
    background: #f0f4ff;
}

.xenotype-item:last-child {
    border-bottom: none;
}

.xenotype-item strong {
    color: #1e3a8a;
}

.xenotype-item .defname {
    font-size: 0.82rem;
    color: #64748b;
    margin-left: 8px;
}

/* Responsive design */
@media (max-width: 768px) {
    .container {
        padding: 10px;
    }
   
    .tab-button {
        padding: 12px 15px;
        font-size: 0.9rem;
    }
   
    .items-table th,
    .items-table td {
        padding: 10px 8px;
        font-size: 0.9rem;
    }
   
    header h1 {
        font-size: 2rem;
    }

    .race-group summary {
        padding: 14px 16px;
    }
}

/* Additional accents */
::selection {
    background: #667eea;
    color: white;
}

.steam-link {
    color: #1b88e9;
    text-decoration: underline;
}
.steam-link:hover {
    color: #66c0f4;
}

/* Custom scrollbar */
::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}

::-webkit-scrollbar-track {
    background: #f0f3ff;
}

::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #5a6fd9, #6a4295);
}