let Settings = {
  title: "Harubi Front",
  menu: {
    home: 'Home',
    signin: 'Sign In',
    signup: 'Sign Up'
  },
  pages: {
    home: {
      title: 'Home',
      menu: ['signin'],
      button_menu: 'signup',
      body: {
        content: 'home.html',
        component: 'body'
      }
    },
    signin: {
      title: 'Sign In',
      menu: ['home']
    },
    signup: {
      title: 'Sign Up',
      menu: ['home'],
      body: {
        component: 'signup'
      }
    }
  }
}

function GetPageSettings(page) {
  let settings = {}
  if (typeof Settings.pages[page] !== 'undefined') {
    let page_item = Settings.pages[page]
    if (typeof page_item.title !== 'undefined')
      settings.title = page_item.title
    if (typeof page_item.menu !== 'undefined')
      settings.menu = page_item.menu.map((menu_item) => ({
        name: menu_item,
        label: Settings.menu[menu_item]
      }))
    if (typeof page_item.button_menu !== 'undefined') {
      let menu_item = page_item.button_menu;
      settings.button_menu = {
        name: menu_item,
        label: Settings.menu[menu_item]
      }
    }
    if (typeof page_item.body !== 'undefined')
      settings.body = page_item.body
  }
  return settings
}

export {Settings as default, GetPageSettings}
