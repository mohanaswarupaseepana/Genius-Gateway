import React, { useState } from "react";

const TowersOfHanoi = () => {
  const [moveCount, setMoveCount] = useState(0);
  const [dragId, setDragId] = useState();
  const [tiles, setTiles] = useState([
    {
      id: "Tile-1",
      column: 1,
      row: 1,
      width: 2
    },
    {
      id: "Tile-2",
      column: 1,
      row: 2,
      width: 4
    },
    {
      id: "Tile-3",
      column: 1,
      row: 3,
      width: 6
    },
    {
      id: "Tile-4",
      column: 1,
      row: 4,
      width: 8
    },

  ]);

  const handleDrag = (ev) => {
    const dragTile = tiles.find((tile) => tile.id === ev.currentTarget.id);
    const topTile = tiles
      .filter((tile) => tile.column === dragTile.column)
      .sort((a, b) => a.width - b.width)[0];

    if (topTile && ev.currentTarget.id === topTile.id) {
      setDragId(ev.currentTarget.id);
    } else {
      ev.preventDefault();
    }
  };

  const handleDrop = (ev) => {
    const dragTile = tiles.find((tile) => tile.id === dragId);
    const dropColumn = ev.currentTarget.id;

    const dropColumnTopTile = tiles
      .filter((tile) => tile.column.toString() === dropColumn.toString())
      .sort((a, b) => a.width - b.width)[0];

    let newTileState = tiles;

    if (!dropColumnTopTile || dragTile.width < dropColumnTopTile.width) {
      newTileState = tiles.map((tile) => {
        if (tile.id === dragTile.id) {
          tile.column = parseInt(dropColumn, 10);
          setMoveCount(moveCount + 1);
        }

        return tile;
      });
    }

    setTiles(newTileState);
  };

  const column1Tiles = tiles.filter((tile) => tile.column === 1);
  const column2Tiles = tiles.filter((tile) => tile.column === 2);
  const column3Tiles = tiles.filter((tile) => tile.column === 3);

  const winCondition = tiles.every((tile) => tile.column === 3);
  return (
    <>
      <div className="px-5 py-10 bg-[#101720] ">
        <div>
        <div className="py-5 text-amber-400 ">
            <h2 className="font-bold text--500">Objective:</h2>
            <p className="text-cyan-100"> Rebuild the tower in
            the third column in as little moves as possible.</p>
          </div>
          <div>
          <h2 className="text-xl font-semibold text-amber-400">Rules</h2>
          <ul className="list-disc list-inside text-cyan-100">
            <li>Move one tile at a time .</li>
            <li>bigger tiles cannot go on top of smaller tiles.</li>
          </ul>
          </div>
          </div>
          
       
       
        <div className="inline-flex w-[60%] flex-row py-6 text-center bg-transparent justify-evenly ">
          <h1>Towers Of Hanoi</h1>
          <div
            className="relative items-end h-[60vh] border-b-[20px] border rounded-b-md border-red-500 w-[30%]"
            id={1}
            onDragOver={(ev) => ev.preventDefault()}
            onDrop={handleDrop}
          >
            <div className="bg-blend-soft-light w-[4%] h-[100%] absolute left-[48%] z-[-1]" />
            {column1Tiles
              .sort((a, b) => a.width - b.width)
              .map((tile, index) => {
                const tileCount = column1Tiles.length;
                const tileStyles = {
                  width: `${tile.width}em`
                };
                tileStyles.marginTop =
                  index === 0 ? `calc(60vh - ${tileCount * 40 + 20}px)` : "0";
                return (
                  <div
                    {...tile}
                    className="bg-red-500 border border-black rounded-xl h-[40px] m-auto z-10"
                    draggable
                    key={`column-1-${tile.id}`}
                    onDragOver={(ev) => ev.preventDefault()}
                    onDragStart={handleDrag}
                    style={tileStyles}
                  />
                );
              })}
          </div>
          <div
            className="relative items-end h-[60vh] border-b-[20px] border rounded-b-md border-red-500 w-[30%]"
            id={2}
            onDragOver={(ev) => ev.preventDefault()}
            onDrop={handleDrop}
          >
            <div className="bg-[#dd4433] w-[4%] h-[100%] border border-gray-500 absolute left-[48%] -z-10" />
            {column2Tiles
              .sort((a, b) => a.width - b.width)
              .map((tile, index) => {
                const tileCount = column2Tiles.length;
                const tileStyles = {
                  width: `${tile.width}em`
                };
                tileStyles.marginTop =
                  index === 0 ? `calc(60vh - ${tileCount * 40 + 20}px)` : "0";
                return (
                  <div
                    {...tile}
                    className="bg-orange-400 border border-black rounded-xl h-[40px] m-auto z-10"
                    draggable
                    key={`column-2-${tile.id}`}
                    onDragOver={(ev) => ev.preventDefault()}
                    onDragStart={handleDrag}
                    style={tileStyles}
                  />
                );
              })}
          </div>
          <div
            className="relative items-end h-[60vh] border-b-[20px] border rounded-b-md border-red-500 w-[30%]"
            id={3}
            onDragOver={(ev) => ev.preventDefault()}
            onDrop={handleDrop}
          >
            <div className="bg-[#dd4433] w-[4%] h-[100%] border border-gray-500 absolute left-[48%] -z-10" />
            {column3Tiles
              .sort((a, b) => a.width - b.width)
              .map((tile, index) => {
                const tileCount = column3Tiles.length;
                const tileStyles = {
                  width: `${tile.width}em`
                };
                tileStyles.marginTop =
                  index === 0 ? `calc(60vh - ${tileCount * 40 + 20}px)` : "0";
                return (
                  <div
                    {...tile}
                    className="bg-orange-400 border border-black rounded-xl h-[40px] m-auto z-10"
                    draggable
                    key={`column-3-${tile.id}`}
                    onDragOver={(ev) => ev.preventDefault()}
                    onDragStart={handleDrag}
                    style={tileStyles}
                  />
                );
              })}
          </div>
        </div>
        {winCondition && (
          <div className="win-message">
            You Win!
            <div className="win-subtitle">
              You did it in <span className="win-number">{moveCount}</span>{" "}
              moves
            </div>
          </div>
        )}
        Move count: <span className="text-2xl font-bold text-orange-400">{moveCount}</span>
      </div>
    </>
  );
};

export default TowersOfHanoi;