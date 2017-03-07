import Validate from '../Utils/Validate'

export default class Game {

  static changeNameToKebabCase(hero) {
    return hero.getName().trim().split(' ').join('-').toLowerCase()
  }

  static countHeroWeak(heros) {
    return heros.filter(hero => hero.isWeak()).length
  }

  static attackAllAndCountAlive(heros, damage) {
    Validate.checkNumber(damage)

    return heros.filter(hero => hero.getHp() - this.realDamage(hero, damage) > 0).length
  }

  static attackAllAndCountTotalDamage(heros, damage) {
    Validate.checkNumber(damage)

    return heros.reduce((totalDamage, hero) => {
      const hp = hero.getHp()
      const currentDamage = this.realDamage(hero, damage)

      return totalDamage + (hp > currentDamage ? currentDamage : hp)
    }, 0)
  }

  static realDamage(hero, damage) {
    return damage * (hero.isWeak() + 1)
  }

}
