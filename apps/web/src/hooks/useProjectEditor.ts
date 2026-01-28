import { useState, useEffect, useCallback } from "react";
import { Project, UpdateProjectDto } from "@/types/project";

interface UseProjectEditorOptions {
  project: Project | null;
  onUpdate: (id: string, data: UpdateProjectDto) => Promise<void>;
}

/**
 * Hook para manejar la lógica de edición de un proyecto.
 * Gestiona el estado de edición, los datos temporales, y las operaciones de guardado/cancelación.
 *
 * @example
 * const editor = useProjectEditor({
 *   project,
 *   onUpdate: updateProject
 * });
 *
 * // En el componente:
 * {editor.isEditing ? (
 *   <EditForm
 *     name={editor.editedData.name}
 *     description={editor.editedData.description}
 *     onChangeName={(value) => editor.handleChange('name', value)}
 *     onChangeDescription={(value) => editor.handleChange('description', value)}
 *     onSave={editor.handleSave}
 *     onCancel={editor.handleCancel}
 *     isSaving={editor.isSaving}
 *   />
 * ) : (
 *   <DisplayView onEdit={editor.startEditing} />
 * )}
 */
export function useProjectEditor({
  project,
  onUpdate,
}: UseProjectEditorOptions) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editedData, setEditedData] = useState({
    name: "",
    description: "",
  });

  // Sincronizar datos editados con el proyecto actual
  useEffect(() => {
    if (project) {
      setEditedData({
        name: project.name,
        description: project.description || "",
      });
    }
  }, [project]);

  // Iniciar modo de edición
  const startEditing = useCallback(() => {
    setIsEditing(true);
  }, []);

  // Manejar cambios en los campos
  const handleChange = useCallback(
    (field: keyof typeof editedData, value: string) => {
      setEditedData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [],
  );

  // Verificar si hay cambios
  const hasChanges = useCallback(() => {
    if (!project) return false;
    return (
      editedData.name !== project.name ||
      editedData.description !== (project.description || "")
    );
  }, [project, editedData]);

  // Guardar cambios
  const handleSave = useCallback(async () => {
    if (!project) return;

    // Si no hay cambios, solo salir del modo de edición
    if (!hasChanges()) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);

    // Construir el objeto de actualización solo con campos modificados
    const updateData: UpdateProjectDto = {
      name: editedData.name !== project.name ? editedData.name : undefined,
      description:
        editedData.description !== (project.description || "")
          ? editedData.description
          : undefined,
    };

    try {
      await onUpdate(project.id, updateData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update project:", error);
      // Aquí podrías agregar manejo de errores más sofisticado
      // como mostrar un toast o mantener el modo de edición
    } finally {
      setIsSaving(false);
    }
  }, [project, editedData, hasChanges, onUpdate]);

  // Cancelar edición y restaurar valores originales
  const handleCancel = useCallback(() => {
    if (project) {
      setEditedData({
        name: project.name,
        description: project.description || "",
      });
    }
    setIsEditing(false);
  }, [project]);

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
