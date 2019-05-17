const AddressParser = require('../parser/AddressParser')

const testcase = (test, common) => {
  let parser = new AddressParser()
  let assert = common.assert.bind(null, test, parser)

  // intersection queries
  assert('Corner of Main St & Second Ave', [
    { street: 'Main St' }, { street: 'Second Ave' }
  ], true)

  assert('Main St & Second Ave', [
    { street: 'Main St' }, { street: 'Second Ave' }
  ], true)

  assert('Main St @ Second Ave', [
    { street: 'Main St' }, { street: 'Second Ave' }
  ], true)

  assert('Gleimstraße an der ecke von Schönhauser Allee', [
    { street: 'Gleimstraße' }, { street: 'Schönhauser Allee' }
  ], true)

  assert('Gleimstraße und Schönhauserallee', [
    { street: 'Gleimstraße' }, { street: 'Schönhauserallee' }
  ], true)

  assert('cnr west st and north ave', [
    { street: 'west st' }, { street: 'north ave' }
  ], true)

  // should not consider intersection tokens for street name
  assert('& b', [])
  assert('a &', [])

  // no street suffix
  assert('foo & bar', [
    { street: 'foo' }, { street: 'bar' }
  ], true)
  assert('foo and bar', [
    { street: 'foo' }, { street: 'bar' }
  ], true)
  assert('foo at bar', [
    { street: 'foo' }, { street: 'bar' }
  ], true)
  assert('foo @ bar', [
    { street: 'foo' }, { street: 'bar' }
  ], true)

  // missing street suffix - alpha
  assert('main st & side ave', [
    { street: 'main st' }, { street: 'side ave' }
  ], true)
  assert('main st & side', [
    { street: 'main st' }, { street: 'side' }
  ], true)
  assert('main & side ave', [
    { street: 'main' }, { street: 'side ave' }
  ], true)
  assert('main & side', [
    { street: 'main' }, { street: 'side' }
  ], true)

  // missing street suffix - ordinal
  assert('1st st & 2nd ave', [
    { street: '1st st' }, { street: '2nd ave' }
  ], true)
  assert('1st st & 2nd', [
    { street: '1st st' }, { street: '2nd' }
  ], true)
  assert('1st & 2nd ave', [
    { street: '1st' }, { street: '2nd ave' }
  ], true)
  assert('1st & 2nd', [
    { street: '1st' }, { street: '2nd' }
  ], true)

  // missing street suffix - cardinal
  assert('1 st & 2 ave', [
    { street: '1 st' }, { street: '2 ave' }
  ], true)
  assert('1 st & 2', [
    { street: '1 st' }, { street: '2' }
  ], true)
  assert('1 & 2 ave', [
    { street: '1' }, { street: '2 ave' }
  ], true)
  assert('1 & 2', [
    { street: '1' }, { street: '2' }
  ], true)

  assert('SW 6th & Pine', [
    { street: 'SW 6th' }, { street: 'Pine' }
  ], true)

  // Should not detect this as an intersection
  // assert('University of Hawaii at Hilo', [
  //   { street: 'SW 6th' }, { street: 'Pine' }
  // ], true)
  // assert('national air and space museum', [
  //   { street: 'SW 6th' }, { street: 'Pine' }
  // ], true)

  // Trimet syntax
  // assert('9,Lambert', [
  //   { street: '9' }, { street: 'Lambert' }
  // ], true)
}

module.exports.all = (tape, common) => {
  function test (name, testFunction) {
    return tape(`intersection: ${name}`, testFunction)
  }

  testcase(test, common)
}
