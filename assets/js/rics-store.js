// assets/js/rics-store.js
class RICSStore {
    constructor() {
        this.data = {
            items: [],
            events: [],
            traits: [],
            races: []
        };
        this.filteredData = {
            items: [],
            events: [],
            traits: [],
            races: []
        };
        this.currentSort = {};
        this.init();
    }

    async init() {
        await this.loadAllData();
        this.renderAllTabs();
        this.setupEventListeners();
    }

    async loadAllData() {
        try {
            // Load items
            const itemsResponse = await fetch('data/StoreItems.json');
            const itemsData = await itemsResponse.json();
            
            // The items are now under "items" property in the JSON
            if (itemsData.items) {
                this.data.items = this.processItemsData(itemsData.items);
            } else {
                // Fallback for old structure
                this.data.items = this.processItemsData(itemsData);
            }
            
            this.filteredData.items = [...this.data.items];

            // Load other data types (you can add these later)
            // const eventsResponse = await fetch('data/StoreEvents.json');
            // const eventsData = await eventsResponse.json();
            // this.data.events = this.processEventsData(eventsData);
            // this.filteredData.events = [...this.data.events];

            console.log('Data loaded:', {
                items: this.data.items.length,
                events: this.data.events.length,
                traits: this.data.traits.length,
                races: this.data.races.length
            });

        } catch (error) {
            console.error('Error loading data:', error);
            this.loadSampleData();
        }
    }

    processItemsData(itemsObject) {
        return Object.entries(itemsObject)
            .map(([key, itemData]) => {
                // Use the structure from your sample
                return {
                    defName: itemData.DefName || key,
                    name: itemData.CustomName || itemData.DefName || key,
                    price: itemData.BasePrice || 0,
                    category: itemData.Category || 'Misc',
                    quantityLimit: itemData.HasQuantityLimit ? (itemData.QuantityLimit || 0) : 'Unlimited',
                    limitMode: itemData.LimitMode,
                    mod: itemData.Mod || 'Unknown',
                    isUsable: itemData.IsUsable || false,
                    isEquippable: itemData.IsEquippable || false,
                    isWearable: itemData.IsWearable || false,
                    enabled: itemData.Enabled !== false
                };
            })
            .filter(item => {
                // Only include if enabled AND at least one usage type is true
                return (item.enabled || item.isUsable || item.isEquippable || item.isWearable);
            })
            .filter(item => item.price > 0); // Only items with price > 0
    }

    processEventsData(data) {
        // Adjust this based on your actual Events JSON structure
        return Object.entries(data)
            .map(([defname, eventData]) => ({
                defname,
                name: eventData.CustomName || defname,
                price: eventData.BasePrice || 0,
                karmaType: eventData.KarmaType || 'None',
                enabled: eventData.Enabled !== false
            }))
            .filter(event => event.enabled && event.price > 0);
    }

    processTraitsData(data) {
        // Adjust this based on your actual Traits JSON structure
        return Object.entries(data)
            .map(([defname, traitData]) => ({
                defname,
                name: traitData.CustomName || defname,
                addPrice: traitData.AddPrice || 0,
                removePrice: traitData.RemovePrice || 0,
                description: traitData.Description || '',
                enabled: traitData.Enabled !== false
            }))
            .filter(trait => trait.enabled && (trait.addPrice > 0 || trait.removePrice > 0));
    }

    processRacesData(data) {
        // Adjust this based on your actual Races JSON structure
        return Object.entries(data)
            .map(([defname, raceData]) => ({
                defname,
                name: raceData.CustomName || defname,
                price: raceData.BasePrice || 0,
                karmaType: raceData.KarmaType || 'None',
                enabled: raceData.Enabled !== false
            }))
            .filter(race => race.enabled && race.price > 0);
    }

    renderAllTabs() {
        this.renderItems();
        this.renderEvents();
        this.renderTraits();
        this.renderRaces();
    }

    renderItems() {
        const tbody = document.getElementById('items-tbody');
        const items = this.filteredData.items;
    
        if (items.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 40px;">No items found</td></tr>';
            return;
        }
    
        tbody.innerHTML = items.map(item => `
            <tr>
                <td>
                    <div class="item-name">${this.escapeHtml(item.name)}</div>
                    <span class="metadata">
                        ${this.escapeHtml(item.defName)}
                        <br>From ${this.escapeHtml(item.mod)}
                        ${this.getUsageTypes(item)}
                    </span>
                </td>
                <td class="no-wrap">
                    <strong>${item.price}</strong>
                    <span class="mobile-priority primary"></span>
                </td>
                <td>${this.escapeHtml(item.category)}</td>
                <td class="no-wrap">${item.quantityLimit}</td>
                <td>${item.limitMode || 'N/A'}</td>
            </tr>
        `).join('');
    }
    
    getUsageTypes(item) {
        const types = [];
        if (item.isUsable) types.push('Usable');
        if (item.isEquippable) types.push('Equippable');
        if (item.isWearable) types.push('Wearable');
        
        return types.length > 0 ? `<br><span class="usage">Usage: ${types.join(', ')}</span>` : '';
    }

