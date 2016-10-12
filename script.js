const ipc = require('electron').ipcRenderer
const xlsx = require('xlsx')

const selectDirBtn = document.getElementById('select-file')

selectDirBtn.addEventListener('click', function(event) {
  ipc.send('open-file-dialog')
})

ipc.on('selected-file', function(event, path) {
  var workbook = xlsx.readFile(`${path}`)
  var sheetNameList = workbook.SheetNames
  var table = null
  sheetNameList.forEach(function(sheet) {
    table = document.createElement('table')
    table.setAttribute('class', 'table')
    var thead = document.createElement('thead')
    var tbody = document.createElement('tbody')
    var caption = document.createElement('caption')
    caption.textContent = sheet
    table.appendChild(caption)

    var worksheet = workbook.Sheets[sheet]
    var range = xlsx.utils.decode_range(worksheet['!ref'])
    for (var R = range.s.r; R <= range.e.r; ++R) {
      var tr = document.createElement('tr')
      for (var C = range.s.c; C <= range.e.c; ++C) {
        var cell = worksheet[xlsx.utils.encode_cell({c:C, r:R})]
        var td = R == 0 ? document.createElement('th') : document.createElement('td')
        td.textContent = cell ? cell.v : ''
        tr.appendChild(td)
      }
      R == 0 ? thead.appendChild(tr) : tbody.appendChild(tr)
    }
    table.appendChild(thead)
    table.appendChild(tbody)
    document.getElementById('content').appendChild(table)
  })
})
