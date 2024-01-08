/**
 * Global store
 */

const Store = {
  menu: null,
  cart: []
}

const proxiedStore = new Proxy(Store, {
  set(targetObjectToBeChanged, propertyName, propertyValue) {
    targetObjectToBeChanged[propertyName] = propertyValue

    if (propertyName == 'menu') {
      // anounce globally the menu has changed
      window.dispatchEvent(new Event('appmenuchange'))
    }
    
    if (propertyName == 'cart') {
      // broadcast globally the cart has changed
      window.dispatchEvent(new Event('appcartchange'))
    }

    return true
  }
})

export default proxiedStore