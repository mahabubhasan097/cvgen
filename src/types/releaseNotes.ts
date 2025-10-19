export interface ReleaseNote {
  version: string;
  releaseDate: string;
  versionName: string;
  type: 'major' | 'minor' | 'patch';
  highlights: {
    title: string;
    description: string;
    emoji: string;
  };
  features: {
    title: string;
    items: {
      title: string;
      description: string;
      category: 'feature' | 'improvement' | 'fix' | 'breaking';
    }[];
  }[];
  bugFixes: string[];
  documentation?: string[];
  breakingChanges?: string[];
}

export interface ReleaseNotesData {
  releases: ReleaseNote[];
  latestVersion: string;
}
