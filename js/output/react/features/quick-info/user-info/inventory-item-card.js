class UserInfoWidgetInventoryItemCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collectible: props.collectible
    };
  }

  getSerialNumberTooltip() {
    let serialNumbers = this.state.collectible.serialNumbers;

    if (serialNumbers.length === 1 && serialNumbers[0]) {
      return `#${serialNumbers[0]}/${this.state.collectible.assetStock}`;
    }

    return "";
  }

  renderNumberContainer() {
    let serialNumbers = this.state.collectible.serialNumbers;

    if (serialNumbers.length > 1) {
      return /*#__PURE__*/React.createElement("span", {
        class: "limited-number-container"
      }, /*#__PURE__*/React.createElement("span", {
        class: "font-caption-header"
      }, "x"), /*#__PURE__*/React.createElement("span", {
        class: "font-caption-header text-subheader limited-number"
      }, global.addCommas(serialNumbers.length)));
    }

    if (serialNumbers[0]) {
      return /*#__PURE__*/React.createElement("span", {
        class: "limited-number-container"
      }, /*#__PURE__*/React.createElement("span", {
        class: "font-caption-header"
      }, "#"), /*#__PURE__*/React.createElement("span", {
        class: "font-caption-header text-subheader limited-number"
      }, serialNumbers[0]));
    }

    return /*#__PURE__*/React.createElement("span", null);
  }

  render() {
    return /*#__PURE__*/React.createElement("li", {
      class: "item-card list-item"
    }, /*#__PURE__*/React.createElement("div", {
      class: "item-card-container"
    }, /*#__PURE__*/React.createElement("a", {
      class: "item-card-link",
      href: Roblox.catalog.getAssetUrl(this.state.collectible.assetId, this.state.collectible.assetName)
    }, /*#__PURE__*/React.createElement("div", {
      class: "item-card-thumb-container"
    }, /*#__PURE__*/React.createElement(Thumbnail, {
      thumbnailType: Roblox.thumbnails.types.asset,
      thumbnailTargetId: this.state.collectible.assetId
    }), /*#__PURE__*/React.createElement("span", {
      class: "limited-icon-container",
      title: this.getSerialNumberTooltip()
    }, /*#__PURE__*/React.createElement("span", {
      class: "icon-shop-limited"
    }), this.renderNumberContainer())), /*#__PURE__*/React.createElement("div", {
      class: "item-card-name",
      title: this.state.collectible.assetName
    }, this.state.collectible.assetName)), /*#__PURE__*/React.createElement("div", {
      class: "item-card-caption"
    }, /*#__PURE__*/React.createElement("div", {
      class: "text-overflow item-card-price"
    }, /*#__PURE__*/React.createElement("span", {
      class: "icon icon-robux-16x16"
    }), /*#__PURE__*/React.createElement("span", {
      class: "text-robux ng-binding"
    }, this.state.collectible.recentAveragePrice !== Infinity ? global.addCommas(this.state.collectible.recentAveragePrice) : "Priceless")))));
  }

}