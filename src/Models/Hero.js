export default class Hero {
  constructor() {
    this.name = 'newHero'
    this.hp = 100
    this.damage = 10
    this.weak = false
  }
  setName(name) {
    this.name = name
  }
  getName() {
    return this.name
  }
  setHp(hp) {
    this.hp = hp
  }
  getHp() {
    return this.hp
  }
  setDamage(damage) {
    this.damage = damage
  }
  getDamage() {
    return this.damage
  }
  setWeak(weak) {
    this.weak = weak
  }
  isWeak() {
    return this.weak
  }
}
