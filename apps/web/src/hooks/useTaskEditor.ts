import { useState, useEffect, useCallback } from "react";
import { Task, UpdateTaskDto, TaskStatus } from "@/types/task";

interface UseTaskEditorOptions {
  task: Task | null;
  onUpdate: (id: string, data: UpdateTaskDto) => Promise<Task>;
}

/**
 * Hook para manejar la lógica de edición de una tarea.
 * Gestiona el estado de edición, los datos temporales, y las operaciones de guardado/cancelación.
 *
 * @example
 * const editor = useTaskEditor({
 *   task,
 *   onUpdate: updateTask
 * });
 *
 * // En el componente:
 * {editor.isEditing ? (
 *   <EditForm
 *     title={editor.editedData.title}
 *     description={editor.editedData.description}
 *     status={editor.editedData.status}
 *     onChangeTitle={(value) => editor.handleChange('title', value)}
 *     onChangeDescription={(value) => editor.handleChange('description', value)}
 *     onChangeStatus={(value) => editor.handleChange('status', value)}
 *     onSave={editor.handleSave}
 *     onCancel={editor.handleCancel}
 *     isSaving={editor.isSaving}
 *   />
 * ) : (
 *   <DisplayView onEdit={editor.startEditing} />
 * )}
 */
export function useTaskEditor({ task, onUpdate }: UseTaskEditorOptions) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editedData, setEditedData] = useState({
    title: "",
    description: "",
    status: TaskStatus.OPEN,
  });

  // Sincronizar datos editados con la tarea actual
  useEffect(() => {
    if (task) {
      setEditedData({
        title: task.title,
        description: task.description || "",
        status: task.status,
      });
    }
  }, [task]);

  // Iniciar modo de edición
  const startEditing = useCallback(() => {
    setIsEditing(true);
  }, []);

  // Manejar cambios en los campos
  const handleChange = useCallback(
    (field: keyof typeof editedData, value: string | TaskStatus) => {
      setEditedData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [],
  );

  // Verificar si hay cambios
  const hasChanges = useCallback(() => {
    if (!task) return false;
    return (
      editedData.title !== task.title ||
      editedData.description !== (task.description || "") ||
      editedData.status !== task.status
    );
  }, [task, editedData]);

  // Guardar cambios
  const handleSave = useCallback(async () => {
    if (!task) return;

    // Si no hay cambios, solo salir del modo de edición
    if (!hasChanges()) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);

    // Construir el objeto de actualización solo con campos modificados
    const updateData: UpdateTaskDto = {
      title: editedData.title !== task.title ? editedData.title : undefined,
      description:
        editedData.description !== (task.description || "")
          ? editedData.description
          : undefined,
      status: editedData.status !== task.status ? editedData.status : undefined,
    };

    try {
      await onUpdate(task.id, updateData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update task:", error);
      // Aquí podrías agregar manejo de errores más sofisticado
    } finally {
      setIsSaving(false);
    }
  }, [task, editedData, hasChanges, onUpdate]);

  // Cancelar edición y restaurar valores originales
  const handleCancel = useCallback(() => {
    if (task) {
      setEditedData({
        title: task.title,
        description: task.description || "",
        status: task.status,
      });
    }
    setIsEditing(false);
  }, [task]);

  return {
    // Estado
    isEditing,
    isSaving,
    editedData,
    hasChanges: hasChanges(),

    // Acciones
    startEditing,
    handleChange,
    handleSave,
    handleCancel,

    // Setters directos (para casos especiales)
    setEditedData,
    setIsEditing,
  };
}
