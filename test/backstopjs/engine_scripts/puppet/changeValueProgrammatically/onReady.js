module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label)

  // add more ready handlers here...
  await page.evaluate(() => {
    document.getElementById('demo1').value = 'https://github.com/sebastiansIT/SITWebComponents/raw/master/logo_340.png'
    // document.getElementById('demo1').revert()
  })

  await page.waitForTimeout(2000);
}
