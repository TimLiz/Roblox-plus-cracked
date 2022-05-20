class UserInfoWidgetUserCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      premiumIcon: /*#__PURE__*/React.createElement("span", null),
      canFollowInGame: false,
      inventoryData: null
    };
    this.componentWillReceiveProps(props);
  }

  loadPremiumIcon(userId) {
    this.setState({
      premiumIcon: /*#__PURE__*/React.createElement("span", null)
    });
    RPlus.premium.getPremium(userId).then(premium => {
      if (this.props.user.id === userId && premium) {
        let expiration = "Lifetime";

        if (premium.expiration) {
          let expirationDate = new Date(premium.expiration);
          expiration = expirationDate.toLocaleDateString();
        }

        this.setState({
          premiumIcon: /*#__PURE__*/React.createElement("span", {
            class: "rplus-icon-32x32",
            title: "Expiration: " + expiration
          })
        });
      }
    }).catch(err => {
      console.error(err);
    });
  }

  loadPresence(userId) {
    this.setState({
      canFollowInGame: false
    });
    Roblox.presence.getPresenceByUserId(userId).then(presence => {
      if (presence && presence.game && presence.locationType === 4 && userId !== Roblox.users.authenticatedUserId && this.props.user.id === userId) {
        this.setState({
          canFollowInGame: true
        });
      }
    }).catch(err => {
      console.error(err);
    });
  }

  loadInventoryData(userId) {
    this.setState({
      inventoryData: null
    });
    Roblox.inventory.getCollectibles(userId).then(collectibles => {
      if (this.props.user.id !== userId) {
        return;
      }

      console.log(collectibles);
      this.setState({
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
    });
  }

  joinGame() {
    Roblox.games.launch({
      followUserId: this.state.user.id
    }).then(() => {// followed the user
    }).catch(err => {
      console.error(err);
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      user: nextProps.user
    });
    this.loadPremiumIcon(nextProps.user.id);
    this.loadPresence(nextProps.user.id);
    this.loadInventoryData(nextProps.user.id);
  }

  renderLabels() {
    if (!this.state.inventoryData) {
      return /*#__PURE__*/React.createElement("div", null);
    }

    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      class: "avatar-card-label"
    }, "Collectibles: ", global.addCommas(this.state.inventoryData.collectibles.length)), /*#__PURE__*/React.createElement("div", {
      class: "avatar-card-label"
    }, "RAP: ", global.addCommas(this.state.inventoryData.combinedValue)));
  }

  renderButtons() {
    if (!this.state.canFollowInGame) {
      return /*#__PURE__*/React.createElement("div", null);
    }

    return /*#__PURE__*/React.createElement("div", {
      class: "avatar-card-btns"
    }, /*#__PURE__*/React.createElement("button", {
      class: "btn-primary-md",
      onClick: this.joinGame.bind(this)
    }, "Join Game"));
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      class: "avatar-card-container"
    }, /*#__PURE__*/React.createElement("div", {
      class: "avatar-card-content"
    }, /*#__PURE__*/React.createElement("div", {
      class: "avatar-card-fullbody"
    }, /*#__PURE__*/React.createElement("a", {
      class: "avatar-card-link",
      href: Roblox.users.getProfileUrl(this.state.user.id)
    }, /*#__PURE__*/React.createElement("div", {
      class: "avatar-card-image"
    }, /*#__PURE__*/React.createElement(Thumbnail, {
      thumbnailType: Roblox.thumbnails.types.userHeadshot,
      thumbnailTargetId: this.state.user.id
    })), /*#__PURE__*/React.createElement(ThumbnailPresence, {
      userId: this.state.user.id
    }))), /*#__PURE__*/React.createElement("div", {
      class: "avatar-card-caption"
    }, /*#__PURE__*/React.createElement("div", {
      class: "text-overflow avatar-name"
    }, this.state.user.username), this.state.premiumIcon, this.renderLabels())), this.renderButtons());
  }

}