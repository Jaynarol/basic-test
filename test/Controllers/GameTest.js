/* eslint-disable prefer-arrow-callback */

import { describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import Hero from '../../src/Models/Hero'
import Game from '../../src/Controllers/Game'

describe('Game', function () {
  let sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    this.sinon = sandbox
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('changeNameToKebabCase()', function () {
    it('should name myHero is myhero', function () {
      const stubGetName = this.sinon.stub(Hero.prototype, 'getName')
        .returns('myHero')

      return expect(Game.changeNameToKebabCase(new Hero()))
        .to.be.equal('myhero')
        .and.satisfy(() => (
          sinon.assert.calledOnce(stubGetName)
        ) == null)
    })

    it('should name "my second hero" is my-second-hero', function () {
      const stubGetName = this.sinon.stub(Hero.prototype, 'getName')
        .returns('my second hero')

      return expect(Game.changeNameToKebabCase(new Hero()))
        .to.be.equal('my-second-hero')
        .and.satisfy(() => (
          sinon.assert.calledOnce(stubGetName)
        ) == null)
    })

    it('should name " my third hero " is my-third-hero', function () {
      const stubGetName = this.sinon.stub(Hero.prototype, 'getName')
        .returns(' my third hero ')

      return expect(Game.changeNameToKebabCase(new Hero()))
        .to.be.equal('my-third-hero')
        .and.satisfy(() => (
          sinon.assert.calledOnce(stubGetName)
        ) == null)
    })

    it('should name empty is empty', function () {
      const stubGetName = this.sinon.stub(Hero.prototype, 'getName')
        .returns('    ')

      return expect(Game.changeNameToKebabCase(new Hero()))
        .to.be.equal('')
        .and.satisfy(() => (
          sinon.assert.calledOnce(stubGetName)
        ) == null)
    })
  })


  describe('countHeroWeak()', function () {
    it('should be hero weak 1 from 1', function () {
      const stubIsWeak = this.sinon.stub(Hero.prototype, 'isWeak')
        .returns(true)

      return expect(Game.countHeroWeak([new Hero()]))
        .to.have.length.equal(1)
        .and.satisfy(() => (
          sinon.assert.calledOnce(stubIsWeak)
        ) == null)
    })

    it('should be hero weak 0 from 1', function () {
      const stubIsWeak = this.sinon.stub(Hero.prototype, 'isWeak')
        .returns(false)

      return expect(Game.countHeroWeak([new Hero()]))
        .to.have.length.equal(0)
        .and.satisfy(() => (
          sinon.assert.calledOnce(stubIsWeak)
        ) == null)
    })

    it('should be hero weak 1 from 3', function () {
      const stubIsWeak = this.sinon.stub(Hero.prototype, 'isWeak')
      stubIsWeak.onFirstCall().returns(true)
      stubIsWeak.onSecondCall().returns(true)
      stubIsWeak.returns(false)

      return expect(Game.countHeroWeak([new Hero(), new Hero(), new Hero()]))
        .to.have.length.equal(2)
        .and.satisfy(() => (
          sinon.assert.calledThrice(stubIsWeak)
        ) == null)
    })
  })

  describe('attackAllAndCountAlive()', function () {
    it('should be hero no one alive', function () {
      this.sinon.stub(Hero.prototype, 'getHp').returns(500)
      const stubRealDamage = this.sinon.stub(Game, 'realDamage').returns(600)

      return expect(Game.attackAllAndCountAlive([new Hero(), new Hero(), new Hero()], 0))
        .to.equal(0)
        .and.satisfy(() => (
          sinon.assert.calledThrice(stubRealDamage)
        ) == null)
    })

    it('should be hero alive 3 from 3', function () {
      this.sinon.stub(Hero.prototype, 'getHp').returns(600)
      const stubRealDamage = this.sinon.stub(Game, 'realDamage').returns(500)

      return expect(Game.attackAllAndCountAlive([new Hero(), new Hero(), new Hero()], 0))
        .to.equal(3)
        .and.satisfy(() => (
          sinon.assert.calledThrice(stubRealDamage)
        ) == null)
    })
  })

  describe('attackAllAndCountTotalDamage()', function () {
    it('should be totals damage is 1500 when hp more than damage', function () {
      this.sinon.stub(Hero.prototype, 'getHp').returns(600)
      const stubRealDamage = this.sinon.stub(Game, 'realDamage').returns(500)

      return expect(Game.attackAllAndCountTotalDamage([new Hero(), new Hero(), new Hero()], 0))
        .to.equal(1500)
        .and.satisfy(() => (
          sinon.assert.calledThrice(stubRealDamage)
        ) == null)
    })

    it('should be totals damage is 1800 when damage more than hp', function () {
      this.sinon.stub(Hero.prototype, 'getHp').returns(600)
      const stubRealDamage = this.sinon.stub(Game, 'realDamage').returns(1000)

      return expect(Game.attackAllAndCountTotalDamage([new Hero(), new Hero(), new Hero()], 0))
        .to.equal(1800)
        .and.satisfy(() => (
          sinon.assert.calledThrice(stubRealDamage)
        ) == null)
    })
  })

  describe('realDamage()', function () {
    it('hero weak should be damage * 2', function () {
      this.sinon.stub(Hero.prototype, 'isWeak').returns(true)

      return expect(Game.realDamage(new Hero(), 500))
        .to.equal(1000)
    })

    it('hero not weak should be damage not stack', function () {
      this.sinon.stub(Hero.prototype, 'isWeak').returns(false)

      return expect(Game.realDamage(new Hero(), 500))
        .to.equal(500)
    })
  })
})
