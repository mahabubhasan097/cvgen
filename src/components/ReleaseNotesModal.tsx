'use client';

import React, { useState } from 'react';
import { releaseNotesData } from '@/constants/releaseNotes';
import { ReleaseNote } from '@/types/releaseNotes';

interface ReleaseNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  version: string;
}

const ReleaseNotesModal: React.FC<ReleaseNotesModalProps> = ({
  isOpen,
  onClose,
  version,
}) => {
  const [expandedVersions, setExpandedVersions] = useState<string[]>([version]);

  if (!isOpen) return null;

  const toggleVersion = (versionToToggle: string) => {
    setExpandedVersions(prev =>
      prev.includes(versionToToggle)
        ? prev.filter(v => v !== versionToToggle)
        : [...prev, versionToToggle]
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'feature':
        return '✨';
      case 'improvement':
        return '⚡';
      case 'fix':
        return '🐛';
      case 'breaking':
        return '💥';
      default:
        return '📝';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'feature':
        return 'bg-blue-50 border-blue-200';
      case 'improvement':
        return 'bg-green-50 border-green-200';
      case 'fix':
        return 'bg-yellow-50 border-yellow-200';
      case 'breaking':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'major':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'minor':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'patch':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderReleaseNote = (release: ReleaseNote) => {
    const isExpanded = expandedVersions.includes(release.version);

    return (
      <div
        key={release.version}
        className='border border-gray-200 rounded-lg mb-4 overflow-hidden'
      >
        {/* Accordion Header */}
        <button
          onClick={() => toggleVersion(release.version)}
          className='w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between'
        >
          <div className='flex items-center gap-3'>
            <div className='flex items-center gap-2'>
              <span className='text-2xl'>{release.highlights.emoji}</span>
              <div>
                <div className='flex items-center gap-2'>
                  <h3 className='text-lg font-bold text-gray-900'>
                    v{release.version}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full border ${getTypeColor(release.type)}`}
                  >
                    {release.type}
                  </span>
                </div>
                <p className='text-sm text-gray-600'>{release.versionName}</p>
              </div>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-xs text-gray-500'>{release.releaseDate}</span>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </div>
        </button>

        {/* Accordion Content */}
        {isExpanded && (
          <div className='p-4 bg-white border-t border-gray-200'>
            {/* Highlights */}
            <div className='mb-6'>
              <h4 className='text-lg font-bold text-gray-900 mb-2'>
                {release.highlights.title}
              </h4>
              <p className='text-gray-700 leading-relaxed'>
                {release.highlights.description}
              </p>
            </div>

            {/* Features */}
            {release.features.map((featureSection, index) => (
              <div key={index} className='mb-6'>
                <h4 className='text-base font-bold text-gray-900 mb-3'>
                  {featureSection.title}
                </h4>
                <div className='space-y-3'>
                  {featureSection.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className={`p-3 rounded-lg border ${getCategoryColor(item.category)}`}
                    >
                      <div className='flex items-start gap-3'>
                        <span className='text-lg flex-shrink-0'>
                          {getCategoryIcon(item.category)}
                        </span>
                        <div>
                          <h5 className='font-semibold text-gray-900'>
                            {item.title}
                          </h5>
                          <p className='text-sm text-gray-700 mt-1'>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Bug Fixes */}
            {release.bugFixes.length > 0 && (
              <div className='mb-6'>
                <h4 className='text-base font-bold text-gray-900 mb-3'>
                  🐛 Bug Fixes
                </h4>
                <ul className='space-y-2'>
                  {release.bugFixes.map((fix, index) => (
                    <li
                      key={index}
                      className='flex items-start gap-2 text-sm text-gray-700'
                    >
                      <span className='text-green-600 mt-0.5'>✓</span>
                      <span>{fix}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Documentation */}
            {release.documentation && release.documentation.length > 0 && (
              <div className='mb-6'>
                <h4 className='text-base font-bold text-gray-900 mb-3'>
                  📚 Documentation
                </h4>
                <ul className='space-y-2'>
                  {release.documentation.map((doc, index) => (
                    <li
                      key={index}
                      className='flex items-start gap-2 text-sm text-gray-700'
                    >
                      <span className='text-blue-600 mt-0.5'>✓</span>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Breaking Changes */}
            {release.breakingChanges && release.breakingChanges.length > 0 && (
              <div className='mb-6'>
                <h4 className='text-base font-bold text-red-900 mb-3'>
                  💥 Breaking Changes
                </h4>
                <ul className='space-y-2'>
                  {release.breakingChanges.map((change, index) => (
                    <li
                      key={index}
                      className='flex items-start gap-2 text-sm text-red-700'
                    >
                      <span className='text-red-600 mt-0.5'>⚠️</span>
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 no-print'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col animate-scaleIn'
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className='bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 flex-shrink-0'>
          <div className='flex items-center justify-between'>
            <div>
              <div className='flex items-center gap-3'>
                <div className='w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center'>
                  <svg
                    className='w-7 h-7'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </div>
                <div>
                  <h2 className='text-2xl font-bold'>Release Notes</h2>
                  <p className='text-sm text-white/80'>CVGen Version History</p>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className='p-2 hover:bg-white/20 rounded-lg transition-colors'
              aria-label='Close'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className='p-6 overflow-y-auto flex-1 min-h-0'>
          {/* Show all releases in accordion format */}
          <div className='space-y-4'>
            {releaseNotesData.releases.map(release =>
              renderReleaseNote(release)
            )}
          </div>

          {/* Quick Stats */}
          <div className='mt-8 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200'>
            <h3 className='text-lg font-bold text-gray-900 mb-3 flex items-center gap-2'>
              <span className='text-xl'>📊</span>
              Release Statistics
            </h3>
            <div className='grid grid-cols-3 gap-4 text-center'>
              <div>
                <div className='text-2xl font-bold text-indigo-600'>
                  {releaseNotesData.releases.length}
                </div>
                <div className='text-sm text-gray-600'>Total Releases</div>
              </div>
              <div>
                <div className='text-2xl font-bold text-purple-600'>
                  {
                    releaseNotesData.releases.filter(r => r.type === 'major')
                      .length
                  }
                </div>
                <div className='text-sm text-gray-600'>Major Releases</div>
              </div>
              <div>
                <div className='text-2xl font-bold text-green-600'>
                  {releaseNotesData.releases.reduce(
                    (acc, r) => acc + r.bugFixes.length,
                    0
                  )}
                </div>
                <div className='text-sm text-gray-600'>Bug Fixes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Always Visible */}
        <div className='border-t bg-gray-50 p-4 flex items-center justify-between flex-shrink-0'>
          <div className='text-sm text-gray-600'>
            Latest Version: v{releaseNotesData.latestVersion} • Total Releases:{' '}
            {releaseNotesData.releases.length}
          </div>
          <button
            onClick={onClose}
            className='px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors shadow-md'
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReleaseNotesModal;
