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
        maxWidth: '200px',
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

const Coins = ({ handleSubmit, qNum }) => {
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
        handleSubmit(qNum);
      } else {
        setMessage('');
      }
    } else {
      setMessage('');
    }
  }, [stack1, stack5, stack10, group1, group2, halfSum]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex', fontFamily: 'Roboto, sans-serif' }} className='h-full'>
        {/* Left Panel: Description, Rules, and Hints */}
        <div
          style={{
            width: '30%',
            padding: '20px',
            background: 'linear-gradient(135deg, #1e1e2f, #2c2c3c)',
            color: '#e0e0e0',
            boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.8)',
            overflowY: 'auto'
          }}
        >
          <h2 style={{ color: '#00e5ff', marginBottom: '10px', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
            Coin Split Puzzle
          </h2>
          <p style={{ lineHeight: '1.6', marginBottom: '15px' }}>
            You have coins of values 1/-, 5/-, and 10/-. The total number of coins is odd. Your goal is to drag the coins
            from their respective stacks into Group 1 and Group 2 so that both groups have equal total values.
          </p>
          <h2 style={{ color: '#00e5ff', marginTop: '20px' }}>Rules:</h2>
          <ul style={{ marginLeft: '20px', marginBottom: '15px' }}>
            <li>1️⃣Coins are initially separated into three stacks by denomination.</li>
            <li>2️⃣You can drag coins between the stacks and the groups.</li>
            <li>3️⃣All coins must be moved out of the stacks (each stack must be empty).
            </li>
          </ul>
          
          {message && (
            <div style={{ color: '#76ff03', fontSize: '1.5rem', marginTop: '20px', fontWeight: 'bold' }}>
              {message}
            </div>
          )}
        </div>

        {/* Right Panel: Interactive Coin Areas */}
        <div
          style={{
            width: '70%',
            padding: '20px',
            background: 'linear-gradient(135deg, #2e2e3f, #38384a)',
            overflowY: 'auto'
          }}
        >
          <h2 style={{ color: '#76ff03', textAlign: 'center', marginBottom: '20px' }}>
            Arrange the Coins
          </h2>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <DropZone zoneName="Stack1" coins={stack1} onDrop={handleDrop} isStack={true} expectedValue={1} />
            <DropZone zoneName="Stack5" coins={stack5} onDrop={handleDrop} isStack={true} expectedValue={5} />
            <DropZone zoneName="Stack10" coins={stack10} onDrop={handleDrop} isStack={true} expectedValue={10} />
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

export default Coins;
