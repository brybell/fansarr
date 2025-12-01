import { FansDBScene } from '../service/StashDBService';
import { Whisparr } from '../types/whisparr';

/**
 * Configuration for transforming FansDB scene data to Whisparr format
 */
interface TransformConfig {
  rootFolderPath?: string;
  searchForNewMovie?: boolean;
  qualityProfile?: number;
  tags?: number[];
}

/**
 * Extended movie payload that includes optional FansDB-specific fields
 */
type ExtendedMoviePayload = Whisparr.MoviePayload & {
  releaseDate?: string;
  performers?: string[];
};

/**
 * Transforms FansDB scene data to Whisparr-compatible format
 * Handles metadata differences between FansDB and StashDB
 */
export class MetadataTransformer {
  /**
   * Transform FansDB scene to Whisparr movie payload
   */
  static transformFansDBSceneToWhisparr(
    fansdbScene: FansDBScene,
    config: TransformConfig,
  ): Whisparr.MoviePayload {
    const payload: ExtendedMoviePayload = {
      title: this.cleanTitle(fansdbScene.title),
      studio: this.transformStudio(fansdbScene.studio),
      foreignId: `fansdb:${fansdbScene.id}`, // Prefix to indicate source
      rootFolderPath: config.rootFolderPath || '',
      monitored: true,
      addOptions: {
        searchForMovie: config.searchForNewMovie || true,
      },
      qualityProfileId: config.qualityProfile || 0,
      tags: this.transformTags(config.tags || []),
    };

    // Add release date if available
    if (fansdbScene.release_date) {
      payload.releaseDate = fansdbScene.release_date;
    }

    // Add performers if available
    if (fansdbScene.performers && fansdbScene.performers.length > 0) {
      payload.performers = this.transformPerformers(fansdbScene.performers);
    }

    return payload;
  }

  /**
   * Clean and normalize scene title
   */
  private static cleanTitle(title: string): string {
    if (!title) return '';

    // Remove common prefixes/suffixes that might confuse Whisparr
    return title
      .trim()
      .replace(/^\s+|\s+$/g, '') // Trim whitespace
      .replace(/\s+/g, ' '); // Normalize spaces
  }

  /**
   * Transform studio information
   */
  private static transformStudio(studio?: {
    id: string;
    name: string;
  }): string {
    if (!studio) return '';

    // FansDB might have different studio naming conventions
    // This is where we might need mapping logic
    return studio.name.trim();
  }

  /**
   * Transform performers array
   */
  private static transformPerformers(
    performers: Array<{ id: string; name: string; as?: string }>,
  ): string[] {
    return performers
      .map((performer) => performer.as || performer.name)
      .filter((name) => name && name.trim() !== '');
  }

  /**
   * Transform tags array
   */
  private static transformTags(tags: number[]): number[] {
    // Return tag IDs as-is for Whisparr
    return tags.filter((tag) => tag !== null && tag !== undefined);
  }

  /**
   * Extract scene ID from FansDB URL or element
   */
  static extractFansDBSceneId(element: HTMLElement): string | null {
    // Try to extract from URL first
    const link = element.querySelector('a');
    if (link?.href) {
      const match = link.href.match(/\/scenes\/([a-f0-9-]{36})/);
      if (match) return match[1];
    }

    // Fallback to data attributes if available
    const dataId =
      element.getAttribute('data-stash-id') ||
      element.getAttribute('data-scene-id');
    if (dataId) return dataId;

    return null;
  }

  /**
   * Check if scene data looks complete for Whisparr
   */
  static validateSceneData(fansdbScene: FansDBScene): {
    isValid: boolean;
    issues: string[];
  } {
    const issues: string[] = [];

    if (!fansdbScene.title || fansdbScene.title.trim() === '') {
      issues.push('Missing or empty title');
    }

    if (!fansdbScene.id) {
      issues.push('Missing scene ID');
    }

    // Check for required performers
    if (!fansdbScene.performers || fansdbScene.performers.length === 0) {
      issues.push('No performers found');
    }

    // Check for studio
    if (!fansdbScene.studio) {
      issues.push('No studio information');
    }

    return {
      isValid: issues.length === 0,
      issues,
    };
  }
}
