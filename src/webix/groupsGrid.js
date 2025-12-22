/**
 * Webix Groups Grid Component
 * Pure Webix configuration - no business logic
 */

export const getGroupsGridConfig = () => {
  return {
    view: "datatable",
    id: "groupsGrid",
    columns: [
      {
        id: "view_action",
        header: "View",
        width: 85,
        sort: false,
        template: function(obj, common, column) {
          const rowId = obj.id || obj.$id || common.$id || '';
          return '<button class="webix-action-btn-style3h viewbtn" data-action="view" data-row-id="' + rowId + '">View</button>';
        }
      },
      {
        id: "edit_action",
        header: "Edit",
        width: 85,
        sort: false,
        template: function(obj, common, column) {
          const rowId = obj.id || obj.$id || common.$id || '';
          return '<button class="webix-action-btn-style3h editbtn" data-action="edit" data-row-id="' + rowId + '">Edit</button>';
        }
      },
      {
        id: "delete_action",
        header: "Delete",
        width: 85,
        sort: false,
        template: function(obj, common, column) {
          const rowId = obj.id || obj.$id || common.$id || '';
          return '<button class="webix-action-btn-style3h deletebtn" data-action="delete" data-row-id="' + rowId + '">Delete</button>';
        }
      },
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

