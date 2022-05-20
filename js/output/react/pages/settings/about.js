class About extends React.Component {
  constructor(props) {
    super(props);
    let about = this;
    this.state = {
      authenticatedUser: null,
      isPremium: false,
      premiumExpiration: null,
      premium: /*#__PURE__*/React.createElement("span", {
        class: "spinner spinner-default"
      }),
      updateLog: /*#__PURE__*/React.createElement("span", {
        class: "spinner spinner-default"
      }),
      updateLogDraft: "",
      updateLogPost: "",
      updateLogSaveStatus: "",
      featureList: [this.getFeatureRow("Game server tracking", "On the game details page on servers it will show you which servers you have already played in. This feature will show up for Roblox+ Premium users only."), this.getFeatureRow("Sales + Revenue charts", "On item details pages and the group configure page charts will be added under the sales tab (or group summary tab) with sales per hour/day. This feature will show up for Roblox+ Premium users only."), this.getFeatureRow("Texture download", "A download option is added to Roblox created images."), this.getFeatureRow("Asset contents", "On item details pages a tab is added to view content the asset depends on."), this.getFeatureRow("Asset owners list", "A list of owners is added as a tab on item details pages for limited items, or items you've created."), this.getFeatureRow("Delete from inventory page", "Delete buttons are added to the inventory page for some asset types."), this.getFeatureRow("Avatar filter bar", "A text box is added to the avatar page to filter visible items down to items that match the text."), this.getFeatureRow("Roblox+ notification stream", "Clicking the extension browser icon while on a Roblox page will take over the notification stream with notifications from Roblox+."), this.getFeatureRow("Comment timer", "A timer is added to the asset comment button for how long until you can post another comment.", true), this.getFeatureRow("Trade.", "On the Trade. group wall if you click into the context menu, each poster has a Trade button that opens to the trade window for the poster when clicked.", true)]
    };
    RPlus.settings.get().then(settings => about.globalSettingsLoaded(settings)).catch(e => about.globalSettingsLoadFailure(e));
    Roblox.users.getAuthenticatedUser().then(user => about.authenticatedUserLoaded(user)).catch(e => about.authenticatedUserLoadFailure(e));
  }

  getFeatureRow(name, description, deprecated) {
    return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      class: "icon-warning" + (deprecated ? "" : " hidden")
    })), /*#__PURE__*/React.createElement("td", {
      class: "text-lead"
    }, name), /*#__PURE__*/React.createElement("td", {
      class: "text-description"
    }, description));
  }

  authenticatedUserLoaded(authenticatedUser) {
    let premiumLoaded = this.premiumLoaded.bind(this);
    let premiumLoadFailure = this.premiumLoadFailure.bind(this);

    if (authenticatedUser) {
      RPlus.premium.getPremium(authenticatedUser.id).then(premiumLoaded).catch(premiumLoadFailure);
    }

    this.setState({
      authenticatedUser: authenticatedUser
    });
  }

  authenticatedUserLoadFailure(e) {
    console.error("authenticatedUserLoadFailure", e);
    this.premiumLoadFailure(e);
  }

  premiumLoaded(premium) {
    let hubLink = /*#__PURE__*/React.createElement("a", {
      class: "text-link",
      target: "_blank",
      href: Roblox.games.getGameUrl(258257446, "Roblox+ Hub")
    }, "Roblox+ Hub");
    let newState = {};

    if (premium) {
      newState.isPremium = true;

      if (premium.expiration) {
        newState.premiumExpiration = new Date(premium.expiration);
        newState.premium = /*#__PURE__*/React.createElement("div", {
          class: "section-content"
        }, "You have Roblox+ Premium, thanks for the support!", /*#__PURE__*/React.createElement("br", null), "Your premium membership expires on: ", newState.premiumExpiration.toLocaleDateString(), /*#__PURE__*/React.createElement("br", null), "To keep premium going after this date make sure you have automatic renewal for the VIP server turned on at the ", hubLink, ".");
      } else {
        newState.premium = /*#__PURE__*/React.createElement("div", {
          class: "section-content"
        }, "You downloaded Roblox+ cracked by TimLiz from github.", /*#__PURE__*/React.createElement("br", null), "https://github.com/TimLiz/Roblox-crack", /*#__PURE__*/React.createElement("br", null), "If you have any questions contact me with Discord: TimLiz#2952");
      }
    } else {
      newState.premium = /*#__PURE__*/React.createElement("div", {
        class: "section-content"
      }, "To get Roblox+ Premium buy a VIP server from this place: ", hubLink);
    }

    this.setState(newState);
  }

  premiumLoadFailure(e) {
    console.error("premiumLoadFailure", e);
    this.setState({
      premium: /*#__PURE__*/React.createElement("div", {
        class: "section-content-off"
      }, "Failed to load premium status.")
    });
  }

  setUpdateLogDraft(event) {
    this.setState({
      updateLogDraft: event.target.value
    });
  }

  viewUpdateLog(settings, event) {
    let about = this;

    if (event.target.tagName !== "TEXTAREA") {
      this.globalSettingsLoaded(settings);

      if (this.state.updateLogDraft !== this.state.updateLogPost) {
        let post = btoa(this.state.updateLogDraft);
        RPlus.settings.set({
          updateLogPost: post
        }).then(function () {
          about.setState({
            updateLogPost: atob(post),
            updateLogSaveStatus: "Saved: " + new Date().toLocaleString()
          });
        }).catch(function (e) {
          console.error(e);
          about.setState({
            updateLogSaveStatus: "Failed to save update log."
          });
        });
      }
    }
  }

  editUpdateLog(settings) {
    if (!this.state.authenticatedUser || this.state.authenticatedUser.id !== 48103520) {
      return;
    }

    this.setState({
      updateLog: /*#__PURE__*/React.createElement("div", {
        class: "section-content rplus-update-log-section form-group form-has-feedback",
        onDoubleClick: this.viewUpdateLog.bind(this, settings)
      }, /*#__PURE__*/React.createElement("textarea", {
        onChange: this.setUpdateLogDraft.bind(this),
        defaultValue: this.state.updateLogDraft
      }), /*#__PURE__*/React.createElement("p", {
        class: "form-control-label"
      }, this.state.updateLogSaveStatus))
    });
  }

  globalSettingsLoaded(settings) {
    let decodedPost = atob(settings.updateLogPost);
    let newState = {
      updateLog: /*#__PURE__*/React.createElement("div", {
        class: "section-content form-has-feedback",
        onDoubleClick: this.editUpdateLog.bind(this, settings)
      }, /*#__PURE__*/React.createElement("pre", {
        class: "text-description"
      }, this.state.updateLogPost || decodedPost), /*#__PURE__*/React.createElement("p", {
        class: "form-control-label"
      }, "Version ", Extension.Singleton.manifest.version), /*#__PURE__*/React.createElement("p", {
        class: "form-control-label"
      }, "Group: ", /*#__PURE__*/React.createElement("a", {
        class: "text-link",
        href: Roblox.groups.getGroupUrl(2518656, "Roblox+ Fan Group")
      }, "Roblox+ Fan Group")))
    };

    if (!this.state.updateLogDraft) {
      newState.updateLogDraft = decodedPost;
    }

    if (!this.state.updateLogPost) {
      newState.updateLogPost = decodedPost;
    }

    this.setState(newState);
  }

  globalSettingsLoadFailure(e) {
    console.error("globalSettingsLoadFailure", e);
    this.setState({
      updateLog: /*#__PURE__*/React.createElement("div", {
        class: "section-content-off"
      }, "Update log failed to load.")
    });
  }

  reloadExtension() {
    Extension.Reload().then(() => {
      setTimeout(function () {
        window.location.reload(true);
      }, 1000);
    }).catch(console.error);
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      class: "section"
    }, /*#__PURE__*/React.createElement("div", {
      class: "container-header"
    }, /*#__PURE__*/React.createElement("h3", null, "Roblox+ Premium")), this.state.premium), /*#__PURE__*/React.createElement("div", {
      class: "section rplus-premium-section"
    }, /*#__PURE__*/React.createElement("div", {
      class: "container-header"
    }, /*#__PURE__*/React.createElement("h3", null, "Update Log")), this.state.updateLog), /*#__PURE__*/React.createElement("div", {
      class: "section"
    }, /*#__PURE__*/React.createElement("div", {
      class: "container-header"
    }, /*#__PURE__*/React.createElement("h3", null, "Disaster Recovery")), /*#__PURE__*/React.createElement("div", {
      class: "section-content"
    }, /*#__PURE__*/React.createElement("span", {
      class: "text-description"
    }, "Click button to \"turn off and back on again\"."), /*#__PURE__*/React.createElement("button", {
      class: "btn-control-sm acct-settings-btn",
      type: "button",
      onClick: this.reloadExtension
    }, "Reload"))), /*#__PURE__*/React.createElement("div", {
      class: "section rplus-feature-list"
    }, /*#__PURE__*/React.createElement("div", {
      class: "container-header"
    }, /*#__PURE__*/React.createElement("h3", null, "Feature List")), /*#__PURE__*/React.createElement("div", {
      class: "section-content"
    }, /*#__PURE__*/React.createElement("span", {
      class: "text-description"
    }, "Features listed are not configurable but are specified for transparency sake about what this extension is responsible for."), /*#__PURE__*/React.createElement("table", {
      class: "table table-striped"
    }, /*#__PURE__*/React.createElement("tbody", null, this.state.featureList)), /*#__PURE__*/React.createElement("div", {
      class: "rbx-divider"
    }), /*#__PURE__*/React.createElement("p", {
      class: "text-date-hint"
    }, /*#__PURE__*/React.createElement("span", {
      class: "icon-warning"
    }), " ", /*#__PURE__*/React.createElement("span", null, "Deprecated - These features are no longer supported. If they stop working they may not be fixed.")))), /*#__PURE__*/React.createElement("div", {
      class: "section rplus-privacy-policy"
    }, /*#__PURE__*/React.createElement("div", {
      class: "container-header"
    }, /*#__PURE__*/React.createElement("h3", null, "Privacy Policy")), /*#__PURE__*/React.createElement("div", {
      class: "section-content"
    }, /*#__PURE__*/React.createElement("span", {
      class: "text-description"
    }, "If you're going to use Roblox+ you should be informed of everything it does. Safety first!"), /*#__PURE__*/React.createElement("div", {
      class: "rbx-divider"
    }), /*#__PURE__*/React.createElement("h4", null, "Website Access"), /*#__PURE__*/React.createElement("p", {
      class: "text-description"
    }, /*#__PURE__*/React.createElement("span", null, "Any extension that has permission to roblox.com has just as much access to the website as you do! Roblox+ is no exception to that. Any extension that has access to roblox.com has access to anything you can do, including but not limited to:"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Your Robux"), /*#__PURE__*/React.createElement("li", null, "Your inventory"), /*#__PURE__*/React.createElement("li", null, "The games you play"), /*#__PURE__*/React.createElement("li", null, "The groups you're in"), /*#__PURE__*/React.createElement("li", null, "Your friends list"), /*#__PURE__*/React.createElement("li", null, "Roblox Authentication"), /*#__PURE__*/React.createElement("li", null, "Everything.")), /*#__PURE__*/React.createElement("span", null, "Why does Roblox+ need access to all of this?"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, "For the most part it doesn't. ", /*#__PURE__*/React.createElement("b", null, "None of this data is stored."), " However - some of it used by the extension."), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, "For example: The extension gets your Robux count every few seconds when you turn on the live navigation counters feature."), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, "Another example: The extension loads your friends list every few seconds when you turn on the friend notifications so it knows who to notify you for."), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, "Final example: Roblox authentication tokens are accessed by this extension to launch you into games when you click buttons like the follow button on notifications when your friends play a game."), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, "This extension heavily utilizes your Roblox account data to improve your Roblox experience. That's the entire point of the extension. If you do not trust me as a developer to use this data securely and with good judgement to not expose you to any harm please do not use this extension."), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, "Roblox+ needs access to the roblox.com website to be able to modify the website. Without access to the website there is no way to add these features to website."), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, "Roblox+ has access to two other domains:"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "rbxcdn.com"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
      class: "text-link",
      href: "https://roblox.plus"
    }, "roblox.plus"))), /*#__PURE__*/React.createElement("span", null, "What are these domains?"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, "rbxcdn.com is Roblox's content delivery domain. Any time the extension plays a sound (like when you get a notification) or you view asset contents on an item details page the data is loaded from an rbxcdn.com domain."), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, "What about roblox.plus?"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, "roblox.plus is a domain owned by me (", /*#__PURE__*/React.createElement("a", {
      class: "text-link",
      href: "/users/48103520/profile"
    }, "WebGL3D"), "). This domain is used for two features of the extension:"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Roblox+ Premium"), /*#__PURE__*/React.createElement("li", null, "Roblox Catalog Notifier")), /*#__PURE__*/React.createElement("span", null, "To check whether or not you are a subscriber of Roblox+ Premium a request is sent to roblox.plus which includes your user Id so the Roblox+ servers can check your Roblox+ Premium subscription status. This is only done if it cannot find a subscription by checking VIP servers for the Roblox+ Hub."), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, "There is another time your user Id will be sent to the Roblox+ servers: Roblox Catalog Notifier notifications. Your user Id and cloud messaging token are sent to the Roblox+ servers to subscribe you to the cloud notification topics that are responsible for sending you notifications about Roblox catalog items."), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, "Why does the Roblox Catalog Notifier need your user Id?"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, "There is a process for deciding which notifications to send to you based on whether or not you're a subscriber of Roblox+ Premium. If you have Roblox+ Premium and the catalog item that gets released is limited there will be an additional purchase option directly on the popup notification. The user id is sent to the backend to know which notification topic to subscribe you to.")), /*#__PURE__*/React.createElement("div", {
      class: "rbx-divider"
    }), /*#__PURE__*/React.createElement("h4", null, "Data"), /*#__PURE__*/React.createElement("p", {
      class: "text-description"
    }, /*#__PURE__*/React.createElement("span", null, "For the most part all data for the extension remains in the extension. All personal and Roblox data is kept inside the extension and is not sent outside of Roblox."), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, "There is one exception to this... your user Id. When you use the Roblox Catalog Notifier your user Id is paired with your cloud messaging token from the extension to the Roblox+ servers to send you notifications based on whether or not you have Roblox+ Premium. See above section on website access for slightly more information on this. This is the only Roblox account information that is sent to a non-Roblox server.")), /*#__PURE__*/React.createElement("div", {
      class: "rbx-divider"
    }), /*#__PURE__*/React.createElement("h4", null, "Permissions"), /*#__PURE__*/React.createElement("p", {
      class: "text-description"
    }, /*#__PURE__*/React.createElement("span", null, "The extension manifest has the following permissions listed:"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", null, "gcm (Google cloud messaging)"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Used to send notifications for the catalog notifier."))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", null, "contextMenus"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Used to add context menu items when right clicking on Roblox users. Mainly, to be able to open a trade window without going to their profile."))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", null, "webRequest (and webRequestBlocking)"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "See Web Request Interception"))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", null, "tts (text to speach)"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Used in some notifications that do not have specific sounds associated with them."))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", null, "notifications"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Used to be able to display all notifications."))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", null, "*://*.roblox.com/*")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", null, "*://*.rbxcdn.com/*")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", null, "*://*.roblox.plus/*"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "See Website Access"))))), /*#__PURE__*/React.createElement("div", {
      class: "rbx-divider"
    }), /*#__PURE__*/React.createElement("h4", null, "Web Request Interception"), /*#__PURE__*/React.createElement("p", {
      class: "text-description"
    }, /*#__PURE__*/React.createElement("span", null, "Some requests to roblox.com are intercepted!"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, "Yup. This extension uses webRequest and webRequestBlocking permissions to intercept and modify some requests that go to Roblox. For example: To load the authentication token for game launch additional headers are needed that are not typically accessible via XMLHttpRequest. webRequest is needed for this to add the additional request parameters necessary to launch you into game as... you!"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, "There are other requests being intercepted (like knowing when you visit Roblox for the first time for the extension start notification when enabled) and I could list them all out but imagine being me for a second... what if I missed one? What if I add a new feature and forget to update the privacy policy? I don't know what's legally required or not. How much do I need to specify or forget to specify before Google pulls me off the chrome web store? Instead of me trying to go into the implementation details of every feature this extension has I invite you to the extensions source."), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
      class: "text-secondary"
    }, "Roblox+ source code: ", /*#__PURE__*/React.createElement("a", {
      class: "text-link",
      href: "https://git.roblox.plus/Chrome"
    }, "https://git.roblox.plus"))))));
  }

}