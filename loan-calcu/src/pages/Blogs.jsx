/**
 * Resources Page Component
 * Displays helpful articles about loans and financial planning
 */
function Blogs() {
  // Static blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Understanding Different Types of Interest Rates",
      description: "Learn about fixed vs. variable interest rates, how they affect your EMI, and which option might be better for your financial situation. We cover the pros and cons of each type and provide practical examples.",
      date: "March 15, 2024",
      readTime: "6 min read",
      category: "Interest Rates"
    },
    {
      id: 2,
      title: "Smart Strategies to Pay Off Your Loan Faster",
      description: "Discover proven methods to reduce your loan tenure and save thousands in interest payments. From making extra payments to loan prepayment strategies, learn how to become debt-free sooner.",
      date: "March 10, 2024",
      readTime: "8 min read",
      category: "Debt Management"
    },
    {
      id: 3,
      title: "How to Choose the Right Loan Amount",
      description: "Avoid over-borrowing with our comprehensive guide on determining the optimal loan amount. Learn about debt-to-income ratios, affordability calculations, and financial planning best practices.",
      date: "March 5, 2024",
      readTime: "7 min read",
      category: "Financial Planning"
    },
    {
      id: 4,
      title: "EMI vs. Lump Sum: Which Payment Method is Better?",
      description: "Compare different loan repayment methods and understand when EMIs make sense versus lump sum payments. Includes real-world examples and calculation comparisons.",
      date: "February 28, 2024",
      readTime: "5 min read",
      category: "Loan Management"
    }
  ];

  // Handle read more button click
  const handleReadMore = (postId) => {
    alert(`This would normally take you to the full article #${postId}. Feature coming soon!`);
  };

  return (
    <div className="blogs-page fade-in">
      <div className="card">
        <h1>Financial Resources & Insights</h1>
        <p style={{ color: '#718096', fontSize: '1.1rem', marginBottom: '2rem', textAlign: 'center' }}>
          Stay informed with our latest articles about loans, EMI calculations, 
          financial planning, and money management strategies.
        </p>

        {/* Blog posts */}
        <div className="blog-posts">
          {blogPosts.map(post => (
            <article key={post.id} className="blog-post">
              <div className="blog-date">
                {post.date} • {post.readTime} • {post.category}
              </div>
              
              <h2 className="blog-title">{post.title}</h2>
              
              <p className="blog-description">{post.description}</p>
              
              <button 
                className="btn btn-secondary"
                onClick={() => handleReadMore(post.id)}
              >
                Read Full Article
              </button>
            </article>
          ))}
        </div>
      </div>

      {/* Newsletter signup section */}
      <div className="card">
        <h2>Stay Updated with Financial Tips</h2>
        <p style={{ color: '#718096', marginBottom: '1.5rem', textAlign: 'center' }}>
          Subscribe to our newsletter and get the latest insights about loan management, 
          financial planning, and money-saving tips delivered to your inbox.
        </p>
        
        <div className="newsletter-form">
          <input
            type="email"
            className="form-input"
            placeholder="Enter your email address"
          />
          <button 
            className="btn btn-success"
            onClick={() => alert('Newsletter subscription feature coming soon! Thank you for your interest.')}
          >
            Subscribe Now
          </button>
        </div>
      </div>

      {/* Popular topics section */}
      <div className="card">
        <h2>Popular Topics</h2>
        <p style={{ color: '#718096', marginBottom: '1rem' }}>
          Explore articles by category to find exactly what you're looking for:
        </p>
        <div className="topic-tags">
          {[
            'Personal Loans', 
            'Home Loans', 
            'Car Loans', 
            'Interest Rates', 
            'EMI Planning', 
            'Debt Management', 
            'Financial Planning', 
            'Loan Refinancing',
            'Credit Score',
            'Tax Benefits'
          ].map(topic => (
            <span 
              key={topic}
              className="topic-tag"
              onClick={() => alert(`Searching for articles about: ${topic}`)}
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Calculator tips */}
      <div className="card">
        <h2>Calculator Tips & Tricks</h2>
        <div style={{ marginTop: '1.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#667eea', marginBottom: '0.5rem' }}>💡 Pro Tip: Compare Different Scenarios</h3>
            <p style={{ color: '#4a5568' }}>Use our calculator to compare different loan amounts, interest rates, and tenures to find the most affordable option for your budget.</p>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#667eea', marginBottom: '0.5rem' }}>📊 Understanding the Payment Schedule</h3>
            <p style={{ color: '#4a5568' }}>The payment schedule shows how your EMI is split between principal and interest. Early payments have more interest, while later payments have more principal.</p>
          </div>
          
          <div>
            <h3 style={{ color: '#667eea', marginBottom: '0.5rem' }}>🎯 Plan Your Budget</h3>
            <p style={{ color: '#4a5568' }}>Ensure your EMI doesn't exceed 40% of your monthly income. This leaves room for other expenses and emergency savings.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blogs;