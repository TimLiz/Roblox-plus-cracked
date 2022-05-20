class LinkedItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: 2,
      assetId: props.assetId,
      dependentAssets: [],
      assetBundles: []
    };
  }

  init() {
    let loading = 2;
    Roblox.content.getDependentAssets(this.state.assetId).then(assets => {
      this.setState({
        dependentAssets: assets,
        loading: --loading
      });
    }).catch(err => {
      console.error(err);
      this.setState({
        loading: --loading
      });
    });
    Roblox.catalog.getAssetBundles(this.state.assetId).then(bundles => {
      this.setState({
        assetBundles: bundles,
        loading: --loading
      });
    }).catch(err => {
      console.error(err);
      this.setState({
        loading: --loading
      });
    });
  }

  renderDependentAssets() {
    if (this.state.dependentAssets.length < 1) {
      return "";
    }

    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      class: "container-header"
    }, /*#__PURE__*/React.createElement("h3", null, "Dependencies")), /*#__PURE__*/React.createElement("ul", {
      class: "hlist item-cards"
    }, this.state.dependentAssets.map(asset => {
      return /*#__PURE__*/React.createElement("li", {
        class: "item-card list-item"
      }, /*#__PURE__*/React.createElement("div", {
        class: "item-card-container"
      }, /*#__PURE__*/React.createElement("a", {
        class: "item-card-link",
        href: Roblox.catalog.getAssetUrl(asset.id, asset.name)
      }, /*#__PURE__*/React.createElement("div", {
        class: "item-card-thumb-container"
      }, /*#__PURE__*/React.createElement(Thumbnail, {
        thumbnailType: Roblox.thumbnails.types.asset,
        thumbnailTargetId: asset.id
      })), /*#__PURE__*/React.createElement("div", {
        class: "item-card-name",
        title: asset.name
      }, asset.name))));
    })));
  }

  renderAssetBundles() {
    if (this.state.assetBundles.length < 1) {
      return "";
    }

    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      class: "container-header"
    }, /*#__PURE__*/React.createElement("h3", null, "Bundles")), /*#__PURE__*/React.createElement("ul", {
      class: "hlist item-cards"
    }, this.state.assetBundles.map(bundle => {
      return /*#__PURE__*/React.createElement("li", {
        class: "item-card list-item"
      }, /*#__PURE__*/React.createElement("div", {
        class: "item-card-container"
      }, /*#__PURE__*/React.createElement("a", {
        class: "item-card-link",
        href: Roblox.catalog.getBundleUrl(bundle.id, bundle.name)
      }, /*#__PURE__*/React.createElement("div", {
        class: "item-card-thumb-container"
      }, /*#__PURE__*/React.createElement(Thumbnail, {
        thumbnailType: Roblox.thumbnails.types.bundle,
        thumbnailTargetId: bundle.id
      })), /*#__PURE__*/React.createElement("div", {
        class: "item-card-name",
        title: bundle.name
      }, bundle.name))));
    })));
  }

  render() {
    if (this.state.loading > 0) {
      return /*#__PURE__*/React.createElement("div", {
        class: "section-content-off"
      }, "Loading...");
    }

    if (this.state.dependentAssets.length < 1 && this.state.assetBundles.length < 1) {
      return /*#__PURE__*/React.createElement("div", {
        class: "section-content-off"
      }, "This item has no linked content.");
    }

    return /*#__PURE__*/React.createElement("div", {
      class: "rplus-linked-items"
    }, this.renderDependentAssets(), this.renderAssetBundles());
  }

}