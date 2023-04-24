import { useCalendarStore, useUiStore } from "../../hooks"

export const FabDelete = () => {

    const { isDateModalOpen } = useUiStore()
    const { startDeletingEvent, hasEventSelected } = useCalendarStore()

    const handleDelete = () => {
        startDeletingEvent()
    }

    return (
        <button 
            onClick={handleDelete} 
            className="btn btn-danger fab-danger"
            style={{
                display: hasEventSelected && !isDateModalOpen ? '' : 'none'
            }}
        >
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}
