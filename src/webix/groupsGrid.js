/**
 * Webix Groups Grid Component
 * Pure Webix configuration - no business logic
 */

export const getGroupsGridConfig = () => {
  return {
    view: "datatable",
    id: "groupsGrid",
    columns: [
      { id: "name", header: "Group Name", width: 200, sort: "string" },
      { id: "description", header: "Description", width: 300, sort: "string" },
      { id: "member_count", header: "Members", width: 120, sort: "int", template: function(obj) {
        return obj.member_count + ' ' + (obj.member_count === 1 ? 'member' : 'members');
      }},
      { id: "created_at", header: "Created", width: 150, sort: "date" }
    ],
    autoheight: false,
    autowidth: true,
    scroll: "xy",
    select: true,
    pager: {
      template: "{common.first()} {common.prev()} {common.pages()} {common.next()} {common.last()}",
      size: 20,
      group: 5
    }
  };
};

