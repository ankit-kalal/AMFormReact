/**
 * Webix Apps Grid Component
 * Pure Webix configuration - no business logic
 */

export const getAppsGridConfig = () => {
  return {
    view: "datatable",
    id: "appsGrid",
    columns: [
      { id: "app_name", header: "App Name", width: 200, sort: "string" },
      { id: "description", header: "Description", width: 300, sort: "string" },
      { id: "version", header: "Version", width: 120, sort: "string", template: function(obj) {
        return '<span class="webix_badge">v' + obj.version + '</span>';
      }},
      { id: "form_count", header: "Forms", width: 100, sort: "int", template: function(obj) {
        return obj.form_count + ' ' + (obj.form_count === 1 ? 'form' : 'forms');
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

