import { useSortable } from '@dnd-kit/sortable';
import { memo } from 'react';




function DropZone({ id, children }) {
    const { isOver, setNodeRef } = useSortable({ id });
  
    const style = {
      width: '100%',
      height: '600px',
      border: isOver ? '2px solid blue' : '1px solid #ccc',
    };
  
    return (
        <>
            <div className='Dropzone_container' ref={setNodeRef} style={style}>
                {children}
            </div>
        </>
    );
  }
  export default memo(DropZone)