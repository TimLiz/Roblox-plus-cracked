class ItemDetailsTabs extends React.Component {
  constructor(props) {
    super(props);
    let tabs = [];
    let resellersContent = $("asset-resale-pane");
    let recommendationsContent = $("recommendations");

    if (resellersContent.length > 0) {
      tabs.push(ItemDetailsTabs.tabTypes.resellers);
    } else if (recommendationsContent.length > 0) {
      tabs.push(ItemDetailsTabs.tabTypes.recommendations);
    }

    tabs = tabs.concat(props.tabTypes);
    this.state = {
      assetId: props.assetId,
      selectedTab: tabs[0],
      tabs: tabs,
      resellersContent: resellersContent,
      recommendationsContent: recommendationsContent
    };
    this.childRefs = {
      owners: React.createRef(),
      linkedItems: React.createRef()
    };
    this.initRefs = {};
  }

  selectTab(tabType) {
    if (tabType === ItemDetailsTabs.tabTypes.resellers) {
      this.state.resellersContent.show();
    } else {
      this.state.resellersContent.hide();
    }

    if (tabType === ItemDetailsTabs.tabTypes.recommendations) {
      this.state.recommendationsContent.show();
    } else {
      this.state.recommendationsContent.hide();
    }

    if (!this.initRefs[tabType] && this.childRefs[tabType]) {
      this.initRefs[tabType] = true;
      this.childRefs[tabType].current.init();
    }

    this.setState({
      selectedTab: tabType
    });
  }

  getTabTitle(tabType) {
    switch (tabType) {
      case ItemDetailsTabs.tabTypes.owners:
        return "Owners";

      case ItemDetailsTabs.tabTypes.linkedItems:
        return "Linked Items";

      case ItemDetailsTabs.tabTypes.recommendations:
        return "Recommendations";

      case ItemDetailsTabs.tabTypes.resellers:
        return "Resellers";

      default:
        return tabType;
    }
  }

  getTabPaneClassName(tabType) {
    let className = "tab-pane";

    if (tabType === this.state.selectedTab) {
      className += " active";
    }

    return className;
  }

  getTabs() {
    return this.state.tabs.map(tabType => {
      let className = "rbx-tab";

      if (tabType === this.state.selectedTab) {
        className += " active";
      }

      return /*#__PURE__*/React.createElement("li", {
        class: className
      }, /*#__PURE__*/React.createElement("a", {
        class: "rbx-tab-heading",
        onClick: this.selectTab.bind(this, tabType)
      }, /*#__PURE__*/React.createElement("span", {
        class: "text-lead"
      }, this.getTabTitle(tabType))));
    });
  }

  getTabsHeader() {
    if (this.state.tabs.length === 1) {
      return /*#__PURE__*/React.createElement("div", {
        class: "container-header"
      }, /*#__PURE__*/React.createElement("h3", null, this.getTabTitle(this.state.tabs[0])));
    }

    return /*#__PURE__*/React.createElement("div", {
      class: "rbx-tabs-horizontal"
    }, /*#__PURE__*/React.createElement("ul", {
      class: "nav nav-tabs",
      "rplus-tab-count": this.state.tabs.length
    }, this.getTabs()));
  }

  getTabContent() {
    return this.props.tabTypes.map(tabType => {
      switch (tabType) {
        case ItemDetailsTabs.tabTypes.owners:
          return /*#__PURE__*/React.createElement("div", {
            class: this.getTabPaneClassName(tabType)
          }, /*#__PURE__*/React.createElement(ItemOwners, {
            ref: this.childRefs.owners,
            assetId: this.state.assetId
          }));

        case ItemDetailsTabs.tabTypes.linkedItems:
          return /*#__PURE__*/React.createElement("div", {
            class: this.getTabPaneClassName(tabType)
          }, /*#__PURE__*/React.createElement(LinkedItems, {
            ref: this.childRefs.linkedItems,
            assetId: this.state.assetId
          }));

        default:
          return /*#__PURE__*/React.createElement("div", {
            class: "tab-pane"
          });
      }
    });
  }

  render() {
    if (this.state.tabs.length <= 0) {
      return /*#__PURE__*/React.createElement("div", {
        class: "rplus-item-details-tabs"
      });
    }

    return /*#__PURE__*/React.createElement("div", {
      class: "rplus-item-details-tabs"
    }, this.getTabsHeader(), /*#__PURE__*/React.createElement("div", {
      class: "tab-content"
    }, this.getTabContent()));
  }

}

ItemDetailsTabs.tabTypes = {
  owners: "owners",
  linkedItems: "linkedItems",
  recommendations: "recommendations",
  resellers: "resellers"
};