const Router = {
  init: () => {
    document.querySelectorAll('a.navlink').forEach(a => {
      a.addEventListener('click', event => {
        event.preventDefault()
        const url = event.target.getAttribute('href')
        Router.go(url)
      })
    })
    // Event Handler to URL change
    window.addEventListener('popstate', event => {
      Router.go(event.state.path, false)
    })

    // Check the initial url incase user goes to a url in the SPA
    Router.go(location.pathname)
  },
  go: (path, addToHistory=true) => {
    if (addToHistory) {
      history.pushState({ path }, '', path)
    }

    let pageElement = null
    switch (path) {
      case '/':
        pageElement = document.createElement('menu-page')
        break
      case '/order':
        pageElement = document.createElement('order-page')
        break
      default:
        if (path.startsWith('/product-')) {
          pageElement = document.createElement('details-page')
          pageElement.textContent = 'Product Details'
          const paramId = path.substring(path.lastIndexOf('-') + 1)
          pageElement.dataset.productId = paramId
        }
        break

    }

    if (pageElement) {
      const cache = document.querySelector('main')
      cache.innerHTML = ''
      cache.appendChild(pageElement)
      window.scrollX = 0
    } else {
      // 404
      document.querySelector('main').innerHTML = `
        <h2>Oops 404</h2>
      `
    }
  }
}

export default Router