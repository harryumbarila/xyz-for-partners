document.addEventListener('DOMContentLoaded', function() {
    const mockData = {
        june: {
            roomsRevenue: 8000,
            otherRevenue: 1600,
            adr: 150.00,
            revpar: 120.00,
            occupancyRate: 75.00,
            bookingSource: {
                airbnb: 3200,
                xyzRentals: 2400,
                booking: 1600,
                others: 800,
            },
            dailyRevenue: Array.from({ length: 30 }, (_, i) => ({
                date: `${i + 1}-Jun-2024`,
                rooms: Math.floor(Math.random() * 20000),
                other: Math.floor(Math.random() * 5000),
            })),
            dailyMetrics: {
                adr: Array.from({ length: 30 }, () => Math.floor(Math.random() * 300)),
                occupancyRate: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100)),
                revpar: Array.from({ length: 30 }, () => Math.floor(Math.random() * 300)),
            },
            dailyOccupancy: {
                monday: 70.00,
                tuesday: 60.00,
                wednesday: 65.00,
                thursday: 80.00,
                friday: 85.00,
                saturday: 90.00,
                sunday: 75.00,
            }
        },
        july: {
            roomsRevenue: 10000,
            otherRevenue: 2000,
            adr: 173.48,
            revpar: 142.49,
            occupancyRate: 80.04,
            bookingSource: {
                airbnb: 4000,
                xyzRentals: 3000,
                booking: 2000,
                others: 1000,
            },
            dailyRevenue: Array.from({ length: 30 }, (_, i) => ({
                date: `${i + 1}-Jul-2024`,
                rooms: Math.floor(Math.random() * 20000),
                other: Math.floor(Math.random() * 5000),
            })),
            dailyMetrics: {
                adr: Array.from({ length: 30 }, () => Math.floor(Math.random() * 300)),
                occupancyRate: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100)),
                revpar: Array.from({ length: 30 }, () => Math.floor(Math.random() * 300)),
            },
            dailyOccupancy: {
                monday: 75.71,
                tuesday: 67.44,
                wednesday: 73.14,
                thursday: 97.88,
                friday: 98.94,
                saturday: 78.10,
                sunday: 75.06,
            }
        }
    };

    const elements = {
        roomsRevenue: document.getElementById('rooms-revenue'),
        otherRevenue: document.getElementById('other-revenue'),
        totalRevenue: document.getElementById('total-revenue'),
        adr: document.getElementById('adr'),
        revpar: document.getElementById('revpar'),
        occupancyRate: document.getElementById('occupancy-rate'),
        mondayRate: document.getElementById('monday-rate'),
        tuesdayRate: document.getElementById('tuesday-rate'),
        wednesdayRate: document.getElementById('wednesday-rate'),
        thursdayRate: document.getElementById('thursday-rate'),
        fridayRate: document.getElementById('friday-rate'),
        saturdayRate: document.getElementById('saturday-rate'),
        sundayRate: document.getElementById('sunday-rate')
    };

    const monthSelect = document.getElementById('month-select');

    let bookingSourceChart, dailyRevenueChart, adrChart, occupancyRateChart, revparChart;

    function updateCharts(month) {
        const data = mockData[month];
        const totalRevenue = data.roomsRevenue + data.otherRevenue;

        elements.roomsRevenue.innerText = `$${data.roomsRevenue.toLocaleString()}`;
        elements.otherRevenue.innerText = `$${data.otherRevenue.toLocaleString()}`;
        elements.totalRevenue.innerText = `$${totalRevenue.toLocaleString()}`;
        elements.adr.innerText = `$${data.adr.toFixed(2)}`;
        elements.revpar.innerText = `$${data.revpar.toFixed(2)}`;
        elements.occupancyRate.innerText = `${data.occupancyRate.toFixed(2)}%`;
        elements.mondayRate.innerText = `${data.dailyOccupancy.monday.toFixed(2)}%`;
        elements.tuesdayRate.innerText = `${data.dailyOccupancy.tuesday.toFixed(2)}%`;
        elements.wednesdayRate.innerText = `${data.dailyOccupancy.wednesday.toFixed(2)}%`;
        elements.thursdayRate.innerText = `${data.dailyOccupancy.thursday.toFixed(2)}%`;
        elements.fridayRate.innerText = `${data.dailyOccupancy.friday.toFixed(2)}%`;
        elements.saturdayRate.innerText = `${data.dailyOccupancy.saturday.toFixed(2)}%`;
        elements.sundayRate.innerText = `${data.dailyOccupancy.sunday.toFixed(2)}%`;

        if (bookingSourceChart) bookingSourceChart.destroy();
        if (dailyRevenueChart) dailyRevenueChart.destroy();
        if (adrChart) adrChart.destroy();
        if (occupancyRateChart) occupancyRateChart.destroy();
        if (revparChart) revparChart.destroy();

        // Booking source chart
        const bookingSourceCtx = document.getElementById('bookingSourceChart').getContext('2d');
        bookingSourceChart = new Chart(bookingSourceCtx, {
            type: 'doughnut',
            data: {
                labels: ['Airbnb', 'XYZ Rentals Website', 'Booking', 'Others'],
                datasets: [{
                    data: [
                        data.bookingSource.airbnb,
                        data.bookingSource.xyzRentals,
                        data.bookingSource.booking,
                        data.bookingSource.others
                    ],
                    backgroundColor: ['#FFD700', '#1E90FF', '#32CD32', '#FF6347'],
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: false,
                    }
                }
            }
        });

        // Daily revenue chart
        const dailyRevenueCtx = document.getElementById('dailyRevenueChart').getContext('2d');
        dailyRevenueChart = new Chart(dailyRevenueCtx, {
            type: 'line',
            data: {
                labels: data.dailyRevenue.map(item => item.date),
                datasets: [{
                    label: 'Revenue Rooms Total',
                    data: data.dailyRevenue.map(item => item.rooms),
                    borderColor: '#FFD700',
                    fill: false,
                }, {
                    label: 'Revenue Other',
                    data: data.dailyRevenue.map(item => item.other),
                    borderColor: '#1E90FF',
                    fill: false,
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Revenue (USD)'
                        }
                    }
                }
            }
        });

        // ADR chart
        const adrCtx = document.getElementById('adrChart').getContext('2d');
        adrChart = new Chart(adrCtx, {
            type: 'bar',
            data: {
                labels: data.dailyRevenue.map(item => item.date),
                datasets: [{
                    label: 'ADR',
                    data: data.dailyMetrics.adr,
                    backgroundColor: '#FFD700',
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'ADR (USD)'
                        }
                    }
                }
            }
        });

        // Daily occupancy rate chart
        const occupancyRateCtx = document.getElementById('occupancyRateChart').getContext('2d');
        occupancyRateChart = new Chart(occupancyRateCtx, {
            type: 'bar',
            data: {
                labels: data.dailyRevenue.map(item => item.date),
                datasets: [{
                    label: 'Occupancy Rate',
                    data: data.dailyMetrics.occupancyRate,
                    backgroundColor: '#32CD32',
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Occupancy Rate (%)'
                        }
                    }
                }
            }
        });

        // RevPAR chart
        const revparCtx = document.getElementById('revparChart').getContext('2d');
        revparChart = new Chart(revparCtx, {
            type: 'bar',
            data: {
                labels: data.dailyRevenue.map(item => item.date),
                datasets: [{
                    label: 'RevPAR',
                    data: data.dailyMetrics.revpar,
                    backgroundColor: '#FFA500',
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'RevPAR (USD)'
                        }
                    }
                }
            }
        });
    }
    
    monthSelect.addEventListener('change', (event) => {
        updateCharts(event.target.value);
    });
    
    // Initialize charts with default month (July)
    updateCharts('july');
    });
