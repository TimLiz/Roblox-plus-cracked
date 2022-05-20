class FeaturedCatalogItems extends React.Component {
  constructor(props) {
    super(props);
    this.filterQueryParameterNames = ["creatorname", "sorttype", "sortaggregation", "includenotforsale", "currencytype", "pxmin", "pxmax", "genres"];
    this.backgroundState = {
      loadId: 0,
      query: null,
      pageNumber: null
    };
    this.state = {
      sponsoredItems: []
    };
    let featuredCatalogItems = this;
    setInterval(function () {
      featuredCatalogItems.checkPageQuery();
    }, 100);
  }

  getPageNumber() {
    return Number(($(".pager span[ng-bind*='CurrentPage']").text().match(/(\d+)$/) || ["", ""])[1]);
  }

  checkPageQuery() {
    let pageNumber = this.getPageNumber();

    if (location.search !== this.backgroundState.query || pageNumber !== this.backgroundState.pageNumber) {
      this.backgroundState.query = location.search;
      this.backgroundState.pageNumber = pageNumber;
      this.loadSponsoredItems();
    }
  }

  loadSponsoredItems() {
    let id = ++this.backgroundState.loadId;
    let featuredCatalogItems = this;
    this.getSponsoredItems().then(function (sponsoredItems) {
      if (id !== featuredCatalogItems.backgroundState.loadId) {
        return;
      }

      if (sponsoredItems.length === 0) {
        featuredCatalogItems.setState({
          sponsoredItems: []
        });
        return;
      }

      let loadedItems = [];
      let finishedLoading = 0;

      let tryResolve = function () {
        if (id !== featuredCatalogItems.backgroundState.loadId) {
          return;
        }

        if (++finishedLoading === sponsoredItems.length) {
          featuredCatalogItems.setState({
            sponsoredItems: loadedItems
          });
        }
      };

      sponsoredItems.forEach(function (item) {
        featuredCatalogItems.translateItem(item).then(function (loadedItem) {
          loadedItems.push(loadedItem);
          tryResolve();
        }).catch(function (e) {
          console.error(e);
          tryResolve();
        });
      });
    }).catch(console.error);
  }

  shouldShowSponsoredItems() {
    let query = location.search.toLowerCase();

    for (var n = 0; n < this.filterQueryParameterNames.length; n++) {
      if (query.includes(this.filterQueryParameterNames[n] + "=")) {
        return false;
      }
    }

    let pageNumber = this.getPageNumber();

    if (isNaN(pageNumber) || pageNumber === 0 || pageNumber === 1) {
      return true;
    }

    return false;
  }

  getSponsoredItems() {
    let featuredCatalogItems = this;
    return new Promise(function (resolve, reject) {
      if (!featuredCatalogItems.shouldShowSponsoredItems()) {
        resolve([]);
        return;
      }

      let category = Number((location.search.match(/category=(\d+)/i) || ["", ""])[1]);
      let subcategory = Number((location.search.match(/subcategory=(\d+)/i) || ["", ""])[1]);
      RPlus.sponsoredItems.getSponsoredItems(category, subcategory).then(function (items) {
        console.log("Sponsored items for category", category, subcategory, items);
        resolve(items.sort(() => Math.random() - 0.5));
      }).catch(reject);
    });
  }

  translateItem(item) {
    return new Promise(function (resolve, reject) {
      switch (item.type) {
        case "Asset":
          Roblox.catalog.getAssetInfo(item.id).then(function (asset) {
            Roblox.thumbnails.getAssetThumbnailUrl(asset.id, 420, 420).then(function (assetThumbnailUrl) {
              var creatorUrl = Roblox.users.getProfileUrl(asset.creator.id);

              if (asset.creator.type === "Group") {
                creatorUrl = Roblox.groups.getGroupUrl(asset.creator.id, asset.creator.name);
              }

              resolve({
                id: asset.id,
                name: asset.name,
                url: Roblox.catalog.getAssetUrl(asset.id, asset.name),
                price: asset.isForSale ? asset.robuxPrice : null,
                isFree: asset.isFree,
                creator: {
                  name: asset.creator.name,
                  url: creatorUrl
                },
                thumbnailUrl: assetThumbnailUrl
              });
            }).catch(reject);
          }).catch(reject);
          break;

        default:
          reject("Unsupport item type: " + item.type);
      }
    });
  }

  getItemCards() {
    return this.state.sponsoredItems.map(function (item) {
      return /*#__PURE__*/React.createElement("li", {
        class: "list-item item-card"
      }, /*#__PURE__*/React.createElement("a", {
        class: "item-card-container",
        target: "_self",
        href: item.url
      }, /*#__PURE__*/React.createElement("div", {
        class: "item-card-link"
      }, /*#__PURE__*/React.createElement("div", {
        class: "item-card-thumb-container"
      }, /*#__PURE__*/React.createElement("img", {
        class: "item-card-thumb",
        src: item.thumbnailUrl
      }))), /*#__PURE__*/React.createElement("div", {
        class: "item-card-caption"
      }, /*#__PURE__*/React.createElement("div", {
        class: "item-card-name-link"
      }, /*#__PURE__*/React.createElement("div", {
        class: "item-card-name",
        title: item.name
      }, item.name)), /*#__PURE__*/React.createElement("div", {
        class: "item-card-secondary-info text-secondary"
      }, /*#__PURE__*/React.createElement("div", {
        class: "item-card-label"
      }, /*#__PURE__*/React.createElement("span", null, "By ", /*#__PURE__*/React.createElement("a", {
        href: item.creator.url,
        target: "_self",
        class: "creator-name text-link"
      }, item.creator.name)))), /*#__PURE__*/React.createElement("div", {
        class: "item-card-price text-overflow"
      }, /*#__PURE__*/React.createElement("span", {
        className: item.price || item.isFree ? "hidden" : "text-label"
      }, "Offsale"), /*#__PURE__*/React.createElement("span", {
        className: item.isFree ? "text-label" : "hidden"
      }, "Free"), /*#__PURE__*/React.createElement("span", {
        className: item.price ? "icon-robux" : "hidden"
      }), /*#__PURE__*/React.createElement("span", {
        className: item.price ? "text-robux-title" : "hidden"
      }, item.price ? " " + global.addCommas(item.price) : "")))));
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: this.state.sponsoredItems.length > 0 ? "results-container" : "hidden"
    }, /*#__PURE__*/React.createElement("div", {
      class: "section"
    }, /*#__PURE__*/React.createElement("div", {
      class: "container-header"
    }, /*#__PURE__*/React.createElement("h3", null, "Sponsored by Roblox+")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("ul", {
      class: "item-cards-stackable"
    }, this.getItemCards()))));
  }

}

RPlus.settings.get().then(function (settings) {
  if (!settings.sponsoredCatalogItemsEnabled) {
    return;
  }

  var container = $("<div id=\"rplus-featured-items\">");
  var results = $(".catalog-results").prepend(container);
  console.log("Render Roblox+ featured items in .catalog-results (" + results.length + ")");
  ReactDOM.render( /*#__PURE__*/React.createElement(FeaturedCatalogItems, null), container[0]);
}).catch(console.error); // WebGL3D