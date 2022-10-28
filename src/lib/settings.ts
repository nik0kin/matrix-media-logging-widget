export interface Settings {
  //// SETUP ////

  /**
   * The Movie Database (TMDB) api key
   *   Generate at https://www.themoviedb.org/
   */
  tmdbApiKey: string;

  /**
   * Allow users from this homeserver to access the media logging page
   *  Example: matrix.org
   *   TODO more similar options
   *  Ignored if debug=true
   */
  allowlistHomeserver?: string;

  //// OPERATIONS ////

  /**
   * Disables matrix auth and allows access to anyone
   */
  debug?: boolean;
}
