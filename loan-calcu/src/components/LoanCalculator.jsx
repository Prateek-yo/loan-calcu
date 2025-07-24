import { useState } from 'react';
import PieChart from './PieChart';

/**
 * Loan Calculator Component
 * Calculates EMI (Equated Monthly Installment) and displays results
 * with a pie chart and detailed payment schedule
 */
function LoanCalculator() {
  // State for form inputs
  const [loanData, setLoanData] = useState({
    principal: '',
    interestRate: '',
    duration: '',
    durationType: 'years' // years or months
  });

  // State for calculation results
  const [results, setResults] = useState(null);
  const [paymentSchedule, setPaymentSchedule] = useState([]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoanData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Generate payment schedule
  const generatePaymentSchedule = (principal, monthlyRate, emi, totalMonths) => {
    const schedule = [];
    let remainingBalance = principal;

    for (let month = 1; month <= Math.min(totalMonths, 12); month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = emi - interestPayment;
      remainingBalance = remainingBalance - principalPayment;

      schedule.push({
        month,
        emi: emi,
        principalPayment,
        interestPayment,
        remainingBalance: Math.max(0, remainingBalance)
      });

      if (remainingBalance <= 0) break;
    }

    return schedule;
  };

  // Calculate EMI function
  const calculateEMI = () => {
    const { principal, interestRate, duration, durationType } = loanData;

    // Validation
    if (!principal || !interestRate || !duration) {
      alert('Please fill in all fields');
      return;
    }

    if (principal <= 0 || interestRate < 0 || duration <= 0) {
      alert('Please enter valid positive numbers');
      return;
    }

    // Convert inputs to numbers
    const P = parseFloat(principal);
    const annualRate = parseFloat(interestRate);
    let months = parseInt(duration);

    // Convert years to months if needed
    if (durationType === 'years') {
      months = months * 12;
    }

    // Calculate monthly interest rate
    const monthlyRate = annualRate / 100 / 12;

    let emi, totalInterest, totalAmount;

    if (monthlyRate === 0) {
      // If interest rate is 0, simple division
      emi = P / months;
      totalInterest = 0;
      totalAmount = P;
    } else {
      // EMI calculation formula: P * r * (1+r)^n / ((1+r)^n - 1)
      const factor = Math.pow(1 + monthlyRate, months);
      emi = P * monthlyRate * factor / (factor - 1);
      totalAmount = emi * months;
      totalInterest = totalAmount - P;
    }

    // Generate payment schedule
    const schedule = generatePaymentSchedule(P, monthlyRate, emi, months);

    // Update results state
    setResults({
      emi: emi.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      principal: P.toFixed(2),
      months: months,
      interestRate: annualRate
    });

    setPaymentSchedule(schedule);
  };

  // Clear form and results
  const clearForm = () => {
    setLoanData({
      principal: '',
      interestRate: '',
      duration: '',
      durationType: 'years'
    });
    setResults(null);
    setPaymentSchedule([]);
  };

  return (
    <div className="loan-calculator">
      <div className="card">
        <h1>Calculate Your Plan</h1>
        <p style={{ color: '#718096', marginBottom: '2rem', textAlign: 'center', fontSize: '1.1rem' }}>
          From personal to business loans — calculate EMIs in seconds.
View your full repayment plan with detailed insights.
        </p>

        {/* Calculator form */}
        <form onSubmit={(e) => { e.preventDefault(); calculateEMI(); }}>
          <div className="form-group">
            <label htmlFor="principal">Loan Amount (₹)</label>
            <input
              type="number"
              id="principal"
              name="principal"
              className="form-input"
              placeholder="Enter loan amount (e.g., 500000)"
              value={loanData.principal}
              onChange={handleInputChange}
              min="1"
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label htmlFor="interestRate">Annual Interest Rate (%)</label>
            <input
              type="number"
              id="interestRate"
              name="interestRate"
              className="form-input"
              placeholder="Enter interest rate (e.g., 8.5)"
              value={loanData.interestRate}
              onChange={handleInputChange}
              min="0"
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label htmlFor="duration">Loan Duration</label>
            <div className="duration-input-group">
              <input
                type="number"
                id="duration"
                name="duration"
                className="form-input"
                placeholder="Enter duration"
                value={loanData.duration}
                onChange={handleInputChange}
                min="1"
              />
              <select
                name="durationType"
                className="form-select"
                value={loanData.durationType}
                onChange={handleInputChange}
              >
                <option value="years">Years</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>

          {/* Form buttons */}
          <div className="button-group">
            <button type="submit" className="btn btn-primary">
              Calculate EMI
            </button>
            <button type="button" className="btn btn-secondary" onClick={clearForm}>
              Clear All
            </button>
          </div>
        </form>
      </div>

      {/* Results section */}
      {results && (
        <>
          <div className="card">
            <h2>Calculation Results</h2>
            
            {/* EMI display */}
            <div className="result-section">
              <div className="result-label">Monthly EMI</div>
              <div className="result-value">₹{parseFloat(results.emi).toLocaleString('en-IN')}</div>
            </div>

            {/* Summary grid */}
            <div className="summary-grid">
              <div className="summary-item">
                <div className="summary-label">Principal Amount</div>
                <div className="summary-value success">₹{parseFloat(results.principal).toLocaleString('en-IN')}</div>
              </div>
              
              <div className="summary-item">
                <div className="summary-label">Total Interest</div>
                <div className="summary-value danger">₹{parseFloat(results.totalInterest).toLocaleString('en-IN')}</div>
              </div>
              
              <div className="summary-item">
                <div className="summary-label">Total Amount</div>
                <div className="summary-value primary">₹{parseFloat(results.totalAmount).toLocaleString('en-IN')}</div>
              </div>
              
              <div className="summary-item">
                <div className="summary-label">Loan Duration</div>
                <div className="summary-value info">{results.months} months</div>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="chart-container">
              <h3 style={{ textAlign: 'center', marginBottom: '1rem', color: '#2d3748' }}>
                Payment Breakdown
              </h3>
              <PieChart 
                principal={parseFloat(results.principal)}
                interest={parseFloat(results.totalInterest)}
              />
            </div>
          </div>

          {/* Payment Schedule */}
          {paymentSchedule.length > 0 && (
            <div className="card">
              <h2>Payment Schedule (First 12 Months)</h2>
              <p style={{ color: '#718096', marginBottom: '1.5rem', textAlign: 'center' }}>
                Detailed breakdown of your monthly payments showing principal and interest components
              </p>
              
              <div className="schedule-container">
                <div className="schedule-header">
                  <div>Month</div>
                  <div>EMI</div>
                  <div>Principal</div>
                  <div>Interest</div>
                </div>
                
                {paymentSchedule.map((payment, index) => (
                  <div key={index} className="schedule-row">
                    <div>
                      <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Month {payment.month}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#718096', fontSize: '0.9rem', display: 'block' }}>EMI</span>
                      <strong>₹{payment.emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#718096', fontSize: '0.9rem', display: 'block' }}>Principal</span>
                      <strong style={{ color: '#48bb78' }}>₹{payment.principalPayment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#718096', fontSize: '0.9rem', display: 'block' }}>Interest</span>
                      <strong style={{ color: '#e53e3e' }}>₹{payment.interestPayment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</strong>
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{ 
                marginTop: '1rem', 
                padding: '1rem', 
                backgroundColor: 'rgba(102, 126, 234, 0.05)', 
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <p style={{ margin: '0', color: '#4a5568', fontSize: '0.95rem' }}>
                  <strong>Note:</strong> This schedule shows the first 12 months. 
                  The principal portion increases and interest portion decreases over time.
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default LoanCalculator;