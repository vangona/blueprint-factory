export const ContextMenuOptions = {
    // Customize event to bring up the context menu
    // Possible options https://js.cytoscape.org/#events/user-input-device-events
    evtType: ['dbltap', 'dblclick'],
    // List of initial menu items
    // A menu item must have either onClickFunction or submenu or both
    menuItems: [
        {
            id: 'hide',
            content: 'hide',
            tooltipText: 'hide',
            selector: 'node, edge',
            onClickFunction: (e) => {
              console.log(1);
            },
        },
        {
            id: 'add-node',
            content: 'add node',
            tooltipText: 'add node',
            selector: 'node',
            coreAsWell: true,
            onClickFunction: (e) => {
                console.log(2);
            },
        }
    ],
    // css classes that menu items will have
    menuItemClasses: [
      // add class names to this list
    ],
    // css classes that context menu will have
    contextMenuClasses: [
      // add class names to this list
    ],
    // Indicates that the menu item has a submenu. If not provided default one will be used
    submenuIndicator: { width: 12, height: 12 }
};