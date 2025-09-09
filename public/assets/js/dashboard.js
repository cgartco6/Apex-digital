// Dashboard functionality for Apex Digital
class ApexDashboard {
    constructor() {
        this.currentView = 'overview';
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.startAutoRefresh();
    }

    async loadData() {
        try {
            // Load dashboard data
            const [projects, revenue, aiStatus] = await Promise.all([
                this.fetchProjects(),
                this.fetchRevenue(),
                this.fetchAIStatus()
            ]);

            this.updateProjectsTable(projects);
            this.updateRevenueChart(revenue);
            this.updateAIStatus(aiStatus);
        } catch (error) {
            console.error('Failed to load dashboard data:', error);
        }
    }

    async fetchProjects() {
        // Simulate API call
        return [
            { id: 1, name: 'E-commerce Chatbot', client: 'Retail Solutions SA', status: 'completed', value: 24500 },
            { id: 2, name: 'Marketing Dashboard', client: 'Growth Marketing', status: 'in-progress', value: 32000 },
            { id: 3, name: 'AI Security System', client: 'SecureTech', status: 'in-progress', value: 45800 },
            { id: 4, name: 'WordPress Website', client: 'Local Restaurant', status: 'pending', value: 8900 },
            { id: 5, name: 'Social Media Bots', client: 'Digital Agency', status: 'completed', value: 18750 }
        ];
    }

    async fetchRevenue() {
        // Simulate API call
        return {
            total: 248560,
            monthly: [40000, 55000, 70000, 65000, 80000, 75000, 90000, 85000, 95000, 100000, 105000, 110000],
            forecast: [115000, 120000, 125000]
        };
    }

    async fetchAIStatus() {
        // Simulate API call
        return {
            chatbots: 'operational',
            contentGenerators: 'operational',
            socialPosters: 'operational',
            taskManagers: 'operational',
            lastUpdate: new Date().toISOString()
        };
    }

    updateProjectsTable(projects) {
        const tbody = document.querySelector('#projects-table tbody');
        if (!tbody) return;

        tbody.innerHTML = projects.map(project => `
            <tr>
                <td>${project.name}</td>
                <td>${project.client}</td>
                <td><span class="status-badge ${project.status}">${project.status.replace('-', ' ')}</span></td>
                <td>R ${project.value.toLocaleString()}</td>
            </tr>
        `).join('');
    }

    updateRevenueChart(revenueData) {
        const chart = document.querySelector('.revenue-chart');
        if (!chart) return;

        // Clear existing chart
        chart.innerHTML = '';

        // Find max value for scaling
        const maxValue = Math.max(...revenueData.monthly, ...revenueData.forecast);

        // Create bars for historical data
        revenueData.monthly.forEach(value => {
            const height = (value / maxValue) * 100;
            const bar = document.createElement('div');
            bar.className = 'chart-bar';
            bar.style.height = `${height}%`;
            chart.appendChild(bar);
        });

        // Create bars for forecast data
        revenueData.forecast.forEach(value => {
            const height = (value / maxValue) * 100;
            const bar = document.createElement('div');
            bar.className = 'chart-bar forecast';
            bar.style.height = `${height}%`;
            chart.appendChild(bar);
        });
    }

    updateAIStatus(status) {
        // Update AI status indicators
        Object.keys(status).forEach(key => {
            if (key !== 'lastUpdate') {
                const indicator = document.querySelector(`.${key}-status`);
                if (indicator) {
                    indicator.textContent = status[key];
                    indicator.className = `monitor-status status-${status[key]}`;
                }
            }
        });

        // Update last update time
        const lastUpdateElement = document.getElementById('last-update');
        if (lastUpdateElement) {
            lastUpdateElement.textContent = new Date(status.lastUpdate).toLocaleString();
        }
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.changeView(link.dataset.view);
            });
        });

        // Refresh button
        const refreshBtn = document.getElementById('refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.loadData();
            });
        }
    }

    changeView(view) {
        this.currentView = view;
        
        // Update active nav link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.toggle('active', link.dataset.view === view);
        });

        // Show/hide view sections
        document.querySelectorAll('.view-section').forEach(section => {
            section.style.display = section.id === `${view}-view` ? 'block' : 'none';
        });
    }

    startAutoRefresh() {
        // Refresh data every 5 minutes
        setInterval(() => {
            this.loadData();
        }, 300000);
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.apexDashboard = new ApexDashboard();
});
