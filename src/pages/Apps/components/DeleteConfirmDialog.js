/**
 * DeleteConfirmDialog Component
 * Simple confirmation dialog for delete operations
 * Uses browser's native confirm dialog
 */
export function confirmDelete(appName, onConfirm) {
  if (window.confirm(`Are you sure you want to delete app: ${appName}?`)) {
    onConfirm();
  }
}

