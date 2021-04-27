import { memo } from 'react';
import { useDrag } from 'react-dnd';

const Box = memo(({ name, type, isDropped, id }) => {
  const [{ opacity }, drag] = useDrag(() => ({
      type,
      item: { name, id },
      collect: (monitor) => ({
          opacity: monitor.isDragging() ? 0.4 : 1,
      }),
  }), [name, type]);

  return (
    <tr ref={drag} style={{ opacity }}>
      <td>{id}</td>
      <td>{name}</td>
    </tr>
  );
});

export default Box;
