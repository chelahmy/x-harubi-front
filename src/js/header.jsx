import React from 'react'

function ButtonMenu(props) {
  return (
    <li><button type="button" class="button" onClick={props.onClick}>
      {props.label}
    </button></li>
  );
}

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let menu;
    let menu_icon;
    let button;
    let back_button;

    if (this.props.menu) {
      menu = this.props.menu.map((menu) => (
        <li><a
          onClick={() => this.props.onMenuClick(menu.name)}
        >{menu.label}</a></li>
      ));
      if (this.props.menu.length > 0)
        menu_icon = (
          <div data-responsive-toggle="header-main-menu" data-hide-for="medium">
            <button class="menu-icon" type="button" data-toggle="header-main-menu"></button>
          </div>
        );
    }

    if (this.props.button_menu)
      button = (
        <ButtonMenu
          label={this.props.button_menu.label}
          onClick={() => this.props.onMenuClick(this.props.button_menu.name)}
        />
      );

    if (this.props.want_back_button)
      back_button = (
        <a
          class="fi-arrow-left menu-item"
          onClick={() => this.props.onMenuClick('back')}
        ></a>
      );

    return (
      <div class="grid-x">
        <div class="cell shrink top-bar-extra">
          <div class="float-left top-bar-extra-back">
            {back_button}
          </div>
          <div class="float-left top-bar-extra-menu-icon">
            {menu_icon}
          </div>
        </div>
        <div class="cell auto">
          <div class="top-bar">
            <div class="top-bar-left">
              <ul class="menu">
                <li class="menu-text">
                  <img class="top-bar-logo" src="img/logo_small.png"/>
                  <span>{this.props.title}</span>
                </li>
              </ul>
            </div>
            <div class="top-bar-right">
              <ul class="menu" id="header-main-menu">
                {menu}
                {button}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
