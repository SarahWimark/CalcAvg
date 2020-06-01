const fileInput = document.getElementById('fileInput')

fileInput.addEventListener('change', function () {
  var fr = new FileReader()
  fr.onload = function () {
    let lines = this.result.split('\n')

    let mappedLines = lines.map(line => {
      let obj = {
        group: line.split('\t')[0],
        supportGroup: line.split('\t')[1],
        ticketId: line.split('\t')[2],
        time: line.split('\t')[3]
      }
      return obj
    })

    console.log(mappedLines)
  }
  fr.readAsText(this.files[0])
})
