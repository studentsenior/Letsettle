import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How It Works - Letsettle',
  description: 'Learn how to create debates, vote, and settle disputes on Letsettle.',
};

export default function HowItWorksPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 
          className="font-bold mb-4"
          style={{ 
            color: 'var(--color-text-primary)',
            fontSize: 'var(--font-size-3xl)'
          }}
        >
          How It Works
        </h1>
        <p 
          style={{ 
            color: 'var(--color-text-secondary)',
            fontSize: 'var(--font-size-lg)',
            lineHeight: '1.6'
          }}
        >
          Letsettle is a public voting platform where you can create debates, vote on options, and see live rankings. Here's everything you need to know.
        </p>
      </div>

      <div className="space-y-12">
        {/* Section 1: Creating Debates */}
        <section>
          <h2 
            className="font-bold mb-4"
            style={{ 
              color: 'var(--color-text-primary)',
              fontSize: 'var(--font-size-2xl)'
            }}
          >
            Creating a Debate
          </h2>
          <div 
            className="p-6 mb-4"
            style={{
              backgroundColor: 'var(--color-base-surface)',
              border: '1px solid var(--color-base-border)',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <ol className="space-y-4" style={{ color: 'var(--color-text-secondary)' }}>
              <li className="flex gap-3">
                <span 
                  className="font-mono-numbers font-bold flex-shrink-0"
                  style={{ color: 'var(--color-accent)' }}
                >
                  01.
                </span>
                <div>
                  <strong style={{ color: 'var(--color-text-primary)' }}>Click "Start Debate"</strong> in the navigation bar
                </div>
              </li>
              <li className="flex gap-3">
                <span 
                  className="font-mono-numbers font-bold flex-shrink-0"
                  style={{ color: 'var(--color-accent)' }}
                >
                  02.
                </span>
                <div>
                  <strong style={{ color: 'var(--color-text-primary)' }}>Fill in the details:</strong>
                  <ul className="mt-2 ml-4 space-y-1 list-disc">
                    <li><strong style={{ color: 'var(--color-text-primary)' }}>Title:</strong> The main question or topic (e.g., "Best Programming Language 2024")</li>
                    <li><strong style={{ color: 'var(--color-text-primary)' }}>Category:</strong> Choose from 30+ categories like Sports, Technology, Politics, etc.</li>
                    <li><strong style={{ color: 'var(--color-text-primary)' }}>Subcategory (Optional):</strong> Add specific context (e.g., "Cricket" under Sports)</li>
                    <li><strong style={{ color: 'var(--color-text-primary)' }}>Description (Optional):</strong> Provide background or context</li>
                  </ul>
                </div>
              </li>
              <li className="flex gap-3">
                <span 
                  className="font-mono-numbers font-bold flex-shrink-0"
                  style={{ color: 'var(--color-accent)' }}
                >
                  03.
                </span>
                <div>
                  <strong style={{ color: 'var(--color-text-primary)' }}>Add at least 2 options</strong> for people to vote on. You can add more with the "+ Add Another Option" button.
                </div>
              </li>
              <li className="flex gap-3">
                <span 
                  className="font-mono-numbers font-bold flex-shrink-0"
                  style={{ color: 'var(--color-accent)' }}
                >
                  04.
                </span>
                <div>
                  <strong style={{ color: 'var(--color-text-primary)' }}>Control option additions:</strong> Check or uncheck "Allow users to suggest more options after creation" to control whether others can add new options to your debate.
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* Section 2: Voting */}
        <section>
          <h2 
            className="font-bold mb-4"
            style={{ 
              color: 'var(--color-text-primary)',
              fontSize: 'var(--font-size-2xl)'
            }}
          >
            How Voting Works
          </h2>
          <div 
            className="p-6 mb-4"
            style={{
              backgroundColor: 'var(--color-base-surface)',
              border: '1px solid var(--color-base-border)',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <div className="space-y-4" style={{ color: 'var(--color-text-secondary)' }}>
              <p>
                <strong style={{ color: 'var(--color-text-primary)' }}>Click the checkbox</strong> next to any option to cast your vote. Your vote is recorded instantly and the rankings update in real-time.
              </p>
              <p>
                <strong style={{ color: 'var(--color-text-primary)' }}>One vote per debate:</strong> You can only vote once per debate. Once you've voted, you'll see your chosen option highlighted with a checkmark, and all other options will show their current percentages.
              </p>
              <p>
                <strong style={{ color: 'var(--color-text-primary)' }}>Live rankings:</strong> Options are automatically sorted by vote count, so the most popular choice is always at the top.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Vote Protection */}
        <section>
          <h2 
            className="font-bold mb-4"
            style={{ 
              color: 'var(--color-text-primary)',
              fontSize: 'var(--font-size-2xl)'
            }}
          >
            Vote Protection
          </h2>
          <div 
            className="p-6 mb-4"
            style={{
              backgroundColor: 'var(--color-base-surface)',
              border: '1px solid var(--color-base-border)',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <div className="space-y-4" style={{ color: 'var(--color-text-secondary)' }}>
              <p>
                To ensure fair voting, Letsettle uses <strong style={{ color: 'var(--color-text-primary)' }}>multiple protection layers</strong>:
              </p>
              <ul className="ml-6 space-y-2 list-disc">
                <li><strong style={{ color: 'var(--color-text-primary)' }}>IP Address Tracking:</strong> Your IP address is logged to prevent multiple votes from the same network</li>
                <li><strong style={{ color: 'var(--color-text-primary)' }}>Browser Fingerprinting:</strong> A unique fingerprint is generated based on your browser and device characteristics</li>
                <li><strong style={{ color: 'var(--color-text-primary)' }}>Local Storage:</strong> Your vote is remembered in your browser to show which option you voted for</li>
              </ul>
              <p>
                This means voting is <strong style={{ color: 'var(--color-text-primary)' }}>anonymous</strong> (no login required) but still protected against abuse.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Adding Options */}
        <section>
          <h2 
            className="font-bold mb-4"
            style={{ 
              color: 'var(--color-text-primary)',
              fontSize: 'var(--font-size-2xl)'
            }}
          >
            Adding New Options
          </h2>
          <div 
            className="p-6 mb-4"
            style={{
              backgroundColor: 'var(--color-base-surface)',
              border: '1px solid var(--color-base-border)',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <div className="space-y-4" style={{ color: 'var(--color-text-secondary)' }}>
              <p>
                If the debate creator has <strong style={{ color: 'var(--color-text-primary)' }}>allowed more options</strong>, you'll see an "Add your option" form at the bottom of the debate page.
              </p>
              <p>
                <strong style={{ color: 'var(--color-text-primary)' }}>Duplicate prevention:</strong> The system checks for duplicate options (case-insensitive), so you can't add "JavaScript" if "javascript" already exists.
              </p>
              <p>
                Your new option will appear in the rankings immediately with 0 votes, ready for others to vote on.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Categories */}
        <section>
          <h2 
            className="font-bold mb-4"
            style={{ 
              color: 'var(--color-text-primary)',
              fontSize: 'var(--font-size-2xl)'
            }}
          >
            Browsing by Category
          </h2>
          <div 
            className="p-6 mb-4"
            style={{
              backgroundColor: 'var(--color-base-surface)',
              border: '1px solid var(--color-base-border)',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <div className="space-y-4" style={{ color: 'var(--color-text-secondary)' }}>
              <p>
                Debates are organized into <strong style={{ color: 'var(--color-text-primary)' }}>30+ categories</strong> including:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 my-4">
                {['Sports', 'Technology', 'Politics', 'Entertainment', 'Food', 'Gaming', 'Movies', 'Music', 'Science', 'Education', 'Career', 'Health'].map((cat) => (
                  <div 
                    key={cat}
                    className="px-3 py-2 text-sm"
                    style={{
                      backgroundColor: 'var(--color-accent-light)',
                      color: 'var(--color-accent)',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  >
                    {cat}
                  </div>
                ))}
              </div>
              <p>
                Click on any category to see all debates in that topic. You can also filter by subcategories for more specific discussions.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Key Features */}
        <section>
          <h2 
            className="font-bold mb-4"
            style={{ 
              color: 'var(--color-text-primary)',
              fontSize: 'var(--font-size-2xl)'
            }}
          >
            Key Features
          </h2>
          <div 
            className="p-6 mb-4"
            style={{
              backgroundColor: 'var(--color-base-surface)',
              border: '1px solid var(--color-base-border)',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <ul className="space-y-3" style={{ color: 'var(--color-text-secondary)' }}>
              <li className="flex gap-3">
                <span style={{ color: 'var(--color-accent)' }}>✓</span>
                <div><strong style={{ color: 'var(--color-text-primary)' }}>No Login Required:</strong> Vote and create debates anonymously</div>
              </li>
              <li className="flex gap-3">
                <span style={{ color: 'var(--color-accent)' }}>✓</span>
                <div><strong style={{ color: 'var(--color-text-primary)' }}>Live Updates:</strong> See results change in real-time as votes come in</div>
              </li>
              <li className="flex gap-3">
                <span style={{ color: 'var(--color-accent)' }}>✓</span>
                <div><strong style={{ color: 'var(--color-text-primary)' }}>Fair Voting:</strong> Multi-layer protection prevents vote manipulation</div>
              </li>
              <li className="flex gap-3">
                <span style={{ color: 'var(--color-accent)' }}>✓</span>
                <div><strong style={{ color: 'var(--color-text-primary)' }}>Flexible Options:</strong> Debate creators can allow or disable option suggestions</div>
              </li>
              <li className="flex gap-3">
                <span style={{ color: 'var(--color-accent)' }}>✓</span>
                <div><strong style={{ color: 'var(--color-text-primary)' }}>SEO Optimized:</strong> All debates are indexed for search engines</div>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA Section */}
        <section 
          className="p-8 text-center"
          style={{
            backgroundColor: 'var(--color-accent-light)',
            border: '1px solid var(--color-accent)',
            borderRadius: 'var(--radius-sm)'
          }}
        >
          <h3 
            className="font-bold mb-3"
            style={{ 
              color: 'var(--color-text-primary)',
              fontSize: 'var(--font-size-xl)'
            }}
          >
            Ready to settle a debate?
          </h3>
          <p 
            className="mb-6"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Start a new debate or browse existing ones to cast your vote.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link 
              href="/create"
              className="px-6 py-3 font-medium transition-opacity hover:opacity-70"
              style={{ 
                backgroundColor: 'var(--color-accent)',
                color: 'white',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              Start a Debate
            </Link>
            <Link 
              href="/"
              className="px-6 py-3 font-medium transition-opacity hover:opacity-70"
              style={{ 
                border: '1px solid var(--color-accent)',
                color: 'var(--color-accent)',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              Browse Debates
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
