import { useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, PieController } from 'chart.js';

// Register Chart.js components including PieController
ChartJS.register(ArcElement, Tooltip, Legend, PieController);

 
function PieChart({ principal, interest }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Get canvas context
    const ctx = chartRef.current.getContext('2d');

    // Create new chart
    chartInstance.current = new ChartJS(ctx, {
      type: 'pie',
      data: {
        labels: ['Principal Amount', 'Total Interest'],
        datasets: [{
          data: [principal, interest],
          backgroundColor: [
            '#2563eb', // Professional Blue for principal
            '#f59e0b'  // Professional Amber for interest
          ],
          borderColor: [
            '#1d4ed8', // Darker blue
            '#d97706'  // Darker amber
          ],
          borderWidth: 2,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              usePointStyle: true,
              font: {
                size: 14
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.parsed;
                const total = principal + interest;
                const percentage = ((value / total) * 100).toFixed(1);
                return `${label}: ₹${value.toLocaleString()} (${percentage}%)`;
              }
            }
          }
        }
      }
    });

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [principal, interest]);

  // Show message if no data
  if (!principal && !interest) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
        <p>Chart will appear here after calculating your loan</p>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', maxWidth: '400px', margin: '0 auto' }}>
      <canvas ref={chartRef} />
      
      {/* Additional info below chart */}
      <div style={{ 
        marginTop: '1rem', 
        padding: '1rem', 
        backgroundColor: '#f8fafc', 
        borderRadius: '4px',
        textAlign: 'center'
      }}>
        <p style={{ margin: '0', color: '#64748b', fontSize: '0.9rem' }}>
          <strong>Interest Percentage:</strong> {((interest / (principal + interest)) * 100).toFixed(1)}% of total payment
        </p>
      </div>
    </div>
  );
}

export default PieChart;
