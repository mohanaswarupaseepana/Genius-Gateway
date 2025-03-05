// App.js
import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Define the draggable item type.
const COIN = 'COIN';

// DraggableCoin component makes a coin draggable.
const DraggableCoin = ({ coin, from }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: COIN,
    item: { coin, from },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: '1px solid #333',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f0f0f0',
        margin: '2px',
        fontWeight: 'bold',
      }}
    >
      {coin.value}
    </div>
  );
};

// Generic DropZone component that can enforce an expected coin value (for stacks).
// If expectedValue is provided, then only coins matching that value are accepted.
const DropZone = ({ zoneName, coins, onDrop, isStack = false, expectedValue }) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: COIN,
    canDrop: (item) => {
      // For stacks, only accept coins that match the expected coin value.
      return expectedValue ? item.coin.value === expectedValue : true;
    },
    drop: (item) => onDrop(item, zoneName),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }), [expectedValue, zoneName, onDrop]);

  // Style differently for stacks vs groups.
  const containerStyle = isStack
    ? {
        border: '2px solid #666',
        padding: '10px',
        minHeight: '200px',
        position: 'relative',
        backgroundColor: isOver && canDrop ? '#e0f7ff' : '#fff',
      }
    : {
        border: '2px dashed #666',
        padding: '10px',
        minHeight: '200px',
        backgroundColor: isOver ? '#e0ffe0' : '#fff',
      };

  return (
    <div ref={drop} style={{ margin: '10px', ...containerStyle }}>
      <h3>{zoneName}</h3>
      {isStack ? (
        <div style={{ position: 'relative', height: '200px' }}>
          {coins.map((coin, index) => (
            <div
              key={coin.id}
              style={{
                position: 'absolute',
                top: index * 8,
                left: index * 2,
              }}
            >
              <DraggableCoin coin={coin} from={zoneName} />
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {coins.map((coin) => (
            <DraggableCoin key={coin.id} coin={coin} from={zoneName} />
          ))}
        </div>
      )}
    </div>
  );
};

const App = () => {
  // Create an odd number of coins:
  // 7 coins of 1/-, 5 coins of 5/-, 3 coins of 10/- (total 15 coins)
  const initialCoins = [
    ...Array(7).fill(null).map((_, i) => ({ id: `1-${i}`, value: 1 })),
    ...Array(5).fill(null).map((_, i) => ({ id: `5-${i}`, value: 5 })),
    ...Array(3).fill(null).map((_, i) => ({ id: `10-${i}`, value: 10 })),
  ];

  // Separate the coins into three stacks based on their value.
  const [stack1, setStack1] = useState(initialCoins.filter((coin) => coin.value === 1));
  const [stack5, setStack5] = useState(initialCoins.filter((coin) => coin.value === 5));
  const [stack10, setStack10] = useState(initialCoins.filter((coin) => coin.value === 10));

  // Group states for coins dragged into the two groups.
  const [group1, setGroup1] = useState([]);
  const [group2, setGroup2] = useState([]);

  // Calculate total sum and half-sum.
  const totalSum = initialCoins.reduce((acc, coin) => acc + coin.value, 0);
  const halfSum = totalSum / 2;

  const [message, setMessage] = useState('');

  // moveCoin: Removes the coin from its source zone and adds it to the destination.
  // Zones can be: "Stack1", "Stack5", "Stack10", "Group1", "Group2"
  const moveCoin = (item, toZone) => {
    const { coin, from } = item;

    // Remove coin from its current zone.
    if (from === 'Stack1') {
      setStack1((prev) => prev.filter((c) => c.id !== coin.id));
    } else if (from === 'Stack5') {
      setStack5((prev) => prev.filter((c) => c.id !== coin.id));
    } else if (from === 'Stack10') {
      setStack10((prev) => prev.filter((c) => c.id !== coin.id));
    } else if (from === 'Group1') {
      setGroup1((prev) => prev.filter((c) => c.id !== coin.id));
    } else if (from === 'Group2') {
      setGroup2((prev) => prev.filter((c) => c.id !== coin.id));
    }

    // Add coin to the destination zone.
    if (toZone === 'Stack1' && coin.value === 1) {
      setStack1((prev) => [...prev, coin]);
    } else if (toZone === 'Stack5' && coin.value === 5) {
      setStack5((prev) => [...prev, coin]);
    } else if (toZone === 'Stack10' && coin.value === 10) {
      setStack10((prev) => [...prev, coin]);
    } else if (toZone === 'Group1') {
      setGroup1((prev) => [...prev, coin]);
    } else if (toZone === 'Group2') {
      setGroup2((prev) => [...prev, coin]);
    }
  };

  const handleDrop = (item, toZone) => {
    moveCoin(item, toZone);
  };

  // Check if the solution is correct:
  // - All stacks must be empty.
  // - The sums of Group1 and Group2 must equal half the total sum.
  useEffect(() => {
    if (stack1.length === 0 && stack5.length === 0 && stack10.length === 0) {
      const sum1 = group1.reduce((acc, coin) => acc + coin.value, 0);
      const sum2 = group2.reduce((acc, coin) => acc + coin.value, 0);
      if (sum1 === halfSum && sum2 === halfSum) {
        setMessage('You cracked!');
      } else {
        setMessage('');
      }
    } else {
      setMessage('');
    }
  }, [stack1, stack5, stack10, group1, group2, halfSum]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
        {/* Left panel: Description, rules, and hints */}
        <div style={{ flex: 1, padding: '20px', borderRight: '1px solid #ccc', overflowY: 'auto' }}>
          <h2>Coin Split Puzzle</h2>
          <p>
            You have coins of values 1/-, 5/-, and 10/-. The total number of coins is odd. Your goal is to drag the coins
            from their respective stacks into Group 1 and Group 2 so that both groups have equal total values.
          </p>
          <h3>Rules:</h3>
          <ul>
            <li>Coins are initially separated into three stacks by denomination.</li>
            <li>You can drag coins between the stacks and the groups.</li>
            <li>
              All coins must be moved out of the stacks (each stack must be empty) and the groups must each total{' '}
              <strong>{halfSum}</strong> (Total: {totalSum}).
            </li>
          </ul>
          <h3>Hints:</h3>
          <ul>
            <li>Drag coins from the appropriate stack (1/-, 5/-, 10/-) into the groups.</li>
            <li>If needed, move coins back to the stack to re-adjust.</li>
            <li>Check your totals by moving all coins out of the stacks.</li>
          </ul>
          {message && (
            <div style={{ color: 'green', fontSize: '1.5rem', marginTop: '20px', fontWeight: 'bold' }}>
              {message}
            </div>
          )}
        </div>

        {/* Right panel: Interactive coin areas */}
        <div style={{ flex: 2, padding: '20px', overflowY: 'auto' }}>
          <h2>Arrange the Coins</h2>
          {/* Display separate stacks for each coin type */}
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <DropZone
              zoneName="Stack1"
              coins={stack1}
              onDrop={handleDrop}
              isStack={true}
              expectedValue={1}
            />
            <DropZone
              zoneName="Stack5"
              coins={stack5}
              onDrop={handleDrop}
              isStack={true}
              expectedValue={5}
            />
            <DropZone
              zoneName="Stack10"
              coins={stack10}
              onDrop={handleDrop}
              isStack={true}
              expectedValue={10}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
            <DropZone zoneName="Group1" coins={group1} onDrop={handleDrop} />
            <DropZone zoneName="Group2" coins={group2} onDrop={handleDrop} />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
