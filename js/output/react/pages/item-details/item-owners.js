class ItemOwners extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loadError: false,
      assetId: props.assetId,
      sortOrder: "Asc",
      owners: []
    };
    this.itemOwnersPager = new CursorPager(100, 100, pagingParameters => {
      return this.loadPage(pagingParameters);
    });
  }

  init() {
    this.setState({
      loading: true
    });
    this.itemOwnersPager.loadFirstPage().then(data => this.handlePageLoad(data)).catch(err => {
      if (err.type === cursorPaginationConstants.errorType.getItemsFailure) {
        setTimeout(() => this.init(), 10 * 1000);
      } else {
        this.handleError(err);
      }
    });
  }

  loadPage(pagingParameters) {
    this.setState({
      loading: true,
      loadError: false
    });
    return new Promise((resolve, reject) => {
      Roblox.inventory.getAssetOwners(this.state.assetId, pagingParameters.cursor, this.state.sortOrder).then(data => {
        resolve({
          nextPageCursor: data.nextPageCursor,
          items: data.data.map(ownershipRecord => {
            ownershipRecord.updated = new Date(ownershipRecord.updated);
            ownershipRecord.created = new Date(ownershipRecord.created);
            return ownershipRecord;
          })
        });
      }).catch(reject);
    });
  }

  changeSortOrder(event) {
    this.setState({
      sortOrder: event.target.value
    });
    setTimeout(() => this.loadFirstPage(), 10);
  }

  loadFirstPage() {
    this.itemOwnersPager.loadFirstPage().then(data => this.handlePageLoad(data)).catch(err => this.handleError(err));
  }

  loadNextPage() {
    this.itemOwnersPager.loadNextPage().then(data => this.handlePageLoad(data)).catch(err => this.handleError(err));
  }

  loadPreviousPage() {
    this.itemOwnersPager.loadPreviousPage().then(data => this.handlePageLoad(data)).catch(err => this.handleError(err));
  }

  handlePageLoad(data) {
    this.setState({
      loading: false,
      owners: data
    });
  }

  handleError(err) {
    if (err.type !== cursorPaginationConstants.errorType.getItemsFailure) {
      return;
    }

    this.setState({
      loading: false,
      loadError: true
    });
    console.error(err.data);
    setTimeout(() => {
      this.itemOwnersPager.getCurrentPage().then(data => this.handlePageLoad(data)).catch(err => this.handleError(err));
    }, 2000);
  }

  getSerialNumber(ownershipRecord) {
    if (!ownershipRecord.serialNumber) {
      return "";
    }

    return /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
      class: "separator"
    }, "-"), /*#__PURE__*/React.createElement("span", {
      class: "font-caption-body serial-number"
    }, `Serial #${ownershipRecord.serialNumber}`));
  }

  renderPager() {
    if (!this.itemOwnersPager.canLoadNextPage && !this.itemOwnersPager.canLoadPreviousPage) {
      return "";
    }

    return /*#__PURE__*/React.createElement("div", {
      class: "pager"
    }, /*#__PURE__*/React.createElement("div", {
      class: "select-group rbx-select-group"
    }, /*#__PURE__*/React.createElement("select", {
      class: "input-field select-option rbx-select",
      value: this.state.sortOrder,
      onChange: this.changeSortOrder.bind(this)
    }, /*#__PURE__*/React.createElement("option", {
      value: "Asc"
    }, "Ascending"), /*#__PURE__*/React.createElement("option", {
      value: "Desc"
    }, "Descending")), /*#__PURE__*/React.createElement("span", {
      class: "icon-arrow icon-down-16x16"
    })), /*#__PURE__*/React.createElement("ul", {
      class: "pager"
    }, /*#__PURE__*/React.createElement("li", {
      class: "first" + (this.itemOwnersPager.canLoadPreviousPage ? "" : " disabled"),
      onClick: this.loadFirstPage.bind(this)
    }, /*#__PURE__*/React.createElement("a", null, /*#__PURE__*/React.createElement("span", {
      class: "icon-first-page"
    }))), /*#__PURE__*/React.createElement("li", {
      class: "pager-prev" + (this.itemOwnersPager.canLoadPreviousPage ? "" : " disabled"),
      onClick: this.loadPreviousPage.bind(this)
    }, /*#__PURE__*/React.createElement("a", null, /*#__PURE__*/React.createElement("span", {
      class: "icon-left"
    }))), /*#__PURE__*/React.createElement("li", {
      class: "pager-count"
    }, /*#__PURE__*/React.createElement("span", null, "Page ", this.itemOwnersPager.currentPageNumber)), /*#__PURE__*/React.createElement("li", {
      class: "pager-next" + (this.itemOwnersPager.canLoadNextPage ? "" : " disabled"),
      onClick: this.loadNextPage.bind(this)
    }, /*#__PURE__*/React.createElement("a", null, /*#__PURE__*/React.createElement("span", {
      class: "icon-right"
    }))), /*#__PURE__*/React.createElement("li", {
      class: "last disabled"
    }, /*#__PURE__*/React.createElement("a", null, /*#__PURE__*/React.createElement("span", {
      class: "icon-last-page"
    })))));
  }

  renderOwners() {
    return this.state.owners.map(ownershipRecord => {
      let ownedSince = `${ownershipRecord.updated.toLocaleDateString()} ${ownershipRecord.updated.toLocaleTimeString()}`;

      if (!ownershipRecord.owner) {
        return /*#__PURE__*/React.createElement("li", {
          class: "list-item"
        }, /*#__PURE__*/React.createElement("span", {
          class: "list-header"
        }, /*#__PURE__*/React.createElement(Thumbnail, {
          thumbnailType: Roblox.thumbnails.types.userHeadshot,
          thumbnailTargetId: 0
        })), /*#__PURE__*/React.createElement("div", {
          class: "rplus-ownership-info"
        }, /*#__PURE__*/React.createElement("span", {
          class: "text-label username"
        }, "Private Inventory"), this.getSerialNumber(ownershipRecord), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
          class: "text-secondary"
        }, "Owner since: ", ownedSince)));
      }

      return /*#__PURE__*/React.createElement("li", {
        class: "list-item"
      }, /*#__PURE__*/React.createElement("a", {
        class: "list-header",
        href: Roblox.users.getProfileUrl(ownershipRecord.owner.userId)
      }, /*#__PURE__*/React.createElement(Thumbnail, {
        thumbnailType: Roblox.thumbnails.types.userHeadshot,
        thumbnailTargetId: ownershipRecord.owner.userId
      })), /*#__PURE__*/React.createElement("div", {
        class: "rplus-ownership-info"
      }, /*#__PURE__*/React.createElement("a", {
        class: "text-name username",
        href: Roblox.users.getProfileUrl(ownershipRecord.owner.userId)
      }, ownershipRecord.owner.username), this.getSerialNumber(ownershipRecord), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
        class: "text-secondary"
      }, "Owner since: ", ownedSince)));
    });
  }

  render() {
    if (this.state.loading) {
      return /*#__PURE__*/React.createElement("div", {
        class: "rplus-item-owners"
      }, /*#__PURE__*/React.createElement("div", {
        class: "section-content-off"
      }, "Loading..."));
    } else if (this.state.loadError) {
      return /*#__PURE__*/React.createElement("div", {
        class: "rplus-item-owners"
      }, /*#__PURE__*/React.createElement("div", {
        class: "section-content-off"
      }, "Failed to load owners, trying again..."));
    }

    return /*#__PURE__*/React.createElement("div", {
      class: "rplus-item-owners"
    }, this.renderPager(), /*#__PURE__*/React.createElement("ul", {
      class: "vlist"
    }, this.renderOwners()));
  }

}