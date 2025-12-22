export default function SkeletonDebateCard() {
  return (
    <div 
      className="p-6 animate-pulse"
      style={{
        backgroundColor: 'var(--color-base-surface)',
        border: '1px solid var(--color-base-border)',
        borderRadius: 'var(--radius-sm)'
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div 
          className="h-4 rounded"
          style={{ 
            width: '120px',
            backgroundColor: 'var(--color-base-border)' 
          }}
        />
        <div 
          className="h-4 rounded"
          style={{ 
            width: '40px',
            backgroundColor: 'var(--color-base-border)' 
          }}
        />
      </div>

      {/* Title */}
      <div className="mb-6">
        <div 
          className="h-6 rounded mb-2"
          style={{ 
            width: '90%',
            backgroundColor: 'var(--color-base-border)' 
          }}
        />
        <div 
          className="h-6 rounded"
          style={{ 
            width: '70%',
            backgroundColor: 'var(--color-base-border)' 
          }}
        />
      </div>

      {/* Options */}
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div 
            key={i}
            className="h-12 rounded"
            style={{ backgroundColor: 'var(--color-base-border)' }}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--color-base-border)' }}>
        <div 
          className="h-4 rounded mx-auto"
          style={{ 
            width: '120px',
            backgroundColor: 'var(--color-base-border)' 
          }}
        />
      </div>
    </div>
  );
}

export function SkeletonDebateList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <SkeletonDebateCard key={i} />
      ))}
    </div>
  );
}
