class NotificationStreamWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: []
    };
    Extension.NotificationService.Singleton.onNotificationCreated.addEventListener(this.loadNotifications.bind(this));
    Extension.NotificationService.Singleton.onNotificationClosed.addEventListener(this.loadNotifications.bind(this));
    this.loadNotifications();
  }

  loadNotifications() {
    Extension.NotificationService.Singleton.getNotifications().then(notifications => {
      this.setState({
        notifications: notifications
      });
    }).catch(console.error);
  }

  clickNotification(notification, event) {
    if (notification.metadata.url) {
      event.preventDefault();
    }

    Extension.NotificationService.Singleton.clickNotification(notification.id).then(() => {// notification clicked
    }).catch(console.error);
    ;
  }

  closeNotification(notification) {
    Extension.NotificationService.Singleton.closeNotification(notification.id).then(() => {// notification closed
    }).catch(console.error);
  }

  renderNotificationImage(notification) {
    return /*#__PURE__*/React.createElement("div", {
      class: "notification-image-container"
    }, /*#__PURE__*/React.createElement("img", {
      src: notification.icon
    }));
  }

  renderNotificationContent(notification) {
    return /*#__PURE__*/React.createElement("div", {
      class: "notification-item-content",
      onClick: this.clickNotification.bind(this, notification)
    }, /*#__PURE__*/React.createElement("div", {
      class: "notification-data-container"
    }, /*#__PURE__*/React.createElement("div", {
      class: "font-caption-body text"
    }, /*#__PURE__*/React.createElement("div", {
      class: "text-subject message-preview"
    }, notification.title), /*#__PURE__*/React.createElement("div", {
      class: "text-secondary message-preview"
    }, notification.context), /*#__PURE__*/React.createElement("div", {
      class: "text-secondary message-preview"
    }, notification.message))));
  }

  renderNotificationItem(notification) {
    if (notification.metadata.url) {
      return /*#__PURE__*/React.createElement("a", {
        class: "notification-item",
        href: notification.metadata.url
      }, this.renderNotificationImage(notification), this.renderNotificationContent(notification));
    }

    return /*#__PURE__*/React.createElement("div", {
      class: "notification-item"
    }, this.renderNotificationImage(notification), this.renderNotificationContent(notification));
  }

  renderNotifications() {
    let notifications = this.state.notifications;
    return notifications.map((notification, index) => {
      let className = "notification-stream-item";

      if (index !== notifications.length - 1) {
        className += " border-bottom";
      }

      if (notification.metadata.url) {
        className += " clickable";
      }

      return /*#__PURE__*/React.createElement("li", {
        class: className
      }, this.renderNotificationItem(notification), /*#__PURE__*/React.createElement("span", {
        class: "icon-turn-off",
        title: "Close Notification",
        onClick: this.closeNotification.bind(this, notification)
      }));
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("ul", {
      class: "rplus-notification-stream notification-stream-list"
    }, this.renderNotifications());
  }

}