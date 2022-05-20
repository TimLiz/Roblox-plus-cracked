class GroupRevenue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    };
    Roblox.games.getGroupGames(this.props.groupId).then(games => {
      this.setState({
        games: games
      });
    }).catch(console.error);
  }

  loadSalesData(days) {
    console.log("Load sales data", this.props.groupId);
    return RPlus.bucketedSales.getBucketedSellerSales("Group", this.props.groupId, days);
  }

  loadRevenueData(days) {
    console.log("Load revenue data", this.props.groupId);
    return RPlus.bucketedSales.getBucketedSellerRevenue("Group", this.props.groupId, days);
  }

  loadSalesDataByGame(days) {
    console.log("Load game sales data", this.props.groupId);
    return RPlus.bucketedSales.getBucketedGroupSalesByGame(this.props.groupId, days);
  }

  loadRevenueDataByGame(days) {
    console.log("Load game revenue data", this.props.groupId);
    return RPlus.bucketedSales.getBucketedGroupRevenueByGame(this.props.groupId, days);
  }

  getItemScanStatus() {
    return Roblox.economyTransactions.getGroupScanStatus(this.props.groupId);
  }

  translateGroupGameSeries(salesData, mode, translateBucket) {
    return new Promise((resolve, reject) => {
      var result = [];
      this.state.games.forEach(function (game) {
        var transactions = salesData[game.id];

        if (transactions) {
          result.push({
            name: game.name,
            data: translateBucket(transactions, mode)
          });
        }
      });
      resolve(result);
    });
  }

  getGameCharts() {
    if (this.state.games.length > 0) {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(BucketedSalesChart, {
        loadSalesData: this.loadSalesDataByGame.bind(this),
        getScanStatus: this.getItemScanStatus.bind(this),
        seriesTranslator: this.translateGroupGameSeries.bind(this),
        legend: true,
        name: "Sales by game"
      }), /*#__PURE__*/React.createElement(BucketedSalesChart, {
        loadSalesData: this.loadRevenueDataByGame.bind(this),
        getScanStatus: this.getItemScanStatus.bind(this),
        seriesTranslator: this.translateGroupGameSeries.bind(this),
        legend: true,
        name: "Revenue by game"
      }));
    }

    return "";
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(BucketedSalesChart, {
      loadSalesData: this.loadSalesData.bind(this),
      getScanStatus: this.getItemScanStatus.bind(this),
      name: "Sales"
    }), /*#__PURE__*/React.createElement(BucketedSalesChart, {
      loadSalesData: this.loadRevenueData.bind(this),
      getScanStatus: this.getItemScanStatus.bind(this),
      name: "Revenue"
    }), this.getGameCharts());
  }

}

Roblox.users.getAuthenticatedUser().then(function (user) {
  var groupId = Roblox.groups.getIdFromUrl(location.href);

  if (isNaN(groupId) || groupId <= 0) {
    return;
  }

  RPlus.premium.isPremium(user.id).then(function (premium) {
    if (!premium) {
      // TODO: Missed oppurtunity to upsell.
      return;
    }

    setInterval(function () {
      var groupRevenueSummaryTab = $("revenue-summary");

      if (groupRevenueSummaryTab.length > 0) {
        var rplusRevenueContainer = groupRevenueSummaryTab.find("#rplus-group-revenue");

        if (rplusRevenueContainer.length <= 0) {
          rplusRevenueContainer = $("<div id=\"rplus-group-revenue\">");
          groupRevenueSummaryTab.append(rplusRevenueContainer);
          console.log("Render GroupRevenue in #rplus-group-revenue");
          ReactDOM.render( /*#__PURE__*/React.createElement(GroupRevenue, {
            groupId: groupId
          }), rplusRevenueContainer[0]);
        }
      }
    }, 500);
  }).catch(console.error);
}).catch(console.error); // WebGL3D