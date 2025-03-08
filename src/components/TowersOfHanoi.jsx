import React, { useEffect, useState } from "react";

const TowersOfHanoi = ({ handleSubmit, qNum }) => {
  const [moveCount, setMoveCount] = useState(0);
  const [dragId, setDragId] = useState();
  const [tiles, setTiles] = useState([
    {
      id: "Tile-1",
      column: 1,
      row: 1,
      width: 3
    },
    {
      id: "Tile-2",
      column: 1,
      row: 2,
      width: 5
    },
    {
      id: "Tile-3",
      column: 1,
      row: 3,
      width: 7
    },
    {
      id: "Tile-4",
      column: 1,
      row: 4,
      width: 9
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
  useEffect(() => {
    if (winCondition) {
      handleSubmit(qNum);
    }
  }, [winCondition]);
  return (
    <>
      <div className=" px-5 py-10 text-white bg-[#101720] ">


        <div className=" h-16 grid grid-cols-3  w-full items-center">
        <p className="text-left font-bold text-4xl">Move count: <span className="text-3xl font-bold text-orange-400">{moveCount}</span></p>
          <h1 className="text-5xl font-bold text-blue-400 text-center">Tower Of <span className="text-blue-400">Hanoi</span></h1>
        </div>

        {/* <div className="border px-7 h-16 grid grid-cols-3  w-full items-center">
                    <p className="text-left font-bold text-4xl">Key: {key}</p>
                    <h1 className="text-3xl font-bold text-blue-400 text-center">
                        Checkpoint - {currentSection + 1}
                    </h1>
                    <div></div>
                </div> */}
        

        <div className="inline-flex w-full py-6  bg-transparent justify-evenly ">
          <div className="flex flex-col gap-4 w-1/3 py-5 text-amber-400 ">
          <div>
            <span className="font-bold text-3xl text--500">Objective:</span><br/><span className="text-cyan-100 pl-10">The goal of the Towers of Hanoi puzzle is to move an entire stack of disks from one peg (or rod) to another while maintaining the correct order. For a puzzle with 4 disks, you start with all disks arranged in descending order (largest at the bottom, smallest at the top) on a starting peg. Your task is to transfer the entire tower to the destination peg in as few moves as possible. </span>
          </div>
          <div>
            <span className="font-bold text-3xl text-amber-400">Rules:</span><br/><span className="text-cyan-100"> 1️⃣ Only one disk can be moved at a time.<br/>
2️⃣ A larger disk cannot be placed on top of a smaller disk.<br/>
3️⃣ You can only move the top disk of any rod at a time.<br/>
4️⃣ There are three pegs: a Source peg (where all disks begin), an Auxiliary peg (a helper peg), and a Destination peg (which is coloured with green).
</span>

          </div>
        </div>
      
          <div className = "flex w-2/3 gap-10 items-center justify-around ">
            <div
              className="relative items-end h-[60vh] border-b-[20px] border rounded-b-md border-red-500 w-[20%]"
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
              className="relative items-end h-[60vh] border-b-[20px] border rounded-b-md border-red-500 w-[20%]"
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
              className="relative items-end h-[60vh] border-b-[20px] border-2 rounded-b-md border-green-500 w-[20%]"
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
        </div>
        {winCondition&& (
          <div className="rounded-lg absolute left-[30%] top-[30%] flex flex-col gap-7 justify-center items-center py-10 bg-green-400 w-[40%]">
            <p className="text-4xl font-bold">You Unlocked the Door</p>
            <div className="text-3xl">
              You did it in <span className= "font-bold text-[#2ff]">{moveCount}</span>{" "}
              moves
            </div>
          </div>
        )}
        
      </div>
    </>
  );
};

export default TowersOfHanoi;