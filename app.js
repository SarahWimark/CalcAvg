const fileInput = document.getElementById('fileInput')

// Get the text from the uploaded file
fileInput.addEventListener('change', function () {
  var fr = new window.FileReader()
  fr.onload = function () {
    let lines = this.result.split('\n')

    // Goes through the text fromt he file line by line and creates a new objekt with the needed information
    let mappedLines = lines.map((line) => {
      let obj = {
        group: line.split('\t')[0],
        supportGroup: line.split('\t')[1],
        ticketId: line.split('\t')[2],
        time: line.split('\t')[3]
      }
      return obj
    })

    // Get the unique products
    console.log('Products: ')
    const products = getProducts(mappedLines)
    console.log(products)
    const countedProducts = countProducts(products)
    console.log('Counted Products: ')
    console.log(countedProducts)
    const timePerProduct = countTimeOnProducts(mappedLines)
    console.log('Time per Products: ')
    console.log(timePerProduct)
  }
  fr.readAsText(this.files[0])
})

// Removes the duplicate products and returns a map with unique products- a unique product consists of the group together with the id of the ticket
const getProducts = (products) => {
  return [
    ...products
      .reduce((map, item) => {
        const key = JSON.stringify([item.group, item.ticketId])
        if (!map.has(key)) map.set(key, { ...item })
        return map
      }, new Map())
      .values()
  ]
}

// Returns a count of how many occurances of each group of products
const countProducts = (products) => {
  return [
    ...products
      .reduce((map, item) => {
        if (!map.has(item.group)) map.set(item.group, { ...item, count: 0 })
        map.get(item.group).count++
        return map
      }, new Map())
      .values()
  ]
}

// Returns the amount of time spent per group on each productgroup
const countTimeOnProducts = (products) => {
  return products.reduce((acc, item) => {
    let existItem = acc.find(({ group, supportGroup }) => item.group === group && item.supportGroup === supportGroup)
    if (existItem) {
      let newTime = Number.parseInt(existItem.time) + Number.parseInt(item.time)
      existItem.time = newTime
    } else {
      acc.push(item)
    }
    return acc
  }, [])
}
