import { PluginTypeI } from '@pipcook/pipcook-core';

/**
 * The options to configure Costa runtime.
 */
export interface RuntimeOptions {
  /**
   * The directory to install plugins.
   */
  installDir: string;
  /**
   * The directory for dataset storage.
   */
  datasetDir: string;
  /**
   * The directory for component instance.
   */
  componentDir: string;
}

/**
 * This represents a source of a plugin.
 */
export interface PluginSource {
  from: 'fs' | 'npm' | null;
  name: string;
  uri: string | null;
}

/**
 * This represents requirements for Python and its packages.
 */
export interface CondaConfig {
  /**
   * The Python dependency, but it's solid to 3.7 for now.
   */
  python?: string;
  /**
   * The Python third-party dependencies.
   */
  dependencies?: Record<string, string>;
}

/**
 * Usually, it is used to represent some fields of package.json, 
 * and some pipcook fields are also added, see below for details.
 */
export interface PluginPackage {
  /**
   * the package name.
   */
  name: string;
  /**
   * the package version.
   */
  version: string;
  /**
   * the main script.
   */
  main: string;
  /**
   * the package description.
   */
  description?: string;
  /**
   * the package dependencies.
   */
  dependencies?: Record<string, string>;
  /**
   * The following objects are used to declare some information 
   * needed by the plugin at runtime.
   */
  pipcook: {
    /**
     * The plugin category.
     */
    category: PluginTypeI;
    /**
     * The data type of this plugin.
     */
    datatype: 'text' | 'image' | 'all';
    /**
     * The method to map for corresponding datatype.
     */
    method?: string;
    /**
     * The source of the plugin.
     */
    source: PluginSource;
    /**
     * The target information.
     */
    target?: {
      PYTHONPATH: string;
      DESTPATH: string;
    };
  };
  /**
   * The below is some information related to Python.
   */
  conda?: CondaConfig;
}

/**
 * It represents an object which extends `PluginPackage` with more
 * fields more about NPM.
 */
export interface NpmPackage extends PluginPackage {
  dist: {
    integrity: string;
    shasum: string;
    tarball: string;
  };
}

/**
 * It represents the metadata of a npm package, which fetchs from
 * npm registry.
 */
export interface NpmPackageMetadata {
  _id: string;
  _rev: string;
  name: string;
  'dist-tags': {
    beta: string;
    latest: string;
  };
  versions: Record<string, NpmPackage>;
}
