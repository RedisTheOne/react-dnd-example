import { memo, useEffect, useMemo } from 'react';
import { useDrop } from 'react-dnd';

const style = {
    height: '12rem',
    width: '12rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
};

const Class = memo(({ accept, lastDroppedItem, onDrop, label, }) => {
  useEffect(() => {
    console.log(lastDroppedItem);
  }, [lastDroppedItem]);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    }),
  });
  const isActive = useMemo(() => isOver && canDrop, [isOver, canDrop]);

  let backgroundColor = '#222';

  if (isActive) {
    backgroundColor = 'darkgreen';
  }
  else if (canDrop) {
    backgroundColor = 'darkkhaki';
  }

  return (
    <div ref={drop} style={{ ...style, backgroundColor, transition: '.2s' }}>
      {isActive
        ? 'Release to drop'
        : label}
    </div>
  );
});

export default Class;
