module.exports = {
  'id': 'backstop_default',
  'viewports': [
    {
      'label': 'phone',
      'width': 320,
      'height': 480
    }/*,
    {
      'label': 'tablet',
      'width': 1024,
      'height': 768
    }*/
  ],
  //'onBeforeScript': 'puppet/onBefore.js',
  //'onReadyScript': 'puppet/onReady.js',
  'scenarios': [
    {
      'label': 'Select-Image: Simple Usage Demo',
      'url': 'http://localhost:3001/select-image/demo.html',
      'referenceUrl': 'https://sebastiansit.github.io/SITWebComponents/select-image/demo.html',
      'selectors': ['#demo1'],
    },
    {
      'label': 'Select-Image: Change Value Programmaticaly',
      'url': 'http://localhost:3001/select-image/demo.html',
      'referenceUrl': 'https://sebastiansit.github.io/SITWebComponents/select-image/demo.html',
      'selectors': ['#demo1'],
      'onReadyScript': 'puppet/changeValueProgrammatically/onReady.js'
    },
    {
      'label': 'Select-Image: Custom Label',
      'url': 'http://localhost:3001/select-image/demo.html',
      'referenceUrl': 'https://sebastiansit.github.io/SITWebComponents/select-image/demo.html',
      'selectors': ['#demo2']
    },
    {
      'label': 'Select-Image: Read Only',
      'url': 'http://localhost:3001/select-image/demo.html',
      'referenceUrl': 'https://sebastiansit.github.io/SITWebComponents/select-image/demo.html',
      'selectors': ['#demo3']
    },
    {
      'label': 'Select-Image: Disabled',
      'url': 'http://localhost:3001/select-image/demo.html',
      'referenceUrl': 'https://sebastiansit.github.io/SITWebComponents/select-image/demo.html',
      'selectors': ['#demo4']
    },
    {
      'label': 'Select-Image: Pseudo Element Styling',
      'url': 'http://localhost:3001/select-image/demo.html',
      'referenceUrl': 'https://sebastiansit.github.io/SITWebComponents/select-image/demo.html',
      'selectors': ['#demo6']
    },
    {
      'label': 'Select-Image: Demo Page',
      'url': 'http://localhost:3001/select-image/demo.html',
      'referenceUrl': 'https://sebastiansit.github.io/SITWebComponents/select-image/demo.html'
    }
  ],
  'paths': {
    'bitmaps_reference': 'backstop_data/bitmaps_reference',
    'bitmaps_test': 'backstop_data/bitmaps_test',
    'engine_scripts': 'backstop_data/engine_scripts',
    'html_report': 'backstop_data/html_report',
    'ci_report': 'backstop_data/ci_report'
  },
  'report': ['CI'],
  'engine': 'puppeteer',
  'engineOptions': {
    'args': ['--no-sandbox']
  },
  'asyncCaptureLimit': 5,
  'asyncCompareLimit': 50,
  'debug': false,
  'debugWindow': false
}
