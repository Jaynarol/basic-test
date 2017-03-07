/* eslint-disable prefer-arrow-callback */

import { describe, it } from 'mocha'
import { expect } from 'chai'
import Validate from '../../src/Utils/Validate'

describe('Validate', function () {
  describe('checkNumber()', function () {
    it('input Number should be throw nothing', function () {
      return expect(function () {
        Validate.checkNumber(10)
      })
        .to.not.throw()
    })

    it('input Double should be throw nothing', function () {
      return expect(function () {
        Validate.checkNumber(10.99)
      })
        .to.not.throw()
    })

    it('input Number < 0 should be throw', function () {
      return expect(function () {
        Validate.checkNumber(-10)
      })
        .to.throw(/invalid damage/)
    })

    it('input null should be throw', function () {
      return expect(function () {
        Validate.checkNumber(null)
      })
        .to.throw(/invalid damage/)
    })

    it('input NaN should be throw', function () {
      return expect(function () {
        Validate.checkNumber(NaN)
      })
        .to.throw(/invalid damage/)
    })

    it('input String should be throw', function () {
      return expect(function () {
        Validate.checkNumber('10')
      })
        .to.throw(/invalid damage/)
    })

    it('input undefined should be throw', function () {
      return expect(function () {
        Validate.checkNumber(undefined)
      })
        .to.throw(/invalid damage/)
    })

    it('input Infinity should be throw', function () {
      return expect(function () {
        Validate.checkNumber(Infinity)
      })
        .to.throw(/invalid damage/)
    })
  })
})
