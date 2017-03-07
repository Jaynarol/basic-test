export default class Validate {

  static checkNumber(damage) {
    if (!Number.isFinite(damage) || damage < 0) {
      throw new Error('invalid damage - should be number add more than 0')
    }
  }

}
