/**
 * Class that picks the right translation from an Array of translations.
 * The structure of the array should be the same as Narrative Entity.
 *
 * (see: AUTOGEO-85)
 */
export default class Translate {
  static ENGLISH_LANG = "en";

  /**
   * @param translations - array of translations
   * @param lang - targeted language for translation
   */
  constructor(translations, lang) {
    this.translations = translations;
    this.lang = lang;
  }


  /**
   * Get the proper translation based on the following logic:
   *  * try to find the text in the selected language OR
   *  * try to find the text in the english language OR
   *  * return the first translation available.
   */
  getTranslation() {
    if (this.translations === undefined || this.translations.length === 0) {
      return undefined;
    }

    const translationLanguage = this.translations.find(val => val.lang === this.lang);
    if (translationLanguage !== undefined) {
      return translationLanguage.description;
    } else {
      const translationEnglish= this.translations.find(val => val.lang === Translate.ENGLISH_LANG);

      if (translationEnglish !== undefined) {
        return translationEnglish.description;
      }
    }

    return this.translations[0].description;
  }
}
