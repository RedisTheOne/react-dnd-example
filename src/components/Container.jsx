import { useState, useCallback, memo, useEffect } from 'react';
import { NativeTypes } from 'react-dnd-html5-backend';
import Class from './Group';
import Box from './Box';
import { ItemTypes } from '../ItemTypes';
import update from 'immutability-helper';

export const Container = memo(() => {
  const [classes, setClasses] = useState([
    { accepts: [ItemTypes.STUDENT], lastDroppedItem: null, label: 'First Class' },
    { accepts: [ItemTypes.STUDENT], lastDroppedItem: null, label: 'Second Class' },
    {
      accepts: [ItemTypes.STUDENT],
      lastDroppedItem: null, 
      label: 'Third Class'
    },
    { accepts: [ItemTypes.STUDENT, NativeTypes.FILE], lastDroppedItem: null, label: 'Fourth Class' },
  ]);
  const [boxes] = useState([
    { id: 1, name: 'Redis Rira', type: ItemTypes.STUDENT },
    { id: 2, name: 'Redis Rira', type: ItemTypes.STUDENT },
    { id: 3, name: 'Redis Rira', type: ItemTypes.STUDENT },
  ]);
  const [droppedBoxNames, setDroppedBoxNames] = useState([]);

  useEffect(() => {
    console.log(droppedBoxNames);
  }, [droppedBoxNames]);
  
  const isDropped = (boxName) => droppedBoxNames.indexOf(boxName) > -1;

  const handleDrop = useCallback((index, item) => {
    const { name, id } = item;
    setDroppedBoxNames(update(droppedBoxNames, name && id ? { $push: [{name, id}] } : { $push: [] }));
    setClasses(update(classes, {
        [index]: {
            lastDroppedItem: {
                $set: item,
            },
        },
    }));
  }, [droppedBoxNames, classes]);

  return (
    <div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        {classes.map(({ accepts, lastDroppedItem, label }, index) => (
          <Class
            label={label}
            accept={accepts} 
            lastDroppedItem={lastDroppedItem} 
            onDrop={(item) => handleDrop(index, item)} 
            key={index}/>
        ))}
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {boxes.map(({ name, id, type }, index) => (
            <Box 
              name={name} 
              id={id}
              type={type} 
              isDropped={isDropped(name)} 
              key={index}
              />
          ))}
        </tbody>
      </table>
    </div>
  );
});
