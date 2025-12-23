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
          return '<button style="background: none; border: none; color: #1976d2; cursor: pointer; font-size: 11px; font-weight: 600; text-transform: uppercase; padding: 6px 0; text-decoration: none;" onmouseover="this.style.textDecoration=\'underline\'" onmouseout="this.style.textDecoration=\'none\'" data-action="view" data-row-id="' + rowId + '">View</button>';
        }
      },
      {
        id: "edit_action",
        header: "Edit",
        width: 85,
        sort: false,
        template: function(obj, common, column) {
          const rowId = obj.id || obj.$id || common.$id || '';
          return '<button style="background: none; border: none; color: #388e3c; cursor: pointer; font-size: 11px; font-weight: 600; text-transform: uppercase; padding: 6px 0; text-decoration: none;" onmouseover="this.style.textDecoration=\'underline\'" onmouseout="this.style.textDecoration=\'none\'" data-action="edit" data-row-id="' + rowId + '">Edit</button>';
        }
      },
      {
        id: "delete_action",
        header: "Delete",
        width: 85,
        sort: false,
        template: function(obj, common, column) {
          const rowId = obj.id || obj.$id || common.$id || '';
          return '<button style="background: none; border: none; color: #d32f2f; cursor: pointer; font-size: 11px; font-weight: 600; text-transform: uppercase; padding: 6px 0; text-decoration: none;" onmouseover="this.style.textDecoration=\'underline\'" onmouseout="this.style.textDecoration=\'none\'" data-action="delete" data-row-id="' + rowId + '">Delete</button>';
        }
      },
      { 
        id: "name", 
        header: [{ 
          text: "Group Name", 
          content: "excelFilter", 
          mode: "text",
          filterConfig: {
            field: "name"
          }
        }], 
        width: 200, 
        sort: "string"
      },
      { 
        id: "description", 
        header: [{ 
          text: "Description", 
          content: "excelFilter", 
          mode: "text",
          filterConfig: {
            field: "description"
          }
        }], 
        width: 300, 
        sort: "string"
      },
      { 
        id: "member_count", 
        header: [{ 
          text: "Members", 
          content: "excelFilter", 
          mode: "number"
        }], 
        width: 120, 
        sort: "int",
        template: function(obj) {
          return obj.member_count + ' ' + (obj.member_count === 1 ? 'member' : 'members');
        }
      },
      { 
        id: "created_at", 
        header: [{ 
          text: "Created", 
          content: "excelFilter", 
          mode: "date"
        }], 
        width: 150, 
        sort: "date"
      }
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