    renderEvents() {
        const tbody = document.getElementById('events-tbody');
        const events = this.filteredData.events;

        if (events.length === 0) {
            tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; padding: 40px;">No events found</td></tr>';
            return;
        }

        tbody.innerHTML = events.map(event => `
            <tr>
                <td>${this.escapeHtml(event.name)}</td>
                <td>${event.price}</td>
                <td>${this.escapeHtml(event.karmaType)}</td>
            </tr>
        `).join('');
    }

    renderTraits() {
        const tbody = document.getElementById('traits-tbody');
        const traits = this.filteredData.traits;

        if (traits.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 40px;">No traits found</td></tr>';
            return;
        }

        tbody.innerHTML = traits.map(trait => `
            <tr>
                <td>${this.escapeHtml(trait.name)}</td>
                <td>${trait.addPrice > 0 ? trait.addPrice : 'N/A'}</td>
                <td>${trait.removePrice > 0 ? trait.removePrice : 'N/A'}</td>
                <td>${this.escapeHtml(trait.description)}</td>
            </tr>
        `).join('');
    }

    renderRaces() {
        const tbody = document.getElementById('races-tbody');
        const races = this.filteredData.races;

        if (races.length === 0) {
            tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; padding: 40px;">No races found</td></tr>';
            return;
        }

        tbody.innerHTML = races.map(race => `
            <tr>
                <td>${this.escapeHtml(race.name)}</td>
                <td>
                    ${race.price}
                    ${race.karmaType ? `<span class="metadata">Karma: ${this.escapeHtml(race.karmaType)}</span>` : ''}
                </td>
                <td>${this.escapeHtml(race.karmaType)}</td>
            </tr>
        `).join('');
    }

    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', () => {
                this.switchTab(button.dataset.tab);
            });
        });

        // Search functionality for each tab
        this.setupSearch('items');
        this.setupSearch('events');
        this.setupSearch('traits');
        this.setupSearch('races');

        // Sort functionality
        this.setupSorting();
    }

    setupSearch(tabName) {
        const searchInput = document.getElementById(`${tabName}-search`);
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterTab(tabName, e.target.value);
            });
        }
    }

    filterTab(tabName, searchTerm) {
        const term = searchTerm.toLowerCase().trim();
        const allData = this.data[tabName];

        if (term === '') {
            this.filteredData[tabName] = [...allData];
        } else {
            this.filteredData[tabName] = allData.filter(item =>
                Object.values(item).some(value =>
                    value && value.toString().toLowerCase().includes(term)
                )
            );
        }

        this[`render${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`]();
    }

    setupSorting() {
        // Add sorting to all sortable headers
        document.querySelectorAll('th[data-sort]').forEach(header => {
            header.addEventListener('click', () => {
                const tab = header.closest('.tab-pane').id;
                this.sortTab(tab, header.dataset.sort);
            });
        });
    }

    sortTab(tabName, field) {
        if (!this.currentSort[tabName]) {
            this.currentSort[tabName] = { field, direction: 'asc' };
        } else if (this.currentSort[tabName].field === field) {
            this.currentSort[tabName].direction = this.currentSort[tabName].direction === 'asc' ? 'desc' : 'asc';
        } else {
            this.currentSort[tabName] = { field, direction: 'asc' };
        }

        this.filteredData[tabName].sort((a, b) => {
            let aValue = a[field];
            let bValue = b[field];

            // Handle "Unlimited" quantity limit for sorting
            if (field === 'quantityLimit') {
                aValue = aValue === 'Unlimited' ? Infinity : aValue;
                bValue = bValue === 'Unlimited' ? Infinity : bValue;
            }

            if (typeof aValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            if (aValue < bValue) return this.currentSort[tabName].direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return this.currentSort[tabName].direction === 'asc' ? 1 : -1;
            return 0;
        });

        this[`render${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`]();
    }

    switchTab(tabName) {
        // Update active tab button
        document.querySelectorAll('.tab-button').forEach(button => {
            button.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update active tab content
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        document.getElementById(tabName).classList.add('active');
    }

    escapeHtml(unsafe) {
        if (typeof unsafe !== 'string') return unsafe;
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    loadSampleData() {
        // Fallback sample data
        console.log('Loading sample data...');
        this.data.items = [
            {
                defName: "TextBook",
                name: "Textbook",
                price: 267,
                category: "Books",
                quantityLimit: 5,
                limitMode: "OneStack",
                mod: "Core",
                isUsable: false,
                isEquippable: false,
                isWearable: false,
                enabled: true
            },
            {
                defName: "Schematic",
                name: "Schematic", 
                price: 250,
                category: "Books",
                quantityLimit: 5,
                limitMode: "OneStack",
                mod: "Core",
                isUsable: false,
                isEquippable: false,
                isWearable: false,
                enabled: true
            }
        ];
        this.filteredData.items = [...this.data.items];
        this.renderItems();
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    new RICSStore();
});
