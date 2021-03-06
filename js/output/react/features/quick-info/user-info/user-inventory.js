class UserInfoWidgetInventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      inventoryData: null,
      loading: true,
      privateInventory: false
    };
    this.componentWillReceiveProps(props);
  }

  loadInventory(userId) {
    this.setState({
      loading: true,
      inventoryData: null,
      privateInventory: false
    });
    Roblox.inventory.getCollectibles(userId).then(collectibles => {
      if (this.props.user.id !== userId) {
        return;
      }

      this.setState({
        loading: false,
        inventoryData: collectibles
      });
    }).catch(err => {
      if (this.props.user.id !== userId) {
        return;
      }

      let privateInventory = Array.isArray(err) && err[0] && err[0].code === 11;

      if (!privateInventory) {
        console.error(err);
      }

      this.setState({
        loading: false,
        privateInventory: privateInventory
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      user: nextProps.user
    });
    this.loadInventory(nextProps.user.id);
  }

  renderInventoryItems() {
    let mergedCollectibles = [];
    let collectibleMap = {};
    this.state.inventoryData.collectibles.forEach(collectible => {
      if (collectibleMap[collectible.assetId]) {
        collectibleMap[collectible.assetId].serialNumbers.push(collectible.serialNumber);
        return;
      }

      let mergedCollectible = {
        assetId: collectible.assetId,
        assetName: collectible.name,
        recentAveragePrice: collectible.recentAveragePrice || Infinity,
        serialNumbers: [collectible.serialNumber],
        assetStock: collectible.assetStock
      };
      collectibleMap[collectible.assetId] = mergedCollectible;
      mergedCollectibles.push(mergedCollectible);
    });
    return mergedCollectibles.sort((a, b) => {
      return b.recentAveragePrice - a.recentAveragePrice;
    }).map(collectible => {
      return /*#__PURE__*/React.createElement(UserInfoWidgetInventoryItemCard, {
        collectible: collectible
      });
    });
  }

  render() {
    if (this.state.loading) {
      return /*#__PURE__*/React.createElement("div", {
        class: "rplus-quick-info-widget-inventory"
      }, /*#__PURE__*/React.createElement("span", {
        class: "spinner spinner-default"
      }));
    }

    if (this.state.privateInventory) {
      return /*#__PURE__*/React.createElement("div", {
        class: "rplus-quick-info-widget-inventory"
      }, /*#__PURE__*/React.createElement("div", {
        class: "section-content-off"
      }, "Private Inventory"));
    }

    if (!this.state.inventoryData) {
      return /*#__PURE__*/React.createElement("div", {
        class: "rplus-quick-info-widget-inventory"
      }, /*#__PURE__*/React.createElement("div", {
        class: "section-content-off"
      }, "Failed to load inventory."));
    }

    return /*#__PURE__*/React.createElement("ul", {
      class: "rplus-quick-info-widget-inventory item-cards item-cards-stackable"
    }, this.renderInventoryItems());
  }

}