// 2 more functional tests to be implemented
//    Test for fileOlderThanFile() requires setting the date of test files
//    Test for dwt2pug() requires input file and actual output file
const {
  toTitleCase,
  html2pugWorkaround,
  insertPugBlocks,
  fileOlderThanFile,
  dwt2pug,
} = require('./dwt2pug.service.unit')

describe('toTitleCase(): Checking conversion to title-case', () => {
  test('No change conversion', () => {
    const input = 'Dwt2pug Service Unit Test'
    const actual = toTitleCase(input)
    expect(actual).toBe('Dwt2pug Service Unit Test')
  })
  test('All lowercase conversion', () => {
    const input = 'dwt2pug service unit test'
    const actual = toTitleCase(input)
    expect(actual).toBe('Dwt2pug Service Unit Test')
  })
  test('All uppercase conversion', () => {
    const input = 'DWT2PUG SERVICE UNIT TEST'
    const actual = toTitleCase(input)
    expect(actual).toBe('Dwt2pug Service Unit Test')
  })
  test('Mixedcase conversion', () => {
    const input = 'DwT2pUg sErViCe UnIt tEsT'
    const actual = toTitleCase(input)
    expect(actual).toBe('Dwt2pug Service Unit Test')
  })
  test('Mixed nonalphabetic conversion', () => {
    const input = 'DwT2pUg sEr!@#$%Vi%^&*Ce Un(){}{(){}"`~=+It tE;.,?sT'
    const actual = toTitleCase(input)
    expect(actual).toBe('Dwt2pug Ser!@#$%vi%^&*ce Un(){}{(){}"`~=+it Te;.,?st')
  })
})

describe('html2pugWorkaround(): checking the workaround to the bug in html2pug module', () => {
  test('join vertical bar on its own line', () => {
    const input = 'h1 pug code\np this is a paragraph\n  | \nand then'
    const expected = 'h1 pug code\np this is a paragraph\n  | and then'
    const actual = html2pugWorkaround(input)
    expect(actual).toBe(expected)
  })
  test('html element on next line', () => {
    const input =
      'h1 pug code\np this is a paragraph\n  | \n  h2 another element'
    const expected =
      'h1 pug code\np this is a paragraph\n  | \n  h2 another element'
    const actual = html2pugWorkaround(input)
    expect(actual).toBe(expected)
  })
})

describe('insertPugBlocks(): put the block name in', () => {
  test('get the block name and insert it', () => {
    const input =
      '    main.content\n      //  TemplateBeginEditable name="Content" \n      //  TemplateEndEditable \n'
    const expected =
      '    main.content\n      //  TemplateBeginEditable name="Content" \n      block Content\n      //  TemplateEndEditable \n'
    const actual = insertPugBlocks(input)
    expect(actual).toBe(expected)
  })
  test('use titlecase for block', () => {
    const input =
      '    main.content\n      //  TemplateBeginEditable name="content" \n      //  TemplateEndEditable \n'
    const expected =
      '    main.content\n      //  TemplateBeginEditable name="content" \n      block Content\n      //  TemplateEndEditable \n'
    const actual = insertPugBlocks(input)
    expect(actual).toBe(expected)
  })
  test('replace block "Content', () => {
    const input =
      '    main.content\n      //  TemplateBeginEditable name="Content" \n      h1 this is nonsense \n      p blah, blah \n      //  TemplateEndEditable \n'
    const expected =
      '    main.content\n      //  TemplateBeginEditable name="Content" \n      block Content\n      //  TemplateEndEditable \n'
    const actual = insertPugBlocks(input)
    expect(actual).toBe(expected)
  })
  test('do not replace block "Scripts', () => {
    const input =
      '    main.content\n      //  TemplateBeginEditable name="Scripts" \n      h1 this is nonsense \n      p blah, blah \n      //  TemplateEndEditable \n'
    const expected =
      '    main.content\n      //  TemplateBeginEditable name="Scripts" \n      block Scripts\n      h1 this is nonsense \n      p blah, blah \n      //  TemplateEndEditable \n'
    const actual = insertPugBlocks(input)
    expect(actual).toBe(expected)
  })
})
