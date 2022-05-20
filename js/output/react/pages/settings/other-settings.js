class OtherSettings extends SettingsTab {
  constructor(props) {
    super(props);
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      class: "section"
    }, /*#__PURE__*/React.createElement("div", {
      class: "container-header"
    }, /*#__PURE__*/React.createElement("h3", null, "Profile Page")), /*#__PURE__*/React.createElement("div", {
      class: "section-content"
    }, /*#__PURE__*/React.createElement("span", {
      class: "text-lead"
    }, "Display users RAP in header."), /*#__PURE__*/React.createElement(PillToggle, {
      getValue: this.getPillValue.bind(this, "profileRAP"),
      onToggle: this.setPillValue.bind(this, "profileRAP")
    }), /*#__PURE__*/React.createElement("div", {
      class: "rbx-divider"
    }), /*#__PURE__*/React.createElement("span", {
      class: "text-description"
    }, "Calculates total user value in items and displays it as profile header stat."))), /*#__PURE__*/React.createElement("div", {
      class: "section"
    }, /*#__PURE__*/React.createElement("div", {
      class: "container-header"
    }, /*#__PURE__*/React.createElement("h3", null, "Game Details Page")), /*#__PURE__*/React.createElement("div", {
      class: "section-content"
    }, /*#__PURE__*/React.createElement("span", {
      class: "text-lead"
    }, "Track of joined servers."), /*#__PURE__*/React.createElement(PillToggle, {
      getValue: this.getPillValue.bind(this, "gameServerTracker.on"),
      onToggle: this.setPillValue.bind(this, "gameServerTracker.on"),
      disabled: !this.state.isPremium
    }), /*#__PURE__*/React.createElement("div", {
      class: "rbx-divider"
    }), /*#__PURE__*/React.createElement("span", {
      class: "text-description"
    }, "Keeps track of which game servers you've joined and which ones you haven't. This feature is for Roblox+ Premium users only.")), /*#__PURE__*/React.createElement("div", {
      class: "section-content"
    }, /*#__PURE__*/React.createElement("span", {
      class: "text-lead"
    }, "Ascending Servers"), /*#__PURE__*/React.createElement(PillToggle, {
      getValue: this.getPillValue.bind(this, "ascendingGameServersSortOrder"),
      onToggle: this.setPillValue.bind(this, "ascendingGameServersSortOrder")
    }), /*#__PURE__*/React.createElement("div", {
      class: "rbx-divider"
    }), /*#__PURE__*/React.createElement("span", {
      class: "text-description"
    }, "Sort servers in from least players -> most players.")), /*#__PURE__*/React.createElement("div", {
      class: "section-content"
    }, /*#__PURE__*/React.createElement("span", {
      class: "text-lead"
    }, "Badge Achievement Dates"), /*#__PURE__*/React.createElement(PillToggle, {
      getValue: this.getPillValue.bind(this, "badgeAchievementDatesEnabled"),
      onToggle: this.setPillValue.bind(this, "badgeAchievementDatesEnabled")
    }), /*#__PURE__*/React.createElement("div", {
      class: "rbx-divider"
    }), /*#__PURE__*/React.createElement("span", {
      class: "text-description"
    }, "On game details page see when you achieved each badge."))), /*#__PURE__*/React.createElement("div", {
      class: "section"
    }, /*#__PURE__*/React.createElement("div", {
      class: "container-header"
    }, /*#__PURE__*/React.createElement("h3", null, "Item Details Page")), /*#__PURE__*/React.createElement("div", {
      class: "section-content"
    }, /*#__PURE__*/React.createElement("span", {
      class: "text-lead"
    }, "Live number remaining counter for limiteds."), /*#__PURE__*/React.createElement(PillToggle, {
      getValue: this.getPillValue.bind(this, "remainingCounter"),
      onToggle: this.setPillValue.bind(this, "remainingCounter")
    }), /*#__PURE__*/React.createElement("div", {
      class: "rbx-divider"
    }), /*#__PURE__*/React.createElement("span", {
      class: "text-lead"
    }, "Sales counter on created items."), /*#__PURE__*/React.createElement(PillToggle, {
      getValue: this.getPillValue.bind(this, "itemSalesCounter"),
      onToggle: this.setPillValue.bind(this, "itemSalesCounter")
    }))), /*#__PURE__*/React.createElement("div", {
      class: "section"
    }, /*#__PURE__*/React.createElement("div", {
      class: "container-header"
    }, /*#__PURE__*/React.createElement("h3", null, "Twemojis")), /*#__PURE__*/React.createElement("div", {
      class: "section-content"
    }, /*#__PURE__*/React.createElement("span", {
      class: "text-description"
    }, "Replace emojis on the website with twemojis."), /*#__PURE__*/React.createElement(PillToggle, {
      getValue: this.getPillValue.bind(this, "twemoji"),
      onToggle: this.setPillValue.bind(this, "twemoji")
    }))), /*#__PURE__*/React.createElement("div", {
      class: "section"
    }, /*#__PURE__*/React.createElement("div", {
      class: "container-header"
    }, /*#__PURE__*/React.createElement("h3", null, "Catalog")), /*#__PURE__*/React.createElement("div", {
      class: "section-content"
    }, /*#__PURE__*/React.createElement("span", {
      class: "text-lead"
    }, "Hide blocked users as sellers."), /*#__PURE__*/React.createElement(PillToggle, {
      getValue: this.getPillValue.bind(this, "catalog.hideBlockedSellers"),
      onToggle: this.setPillValue.bind(this, "catalog.hideBlockedSellers")
    }), /*#__PURE__*/React.createElement("div", {
      class: "rbx-divider"
    }), /*#__PURE__*/React.createElement("span", {
      class: "text-description"
    }, "Users who you have blocked will not appear in catalog results."))), /*#__PURE__*/React.createElement("div", {
      class: "section"
    }, /*#__PURE__*/React.createElement("div", {
      class: "container-header"
    }, /*#__PURE__*/React.createElement("h3", null, "Money")), /*#__PURE__*/React.createElement("div", {
      class: "section-content"
    }, /*#__PURE__*/React.createElement("span", {
      class: "text-lead"
    }, "Track Robux History"), /*#__PURE__*/React.createElement(PillToggle, {
      getValue: this.getPillValue.bind(this, "robuxHistoryEnabled"),
      onToggle: this.setPillValue.bind(this, "robuxHistoryEnabled"),
      disabled: !this.state.isPremium
    }), /*#__PURE__*/React.createElement("div", {
      class: "rbx-divider"
    }), /*#__PURE__*/React.createElement("span", {
      class: "text-description"
    }, "Keeps track of your Robux history while live navigation counters are turned on and charts them on the ", /*#__PURE__*/React.createElement("a", {
      class: "text-link",
      href: "/My/Money.aspx#/#Summary_tab"
    }, "Money page summary tab"), ". This feature is for Roblox+ Premium users only."))), /*#__PURE__*/React.createElement("div", {
      class: "section"
    }, /*#__PURE__*/React.createElement("div", {
      class: "container-header"
    }, /*#__PURE__*/React.createElement("h3", null, "Developer Stats")), /*#__PURE__*/React.createElement("div", {
      class: "section-content"
    }, /*#__PURE__*/React.createElement("span", {
      class: "text-lead"
    }, "Premium Payouts Summary"), /*#__PURE__*/React.createElement(PillToggle, {
      getValue: this.getPillValue.bind(this, "premiumPayoutsSummary"),
      onToggle: this.setPillValue.bind(this, "premiumPayoutsSummary"),
      disabled: !this.state.isPremium
    }), /*#__PURE__*/React.createElement("div", {
      class: "rbx-divider"
    }), /*#__PURE__*/React.createElement("span", {
      class: "text-description"
    }, "Adds premium payout summary to premium tab. This feature is for Roblox+ Premium users only."))));
  }

}