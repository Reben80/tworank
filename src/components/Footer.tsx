import React from 'react';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p>© {new Date().getFullYear()} Towing Company Rankings. All scores are normalized for fair comparison.</p>
      </div>
    </footer>
  );
}